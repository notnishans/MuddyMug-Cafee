import { usePageMeta } from '../hooks/usePageMeta'
import './ReviewsPage.css'

// REQUIRES BUSINESS CONFIRMATION: no verified customer testimonials
// exist. Per the project's authenticity rule, fabricating example
// reviews is explicitly off the table — unlike images, there's no
// override permission for placeholder testimonials. This links to
// places real reviews may already exist instead of inventing any.
export default function ReviewsPage() {
  usePageMeta('Reviews', 'Customer reviews for Muddy Mug Bakers & Brewers in Pokhara.')

  return (
    <div className="reviews-page">
      <h1>Reviews</h1>
      <p>
        We haven't added customer reviews to the website yet. You can see what people are
        saying on our{' '}
        <a href="https://www.facebook.com/muddymug/" target="_blank" rel="noreferrer noopener">
          Facebook page
        </a>{' '}
        or on{' '}
        <a
          href="https://wanderboat.ai/restaurants/nepal/pokhara/muddy-mug-bakers-%26-brewers-barista-%2C-bakery-%26-bartending-training-centre/9HwqCZSlTECrrZ42B-LxAA"
          target="_blank"
          rel="noreferrer noopener"
        >
          Wanderboat
        </a>
        .
      </p>
    </div>
  )
}
