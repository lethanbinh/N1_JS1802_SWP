import { cilMoney, cilPeople, cilList, cilArrowCircleLeft, cilCart, cilChatBubble } from '@coreui/icons'
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
        name: 'Main Dashboard',
        to: '/staff-dashboard/dashboard',
      },
      {
        component: CNavItem,
        name: 'Customer Information',
        to: '/staff-dashboard/customer-info',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Product Management',
    to: '/product-management',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
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
        name: 'Product List',
        to: '/staff-dashboard/view-edit-product',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Transaction History',
    to: '/transaction-history',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Billing',
        to: '/staff-dashboard/invoice',
      },
      {
        component: CNavItem,
        name: 'Sell History',
        to: '/staff-dashboard/view-CPH',
      },
      {
        component: CNavItem,
        name: 'Purchase History',
        to: '/staff-dashboard/view-PCPH',
      },
      {
        component: CNavItem,
        name: 'Exchange and Return History',
        to: '/staff-dashboard/view-EAR-product',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Policies',
    to: '/policies',
    icon: <CIcon icon={cilArrowCircleLeft} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Return & Exchange Policy',
        to: '/staff-dashboard/view-edit-RAEP',
      },
      {
        component: CNavItem,
        name: 'Promotion List',
        to: '/staff-dashboard/promotion',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Message',
    to: '/message',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Chat',
        to: '/staff-dashboard/chat',
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
