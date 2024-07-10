import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react';

import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../customStyles.css';
import fetchData from '../../util/ApiConnection';
import convertDateToJavaFormat from '../../util/DateConvert';
import UserStorage from '../../util/UserStorage';

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
      setErrorMessage("Enddate must be greater than today. Please choose another date.");
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
      const newId = data.length ? Math.max(...data.map(row => row.id)) + 1 : 1;
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
    <CRow>
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
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Promotion List</strong>
          </CCardHeader>
          <CCardBody>
            <div style={{ height: '65vh', overflow: 'auto' }}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Discount (%)</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Minimum Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Maximum Price</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.filter(row => row.status).map((row) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                      <CTableDataCell>{row.discount * 100}</CTableDataCell>
                      <CTableDataCell>{row.name}</CTableDataCell>
                      <CTableDataCell>{row.description}</CTableDataCell>
                      <CTableDataCell>{row.startDate}</CTableDataCell>
                      <CTableDataCell>{row.endDate}</CTableDataCell>
                      <CTableDataCell>{formatPrice(row.minimumPrize)}</CTableDataCell>
                      <CTableDataCell>{formatPrice(row.maximumPrize)}</CTableDataCell>
                      <CTableDataCell>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default PromotionList;
