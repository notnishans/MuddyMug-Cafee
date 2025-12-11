import { Router } from 'express'
import { createEnquiry } from '../controllers/enquiryController.js'
import { enquiryRateLimiter } from '../middleware/enquiryRateLimiter.js'

const router = Router()

router.post('/', enquiryRateLimiter, createEnquiry)

export default router
