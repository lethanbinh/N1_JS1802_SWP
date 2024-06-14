import React, { Suspense, useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/login/Login'))
const ForgotPassword = React.lazy(() => import('./views/resetPassword/ForgotPassword'))
const CreateNewPassword = React.lazy(() => import('./views/resetPassword/CreateNewPassword'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (!isColorModeSet()) {
      setColorMode(storedTheme)
    }
  }, [storedTheme, isColorModeSet, setColorMode]) // Add dependencies to ensure proper updates

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" name="Login" element={<Login />} />
          <Route path="/forgot-password" name="Forgot Password" element={<ForgotPassword />} />
          <Route path="/create-new-password" name="Create New Password" element={<CreateNewPassword />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
