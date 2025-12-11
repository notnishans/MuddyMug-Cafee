import { useState } from 'react'
import CustomField from '../components/CustomField'
import { apiClient } from '../api/client'
import './ContactPage.css'

const COURSE_OPTIONS = [
  { value: '', label: 'Not applicable / general enquiry' },
  { value: 'Barista Training', label: 'Barista Training' },
  { value: 'Bakery Training', label: 'Bakery Training' },
  { value: 'Bartending Training', label: 'Bartending Training' },
]

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  courseInterest: '',
  website: '', // honeypot — must stay blank; hidden from real visitors
}

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setError('Please fill in your name, email, subject, and message.')
      return
    }

    setLoading(true)
    try {
      await apiClient.post('/api/enquiries', form)
      setSuccess('Thanks — your message has been sent. We will get back to you.')
      setForm(EMPTY_FORM)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-info">
        <h1>Contact</h1>
        <p>Mahendra Pool, Pokhara, Gandaki Province 33700, Nepal</p>
        <p>
          <a href="tel:+9779811759805">+977 9811759805</a>
        </p>
        <ul className="contact-social">
          <li>
            <a
              href="https://www.instagram.com/muddymugbakersandbrewers/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Instagram
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/muddymug/" target="_blank" rel="noreferrer noopener">
              Facebook
            </a>
          </li>
          <li>
            <a href="https://youtube.com/@muddy_mug" target="_blank" rel="noreferrer noopener">
              YouTube
            </a>
          </li>
        </ul>
      </section>

      <section className="contact-form-section">
        <h2>Send a Message</h2>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {/* Honeypot: invisible to real visitors, left blank by them.
              Simple bots often fill every field they find. */}
          <div className="contact-form__honeypot" aria-hidden="true">
            <label htmlFor="website">Leave this field blank</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex="-1"
              autoComplete="off"
              value={form.website}
              onChange={handleChange('website')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <CustomField
              id="name"
              value={form.name}
              onChange={handleChange('name')}
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <CustomField
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone (optional)</label>
            <CustomField
              id="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange('phone')}
              placeholder="Your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="courseInterest">Course Interested In (optional)</label>
            <select
              id="courseInterest"
              className="custom-field"
              value={form.courseInterest}
              onChange={handleChange('courseInterest')}
            >
              {COURSE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <CustomField
              id="subject"
              value={form.subject}
              onChange={handleChange('subject')}
              placeholder="What is this about?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              className="custom-field"
              rows={5}
              value={form.message}
              onChange={handleChange('message')}
              placeholder="Your message"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="custom-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>
    </div>
  )
}
