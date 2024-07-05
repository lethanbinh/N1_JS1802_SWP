import { CSpinner } from '@coreui/react'
import React, { Suspense } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/login/Login'))
const ForgotPassword = React.lazy(() => import('./views/resetPassword/ForgotPassword'))
const CreateNewPassword = React.lazy(() => import('./views/resetPassword/CreateNewPassword'))

const App = () => {
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
