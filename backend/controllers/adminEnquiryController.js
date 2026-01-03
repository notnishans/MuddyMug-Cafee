import mongoose from 'mongoose'
import Enquiry from '../models/Enquiry.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const VALID_STATUSES = ['new', 'read', 'archived']

function requireValidId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('Invalid enquiry ID')
    err.status = 400
    throw err
  }
}

export const listEnquiries = asyncHandler(async (req, res) => {
  // No pagination yet — a small business's enquiry volume doesn't
  // need it today. Capped at 200 so this stays bounded if it grows;
  // revisit with real pagination if that cap is ever actually hit.
  const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(200)
  res.json({ success: true, enquiries })
})

export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  requireValidId(req.params.id)

  const { status } = req.body || {}
  if (!VALID_STATUSES.includes(status)) {
    const err = new Error(`Status must be one of: ${VALID_STATUSES.join(', ')}`)
    err.status = 400
    throw err
  }

  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true })
  if (!enquiry) {
    const err = new Error('Enquiry not found')
    err.status = 404
    throw err
  }

  res.json({ success: true, enquiry })
})

export const deleteEnquiry = asyncHandler(async (req, res) => {
  requireValidId(req.params.id)

  const enquiry = await Enquiry.findByIdAndDelete(req.params.id)
  if (!enquiry) {
    const err = new Error('Enquiry not found')
    err.status = 404
    throw err
  }

  res.json({ success: true, message: 'Enquiry deleted' })
})
