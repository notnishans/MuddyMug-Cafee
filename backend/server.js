import express from 'express'
import cors from 'cors'
import { randomUUID, scryptSync, timingSafeEqual } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataDir = path.join(__dirname, 'data')
const usersFile = path.join(dataDir, 'users.json')
const ordersFile = path.join(dataDir, 'orders.json')

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

async function ensureDataFile() {
  await fs.mkdir(dataDir, { recursive: true })

  try {
    await fs.access(usersFile)
  } catch {
    await fs.writeFile(usersFile, '[]', 'utf8')
  }
  try {
    await fs.access(ordersFile)
  } catch {
    await fs.writeFile(ordersFile, '[]', 'utf8')
  }
}

async function readUsers() {
  await ensureDataFile()
  const content = await fs.readFile(usersFile, 'utf8')
  return JSON.parse(content)
}

async function writeUsers(users) {
  await ensureDataFile()
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf8')
}

async function readOrders() {
  await ensureDataFile()
  const content = await fs.readFile(ordersFile, 'utf8')
  return JSON.parse(content)
}

async function writeOrders(orders) {
  await ensureDataFile()
  await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2), 'utf8')
}

function hashPassword(password, salt = randomUUID()) {
  const hash = scryptSync(password, salt, 64).toString('hex')
  return { salt, hash }
}

function verifyPassword(password, salt, expectedHash) {
  const actualHash = scryptSync(password, salt, 64)
  const expectedBuffer = Buffer.from(expectedHash, 'hex')

  if (expectedBuffer.length !== actualHash.length) {
    return false
  }

  return timingSafeEqual(expectedBuffer, actualHash)
}

app.get('/api/health', (_request, response) => {
  response.json({ success: true, message: 'Backend is running' })
})

app.post('/api/auth/register', async (request, response) => {
  const username = String(request.body?.username || '').trim()
  const password = String(request.body?.password || '').trim()

  if (!username || !password) {
    return response.status(400).json({ success: false, error: 'Username and password are required' })
  }

  const users = await readUsers()
  const existingUser = users.find((user) => user.username.toLowerCase() === username.toLowerCase())

  if (existingUser) {
    return response.status(409).json({ success: false, error: 'Username already exists' })
  }

  const { salt, hash } = hashPassword(password)
  const newUser = {
    id: randomUUID(),
    username,
    passwordHash: hash,
    passwordSalt: salt,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  await writeUsers(users)

  return response.status(201).json({
    success: true,
    message: 'Registration successful',
  })
})

app.post('/api/auth/login', async (request, response) => {
  const username = String(request.body?.username || '').trim()
  const password = String(request.body?.password || '').trim()

  if (!username || !password) {
    return response.status(400).json({ success: false, error: 'Username and password are required' })
  }

  const users = await readUsers()
  const user = users.find((entry) => entry.username.toLowerCase() === username.toLowerCase())

  if (!user || !verifyPassword(password, user.passwordSalt, user.passwordHash)) {
    return response.status(401).json({ success: false, error: 'Invalid username or password' })
  }

  return response.json({
    success: true,
    token: randomUUID(),
    user: {
      id: user.id,
      username: user.username,
    },
  })
})

app.use((_request, response) => {
  response.status(404).json({ success: false, error: 'Route not found' })
})

await ensureDataFile()

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})

// Create an order (bookings + menu cart)
app.post('/api/orders', async (request, response) => {
  try {
    const { bookings = [], cart = [], total = 0 } = request.body || {}

    if ((!Array.isArray(bookings) || !Array.isArray(cart)) && typeof total !== 'number') {
      return response.status(400).json({ success: false, error: 'Invalid order payload' })
    }

    const orders = await readOrders()
    const newOrder = {
      id: randomUUID(),
      bookings,
      cart,
      total,
      createdAt: new Date().toISOString(),
    }

    orders.push(newOrder)
    await writeOrders(orders)

    return response.status(201).json({ success: true, orderId: newOrder.id })
  } catch (err) {
    console.error('Failed to create order', err)
    return response.status(500).json({ success: false, error: 'Failed to create order' })
  }
})