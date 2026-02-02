import { describe, it, expect } from 'vitest'
import { validateEnquiryInput } from './enquiryValidators.js'

const VALID_BODY = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '9800000000',
  subject: 'Question about training',
  message: 'Hello, I would like to know more.',
  courseInterest: 'Barista Training',
}

describe('validateEnquiryInput', () => {
  it('accepts a fully valid submission', () => {
    const result = validateEnquiryInput(VALID_BODY)
    expect(result.valid).toBe(true)
    expect(result.name).toBe('Jane Doe')
    expect(result.email).toBe('jane@example.com')
  })

  it('accepts a submission with only the required fields', () => {
    const result = validateEnquiryInput({
      name: 'Jane',
      email: 'jane@example.com',
      subject: 'Hi',
      message: 'Question',
    })
    expect(result.valid).toBe(true)
    expect(result.phone).toBe('')
    expect(result.courseInterest).toBe('')
  })

  it('trims whitespace from every field', () => {
    const result = validateEnquiryInput({
      ...VALID_BODY,
      name: '  Jane Doe  ',
      email: '  jane@example.com  ',
    })
    expect(result.name).toBe('Jane Doe')
    expect(result.email).toBe('jane@example.com')
  })

  it.each(['name', 'email', 'subject', 'message'])('rejects a missing %s', (field) => {
    const body = { ...VALID_BODY, [field]: '' }
    const result = validateEnquiryInput(body)
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/required/i)
  })

  it('rejects an obviously invalid email', () => {
    const result = validateEnquiryInput({ ...VALID_BODY, email: 'not-an-email' })
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/valid email/i)
  })

  it('rejects a message over the length limit', () => {
    const result = validateEnquiryInput({ ...VALID_BODY, message: 'a'.repeat(2001) })
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/maximum length/i)
  })

  it('accepts a message right at the length limit', () => {
    const result = validateEnquiryInput({ ...VALID_BODY, message: 'a'.repeat(2000) })
    expect(result.valid).toBe(true)
  })

  it('flags a filled honeypot as spam without exposing which field caught it', () => {
    const result = validateEnquiryInput({ ...VALID_BODY, website: 'http://spam.example' })
    expect(result.valid).toBe(false)
    expect(result.isSpam).toBe(true)
    expect(result.error).not.toMatch(/honeypot|website/i)
  })

  it('handles a missing/undefined body without throwing', () => {
    const result = validateEnquiryInput(undefined)
    expect(result.valid).toBe(false)
  })

  it('does not choke on non-string field values', () => {
    const result = validateEnquiryInput({ ...VALID_BODY, name: 12345 })
    expect(result.valid).toBe(true)
    expect(result.name).toBe('12345')
  })
})
