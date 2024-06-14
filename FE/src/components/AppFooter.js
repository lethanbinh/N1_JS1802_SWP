import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="text-center py-2">
      <div className="ms-1">JEWELRY Store &copy; 2024 creativeLabs.</div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
