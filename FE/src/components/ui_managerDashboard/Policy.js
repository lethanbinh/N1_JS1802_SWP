import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import fetchData from '../../util/ApiConnection';
import UserStorage from '../../util/UserStorage';

const Policy = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({ name: '', detail: '', type: '' });
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());

  const handleEdit = async (id) => {
    setEditingRow(id);
    await fetchPolicyById(id);
  };

  const handleInputChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    console.log('Form Data on Save:', formData);
    const newData = data.map((row) => {
      if (row.id === editingRow) {
        return { ...row, ...formData };
      }
      return row;
    });
    const dataFromInput = newData[editingRow - 1];
    const savedData = {
      name: dataFromInput.name || "string",
      detail: dataFromInput.detail || "string",
      type: dataFromInput.type || "string"
    };

    const updatedData = {
      name: dataFromInput.name || "string",
      detail: dataFromInput.detail || "string",
      type: dataFromInput.type || "string"
    };
    console.log('Saved Data:', savedData);

    fetchData(`http://localhost:8080/api/v1/polices/id/${editingRow}`, 'GET', null, userInfo.accessToken)
      .then((data) => {
        if (data.status === "SUCCESS") {
          fetchData(`http://localhost:8080/api/v1/polices/id/${editingRow}`, 'PUT', updatedData, userInfo.accessToken);
        } else {
          fetchData(`http://localhost:8080/api/v1/polices`, 'POST', savedData, userInfo.accessToken);
        }
      });

    setData(newData);
    setEditingRow(null);

    setTimeout(() => {
      refreshData();
    }, 1000);
  };

  const fetchPolicyById = async (id) => {
    try {
      const policy = await fetchData(`http://localhost:8080/api/v1/polices/id/${id}`, 'GET', null, userInfo.accessToken);
      console.log('Fetched Policy:', policy);
      setFormData({
        name: policy.name,
        detail: policy.detail,
        type: policy.type
      });
    } catch (error) {
      console.error('Error fetching policy:', error);
    }
  };

  const refreshData = () => {
    fetchData("http://localhost:8080/api/v1/polices", 'GET', null, userInfo.accessToken)
      .then(data => {
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
            <strong>Return & Exchange Policy</strong>
          </CCardHeader>
          <CCardBody>
            <div style={{ height: '500px', overflow: 'auto' }}>
              {data.map((row) => (
                <div key={row.id} className="mb-3">
                  {editingRow === row.id ? (
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        className="form-control mb-2"
                        onChange={(e) => handleInputChange(e.target.value, 'name')}
                      />
                      <ReactQuill
                        value={formData.detail}
                        onChange={(value) => handleInputChange(value, 'detail')}
                        className="mb-2"
                      />
                      <select
                        name="type"
                        value={formData.type}
                        className="form-control mb-2"
                        onChange={(e) => handleInputChange(e.target.value, 'type')}
                      >
                        <option value="EXCHANGE_AND_RETURN">EXCHANGE_AND_RETURN</option>
                        <option value="WARRANTY">WARRANTY</option>
                      </select>
                      <CButton color="primary" onClick={handleSave}>Save</CButton>
                    </div>
                  ) : (
                    <div>
                      <h5>{row.name}</h5>
                      <div dangerouslySetInnerHTML={{ __html: row.detail }} />
                      <CButton color="secondary" className="mt-2" onClick={() => handleEdit(row.id)}>Edit</CButton>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Policy;
