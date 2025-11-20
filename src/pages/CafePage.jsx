import { Link } from 'react-router-dom'
import { PLACEHOLDER_IMAGES } from '../constants/placeholderImages'
import './CafePage.css'

// No menu items, prices, or hours here — none are verified. This page
// describes the café generally; actual items belong on the Menu page
// once real data is available.
export default function CafePage() {
  return (
    <div className="cafe-page">
      <section
        className="cafe-hero"
        style={{ backgroundImage: `url(${PLACEHOLDER_IMAGES.homeHero.src})` }}
        role="img"
        aria-label={PLACEHOLDER_IMAGES.homeHero.alt}
      >
        <div className="cafe-hero__overlay">
          <h1>Café</h1>
        </div>
      </section>

      <section className="cafe-intro">
        <p>
          Coffee, beverages, and bakery items, served in our café at Mahendra Pool, Pokhara.
          The café is also where our barista, bakery, and bartending students put their
          training into practice.
        </p>
      </section>

      <section className="cafe-feature">
        <img
          src={PLACEHOLDER_IMAGES.brewCafe.src}
          alt={PLACEHOLDER_IMAGES.brewCafe.alt}
          className="cafe-feature__image"
          loading="lazy"
        />
        <div className="cafe-feature__text">
          <h2>Coffee & Beverages</h2>
          <p>Coffee and other beverages, made and served in our café.</p>
          <Link to="/menu" className="custom-button">
            See the Menu
          </Link>
        </div>
      </section>

      <section className="cafe-location">
        <h2>Visit Us</h2>
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
