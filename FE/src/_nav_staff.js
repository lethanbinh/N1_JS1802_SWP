import { cilMoney, cilPeople } from '@coreui/icons'
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
        name: 'Add Sell Product',
        to: '/staff-dashboard/add-sell-product',
      },
      {
        component: CNavItem,
        name: 'Add Purchase Product',
        to: '/staff-dashboard/add-purchase-product',
      },
      {
        component: CNavItem,
        name: 'Promotion List',
        to: '/staff-dashboard/promotion',
        //button view, update, delete - phía dưới cùng tạo button create new promotion link to page create
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
        name: 'Staff dashboard',
        to: '/staff-dashboard/dashboard',
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

export default _nav_staff
