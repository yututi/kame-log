import Container from '@/components/Container'
import Flex from '@/components/Flex'
import Header from '@/components/Header'
import SiteTopBanner from '@/features/banner/components/SiteTopBanner'
import BlogList from '@/features/blogs/components/BlogList'
import DeviceStatusCard from '@/features/devices/components/DeviceStatusCard'
import commonStyle from '@/styles/common.module.scss'
import typography from '@/styles/typography.module.scss'

export default function Home() {
  return (
    <Container>
      <Header />
      <SiteTopBanner />
      <Flex direction='column' gap={8}>
        <h2 className={typography.heading}>温湿度</h2>
        <div className={commonStyle.threeColumns}>
          <DeviceStatusCard
            name='バスキングスポット'
            location='baskingspot'
            href='/logs'
          />
          <DeviceStatusCard name='シェルター' location='shelter' href='/logs' />
          <DeviceStatusCard name='室内' location='room' href='/logs' />
        </div>
      </Flex>

      <Flex direction='column' gap={8}>
        <h2 className={typography.heading}>ブログ</h2>
        <BlogList pageSize={3} />
      </Flex>
    </Container>
  )
}
