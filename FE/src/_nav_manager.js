import { cilMoney, cilPeople, cilList, cilArrowCircleLeft, cilHome, cibSnapchat, cilChatBubble, cilCalendar } from '@coreui/icons'
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
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Main Dashboard',
        to: '/manager-dashboard/dashboard',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Staff Management',
    to: '/staff-management',
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
    ],
  },
  {
    component: CNavGroup,
    name: 'Product Management',
    to: '/product-management',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Stall Overview',
        to: '/manager-dashboard/stall',
      },
      {
        component: CNavItem,
        name: 'Product in Stall',
        to: '/manager-dashboard/view-product-in-stall',
      },
      {
        component: CNavItem,
        name: 'Add Sell Product',
        to: '/manager-dashboard/add-sell-product',
      },
      {
        component: CNavItem,
        name: 'Add Purchase Product',
        to: '/manager-dashboard/add-purchase-product',
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
        name: 'Sell History',
        to: '/manager-dashboard/view-CPH',
      },
      {
        component: CNavItem,
        name: 'Purchase History',
        to: '/manager-dashboard/view-PCPH',
      },
      {
        component: CNavItem,
        name: 'Exchange and Return History',
        to: '/manager-dashboard/view-EAR-product',
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
        to: '/manager-dashboard/view-edit-RAEP',
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
        to: '/manager-dashboard/chat',
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

export default _nav_manager
