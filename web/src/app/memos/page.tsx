import Container from '@/components/Container'
import MemoList from '@/features/memos/components/MemoList'
import Link from 'next/link'
import commonStyle from '@/styles/common.module.scss'
import themeStyle from '@/styles/theme.module.scss'
import Flex from '@/components/Flex'

export default function Blogs({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = Number(searchParams.page)
  return (
    <Container>
      <MemoList page={Number.isNaN(page) ? 1 : page} />
    </Container>
  )
}
