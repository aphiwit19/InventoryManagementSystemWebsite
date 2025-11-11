import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts, deleteProduct, updateProduct } from '../../api/products'

function AdminDashboardProduct() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const loaded = await getProducts()
      setProducts(loaded)
    })()
  }, [])

  const handleDelete = async (id) => {
    await deleteProduct(id)
    setProducts(prev => prev.filter(p => p.id !== id))
  }
  //เพิ่มจำนวนสินค้าเดิม
  const handleIncrease = async (p) => {
    const input = prompt('เพิ่มจำนวนเท่าไหร่?', '1')
    if (input === null) return
    const delta = Number(input)
    if (!Number.isFinite(delta) || delta <= 0) {
      alert('กรุณากรอกจำนวนเป็นตัวเลขที่มากกว่า 0')
      return
    }
    const nextQty = Number(p.quantity) + Math.floor(delta)
    try {
      await updateProduct(p.id, { ...p, quantity: nextQty })
      setProducts(prev => prev.map(x => x.id === p.id ? { ...x, quantity: nextQty } : x))
    } catch (e) {
      alert('ไม่สามารถอัปเดตจำนวนสินค้าได้')
    }
  }

  return (
    <>
      <div>AdminDashboard</div>
      <h1>รายการสินค้า</h1>
      
      {products.length === 0 ? (
        <div>ไม่มีสินค้า</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: 8 }}>ชื่อสินค้า</th>
              <th style={{ border: '1px solid #ddd', padding: 8 }}>ราคา (บาท)</th>
              <th style={{ border: '1px solid #ddd', padding: 8 }}>จำนวน (ชิ้น)</th>
              <th style={{ border: '1px solid #ddd', padding: 8 }}>คำอธิบาย</th>
              <th style={{ border: '1px solid #ddd', padding: 8 }}>รูปภาพ</th>
              <th style={{ border: '1px solid #ddd', padding: 8 }}>วันที่สินค้าเข้า</th>
              <th style={{ border: '1px solid #ddd', padding: 8 }}>ที่ตั้งสินค้า</th>
              <th style={{ border: '1px solid #ddd', padding: 8 }}>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>
                  {p.productName}
                </td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>
                  {p.productPrice} บาท
                </td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>
                  {p.quantity} ชิ้น
                </td>
                <td style={{ border: '1px solid #ddd', padding: 8, maxWidth: 240 }}>
                  {p.productDescription}
                </td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>
                  {p.imageUrl ? <img src={p.imageUrl} alt={p.productName} style={{ width: 60, height: 60, objectFit: 'cover' }} /> : '-'}
                </td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>
                  {p.dateAdded}
                </td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>{p.location}</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>
                  <button onClick={() => handleIncrease(p)}>เพิ่ม</button>
                  <button onClick={() => navigate(`/admin/edit/${p.id}`)} style={{ marginLeft: 8 }}>แก้ไข</button>
                  <button onClick={() => handleDelete(p.id)} style={{ marginLeft: 8 }}>ลบ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default AdminDashboardProduct