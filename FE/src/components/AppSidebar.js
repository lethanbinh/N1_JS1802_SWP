import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CIcon from '@coreui/icons-react'
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'

// sidebar nav config
import navigation from '../_nav'
import navigationManager from '../_nav_manager'
import navigationStaff from '../_nav_staff'

import UserStorage from '../util/UserStorage'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [user, setUser] = useState(UserStorage.getAuthenticatedUser())

  useEffect(() => {
    const logout = document.querySelector('#logout')

    logout.onclick = () => {
      localStorage.clear()
    }
  })
  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader>
        <CSidebarBrand to="/">
          <CIcon icon={logo} height={90} size="xl"/>
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      {user.roleName.toUpperCase() === 'ADMIN' ? <AppSidebarNav items={navigation} /> : ""}
      {user.roleName.toUpperCase() === 'MANAGER' ? <AppSidebarNav items={navigationManager} /> : ""}
      {user.roleName.toUpperCase() === 'STAFF' ? <AppSidebarNav items={navigationStaff} /> : ""}

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
