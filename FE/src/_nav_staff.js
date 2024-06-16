import { cilPeople, cilSettings } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'

const _nav_staff = [
  {
    component: CNavTitle,
    name: 'Dashboard',
  },
  {
    component: CNavGroup,
    name: 'Staff Dashboard',
    to: '/staff-dashboard',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Billing',
        to: '/staff-dashboard/invoice',
      },
      {
        component: CNavItem,
        name: 'Add Product',
        to: '/staff-dashboard/add-product',
      },
      {
        component: CNavItem,
        name: 'Product in Stall',
        to: '/staff-dashboard/view-edit-product',
      },
      {
        component: CNavItem,
        name: 'Customer Purchase History',
        to: '/staff-dashboard/view-CPH',
      },
      {
        component: CNavItem,
        name: 'Return & Exchange Policy',
        to: '/staff-dashboard/view-edit-RAEP',
      },
      {
        component: CNavItem,
        name: 'Customer Information',
        to: '/staff-dashboard/customer-info',
      },
      {
        component: CNavItem,
        name: 'Buy Old Products',
        to: '/staff-dashboard/buy-oleP',
      },
      {
        component: CNavItem,
        name: 'Revenue of Stall',
        to: '/staff-dashboard/revenue-ofS',
      },
      {
        component: CNavItem,
        name: 'Orders Statistics of Stall',
        to: '/staff-dashboard/orders-ofS',
      },
      {
        component: CNavItem,
        name: 'Products Report of Stall',
        to: '/staff-dashboard/product-report-ofS',
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

export default _nav_staff
