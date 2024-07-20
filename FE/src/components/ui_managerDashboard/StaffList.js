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

const StaffList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
  const [visible, setVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deletedUsername, setDeletedUsername] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [confirmationInfo, setConfirmationInfo] = useState({ username: "", password: "" });
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [deleteSuccessModalVisible, setDeleteSuccessModalVisible] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stalls, setStalls] = useState([]);

  const handleEdit = (id) => {
    setEditingRow(id);
    setFormData(data.find((row) => row.id === id));
    setErrorMessage("");
    setEditModalVisible(true);
    setIsNew(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value === "null" ? null : value });
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    if (value === "") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(row => row.fullName.toLowerCase().includes(value.toLowerCase())));
    }
  };

  const handleAddNew = () => {
    setFormData({
      id: '',
      username: '',
      fullName: '',
      password: '',
      phone: '',
      email: '',
      address: '',
      birthday: '',
      roleName: 'Staff',
      stallId: null,
    });
    setErrorMessage('');
    setEditModalVisible(true);
    setIsNew(true);
  };

  const handleSave = () => {
    const requiredFields = ['username', 'fullName', 'password', 'phone', 'email', 'address', 'birthday'];
    const emptyFields = requiredFields.filter(field => !formData[field]);

    if (emptyFields.length > 0) {
      setErrorMessage(`Please fill all the fields: ${emptyFields.join(', ')}`);
      setErrorModalVisible(true);
      return;
    }

    const birthdayDate = new Date(formData.birthday);
    const todayDate = new Date();
    if (birthdayDate > todayDate) {
      setErrorMessage("Birthday cannot be later than today.");
      setErrorModalVisible(true);
      return;
    }

    const duplicateUsername = data.some(row => row.username === formData.username && row.id !== editingRow);
    const duplicatePhone = data.some(row => row.phone === formData.phone && row.id !== editingRow);
    const duplicateEmail = data.some(row => row.email === formData.email && row.id !== editingRow);
    const duplicateStallId = formData.stallId !== 0 && formData.stallId !== "" && formData.stallId !== null 
    && data.some(row => {
      console.log(row.stallId, formData.stallId)
      return row.stallId == formData.stallId && row.id !== editingRow;
    });

    const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/
    if (!regexPassword.test(formData.password)) {
      setErrorMessage("Password must be at least 6 characters, 1 uppercase letter, 1 number, 1 special character");
      setErrorModalVisible(true);
      return;
    }
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!regexEmail.test(formData.email)) {
      setErrorMessage("Please input a valid email");
      setErrorModalVisible(true);
      return;
    }
    const phoneRegex = /^(\+84|0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/
    if (!phoneRegex.test(formData.phone)) {
      setErrorMessage("Invalid Vietnam Phone number");
      setErrorModalVisible(true);
      return;
    }

    if (duplicateUsername) {
      setErrorMessage("Username already exists. Please use a unique username.");
      setErrorModalVisible(true);
      return;
    }

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

    if (duplicateStallId) {
      setErrorMessage("Stall ID already exists. Please use a unique Stall ID.");
      setErrorModalVisible(true);
      return;
    }

    let newData;
    let newId = null;
    if (isNew) {
      newId = data.length ? Math.max(...data.map(row => row.id)) + 1 : 1;
      const newRow = { ...formData, id: newId, status: true };
      newData = [...data, newRow];
    } else {
      newData = data.map((row) => {
        if (row.id === editingRow) {
          return { ...row, ...formData };
        }
        return row;
      });
    }

    const dataFromInput = newData.find(row => row.id === (isNew ? newId : editingRow));

    function getImageIdFromUrl(url) {
      const parts = url.split('/images/');
      if (parts.length > 1) {
        return parts[1];
      } else {
        return null;
      }
    }

    let avatar = formData.avatar;
    if (avatar) {
      if (avatar.includes("http://localhost:8080/api/v1/images/")) {
        avatar = getImageIdFromUrl(avatar)
      }
    }

    const savedData = {
      username: dataFromInput.username || "string",
      fullName: dataFromInput.fullName || "string",
      phone: dataFromInput.phone || "0374422448",
      email: dataFromInput.email || "string",
      address: dataFromInput.address || "string",
      avatar: avatar || "",
      password: dataFromInput.password,
      birthday: convertDateToJavaFormat(dataFromInput.birthday) || "2024-06-16T08:48:44.695Z",
      status: dataFromInput.status ? true : false,
      roleId: 2,
      stallId: dataFromInput.stallId !== null ? dataFromInput.stallId : null
    };

    const apiCall = editingRow ?
      fetchData(`http://localhost:8080/api/v1/users/id/${editingRow}`, 'PUT', savedData, userInfo.accessToken) :
      fetchData(`http://localhost:8080/api/v1/users`, 'POST', savedData, userInfo.accessToken);

    apiCall
      .then(response => {
        if (response.status === 'SUCCESS') {
          refreshData();
          setEditingRow(null);
          setEditModalVisible(false);
          setIsNew(false);

          if (isNew) {
            setConfirmationInfo({ username: formData.username, password: formData.password });
            setConfirmationModalVisible(true);
          } else {
            setSuccessModalVisible(true);
          }

          setFormData({}); // Reset form data after saving
        } else {
          throw new Error('Failed to save data');
        }
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        setErrorMessage("Error saving data. Please try again.");
        setErrorModalVisible(true);
      });
  };

  const handleDelete = (id) => {
    setVisible(false);
    fetchData(`http://localhost:8080/api/v1/users/${deleteId}`, 'DELETE', null, userInfo.accessToken)
      .then(() => {
        refreshData();
        setDeleteId(null);
        setDeleteSuccessModalVisible(true);
      })
      .catch((error) => {
        console.error("Error deleting row:", error);
      });
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setFormData({});
  };

  const preprocessData = (data, stalls) => {
    return data.map(row => {
      const stall = stalls.find(stall => stall.id === row.stallId);
      return { ...row, stallName: stall ? stall.name : "N/A" };
    });
  };

  const refreshData = () => {
    fetchData("http://localhost:8080/api/v1/users", 'GET', null, userInfo.accessToken)
      .then(data => {
        fetchStalls().then(stalls => {
          const preprocessedData = preprocessData(data.payload, stalls);
          setData(preprocessedData);
          setFilteredData(preprocessedData);
        });
      });
  };

  const fetchStalls = () => {
    return fetchData("http://localhost:8080/api/v1/stalls", 'GET', null, userInfo.accessToken)
      .then(data => {
        setStalls(data.payload);
        return data.payload;
      })
      .catch(error => {
        console.error("Error fetching stalls:", error);
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
            <strong>Staff Management</strong>
            <CButton color="primary" onClick={handleAddNew}>
              + Add New Staff
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CFormInput
              type="text"
              placeholder="Search by full name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="mb-4 shadow-sm"
              style={{ border: '1px solid #adb5bd' }}
            />
            <div style={{ height: '65vh', overflowY: 'auto' }}>
              <CTable hover responsive bordered className="shadow-sm table-border-dark" style={{ border: '1px solid #adb5bd' }}>
                <CTableHead className="bg-light text-dark">
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell>Full Name</CTableHeaderCell>
                    <CTableHeaderCell>Phone</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Address</CTableHeaderCell>
                    <CTableHeaderCell>Birthday</CTableHeaderCell>
                    <CTableHeaderCell>Stall</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.filter(row => row.status && row.roleId === 2).map((row) => (
                    <CTableRow key={row.id}>
                      <CTableDataCell>{row.id}</CTableDataCell>
                      <CTableDataCell>{row.username}</CTableDataCell>
                      <CTableDataCell>{row.fullName}</CTableDataCell>
                      <CTableDataCell>{row.phone}</CTableDataCell>
                      <CTableDataCell>{row.email}</CTableDataCell>
                      <CTableDataCell>{row.address}</CTableDataCell>
                      <CTableDataCell>{row.birthday}</CTableDataCell>
                      <CTableDataCell>{row.stallName}</CTableDataCell>
                      <CTableDataCell className="d-flex justify-content-around">
                        <CButton color="info" size="sm" onClick={() => handleEdit(row.id)}>
                          <CIcon icon={cilPen} />
                        </CButton>
                        <CButton color="danger" size="sm" onClick={() => {
                          setDeleteId(row.id);
                          setVisible(true);
                          setDeletedUsername(row.username);
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
        backdrop={true}
        aria-labelledby="DeleteConfirmationModalLabel"
      >
        <CModalHeader className="bg-danger text-white">
          <CModalTitle id="DeleteConfirmationModalLabel">Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to delete the account of <strong>{deletedUsername}</strong>?</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={e => handleDelete(deleteId)} style={{ color: "white" }}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
        backdrop={true}
        aria-labelledby="ErrorModalLabel"
      >
        <CModalHeader className="bg-warning text-white">
          <CModalTitle id="ErrorModalLabel">Error</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>{errorMessage}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setErrorModalVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={editModalVisible}
        onClose={handleCancelEdit}
        backdrop={true}
        aria-labelledby="EditModalLabel"
        size="lg"
      >
        <CModalHeader className="bg-primary text-white">
          <CModalTitle id="EditModalLabel">{isNew ? "Add New Staff" : "Edit Staff"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={6}>
              <CFormInput
                type="text"
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="mb-3"
                style={{ border: '1px solid #adb5bd' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                name="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="mb-3"
                style={{ border: '1px solid #adb5bd' }}
              />
            </CCol>
          </CRow>
          {isNew && (
            <CRow>
              <CCol md={6}>
                <CFormInput
                  type="password"
                  name="password"
                  label="Password"
                  value={formData.password}
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
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mb-3"
                  style={{ border: '1px solid #adb5bd' }}
                />
              </CCol>
            </CRow>
          )}
          <CRow>
            <CCol md={6}>
              <CFormInput
                type="email"
                name="email"
                label="Email"
                value={formData.email}
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
                value={formData.address}
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
                value={formData.birthday}
                onChange={handleInputChange}
                className="mb-3"
                style={{ border: '1px solid #adb5bd' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect
                name="stallId"
                label="Stall"
                value={formData.stallId !== null ? formData.stallId : "null"}
                onChange={handleInputChange}
                className="mb-3"
                style={{ border: '1px solid #adb5bd' }}
              >
                <option value="">No Stall</option>
                {stalls.map(stall => (
                  <option key={stall.id} value={stall.id}>{stall.name}</option>
                ))}
              </CFormSelect>
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
        visible={confirmationModalVisible}
        onClose={() => setConfirmationModalVisible(false)}
        backdrop={true}
        aria-labelledby="ConfirmationModalLabel"
      >
        <CModalHeader className="bg-success text-white">
          <CModalTitle id="ConfirmationModalLabel">Account Information</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Your account has been created successfully!</p>
          <p><strong>Username:</strong> {confirmationInfo.username}</p>
          <p><strong>Password:</strong> {confirmationInfo.password}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setConfirmationModalVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
        backdrop={true}
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
        backdrop={true}
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

export default StaffList;
