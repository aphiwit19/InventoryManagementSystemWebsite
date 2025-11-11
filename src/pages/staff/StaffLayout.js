import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

function StaffLayout() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <aside
        style={{
          width: '280px',
          backgroundColor: '#ffffff',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          borderTopRightRadius: '12px',
          borderBottomRightRadius: '12px',
          margin: '8px 0 8px 8px'
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
              backgroundColor: isActive ? '#2e6dc1' : '#e9ecef',
              color: isActive ? '#fff' : '#111',
              textDecoration: 'none',
              fontWeight: 600,
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
              backgroundColor: isActive ? '#2e6dc1' : '#e9ecef',
              color: isActive ? '#fff' : '#111',
              textDecoration: 'none',
              fontWeight: 600,
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
              backgroundColor: isActive ? '#2e6dc1' : '#e9ecef',
              color: isActive ? '#fff' : '#111',
              textDecoration: 'none',
              fontWeight: 600,
            })}
          >
            ติดตามสถานะ
          </NavLink>
        </nav>
        <button
          type="button"
          onClick={() => {
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

      <main style={{ flex: 1, padding: '24px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
          }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default StaffLayout