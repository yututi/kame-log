import Card from "@/components/Card"
import { getList, createListQuery } from "@/services/cms/client"
import dayjs from "dayjs"
import Link from "next/link"
import { ReadonlyURLSearchParams } from "next/navigation"
import commonStyle from "@/styles/common.module.scss"
import themeStyle from "@/styles/theme.module.scss"
import Flex from "@/components/Flex"

type Props = {
  page?: number
}

export default async function MemoList({ page = 1 }: Props) {
  const data = await getList(
    "memo",
    createListQuery({
      limit: 10,
      offset: (page - 1) * 10,
      orders: "at",
    }),
  )

  return (
    <Flex direction="column" gap={8}>
      <Flex justify="space-between">
        <Link
          className={`${commonStyle.button} ${themeStyle.primary} ${
            page === 1 && commonStyle.disabled
          }`}
          href={`/memos?page=${page - 1}`}
        >
          前10件
        </Link>
        <Link
          className={`${commonStyle.button} ${themeStyle.primary} ${
            data.totalCount <= page * 10 && commonStyle.disabled
          }`}
          href={`/memos?page=${page + 1}`}
        >
          次10件
        </Link>
      </Flex>
      {data.contents.map((content) => (
        <Card key={content.id}>
          <Card.Content>
            <div>{dayjs(content.at).format("YYYY/MM/DD")}</div>
            <div>{content.memo}</div>
            {content.feeds.length > 0 && (
              <div>エサ: {content.feeds.map((feed) => feed.name).join(", ")}</div>
            )}
          </Card.Content>
        </Card>
      ))}
    </Flex>
  )
}
