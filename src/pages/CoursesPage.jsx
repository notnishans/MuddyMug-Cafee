import { Link } from 'react-router-dom'
import './CoursesPage.css'

// REQUIRES BUSINESS CONFIRMATION: course fees, durations, curriculum,
// requirements, and certificates are not verified, so no individual
// course listings appear here. This links out to the Academy page
// (which describes the three training areas generally) and to Contact
// for enquiries, rather than fabricating a course catalog.
export default function CoursesPage() {
  return (
    <div className="courses-page">
      <h1>Courses</h1>
      <p>
        We're finalizing detailed course information for the website — fees, duration, and
        what's covered in each course. In the meantime, see the{' '}
        <Link to="/academy">Academy page</Link> for an overview of our barista, bakery, and
        bartending training, or get in touch directly with any questions.
      </p>
      <Link to="/contact" className="custom-button">
        Enquire About a Course
      </Link>
    </div>
  )
}
