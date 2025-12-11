import Enquiry from '../models/Enquiry.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { validateEnquiryInput } from '../validators/enquiryValidators.js'

export const createEnquiry = asyncHandler(async (req, res) => {
  const result = validateEnquiryInput(req.body)

  if (!result.valid) {
    // Spam caught by the honeypot gets a plain 400 with no specific
    // detail — no reason to tell a bot which field gave it away.
    if (result.isSpam) {
      return res.status(400).json({ success: false, error: 'Submission rejected' })
    }
    const err = new Error(result.error)
    err.status = 400
    throw err
  }

  // Only known fields ever reach Mongoose — never the raw body —
  // so a submission can't inject unexpected fields into the document.
  const { name, email, phone, subject, message, courseInterest } = result
  await Enquiry.create({ name, email, phone, subject, message, courseInterest })

  res.status(201).json({ success: true, message: 'Enquiry received' })
})
