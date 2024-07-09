import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import '../../customStyles.css';
import fetchData from '../../util/ApiConnection';
import UserStorage from '../../util/UserStorage';

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
    status: 'PURCHASE',
    stallLocation: '',
    type: '',
    stallId: ''
  });

  const [addedProduct, setAddedProduct] = useState(null);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser())
  const [stallOptions, setStallOptions] = useState([])
  const [image, setImage] = useState('')
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['purchasePrice', 'sellPrice', 'quantity', 'weight'].includes(name) && value < 0) {
      setError(`${name} must be non-negative.`);
      setErrorModalVisible(true);
      return;
    }
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
    setError('');
    console.log(product)
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: file
      }));
      setImage(URL.createObjectURL(file))
    }
  };

  const loadStallData = async () => {
    try {
      const stallData = await fetchData(`http://localhost:8080/api/v1/stalls`, 'GET', null, userInfo.accessToken)
      if (stallData && stallData.payload) {
        const filteredStalls = stallData.payload.filter(stall => stall.type === 'PURCHASE');
        setStallOptions(filteredStalls)
      } else {
        setStallOptions([])
      }
    } catch (error) {
      setStallOptions([]) // Ensure stallOptions is cleared on error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    const requiredFields = ['name', 'image', 'description', 'purchasePrice', 'sellPrice', 'quantity', 'weight', 'size', 'stallLocation', 'type', 'stallId'];
    for (let field of requiredFields) {
      if (!product[field]) {
        setError(`Please fill out the ${field} field.`);
        setErrorModalVisible(true);
        return;
      }
    }

    // Kiểm tra purchasePrice không lớn hơn sellPrice
    if (parseFloat(product.purchasePrice) > parseFloat(product.sellPrice)) {
      setError('Purchase price cannot be greater than sell price.');
      setErrorModalVisible(true);
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

    try {
      if (savedProduct.image instanceof File) {
        const formDataToUpload = new FormData();
        formDataToUpload.append("image", savedProduct.image);
        console.log(formDataToUpload.get("image"));

        fetchData(`http://localhost:8080/api/v1/images`, "POST", formDataToUpload, null, "multipart/form-data")
          .then((response) => {
            console.log(response);
            savedProduct.image = response.payload.name

            fetchData('http://localhost:8080/api/v1/products', 'POST', savedProduct, userInfo.accessToken)
              .then((response) => {
                const addedProductWithStallName = {
                  ...response.payload,
                  stallName: stallOptions.find(stall => stall.id === response.payload.stallId).name
                };
                setAddedProduct(addedProductWithStallName); // Store the added product details
                setSuccessModalVisible(true); // Show success modal
              })
              .catch(error => {
                setError(error.toString());
                setErrorModalVisible(true);
              })
          })
          .catch(error => {
            setError(error.toString());
            setErrorModalVisible(true);
          });
      }

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
        status: 'PURCHASE',
        stallLocation: '',
        type: '',
        stallId: ''
      });
      setError('');
    } catch (error) {
      console.error('There was an error adding the product!', error);
      setError('There was an error adding the product!');
      setErrorModalVisible(true);
    }
  }

  useEffect(() => {
    loadStallData()
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={12} >
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Add Purchase Product</strong>
            </CCardHeader>
            <CCardBody>
              <div style={{ height: 'fit-content' }}>
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
                    {image && (
                      <img
                        src={image}
                        alt="Product Preview"
                        style={{ width: '50%', height: 'auto', marginTop: '10px' }}
                      />
                    )}
                  </CCol>
                </CRow>
                <CRow className='mt-4'>
                  <CCol md={12}>
                    <CFormTextarea
                      name="description"
                      label="Description"
                      value={product.description}
                      onChange={handleChange}
                    />
                  </CCol>
                </CRow>
                <CRow className='mt-4'>
                  <CCol md={4}>
                    <CFormLabel htmlFor="purchasePrice">Purchase Price</CFormLabel>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        id="purchasePrice"
                        type="number"
                        name="purchasePrice"
                        value={product.purchasePrice}
                        onChange={handleChange}
                      />
                      <CInputGroupText>VND</CInputGroupText>
                    </CInputGroup>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="sellPrice">Sell Price</CFormLabel>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        id="sellPrice"
                        type="number"
                        name="sellPrice"
                        value={product.sellPrice}
                        onChange={handleChange}
                      />
                      <CInputGroupText>VND</CInputGroupText>
                    </CInputGroup>
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
                <CRow className='mt-4'>
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
                      {stallOptions.map(stall => (
                        <option key={stall.id} value={stall.id}>
                          {stall.id}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className='mt-4'>
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
                      {stallOptions.map(stall => (
                        <option key={stall.id} value={stall.id}>
                          {stall.name}
                        </option>
                      ))}
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
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal visible={successModalVisible} onClose={() => setSuccessModalVisible(false)} size='lg'>
        <CModalHeader onClose={() => setSuccessModalVisible(false)}>
          <CModalTitle>Success</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div color='success' style={{ textAlign: 'center' }}>
            <p>Product added successfully!</p>
          </div>
          {addedProduct && (
            <div className='d-flex'>
              <div className='flex-grow-1' style={{ marginTop: '10px' }}>
                <p><strong>Name:</strong> {addedProduct.name}</p>
                <p><strong>Description:</strong> {addedProduct.description}</p>
                <p><strong>Purchase Price:</strong> {addedProduct.purchasePrice}VND</p>
                <p><strong>Sell Price:</strong> {addedProduct.sellPrice}VND</p>
                <p><strong>Quantity:</strong> {addedProduct.quantity}</p>
                <p><strong>Weight:</strong> {addedProduct.weight}</p>
                <p><strong>Size:</strong> {addedProduct.size}</p>
                <p><strong>Stall Name:</strong> {addedProduct.stallName}</p>
                <p><strong>Stall Location:</strong> {addedProduct.stallLocation}</p>
                <p><strong>Type:</strong> {addedProduct.type}</p>
              </div>
              <div className='flex-shrink-1'>
                <p><strong>Image:</strong></p>
                <img src={addedProduct.image} alt={addedProduct.name} style={{ width: '300px', height: 'fit-content', marginTop: '10px' }} />
                <p><strong>Barcode:</strong></p>
                <img src={addedProduct.barCode} alt="Barcode" style={{ width: '300px', height: '100px', marginTop: '10px' }} />
              </div>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setSuccessModalVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={errorModalVisible} onClose={() => setErrorModalVisible(false)}>
        <CModalHeader onClose={() => setErrorModalVisible(false)}>
          <CModalTitle>Error</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {error}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setErrorModalVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default AddProduct;
