import { describe, it, expect, vi } from 'vitest'
import { asyncHandler } from './asyncHandler.js'

describe('asyncHandler', () => {
  it('calls the wrapped handler with req, res, next', async () => {
    const handler = vi.fn().mockResolvedValue(undefined)
    const wrapped = asyncHandler(handler)
    const req = {}
    const res = {}
    const next = vi.fn()

    await wrapped(req, res, next)

    expect(handler).toHaveBeenCalledWith(req, res, next)
  })

  it('forwards a rejected promise to next() instead of throwing', async () => {
    const error = new Error('something failed')
    const handler = vi.fn().mockRejectedValue(error)
    const wrapped = asyncHandler(handler)
    const next = vi.fn()

    await wrapped({}, {}, next)

    expect(next).toHaveBeenCalledWith(error)
  })

  it('forwards a synchronous throw inside an async function to next()', async () => {
    const error = new Error('sync throw')
    const handler = vi.fn(async () => {
      throw error
    })
    const wrapped = asyncHandler(handler)
    const next = vi.fn()

    await wrapped({}, {}, next)

    expect(next).toHaveBeenCalledWith(error)
  })

  it('does not call next() when the handler succeeds', async () => {
    const handler = vi.fn().mockResolvedValue('ok')
    const wrapped = asyncHandler(handler)
    const next = vi.fn()

    await wrapped({}, {}, next)

    expect(next).not.toHaveBeenCalled()
  })
})
