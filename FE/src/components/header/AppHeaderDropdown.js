import {
  CDropdown
} from '@coreui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const AppHeaderDropdown = () => {
  const navigate = useNavigate();

  return (
    <CDropdown variant="nav-item">
      {/* <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle> */}
      {/* <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Settings</CDropdownHeader>
        <CDropdownItem onClick={() => navigate('/general-info')}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="/">
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu> */}
    </CDropdown>
  )
}

export default AppHeaderDropdown
