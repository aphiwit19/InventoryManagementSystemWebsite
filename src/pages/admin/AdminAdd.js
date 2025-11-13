import React, { useState } from 'react';
import { createProduct } from '../../api/products';
import './AdminAdd.css';

function AdminAdd() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!productName) {
      newErrors.productName = 'กรุณากรอกชื่อสินค้า';
    }

    if (!productPrice || isNaN(productPrice)) {
      newErrors.productPrice = 'กรุณากรอกราคาและต้องเป็นตัวเลข';
    }

    if (!productDescription) {
      newErrors.productDescription = 'กรุณากรอกคำอธิบายสินค้า';
    }

    if (quantity === '' || isNaN(quantity)) {
      newErrors.quantity = 'กรุณากรอกจำนวนและต้องเป็นตัวเลข';
    }

    if (!imageUrl) {
      newErrors.imageUrl = 'กรุณากรอกลิงก์รูปภาพ';
    }

    if (!dateAdded) {
      newErrors.dateAdded = 'กรุณาเลือกวันที่สินค้าเข้า';
    }

    if (!location) {
      newErrors.location = 'กรุณากรอกที่ตั้งสินค้า';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const product = {
        id: Date.now(),
        productName,
        productPrice: Number(productPrice),
        quantity: Number(quantity),
        productDescription,
        imageUrl,
        dateAdded,
        location,
      };
      try {
        await createProduct(product);
        if (window && window.history) {
          window.history.back();
        }
      } catch (e) {
        alert('ไม่สามารถบันทึกสินค้าได้');
      }
    }
  };

  const handleCancel = () => {
    // Perform cancel/back action
    if (window && window.history) {
      window.history.back();
    }
  };

  return (
    <div className="admin-add">
      <h1>เพิ่มรายการสินค้าใหม่</h1>
      <form onSubmit={handleSubmit} className="admin-add-form">
        <label>
          ชื่อสินค้า:
          <input
            type="text"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}

          />
          {errors.productName && <div className="field-error">{errors.productName}</div>}
        </label>
        <label>
          ราคา:
          <input
            type="number"
            value={productPrice}
            onChange={(event) => setProductPrice(event.target.value)}
            min={0}
            step="0.01"
          />
          {errors.productPrice && <div className="field-error">{errors.productPrice}</div>}
        </label>
        <label>
          จำนวน:
          <input
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            min={0}
            step="1"
          />
          {errors.quantity && <div className="field-error">{errors.quantity}</div>}
        </label>
        <label>
          คำอธิบายสินค้า:
          <textarea
            value={productDescription}
            onChange={(event) => setProductDescription(event.target.value)}
            rows={4}
          />
          {errors.productDescription && <div className="field-error">{errors.productDescription}</div>}
        </label>
        <label>
          ลิงก์รูปภาพ:
          <input
            type="url"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}

          />
          {errors.imageUrl && <div className="field-error">{errors.imageUrl}</div>}
        </label>
        <label>
          ที่ตั้งสินค้า:
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}

          />
          {errors.location && <div className="field-error">{errors.location}</div>}
        </label>
        <label>
          วันที่สินค้าเข้า:
          <input
            type="date"
            value={dateAdded}
            onChange={(event) => setDateAdded(event.target.value)}
          />
          {errors.dateAdded && <div className="field-error">{errors.dateAdded}</div>}
        </label>
        <div className="actions">
          <button type="button" className="btn btn-ghost" onClick={handleCancel}>ยกเลิก</button>
          <button type="submit" className="btn btn-primary">บันทึกสินค้า</button>
        </div>
      </form>
    </div>
  );
}

export default AdminAdd;