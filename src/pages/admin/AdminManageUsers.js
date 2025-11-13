import React, { useEffect, useState } from 'react'
import { listUsers, updateUserRole } from '../../mocktest/auth'
import './AdminManageUsers.css'

function AdminManageUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingIds, setSavingIds] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    try {
      const data = listUsers()
      if (mounted) setUsers(data)
    } catch (e) {
      if (mounted) setError('ไม่สามารถโหลดรายชื่อผู้ใช้ได้')
    } finally {
      if (mounted) setLoading(false)
    }
    return () => {
      mounted = false
    }
  }, [])

  const handleChangeRole = async (username, newRole) => {
    setError('')
    setSavingIds((s) => ({ ...s, [username]: true }))
    const prev = users
    setUsers((list) => list.map((u) => (u.username === username ? { ...u, role: newRole } : u)))
    try {
      updateUserRole(username, newRole)
    } catch (e) {
      setUsers(prev)
      setError(e?.message || 'อัปเดตสิทธิ์ล้มเหลว')
    } finally {
      setSavingIds((s) => ({ ...s, [username]: false }))
    }
  }

  return (
    <div className="manage-users">
      <h1 className="mu-title">จัดการสิทธิ์ผู้ใช้</h1>
      {error && (
        <div className="mu-error">{error}</div>
      )}
      <div className="mu-table-wrap">
        <table className="mu-table">
          <thead>
            <tr>
              <th>ผู้ใช้</th>
              <th>สถานะ</th>
              <th>จัดการสิทธิ์</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.username}>
                <td>{u.username}</td>
                <td>
                  <span className={`mu-badge mu-badge--${u.role}`}>{u.role}</span>
                </td>
                <td>
                  <select
                    className="mu-role-select"
                    value={u.role === 'admin' ? 'admin' : u.role}
                    onChange={(e) => handleChangeRole(u.username, e.target.value)}
                    disabled={u.role === 'admin' || !!savingIds[u.username]}
                  >
                    {/* Admin cannot be changed; offer staff/customer for others */}
                    {u.role === 'admin' ? (
                      <option value="admin">admin</option>
                    ) : (
                      <>
                        <option value="customer">customer</option>
                        <option value="staff">staff</option>
                      </>
                    )}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminManageUsers