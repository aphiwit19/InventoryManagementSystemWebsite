import React, { useState } from 'react';
import { createProduct } from '../../api/products';

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
    <>
      <div>แอดมิน</div>
      <h1>เพิ่มสินค้า</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ชื่อสินค้า:
          <input
            type="text"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
          />
          {errors.productName && <div style={{ color: 'red' }}>{errors.productName}</div>}
        </label>
        <br />
        <label>
          ราคา:
          <input
            type="number"
            value={productPrice}
            onChange={(event) => setProductPrice(event.target.value)}
          />
          {errors.productPrice && <div style={{ color: 'red' }}>{errors.productPrice}</div>}
        </label>
        <br />
        <label>
          จำนวน:
          <input
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
          {errors.quantity && <div style={{ color: 'red' }}>{errors.quantity}</div>}
        </label>
        <br />
        <label>
          คำอธิบายสินค้า:
          <textarea
            value={productDescription}
            onChange={(event) => setProductDescription(event.target.value)}
          />
          {errors.productDescription && <div style={{ color: 'red' }}>{errors.productDescription}</div>}
        </label>
        <br />
        <label>
          ลิงก์รูปภาพ:
          <input
            type="url"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
          />
          {errors.imageUrl && <div style={{ color: 'red' }}>{errors.imageUrl}</div>}
        </label>
        <br />
        <label>
          ที่ตั้งสินค้า:
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
          {errors.location && <div style={{ color: 'red' }}>{errors.location}</div>}
        </label>
        <br />
        <label>
          วันที่สินค้าเข้า:
          <input
            type="date"
            value={dateAdded}
            onChange={(event) => setDateAdded(event.target.value)}
          />
          {errors.dateAdded && <div style={{ color: 'red' }}>{errors.dateAdded}</div>}
        </label>
        <br />
        <button type="submit">บันทึกสินค้า</button>
        <button type="button" onClick={handleCancel}>
          ยกเลิก
        </button>
      </form>
    </>
  );
}

export default AdminAdd;