import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdownHeader,
  CFormInput,
  CFormTextarea,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react'
import React, { useState } from 'react'

const StallProduct = () => {
    const [data, setData] = useState([
        { id: 1, code: 'ABC', description: 'J001', name: 'Elegant gold necklace', quantity: 100, price: 100.00, type: 'necklace' },
        { id: 2, code: 'XYZ', description: 'J001', name: 'Elegant gold necklace', quantity: 50, price: 100.00, type: 'necklace' },
        { id: 3, code: 'DEF', description: 'J001', name: 'Elegant gold necklace', quantity: 20, price: 100.00, type: 'necklace' },
    ])

    const [editingRow, setEditingRow] = useState(null)
    const [formData, setFormData] = useState({})

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
        setData(newData)
        setEditingRow(null)
    }
    const handleAddNew = () => {
        const newRow = {
            id: data.length + 1,
            code: '',
            name: '',
            description: '',
            status: '',
            type: '',
        }
        setData([...data, newRow])
        setEditingRow(newRow.id)
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <CDropdownHeader><strong>Stall...</strong></CDropdownHeader>
                    </CCardHeader>
                    <CCardBody>
                    <div style={{ height: '500px', overflow: 'auto' }}>
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Type</CTableHeaderCell>
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
                                                <CFormTextarea
                                                    name="description"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                row.description
                                            )}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {editingRow === row.id ? (
                                                <CFormInput
                                                    type="text"
                                                    name="quantity"
                                                    value={formData.quantity}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                row.quantity
                                            )}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {editingRow === row.id ? (
                                                <CFormInput
                                                    type="text"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                row.price
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
                                                <CButton color="success" onClick={handleSave}>
                                                    Save
                                                </CButton>
                                            ) : (
                                                <CButton color="info" onClick={() => handleEdit(row.id)}>
                                                    Edit
                                                </CButton>
                                            )}
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
    )
}
export default StallProduct
