// ตั้งค่าโหมดของผู้ให้บริการข้อมูล (local = ใช้ localStorage, http = เรียก API จริง)
const MODE = process.env.REACT_APP_API_MODE || 'local';
// โดเมน/ฐาน URL ของ Backend API เมื่อใช้โหมด http
const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

// ชื่อ key สำหรับเก็บข้อมูลสินค้าใน localStorage
const localKey = 'products';

// ผู้ให้บริการแบบ localStorage (ใช้ทดแทน backend ชั่วคราว)
const localProvider = {
  // ดึงสินค้าทั้งหมดจาก localStorage
  async getProducts() {
    const items = JSON.parse(localStorage.getItem(localKey) || '[]');
    return items;
  },
  // ดึงสินค้า 1 รายการตาม id
  async getProduct(id) {
    const items = JSON.parse(localStorage.getItem(localKey) || '[]');
    return items.find(p => String(p.id) === String(id)) || null;
  },
  // สร้างสินค้าใหม่และบันทึกลง localStorage
  async createProduct(data) {
    const items = JSON.parse(localStorage.getItem(localKey) || '[]');
    const product = { id: Date.now(), ...data };
    items.push(product);
    localStorage.setItem(localKey, JSON.stringify(items));
    return product;
  },
  // อัปเดตข้อมูลสินค้าตาม id
  async updateProduct(id, data) {
    const items = JSON.parse(localStorage.getItem(localKey) || '[]');
    const idx = items.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return null;
    const updated = { ...items[idx], ...data };
    items[idx] = updated;
    localStorage.setItem(localKey, JSON.stringify(items));
    return updated;
  },
  // ลบสินค้าออกจาก localStorage ตาม id
  async deleteProduct(id) {
    const items = JSON.parse(localStorage.getItem(localKey) || '[]');
    const next = items.filter(p => String(p.id) !== String(id));
    localStorage.setItem(localKey, JSON.stringify(next));
    return { success: true };
  }
};

// ผู้ให้บริการแบบ HTTP (เรียก Backend จริงผ่าน REST API)
const httpProvider = {
  // ดึงสินค้าทั้งหมดจาก API (รองรับทั้งรูปแบบ {items: [...] } หรือ [...])
  async getProducts() {
    const res = await fetch(`${BASE_URL}/api/products`);
    if (!res.ok) throw new Error('Failed to load products');
    const data = await res.json();
    return Array.isArray(data.items) ? data.items : data;
  },
  // ดึงสินค้า 1 รายการตาม id
  async getProduct(id) {
    const res = await fetch(`${BASE_URL}/api/products/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to load product');
    return await res.json();
  },
  // สร้างสินค้าใหม่ผ่าน API
  async createProduct(data) {
    const res = await fetch(`${BASE_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create product');
    return await res.json();
  },
  // อัปเดตสินค้าเดิมผ่าน API ตาม id
  async updateProduct(id, data) {
    const res = await fetch(`${BASE_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update product');
    return await res.json();
  },
  // ลบสินค้าออกจากระบบผ่าน API ตาม id
  async deleteProduct(id) {
    const res = await fetch(`${BASE_URL}/api/products/${id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) throw new Error('Failed to delete product');
    return { success: true };
  }
};

// เลือกผู้ให้บริการตามโหมดที่กำหนดจาก .env
const provider = MODE === 'http' ? httpProvider : localProvider;

// ส่งออกฟังก์ชันหลักสำหรับใช้งานในฝั่ง UI
export const getProducts = provider.getProducts;
export const getProduct = provider.getProduct;
export const createProduct = provider.createProduct;
export const updateProduct = provider.updateProduct;
export const deleteProduct = provider.deleteProduct;
