/**
 * Thin fetch wrapper factory. Deliberately a pure function with no
 * dependency on import.meta.env, so the core request logic can be
 * exercised directly with plain Node + native fetch, not just trusted
 * to work inside a Vite/browser context.
 */
export function createApiClient(baseUrl = '') {
  async function request(path, { method = 'GET', body, headers } = {}) {
    const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    let data = null
    try {
      data = await response.json()
    } catch {
      // No JSON body (e.g. empty response) — leave data as null.
    }

    if (!response.ok) {
      const error = new Error(data?.error || `Request failed with status ${response.status}`)
      error.status = response.status
      throw error
    }

    return data
  }

  return {
    get: (path, options = {}) => request(path, { method: 'GET', ...options }),
    post: (path, body, options = {}) => request(path, { method: 'POST', body, ...options }),
    put: (path, body, options = {}) => request(path, { method: 'PUT', body, ...options }),
    delete: (path, options = {}) => request(path, { method: 'DELETE', ...options }),
  }
}

/**
 * App-wide instance, configured from the environment. VITE_API_URL is
 * normally left empty in development — requests go out as relative
 * paths and are caught by Vite's dev proxy (see vite.config.js), which
 * forwards /api/* to the backend. Set VITE_API_URL to the deployed
 * backend's URL for production builds.
 */
export const apiClient = createApiClient(import.meta.env?.VITE_API_URL || '')
