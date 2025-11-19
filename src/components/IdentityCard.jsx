import { Link } from 'react-router-dom'
import './IdentityCard.css'

// Reusable card for the Brew / Bake / Learn overview on the homepage.
export default function IdentityCard({ image, title, description, linkTo, linkLabel }) {
  return (
    <div className="identity-card">
      <img src={image.src} alt={image.alt} className="identity-card__image" loading="lazy" />
      <div className="identity-card__body">
        <h3 className="identity-card__title">{title}</h3>
        <p className="identity-card__description">{description}</p>
        <Link to={linkTo} className="identity-card__link">
          {linkLabel} →
        </Link>
      </div>
    </div>
  )
}
