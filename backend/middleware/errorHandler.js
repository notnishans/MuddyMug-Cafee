/**
 * Centralized error handler. Must be the last app.use() call, and must
 * keep all four arguments (req, res, next unused but required) for
 * Express to recognize it as error-handling middleware.
 *
 * Logs the full error server-side, but only ever sends the client a
 * clean JSON message — never a stack trace. For unexpected (500) errors
 * the client gets a generic message; for errors that set their own
 * status (e.g. validation errors a controller throws with err.status),
 * the specific message is safe to pass through.
 */
export function errorHandler(err, req, res, _next) {
  console.error(err)

  const status = err.status || err.statusCode || 500
  const message = status >= 500 ? 'Internal server error' : err.message || 'Request failed'

  res.status(status).json({ success: false, error: message })
}
