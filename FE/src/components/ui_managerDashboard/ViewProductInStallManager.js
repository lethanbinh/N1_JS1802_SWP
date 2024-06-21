import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdownHeader,
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


const StallProduct = () => {
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser())
  const [stallName, setStallName] = useState('')
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [stallOptions, setStallOptions] = useState([])

  const loadData = async (stallName) => {
    try {
      const productData = await fetchData(`http://localhost:8080/api/v1/products/stallName/${stallName}`, 'GET', null, userInfo.accessToken)
      setData(productData.payload)

      setError(null)
    } catch (error) {
      setError(error.message)
    }
  }
  console.log(data)

  const loadStallData = async () => {
    try {
      const stallData = await fetchData(`http://localhost:8080/api/v1/stalls`, 'GET', null, userInfo.accessToken)
      setStallOptions(stallData.payload)

      setError(null)
    } catch (error) {
      setError(error.message)
    }
  }
  console.log(stallName)

  useEffect(() => {
    loadStallData()
  }, [])

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
                <CFormSelect
                  name="stallName"
                  value={stallName}
                  onChange={(event) => setStallName(event.target.value)}
                >
                  <option value=""> Select Stall </option>
                  {stallOptions.map(stall => (
                    <option key={stall.id} value={stall.name}>
                      {stall.name}
                    </option>
                  ))}
                </CFormSelect>
              </strong>
            </CDropdownHeader>

          </CCardHeader>
          {
            <CCardBody>
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
                          <CTableDataCell>
                            <img src={row.barcode} style={{ width: 'auto', height: '200px' }} />
                          </CTableDataCell>
                          <CTableDataCell>
                            <img src={row.image} style={{ width: 'auto', height: '200px' }} /> {/* Display image */}
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
