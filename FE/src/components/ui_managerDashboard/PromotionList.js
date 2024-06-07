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
} from '@coreui/react'

import React, { useState } from 'react'

const PromotionList = () => {
  const [data, setData] = useState([
    { id: 1, discount: 'Mark', name: 'abc@gmail.com', description: 'Seller', startDate: '2021-09-01', endDate: '2021-09-30', minPrice: '100', maxPrice: '1000' },
    { id: 2, discount: 'Mark', name: 'abc@gmail.com', description: 'Seller', startDate: '2021-09-01', endDate: '2021-09-30', minPrice: '100', maxPrice: '1000' },
    { id: 3, discount: 'Mark', name: 'abc@gmail.com', description: 'Seller', startDate: '2021-09-01', endDate: '2021-09-30', minPrice: '100', maxPrice: '1000' },
  ])

  const [editingRow, setEditingRow] = useState(null)
  const [formData, setFormData] = useState({})

  const handleEdit = (id) => {
    setEditingRow(id)
    setFormData(data.find((row) => row.id === id))
  }

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSave = () => {
    const newData = data.map((row) => {
      if (row.id === editingRow) {
        return { ...row, ...formData }
      }
      return row
    })
    setData(newData)
    setEditingRow(null)
  }
  const handleAddNew = () => {
    const newRow = {
      id: data.length + 1,
      name: '',
      email: '',
      role: '',
    }
    setData([...data, newRow])
    setEditingRow(newRow.id)
  }
  const handleDelete = (id) => {
    setData(data.filter((row) => row.id !== id))
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Promotion List</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Discount</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Minimum Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Maximum Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
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
                          name="discount"
                          value={formData.discount}
                          onChange={handleInputChange}
                        />
                      ) : (
                        row.discount
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {editingRow === row.id ? (
                        <CFormInput
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      ) : (
                        row.name
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {editingRow === row.id ? (
                        <CFormTextarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                        />
                      ) : (
                        row.description
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {editingRow === row.id ? (
                        <CFormInput
                          type="text"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                        />
                      ) : (
                        row.startDate
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {editingRow === row.id ? (
                        <CFormInput
                          type="text"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                        />
                      ) : (
                        row.endDate
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {editingRow === row.id ? (
                        <CFormInput
                          type="text"
                          name="minPrice"
                          value={formData.minPrice}
                          onChange={handleInputChange}
                        />
                      ) : (
                        row.minPrice
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {editingRow === row.id ? (
                        <CFormInput
                          type="text"
                          name="maxPrice"
                          value={formData.maxPrice}
                          onChange={handleInputChange}
                        />
                      ) : (
                        row.maxPrice
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {editingRow === row.id ? (
                        <CButton color="success" onClick={handleSave}>
                          Save
                        </CButton>
                      ) : (
                        <CButton color="info" onClick={() => handleEdit(row.id)}>
                          Edit
                        </CButton>
                      )}
                      <CButton className="mx-1" color="danger" onClick={() => handleDelete(row.id)}>
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
        <CButton className="mt-2" color="success">
          Add Promotion
        </CButton>
      </CCardBody>
    </CCard>
      </CCol >
    </CRow >
  )
}
export default PromotionList
