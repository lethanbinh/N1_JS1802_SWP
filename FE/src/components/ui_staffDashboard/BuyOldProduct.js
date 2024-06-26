import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
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

const BuyOldProduct = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    if (value === "") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(row => row.name.toLowerCase().includes(value.toLowerCase())));
    }
  };

  const loadData = async () => {
    try {
      const productData = await fetchData(`http://localhost:8080/api/v1/products`, 'GET', null, userInfo.accessToken);
      if (productData && productData.payload) {
        setData(productData.payload);
        setFilteredData(productData.payload); // Initialize filteredData with all data
      } else {
        setData([]);
        setFilteredData([]); // Clear filteredData if no data is fetched
      }
    } catch (error) {
      setData([]); // Ensure data is cleared on error
      setFilteredData([]); // Ensure filteredData is cleared on error
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const purchaseData = filteredData.filter(item => item.status === 'PURCHASE');

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Buy Old Product</strong>
          </CCardHeader>
          <CCardBody>
            <CFormInput
              type="text"
              placeholder="Search by product name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mb-3"
            />
            <div style={{ height: '500px', overflow: 'auto' }}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Id</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Code</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Quantity</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Purchase Price</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Sell Price</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Type</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Weight</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Size</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Stall Location</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Bar Code</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Image</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {purchaseData.map((row) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                      <CTableDataCell>{row.code}</CTableDataCell>
                      <CTableDataCell>{row.description}</CTableDataCell>
                      <CTableDataCell>{row.name}</CTableDataCell>
                      <CTableDataCell>{row.quantity}</CTableDataCell>
                      <CTableDataCell>{row.purchasePrice}</CTableDataCell>
                      <CTableDataCell>{row.sellPrice}</CTableDataCell>
                      <CTableDataCell>{row.type}</CTableDataCell>
                      <CTableDataCell>{row.weight}</CTableDataCell>
                      <CTableDataCell>{row.size}</CTableDataCell>
                      <CTableDataCell>{row.stallLocation}</CTableDataCell>
                      <CTableDataCell>
                        <img src={row.barcode} style={{ width: 'auto', height: '200px' }} alt="barcode"/>
                      </CTableDataCell>
                      <CTableDataCell>
                        <img src={row.image} style={{ width: 'auto', height: '200px' }} alt="product"/>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default BuyOldProduct;
