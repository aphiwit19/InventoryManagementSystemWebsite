import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../../mocktest/auth'

function StaffLayout() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5', padding: '8px ', alignItems: 'stretch', gap: '16px' }}>
      <aside
        style={{
          width: '280px',
          backgroundColor: '#ffffff',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          borderTopRightRadius: '12px',
          borderBottomRightRadius: '12px',
          height: '100%',
          boxSizing: 'border-box'
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#222' }}>Staff Panel</h2>

        <nav style={{ display: 'grid', gap: '12px' }}>
          <NavLink
            to="/staff"
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
            to="/staff/stafforders"
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
            คำสั่งเบิกสินค้า
          </NavLink>

          <NavLink
            to="/staff/staffstatus"
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
            ติดตามสถานะ
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
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default StaffLayout