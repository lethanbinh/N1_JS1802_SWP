import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboard from './Components/ui-private/AdminDashboard';
import ManagerDashboard from './Components/ui-private/ManagerDashboard';
import StaffDashboard from './Components/ui-private/StaffDashboard';
import CreateNewPasswordPage from './Components/ui-public/CreateNewPasswordPage';
import ForgotPasswordPage from './Components/ui-public/ForgotPasswordPage';
import HomePage from './Components/ui-public/HomePage';
import LoginPage from './Components/ui-public/LoginPage';
import NavBar from './Components/ui-public/NavBar';
import SideBar from './Components/ui-public/SideBar';
import StaffList from './Components/ui-public/StaffList';
import { getUserRole, isAuthenticated } from './Components/utils/auth';

const AppRoutes = () => {
  const userRole = getUserRole();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated() ? <Navigate to="/home" /> : <LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/create-new-password" element={<CreateNewPasswordPage />} />
      <Route path="/manager-dashboard/view-staff-list" element={<StaffList />} />
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/home"
        element={
          isAuthenticated() ? (
            <div>
              <NavBar />
              <HomePage />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          isAuthenticated() && userRole === 'admin' ? (
            <div>
              <NavBar />
              <SideBar />
              <AdminDashboard />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/manager-dashboard"
        element={
          isAuthenticated() && userRole === 'manager' ? (
            <div>
              <NavBar />
              <SideBar />
              <ManagerDashboard />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/staff-dashboard"
        element={
          isAuthenticated() && userRole === 'staff' ? (
            <div>
              <NavBar />
              <SideBar />
              <StaffDashboard />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
