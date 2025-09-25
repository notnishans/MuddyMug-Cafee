import jwt from 'jsonwebtoken'
import { requireEnv } from '../config/env.js'

/**
 * Protects a route behind a valid admin JWT. Expects an
 * "Authorization: Bearer <token>" header. On success, attaches the
 * decoded identity to req.admin for downstream handlers.
 */
export function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ success: false, error: 'Authentication required' })
  }

  try {
    const secret = requireEnv('JWT_SECRET')
    const payload = jwt.verify(token, secret)
    req.admin = { id: payload.sub, username: payload.username }
    return next()
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' })
  }
}
