import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="page-stub">
      <h1>Page not found</h1>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </div>
  )
}
