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

    const dataFromInput = newData.find(row => row.id === editingRow);

    const savedData = {
      discount: dataFromInput.discount || 0,
      name: dataFromInput.name || "String",
      description: dataFromInput.description || "String",
      startDate: convertDateToJavaFormat(dataFromInput.startDate) || "2024-06-17T12:43:43.796Z",
      endDate: convertDateToJavaFormat(dataFromInput.endDate) || "2024-06-17T12:43:43.796Z",
      minimumPrize: dataFromInput.minimumPrize || "String",
      maximumPrize: dataFromInput.maximumPrize || "String",
      status: true
    };

    fetchData(`http://localhost:8080/api/v1/promotions/id/${editingRow}`, 'GET', null, userInfo.accessToken)
      .then((data) => {
        if (data.status === "SUCCESS") {
          fetchData(`http://localhost:8080/api/v1/promotions/id/${editingRow}`, 'PUT', savedData, userInfo.accessToken)
            .then(() => refreshData());
        } else {
          fetchData(`http://localhost:8080/api/v1/promotions`, 'POST', savedData, userInfo.accessToken)
            .then(() => refreshData());
        }
      });

    setData(newData);
    setEditingRow(null);
  };

  const handleAddNew = () => {
    const newId = data.length ? Math.max(...data.map(row => row.id)) + 1 : 1;
    const newRow = {
      id: newId,
      discount: '',
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      minimumPrize: '',
      maximumPrize: '',
      status: true
    };
    setData([...data, newRow]);
    setEditingRow(newId);
    setFormData(newRow);
  };

  const handleDelete = (id) => {
    setVisible(false);
    setData(data.filter((row) => row.id !== id));
    fetchData(`http://localhost:8080/api/v1/promotions/${deleteId}`, 'DELETE', null, userInfo.accessToken)
      .then(() => refreshData());
    setDeleteId(null);
  };

  const refreshData = () => {
    fetchData("http://localhost:8080/api/v1/promotions", 'GET', null, userInfo.accessToken)
      .then(data => {
        console.log(data);
        setData(data.payload);
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
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="discount"
                            value={formData.discount}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.discount
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.name
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormTextarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.description
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.startDate
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.endDate
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="minimumPrize"
                            value={formData.minimumPrize}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.minimumPrize
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="maximumPrize"
                            value={formData.maximumPrize}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.maximumPrize
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
                        <CButton color="danger" onClick={() => {
                          setDeleteId(row.id);
                          setVisible(true);
                        }}>Delete</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
            <CButton className="mt-2" color="success" onClick={handleAddNew}>
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
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={() => handleDelete(deleteId)}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default PromotionList;
