import {
  CCard,
  CCardBody,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormSelect,
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import fetchData from '../../util/ApiConnection';
import UserStorage from '../../util/UserStorage';
import CIcon from '@coreui/icons-react';
import { cilBasket, cilCart, cilDescription, cilList, cilMenu, cilSearch } from '@coreui/icons';

const StallProduct = () => {
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
  const [stallName, setStallName] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [stallInfo, setStallInfo] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [user, setUser] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visible, setVisible] = useState(false);

  const loadUser = async () => {
    try {
      const userData = await fetchData(`http://localhost:8080/api/v1/users/id/${userInfo.id}`, 'GET', null, userInfo.accessToken);
      if (userData && userData.payload) {
        setUser(userData.payload);
      } else {
        setUser({});
      }
      setError(null);
    } catch (error) {
      setError(error.message);
      setUser({});
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadData = async (stallName) => {
    if (!stallName) return;
    try {
      const productData = await fetchData(`http://localhost:8080/api/v1/products/stallName/${stallName}`, 'GET', null, userInfo.accessToken);
      if (productData && productData.payload) {
        setData(productData.payload);
        setFilterData(productData.payload);
      } else {
        setData([]);
        setFilterData([]);
      }
      setError(null);
    } catch (error) {
      setError(error.message);
      setData([]);
      setFilterData([]);
    }
  };

  const loadStallData = async () => {
    try {
      const stallData = await fetchData(`http://localhost:8080/api/v1/stalls`, 'GET', null, userInfo.accessToken);
      if (stallData && stallData.payload) {
        setStallInfo(stallData.payload);
      } else {
        setStallInfo([]);
      }
      setError(null);
    } catch (error) {
      setError(error.message);
      setStallInfo([]);
    }
  };

  const searchSell = () => {
    const filteredData = data.filter((item) => item.status === 'SELL');
    setFilterData(filteredData);
  };

  const searchPurchase = () => {
    const filteredData = data.filter((item) => item.status === 'PURCHASE');
    setFilterData(filteredData);
  };

  const searchAll = () => {
    setFilterData(data);
  };

  useEffect(() => {
    loadStallData(user.stallId);
  }, [user.stallId]);

  useEffect(() => {
    loadData(stallName);
  }, [stallName]);

  const formatPrice = (price) => {
    return `${price.toLocaleString('en-US')} VND`;
  };

  const getTotalStock = () => {
    let total = 0;
    filterData.map(item => total += item.quantity)
    return total
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  return (
    <CRow className="m-0">
      <CCol xs={12}>
        <CCard className="mb-4 border-0 shadow-sm">
          <CCardBody>
            <CRow className="mb-3">
              <CCol xs={12} className="d-flex align-items-center">
                <CFormSelect
                  name="stallName"
                  value={stallName}
                  style={{ fontWeight: 'bold', fontSize: '20px', maxWidth: "400px" }}
                  onChange={(event) => {
                    setStallName(event.target.value);
                    setShow(true);
                  }}
                >
                  <option value="">Select Stall</option>
                  {stallInfo.map(stall => (
                    <option key={stall.id} value={stall.name}>
                      {stall.name} - {stall.type}
                    </option>
                  ))}
                </CFormSelect>
                <CHeader style={{ fontSize: '20px', justifyContent: "center" }}>Stock: {getTotalStock()}</CHeader>
              </CCol>
            </CRow>
            <div style={{ height: '70vh', overflow: 'auto' }}>
              <CTable hover responsive bordered className="shadow-sm table-border-dark" style={{ border: '1px solid #adb5bd' }}>
                <CTableHead className="bg-light text-dark">
                  <CTableRow>
                    <CTableHeaderCell style={{ minWidth: '60px' }} scope="col">Id</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: '100px' }} scope="col">Image</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: '160px' }} scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: '80px' }} scope="col">Quantity</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: '160px' }} scope="col">Purchase Price</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: '160px' }} scope="col">Sell Price</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: '100px' }} scope="col">Type</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: '140px' }} scope="col">Bar Code</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: '60px' }} scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filterData.map((row) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                      <CTableDataCell>
                        <img src={row.image} style={{ width: 'auto', height: '50px' }} alt="Product" /> {/* Display image */}
                      </CTableDataCell>
                      <CTableDataCell>{row.name}</CTableDataCell>
                      <CTableDataCell>{row.quantity}</CTableDataCell>
                      <CTableDataCell>{formatPrice(row.purchasePrice)}</CTableDataCell>
                      <CTableDataCell>{formatPrice(row.sellPrice)}</CTableDataCell>
                      <CTableDataCell>{row.type}</CTableDataCell>
                      <CTableDataCell>
                        <img src={row.barCode} style={{ width: 'auto', height: '50px' }} alt="Bar Code" />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton color="warning" onClick={() => handleProductClick(row)}>
                          <CIcon icon={cilDescription} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {selectedProduct && (
        <CModal visible={visible} onClose={() => setVisible(false)} size="xl">
          <CModalHeader>
            <CModalTitle>{selectedProduct.name}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <section className="py-5">
              <div className="container">
                <div className="row gx-5">
                  <aside className="col-lg-5">
                    <div className="border rounded-4 mb-3 d-flex justify-content-center">
                      <a className="rounded-4" target="_blank" href={selectedProduct.image}>
                        <img
                          style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }}
                          className="rounded-4 fit"
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                        />
                      </a>
                    </div>
                  </aside>
                  <main className="col-lg-7">
                    <div className="ps-lg-3">
                      <h4 className="title text-dark mb-4">{selectedProduct.name}</h4>
                      <div className="d-flex flex-row mb-3">
                        <div className="text-warning mb-1 me-2">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <span className="ms-1">4.5</span>
                        </div>
                        <span className="text-success ms-2">In stock: </span>
                        <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>{selectedProduct.quantity}</span>
                      </div>

                      <div className="mb-4">
                        <span className="h5">{formatPrice(selectedProduct.sellPrice)}</span>
                        <span className="text-muted"> / per item</span>
                      </div>
                      <p className="mb-4">{selectedProduct.description}</p>
                      <div className="row mb-4">
                        <dt className="col-3">Type:</dt>
                        <dd className="col-9">{selectedProduct.type}</dd>

                        <dt className="col-3">Weight:</dt>
                        <dd className="col-9">{selectedProduct.weight}g</dd>

                        <dt className="col-3">Size:</dt>
                        <dd className="col-9">{selectedProduct.size}</dd>

                        <dt className="col-3">Bar Code:</dt>
                        <dd className="col-9">
                          <img src={selectedProduct.barCode} alt="Bar Code" style={{ height: '50px', width: 'auto' }} />
                        </dd>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </section>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      )}
    </CRow>
  );
}

export default StallProduct;
