import {
  cilAccountLogout,
  cilMenu,
  cilSettings,
  cilUser,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CRow,
  CCol,
} from '@coreui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserStorage from '../util/UserStorage';

const AppHeader = () => {
  const headerRef = useRef();
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [user, setUser] = useState(UserStorage.getAuthenticatedUser());
  const [link, setLink] = useState('#/admin-dashboard/account-list');

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle(
          'shadow-sm',
          document.documentElement.scrollTop > 0
        );
    });
  }, []);

  useEffect(() => {
    switch (user.roleName.toUpperCase()) {
      case 'STAFF':
        setLink('#/staff-dashboard/invoice');
        break;
      case 'MANAGER':
        setLink('#/manager-dashboard/dashboard');
        break;
    }
  }, [user.roleName]);

  return (
    <CHeader position="sticky" className="mb-4 p-2 bg-light text-dark w-100" ref={headerRef}>
      <CContainer fluid>
        <CRow className="align-items-center justify-content-between w-100" style={{width: "100%!important"}}>
          <CCol xs="auto">
            <CHeaderToggler
              onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
              className="text-dark"
            >
              <CIcon icon={cilMenu} size="lg" />
            </CHeaderToggler>
          </CCol>
          <CCol className="d-none d-md-flex justify-content-center">
            <h5 className="m-0 text-dark">Welcome, {user.username}!</h5>
          </CCol>
          <CCol xs="auto" className="d-flex justify-content-end">
            <CHeaderNav>
              <CDropdown variant="nav-item" placement="bottom-end">
                <CDropdownToggle caret={false} className="text-dark">
                  <CIcon icon={cilSettings} size="lg" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    className="d-flex align-items-center"
                    name="Profile"
                    as={NavLink}
                    to="/settings/general-info"
                  >
                    <CIcon className="me-2" icon={cilUser} size="lg" />
                    Profile
                  </CDropdownItem>
                  <CDropdownItem
                    className="d-flex align-items-center"
                    name="Logout"
                    id="logout"
                    as={NavLink}
                    to="/"
                  >
                    <CIcon className="me-2" icon={cilAccountLogout} size="lg" />
                    Logout
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CHeaderNav>
          </CCol>
        </CRow>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
