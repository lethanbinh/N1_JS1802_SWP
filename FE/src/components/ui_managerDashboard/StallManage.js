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
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import fetchData from '../../util/ApiConnection'
import UserStorage from '../../util/UserStorage'

const Stall = () => {
  const [data, setData] = useState([])

  const [editingRow, setEditingRow] = useState(null)
  const [formData, setFormData] = useState({})
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser())

  const handleEdit = (id) => {
    setEditingRow(id)
    setFormData(data.find((row) => row.id === id))
  }

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSave = () => {
    const newData = data.map((row) => {
      if (row.id === editingRow) {
        return { ...row, ...formData }
      }
      return row
    })

    const dataFromInput = newData[editingRow - 1]

    const savedData = {
      code: dataFromInput.code || "string",
      name: dataFromInput.name || "string",
      description: dataFromInput.description || "string",
      type: dataFromInput.type || "string",
      status: true
    };

    console.log(savedData)
    fetchData(`http://localhost:8080/api/v1/stalls/id/${editingRow}`, 'GET', null, userInfo.accessToken)
      .then((data) => {
        if (data.status === "SUCCESS") {
          fetchData(`http://localhost:8080/api/v1/stalls/id/${editingRow}`, 'PUT', savedData, userInfo.accessToken)
        } else {
          fetchData(`http://localhost:8080/api/v1/stalls`, 'POST', savedData, userInfo.accessToken)
        }
      })

    setData(newData)
    setEditingRow(null)

    setTimeout(() => {
      refreshData()
    }, 1000)
  }
  const handleAddNew = () => {
    const newRow = {
      id: data.length + 1,
      code: '',
      name: '',
      description: '',
      type: '',
    }
    setData([...data, newRow])
    setEditingRow(newRow.id)
  }

  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    fetchData("http://localhost:8080/api/v1/stalls", 'GET', null, userInfo.accessToken)
      .then(data => {
        setData(data.payload)
      })
  }

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
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.code
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {editingRow === row.id ? (
                          <CFormInput
                            type="text"
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
                          <CFormInput
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                          />
                        ) : (
                          row.type
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
                          <CButton color="success" onClick={handleSave}>
                            Save
                          </CButton>
                        ) : (
                          <CButton color="info" onClick={() => handleEdit(row.id)}>
                            Update
                          </CButton>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
            <CButton color="success" className="mt-1" onClick={handleAddNew}>
              Add New Stall
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default Stall
