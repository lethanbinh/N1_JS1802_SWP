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
import '../../customStyles.css';
import fetchData from '../../services/ApiConnection';
import UserStorage from '../../services/UserStorage';

const Policy = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({ name: '', detail: '', type: '' });
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());

  const handleEdit = (id) => {
    if (userInfo.roleName.toUpperCase() === 'MANAGER') {
      setEditingRow(id);
      setFormData(data.find((row) => row.id === id));
    } else {
      alert('You do not have permission to edit.');
    }
  };

  const handleInputChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, detail: value });
  };

  const handleSave = async () => {
    console.log('Form Data on Save:', formData);
    const newData = data.map((row) => {
      if (row.id === editingRow && userInfo.roleName.toUpperCase() === 'MANAGER') {
        return { ...row, ...formData };
      }
      return row;
    });

    const dataFromInput = newData.find(row => row.id === editingRow);

    const savedData = {
      name: dataFromInput.name || "string",
      detail: dataFromInput.detail || "string",
      type: dataFromInput.type || "string"
    };

    console.log('Saved Data:', savedData);

    try {
      const getResponse = await fetchData(`http://localhost:8080/api/v1/polices/id/${editingRow}`, 'GET', null, userInfo.accessToken);
      console.log('GET response:', getResponse);

      if (getResponse.status === "SUCCESS") {
        const putResponse = await fetchData(`http://localhost:8080/api/v1/polices/id/${editingRow}`, 'PUT', savedData, userInfo.accessToken);
        console.log('PUT response:', putResponse);
      } else {
        const postResponse = await fetchData(`http://localhost:8080/api/v1/polices`, 'POST', savedData, userInfo.accessToken);
        console.log('POST response:', postResponse);
      }
    } catch (error) {
      console.error('Error saving policy:', error);
    }

    setData(newData);
    setEditingRow(null);

    setTimeout(() => {
      refreshData();
    }, 1000);
  };

  const refreshData = () => {
    fetchData("http://localhost:8080/api/v1/polices", 'GET', null, userInfo.accessToken)
      .then(data => {
        console.log('Refreshed data:', data);
        setData(data.payload);
      })
      .catch(error => {
        console.error('Error refreshing data:', error);
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
            <strong>Policy Management</strong>
          </CCardHeader>
          <CCardBody>
            <div style={{ height: '80vh', overflow: 'auto' }}>
              {data.map((row, index) => (
                <React.Fragment key={row.id}>
                  {index > 0 && <hr />} {/* Add a horizontal rule between sections */}
                  <div className="mb-3">
                    {editingRow === row.id ? (
                      <div>
                        <CButton className='custom-btn mb-4' color="success" onClick={handleSave}>Save</CButton>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          className="form-control mb-2"
                          onChange={(e) => handleInputChange(e.target.value, 'name')}
                          style={{ border: '1px solid #adb5bd' }}
                        />
                        <ReactQuill
                          value={formData.detail}
                          onChange={handleQuillChange}
                          className="mb-2"
                          style={{ border: '1px solid #adb5bd' }}
                        />
                        <select
                          name="type"
                          value={formData.type}
                          className="form-control mb-2"
                          onChange={(e) => handleInputChange(e.target.value, 'type')}
                          style={{ border: '1px solid #adb5bd' }}
                        >
                          <option value="EXCHANGE_AND_RETURN">EXCHANGE_AND_RETURN</option>
                          <option value="WARRANTY">WARRANTY</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        {userInfo.roleName.toUpperCase() === 'MANAGER' &&
                          <CButton color="primary" className='custom-btn mb-4' onClick={() => handleEdit(row.id)}>Edit</CButton>
                        }
                        <h5>{row.name}</h5>
                        <div dangerouslySetInnerHTML={{ __html: row.detail }} />
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Policy;
