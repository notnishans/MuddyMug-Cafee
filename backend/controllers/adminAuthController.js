import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin.js'
import env, { requireEnv } from '../config/env.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { validateLoginInput } from '../validators/adminAuthValidators.js'

export const login = asyncHandler(async (req, res) => {
  const result = validateLoginInput(req.body)
  if (!result.valid) {
    const err = new Error(result.error)
    err.status = 400
    throw err
  }

  const { username, password } = result
  const admin = await Admin.findOne({ username: username.toLowerCase() })

  // Same generic message whether the username doesn't exist or the
  // password is wrong — don't reveal which one it was.
  const invalidCredentials = () => {
    const err = new Error('Invalid username or password')
    err.status = 401
    throw err
  }

  if (!admin) invalidCredentials()

  const passwordMatches = await bcrypt.compare(password, admin.passwordHash)
  if (!passwordMatches) invalidCredentials()

  const secret = requireEnv('JWT_SECRET')
  const token = jwt.sign({ sub: admin._id.toString(), username: admin.username }, secret, {
    expiresIn: env.JWT_EXPIRY,
  })

  res.json({
    success: true,
    token,
    admin: { id: admin._id, username: admin.username },
  })
})

export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, admin: req.admin })
})
