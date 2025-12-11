import rateLimit from 'express-rate-limit'

// More generous than the login limiter — this is a public form
// legitimate visitors might use more than once, but still capped to
// slow down scripted spam.
export const enquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many submissions. Please try again later.' },
})
