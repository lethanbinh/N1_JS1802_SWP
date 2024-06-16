import { cilPeople, cilSettings } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Dashboard',
  },
  {
    component: CNavGroup,
    name: 'Admin Dashboard',
    to: '/admin-dashboard',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Account List',
        to: '/admin-dashboard/account-list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Settings',
    to: '/settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Profile',
        to: '/settings/general-info',
      },
      {
        component: CNavItem,
        name: 'Logout',
        to: '/',
        id: 'logout'
      },
    ],
  },
]

export default _nav
