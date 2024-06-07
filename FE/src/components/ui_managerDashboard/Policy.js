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

const Policy = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Mark', detail: '20% sale for ......', type: 'discount' },
    { id: 2, name: 'Mar', detail: '10% sale for ......', type: 'discount' },
    { id: 3, name: 'Mak', detail: '15% sale for ....', type: 'discount' },
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Return & Exchange Policy</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Detail</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Type</CTableHeaderCell>
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
                          name="detail"
                          value={formData.detail}
                          onChange={handleInputChange}
                        />
                      ) : (
                        row.detail
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {editingRow === row.id ? (
                        <CFormInput
                          type="text"
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                        />
                      ) : (
                        row.type
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
export default Policy
