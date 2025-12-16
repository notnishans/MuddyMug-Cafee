import { useContext } from 'react'
import { AdminAuthContext } from './AdminAuthContext'

export const useAdminAuthContext = () => {
  const context = useContext(AdminAuthContext)
  return context
}
