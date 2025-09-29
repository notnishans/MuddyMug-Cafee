import rateLimit from 'express-rate-limit'

/**
 * Throttles the admin login endpoint specifically, to slow down
 * credential-guessing attempts. Keyed by IP by default.
 */
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many login attempts. Please try again later.' },
})
