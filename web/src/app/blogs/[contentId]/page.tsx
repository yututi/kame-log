import Container from "@/components/Container"
import Blog from "@/features/blogs/components/Blog"
import { get } from "@/services/cms/client"
import Link from "next/link"
import { Metadata, ResolvingMetadata } from "next/types"
import commonStyle from "@/styles/common.module.scss"
import themeStyle from "@/styles/theme.module.scss"
import Flex from "@/components/Flex"

type Props = {
  contentId: string
}

export const revalidate = 3600

export default async function Blogs({ params }: { params: Props }) {
  return (
    <Container>
      <BackToList />
      <Blog contentId={params.contentId} />
    </Container>
  )
}

function BackToList() {
  return (
    <Flex>
      <Link href={"/blogs"} className={`${commonStyle.button} ${themeStyle.secondary}`}>
        一覧に戻る
      </Link>
    </Flex>
  )
}

export async function generateMetadata(
  { params }: { params: Props },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const data = await get("blog", params.contentId)
  const { title } = await parent
  return {
    title: `${data.title} | ${title?.absolute}`,
    description: data.metaDescription,
    keywords: data.keywords,
  }
}

export async function generateStaticParams() {
  return []
}
