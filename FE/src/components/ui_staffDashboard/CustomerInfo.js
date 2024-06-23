import {
    CButton,
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
    CTableRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from '@coreui/react';
import React, { useState, useEffect } from 'react';
import fetchData from "../../util/ApiConnection";
import convertDateToJavaFormat from '../../util/DateConvert'
import UserStorage from "../../util/UserStorage";
import '../../customStyles.css'

const CustomerInfo = () => {
    const [data, setData] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [formData, setFormData] = useState({});
    const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
    const [visible, setVisible] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [error, setError] = useState(null);

    const handleEdit = (id) => {
        setEditingRow(id);
        setFormData(data.find((row) => row.id === id));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        console.log(formData);
        const newData = data.map((row) => {
            if (row.id === editingRow) {
                return { ...row, ...formData };
            }
            return row;
        });
        const dataFromInput = newData.find((row) => row.id === editingRow);

        const savedData = {
            fullName: dataFromInput.fullName || "string",
            phone: dataFromInput.phone || "0374422448", // Default phone if not provided
            email: dataFromInput.email || "string",
            address: dataFromInput.address || "string",
            birthday: convertDateToJavaFormat(dataFromInput.birthday) || "2024-06-16T08:48:44.695Z", // Default date
            status: dataFromInput.status ? true : false,
        };

        const updatedData = { ...savedData };

        console.log(savedData);

        fetchData(`http://localhost:8080/api/v1/customers/id/${editingRow}`, 'GET', null, userInfo.accessToken)
            .then((data) => {
                if (data.status === "SUCCESS") {
                    fetchData(`http://localhost:8080/api/v1/customers/id/${editingRow}`, 'PUT', updatedData, userInfo.accessToken)
                } else {
                    fetchData(`http://localhost:8080/api/v1/customers`, 'POST', savedData, userInfo.accessToken)
                }
            });

        setData(newData);
        setEditingRow(null);

        setTimeout(() => {
            refreshData();
        }, 1000);
    };

    const handleAddNew = () => {
        const newRow = {
            id: data.length + 1,
            fullName: '',
            phone: '',
            email: '',
            address: '',
            birthday: '',
            status: true,
        };
        setData([...data, newRow]);
        setEditingRow(newRow.id);
    };

    const handleDelete = (id) => {
        setDeleteId(id); // Set deleteId to confirm deletion
        setVisible(true); // Show delete confirmation modal
    };

    const confirmDelete = () => {
        setVisible(false); // Hide the delete confirmation modal

        // Get the customer data to update
        const customerToUpdate = data.find((row) => row.id === deleteId);

        // Update customer status to false and handle null values
        const updatedData = {
            fullName: customerToUpdate.fullName || "string",
            phone: customerToUpdate.phone || "0374422448", // Default phone if not provided
            email: customerToUpdate.email || "string",
            address: customerToUpdate.address || "string",
            birthday: customerToUpdate.birthday || convertDateToJavaFormat("2024-06-16"), // Default date
            status: false,
        };

        fetchData(`http://localhost:8080/api/v1/customers/id/${deleteId}`, 'PUT', updatedData, userInfo.accessToken)
            .then((response) => {
                if (response.status === "SUCCESS") {
                    // Update customer status in data state and filter out inactive customers
                    const newData = data.map((row) => {
                        if (row.id === deleteId) {
                            return { ...row, status: false };
                        }
                        return row;
                    }).filter((row) => row.status); // Only keep active customers
                    setData(newData);
                    setDeleteId(null); // Reset deleteId after successful update
                } else {
                    console.error('Error updating customer status:', response);
                    alert('Failed to update customer status. Please try again later.');
                }
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                alert('Failed to update customer status. Please try again later.');
            });
    };


    const refreshData = () => {
        fetchData("http://localhost:8080/api/v1/customers", 'GET', null, userInfo.accessToken)
            .then(data => {
                const activeCustomers = data.payload.filter(customer => customer.status); // Only include active customers
                setData(activeCustomers);
                setError(null); // Clear error on successful fetch
            })
            .catch(err => {
                setError(err.message); // Set error state on fetch failure
            });
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Customer Information</strong>
                    </CCardHeader>
                    <CCardBody>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div style={{ height: '500px', overflow: 'auto' }}>
                            <CTable>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Birthday</CTableHeaderCell>
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
                                                        name="fullName"
                                                        value={formData.fullName || ''}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    row.fullName
                                                )}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                {editingRow === row.id ? (
                                                    <CFormInput
                                                        type="text"
                                                        name="phone"
                                                        value={formData.phone || ''}
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
                                                        name="email"
                                                        value={formData.email || ''}
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
                                                        name="address"
                                                        value={formData.address || ''}
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
                                                        value={formData.birthday ? formData.birthday.split('T')[0] : ''}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    row.birthday.split('T')[0]
                                                )}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                {editingRow === row.id ? (
                                                    <CFormInput
                                                        type="checkbox"
                                                        name="status"
                                                        checked={formData.status || true}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    row.status ? 'Active' : 'Inactive'
                                                )}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                {editingRow === row.id ? (
                                                    <CButton className='custom-btn custom-btn-success' color="success" onClick={handleSave}>
                                                        Save
                                                    </CButton>
                                                ) : (
                                                    <CButton className='custom-btn custom-btn-info' color="info" onClick={() => handleEdit(row.id)}>
                                                        Edit
                                                    </CButton>
                                                )}
                                                <CButton className='custom-btn custom-btn-danger mx-1' color="danger" onClick={() => handleDelete(row.id)}>
                                                    Delete
                                                </CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </div>
                        <CButton className='custom-btn custom-btn-success mt-1' color="success" onClick={handleAddNew}>
                            Input Customer Information
                        </CButton>
                    </CCardBody>
                </CCard>
            </CCol>
            {/* Delete Confirmation Modal */}
            <CModal visible={visible} onClose={() => setVisible(false)} aria-labelledby="DeleteConfirmationModalLabel">
                <CModalHeader closeButton>
                    <CModalTitle id="DeleteConfirmationModalLabel">Confirm Deletion</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>Are you sure you want to delete this customer?</p>
                </CModalBody>
                <CModalFooter>
                    <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={() => setVisible(false)}>Cancel</CButton>
                    <CButton className='custom-btn custom-btn-danger' color="danger" onClick={confirmDelete}>Delete</CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    )
}

export default CustomerInfo

