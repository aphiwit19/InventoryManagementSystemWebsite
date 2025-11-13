// Simple auth utility backed by localStorage
// Keys
const USERS_KEY = 'users';
const SESSION_KEY = 'session';

const seedUsersDefault = [
  { username: 'admin', password: '1234', role: 'admin' },
  { username: 'staff1', password: '1234', role: 'staff' },
  { username: 'customer1', password: '1234', role: 'customer' },
  { username: 'customer2', password: '1234', role: 'customer' },
];

export function seedUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(seedUsersDefault));
      return;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.setItem(USERS_KEY, JSON.stringify(seedUsersDefault));
      return;
    }
    // Merge missing default users without overwriting existing ones
    const existingUsernames = new Set(parsed.map((u) => u.username));
    const merged = parsed.slice();
    for (const def of seedUsersDefault) {
      if (!existingUsernames.has(def.username)) {
        merged.push(def);
      }
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(merged));
  } catch (e) {
    localStorage.setItem(USERS_KEY, JSON.stringify(seedUsersDefault));
  }
}

export function addUser(user) {
  // user: { username, password, role }
  const raw = localStorage.getItem(USERS_KEY);
  const list = raw ? JSON.parse(raw) : [];
  if (list.find((u) => u.username === user.username)) {
    throw new Error('User already exists');
  }
  list.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

export function login(username, password) {
  seedUsers();
  const raw = localStorage.getItem(USERS_KEY);
  const list = raw ? JSON.parse(raw) : [];
  const user = list.find((u) => u.username === username && u.password === password);
  if (!user) return null;
  const session = { username: user.username, role: user.role, time: Date.now() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function listUsers() {
  seedUsers();
  const raw = localStorage.getItem(USERS_KEY);
  const list = raw ? JSON.parse(raw) : [];
  return list.map((u) => ({ username: u.username, role: u.role }));
}

export function updateUserRole(username, newRole) {
  // Only allow switching between staff and customer. Admin is readonly.
  const ALLOWED = ['staff', 'customer'];
  if (!ALLOWED.includes(newRole)) {
    throw new Error('Invalid role');
  }
  seedUsers();
  const raw = localStorage.getItem(USERS_KEY);
  const list = raw ? JSON.parse(raw) : [];
  const idx = list.findIndex((u) => u.username === username);
  if (idx === -1) throw new Error('User not found');
  if (list[idx].role === 'admin') throw new Error('Cannot change admin role');
  list[idx] = { ...list[idx], role: newRole };
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
  return { username: list[idx].username, role: list[idx].role };
}
