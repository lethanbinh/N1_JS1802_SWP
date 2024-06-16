import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSelect,
    CFormTextarea,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
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
import convertDateToJavaFormat from '../../util/DateConvert'
import fetchData from '../../util/ApiConnection'

const AccountList = () => {
    const [data, setData] = useState([])

    const [editingRow, setEditingRow] = useState(null)
    const [formData, setFormData] = useState({})
    const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser())
    const [visible, setVisible] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const handleEdit = (id) => {
        setEditingRow(id)
        setFormData(data.find((row) => row.id === id))
    }

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSave = () => {
        console.log(formData)
        const newData = data.map((row) => {
            if (row.id === editingRow) {
                return { ...row, ...formData }
            }
            return row
        })
        const dataFromInput = newData[editingRow - 1]

        let roleId = 2;
        if (dataFromInput.roleName.toUpperCase() === 'ADMIN') {
            roleId = 1;
        } else if (dataFromInput.roleName.toUpperCase() === 'STAFF') {
            roleId = 2;
        } else if (dataFromInput.roleName.toUpperCase() === 'MANAGER') {
            roleId = 3;
        }
        const savedData = {
            username: dataFromInput.username || "string",
            fullName: dataFromInput.fullName || "string",
            password: dataFromInput.password || ".!rJ/;ikPV-5Ji3EFk(", // Using default password if not provided
            phone: dataFromInput.phone || "0374422448", // Using default phone if not provided
            email: dataFromInput.email || "string",
            address: dataFromInput.address || "string",
            avatar: "", // Default value
            birthday: convertDateToJavaFormat(dataFromInput.birthday) || "2024-06-16T08:48:44.695Z", // Default date
            status: dataFromInput.status ? true : false,
            roleId
        };
        console.log(savedData)

        fetchData(`http://localhost:8080/api/v1/users/id/${editingRow}`, 'GET', null, userInfo.accessToken)
            .then((data) => {
                if (data.status === "SUCCESS") {
                    fetchData(`http://localhost:8080/api/v1/users/id/${editingRow}`, 'PUT', savedData, userInfo.accessToken)
                } else {
                    fetchData(`http://localhost:8080/api/v1/users`, 'POST', savedData, userInfo.accessToken)
                }
            })

        setData(newData)
        setEditingRow(null)

        setTimeout(() => {
            refreshData()
        }, 1000)
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
            birthday: '',
            status: true,
            roleName: '',
        }
        setData([...data, newRow])
        setEditingRow(newRow.id)
    }

    const handleDelete = (id) => {
        setVisible(false)
        setData(data.filter((row) => row.id !== id))
        fetchData(`http://localhost:8080/api/v1/users/${deleteId}`, 'DELETE', null, userInfo.accessToken)
        setDeleteId(null)

        setTimeout(() => {
            refreshData()
        }, 1000)
    }

    const refreshData = () => {
        fetchData("http://localhost:8080/api/v1/users", 'GET', null, userInfo.accessToken)
            .then(data => {
                setData(data.payload)
            })
    }

    useEffect(() => {
        refreshData()
    }, [])

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Account List</strong>
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
                                    {data.filter(row => row.status).map((row) => (
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
                                                    <CButton style={{ marginRight: "5px" }} color="success" onClick={handleSave}>
                                                        Save
                                                    </CButton>
                                                ) : (
                                                    <CButton style={{ marginRight: "5px" }} color="info" onClick={() => handleEdit(row.id)}>
                                                        Edit
                                                    </CButton>
                                                )}
                                                <CButton color="danger" onClick={() => {
                                                    setDeleteId(row.id)
                                                    setVisible(true)
                                                }}>Delete</CButton>

                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </div>
                        <CButton color="success" className="mt-1" onClick={handleAddNew}>
                            Create New Account
                        </CButton>
                    </CCardBody>
                </CCard>
            </CCol>

            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="DeleteConfirmationModalLabel"
            >
                <CModalHeader>
                    <CModalTitle id="DeleteConfirmationModalLabel">Confirm Deletion</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>Are you sure you want to delete this account?</p>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cancel
                    </CButton>
                    <CButton color="danger" onClick={e => handleDelete(deleteId)}>
                        Delete
                    </CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    )
}
export default AccountList
