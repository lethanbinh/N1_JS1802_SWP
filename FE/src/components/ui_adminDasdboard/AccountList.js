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
import React, { useEffect, useState } from 'react'
import UserStorage from '../../util/UserStorage'
import fetchData from '../../util/ApiConnection'

const AccountList = () => {
    const [data, setData] = useState([])

    const [editingRow, setEditingRow] = useState(null)
    const [formData, setFormData] = useState({})
    const [user, setUser] = useState(UserStorage.getAuthenticatedUser())

    useEffect(() => {
        fetchData("http://localhost:8080/api/v1/users", "GET", null, user.accessToken)
            .then(data => {
                setData(data.payload)
            })
    }, [])

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

        const newUser = data[editingRow - 1];
        console.log(newUser)

        let roleId = 1
        if (newUser.role.toLowerCase() == 'manager') {
            roleId = 2
        } else if (newUser.role.toLowerCase() == "staff") {
            roleId = 3
        }

        const dataSave = {
            "username": "Hello123456",
            "fullName": newUser.name,
            "password": "Binh123@",
            "phone": "0596741581",
            "email": newUser.email,
            "address": "string",
            "avatar": "string",
            "birthday": "2024-06-14T12:32:24.158Z",
            "status": true,
            "roleId": roleId
        }

        fetchData("http://localhost:8080/api/v1/users", "POST", dataSave, user.accessToken)

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
                        <strong>Account List</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Role</CTableHeaderCell>
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
                                                <CFormInput
                                                    type="text"
                                                    name="role"
                                                    value={formData.role}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                row.role
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
