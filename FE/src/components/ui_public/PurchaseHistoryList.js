import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
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
import { cilEyedropper, cilPen, cilTrash, cilViewColumn, cilViewStream } from '@coreui/icons';

const PurchaseHistoryList = () => {
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');
  const [orderId, setOrderId] = useState('');
  const [staff, setStaff] = useState([]);
  const [staffId, setStaffId] = useState(0);

  const loadData = async () => {
    try {
      const result = await fetchData(`http://localhost:8080/api/v1/orders`, 'GET', null, userInfo.accessToken);
      const orders = result.payload;
      setData(orders);
      setFilteredData(orders);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const loadStaff = () => {
    fetchData('http://localhost:8080/api/v1/users', 'GET', null, userInfo.accessToken)
      .then(data => {
        setStaff(data.payload.filter(item => item.roleName.toUpperCase() === 'STAFF'));
      });
  };

  useEffect(() => {
    loadData();
    loadStaff();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [staffId]);

  const handleCancelEdit = () => {
    setEditModalVisible(false);
  };

  const handleSave = () => {
    fetchData(`http://localhost:8080/api/v1/orders/edit-status/${orderId}/${currentStatus}`, 'PUT', null, userInfo.accessToken)
      .then(data => {
        setEditModalVisible(false);
        loadData();
      });
  };

  const loadDetails = (id) => {
    const order = data.find((row) => row.id === id);
    setOrderDetails(order.orderDetailResponses);
    setShow(true);
  };

  const applyFilters = () => {
    let filtered = data;
    if (staffId == 0) {
      setFilteredData(data);
    } else {
      filtered = filtered.filter(row => row.staffId == staffId);
      setFilteredData(filtered);
    }
  };

  const handleStaffChange = (event) => {
    const selectedStaffId = event.target.value;
    setStaffId(selectedStaffId);
  };

  const formatPrice = (price) => {
    return `${price.toLocaleString('en-US')} VND`;
  };

  return (
    <CRow className="m-0">
      <CCol xs={12}>
        <CCard className="mb-4 border-0 shadow-sm">
          <CCardHeader className="bg-light text-dark d-flex justify-content-between align-items-center">
            <strong>Purchase History</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-4">
              <CCol xs={12} md={6} className="d-flex align-items-center">
                <strong style={{ width: "120px" }} className="mr-3">Staff Name: </strong>
                <CFormSelect
                  name="staffName"
                  value={staffId}
                  style={{ minWidth: "200px", border: '1px solid #adb5bd' }}
                  onChange={handleStaffChange}
                >
                  <option value="0">All Staff</option>
                  {staff.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.fullName}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <div style={{ height: '70vh', overflow: 'auto' }}>
              <CTable hover responsive bordered className="shadow-sm table-border-dark" style={{ border: '1px solid #adb5bd' }}>
                <CTableHead className="bg-light text-dark">
                  <CTableRow>
                    <CTableHeaderCell style={{ minWidth: "80px" }} scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "200px" }} scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "120px" }} scope="col">Type</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "150px" }} scope="col">Create Date</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "200px" }} scope="col">Address</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "150px" }} scope="col">Total Price</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "150px" }} scope="col">Customer Give</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "150px" }} scope="col">Refund Money</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "180px" }} scope="col">Payment Methods</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "150px" }} scope="col">Total Bonus Point</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "120px" }} scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "120px" }} scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((row) => (
                    <CTableRow key={row.id}>
                      <CTableDataCell>{row.id}</CTableDataCell>
                      <CTableDataCell>{row.description}</CTableDataCell>
                      <CTableDataCell>{row.type}</CTableDataCell>
                      <CTableDataCell>{row.createDate}</CTableDataCell>
                      <CTableDataCell>{row.address}</CTableDataCell>
                      <CTableDataCell>{row.type.toUpperCase() === 'SELL' ? formatPrice(row.totalPrice) : "N/A"}</CTableDataCell>
                      <CTableDataCell>{row.type.toUpperCase() === 'SELL' ? formatPrice(row.customerGiveMoney) : "N/A"}</CTableDataCell>
                      <CTableDataCell>{row.type.toUpperCase() === 'SELL' ? formatPrice(row.refundMoney) : "N/A"}</CTableDataCell>
                      <CTableDataCell>{row.sendMoneyMethod}</CTableDataCell>
                      <CTableDataCell>{row.totalBonusPoint.toLocaleString('en-US')}</CTableDataCell>
                      <CTableDataCell>{row.status}</CTableDataCell>
                      <CTableDataCell className="d-flex justify-content-around">
                        <CButton color="warning" size="sm" onClick={() => loadDetails(row.id)}>
                          <CIcon icon={cilViewColumn} />
                        </CButton>
                        {row.status.toUpperCase() !== 'CONFIRMED' && (
                          <CButton color="info" size="sm" onClick={() => {
                            setEditModalVisible(true);
                            setCurrentStatus(row.status);
                            setOrderId(row.id);
                          }}>
                            <CIcon icon={cilPen} />
                          </CButton>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal
        visible={show}
        onClose={() => setShow(false)}
        size='xl'
      >
        <CModalHeader className="bg-light text-dark">
          <CModalTitle>View Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div style={{ height: '500px', overflow: 'auto' }}>
            <CTable hover responsive bordered className="shadow-sm table-border-dark" style={{ border: '1px solid #adb5bd' }}>
              <CTableHead className="bg-light text-dark">
                <CTableRow>
                  <CTableHeaderCell style={{ minWidth: "100px" }} scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "100px" }} scope="col">Order ID</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "100px" }} scope="col">Product ID</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Product Name</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "120px" }} scope="col">Product Quantity</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "120px" }} scope="col">Product Price</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "120px" }} scope="col">Total Price</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orderDetails.map((row) => (
                  <CTableRow key={row.id}>
                    <CTableDataCell>{row.id}</CTableDataCell>
                    <CTableDataCell>{row.orderId}</CTableDataCell>
                    <CTableDataCell>{row.productId}</CTableDataCell>
                    <CTableDataCell>{row.productName}</CTableDataCell>
                    <CTableDataCell>{row.productQuantity}</CTableDataCell>
                    <CTableDataCell>{formatPrice(row.productPrice)}</CTableDataCell>
                    <CTableDataCell>{formatPrice(row.totalPrice)}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
        </CModalBody>
      </CModal>

      <CModal
        visible={editModalVisible}
        onClose={handleCancelEdit}
        aria-labelledby="EditModalLabel"
        size="lg"
      >
        <CModalHeader className="bg-primary text-white">
          <CModalTitle id="EditModalLabel">Edit Order Status</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormSelect
            required
            value={currentStatus}
            onChange={(event) => setCurrentStatus(event.target.value)}
            className="mb-3"
            style={{ border: '1px solid #adb5bd' }}
          >
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
          </CFormSelect>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCancelEdit}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default PurchaseHistoryList;
