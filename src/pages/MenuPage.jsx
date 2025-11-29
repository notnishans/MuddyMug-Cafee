import { PLACEHOLDER_IMAGES } from '../constants/placeholderImages'
import './MenuPage.css'

// REQUIRES BUSINESS CONFIRMATION: no verified menu items, categories,
// or prices exist yet. Per the project's authenticity rule, we do not
// invent them — this page is honest about that instead of faking a
// populated menu. Once real items/prices are provided, this becomes a
// real menu (likely backed by a MenuItem model — not built yet since
// there's no data to populate it with).
export default function MenuPage() {
  return (
    <div className="menu-page">
      <section className="menu-intro">
        <h1>Menu</h1>
        <p>
          We're putting together our full menu for the website. For our current coffee,
          beverage, and bakery offerings, the best way to see what's available right now is
          to visit us in person or check our{' '}
          <a
            href="https://www.instagram.com/muddymugbakersandbrewers/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Instagram
          </a>
          .
        </p>
      </section>

      <img
        src={PLACEHOLDER_IMAGES.bakeBakery.src}
        alt={PLACEHOLDER_IMAGES.bakeBakery.alt}
        className="menu-image"
        loading="lazy"
      />
    </div>
  )
}
