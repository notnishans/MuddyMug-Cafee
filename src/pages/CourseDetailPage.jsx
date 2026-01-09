import { useParams } from 'react-router-dom'
import PageStub from '../components/PageStub'
import { usePageMeta } from '../hooks/usePageMeta'

export default function CourseDetailPage() {
  const { slug } = useParams()
  usePageMeta(`Course: ${slug}`, `Details for this course at Muddy Mug Bakers & Brewers — coming soon.`)

  return <PageStub title={`Course: ${slug} — coming soon`} />
}
