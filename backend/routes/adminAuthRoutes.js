import { Router } from 'express'
import { login, me } from '../controllers/adminAuthController.js'
import { requireAdminAuth } from '../middleware/requireAdminAuth.js'
import { loginRateLimiter } from '../middleware/loginRateLimiter.js'

const router = Router()

router.post('/login', loginRateLimiter, login)
router.get('/me', requireAdminAuth, me)

export default router
