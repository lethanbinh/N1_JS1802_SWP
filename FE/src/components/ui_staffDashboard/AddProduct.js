import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react';
import React, { useState } from 'react';
import UserStorage from '../../util/UserStorage';
import '../../customStyles.css'

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    image: '',
    description: '',
    purchasePrice: '',
    sellPrice: '',
    quantity: '',
    weight: '',
    size: '',
    status: '',
    stallLocation: '',
    type: '',
    stallId: ''
  });

  const [error, setError] = useState('');
  const userInfo = UserStorage.getAuthenticatedUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['purchasePrice', 'sellPrice', 'quantity', 'weight'].includes(name) && value < 0) {
      setError(`${name} must be non-negative.`);
      return;
    }
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    const requiredFields = ['name', 'image', 'description', 'purchasePrice', 'sellPrice', 'quantity', 'weight', 'size', 'stallLocation', 'type', 'stallId'];
    for (let field of requiredFields) {
      if (!product[field]) {
        setError(`Please fill out the ${field} field.`);
        return;
      }
    }

    // Kiểm tra purchasePrice không lớn hơn sellPrice
    if (parseFloat(product.purchasePrice) > parseFloat(product.sellPrice)) {
      setError('Purchase price cannot be greater than sell price.');
      return;
    }

    const savedProduct = {
      ...product,
      purchasePrice: parseFloat(product.purchasePrice),
      sellPrice: parseFloat(product.sellPrice),
      quantity: parseInt(product.quantity),
      weight: parseFloat(product.weight),
      status: product.status,
    };

    console.log(savedProduct)

    try {
      const response = await fetch('http://localhost:8080/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.accessToken}` // Add the authorization header
        },
        body: JSON.stringify(savedProduct)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error ${response.status}: ${response.statusText}`, errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Product added:', data);

      // Reset form hoặc chuyển hướng người dùng
      setProduct({
        name: '',
        image: '',
        description: '',
        purchasePrice: '',
        sellPrice: '',
        quantity: '',
        weight: '',
        size: '',
        status: '',
        stallLocation: '',
        type: '',
        stallId: ''
      });
      setError('');
    } catch (error) {
      console.error('There was an error adding the product!', error);
      setError('There was an error adding the product!');
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Product</strong>
          </CCardHeader>
          <CCardBody>
            {error && (
              <div style={{ color: 'red', marginBottom: '10px' }}>
                {error}
              </div>
            )}
            <CRow>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="name"
                  label="Name"
                  value={product.name}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="file"
                  name="image"
                  label="Image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12}>
                {product.image && (
                  <img
                    src={product.image}
                    alt="Product Preview"
                    style={{ width: '50%', height: 'auto', marginTop: '10px' }}
                  />
                )}
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12}>
                <CFormTextarea
                  name="description"
                  label="Description"
                  value={product.description}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={4}>
                <CFormInput
                  type="number"
                  name="purchasePrice"
                  label="Purchase Price"
                  value={product.purchasePrice}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="number"
                  name="sellPrice"
                  label="Sell Price"
                  value={product.sellPrice}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="number"
                  name="quantity"
                  label="Quantity"
                  value={product.quantity}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={4}>
                <CFormInput
                  type="number"
                  name="weight"
                  label="Weight"
                  value={product.weight}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  name="size"
                  value={product.size}
                  onChange={handleChange}
                  label="Size">
                  <option value="">Select Size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  name="stallLocation"
                  value={product.stallLocation}
                  onChange={handleChange}
                  label="Stall Location">
                  <option value="">Select location</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                  <option value="S4">S4</option>
                  <option value="S5">S5</option>
                  <option value="S6">S6</option>
                  <option value="S7">S7</option>
                  <option value="S8">S8</option>
                  <option value="S9">S9</option>
                  <option value="S10">S10</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={4}>
                <CFormSelect
                  name="type"
                  value={product.type}
                  onChange={handleChange}
                  label="Type">
                  <option value="">Select Type</option>
                  <option value="necklace">Necklace</option>
                  <option value="ring">Ring</option>
                  <option value="earrings">Earrings</option>
                  <option value="bracelet">Bracelet</option>
                  <option value="pendant">Pendant</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  name="stallId"
                  value={product.stallId}
                  onChange={handleChange}
                  label="Stall">
                  <option value="">Select Stall</option>
                  <option value="1">Stall 1</option>
                  <option value="2">Stall 2</option>
                  <option value="3">Stall 3</option>
                  <option value="4">Stall 4</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  name="status"
                  value={product.status}
                  onChange={handleChange}
                  label="Status">
                  <option value="">Select Stall</option>
                  <option value="SELL">Sell</option>
                  <option value="PURCHASE">Purchase</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CButton
              color="primary"
              className="mt-4 custom-btn custom-btn-primary"
              onClick={handleSubmit}
            >
              Submit Product
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddProduct;
