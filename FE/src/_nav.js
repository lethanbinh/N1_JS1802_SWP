import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

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
        to: '/manager-dashboard/view-edit-product',
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
        name: 'Products Report',
        to: '/manager-dashboard/product-report',
      },
    ],
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
        to: '/staff-dashboard/bill',
      },
      {
        component: CNavItem,
        name: 'Add Product',
        to: '/staff-dashboard/add-product',
      },
      {
        component: CNavItem,
        name: 'Product in Stall',
        to: '/manager-dashboard/view-edit-product',
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
        //chặn quyền edit của staff (only view)
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
]

export default _nav
