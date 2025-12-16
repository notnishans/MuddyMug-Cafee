import { Navigate } from 'react-router-dom'
import { useAdminAuthContext } from '../../context/useAdminAuthContext'

export default function RequireAdminAuth({ children }) {
  const { isAuthenticated, loading } = useAdminAuthContext()

  if (loading) {
    return <p className="admin-loading">Checking session…</p>
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
