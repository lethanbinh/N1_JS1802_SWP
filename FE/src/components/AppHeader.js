import { cilAccountLogout, cilContrast, cilMenu, cilMoon, cilSettings, cilSun, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  useColorModes,
} from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import UserStorage from '../util/UserStorage'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')


  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [user, setUser] = useState(UserStorage.getAuthenticatedUser())
  const [link, setLink] = useState('#/admin-dashboard/account-list')

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  useEffect(() => {
    setColorMode('light')
  }, [setColorMode])

  useEffect(() => {
    switch (user.roleName.toUpperCase()) {
      case "STAFF":
        setLink('#/staff-dashboard/invoice')
        break;
      case "MANAGER":
        setLink('#/manager-dashboard/dashboard')
        break;
    }
  }, [user.roleName])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CBreadcrumb className="my-0">
            <CBreadcrumbItem href={link} className="breadcrumb-home-link">Home</CBreadcrumbItem>

          </CBreadcrumb>
        </CHeaderNav>
        <CHeaderNav className="ms-auto"></CHeaderNav>
        <CHeaderNav>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              <CIcon icon={cilSettings} size="lg" />
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                className="d-flex align-items-center"
                name='Profile'
                as={NavLink}
                to="/settings/general-info"
              ><CIcon className="me-2" icon={cilUser} size="lg" />
                Profile
              </CDropdownItem>
              <CDropdownItem
                className="d-flex align-items-center"
                name='Logout'
                id='logout'
                as={NavLink}
                to="/"
              ><CIcon className="me-2" icon={cilAccountLogout} size="lg" />
                Logout
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
