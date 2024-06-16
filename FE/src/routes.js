import React from 'react'
import { Navigate } from 'react-router-dom'
//public
const Login = React.lazy(() => import('./views/login/Login'))
const ForgotPassword = React.lazy(() => import('./views/resetPassword/ForgotPassword'))
const CreateNewPassword = React.lazy(() => import('./views/resetPassword/CreateNewPassword'))
const GeneralInfoForm = React.lazy(() => import('./components/ui_public/GeneralInfoForm'))
//adminDashboard
const AccountList = React.lazy(() => import('./components/ui_adminDasdboard/AccountList'))
//managerdashboard
const StaffList = React.lazy(() => import('./components/ui_managerDashboard/StaffList'))
const Policy = React.lazy(() => import('./components/ui_managerDashboard/Policy'))
const PromotionList = React.lazy(() => import('./components/ui_managerDashboard/PromotionList'))
const PurchaseHistoryListManagerDashboard = React.lazy(() => import('./components/ui_public/PurchaseHistoryList'))
const Stall = React.lazy(() => import('./components/ui_managerDashboard/StallManage'))
const Revenue = React.lazy(() => import('./components/ui_managerDashboard/ManagerRevenue'))
const StaffStatistic = React.lazy(() => import('./components/ui_managerDashboard/StaffStatistic'))
const OrderStatistic = React.lazy(() => import('./components/ui_managerDashboard/OrderStatistic'))
const ProductStatistic = React.lazy(() => import('./components/ui_managerDashboard/ProductStatistic'))
const ViewProductInStallManager = React.lazy(() => import('./components/ui_managerDashboard/ViewProductInStallManager'))
const PolicyForStaff = React.lazy(() => import('./components/ui_managerDashboard/Policy'))
//staffDashboard
const PurchaseHistoryListStaffDashboard = React.lazy(() => import('./components/ui_public/PurchaseHistoryList'))
const ViewProductInStallStaff = React.lazy(() => import('./components/ui_staffDashboard/ViewProductInStallStaff'))
const CustomerInfo = React.lazy(() => import('./components/ui_staffDashboard/CustomerInfo'))
const RevenueForEachStall = React.lazy(() => import('./components/ui_staffDashboard/StaffRevenue'))
const BuyOldProduct = React.lazy(() => import('./components/ui_staffDashboard/BuyOldProduct'))
const InvoiceForm = React.lazy(() => import('./components/ui_staffDashboard/Billing/InvoiceForm'))
const AddProduct = React.lazy(() => import('./components/ui_staffDashboard/AddProduct'))
const OderStatisticOfStall = React.lazy(() => import('./components/ui_staffDashboard/OderStatisticOfStall'))
const ProductReportOfStall = React.lazy(() => import('./components/ui_staffDashboard/ProductReportOfStall'))

const routes = [

  //public
  { path: '/', exact: true, name: 'Home', element: <Navigate to="/login" /> },
  { path: '/login', exact: true, name: 'Login', element: Login },
  { path: '/forgot-password', exact: true, name: 'Forgot Password', element: ForgotPassword },
  { path: '/create-new-password', exact: true, name: 'Create New Password', element: CreateNewPassword },
  { path: '/home', exact: true, name: 'Home' },
  { path: '/settings/general-info', name: 'Profile', element: GeneralInfoForm },
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
  { path: '/manager-dashboard/revenue', name: 'Revenue of Stalls', element: Revenue },
  { path: '/manager-dashboard/staff-statistics', name: 'Staff Statistic', element: StaffStatistic },
  { path: '/manager-dashboard/orders', name: 'Order Statistic', element: OrderStatistic },
  { path: '/manager-dashboard/product-statistics', name: 'Product Statistic', element: ProductStatistic },
  //staffDashboard
  { path: '/staff-dashboard/view-CPH', name: 'Customer Purchase History', element: PurchaseHistoryListStaffDashboard },
  { path: '/staff-dashboard/view-edit-RAEP', name: 'Return & Exchange Policy', element: PolicyForStaff, },
  { path: '/staff-dashboard/view-edit-RAEP', name: 'Return & Exchange Policy', element: PolicyForStaff, },
  { path: '/staff-dashboard/view-CPH', name: 'Customer Purchase History', element: PurchaseHistoryListStaffDashboard, },
  { path: '/staff-dashboard/view-edit-product', name: 'Product in Stall', element: ViewProductInStallStaff },
  { path: '/staff-dashboard/customer-info', name: 'Customer Information', element: CustomerInfo },
  { path: '/staff-dashboard/revenue-ofS', name: 'Revenue of Stall', element: RevenueForEachStall },
  { path: '/staff-dashboard/buy-oleP', name: 'Buy Old Product', element: BuyOldProduct },
  { path: '/staff-dashboard/invoice', name: 'Invoice', element: InvoiceForm },
  { path: '/staff-dashboard/add-product', name: 'Add Product', element: AddProduct },
  { path: '/staff-dashboard/orders-ofS', name: 'Oders Statistics of Stall', element: OderStatisticOfStall },
  { path: '/staff-dashboard/product-report-ofS', name: 'Products Report of Stall', element: ProductReportOfStall }
]

export default routes
