import express from 'express'
import cors from 'cors'
import env from './config/env.js'
import { connectDB } from './config/db.js'
import healthRoutes from './routes/healthRoutes.js'
import adminAuthRoutes from './routes/adminAuthRoutes.js'
import { notFound } from './middleware/notFound.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/health', healthRoutes)
app.use('/api/admin/auth', adminAuthRoutes)

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
