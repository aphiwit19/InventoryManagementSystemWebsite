import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin, getSession, seedUsers } from '../mocktest/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  //จัดการเข้าสู่หน้าตาม role
  useEffect(() => {
    seedUsers();
    const ses = getSession();
    if (ses && ses.role) {
      if (ses.role === 'admin') navigate('/admin');
      else if (ses.role === 'staff') navigate('/staff');
      else if (ses.role === 'customer') navigate('/customer');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password');
      return;
    }
    const ses = authLogin(username.trim(), password.trim());
    if (!ses) {
      setError('Invalid username or password');
      return;
    }
    if (ses.role === 'admin') navigate('/admin');
    else if (ses.role === 'staff') navigate('/staff');
    else if (ses.role === 'customer') navigate('/customer');
    else setError('Unknown role');
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{ 
        padding: '2rem', 
        borderRadius: '8px', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        width: '300px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                marginTop: '0.25rem', 
                borderRadius: '4px', 
                border: '1px solid #ccc' 
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                marginTop: '0.25rem', 
                borderRadius: '4px', 
                border: '1px solid #ccc' 
              }}
            />
          </div>
          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Login
          </button>
        </form>
        
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666', textAlign: 'center' }}>
          ยังไม่มีบัญชี?
          <button
            type="button"
            onClick={() => navigate('/register')}
            style={{
              marginLeft: '0.5rem',
              background: 'none',
              border: 'none',
              color: '#007bff',
              cursor: 'pointer',
              padding: 0
            }}
          >
            สมัครสมาชิก
          </button>
        </div>
      </div>
    </div>
  );
}