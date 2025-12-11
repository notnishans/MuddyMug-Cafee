import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import env from './config/env.js'
import { connectDB } from './config/db.js'
import healthRoutes from './routes/healthRoutes.js'
import adminAuthRoutes from './routes/adminAuthRoutes.js'
import enquiryRoutes from './routes/enquiryRoutes.js'
import { notFound } from './middleware/notFound.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

// Only the configured frontend origin may call this API from a browser.
// Requests with no Origin header (curl, server-to-server, same-origin) are
// allowed through — CORS is a browser-enforced concept, so blocking those
// wouldn't stop a non-browser caller anyway; real protection for admin
// routes comes from the JWT check, not from CORS.
function corsOriginCheck(origin, callback) {
  if (!origin || origin === env.CORS_ORIGIN) {
    return callback(null, true)
  }
  const err = new Error('Not allowed by CORS')
  err.status = 403
  return callback(err)
}

app.use(helmet())
app.use(cors({ origin: corsOriginCheck }))
app.use(express.json({ limit: '10kb' }))

app.use('/api/health', healthRoutes)
app.use('/api/admin/auth', adminAuthRoutes)
app.use('/api/enquiries', enquiryRoutes)

app.use(notFound)
app.use(errorHandler)

try {
  await connectDB()
} catch (err) {
  console.error('Fatal: unable to start server without a database connection —', err.message)
  process.exit(1)
}

app.listen(env.PORT, () => {
  console.log(`Backend running on http://localhost:${env.PORT}`)
})
