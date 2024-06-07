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
    
    const ProductStatistic = () => {
      const [data, setData] = useState([
        { id: 1, totalNumProduct: 30, topQuantitySellingProducts: 'XYZ', topSalesPerProduct: 'ABC', returnRates: 'DCF', productsOutOfStock: 'ACD', averageSalesPerProduct: 100.00 },
        { id: 2, totalNumProduct: 30, topQuantitySellingProducts: 'XYZ', topSalesPerProduct: 'ABC', returnRates: 'DCF', productsOutOfStock: 'ACD', averageSalesPerProduct: 100.00 },
        { id: 3, totalNumProduct: 30, topQuantitySellingProducts: 'XYZ', topSalesPerProduct: 'ABC', returnRates: 'DCF', productsOutOfStock: 'ACD', averageSalesPerProduct: 100.00 },
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
                      <CTableHeaderCell scope="col">Total of Number Products</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Top Quantity Selling Product</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Top Sales Per Product</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Return Rates</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Product Out Of Stock</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Average Sales Per Product</CTableHeaderCell>
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
                              name="totalNumProduct"
                              value={formData.totalNumProduct}
                              onChange={handleInputChange}
                            />
                          ) : (
                            row.totalNumProduct
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {editingRow === row.id ? (
                            <CFormInput
                              type="text"
                              name="topQuantitySellingProducts"
                              value={formData.topQuantitySellingProducts}
                              onChange={handleInputChange}
                            />
                          ) : (
                            row.topQuantitySellingProducts
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {editingRow === row.id ? (
                            <CFormInput
                              type="text"
                              name="topSalesPerProduct"
                              value={formData.topSalesPerProduct}
                              onChange={handleInputChange}
                            />
                          ) : (
                            row.topSalesPerProduct
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {editingRow === row.id ? (
                            <CFormInput
                              type="text"
                              name="returnRates"
                              value={formData.returnRates}
                              onChange={handleInputChange}
                            />
                          ) : (
                            row.returnRates
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {editingRow === row.id ? (
                            <CFormInput
                              type="text"
                              name="productsOutOfStock"
                              value={formData.productsOutOfStock}
                              onChange={handleInputChange}
                            />
                          ) : (
                            row.productsOutOfStock
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {editingRow === row.id ? (
                            <CFormInput
                              type="text"
                              name="averageSalesPerProduct"
                              value={formData.averageSalesPerProduct}
                              onChange={handleInputChange}
                            />
                          ) : (
                            row.averageSalesPerProduct
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
    export default ProductStatistic