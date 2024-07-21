import {
  CCard,
  CCardBody,
  CCol,
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
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import fetchData from '../../util/ApiConnection';
import UserStorage from '../../util/UserStorage';
import CIcon from '@coreui/icons-react';
import { cilBasket, cilCart, cilDescription, cilList, cilMenu, cilPen, cilSearch } from '@coreui/icons';
import ProductDetailModal from '../ui_public/ProductDetail';

const StallProduct = () => {
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
  const [stallName, setStallName] = useState('');
  const [data, setData] = useState([]);
  const [stallType, setStallType] = useState('')
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

  const loadStallData = async (stallId) => {
    if (!stallId) return;
    try {
      const stallData = await fetchData(`http://localhost:8080/api/v1/stalls/id/${stallId}`, 'GET', null, userInfo.accessToken);
      if (stallData && stallData.payload) {
        setStallInfo(stallData.payload);
        setStallName(stallData.payload.name);
        setStallType(stallData.payload.type)
      } else {
        setStallInfo([]);
        setStallName('');
      }
      setError(null);
    } catch (error) {
      setError(error.message);
      setStallInfo([]);
      setStallName('');
    }
  };
  useEffect(() => {
    loadStallData(user.stallId);
  }, [user.stallId]);

  useEffect(() => {
    loadData(stallName);
  }, [stallName, visible]);

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
              <CCol xs={12} className="d-flex justify-content-between align-items-center">
                <CHeader style={{ fontSize: '20px', display: 'inline-block' }}>Stall: {stallName}  |  Stock: {getTotalStock()}  |  Stall's Type: {stallType}</CHeader>
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
                        <CButton color="info" onClick={() => handleProductClick(row)}>
                          <CIcon icon={cilPen} />
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

      <ProductDetailModal visible={visible} product={data} setProduct={setData} setVisible={setVisible} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} stallName={stallName}/>
    </CRow>
  );
}

export default StallProduct;
