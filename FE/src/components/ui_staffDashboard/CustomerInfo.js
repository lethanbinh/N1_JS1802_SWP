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
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import '../../customStyles.css';
import fetchData from '../../util/ApiConnection';
import convertDateToJavaFormat from '../../util/DateConvert';
import UserStorage from '../../util/UserStorage';
import { cilPen, cilDelete } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const CustomerInfo = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
  const [visible, setVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [deleteSuccessModalVisible, setDeleteSuccessModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  const handleEdit = (id) => {
    setEditingRow(id);
    setFormData(data.find((row) => row.id === id) || {});
    setEditModalVisible(true);
    setIsNew(false);
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCloseErrorModal = () => {
    setErrorModalVisible(false);
    setErrorMessage("");
  };

  useEffect(() => {
    fetchData(`http://localhost:8080/api/v1/customers/phone/${search}`, "GET", null, userInfo.accessToken)
      .then((response) => {
        console.log("Customer data fetched successfully:", response);
        if (response.payload) {
          const activeCustomers = response.payload.filter(customer => customer.status);
          setData(activeCustomers);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSave = () => {
    const requiredFields = ['fullName', 'phone', 'email', 'address', 'birthday'];
    const emptyFields = requiredFields.filter(field => !formData[field]);

    if (emptyFields.length > 0) {
      setErrorMessage(`Please fill all the fields: ${emptyFields.join(', ')}`);
      setErrorModalVisible(true);
      return;
    }

    const today = new Date();
    const birthday = new Date(formData.birthday);
    if (birthday > today) {
      setErrorMessage("Birthday cannot be in the future.");
      setErrorModalVisible(true);
      return;
    }

    const duplicatePhone = data.some(row => row.phone === formData.phone && row.id !== editingRow);
    const duplicateEmail = data.some(row => row.email === formData.email && row.id !== editingRow);

    if (duplicatePhone) {
      setErrorMessage("Phone number already exists. Please use a unique phone number.");
      setErrorModalVisible(true);
      return;
    }

    if (duplicateEmail) {
      setErrorMessage("Email already exists. Please use a unique email.");
      setErrorModalVisible(true);
      return;
    }

    const newBonusPoint = parseInt(formData.bonusPoint);
    if (newBonusPoint < 0) {
      setErrorMessage("Bonus point cannot be negative.");
      setErrorModalVisible(true);
      return;
    }

    const phoneRegex = /^(\+84|0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!phoneRegex.test(formData.phone)) {
      setErrorMessage("Invalid Vietnam Phone number");
      setErrorModalVisible(true);
      return;
    }

    if (!regexEmail.test(formData.email)) {
      setErrorMessage("Invalid Email");
      setErrorModalVisible(true);
      return;
    }

    let newData;
    if (isNew) {
      const newId = 0;
      const newRow = { ...formData, id: newId, status: true };
      newData = [...data, newRow];
    } else {
      newData = data.map((row) => (row.id === editingRow ? { ...row, ...formData } : row));
    }

    const dataFromInput = newData.find(row => row.id === (isNew ? 0 : editingRow));

    const savedData = {
      fullName: dataFromInput.fullName || "string",
      phone: dataFromInput.phone || "0374422448",
      email: dataFromInput.email || "string",
      address: dataFromInput.address || "string",
      status: true,
      birthday: convertDateToJavaFormat(dataFromInput.birthday) || "2024-06-16T08:48:44.695Z",
      bonusPoint: dataFromInput.bonusPoint || 0,
    };

    console.log(savedData);

    const savePromise = isNew
      ? fetchData(`http://localhost:8080/api/v1/customers`, 'POST', savedData, userInfo.accessToken)
      : fetchData(`http://localhost:8080/api/v1/customers/id/${editingRow}`, 'PUT', savedData, userInfo.accessToken);

    savePromise.then(() => {
      setSuccessModalVisible(true);
      refreshData();
      setEditingRow(null);
      setEditModalVisible(false);
      setIsNew(false);
    }).catch((error) => {
      setErrorMessage(`Error saving data: ${error.message}`);
      setErrorModalVisible(true);
    });

    setTimeout(() => {
      refreshData();
    }, 1000);
  };

  const handleAddNew = () => {
    setFormData({
      id: '',
      fullName: '',
      phone: '',
      email: '',
      address: '',
      birthday: '',
      status: true,
      bonusPoint: 0
    });
    setEditModalVisible(true);
    setIsNew(true);
  };

  const handleDelete = (id) => {
    setVisible(false);
    fetchData(`http://localhost:8080/api/v1/customers/${deleteId}`, 'DELETE', null, userInfo.accessToken)
      .then(() => {
        setDeleteSuccessModalVisible(true); // Show delete success modal
        refreshData();
      });
    setDeleteId(null);
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setFormData({});
  };

  const refreshData = () => {
    fetchData("http://localhost:8080/api/v1/customers", 'GET', null, userInfo.accessToken)
      .then(data => {
        const activeCustomers = data.payload.filter(customer => customer.status);
        setData(activeCustomers);
      });
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <CRow className="m-0">
      <CCol xs={12}>
        <CCard className="mb-4 border-0 shadow-sm">
          <CCardHeader className="bg-light text-dark d-flex justify-content-between align-items-center">
            <strong>Customer Management</strong>
            <CButton color="primary" onClick={handleAddNew}>
              + Add New Customer
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CFormInput
              type="text"
              placeholder="Search by phone number..."
              value={search}
              onChange={handleSearch}
              className="mb-4 shadow-sm"
              style={{ border: '1px solid #adb5bd' }}
            />
            <div style={{ height: '65vh', overflowY: 'auto' }}>
              <CTable hover responsive bordered className="shadow-sm table-border-dark" style={{ border: '1px solid #adb5bd' }}>
                <CTableHead className="bg-light text-dark">
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Full Name</CTableHeaderCell>
                    <CTableHeaderCell>Phone</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Address</CTableHeaderCell>
                    <CTableHeaderCell>Birthday</CTableHeaderCell>
                    <CTableHeaderCell>Bonus Point</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((row) => (
                    <CTableRow key={row.id}>
                      <CTableDataCell>{row.id}</CTableDataCell>
                      <CTableDataCell>{row.fullName}</CTableDataCell>
                      <CTableDataCell>{row.phone}</CTableDataCell>
                      <CTableDataCell>{row.email}</CTableDataCell>
                      <CTableDataCell>{row.address}</CTableDataCell>
                      <CTableDataCell>{row.birthday}</CTableDataCell>
                      <CTableDataCell>{row.bonusPoint.toLocaleString('en-US')}</CTableDataCell>
                      <CTableDataCell className="d-flex justify-content-around">
                        <CButton color="info" size="sm" onClick={() => handleEdit(row.id)}>
                          <CIcon icon={cilPen} />
                        </CButton>
                        <CButton color="danger" size="sm" onClick={() => {
                          setDeleteId(row.id);
                          setVisible(true);
                        }}>
                          <CIcon icon={cilDelete} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="DeleteConfirmationModalLabel"
      >
        <CModalHeader className="bg-danger text-white">
          <CModalTitle id="DeleteConfirmationModalLabel">Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to delete this customer?</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={() => handleDelete(deleteId)} style={{ color: "white" }}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={editModalVisible}
        onClose={handleCancelEdit}
        aria-labelledby="EditModalLabel"
        size="lg"
      >
        <CModalHeader className="bg-primary text-white">
          <CModalTitle id="EditModalLabel">{isNew ? "Add Customer" : "Edit Customer"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={6}>
              <CFormInput
                type="text"
                name="fullName"
                label="Full Name"
                value={formData.fullName || ''}
                onChange={handleInputChange}
                className="mb-3"
                style={{ border: '1px solid #adb5bd' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                name="phone"
                label="Phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                className="mb-3"
                style={{ border: '1px solid #adb5bd' }}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6}>
              <CFormInput
                type="text"
                name="email"
                label="Email"
                value={formData.email || ''}
                onChange={handleInputChange}
                className="mb-3"
                style={{ border: '1px solid #adb5bd' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                name="address"
                label="Address"
                value={formData.address || ''}
                onChange={handleInputChange}
                className="mb-3"
                style={{ border: '1px solid #adb5bd' }}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={6}>
              <CFormInput
                type="date"
                name="birthday"
                label="Birthday"
                value={formData.birthday || ''}
                onChange={handleInputChange}
                className="mb-3"
                style={{ border: '1px solid #adb5bd' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                name="bonusPoint"
                label="Bonus Point"
                disabled
                value={formData.bonusPoint || 0}
                onChange={handleInputChange}
                className="mb-3"
                style={{ border: '1px solid #adb5bd' }}
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCancelEdit}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={errorModalVisible}
        onClose={handleCloseErrorModal}
        aria-labelledby="ErrorModalLabel"
      >
        <CModalHeader className="bg-warning text-white">
          <CModalTitle id="ErrorModalLabel">Error</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>{errorMessage}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCloseErrorModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
        aria-labelledby="SuccessModalLabel"
      >
        <CModalHeader className="bg-success text-white">
          <CModalTitle id="SuccessModalLabel">Success</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Your changes have been saved successfully!</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setSuccessModalVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={deleteSuccessModalVisible}
        onClose={() => setDeleteSuccessModalVisible(false)}
        aria-labelledby="DeleteSuccessModalLabel"
      >
        <CModalHeader className="bg-success text-white">
          <CModalTitle id="DeleteSuccessModalLabel">Delete Successful</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>The account has been deleted successfully!</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteSuccessModalVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default CustomerInfo;
