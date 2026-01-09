import { useEffect } from 'react'

const SITE_NAME = 'Muddy Mug Bakers & Brewers'

/**
 * Sets document.title and the meta description for the current page.
 * A small imperative hook rather than react-helmet-async — this app
 * only needs to set two tags per route, not a full head-management
 * library.
 *
 * @param {string|null} title - Page-specific title, or null/undefined
 *   for the homepage, which just uses the site name on its own.
 * @param {string} description - Meta description for this page.
 */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME

    if (description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', description)
    }
  }, [title, description])
}
