import { PLACEHOLDER_IMAGES } from '../constants/placeholderImages'
import './GalleryPage.css'

// REQUIRES BUSINESS CONFIRMATION: no real Muddy Mug photos exist yet.
// This shows the intended gallery layout using the same placeholder
// images already used elsewhere on the site, so replacing them later
// with real photos is a one-file change (placeholderImages.js), not a
// redesign of this page.
const GALLERY_ITEMS = [
  PLACEHOLDER_IMAGES.homeHero,
  PLACEHOLDER_IMAGES.brewCafe,
  PLACEHOLDER_IMAGES.bakeBakery,
  PLACEHOLDER_IMAGES.learnAcademy,
  PLACEHOLDER_IMAGES.bakeryTraining,
  PLACEHOLDER_IMAGES.bartendingTraining,
]

export default function GalleryPage() {
  return (
    <div className="gallery-page">
      <section className="gallery-intro">
        <h1>Gallery</h1>
        <p>
          We're building our real photo gallery. The images below show the intended layout
          using temporary placeholder photos — for actual current photos, see our{' '}
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

      <div className="gallery-grid">
        {GALLERY_ITEMS.map((image) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className="gallery-grid__image"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  )
}
