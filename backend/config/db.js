import mongoose from 'mongoose'
import { requireEnv } from './env.js'

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message)
})

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected')
})

/**
 * Connect to MongoDB (Atlas) using MONGODB_URI from the environment.
 * Throws if the variable is missing or the connection attempt fails —
 * the caller is expected to treat a failed connection as fatal at startup,
 * rather than let the app run without a database.
 */
export async function connectDB() {
  const uri = requireEnv('MONGODB_URI')

  await mongoose.connect(uri)
  console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`)
}
