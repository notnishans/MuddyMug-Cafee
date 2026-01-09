import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import CustomField from '../components/CustomField'
import { useAdminAuthContext } from '../context/useAdminAuthContext'
import { usePageMeta } from '../hooks/usePageMeta'
import './AdminLoginPage.css'

export default function AdminLoginPage() {
  usePageMeta('Admin Login')

  const { login, isAuthenticated, loading } = useAdminAuthContext()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Already signed in (e.g. a valid stored token) — no need to show
  // the form again. Declarative redirect, not a side effect in render.
  if (!loading && isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.')
      return
    }

    setSubmitting(true)
    try {
      await login(username.trim(), password)
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="admin-login-page">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h1>Admin Login</h1>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <CustomField
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <CustomField
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="custom-button" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
