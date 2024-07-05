import { cilMoney, cilPeople } from '@coreui/icons'
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

    component: CNavItem,
    name: 'Gold Price Table',
    to: '/settings/gold-price',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,

  },
]

export default _nav
