import Flex from '@/components/Flex'
import { createListQuery, getList } from '@/services/cms/client'
import typography from '@/styles/typography.module.scss'
import Card from '@/components/Card'
import Link from 'next/link'
import commonStyle from '@/styles/common.module.scss'
import themeStyle from '@/styles/theme.module.scss'
import dayjs from 'dayjs'

type Props = {
  page?: number
  pageSize?: number
  pagination?: boolean
}

export default async function BlogList({
  page = 1,
  pageSize = 3,
  pagination = false,
}: Props) {
  const data = await getList(
    'blog',
    createListQuery({
      fields: ['id', 'title', 'tags', 'publishedAt', 'revisedAt'],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    }),
  )

  if (data.totalCount === 0) return null

  const list = (
    <div className={commonStyle.threeColumns}>
      {data.contents.map((content) => (
        <Card key={content.id}>
          <Card.Image>{tagsToEmoji(content.tags)}</Card.Image>
          <Card.Content>
            <span className={typography.subtitle}>{content.title}</span>

            <div className={typography.subtext}>
              {dayjs(content.publishedAt).format('YYYY/MM/DD')}
            </div>
          </Card.Content>
          <Card.Action>
            <Link
              className={`${commonStyle.button} ${themeStyle.primary}`}
              href={`/blogs/${content.id}`}
            >
              読む
            </Link>
          </Card.Action>
        </Card>
      ))}
    </div>
  )

  if (pagination) {
    return (
      <Flex direction='column' gap={8}>
        <Flex justify='space-between'>
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
        {list}
      </Flex>
    )
  }
  return list
}

const tagsToEmoji = (tags: string[]) => {
  const emojis = []
  if (tags.includes('日記')) {
    emojis.push('🐢')
  }
  if (tags.includes('テックブログ')) {
    emojis.push('💻')
  }
  return emojis.join()
}
