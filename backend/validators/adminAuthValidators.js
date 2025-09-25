/**
 * Minimal hand-rolled validation for the admin login body. Deliberately
 * not pulling in a validation library for a single two-field endpoint —
 * revisit if/when the admin API surface grows enough to justify one.
 */
export function validateLoginInput(body) {
  const username = String(body?.username || '').trim()
  const password = String(body?.password || '').trim()

  if (!username || !password) {
    return { valid: false, error: 'Username and password are required' }
  }

  if (username.length > 50 || password.length > 200) {
    return { valid: false, error: 'Invalid username or password' }
  }

  return { valid: true, username, password }
}
