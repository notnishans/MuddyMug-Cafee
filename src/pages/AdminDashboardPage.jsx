import { useAdminAuthContext } from '../context/useAdminAuthContext'
import EnquiryList from '../components/admin/EnquiryList'
import { usePageMeta } from '../hooks/usePageMeta'
import './AdminDashboardPage.css'

export default function AdminDashboardPage() {
  usePageMeta('Admin Dashboard')

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

      <section>
        <h2 className="admin-dashboard-section-heading">Enquiries</h2>
        <EnquiryList />
      </section>
    </div>
  )
}
