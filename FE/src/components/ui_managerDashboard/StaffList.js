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

const StaffList = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Mark', email: 'abc@gmail.com', role: 'Seller' },
    { id: 2, name: 'Mark', email: 'abc@gmail.com', role: 'Seller' },
    { id: 3, name: 'Mark', email: 'abc@gmail.com', role: 'Seller' },
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
            <strong>Staff List</strong>
          </CCardHeader>
          <CCardBody>
            <div style={{ height: '500px', overflow: 'auto' }}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Id</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Username</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Full Name</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Password</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Phone</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Address</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Birthday</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "160px" }} scope="col">Role</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "200px" }} scope="col">Action</CTableHeaderCell>
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
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.username
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.fullName
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                        ) : (
                          '******'
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.phone
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormTextarea
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.email
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormTextarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.address
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.birthday
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="roleName"
                            value={formData.roleName}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.roleName
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

            </div>
            <CButton color="success" className="mt-1" onClick={handleAddNew}>
              Create New Staff
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default StaffList
