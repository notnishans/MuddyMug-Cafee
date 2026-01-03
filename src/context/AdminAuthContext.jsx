import { createContext, useState, useEffect, useCallback } from 'react'
import { apiClient } from '../api/client'

const AdminAuthContext = createContext()

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || null)
  const [admin, setAdmin] = useState(null)
  // Starts true so RequireAdminAuth doesn't redirect to /admin/login
  // before a stored token has even been checked.
  const [loading, setLoading] = useState(true)

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken')
    setToken(null)
    setAdmin(null)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function verifyToken() {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const data = await apiClient.get('/api/admin/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!cancelled) setAdmin(data.admin)
      } catch {
        // Token missing/expired/invalid — treat as logged out.
        if (!cancelled) logout()
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    verifyToken()
    return () => {
      cancelled = true
    }
  }, [token, logout])

  const login = async (username, password) => {
    const data = await apiClient.post('/api/admin/auth/login', { username, password })
    localStorage.setItem('adminToken', data.token)
    setToken(data.token)
    setAdmin(data.admin)
    return data
  }

  return (
    <AdminAuthContext.Provider
      value={{ admin, token, loading, isAuthenticated: Boolean(admin), login, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export { AdminAuthContext }
