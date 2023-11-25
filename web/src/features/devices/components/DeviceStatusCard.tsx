import Card from '@/components/Card'
import commonStyle from '@/styles/common.module.scss'
import typography from '@/styles/typography.module.scss'
import Flex from '@/components/Flex'
import Link from 'next/link'
import themeStyle from '@/styles/theme.module.scss'
import DeviceStatus from './DeviceStatus'
import { Location } from '../types'

type Props = {
  name: string
  location: Location
  href: string
}

export default function DeviceStatusCard({ name, location, href }: Props) {
  return (
    <Card>
      <Card.Content>
        <p className={typography.subtitle} style={{ marginBottom: '8px' }}>
          {name}
        </p>
        <Flex direction='column' gap={8}>
          <DeviceStatus location={location} />
        </Flex>
      </Card.Content>
      <Card.Action>
        <Link
          href={href}
          className={`${commonStyle.button} ${commonStyle.highlight} ${themeStyle['primary']}`}
        >
          ログを見る
        </Link>
      </Card.Action>
    </Card>
  )
}
