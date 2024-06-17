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
} from '@coreui/react';

import React, { useEffect, useState } from 'react';
import fetchData from '../../util/ApiConnection';
import UserStorage from '../../util/UserStorage';

const PromotionList = () => {
  const [data, setData] = useState([]);

  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser())

  const handleEdit = (id) => {
    setEditingRow(id);
    setFormData(data.find((row) => row.id === id));
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
      discount: '',
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      minimumPrize: '',
      maximumPrize: '',
    };
    setData([...data, newRow]);
    setEditingRow(newRow.id);
  };

  const handleDelete = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  const refreshData = () => {
    fetchData("http://localhost:8080/api/v1/promotions", 'GET', null, userInfo.accessToken)
      .then(data => {
        setData(data.payload)
      })
  }

  useEffect(() => {
    refreshData();
  }, [])

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
                  {data.map((row) => (
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
                        <CButton className="mx-1" color="danger" onClick={() => handleDelete(row.id)}>
                          Delete
                        </CButton>
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
    </CRow>
  );
};

export default PromotionList;
