import Container from "@/components/Container"
import { get } from "@/services/cms/client"

export default async function Blog({ contentId }: { contentId: string }) {
  const data = await get("blog", contentId)

  return (
    <section
      dangerouslySetInnerHTML={{
        __html: data.body,
      }}
    />
  )
}
