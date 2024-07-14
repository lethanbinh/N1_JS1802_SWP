import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import fetchData from '../../util/ApiConnection';
import UserStorage from '../../util/UserStorage';
import CIcon from '@coreui/icons-react';
import { cilBasket, cilCart, cilList, cilMenu } from '@coreui/icons';

const StallProduct = () => {
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
  const [stallName, setStallName] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [stallOptions, setStallOptions] = useState([]);
  const [stallStatus, setStallStatus] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [show, setShow] = useState(false);

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
        setStallOptions(stallData.payload);
      } else {
        setStallOptions([]);
      }
      setError(null);
    } catch (error) {
      setError(error.message);
      setStallOptions([]);
    }
  };

  const searchAll = () => {
    setFilterData(data);
  };

  const searchSell = () => {
    const filteredData = data.filter((item) => item.status === 'SELL');
    setFilterData(filteredData);
  };

  const searchPurchase = () => {
    const filteredData = data.filter((item) => item.status === 'PURCHASE');
    setFilterData(filteredData);
  };

  useEffect(() => {
    loadStallData();
  }, []);

  useEffect(() => {
    loadData(stallName);
  }, [stallName]);

  const formatPrice = (price) => {
    return `${price.toLocaleString('en-US')} VND`;
  };

  return (
    <CRow className="m-0">
      <CCol xs={12}>
        <CCard className="mb-4 border-0 shadow-sm">
          <CCardHeader className="bg-light text-dark d-flex justify-content-between align-items-center">
            <strong>Stall Products</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol md={4}>
                <CFormSelect
                  name="stallName"
                  value={stallName}
                  style={{ fontWeight: 'bold', fontSize: '20px' }}
                  onChange={(event) => {
                    setStallName(event.target.value);
                    setShow(true);
                  }}
                >
                  <option value="">Select Stall</option>
                  {stallOptions.map(stall => (
                    <option key={stall.id} value={stall.name}>
                      {stall.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={8} className="d-flex justify-content-end">
                <CDropdown>
                  <CDropdownToggle color="primary">
                    <CIcon icon={cilMenu} className="me-2" />
                    Product Type
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      onClick={searchAll}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={(e) => { e.target.style.backgroundColor = '#4b49b6', e.target.style.color = "white" }}
                      onMouseLeave={(e) => { e.target.style.backgroundColor = '', e.target.style.color = "black" }}
                    >
                      <CIcon icon={cilList} className="me-2" />
                      All Product
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={searchSell}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={(e) => { e.target.style.backgroundColor = '#4b49b6', e.target.style.color = "white" }}
                      onMouseLeave={(e) => { e.target.style.backgroundColor = '', e.target.style.color = "black" }}
                    >
                      <CIcon icon={cilCart} className="me-2" />
                      Sell Product
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={searchPurchase}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={(e) => { e.target.style.backgroundColor = '#4b49b6', e.target.style.color = "white" }}
                      onMouseLeave={(e) => { e.target.style.backgroundColor = '', e.target.style.color = "black" }}
                    >
                      <CIcon icon={cilBasket} className="me-2" />
                      Purchase Product
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            </CRow>
            {show ?
              <div style={{ height: '70vh', overflow: 'auto' }}>
                <CTable hover responsive bordered className="shadow-sm table-border-dark" style={{ border: '1px solid #adb5bd' }}>
                  <CTableHead className="bg-light text-dark">
                    <CTableRow>
                      <CTableHeaderCell style={{ minWidth: "60px" }} scope="col">Id</CTableHeaderCell>
                      <CTableHeaderCell style={{ minWidth: "100px" }} scope="col">Image</CTableHeaderCell>
                      <CTableHeaderCell style={{ minWidth: "100px" }} scope="col">Code</CTableHeaderCell>
                      <CTableHeaderCell style={{ minWidth: "200px" }} scope="col">Description</CTableHeaderCell>
                      <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell style={{ minWidth: "120px" }} scope="col">Quantity</CTableHeaderCell>
                      <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Purchase Price</CTableHeaderCell>
                      <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Sell Price</CTableHeaderCell>
                      <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Type</CTableHeaderCell>
                      <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Weight (g)</CTableHeaderCell>
                      <CTableHeaderCell style={{ minWidth: "120px" }} scope="col">Size</CTableHeaderCell>
                      <CTableHeaderCell style={{ minWidth: "120px" }} scope="col">Status</CTableHeaderCell>
                      <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Stall Location</CTableHeaderCell>
                      <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Bar Code</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filterData.map((row) => (
                      <CTableRow key={row.id}>
                        <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                        <CTableDataCell>
                          <img src={row.image} style={{ width: 'auto', height: '50px' }} alt="Product" /> {/* Display image */}
                        </CTableDataCell>
                        <CTableDataCell>{row.code}</CTableDataCell>
                        <CTableDataCell>{row.description}</CTableDataCell>
                        <CTableDataCell>{row.name}</CTableDataCell>
                        <CTableDataCell>{row.quantity}</CTableDataCell>
                        <CTableDataCell>{formatPrice(row.purchasePrice)}</CTableDataCell>
                        <CTableDataCell>{formatPrice(row.sellPrice)}</CTableDataCell>
                        <CTableDataCell>{row.type}</CTableDataCell>
                        <CTableDataCell>{row.weight}</CTableDataCell>
                        <CTableDataCell>{row.size}</CTableDataCell>
                        <CTableDataCell>{row.status}</CTableDataCell>
                        <CTableDataCell>{row.stallLocation}</CTableDataCell>
                        <CTableDataCell>
                          <img src={row.barCode} style={{ width: 'auto', height: '50px' }} alt="Bar Code" />
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
              : null}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default StallProduct;
