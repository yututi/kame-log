import Container from "@/components/Container"
import Blog from "@/features/blogs/components/Blog"

export default async function Blogs({ params }: { params: { contentId: string } }) {

  return (
    <Container>
      <Blog contentId={params.contentId} />
    </Container>
  )
}