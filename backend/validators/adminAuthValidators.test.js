import { describe, it, expect } from 'vitest'
import { validateLoginInput } from './adminAuthValidators.js'

describe('validateLoginInput', () => {
  it('accepts a valid username and password', () => {
    const result = validateLoginInput({ username: 'admin', password: 'correct-horse' })
    expect(result.valid).toBe(true)
    expect(result.username).toBe('admin')
    expect(result.password).toBe('correct-horse')
  })

  it('rejects a missing username', () => {
    const result = validateLoginInput({ password: 'correct-horse' })
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/required/i)
  })

  it('rejects a missing password', () => {
    const result = validateLoginInput({ username: 'admin' })
    expect(result.valid).toBe(false)
  })

  it('rejects a whitespace-only username', () => {
    const result = validateLoginInput({ username: '   ', password: 'correct-horse' })
    expect(result.valid).toBe(false)
  })

  it('rejects an overly long username without leaking that as the reason', () => {
    const result = validateLoginInput({ username: 'a'.repeat(51), password: 'correct-horse' })
    expect(result.valid).toBe(false)
    // Deliberately the same generic message as wrong credentials —
    // shouldn't hint that length specifically is the problem.
    expect(result.error).toBe('Invalid username or password')
  })

  it('rejects an overly long password', () => {
    const result = validateLoginInput({ username: 'admin', password: 'a'.repeat(201) })
    expect(result.valid).toBe(false)
  })

  it('handles a missing/undefined body without throwing', () => {
    const result = validateLoginInput(undefined)
    expect(result.valid).toBe(false)
  })
})
