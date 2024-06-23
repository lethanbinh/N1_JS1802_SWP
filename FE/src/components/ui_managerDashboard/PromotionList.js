import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
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

const PromotionList = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
  const [visible, setVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);

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

    if (emptyFields.length > 0) {
      setErrorMessage(`Please fill all the fields: ${emptyFields.join(', ')}`);
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

    let newData;
    if (isNew) {
      const newId = data.length ? Math.max(...data.map(row => row.id)) + 1 : 1;
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

    const dataFromInput = newData.find(row => row.id === (isNew ? newData.length : editingRow));

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

    const savePromise = isNew
      ? fetchData(`http://localhost:8080/api/v1/promotions`, 'POST', savedData, userInfo.accessToken)
      : fetchData(`http://localhost:8080/api/v1/promotions/id/${editingRow}`, 'PUT', savedData, userInfo.accessToken);

    savePromise.then(() => {
      refreshData();
      setEditingRow(null);
      setEditModalVisible(false);
      setIsNew(false);
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
      .then(() => refreshData());
    setDeleteId(null);
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setFormData({});
  }

  const refreshData = () => {
    fetchData("http://localhost:8080/api/v1/promotions", 'GET', null, userInfo.accessToken)
      .then(data => {
        setData(data.payload);
      });
  };

  const handleCloseErrorModal = () => {
    setErrorModalVisible(false);
    setErrorMessage("");
  }

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Promotion List</strong>
          </CCardHeader>
          <CCardBody>
            <div style={{ height: '500px', overflow: 'auto' }}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Discount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Minimum Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Maximum Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.filter(row => row.status).map((row) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                      <CTableDataCell>{row.discount}</CTableDataCell>
                      <CTableDataCell>{row.name}</CTableDataCell>
                      <CTableDataCell>{row.description}</CTableDataCell>
                      <CTableDataCell>{row.startDate}</CTableDataCell>
                      <CTableDataCell>{row.endDate}</CTableDataCell>
                      <CTableDataCell>{row.minimumPrize}</CTableDataCell>
                      <CTableDataCell>{row.maximumPrize}</CTableDataCell>
                      <CTableDataCell>
                        <CButton className='custom-btn custom-btn-info' color="info" onClick={() => handleEdit(row.id)}>
                          Edit
                        </CButton>
                        <CButton className='custom-btn custom-btn-danger' color="danger" onClick={() => {
                          setDeleteId(row.id);
                          setVisible(true);
                        }}>Delete</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
            <CButton className='custom-btn custom-btn-success mt-2' color="success" onClick={handleAddNew}>
              Add Promotion
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
          <p>Are you sure you want to delete this promotion?</p>
        </CModalBody>
        <CModalFooter>
          <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={() => setVisible(false)}>
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
          <CModalTitle id="EditModalLabel">{isNew ? "Add Promotion" : "Edit Promotion"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            name="discount"
            label="Discount"
            value={formData.discount}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormInput
            type="text"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormTextarea
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormInput
            type="date"
            name="startDate"
            label="Start Date"
            value={formData.startDate}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormInput
            type="date"
            name="endDate"
            label="End Date"
            value={formData.endDate}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormInput
            type="text"
            name="minimumPrize"
            label="Minimum Price"
            value={formData.minimumPrize}
            onChange={handleInputChange}
            className="mb-3"
          />
          <CFormInput
            type="text"
            name="maximumPrize"
            label="Maximum Price"
            value={formData.maximumPrize}
            onChange={handleInputChange}
            className="mb-3"
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCancelEdit}>
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
    </CRow>
  );
};

export default PromotionList;
