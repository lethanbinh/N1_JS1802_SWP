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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../customStyles.css';
import fetchData from '../../util/ApiConnection';
import UserStorage from '../../util/UserStorage';

const PurchaseHistoryList = () => {
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [createDateFilter, setCreateDateFilter] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [currentStatus, setCurrentStatus] = useState('')
  const [orderId, setOrderId] = useState('')


  const loadData = async () => {
    try {
      const result = await fetchData(`http://localhost:8080/api/v1/orders`, 'GET', null, userInfo.accessToken);
      const orders = result.payload;

      const ordersWithStaffNames = await Promise.all(orders.map(async (order) => {
        const user = await fetchData(`http://localhost:8080/api/v1/users/id/${order.staffId}`, 'GET', null, userInfo.accessToken);
        return { ...order, staffName: user.payload.fullName };
      }));

      setData(ordersWithStaffNames);
      setFilteredData(ordersWithStaffNames);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [createDateFilter]);

  const handleCancelEdit = () => {
    setEditModalVisible(false);
  }

  const handleSave = () => {
    fetchData(`http://localhost:8080/api/v1/orders/edit-status/${orderId}/${currentStatus}`, 'PUT', null, userInfo.accessToken)
      .then(data => {
          console.log(data)
          setEditModalVisible(false)
          loadData()
      })
  }

  const loadDetails = (id) => {
    const order = data.find((row) => row.id === id);
    setOrderDetails(order.orderDetailResponses);
    setShow(true);
  };

  const handleCreateDateChange = (date) => {
    setCreateDateFilter(date);
  };

  const applyFilters = () => {
    let filtered = data;
    if (createDateFilter) {
      filtered = filtered.filter(row => new Date(row.createDate) >= new Date(createDateFilter));
    }
    setFilteredData(filtered);
  };

  return (
    <CRow>
      <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'right', paddingBottom: '10px' }}>
        <label style={{ marginRight: '10px' }}>Create Date: </label>
        <DatePicker
          selected={createDateFilter}
          onChange={handleCreateDateChange}
          dateFormat="yyyy-MM-dd"
          className="form-control"
        />
      </div>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Purchase History</strong>
          </CCardHeader>
          <CCardBody>
            <div style={{ height: '500px', overflow: 'auto' }}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell style={{ minWidth: "100px" }} scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "190px" }} scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Type</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Create Date</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Address</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Staff Name</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Final Price</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Tax</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Custom Give</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Refund Money</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Payment methods</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Total Bonus Point</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "300px" }} scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((row) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                      <CTableDataCell>{row.description}</CTableDataCell>
                      <CTableDataCell>{row.type}</CTableDataCell>
                      <CTableDataCell>{row.createDate}</CTableDataCell>
                      <CTableDataCell>{row.address}</CTableDataCell>
                      <CTableDataCell>{row.staffName}</CTableDataCell>
                      <CTableDataCell>{row.finalPrice}</CTableDataCell>
                      <CTableDataCell>{row.tax}</CTableDataCell>
                      <CTableDataCell>{row.customerGiveMoney}</CTableDataCell>
                      <CTableDataCell>{row.refundMoney}</CTableDataCell>
                      <CTableDataCell>{row.sendMoneyMethod}</CTableDataCell>
                      <CTableDataCell>{row.totalBonusPoint}</CTableDataCell>
                      <CTableDataCell>{row.status}</CTableDataCell>
                      <CTableDataCell className='mt-1'>
                        <CButton style={{marginRight: "10px"}} className='custom-btn custom-btn-info mr-1' onClick={() => loadDetails(row.id)} color="info">View Details</CButton>
                        <CButton className='custom-btn custom-btn-info mr-1' color="warning" onClick={() => {
                          setEditModalVisible(true)
                          setCurrentStatus(row.status)
                          setOrderId(row.id)
                        }}>Edit Status</CButton>
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
        <CModalHeader>
          <strong>View Details</strong>
        </CModalHeader>
        <CModalBody>
          <div style={{ height: '500px', overflow: 'auto' }}>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Order ID</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Product ID</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Product Name</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Product Price</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Product Quantity</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Total Price</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orderDetails.map((row) => (
                  <CTableRow key={row.id}>
                    <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                    <CTableDataCell>{row.orderId}</CTableDataCell>
                    <CTableDataCell>{row.productId}</CTableDataCell>
                    <CTableDataCell>{row.productName}</CTableDataCell>
                    <CTableDataCell>{row.productPrice}</CTableDataCell>
                    <CTableDataCell>{row.productQuantity}</CTableDataCell>
                    <CTableDataCell>{row.totalPrice}</CTableDataCell>
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
        <CModalHeader>
          <CModalTitle id="EditModalLabel">Edit order Status</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormSelect
            required
            value={currentStatus}
            onChange={(event) => setCurrentStatus(event.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </CFormSelect>
        </CModalBody>
        <CModalFooter>
          <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={handleCancelEdit}>
            Cancel
          </CButton>
          <CButton className='custom-btn custom-btn-success' color="success" onClick={handleSave}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default PurchaseHistoryList;
