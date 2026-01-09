import { PLACEHOLDER_IMAGES } from '../constants/placeholderImages'
import { usePageMeta } from '../hooks/usePageMeta'
import './StudentLifePage.css'

// REQUIRES BUSINESS CONFIRMATION: no verified student stories, events,
// or activity photos exist yet. Instagram shows story highlights for
// various trips, but their context (student excursions vs. something
// else) isn't confirmed, so none of that content is used here.
export default function StudentLifePage() {
  usePageMeta('Student Life', 'Student life and training activities at Muddy Mug Bakers & Brewers in Pokhara.')

  return (
    <div className="student-life-page">
      <h1>Student Life</h1>
      <p>
        We're putting together real photos and stories from our training sessions and
        student activities. In the meantime, you can see current activity on our{' '}
        <a
          href="https://www.instagram.com/muddymugbakersandbrewers/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Instagram
        </a>
        .
      </p>
      <img
        src={PLACEHOLDER_IMAGES.learnAcademy.src}
        alt={PLACEHOLDER_IMAGES.learnAcademy.alt}
        className="student-life-image"
        loading="lazy"
      />
    </div>
  )
}
