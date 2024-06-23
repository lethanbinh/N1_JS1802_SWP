import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom';
import fetchData from '../../util/ApiConnection';
import '../../customStyles.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();

    fetchData(`http://localhost:8080/api/v1/auth/send-recover/${email}`)
      .then(data => {
        if (data.status === 'ERROR') {
          setEmailError("Email has not been registered or invalid");
          setEmailMessage("");
        } else {
          setEmailMessage("An email reset password was sent. Please check your email!!!");
          setEmailError("");
        }
      })

  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleForgotPassword}>
                  <h1>Forgot Password</h1>
                  <p className="text-body-secondary">Type your email</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton className='custom-btn custom-btn-success' color="success" type="submit">Send Email</CButton>
                  </div>

                  <div style={{ color: 'red' }} className='email-error'>{emailError}</div>
                  <div style={{ color: 'green' }} className='email-meessage'>{emailMessage}</div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ForgotPassword
