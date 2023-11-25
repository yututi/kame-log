import BlogList from '@/features/blogs/components/BlogList'
import Container from '@/components/Container'

export default function Blogs() {
  return (
    <Container>
      <BlogList pagination pageSize={12} />
    </Container>
  )
}
