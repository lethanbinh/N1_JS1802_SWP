import React, { useState } from "react"
import moment from "moment-timezone"
import Datetime from "react-datetime"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSelect,
    CRow,
    CInputGroup,
    CInputGroupText
} from '@coreui/react';

const GeneralInfoForm = () => {
    const [birthday, setBirthday] = useState("");

    return (
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Profile</strong>
                </CCardHeader>
            <CCardBody>
                <form>
                    <CRow>
                        <CCol md={6} className="mb-3">
                            <div className="form-group">
                                <label htmlFor="firstName"><strong>First Name</strong></label>
                                <CFormInput required type="text" id="firstName" placeholder="Enter your first name" />
                            </div>
                        </CCol>
                        <CCol md={6} className="mb-3">
                            <div className="form-group">
                                <label htmlFor="lastName"><strong>Last Name</strong></label>
                                <CFormInput required type="text" id="lastName" placeholder="Also your last name" />
                            </div>
                        </CCol>
                    </CRow>
                    <CRow className="align-items-center">
                        <CCol md={6} className="mb-3">
                            <div className="form-group">
                                <label htmlFor="birthday"><strong>Birthday</strong></label>
                                <Datetime
                                    timeFormat={false}
                                    onChange={setBirthday}
                                    renderInput={(props, openCalendar) => (
                                        <CInputGroup>
                                            <CInputGroupText><FontAwesomeIcon icon={faCalendarAlt} /></CInputGroupText>
                                            <CFormInput
                                                required
                                                type="text"
                                                value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""}
                                                placeholder="mm/dd/yyyy"
                                                onFocus={openCalendar}
                                                onChange={() => { }} />
                                        </CInputGroup>
                                    )} />
                            </div>
                        </CCol>
                        <CCol md={6} className="mb-3">
                            <div className="form-group">
                                <label htmlFor="gender"><strong>Gender</strong></label>
                                <CFormSelect id="gender" defaultValue="0">
                                    <option value="0">Gender</option>
                                    <option value="1">Female</option>
                                    <option value="2">Male</option>
                                </CFormSelect>
                            </div>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={6} className="mb-3">
                            <div className="form-group">
                                <label htmlFor="email"><strong>Email</strong></label>
                                <CFormInput required type="email" id="email" placeholder="name@company.com" />
                            </div>
                        </CCol>
                        <CCol md={6} className="mb-3">
                            <div className="form-group">
                                <label htmlFor="phone"><strong>Phone</strong></label>
                                <CFormInput required type="number" id="phone" placeholder="+12-345 678 910" />
                            </div>
                        </CCol>
                    </CRow>
                    <div className="mt-3">
                        <CButton color="primary" type="submit">Save All</CButton>
                    </div>
                </form>
            </CCardBody>
        </CCard>
    );
};
export default GeneralInfoForm