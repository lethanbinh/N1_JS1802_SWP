import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDropdownHeader,
    CFormInput,
    CFormTextarea,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
  } from '@coreui/react'
  import React, { useState, useEffect } from 'react'
  import fetchData from '../../util/ApiConnection';
  import UserStorage from '../../util/UserStorage';
  
  
  const StallProduct = () => {
    const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser())
    const [stallName, setStallName] = useState('')
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [show, setShow] = useState(false)
  
    const loadData = async (stallName) => {
      try {
        const productData = await fetchData(`http://localhost:8080/api/v1/products/stallName/${stallName}`, 'GET', null, userInfo.accessToken)
        setData(productData.payload)
  
        setError(null)
      } catch (error) {
        setError(error.message)
      }
    }
  
    useEffect(() => {
      loadData(stallName)
    }, [stallName])
  
  
    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CDropdownHeader>
                <strong>
                  <CFormInput
                    type="text"
                    placeholder='Stall Name'
                    name="stallName"
                    value={stallName}
                    onChange={(event) => setStallName(event.target.value)}
                  />
                </strong>
              </CDropdownHeader>
  
              <CButton onClick={() => setShow(!show)} type='submit' color="info">
                Search
              </CButton>
            </CCardHeader>
            {show &&
              <CCardBody>
                <div style={{ height: '500px', overflow: 'auto' }}>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Purchase Price</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Sell Price</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Weight</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Size</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Stall Location</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Bar Code Text</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {
                        data.map((row, index) => (
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
                            <CTableDataCell>{row.barCodeText}</CTableDataCell>
                            <CTableDataCell>
                              <img src={row.image} alt={row.name} style={{ width: '50px', height: '50px' }} /> {/* Display image */}
                            </CTableDataCell>
                          </CTableRow>
                        ))
                      }
                    </CTableBody>
                  </CTable>
                </div>
              </CCardBody>
            }
          </CCard>
        </CCol>
      </CRow>
    )
  }
  export default StallProduct
  