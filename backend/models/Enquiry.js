import mongoose from 'mongoose'

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, trim: true, maxlength: 30 },
    subject: { type: String, required: true, trim: true, maxlength: 150 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    courseInterest: { type: String, trim: true, maxlength: 50 },
    // Not exposed via the API yet — groundwork for the admin
    // dashboard's enquiry inbox (Phase 16), so enquiries have a
    // natural read/unread state from day one instead of retrofitting one.
    status: { type: String, enum: ['new', 'read', 'archived'], default: 'new' },
  },
  { timestamps: true }
)

const Enquiry = mongoose.model('Enquiry', enquirySchema)

export default Enquiry
