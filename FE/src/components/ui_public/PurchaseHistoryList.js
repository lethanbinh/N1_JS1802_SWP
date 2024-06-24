import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
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
import '../../customStyles.css'

const PurchaseHistoryList = () => {
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser())
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [show, setShow] = useState(false)
  const [orderDetails, setOrderDetails] = useState([])

  const loadData = async () => {
    try {
      fetchData(`http://localhost:8080/api/v1/orders`, 'GET', null, userInfo.accessToken)
        .then((data) => {
          data.payload.forEach(element => {
            fetchData(`http://localhost:8080/api/v1/users/id/${element.staffId}`, 'GET', null, userInfo.accessToken)
              .then(user => {
                element.staffName = user.payload.fullName
                setData(prevData => [...prevData, element])
              })
          });
        }
        )
      setError(null)
    } catch (error) {
      setError(error.message)
    }
  }
  console.log(data)

  useEffect(() => {
    loadData()
  }, [])

  const loadDetails = (id) => {
    const order = data.find((row) => row.id === id)
    setOrderDetails(order.orderDetailResponses)
    setShow(true)
  }

  return (
    <CRow>
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
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Total Bonus Point</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((row) => (
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
                      <CTableDataCell>{row.totalBonusPoint}</CTableDataCell>
                      <CTableDataCell>{row.status}</CTableDataCell>
                      <CTableDataCell className='mt-1'>
                        <CButton className='custom-btn custom-btn-info mr-1' onClick={() => loadDetails(row.id)} color="info">View Details</CButton>
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
    </CRow>
  )
}

export default PurchaseHistoryList
