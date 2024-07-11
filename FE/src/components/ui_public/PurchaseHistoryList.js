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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
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
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import CIcon from '@coreui/icons-react';
import { cilHamburgerMenu } from '@coreui/icons';

const PurchaseHistoryList = () => {
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [currentStatus, setCurrentStatus] = useState('')
  const [orderId, setOrderId] = useState('')
  const [staff, setStaff] = useState([]);
  const [staffId, setStaffId] = useState(0);
  const [staffName, setStaffName] = useState('')
  const [purchaseHistory, setPurchaseHistory] = useState([]);

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

  const applyFilters = () => {
    console.log(staffId == 0)
    let filtered = data;
    if (staffId == 0) {
      setFilteredData(data);
    } else {
      filtered = filtered.filter(row => {
        return row.staffId == staffId;
      });
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        if (staffName) {
          const response = await fetchData(`http://localhost:8080/api/v1/orders/staffName/${staffName}`, 'GET', null, userInfo.accessToken);
          if (response.status === 'SUCCESS') {
            setPurchaseHistory(response.payload);
          } else {
            console.error('Error fetching purchase history:', response.error);
          }
        }
      } catch (error) {
        console.error('There was an error fetching the purchase history!', error);
      }
    };

    fetchPurchaseHistory();
  }, [staffName]);

  const handleStaffChange = (event) => {
    const selectedStaffId = event.target.value;
    setStaffId(selectedStaffId);
  };

  const formatPrice = (price) => {
    return `${price.toLocaleString('en-US')} VND`;
  };

  return (
    <CRow>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <strong style={{ marginRight: '10px', minWidth: "100px" }}>Staff Name: </strong>
          <CFormSelect
            name="staffName"
            value={staffId}
            style={{ minWidth: "500px" }}
            onChange={handleStaffChange}
          >
            <option value="0">All Staff</option>
            {staff.map(user => (
              <option key={user.id} value={user.id}>
                {user.fullName}
              </option>
            ))}
          </CFormSelect>
        </div>
      </div>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Purchase History</strong>
          </CCardHeader>
          <CCardBody>
            <div style={{ height: '70vh', overflow: 'auto' }}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell style={{ minWidth: "60px" }} scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "190px" }} scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Type</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Create Date</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Address</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Total Price</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Customer Give</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Refund Money</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Payment Methods</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Total Bonus Point</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "100px" }} scope="col">Action</CTableHeaderCell>
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
                      <CTableDataCell>{row.type.toUpperCase() === 'SELL' ? formatPrice(row.totalPrice) : "N/A"}</CTableDataCell>
                      <CTableDataCell>{row.type.toUpperCase() === 'SELL' ? formatPrice(row.customerGiveMoney) : "N/A"}</CTableDataCell>
                      <CTableDataCell>{row.type.toUpperCase() === 'SELL' ? formatPrice(row.refundMoney) : "N/A"}</CTableDataCell>
                      <CTableDataCell>{row.sendMoneyMethod}</CTableDataCell>
                      <CTableDataCell>{row.totalBonusPoint.toLocaleString('en-US')}</CTableDataCell>
                      <CTableDataCell>{row.status}</CTableDataCell>
                      <CTableDataCell>
                        <CDropdown className="position-relative">
                          <CDropdownToggle color="light" className="border-0 bg-transparent p-0 custom-dropdown-toggle">
                            <CIcon icon={cilHamburgerMenu} size="xl" />
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={() => loadDetails(row.id)}>View Details</CDropdownItem>
                            {row.status.toUpperCase() === 'CONFIRMED' ? "" :
                              <CDropdownItem onClick={() => {
                                setEditModalVisible(true)
                                setCurrentStatus(row.status)
                                setOrderId(row.id)
                              }}>Edit Status</CDropdownItem>}
                          </CDropdownMenu>
                        </CDropdown>
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
                  <CTableHeaderCell style={{ minWidth: "100px" }} scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "100px" }} scope="col">Order ID</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "100px" }} scope="col">Product ID</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Product Name</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "100px" }} scope="col">Product Quantity</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "70px" }} scope="col">Product Price</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "70px" }} scope="col">Total Price</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orderDetails.map((row) => (
                  <CTableRow key={row.id}>
                    <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
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
