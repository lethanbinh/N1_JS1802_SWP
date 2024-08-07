import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormSelect,
  CHeader,
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import fetchData from '../../services/ApiConnection';
import UserStorage from '../../services/UserStorage';
import CIcon from '@coreui/icons-react';
import { cilPen } from '@coreui/icons';
import ProductDetailModal from '../ui_public/ProductDetail';
import * as XLSX from 'xlsx'; // Import xlsx

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
    try {
      if (stallName !== "") {
        const productData = await fetchData(`http://localhost:8080/api/v1/products/stallName/${stallName}`, 'GET', null, userInfo.accessToken);
        if (productData && productData.payload) {
          setData(productData.payload);
          setFilterData(productData.payload);
        } else {
          setData([]);
          setFilterData([]);
        }
        setError(null);
      } else {
        const productData = await fetchData(`http://localhost:8080/api/v1/products`, 'GET', null, userInfo.accessToken);
        if (productData && productData.payload) {
          setData(productData.payload);
          setFilterData(productData.payload);
        } else {
          setData([]);
          setFilterData([]);
        }
        setError(null);
      }

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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filterData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products.xlsx");
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
                  }}
                >
                  <option value="">All Products</option>
                  {stallInfo.map(stall => (
                    <option key={stall.id} value={stall.name}>
                      Stall: {stall.name} - {stall.type}
                    </option>
                  ))}
                </CFormSelect>
                <CHeader style={{ fontSize: '20px', justifyContent: "center" }}>Stock: {getTotalStock()}</CHeader>
                <CButton color="primary" className="ms-auto" onClick={exportToExcel}>Export to Excel</CButton>
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

      <ProductDetailModal visible={visible} product={data} setProduct={setData} setVisible={setVisible} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} stallName={stallName} />
    </CRow>
  );
}

export default StallProduct;
