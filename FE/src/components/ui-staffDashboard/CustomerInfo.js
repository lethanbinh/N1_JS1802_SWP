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

const CustomerInfo = () => {
    const [data, setData] = useState([
        // (`address`, `birthday`, `create_date`, `email`, `full_name`, `phone`, `status`, `update_date`)
        { address: '123 Maple St', birthday: '1990-01-01', create_date: '2024-06-01', email: 'customer1@example.com', full_name: 'John Doe', phone: '0791234567', status: 1, update_date: '2024-06-01' },
    ])

    const [editingRow, setEditingRow] = useState(null);
    const [formData, setFormData] = useState({});

    const handleEdit = (id) => {
        setEditingRow(id);
        setFormData(data.find((row) => row.id === id) || {});
    };

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSave = () => {
        const newData = data.map((row) => {
            if (row.id === editingRow) {
                return { ...row, ...formData };
            }
            return row;
        });
        setData(newData);
        setEditingRow(null);
    };

    const handleAddNew = () => {
        const newRow = {
            id: data.length + 1,
            address: '',
            birthday: '',
            create_date: '',
            email: '',
            full_name: '',
            phone: '',
            status: '',
            update_date: '',
        };
        setData([...data, newRow]);
        setEditingRow(newRow.id);
        setFormData(newRow);
    };

    const handleDelete = (id) => {
        setData(data.filter((row) => row.id !== id));
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Customer Information</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Birthday</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Create Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Update Date</CTableHeaderCell>
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
                                                    name="create_date"
                                                    value={formData.create_date}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                row.create_date
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
                                                    name="full_name"
                                                    value={formData.full_name}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                row.full_name
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
                                                <CFormInput
                                                    type="text"
                                                    name="update_date"
                                                    value={formData.update_date}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                row.update_date
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
                            Input Customer Informaion
                        </CButton>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
export default CustomerInfo
