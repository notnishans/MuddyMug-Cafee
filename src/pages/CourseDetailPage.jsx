import { useParams } from 'react-router-dom'
import PageStub from '../components/PageStub'

export default function CourseDetailPage() {
  const { slug } = useParams()
  return <PageStub title={`Course: ${slug} — coming soon`} />
}
