import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '../../api/client'
import { useAdminAuthContext } from '../../context/useAdminAuthContext'
import './EnquiryList.css'

const STATUS_OPTIONS = ['new', 'read', 'archived']

export default function EnquiryList() {
  const { token } = useAdminAuthContext()
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } }

  const loadEnquiries = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await apiClient.get('/api/admin/enquiries', authHeaders)
      setEnquiries(data.enquiries)
    } catch (err) {
      setError(err.message || 'Failed to load enquiries.')
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    loadEnquiries()
  }, [loadEnquiries])

  const handleStatusChange = async (id, status) => {
    const previous = enquiries
    setEnquiries((prev) => prev.map((e) => (e._id === id ? { ...e, status } : e)))
    try {
      await apiClient.patch(`/api/admin/enquiries/${id}/status`, { status }, authHeaders)
    } catch (err) {
      setEnquiries(previous)
      setError(err.message || 'Failed to update status.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry? This cannot be undone.')) return
    const previous = enquiries
    setEnquiries((prev) => prev.filter((e) => e._id !== id))
    try {
      await apiClient.delete(`/api/admin/enquiries/${id}`, authHeaders)
    } catch (err) {
      setEnquiries(previous)
      setError(err.message || 'Failed to delete enquiry.')
    }
  }

  if (loading) {
    return <p>Loading enquiries…</p>
  }

  return (
    <div className="enquiry-list">
      {error && <div className="error-message">{error}</div>}

      {enquiries.length === 0 ? (
        <p>No enquiries yet.</p>
      ) : (
        enquiries.map((enquiry) => (
          <article key={enquiry._id} className="enquiry-card">
            <header className="enquiry-card__header">
              <div>
                <strong>{enquiry.name}</strong>
                <span className="enquiry-card__email"> — {enquiry.email}</span>
              </div>
              <time className="enquiry-card__date" dateTime={enquiry.createdAt}>
                {new Date(enquiry.createdAt).toLocaleString()}
              </time>
            </header>

            {enquiry.phone && <p className="enquiry-card__meta">Phone: {enquiry.phone}</p>}
            {enquiry.courseInterest && (
              <p className="enquiry-card__meta">Course interest: {enquiry.courseInterest}</p>
            )}
            <p className="enquiry-card__subject">
              <strong>Subject:</strong> {enquiry.subject}
            </p>
            <p className="enquiry-card__message">{enquiry.message}</p>

            <div className="enquiry-card__actions">
              <select
                className="custom-field"
                value={enquiry.status}
                onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="custom-button custom-button--outline"
                onClick={() => handleDelete(enquiry._id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))
      )}
    </div>
  )
}
