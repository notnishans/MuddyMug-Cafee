/**
 * One-off CLI script to create or update an admin account.
 * There is no public registration endpoint by design — this is the
 * only way to provision admin logins.
 *
 * Usage:
 *   node utils/seedAdmin.js <username> <password>
 */
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import Admin from '../models/Admin.js'

async function main() {
  const [, , username, password] = process.argv

  if (!username || !password) {
    console.error('Usage: node utils/seedAdmin.js <username> <password>')
    process.exit(1)
  }

  if (password.length < 8) {
    console.error('Password must be at least 8 characters.')
    process.exit(1)
  }

  await connectDB()

  const passwordHash = await bcrypt.hash(password, 12)
  const normalizedUsername = username.trim().toLowerCase()

  const existing = await Admin.findOne({ username: normalizedUsername })
  await Admin.findOneAndUpdate(
    { username: normalizedUsername },
    { username: normalizedUsername, passwordHash },
    { upsert: true }
  )

  console.log(existing ? `Updated password for admin "${normalizedUsername}".` : `Created admin "${normalizedUsername}".`)

  await mongoose.disconnect()
  process.exit(0)
}

main().catch((err) => {
  console.error('Failed to seed admin:', err.message)
  process.exit(1)
})
