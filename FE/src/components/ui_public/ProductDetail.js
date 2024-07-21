import React, { useState, useEffect } from 'react';
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
    CContainer,
    CRow,
    CCol,
    CImage,
    CBadge,
    CFormInput,
    CFormSelect,
    CAlert,
    CFormLabel,
} from '@coreui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './ProductDetailModal.css'; // Tạo file CSS riêng để tùy chỉnh giao diện
import UserStorage from '../../util/UserStorage';
import fetchData from '../../util/ApiConnection';

const ProductDetailModal = ({ visible, setVisible, selectedProduct, setSelectedProduct, product, setProduct, stallName }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState({ ...selectedProduct });
    const [user, setUser] = useState(UserStorage.getAuthenticatedUser());
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const loadData = async (stallName) => {
        if (!stallName) return;
        try {
            const productData = await fetchData(`http://localhost:8080/api/v1/products/stallName/${stallName}`, 'GET', null, user.accessToken);
            if (productData && productData.payload) {
                setProduct(productData.payload);
            } else {
                setProduct([]);
            }
        } catch (error) {
            setProduct([]);
        }
    };

    useEffect(() => {
        setEditedProduct({ ...selectedProduct });
    }, [selectedProduct]);

    const getImageIdFromUrl = (url) => {
        const parts = url.split('/images/');
        if (parts.length > 1) {
            return parts[1];
        } else {
            return null;
        }
    };

    const formatPrice = (price) => {
        return `${price.toLocaleString('en-US')} VND`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleSave = () => {
        const validationErrors = [];

        if (!editedProduct.name) validationErrors.push('Name cannot be empty');
        if (editedProduct.quantity === '' || editedProduct.quantity < 0) validationErrors.push('Quantity must be greater than or equal to 0');
        if (editedProduct.sellPrice === '' || editedProduct.sellPrice <= 0) validationErrors.push('Price must be greater than 0');
        if (editedProduct.weight === '' || editedProduct.weight <= 0) validationErrors.push('Weight must be greater than 0');
        if (!editedProduct.type) validationErrors.push('Type cannot be empty');
        if (!editedProduct.size) validationErrors.push('Size cannot be empty');
        if (!editedProduct.description) validationErrors.push('Description cannot be empty');

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            setEditedProduct(selectedProduct);
            setTimeout(() => setErrors([]), 5000);
            return;
        }

        setSelectedProduct(editedProduct);
        setIsEditing(false);
        let savedData = { ...editedProduct };
        savedData.image = getImageIdFromUrl(editedProduct.image);
        fetchData(`http://localhost:8080/api/v1/products/id/${savedData.id}`, 'PUT', savedData, user.accessToken)
            .then(() => {
                loadData(stallName);
                setSuccessMessage('Product saved successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            });
    };

    return (
        selectedProduct && (
            <CModal visible={visible} onClose={() => {
                setVisible(false);
                setIsEditing(false);
            }} size="xl">
                <CModalHeader onClose={() => {
                    setVisible(false);
                    setIsEditing(false);
                }}>
                    <CModalTitle style={{ textAlign: "center", width: "100%", fontSize: "30px" }}>{isEditing ? 'Edit Product' : 'View Detail'}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {errors.length > 0 && (
                        <CAlert color="danger" onClose={() => setErrors([])} dismissible>
                            {errors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </CAlert>
                    )}
                    {successMessage && (
                        <CAlert color="success" onClose={() => setSuccessMessage('')} dismissible>
                            {successMessage}
                        </CAlert>
                    )}
                    <section className="product-detail-section py-5">
                        <CContainer>
                            <CRow className="gx-5">
                                <CCol lg="6">
                                    <div className="product-image-gallery mb-4">
                                        <div className="main-image mb-3">
                                            <a href={selectedProduct.image} target="_blank" rel="noreferrer">
                                                <CImage src={selectedProduct.image} alt={selectedProduct.name} className="w-100 rounded-3 shadow-sm" />
                                            </a>
                                        </div>
                                    </div>
                                </CCol>
                                <CCol lg="6">
                                    <div className="product-details ps-lg-3">
                                        {isEditing ? (
                                            <CRow>
                                                <CCol md={12} className="mb-3">
                                                    <CFormLabel htmlFor="name">Name</CFormLabel>
                                                    <CFormInput
                                                        id="name"
                                                        style={{ border: '1px solid #adb5bd' }}
                                                        name="name"
                                                        value={editedProduct.name}
                                                        onChange={handleChange}
                                                        className="shadow-sm"
                                                    />
                                                </CCol>
                                                <CCol md={6} className="mb-3">
                                                    <CFormLabel htmlFor="quantity">Quantity</CFormLabel>
                                                    <CFormInput
                                                        id="quantity"
                                                        style={{ border: '1px solid #adb5bd' }}
                                                        name="quantity"
                                                        value={editedProduct.quantity}
                                                        onChange={handleChange}
                                                        className="shadow-sm"
                                                    />
                                                </CCol>
                                                <CCol md={6} className="mb-3">
                                                    <CFormLabel htmlFor="sellPrice">Price (VND)</CFormLabel>
                                                    <CFormInput
                                                        id="sellPrice"
                                                        style={{ border: '1px solid #adb5bd' }}
                                                        name="sellPrice"
                                                        value={editedProduct.sellPrice}
                                                        onChange={handleChange}
                                                        className="shadow-sm"
                                                    />
                                                </CCol>
                                                <CCol md={12} className="mb-3">
                                                    <CFormLabel htmlFor="description">Description</CFormLabel>
                                                    <CFormInput
                                                        id="description"
                                                        style={{ border: '1px solid #adb5bd' }}
                                                        name="description"
                                                        value={editedProduct.description}
                                                        onChange={handleChange}
                                                        className="shadow-sm"
                                                    />
                                                </CCol>
                                                <CCol md={6} className="mb-3">
                                                    <CFormLabel htmlFor="type">Type</CFormLabel>
                                                    <CFormSelect
                                                        id="type"
                                                        name="type"
                                                        value={editedProduct.type}
                                                        onChange={handleChange}
                                                        style={{ border: '1px solid #adb5bd' }}
                                                        className="shadow-sm"
                                                    >
                                                        <option value="necklace">Necklace</option>
                                                        <option value="ring">Ring</option>
                                                        <option value="earrings">Earrings</option>
                                                        <option value="bracelet">Bracelet</option>
                                                        <option value="pendant">Pendant</option>
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol md={6} className="mb-3">
                                                    <CFormLabel htmlFor="weight">Weight (g)</CFormLabel>
                                                    <CFormInput
                                                        id="weight"
                                                        style={{ border: '1px solid #adb5bd' }}
                                                        name="weight"
                                                        value={editedProduct.weight}
                                                        onChange={handleChange}
                                                        className="shadow-sm"
                                                    />
                                                </CCol>
                                                <CCol md={6} className="mb-3">
                                                    <CFormLabel htmlFor="size">Size</CFormLabel>
                                                    <CFormSelect
                                                        id="size"
                                                        name="size"
                                                        value={editedProduct.size}
                                                        onChange={handleChange}
                                                        style={{ border: '1px solid #adb5bd' }}
                                                        className="shadow-sm"
                                                    >
                                                        <option value="S">S</option>
                                                        <option value="M">M</option>
                                                        <option value="L">L</option>
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol md={6} className="mb-3">
                                                    <CFormLabel>Bar Code</CFormLabel>
                                                    <div>
                                                        <CImage src={selectedProduct.barCode} alt="Bar Code" style={{ height: '50px', width: 'auto' }} className="shadow-sm" />
                                                    </div>
                                                </CCol>
                                            </CRow>
                                        ) : (
                                            <>
                                                <h4 className="product-title mb-3">{selectedProduct.name}</h4>
                                                <div className="d-flex align-items-center mb-3">
                                                    {selectedProduct.quantity > 0 ? <CBadge color="success" className="me-2">In stock</CBadge> :
                                                        <CBadge color="danger" className="me-2">Out of stock</CBadge>
                                                    }
                                                    <span className="text-muted">
                                                        <i className="fas fa-shopping-basket fa-sm mx-1"></i>
                                                        {`${selectedProduct.quantity} products`}
                                                    </span>
                                                </div>
                                                <div className="price mb-4">
                                                    <span className="h4">${formatPrice(parseInt(selectedProduct.sellPrice))}</span>
                                                    <span className="text-muted ms-2">/ per item</span>
                                                </div>
                                                <p className="product-description mb-4">{selectedProduct.description}</p>
                                                <div className="product-info mb-4">
                                                    <CRow>
                                                        <CCol xs="6">
                                                            <div className="info-item mb-3">
                                                                <strong>Type:</strong> {` ${selectedProduct.type}`}
                                                            </div>
                                                        </CCol>
                                                        <CCol xs="6">
                                                            <div className="info-item mb-3">
                                                                <strong>Weight:</strong> {` ${selectedProduct.weight}g`}
                                                            </div>
                                                        </CCol>
                                                        <CCol xs="6">
                                                            <div className="info-item mb-3">
                                                                <strong>Size:</strong> {` ${selectedProduct.size}`}
                                                            </div>
                                                        </CCol>
                                                        <CCol xs="6">
                                                            <div className="info-item mb-3">
                                                                <strong>Bar Code:</strong>
                                                                <div>
                                                                    <CImage src={selectedProduct.barCode} alt="Bar Code" style={{ height: '50px', width: 'auto' }} />
                                                                </div>
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </>
                                        )}
                                        <div className="product-actions mt-4">
                                            {isEditing ? (
                                                <>
                                                    <CButton color="success" className="me-3" onClick={handleSave}>Save</CButton>
                                                    <CButton color="secondary" onClick={() => setIsEditing(false)}>Cancel</CButton>
                                                </>
                                            ) : (
                                                <>
                                                    <CButton color="warning" style={{ marginRight: "10px", color: "#fff" }} onClick={() => setIsEditing(true)}>Edit</CButton>
                                                    <CButton color="primary" className="me-3" onClick={() => {
                                                        setVisible(false);
                                                        setIsEditing(false);
                                                    }}>Close</CButton>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </CCol>
                            </CRow>
                        </CContainer>
                    </section>
                </CModalBody>
            </CModal>
        )
    );
};

export default ProductDetailModal;
