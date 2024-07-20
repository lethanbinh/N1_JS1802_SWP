import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormLabel,
  CInputGroup,
  CFormInput,
  CInputGroupText,
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
  CTableRow,
} from '@coreui/react';

import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../customStyles.css';
import fetchData from '../../util/ApiConnection';
import convertDateToJavaFormat from '../../util/DateConvert';
import UserStorage from '../../util/UserStorage';
import CIcon from '@coreui/icons-react';
import { cilPen, cilDelete } from '@coreui/icons';

const PromotionList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
  const [visible, setVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);
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

  const handleSave = () => {
    const requiredFields = ['discount', 'name', 'description', 'startDate', 'endDate', 'minimumPrize', 'maximumPrize'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    const today = new Date();

    if (new Date(formData.endDate) < today) {
      setErrorMessage("End date must be greater than today. Please choose another date.");
      setErrorModalVisible(true);
      return;
    }

    if (emptyFields.length > 0) {
      setErrorMessage(`Please fill all the fields: ${emptyFields.join(', ')}`);
      setErrorModalVisible(true);
      return;
    }

    if (parseFloat(formData.discount) <= 0 || parseFloat(formData.discount) >= 100) {
      setErrorMessage('Discount must be between 0 and 100.');
      setErrorModalVisible(true);
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setErrorMessage('Start date cannot be greater than end date.');
      setErrorModalVisible(true);
      return;
    }

    if (parseFloat(formData.minimumPrize) > parseFloat(formData.maximumPrize)) {
      setErrorMessage('Minimum price cannot be greater than maximum price.');
      setErrorModalVisible(true);
      return;
    }

    if (parseFloat(formData.minimumPrize) < 1 || parseFloat(formData.maximumPrize) < 1) {
      setErrorMessage('Minimum and maximum price must be greater than 0.');
      setErrorModalVisible(true);
      return;
    }

    let newData;
    if (isNew) {
      const newId = 0;
      const newRow = { ...formData, id: newId, status: true, discount: parseFloat(formData.discount) / 100 };
      newData = [...data, newRow];
    } else {
      newData = data.map((row) => {
        if (row.id === editingRow) {
          return { ...row, ...formData, discount: parseFloat(formData.discount) / 100 };
        }
        return row;
      });
    }

    const dataFromInput = newData.find(row => row.id === (isNew ? 0 : editingRow));

    const savedData = {
      discount: dataFromInput.discount,
      name: dataFromInput.name,
      description: dataFromInput.description,
      startDate: convertDateToJavaFormat(dataFromInput.startDate),
      endDate: convertDateToJavaFormat(dataFromInput.endDate),
      minimumPrize: dataFromInput.minimumPrize,
      maximumPrize: dataFromInput.maximumPrize,
      status: true
    };

    console.log(savedData)

    const savePromise = isNew
      ? fetchData(`http://localhost:8080/api/v1/promotions`, 'POST', savedData, userInfo.accessToken)
      : fetchData(`http://localhost:8080/api/v1/promotions/id/${editingRow}`, 'PUT', savedData, userInfo.accessToken);

    savePromise.then(() => {
      refreshData();
      setEditingRow(null);
      setEditModalVisible(false);
      setIsNew(false);
      setSuccessModalVisible(true); // Show success modal
    });
  };

  const handleAddNew = () => {
    setFormData({
      id: '',
      discount: '',
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      minimumPrize: '',
      maximumPrize: '',
      status: true,
    });
    setEditModalVisible(true);
    setIsNew(true);
  };

  const handleDelete = (id) => {
    setVisible(false);
    fetchData(`http://localhost:8080/api/v1/promotions/${deleteId}`, 'DELETE', null, userInfo.accessToken)
      .then(() => {
        refreshData();
        setDeleteSuccessModalVisible(true); // Show delete success modal
      });
    setDeleteId(null);
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setFormData({});
  }

  const refreshData = () => {
    fetchData("http://localhost:8080/api/v1/promotions", 'GET', null, userInfo.accessToken)
      .then(data => {
        data.payload.forEach(element => {
          element.discount *= 100
        });
        setData(data.payload);
        applyFilters(data.payload);
      });
  };

  const handleStartDateChange = (date) => {
    setStartDateFilter(date);
    applyFilters(data, date, endDateFilter);
  };

  const handleEndDateChange = (date) => {
    setEndDateFilter(date);
    applyFilters(data, startDateFilter, date);
  };

  const applyFilters = (data, startDate = startDateFilter, endDate = endDateFilter) => {
    let filtered = data;
    if (startDate) {
      filtered = filtered.filter(row => new Date(row.startDate) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter(row => new Date(row.endDate) <= new Date(endDate));
    }
    setFilteredData(filtered);
  };

  const handleCloseErrorModal = () => {
    setErrorModalVisible(false);
    setErrorMessage("");
  }

  useEffect(() => {
    refreshData();
  }, []);

  const formatPrice = (price) => {
    return `${price.toLocaleString('en-US')} VND`;
  };

  return (
    <CRow className="m-0">
      <div className="d-flex justify-content-between mb-4" style={{ alignItems: 'center' }}>
        <div style={{ width: "50%", display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '10px' }}>Start Date: </label>
          <DatePicker
            selected={startDateFilter}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM-dd"
            className="form-control"
          />
        </div>
        <div style={{ width: "50%", display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '10px' }}>End Date: </label>
          <DatePicker
            selected={endDateFilter}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
            className="form-control"
          />
        </div>
      </div>
      <CCol xs={12}>
        <CCard className="mb-4 border-0 shadow-sm">
          <CCardHeader className="bg-light text-dark d-flex justify-content-between align-items-center">
            <strong>Promotion List</strong>
            <CButton color="primary" onClick={handleAddNew}>
              + Add Promotion
            </CButton>
          </CCardHeader>
          <CCardBody>
            <div style={{ height: '65vh', overflowY: 'auto' }}>
              <CTable hover responsive bordered className="shadow-sm table-border-dark" style={{ border: '1px solid #adb5bd' }}>
                <CTableHead className="bg-light text-dark">
                  <CTableRow>
                    <CTableHeaderCell scope="col" style={{ minWidth: "60px" }}>ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ minWidth: "100px" }}>Discount (%)</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ minWidth: "120px" }}>Start Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ minWidth: "120px" }}>End Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ minWidth: "160px" }}>Minimum Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ minWidth: "160px" }}>Maximum Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell style={{ minWidth: "100px" }} scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.filter(row => row.status).map((row) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                      <CTableDataCell>{row.discount}</CTableDataCell>
                      <CTableDataCell>{row.name}</CTableDataCell>
                      <CTableDataCell>{row.description}</CTableDataCell>
                      <CTableDataCell>{row.startDate}</CTableDataCell>
                      <CTableDataCell>{row.endDate}</CTableDataCell>
                      <CTableDataCell>{formatPrice(row.minimumPrize)}</CTableDataCell>
                      <CTableDataCell>{formatPrice(row.maximumPrize)}</CTableDataCell>
                      <CTableDataCell></CTableDataCell>
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
        backdrop={true}
        aria-labelledby="DeleteConfirmationModalLabel"
      >
        <CModalHeader className="bg-danger text-white">
          <CModalTitle id="DeleteConfirmationModalLabel">Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to delete this promotion?</p>
        </CModalBody>
        <CModalFooter>
          <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton className='custom-btn custom-btn-danger' color="danger" onClick={() => handleDelete(deleteId)} style={{ color: "white" }}>
            Delete
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
          <CModalTitle id="EditModalLabel">{isNew ? "Add Promotion" : "Edit Promotion"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="number"
            name="discount"
            label="Discount (%)"
            value={formData.discount}
            onChange={handleInputChange}
            className="mb-3"
            style={{ border: '1px solid #adb5bd' }}
          />
          <CFormInput
            type="text"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="mb-3"
            style={{ border: '1px solid #adb5bd' }}
          />
          <CFormTextarea
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="mb-3"
            style={{ border: '1px solid #adb5bd' }}
          />
          <CFormInput
            type="date"
            name="startDate"
            label="Start Date"
            value={formData.startDate}
            onChange={handleInputChange}
            className="mb-3"
            style={{ border: '1px solid #adb5bd' }}
          />
          <CFormInput
            type="date"
            name="endDate"
            label="End Date"
            value={formData.endDate}
            onChange={handleInputChange}
            className="mb-3"
            style={{ border: '1px solid #adb5bd' }}
          />
          <div className="mb-3">
            <CFormLabel htmlFor="minimumPrize">Minimum Price</CFormLabel>
            <CInputGroup>
              <CFormInput
                id="minimumPrize"
                type="number"
                name="minimumPrize"
                value={formData.minimumPrize}
                onChange={handleInputChange}
                style={{ border: '1px solid #adb5bd' }}
              />
              <CInputGroupText>VND</CInputGroupText>
            </CInputGroup>
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="maximumPrize">Maximum Price</CFormLabel>
            <CInputGroup>
              <CFormInput
                id="maximumPrize"
                type="number"
                name="maximumPrize"
                value={formData.maximumPrize}
                onChange={handleInputChange}
                style={{ border: '1px solid #adb5bd' }}
              />
              <CInputGroupText>VND</CInputGroupText>
            </CInputGroup>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={handleCancelEdit}>
            Cancel
          </CButton>
          <CButton className='custom-btn custom-btn-success' color="primary" onClick={handleSave}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={errorModalVisible}
        onClose={handleCloseErrorModal}
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
          <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={handleCloseErrorModal}>
            Close
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
          <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={() => setSuccessModalVisible(false)}>
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
          <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={() => setDeleteSuccessModalVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default PromotionList;
