import { useAdminAuthContext } from '../context/useAdminAuthContext'
import './AdminDashboardPage.css'

// Minimal by design — this issue is about proving the auth loop works
// end to end (login, protected route, session check, logout).
// Enquiry and content management are separate, later issues.
export default function AdminDashboardPage() {
  const { admin, logout } = useAdminAuthContext()

  return (
    <div className="admin-dashboard-page">
      <header className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-dashboard-header__session">
          <span>Signed in as {admin?.username}</span>
          <button type="button" className="custom-button custom-button--outline" onClick={logout}>
            Log Out
          </button>
        </div>
      </header>
      <p>Enquiry management and content management are coming in later issues.</p>
    </div>
  )
}
