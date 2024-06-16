import { cilPeople, cilSettings } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'

const _nav_manager = [
  {
    component: CNavTitle,
    name: 'Dashboard',
  },

  {
    component: CNavGroup,
    name: 'Manager Dashboard',
    to: '/manager-dashboard',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Staff List',
        to: '/manager-dashboard/staff-list',
        //button view, update, delete - phía dưới cùng tạo button create new staff link to page create
      },
      {
        component: CNavItem,
        name: 'Promotion List',
        to: '/manager-dashboard/promotion',
        //button view, update, delete - phía dưới cùng tạo button create new promotion link to page create
      },
      {
        component: CNavItem,
        name: 'Customer Purchase History',
        to: '/manager-dashboard/view-CPH',
      },
      {
        component: CNavItem,
        name: 'Return & Exchange Policy',
        to: '/manager-dashboard/view-edit-RAEP',
      },
      {
        component: CNavItem,
        name: 'Stall',
        to: '/manager-dashboard/stall',
      },
      {
        component: CNavItem,
        name: 'Product in Stall',
        to: '/manager-dashboard/view-product-in-stall',
        //chặn quyền edit của manager (only view)
      },
      {
        component: CNavItem,
        name: 'Revenue of Stalls',
        to: '/manager-dashboard/revenue',
      },
      {
        component: CNavItem,
        name: 'Staff Statistics',
        to: '/manager-dashboard/staff-statistics',
      },
      {
        component: CNavItem,
        name: 'Orders Statistics',
        to: '/manager-dashboard/orders',
      },
      {
        component: CNavItem,
        name: 'Products Statistics',
        to: '/manager-dashboard/product-statistics',
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

export default _nav_manager
