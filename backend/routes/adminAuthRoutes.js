import { Router } from 'express'
import { login, me } from '../controllers/adminAuthController.js'
import { requireAdminAuth } from '../middleware/requireAdminAuth.js'

const router = Router()

router.post('/login', login)
router.get('/me', requireAdminAuth, me)

export default router
