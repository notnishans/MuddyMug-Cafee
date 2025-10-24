import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

// Nav links intentionally exclude /courses/:slug (not a top-level
// destination) and /admin/login (not part of the public nav).
const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/cafe', label: 'Café' },
  { to: '/menu', label: 'Menu' },
  { to: '/academy', label: 'Academy' },
  { to: '/courses', label: 'Courses' },
  { to: '/student-life', label: 'Student Life' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        {/* Text-only lettermark — no logo image exists yet. Replace
            with the real Muddy Mug logo once provided. */}
        <NavLink to="/" className="site-header__logo" onClick={() => setMenuOpen(false)}>
          <span className="site-header__logo-mark" aria-hidden="true">
            MM
          </span>
          <span className="site-header__logo-text">Muddy Mug</span>
        </NavLink>

        <button
          type="button"
          className="site-header__toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="site-header__toggle-bar" />
          <span className="site-header__toggle-bar" />
          <span className="site-header__toggle-bar" />
        </button>

        <nav
          className={`site-header__nav ${menuOpen ? 'site-header__nav--open' : ''}`}
          aria-label="Primary"
        >
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `site-header__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
