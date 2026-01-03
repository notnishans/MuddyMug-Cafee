import { Router } from 'express'
import { requireAdminAuth } from '../middleware/requireAdminAuth.js'
import {
  listEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/adminEnquiryController.js'

const router = Router()

router.use(requireAdminAuth)

router.get('/', listEnquiries)
router.patch('/:id/status', updateEnquiryStatus)
router.delete('/:id', deleteEnquiry)

export default router
