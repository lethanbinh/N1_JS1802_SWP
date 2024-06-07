import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from '@coreui/react'
import React, { useState } from 'react'

const BuyOldProduct = () => {
    const [data, setData] = useState([
        { id: 1, code: 'ABC', description: 'J001', name: 'Elegant gold necklace', quantity: 100, price: 100.00, type: 'necklace' },
        { id: 2, code: 'XYZ', description: 'J001', name: 'Elegant gold necklace', quantity: 50, price: 100.00, type: 'necklace' },
        { id: 3, code: 'DEF', description: 'J001', name: 'Elegant gold necklace', quantity: 20, price: 100.00, type: 'necklace' },
    ])

    const [editingRow, setEditingRow] = useState(null)
    const [formData, setFormData] = useState({})

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Buy old Product</strong>
                    </CCardHeader>
                    <CCardBody>
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
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
export default BuyOldProduct