const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validates a public contact-form submission. Also checks the
 * honeypot field ("website") — a hidden input real users never see
 * or fill, but simple bots often do. A filled honeypot is flagged as
 * spam rather than treated as a normal validation failure, so the
 * controller can respond without revealing what caught it.
 */
export function validateEnquiryInput(body) {
  const name = String(body?.name || '').trim()
  const email = String(body?.email || '').trim()
  const phone = String(body?.phone || '').trim()
  const subject = String(body?.subject || '').trim()
  const message = String(body?.message || '').trim()
  const courseInterest = String(body?.courseInterest || '').trim()
  const honeypot = String(body?.website || '').trim()

  if (honeypot) {
    return { valid: false, isSpam: true, error: 'Submission rejected' }
  }

  if (!name || !email || !subject || !message) {
    return { valid: false, error: 'Name, email, subject, and message are required' }
  }

  if (!EMAIL_RE.test(email)) {
    return { valid: false, error: 'Please provide a valid email address' }
  }

  if (
    name.length > 100 ||
    email.length > 254 ||
    phone.length > 30 ||
    subject.length > 150 ||
    message.length > 2000 ||
    courseInterest.length > 50
  ) {
    return { valid: false, error: 'One or more fields exceed the maximum length' }
  }

  return { valid: true, name, email, phone, subject, message, courseInterest }
}
