/**
 * Catch-all for any request that didn't match a route. Must be mounted
 * after all real routes and before errorHandler.
 */
export function notFound(req, res) {
  res.status(404).json({ success: false, error: 'Route not found' })
}
