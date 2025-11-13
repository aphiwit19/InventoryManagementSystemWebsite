import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProduct, updateProduct } from '../../api/products'
import './AdminEdit.css'

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
    <div className="admin-edit">
      <h1>แก้ไขสินค้า</h1>

      {!id ? (
        <div>กรุณาเลือกสินค้าที่ต้องการแก้ไข</div>
      ) : (
        <form onSubmit={handleSubmit} className="admin-edit-form">
          <label>
            ชื่อสินค้า:
            <input
              type="text"
              value={form.productName}
              onChange={(e) => handleChange('productName', e.target.value)}
              
            />
            {errors.productName && <div className="field-error">{errors.productName}</div>}
          </label>

          <label>
            ราคา:
            <input
              type="number"
              value={form.productPrice}
              onChange={(e) => handleChange('productPrice', e.target.value)}
              
              min={0}
              step="0.01"
            />
            {errors.productPrice && <div className="field-error">{errors.productPrice}</div>}
          </label>

          <label>
            จำนวน:
            <input
              type="number"
              value={form.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              
              min={0}
              step="1"
            />
            {errors.quantity && <div className="field-error">{errors.quantity}</div>}
          </label>

          <label>
            คำอธิบายสินค้า:
            <textarea
              value={form.productDescription}
              onChange={(e) => handleChange('productDescription', e.target.value)}
              rows={4}
            />
            {errors.productDescription && <div className="field-error">{errors.productDescription}</div>}
          </label>

          <label>
            ลิงก์รูปภาพ:
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => handleChange('imageUrl', e.target.value)}
            />
            {errors.imageUrl && <div className="field-error">{errors.imageUrl}</div>}
          </label>

          <label>
            ที่ตั้งสินค้า:
            <input
              type="text"
              value={form.location}
              onChange={(e) => handleChange('location', e.target.value)}            />
            {errors.location && <div className="field-error">{errors.location}</div>}
          </label>

          <label>
            วันที่สินค้าเข้า:
            <input
              type="date"
              value={form.dateAdded}
              onChange={(e) => handleChange('dateAdded', e.target.value)}
            />
            {errors.dateAdded && <div className="field-error">{errors.dateAdded}</div>}
          </label>

          <div className="actions">
            <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>ยกเลิก</button>
            <button type="submit" className="btn btn-primary">บันทึกการแก้ไข</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AdminEdit
