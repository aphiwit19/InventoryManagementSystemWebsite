import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProduct, updateProduct } from '../../api/products'

function AdminEdit() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [form, setForm] = useState({
    productName: '',
    productPrice: '',
    quantity: '',
    productDescription: '',
    imageUrl: '',
    location: '',
    dateAdded: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    (async () => {
      if (!id) return
      const p = await getProduct(id)
      if (!p) return

      setForm({
        productName: p.productName || '',
        productPrice: String(p.productPrice ?? ''),
        quantity: String(p.quantity ?? ''),
        productDescription: p.productDescription || '',
        imageUrl: p.imageUrl || '',
        location: p.location || '',
        dateAdded: p.dateAdded || '',
      })
    })()
  }, [id])

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const validate = () => {
    const e = {}
    if (!form.productName) e.productName = 'กรุณากรอกชื่อสินค้า'
    if (form.productPrice === '' || isNaN(Number(form.productPrice))) e.productPrice = 'กรุณากรอกราคาและต้องเป็นตัวเลข'
    if (form.quantity === '' || isNaN(Number(form.quantity))) e.quantity = 'กรุณากรอกจำนวนและต้องเป็นตัวเลข'
    if (!form.productDescription) e.productDescription = 'กรุณากรอกคำอธิบายสินค้า'
    if (!form.imageUrl) e.imageUrl = 'กรุณากรอกลิงก์รูปภาพ'
    if (!form.location) e.location = 'กรุณากรอกที่ตั้งสินค้า'
    if (!form.dateAdded) e.dateAdded = 'กรุณาเลือกวันที่สินค้าเข้า'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const eMap = validate()
    if (Object.keys(eMap).length) {
      setErrors(eMap)
      return
    }

    try {
      await updateProduct(id, {
        productName: form.productName,
        productPrice: Number(form.productPrice),
        quantity: Number(form.quantity),
        productDescription: form.productDescription,
        imageUrl: form.imageUrl,
        location: form.location,
        dateAdded: form.dateAdded,
      })

      navigate(-1) // ย้อนกลับ
    } catch (err) {
      alert('ไม่สามารถบันทึกการแก้ไขได้')
    }
  }

  return (
    <>
      <h1>แก้ไขสินค้า</h1>

      {!id ? (
        <div>กรุณาเลือกสินค้าที่ต้องการแก้ไข</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            ชื่อสินค้า:
            <input
              type="text"
              value={form.productName}
              onChange={(e) => handleChange('productName', e.target.value)}
            />
            {errors.productName && <div style={{ color: 'red' }}>{errors.productName}</div>}
          </label>
          <br />

          <label>
            ราคา:
            <input
              type="number"
              value={form.productPrice}
              onChange={(e) => handleChange('productPrice', e.target.value)}
            />
            {errors.productPrice && <div style={{ color: 'red' }}>{errors.productPrice}</div>}
          </label>
          <br />

          <label>
            จำนวน:
            <input
              type="number"
              value={form.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
            />
            {errors.quantity && <div style={{ color: 'red' }}>{errors.quantity}</div>}
          </label>
          <br />

          <label>
            คำอธิบายสินค้า:
            <textarea
              value={form.productDescription}
              onChange={(e) => handleChange('productDescription', e.target.value)}
            />
            {errors.productDescription && <div style={{ color: 'red' }}>{errors.productDescription}</div>}
          </label>
          <br />

          <label>
            ลิงก์รูปภาพ:
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => handleChange('imageUrl', e.target.value)}
            />
            {errors.imageUrl && <div style={{ color: 'red' }}>{errors.imageUrl}</div>}
          </label>
          <br />

          <label>
            ที่ตั้งสินค้า:
            <input
              type="text"
              value={form.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
            {errors.location && <div style={{ color: 'red' }}>{errors.location}</div>}
          </label>
          <br />

          <label>
            วันที่สินค้าเข้า:
            <input
              type="date"
              value={form.dateAdded}
              onChange={(e) => handleChange('dateAdded', e.target.value)}
            />
            {errors.dateAdded && <div style={{ color: 'red' }}>{errors.dateAdded}</div>}
          </label>
          <br />

          <button type="submit">บันทึกการแก้ไข</button>
          <button type="button" onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>
            ยกเลิก
          </button>
        </form>
      )}
    </>
  )
}

export default AdminEdit
