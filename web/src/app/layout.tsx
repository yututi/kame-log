import 'ress'
import '@/styles/globals.scss'
import type { Metadata } from 'next'
import Layout from '@/components/Layout'
import Nav from '@/components/Nav'
import {
  faBook,
  faCalendarDays,
  faChartLine,
  faHome,
} from '@fortawesome/free-solid-svg-icons'

export const metadata: Metadata = {
  title: 'リクガメ飼育ブログ',
  description: 'リクガメの日々の飼育記録です。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body>
        <Nav>
          <Nav.Item icon={faHome} href={'/'} text='Home' />
          <Nav.Item icon={faChartLine} href={'/logs'} text='温湿度ログ' />
          <Nav.Item icon={faBook} href={'/blogs'} text='ブログ' />
          <Nav.Item icon={faCalendarDays} href={'/memos'} text='飼育メモ' />
        </Nav>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
