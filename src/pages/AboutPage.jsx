import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import './AboutPage.css'

// Intentionally text-focused and modest in length. Founder names,
// business history, awards, and similar "about us" content that sites
// like this usually carry are not included — none of it is verified,
// and per the project's authenticity rule, an incomplete page beats a
// fabricated one. Add those sections once REQUIRES BUSINESS
// CONFIRMATION items are actually confirmed.
export default function AboutPage() {
  usePageMeta('About', 'About Muddy Mug Bakers & Brewers, a café, bakery, and hospitality training centre in Pokhara.')

  return (
    <div className="about-page">
      <section className="about-intro">
        <h1>About Muddy Mug</h1>
        <p>
          Muddy Mug Bakers & Brewers is a café, bakery, and hospitality training centre in
          Mahendra Pool, Pokhara. It brings together three things under one roof: a working
          café and bakery, and a training centre teaching barista, bakery, and bartending
          skills.
        </p>
      </section>

      <section className="about-block">
        <h2>Café</h2>
        <p>Coffee and beverages, served in our café.</p>
      </section>

      <section className="about-block">
        <h2>Bakery</h2>
        <p>Bakery items made in-house, part of the everyday café menu.</p>
      </section>

      <section className="about-block">
        <h2>Academy</h2>
        <p>
          Practical, hands-on training in three areas: barista skills, bakery skills, and
          bartending. See the{' '}
          <Link to="/academy">Academy page</Link> for more.
        </p>
      </section>

      <section className="about-location">
        <h2>Where We Are</h2>
        <p>Mahendra Pool, Pokhara, Gandaki Province 33700, Nepal</p>
        <p>
          <a href="tel:+9779811759805">+977 9811759805</a>
        </p>
        <Link to="/contact" className="custom-button">
          Get in Touch
        </Link>
      </section>
    </div>
  )
}
