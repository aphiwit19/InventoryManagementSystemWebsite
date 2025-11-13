import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../../mocktest/auth'

function Adminlayout() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5', padding: '8px ', alignItems: 'stretch', gap: '16px' }}>
      <aside
        style={{
          width: '280px',
          backgroundColor: '#ffffffff',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          borderTopRightRadius: '12px',
          borderBottomRightRadius: '12px',
          height: '100%',
          boxSizing: 'border-box'
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#222' }}>Addmin Panel</h2>

        <nav style={{ display: 'grid', gap: '12px' }}>
          <NavLink
            to="/admin"
            end
            style={({ isActive }) => ({
              display: 'block',
              padding: '12px 14px',
              borderRadius: '8px',
              backgroundColor: isActive ? '#2e6dc1' : '#d8dbdef8',
              color: isActive ? '#fff' : '#111',
              textDecoration: 'none',
              fontWeight: 600,
              textAlign: 'center',
            })}
          >
            รายการสินค้า
          </NavLink>

          <NavLink
            to="/admin/add"
            style={({ isActive }) => ({
              display: 'block',
              padding: '12px 14px',
              borderRadius: '8px',
              backgroundColor: isActive ? '#2e6dc1' : '#d8dbdef8',
              color: isActive ? '#fff' : '#111',
              textDecoration: 'none',
              fontWeight: 600,
              textAlign: 'center',
            })}
          >
            เพิ่มสินค้า
          </NavLink>

          <NavLink
            to="/admin/addminorders"
            style={({ isActive }) => ({
              display: 'block',
              padding: '12px 14px',
              borderRadius: '8px',
              backgroundColor: isActive ? '#2e6dc1' : '#d8dbdef8',
              color: isActive ? '#fff' : '#111',
              textDecoration: 'none',
              fontWeight: 600,
              textAlign: 'center',
            })}
          >
            คำสั่งซื้อ
          </NavLink>

          <NavLink
            to="/admin/stockhistory"
            style={({ isActive }) => ({
              display: 'block',
              padding: '12px 14px',
              borderRadius: '8px',
              backgroundColor: isActive ? '#2e6dc1' : '#d8dbdef8',
              color: isActive ? '#fff' : '#111',
              textDecoration: 'none',
              fontWeight: 600,
              textAlign: 'center',
            })}
          >
            รายการสินค้า (เข้า-ออก)
          </NavLink>

          <NavLink
            to="/admin/manageusers"
            style={({ isActive }) => ({
              display: 'block',
              padding: '12px 14px',
              borderRadius: '8px',
              backgroundColor: isActive ? '#2e6dc1' : '#d8dbdef8',
              color: isActive ? '#fff' : '#111',
              textDecoration: 'none',
              fontWeight: 600,
              textAlign: 'center',
            })}
          >
            จัดการสิทธิ์ผู้ใช้
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={() => {
            logout();
            navigate('/login');
          }}
          style={{
            marginTop: '16px',
            width: '100%',
            padding: '12px 14px',
            borderRadius: '8px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          ออกจากระบบ
        </button>
      </aside>

      <main style={{ flex: 1, padding: 0, height: '100%' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Adminlayout