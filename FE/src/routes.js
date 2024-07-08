import React from 'react'
import { Navigate } from 'react-router-dom'

//public
const Login = React.lazy(() => import('./views/login/Login'))
const ForgotPassword = React.lazy(() => import('./views/resetPassword/ForgotPassword'))
const CreateNewPassword = React.lazy(() => import('./views/resetPassword/CreateNewPassword'))
const GeneralInfoForm = React.lazy(() => import('./components/ui_public/GeneralInfoForm'))
const GoldPrice = React.lazy(() => import('./components/ui_public/GoldPrice'))

//adminDashboard
const AccountList = React.lazy(() => import('./components/ui_adminDasdboard/AccountList'))
//managerdashboard
const StaffList = React.lazy(() => import('./components/ui_managerDashboard/StaffList'))
const Policy = React.lazy(() => import('./components/ui_managerDashboard/Policy'))
const PromotionList = React.lazy(() => import('./components/ui_managerDashboard/PromotionList'))
const PurchaseHistoryListManagerDashboard = React.lazy(() => import('./components/ui_public/PurchaseHistoryList'))
const Stall = React.lazy(() => import('./components/ui_managerDashboard/StallManage'))
const ViewProductInStallManager = React.lazy(() => import('./components/ui_managerDashboard/ViewProductInStallManager'))
const ManagerDashboard = React.lazy(() => import('./components/ui_managerDashboard/ManagerDashboard'))

//staffDashboard
const PurchaseHistoryListStaffDashboard = React.lazy(() => import('./components/ui_public/PurchaseHistoryList'))
const ViewProductInStallStaff = React.lazy(() => import('./components/ui_staffDashboard/ViewProductInStallStaff'))
const CustomerInfo = React.lazy(() => import('./components/ui_staffDashboard/CustomerInfo'))
const InvoiceForm = React.lazy(() => import('./components/ui_staffDashboard/Billing/InvoiceForm'))
const AddSellProduct = React.lazy(() => import('./components/ui_staffDashboard/AddSellProduct'))
const AddPurchaseProduct = React.lazy(() => import('./components/ui_staffDashboard/AddPurchaseProduct'))
const StaffDashboard = React.lazy(() => import('./components/ui_staffDashboard/StaffDashboard'))
const PolicyForStaff = React.lazy(() => import('./components/ui_managerDashboard/Policy'))
const PromotionListForStaff = React.lazy(() => import('./components/ui_staffDashboard/PromotionListforStaff'))

const routes = [
  //public
  { path: '/', exact: true, name: 'Home', element: <Navigate to="/home" /> },
  { path: '/login', exact: true, name: 'Login', element: Login },
  { path: '/forgot-password', exact: true, name: 'Forgot Password', element: ForgotPassword },
  { path: '/create-new-password', exact: true, name: 'Create New Password', element: CreateNewPassword },
  { path: '/home', exact: true, name: 'Home' },
  { path: '/settings/general-info', name: 'Profile', element: GeneralInfoForm },
  { path: '/settings/gold-price', name: 'Gold Price Table', element: GoldPrice },

  //adminDashboard
  { path: '/admin-dashboard/account-list', name: 'Account List', element: AccountList },
  //managerDashboard
  { path: '/manager-dashboard/staff-list', name: 'Staff List', element: StaffList },
  { path: '/manager-dashboard/view-edit-RAEP', name: 'Return & Exchange Policy', element: Policy },
  { path: '/manager-dashboard/promotion', name: 'Promotion List', element: PromotionList },
  { path: '/manager-dashboard/view-CPH', name: 'Customer Purchase History', element: PurchaseHistoryListManagerDashboard },
  { path: '/manager-dashboard/promotion', name: 'Promotion List', element: PromotionList },
  { path: '/manager-dashboard/promotion', name: 'Promotion List', element: PromotionList },
  { path: '/manager-dashboard/view-CPH', name: 'Customer Purchase History', element: PurchaseHistoryListManagerDashboard },
  { path: '/manager-dashboard/view-product-in-stall', name: 'Product in Stall', element: ViewProductInStallManager },
  { path: '/manager-dashboard/stall', name: 'Stall', element: Stall },
  { path: '/manager-dashboard/dashboard', name: 'Manager Dashboard', element: ManagerDashboard },

  //staffDashboard
  { path: '/staff-dashboard/view-CPH', name: 'Customer Purchase History', element: PurchaseHistoryListStaffDashboard },
  { path: '/staff-dashboard/view-edit-RAEP', name: 'Return & Exchange Policy', element: PolicyForStaff, },
  { path: '/staff-dashboard/view-edit-RAEP', name: 'Return & Exchange Policy', element: PolicyForStaff, },
  { path: '/staff-dashboard/promotion', name: 'Promotion List', element: PromotionListForStaff, },
  { path: '/staff-dashboard/view-CPH', name: 'Customer Purchase History', element: PurchaseHistoryListStaffDashboard, },
  { path: '/staff-dashboard/view-edit-product', name: 'Product in Stall', element: ViewProductInStallStaff },
  { path: '/staff-dashboard/customer-info', name: 'Customer Information', element: CustomerInfo },
  { path: '/staff-dashboard/invoice', name: 'Invoice', element: InvoiceForm },
  { path: '/staff-dashboard/add-sell-product', name: 'Add Sell Product', element: AddSellProduct },
  { path: '/staff-dashboard/add-purchase-product', name: 'Add Purchase Product', element: AddPurchaseProduct },
  { path: '/staff-dashboard/dashboard', name: 'Staff Dashboard', element: StaffDashboard }
]

export default routes
