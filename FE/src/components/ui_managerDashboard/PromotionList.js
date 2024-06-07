import {
  CButton,
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
  CTableRow,
} from '@coreui/react'
import React from 'react'

const PromotionList = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Promotion List</strong>
          </CCardHeader>
          <CCardBody>
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
                <CTableRow>
                  <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  <CTableDataCell>Mark</CTableDataCell>
                  <CTableDataCell>Otto</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell className='mt-1'>
                    <CButton className='mr-1' color="info">Edit</CButton>
                    <CButton className='mx-1' color="danger">Delete</CButton>
                  <CTableDataCell className="mt-1">
                    <CButton className="mr-1" color="info">
                      Edit
                    </CButton>
                    <CButton className="mx-1" color="danger">
                      Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">2</CTableHeaderCell>
                  <CTableDataCell>Mark</CTableDataCell>
                  <CTableDataCell>Otto</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell className='mt-1'>
                    <CButton className='mr-1' color="info">Edit</CButton>
                    <CButton className='mx-1' color="danger">Delete</CButton>
                  <CTableDataCell className="mt-1">
                    <CButton className="mr-1" color="info">
                      Edit
                    </CButton>
                    <CButton className="mx-1" color="danger">
                      Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">3</CTableHeaderCell>
                  <CTableDataCell>Mark</CTableDataCell>
                  <CTableDataCell>Otto</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell className='mt-1'>
                    <CButton className='mr-1' color="info">Edit</CButton>
                    <CButton className='mx-1' color="danger">Delete</CButton>
                  <CTableDataCell className="mt-1">
                    <CButton className="mr-1" color="info">
                      Edit
                    </CButton>
                    <CButton className="mx-1" color="danger">
                      Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
            <CButton className='mt-2' color="success">Add Promotion</CButton>
            <CButton className="mt-2" color="success">
              Add Promotion
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default PromotionList
