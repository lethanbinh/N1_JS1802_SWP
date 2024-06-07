import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormTextarea,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CDropdownHeader
  } from '@coreui/react'
  import React, { useState } from 'react'
  
  const StaffStatistic = () => {
    const [data, setData] = useState([
      { id: 1, avgOrderValue: 30.00, totalSales: 60.00, orderTrend: 'ABC', customerOrderFrequency: 100.00, orderAverageNumbers: 100.00, orderNumbersByCustomerAge: 'ABC' },
      { id: 2, avgOrderValue: 30.00, totalSales: 60.00, orderTrend: 'ABC', customerOrderFrequency: 100.00, orderAverageNumbers: 100.00, orderNumbersByCustomerAge: 'ABC' },
      { id: 3, avgOrderValue: 30.00, totalSales: 60.00, orderTrend: 'ABC', customerOrderFrequency: 100.00, orderAverageNumbers: 100.00, orderNumbersByCustomerAge: 'ABC' },
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
              <strong>Orders Statistics</strong>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Average Orders Value</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total Of Sales</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Order Trend</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Customer Order Frequency</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Order Average Numbers</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Order Number By Customer Age</CTableHeaderCell>
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
                            name="avgOrderValue"
                            value={formData.avgOrderValue}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.avgOrderValue
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="totalSales"
                            value={formData.totalSales}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.totalSales
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="orderTrend"
                            value={formData.orderTrend}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.orderTrend
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="customerOrderFrequency"
                            value={formData.customerOrderFrequency}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.customerOrderFrequency
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="orderAverageNumbers"
                            value={formData.orderAverageNumbers}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.orderAverageNumbers
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="orderNumbersByCustomerAge"
                            value={formData.orderNumbersByCustomerAge}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.orderNumbersByCustomerAge
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