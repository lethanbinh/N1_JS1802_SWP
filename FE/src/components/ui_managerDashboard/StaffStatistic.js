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
} from '@coreui/react'
import React, { useState } from 'react'
  
  const StaffStatistic = () => {
    const [data, setData] = useState([
      { id: 1, totalNumStaff: 30, revenuePerStaff: 60.00, TopStaff: 'ABC', avgSalePerStaff: 100.00, ordersPerStaff: 100, avgOrderPerStaff: 100.00 },
      { id: 2, totalNumStaff: 30, revenuePerStaff: 60.00, TopStaff: 'ABC', avgSalePerStaff: 100.00, ordersPerStaff: 100, avgOrderPerStaff: 100.00 },
      { id: 3, totalNumStaff: 30, revenuePerStaff: 60.00, TopStaff: 'ABC', avgSalePerStaff: 100.00, ordersPerStaff: 100, avgOrderPerStaff: 100.00 },
    ])
  
    const [editingRow, setEditingRow] = useState(null)
    const [formData, setFormData] = useState({})
  
    const handleInputChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value })
    }
  
    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Staff Statistics</strong>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total of Number Staff</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Revenue Per Staff</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Top Performing Staff</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Average Sales Per Staff</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Order Per Staff</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Average Order Per Staff</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((row) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="totalNumStaff"
                            value={formData.totalNumStaff}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.totalNumStaff
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="revenuePerStaff"
                            value={formData.revenuePerStaff}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.revenuePerStaff
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="TopStaff"
                            value={formData.TopStaff}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.TopStaff
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="avgSalePerStaff"
                            value={formData.avgSalePerStaff}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.avgSalePerStaff
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="ordersPerStaff"
                            value={formData.ordersPerStaff}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.ordersPerStaff
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="avgOrderPerStaff"
                            value={formData.avgOrderPerStaff}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.avgOrderPerStaff
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
  export default StaffStatistic