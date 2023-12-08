'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'
import styles from './style.module.scss'
import theme from '@/styles/theme.module.scss'
import commonStyles from '@/styles/common.module.scss'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'
import { Autoplay, Pagination } from 'swiper/modules'

type Banner = {
  src: string
  link: string
  title?: string
  description?: string
}

type Props = {
  banners: Banner[]
}

export default function HeroBanner(props: Props) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView='auto'
      centeredSlidesBounds
      autoplay
      pagination
      className={styles.swiper}
    >
      {props.banners?.map((banner, index) => (
        <SwiperSlide className={styles.slide} key={index}>
          <BannerImage value={banner} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

function BannerImage({ value }: { value: Banner }) {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <Link
      href={value.link}
      className={`${styles.bannerCard} ${theme.secondaryContainer} ${commonStyles.highlight}`}
    >
      <div className={styles.bannerImage} style={{ opacity: isLoaded ? 1 : 0 }}>
        <Image
          sizes='(max-width: 768px) 100vw, 50vw'
          src={value.src}
          alt={value.title || 'banner image'}
          style={{
            objectFit: 'cover',
          }}
          fill
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      {value.title && (
        <div className={styles.bannerCardDescription}>
          <h2>{value.title}</h2>
          <p>{value.description}</p>
        </div>
      )}
    </Link>
  )
}
