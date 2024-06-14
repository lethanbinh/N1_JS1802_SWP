import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const userRole = authenticateUser(username, password);
    if (userRole) {
      // Save user information to localStorage
      localStorage.setItem('username', username);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('isAuthenticated', true);

      // Redirect user to the home page
      redirectToHomePage(userRole);
    } else {
      // Handle login failure
      console.log('Invalid credentials');
      setErrors({ general: 'Invalid credentials' });
    }
  };

  const validateInputs = () => {
    const errors = {};

    // Username validations
    if (!username) {
      errors.username = 'Username is required (T1)';
    } else {
      if (/[^a-zA-Z0-9]/.test(username)) {
        errors.username = 'Special characters are not allowed (T2)';
      }
      if (!/^[a-zA-Z0-9]/.test(username)) {
        errors.username = 'First character cannot be a space (T3.1)';
      }
    }

    // Password validations
    if (!password) {
      errors.password = 'Password is required (T4)';
    } else {
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.password = 'Password must contain at least one special character (T5)';
      }
      if (!/\d/.test(password)) {
        errors.password = 'Password must contain at least one number (T6)';
      }
      if (!/[A-Z]/.test(password)) {
        errors.password = 'Password must contain at least one uppercase letter (T7)';
      }
      if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters long (T8)';
      }
      if (password.startsWith(' ')) {
        errors.password = 'First character cannot be a space (T9)';
      }
    }

    return errors;
  };

  const authenticateUser = (username, password) => {
    // Perform authentication and determine the user's role based on login information
    // In this case, we will simply check if the username and password match the predefined values
    if (username === 'Binh1234' && password === 'Binh123@') {
      return 'admin';
    }
    if (username === 'Binh12345' && password === 'Binh123@') {
      return 'manager';
    }
    if (username === 'Binh123456' && password === 'Binh123@') {
      return 'staff';
    }
    // If no matching role, return null or another default value
    return null;
  };

  const redirectToHomePage = (userRole) => {
    switch (userRole) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'manager':
        navigate('/manager-dashboard');
        break;
      case 'staff':
        navigate('/staff-dashboard');
        break;
      default:
        navigate('/login');
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    {errors.general && <p className="text-danger">{errors.general}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        invalid={!!errors.username}
                      />
                      {errors.username && <p className="text-danger">{errors.username}</p>}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        invalid={!!errors.password}
                      />
                      {errors.password && <p className="text-danger">{errors.password}</p>}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/forgot-password" className="px-0" style={{ textDecoration: 'none', color: 'inherit' }}>
                          Forgot password?
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;