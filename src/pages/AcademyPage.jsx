import { Link } from 'react-router-dom'
import IdentityCard from '../components/IdentityCard'
import { PLACEHOLDER_IMAGES } from '../constants/placeholderImages'
import { usePageMeta } from '../hooks/usePageMeta'
import './AcademyPage.css'

// REQUIRES BUSINESS CONFIRMATION: course fees, durations, curriculum,
// certificates, and requirements are not verified, so none appear
// here. All three cards link to /courses and /contact rather than to
// specific course details that don't exist yet.
export default function AcademyPage() {
  usePageMeta('Academy', 'Barista, bakery, and bartending training at Muddy Mug Bakers & Brewers in Pokhara.')

  return (
    <div className="academy-page">
      <section className="academy-intro">
        <h1>Academy</h1>
        <p>
          Muddy Mug's training centre teaches practical, hands-on hospitality skills in three
          areas: barista work, bakery, and bartending.
        </p>
      </section>

      <section className="academy-grid">
        <h2 className="academy-grid__heading">Our Training Areas</h2>
        <div className="academy-grid__cards">
          <IdentityCard
            image={PLACEHOLDER_IMAGES.learnAcademy}
            title="Barista Training"
            description="Hands-on training in coffee preparation and barista skills."
            linkTo="/courses"
            linkLabel="See Courses"
          />
          <IdentityCard
            image={PLACEHOLDER_IMAGES.bakeryTraining}
            title="Bakery Training"
            description="Practical training in bakery skills and techniques."
            linkTo="/courses"
            linkLabel="See Courses"
          />
          <IdentityCard
            image={PLACEHOLDER_IMAGES.bartendingTraining}
            title="Bartending Training"
            description="Practical training in bartending skills."
            linkTo="/courses"
            linkLabel="See Courses"
          />
        </div>
      </section>

      <section className="academy-cta">
        <h2>Interested in Training With Us?</h2>
        <p>Get in touch for more information about our courses.</p>
        <Link to="/contact" className="custom-button">
          Contact Us
        </Link>
      </section>
    </div>
  )
}
