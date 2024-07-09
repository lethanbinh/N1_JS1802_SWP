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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import '../../customStyles.css'
import fetchData from '../../util/ApiConnection'
import convertDateToJavaFormat from '../../util/DateConvert'
import UserStorage from '../../util/UserStorage'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';

const AccountList = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [editingRow, setEditingRow] = useState(null)
  const [formData, setFormData] = useState({})
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser())
  const [visible, setVisible] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deletedUsername, setDeletedUsername] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false)
  const [confirmationInfo, setConfirmationInfo] = useState({ username: "", password: "" })
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [deleteSuccessModalVisible, setDeleteSuccessModalVisible] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleEdit = (id) => {
    setEditingRow(id)
    setFormData(data.find((row) => row.id === id))
    setErrorMessage("")
    setEditModalVisible(true)
    setIsNew(false)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSearchChange = (event) => {
    const { value } = event.target
    setSearchTerm(value)
    let filtered = data
    if (selectedRole !== "") {
      filtered = filtered.filter(row => row.roleName.toUpperCase() === selectedRole.toUpperCase())
    }
    if (value !== "") {
      filtered = filtered.filter(row => row.fullName.toLowerCase().includes(value.toLowerCase()))
    }
    setFilteredData(filtered)
  }

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value
    setSelectedRole(selectedRole)
    let filtered = data
    if (selectedRole !== "") {
      filtered = filtered.filter(row => row.roleName.toUpperCase() === selectedRole.toUpperCase())
    }
    if (searchTerm !== "") {
      filtered = filtered.filter(row => row.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    setFilteredData(filtered)
  }

  const handleSave = () => {
    const requiredFields = ['username', 'fullName', 'password', 'phone', 'email', 'address', 'birthday', 'roleName'];
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

    const duplicateUsername = data.some(row => row.username === formData.username && row.id !== editingRow)
    const duplicatePhone = data.some(row => row.phone === formData.phone && row.id !== editingRow)
    const duplicateEmail = data.some(row => row.email === formData.email && row.id !== editingRow)

    if (duplicateUsername) {
      setErrorMessage("Username already exists. Please use a unique username.")
      setErrorModalVisible(true)
      return
    }

    if (duplicatePhone) {
      setErrorMessage("Phone number already exists. Please use a unique phone number.")
      setErrorModalVisible(true)
      return
    }

    if (duplicateEmail) {
      setErrorMessage("Email already exists. Please use a unique email.")
      setErrorModalVisible(true)
      return
    }

    // Check if there are already 2 Admin accounts
    const adminCount = data.filter(row => row.roleName.toUpperCase() === 'ADMIN').length;
    if (formData.roleName.toUpperCase() === 'ADMIN' && adminCount >= 2 && !isNew) {
      setErrorMessage("Only a maximum of 2 Admin accounts are allowed.");
      setErrorModalVisible(true);
      return;
    }

    let newData;
    if (isNew) {
      const newId = 0;
      const newRow = { ...formData, id: newId, status: true };
      newData = [...data, newRow];
    } else {
      newData = data.map((row) => {
        if (row.id === editingRow) {
          return { ...row, ...formData }
        }
        return row
      })
    }

    const dataFromInput = newData.find(row => row.id === (isNew ? 0 : editingRow));

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
      phone: dataFromInput.phone || "0374422448", // Using default phone if not provided
      email: dataFromInput.email || "string",
      address: dataFromInput.address || "string",
      avatar: "", // Default value
      password: dataFromInput.password,
      birthday: convertDateToJavaFormat(dataFromInput.birthday) || "2024-06-16T08:48:44.695Z", // Default date
      status: dataFromInput.status ? true : false,
      roleId
    };

    const updatedData = {
      username: dataFromInput.username || "string",
      fullName: dataFromInput.fullName || "string",
      phone: dataFromInput.phone || "0374422448", // Using default phone if not provided
      email: dataFromInput.email || "string",
      address: dataFromInput.address || "string",
      avatar: "", // Default value
      birthday: convertDateToJavaFormat(dataFromInput.birthday) || "2024-06-16T08:48:44.695Z", // Default date
      status: dataFromInput.status ? true : false,
      roleId
    }

    fetchData(`http://localhost:8080/api/v1/users/id/${editingRow}`, 'GET', null, userInfo.accessToken)
      .then((data) => {
        if (data.status === "SUCCESS") {
          fetchData(`http://localhost:8080/api/v1/users/id/${editingRow}`, 'PUT', updatedData, userInfo.accessToken)
        } else {
          fetchData(`http://localhost:8080/api/v1/users`, 'POST', savedData, userInfo.accessToken)
            .then(() => refreshData())
        }
      })

    setData(newData)
    setEditingRow(null)
    setEditModalVisible(false)
    setIsNew(false)

    let filtered = newData;
    if (selectedRole !== "") {
      filtered = filtered.filter(row => row.roleName.toUpperCase() === selectedRole.toUpperCase());
    }
    if (searchTerm !== "") {
      filtered = filtered.filter(row => row.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredData(filtered);

    if (isNew) {
      setConfirmationInfo({ username: formData.username, password: formData.password });
      setConfirmationModalVisible(true);
    } else {
      setSuccessModalVisible(true);
    }
  }

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
      roleName: '',
      status: true,
    })
    setErrorMessage("")
    setEditModalVisible(true)
    setIsNew(true)
  }

  const handleDelete = (id) => {
    setVisible(false)
    fetchData(`http://localhost:8080/api/v1/users/${deleteId}`, 'DELETE', null, userInfo.accessToken)
      .then(() => {
        const updatedData = data.filter((row) => row.id !== id);
        setData(updatedData);
        let filtered = updatedData;
        if (selectedRole !== "") {
          filtered = filtered.filter(row => row.roleName.toUpperCase() === selectedRole.toUpperCase());
        }
        if (searchTerm !== "") {
          filtered = filtered.filter(row => row.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        setFilteredData(filtered);
        setDeleteId(null);
        setDeleteSuccessModalVisible(true);
      })
      .catch((error) => {
        console.error("Error deleting row:", error);
      });
  }

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setFormData({});
  }

  const refreshData = () => {
    fetchData("http://localhost:8080/api/v1/users", 'GET', null, userInfo.accessToken)
      .then(data => {
        setData(data.payload)
        setFilteredData(data.payload)
      })
  }

  useEffect(() => {
    refreshData()
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: "50%", display: 'flex', alignItems: 'center', justifyContent: 'right', paddingRight: '10px' }}>
            <CFormSelect
              name="roleFilter"
              label="Filter by Role"
              value={selectedRole}
              onChange={handleRoleChange}
              className="mb-3"
            >
              <option value="">All</option>
              <option value="ADMIN">ADMIN</option>
              <option value="STAFF">STAFF</option>
              <option value="MANAGER">MANAGER</option>
            </CFormSelect>
          </div>
          <div style={{ width: "50%", display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
            <CFormInput
              type="text"
              placeholder="Search by full name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mb-3"
            />
          </div>

        </div>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Account List</strong>
          </CCardHeader>
          <CCardBody>
            <div style={{ height: '65vh', overflow: 'auto' }}>
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
                  {filteredData.filter(row => row.status).map((row) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                      <CTableDataCell>{row.username}</CTableDataCell>
                      <CTableDataCell>{row.fullName}</CTableDataCell>
                      <CTableDataCell>****</CTableDataCell>
                      <CTableDataCell>{row.phone}</CTableDataCell>
                      <CTableDataCell>{row.email}</CTableDataCell>
                      <CTableDataCell>{row.address}</CTableDataCell>
                      <CTableDataCell>{row.birthday}</CTableDataCell>
                      <CTableDataCell>{row.roleName}</CTableDataCell>
                      <CTableDataCell>
                        <CDropdown className="position-relative">
                          <CDropdownToggle color="light" className="border-0 bg-transparent p-0 custom-dropdown-toggle">
                            <EllipsisHorizontalIcon className="w-6 h-6 text-gray-500" />
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={() => handleEdit(row.id)}>Update</CDropdownItem>
                            <CDropdownItem onClick={() => {
                              setDeleteId(row.id)
                              setVisible(true)
                              setDeletedUsername(row.username)
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
        {deletedUsername !== userInfo.username ? <>
          <CModalHeader>
            <CModalTitle id="DeleteConfirmationModalLabel">Confirm Deletion</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Are you sure you want to delete this account?</p>
          </CModalBody>
          <CModalFooter>
            <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={() => setVisible(false)}>
              Cancel
            </CButton>
            <CButton className='custom-btn custom-btn-danger' color="danger" onClick={e => handleDelete(deleteId)}>
              Delete
            </CButton>
          </CModalFooter>
        </> : <>
          <CModalHeader>
            <CModalTitle id="DeleteConfirmationModalLabel">Delete Error</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>You are signed in. Cannot delete</p>
          </CModalBody>
          <CModalFooter>
            <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={() => setVisible(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </>}
      </CModal>

      <CModal
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
        aria-labelledby="ErrorModalLabel"
      >
        <CModalHeader>
          <CModalTitle id="ErrorModalLabel">Input information error</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>{errorMessage}</p>
        </CModalBody>
        <CModalFooter>
          <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={() => setErrorModalVisible(false)}>
            Close
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
          <CModalTitle id="EditModalLabel">{isNew ? "Add Account" : "Edit Account"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormInput
            type="text"
            name="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mb-3"
          />
          {isNew ? <CFormInput
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="mb-3"
          /> : ""}
          <CFormInput
            type="text"
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormTextarea
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormTextarea
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormInput
            type="date"
            name="birthday"
            label="Birthday"
            value={formData.birthday}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormSelect
            name="roleName"
            label="Role"
            value={formData.roleName}
            onChange={handleInputChange}
            aria-label="Default select example"
            className="mb-3"
          >
            <option value="">Select role</option>
            <option value="ADMIN">ADMIN</option>
            <option value="STAFF">STAFF</option>
            <option value="MANAGER">MANAGER</option>
          </CFormSelect>
        </CModalBody>
        <CModalFooter>
          <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={handleCancelEdit}>
            Cancel
          </CButton>
          <CButton className='custom-btn custom-btn-success' color="success" onClick={handleSave}>
            Save
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
          <p><strong>Username:</strong> {confirmationInfo.username}</p>
          <p><strong>Password:</strong> {confirmationInfo.password}</p>
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
  )
}
export default AccountList
