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

const AccountList = () => {
    const [data, setData] = useState([
        {
            id: 1, username: 'user1', fullName: 'An', password: '', phone: '', email: 'an@gmail.com',
            address: '', avatar: '', birthday: '', status: true, roleId: 'Admin'
        },
        {
            id: 2, username: 'user2', fullName: 'Binh', password: '', phone: '', email: 'binh@gmail.com',
            address: '', avatar: '', birthday: '', status: true, roleId: 'Manager'
        },
        {
            id: 3, username: 'user3', fullName: 'Ha', password: '', phone: '', email: 'ha@gmail.com',
            address: '', avatar: '', birthday: '', status: true, roleId: 'Staff'
        },
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
            username: '',
            fullName: '',
            password: '',
            phone: '',
            email: '',
            address: '',
            avatar: '',
            birthday: '',
            status: true,
            roleId: '',
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
                        <strong>Account List</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Password</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Avatar</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Birthday</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Role ID</CTableHeaderCell>
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
                                                    type="text"
                                                    name="avatar"
                                                    value={formData.avatar}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                row.avatar
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
                                                    type="checkbox"
                                                    name="status"
                                                    checked={formData.status}
                                                    onChange={(e) => handleInputChange({ target: { name: 'status', value: e.target.checked } })}
                                                />
                                            ) : (
                                                row.status ? 'Active' : 'Inactive'
                                            )}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {editingRow === row.id ? (
                                                <CFormInput
                                                    type="text"
                                                    name="roleId"
                                                    value={formData.roleId}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                row.roleId
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
                        <CButton color="success" className="mt-1" onClick={handleAddNew}>
                            Create New Account
                        </CButton>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
export default AccountList
