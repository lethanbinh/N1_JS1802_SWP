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
  CTableRow
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import fetchData from '../../util/ApiConnection';
import UserStorage from '../../util/UserStorage';

const Stall = () => {
  const [data, setData] = useState([]);

  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
  const [errorMessage, setErrorMessage] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const handleEdit = (id) => {
    setEditingRow(id);
    setFormData(data.find((row) => row.id === id));
    setErrorMessage('');
    setEditModalVisible(true);
    setIsNew(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const requiredFields = ['code', 'name', 'description', 'type'];
    const emptyFields = requiredFields.filter(field => !formData[field]);

    if (emptyFields.length > 0) {
      setErrorMessage(`Please fill all the fields: ${emptyFields.join(', ')}`);
      setErrorModalVisible(true);
      return;
    }

    const codePattern = /^ST\d{4}$/;
    if (!codePattern.test(formData.code)) {
      setErrorMessage('Code must be in the format STxxxx (where x is a number).');
      setErrorModalVisible(true);
      return;
    }
    const duplicateCode = data.some(row => row.code === formData.code && row.id !== editingRow)
    if (duplicateCode) {
      setErrorMessage("Code already exists. Please use a unique code.")
      setErrorModalVisible(true)
      return
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
      code: dataFromInput.code || 'string',
      name: dataFromInput.name || 'string',
      description: dataFromInput.description || 'string',
      type: dataFromInput.type || 'string',
      status: true,
    };

    console.log(savedData);
    fetchData(`http://localhost:8080/api/v1/stalls/id/${editingRow}`, 'GET', null, userInfo.accessToken)
      .then((data) => {
        if (data.status === 'SUCCESS') {
          fetchData(`http://localhost:8080/api/v1/stalls/id/${editingRow}`, 'PUT', savedData, userInfo.accessToken);
        } else {
          fetchData(`http://localhost:8080/api/v1/stalls`, 'POST', savedData, userInfo.accessToken);
        }
      });

    setData(newData);
    setEditingRow(null);
    setEditModalVisible(false);
    setIsNew(false);

    setTimeout(() => {
      refreshData();
    }, 1000);
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setFormData({});
  };

  const handleAddNew = () => {
    setFormData({
      id: '',
      code: '',
      name: '',
      description: '',
      type: '',
      status: true,
    });
    setErrorMessage('');
    setEditModalVisible(true);
    setIsNew(true);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    fetchData('http://localhost:8080/api/v1/stalls', 'GET', null, userInfo.accessToken)
      .then(data => {
        setData(data.payload);
      });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Stall List</strong>
          </CCardHeader>
          <CCardBody>
            <div style={{ height: '500px', overflow: 'auto' }}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((row) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row">{row.id}</CTableHeaderCell>
                      <CTableDataCell>{row.code}</CTableDataCell>
                      <CTableDataCell>{row.name}</CTableDataCell>
                      <CTableDataCell>{row.type}</CTableDataCell>
                      <CTableDataCell>{row.description}</CTableDataCell>
                      <CTableDataCell>
                        <CButton style={{ marginRight: '5px' }} color="info" onClick={() => handleEdit(row.id)}>
                          Update
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
            <CButton className='custom-btn custom-btn-success mt-1' color="success" onClick={handleAddNew}>
              Add New Stall
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
        aria-labelledby="ErrorModalLabel"
      >
        <CModalHeader>
          <CModalTitle id="ErrorModalLabel">Input Information Error</CModalTitle>
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
        aria-labelledby="EditModalLabel"
        size="lg"
      >
        <CModalHeader>
          <CModalTitle id="EditModalLabel">{isNew ? 'Add Stall' : 'Update Stall'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            name="code"
            label="Code"
            value={formData.code}
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
          <CFormSelect
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="mb-3"
            label="Type">
            <option value="SELL">SELL</option>
            <option value="PURCHASE">PURCHASE</option>
          </CFormSelect>

          <CFormTextarea
            name="description"
            label="Description"
            value={formData.description}
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
    </CRow>
  )
}
export default Stall;
