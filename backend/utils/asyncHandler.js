/**
 * Wraps an async Express route handler so any rejected promise (thrown
 * error) is forwarded to next(), instead of crashing the process or
 * hanging the request. Lets controllers use plain async/await without
 * a try/catch in every single one.
 */
export function asyncHandler(fn) {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
