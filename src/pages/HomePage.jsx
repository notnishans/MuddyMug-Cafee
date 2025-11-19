import { Link } from 'react-router-dom'
import IdentityCard from '../components/IdentityCard'
import { PLACEHOLDER_IMAGES } from '../constants/placeholderImages'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="home-page">
      <section
        className="home-hero"
        style={{ backgroundImage: `url(${PLACEHOLDER_IMAGES.homeHero.src})` }}
        role="img"
        aria-label={PLACEHOLDER_IMAGES.homeHero.alt}
      >
        <div className="home-hero__overlay">
          <div className="home-hero__content">
            <h1>Muddy Mug Bakers & Brewers</h1>
            <p>
              Café, bakery, and a hospitality training centre for barista, bakery, and
              bartending skills, in Mahendra Pool, Pokhara.
            </p>
            <div className="home-hero__actions">
              <Link to="/menu" className="custom-button">
                View Menu
              </Link>
              <Link to="/academy" className="custom-button custom-button--outline">
                Explore Academy
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-section__heading">Brew. Bake. Learn.</h2>
        <div className="home-identity-grid">
          <IdentityCard
            image={PLACEHOLDER_IMAGES.brewCafe}
            title="Brew"
            description="Coffee, brewed and served in our café."
            linkTo="/cafe"
            linkLabel="Visit the Café"
          />
          <IdentityCard
            image={PLACEHOLDER_IMAGES.bakeBakery}
            title="Bake"
            description="Bakery items made in-house."
            linkTo="/menu"
            linkLabel="See the Menu"
          />
          <IdentityCard
            image={PLACEHOLDER_IMAGES.learnAcademy}
            title="Learn"
            description="Hands-on training in barista, bakery, and bartending skills."
            linkTo="/academy"
            linkLabel="Explore the Academy"
          />
        </div>
      </section>

      <section className="home-section home-about">
        <h2 className="home-section__heading">About Muddy Mug</h2>
        <p>
          Muddy Mug Bakers & Brewers is a café, bakery, and training centre in Pokhara,
          teaching barista, bakery, and bartending skills alongside its everyday café and
          bakery work.
        </p>
        <Link to="/about" className="identity-card__link">
          About Muddy Mug →
        </Link>
      </section>

      <section className="home-section home-location">
        <h2 className="home-section__heading">Find Us</h2>
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
