import { get } from '@/services/cms/client'
import Head from 'next/head'
import markdown from '@/styles/markdown.module.scss'

type Props = {
  contentId: string
}

export default async function Blog({ contentId }: Props) {
  const data = await get('blog', contentId)

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <h1>{data.title}</h1>
      <section
        className={markdown.markdown}
        dangerouslySetInnerHTML={{
          __html: data.body,
        }}
      />
    </>
  )
}
