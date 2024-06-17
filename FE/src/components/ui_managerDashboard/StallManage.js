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

const Stall = () => {
  const [data, setData] = useState([
    { id: 1, code: 'ABC', name: 'Mark', type: 'Gold' , description: '@mdo', status: 'Processing' },
    { id: 2, code: 'XYZ', name: 'Jacob', type: 'Gold' , description: '@mdo', status: 'Processing' },
    { id: 3, code: 'QAZ', name: 'Mark', type: 'Gold', description: '@mdo', status: 'Processing' },
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
      code: '',
      name: '',
      description: '',
      status: '',
      type: '',
    }
    setData([...data, newRow])
    setEditingRow(newRow.id)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Stall List</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
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
                          name="code"
                          value={formData.code}
                          onChange={handleInputChange}
                        />
                      ) : (
                        row.code
                      )}
                    </CTableDataCell>
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
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        />
                      ) : (
                        row.status
                      )}
                    </CTableDataCell>

                    <CTableDataCell>
                      {editingRow === row.id ? (
                        <CButton color="success" onClick={handleSave}>
                          Save
                        </CButton>
                      ) : (
                        <CButton color="info" onClick={() => handleEdit(row.id)}>
                          Update
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <CButton color="success" className="mt-1" onClick={handleAddNew}>
              Add New Stall
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default Stall
