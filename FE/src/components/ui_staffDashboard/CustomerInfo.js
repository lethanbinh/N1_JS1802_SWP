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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import '../../customStyles.css';
import fetchData from "../../util/ApiConnection";
import convertDateToJavaFormat from '../../util/DateConvert';
import UserStorage from "../../util/UserStorage";
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import CIcon from '@coreui/icons-react';
import { cilHamburgerMenu } from '@coreui/icons';

const CustomerInfo = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
  const [visible, setVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [deleteSuccessModalVisible, setDeleteSuccessModalVisible] = useState(false);

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

    let newData;
    if (isNew) {
      const newId = data.length ? Math.max(...data.map(row => row.id)) + 1 : 1;
      const newRow = { ...formData, id: newId, status: true };
      newData = [...data, newRow];
    } else {
      newData = data.map((row) => (row.id === editingRow ? { ...row, ...formData } : row));
    }

    const dataFromInput = newData.find(row => row.id === (isNew ? newData.length : editingRow));

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
      <div style={{ width: "50%", display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
        <CFormInput
          type="text"
          className="form-control mb-3"
          placeholder="Search customer by phone"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Customer Information</strong>
          </CCardHeader>
          <CCardBody>
            <div style={{ height: '60vh', overflow: 'auto' }}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Birthday</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Bonus Point</CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "100px" }} scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.filter(row => row.status).map((row) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                      <CTableDataCell>{row.fullName}</CTableDataCell>
                      <CTableDataCell>{row.phone}</CTableDataCell>
                      <CTableDataCell>{row.email}</CTableDataCell>
                      <CTableDataCell>{row.address}</CTableDataCell>
                      <CTableDataCell>{row.birthday}</CTableDataCell>
                      <CTableDataCell>{row.bonusPoint}</CTableDataCell>
                      <CTableDataCell>
                        <CDropdown className="position-relative">
                          <CDropdownToggle color="light" className="border-0 bg-transparent p-0 custom-dropdown-toggle">
                            <CIcon icon={cilHamburgerMenu} size="xl" />
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={() => handleEdit(row.id)}>Update</CDropdownItem>
                            <CDropdownItem onClick={() => {
                              setDeleteId(row.id);
                              setVisible(true);
                            }}>Delete</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
            <CButton className='custom-btn custom-btn-success mt-2' color="success" onClick={handleAddNew}>
              Add Customer
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
          <p>Are you sure you want to delete this customer?</p>
        </CModalBody>
        <CModalFooter>
          <CButton style={{ marginRight: '10px' }} className='custom-btn custom-btn-secondary' color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton className='custom-btn custom-btn-danger' color="danger" onClick={() => handleDelete(deleteId)}>
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
        <CModalHeader>
          <CModalTitle id="EditModalLabel">{isNew ? "Add Customer" : "Edit Customer"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            name="fullName"
            label="Full Name"
            value={formData.fullName || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormInput
            type="text"
            name="phone"
            label="Phone"
            value={formData.phone || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormTextarea
            type="text"
            name="email"
            label="Email"
            value={formData.email || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormInput
            type="text"
            name="address"
            label="Address"
            value={formData.address || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormInput
            type="date"
            name="birthday"
            label="Birthday"
            value={formData.birthday || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormInput
            type="number"
            name="bonusPoint"
            label="Bonus Point"
            value={formData.bonusPoint || 0}
            onChange={handleInputChange}
            className="mb-3"
          />
        </CModalBody>
        <CModalFooter>
          <CButton style={{ marginRight: '10px' }} color="secondary" onClick={handleCancelEdit}>
            Cancel
          </CButton>
          <CButton color="success" onClick={handleSave}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={errorModalVisible}
        onClose={handleCloseErrorModal}
        aria-labelledby="ErrorModalLabel"
      >
        <CModalHeader>
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
        visible={confirmationModalVisible}
        onClose={() => setConfirmationModalVisible(false)}
        aria-labelledby="ConfirmationModalLabel"
      >
        <CModalHeader>
          <CModalTitle id="ConfirmationModalLabel">Account Information</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Your account has been created successfully!</p>
        </CModalBody>
        <CModalFooter>
          <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={() => setConfirmationModalVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
        aria-labelledby="SuccessModalLabel"
      >
        <CModalHeader>
          <CModalTitle id="SuccessModalLabel">Success</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Your changes have been saved successfully!</p>
        </CModalBody>
        <CModalFooter>
          <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={() => setSuccessModalVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={deleteSuccessModalVisible}
        onClose={() => setDeleteSuccessModalVisible(false)}
        aria-labelledby="DeleteSuccessModalLabel"
      >
        <CModalHeader>
          <CModalTitle id="DeleteSuccessModalLabel">Delete Successful</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>The account has been deleted successfully!</p>
        </CModalBody>
        <CModalFooter>
          <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={() => setDeleteSuccessModalVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
}

export default CustomerInfo;
