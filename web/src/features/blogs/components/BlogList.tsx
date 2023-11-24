import Flex from "@/components/Flex"
import List from "@/components/List"
import Tags from "@/components/Tags"
import { createListQuery, getList } from "@/services/cms/client"
import dayjs from "dayjs"
import Link from "next/link"
import listStyle from "@/components/List/style.module.scss"
import typoStyle from "@/styles/typography.module.scss"
import Card from "@/components/Card"
import Menu from "@/components/Menu"

type Props = {
  asWidget?: boolean;
}

export default async function BlogList({ asWidget }: Props) {
  const data = await getList("blog", createListQuery({
    fields: ["id", "title", "tags", "publishedAt", "revisedAt"],
    limit: asWidget ? 4 : 10
  }))

  if (data.totalCount === 0) return null;

  return (
    <Flex direction="column" gap={8}>
      <h2 className={typoStyle.heading}>
        飼育メモ
      </h2>
      <Menu>
        {data.contents.map(content => (
          <Menu.LinkItem
            key={content.id}
            href={`/blogs/${content.id}`}>
            <span className={typoStyle.body}>{content.title}</span>
          </Menu.LinkItem>
        ))}
      </Menu>
    </Flex>
  )
}