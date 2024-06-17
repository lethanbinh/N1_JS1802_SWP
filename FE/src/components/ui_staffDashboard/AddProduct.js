import React, { useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormTextarea,
    CRow,
} from '@coreui/react';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        image: '', // Lưu trữ dưới dạng base64 nếu bạn muốn hiển thị từ local
        description: '',
        purchasePrice: '',
        sellPrice: '',
        quantity: '',
        status: true,
        weight: '',
        size: '',
        stallLocation: '',
        type: '',
        stallId: ''
    });

    // Xử lý thay đổi các trường dữ liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    // Xử lý khi người dùng chọn ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    image: reader.result // Lưu trữ ảnh dưới dạng base64
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Xử lý khi người dùng nhấn nút submit
    const handleSubmit = () => {
        // Thực hiện các logic xử lý khi người dùng submit form, ví dụ lưu vào cơ sở dữ liệu
        console.log('Product submitted:', product);
        // Reset form after submission (optional)
        setProduct({
            name: '',
            image: '',
            description: '',
            purchasePrice: '',
            sellPrice: '',
            quantity: '',
            status: true,
            weight: '',
            size: '',
            stallLocation: '',
            type: '',
            stallId: ''
        });
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Add Product</strong>
                    </CCardHeader>
                    <CCardBody>
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
                                        style={{ width: '100%', height: 'auto', marginTop: '10px' }}
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
                                <CFormInput
                                    type="text"
                                    name="size"
                                    label="Size"
                                    value={product.size}
                                    onChange={handleChange}
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    name="stallLocation"
                                    label="Stall Location"
                                    value={product.stallLocation}
                                    onChange={handleChange}
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    name="type"
                                    label="Type"
                                    value={product.type}
                                    onChange={handleChange}
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    type="number"
                                    name="stallId"
                                    label="Stall ID"
                                    value={product.stallId}
                                    onChange={handleChange}
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    type="checkbox"
                                    name="status"
                                    label="Status"
                                    checked={product.status}
                                    onChange={(e) => setProduct((prevProduct) => ({
                                        ...prevProduct,
                                        status: e.target.checked
                                    }))}
                                />
                            </CCol>
                        </CRow>
                        <CButton
                            color="primary"
                            className="mt-4"
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
