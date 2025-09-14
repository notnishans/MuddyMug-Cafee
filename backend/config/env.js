import 'dotenv/config'

/**
 * Central place for reading environment configuration.
 *
 * Values with sensible development defaults (PORT, NODE_ENV, CORS_ORIGIN,
 * JWT_EXPIRY) are always available. Values that don't have a safe default
 * (MONGODB_URI, JWT_SECRET) are exposed as-is (possibly undefined) — the
 * code that actually needs them is responsible for calling requireEnv()
 * at the point of use, so the server doesn't fail to start today for
 * variables nothing consumes yet.
 */

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 4000,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
}

/**
 * Fetch a required environment variable, throwing a clear error if it's
 * missing instead of letting the app continue with `undefined`.
 * Use this at the point where a value is actually needed (e.g. the
 * MongoDB connection module, the JWT signing module) rather than here.
 */
export function requireEnv(key) {
  const value = env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

export default env
