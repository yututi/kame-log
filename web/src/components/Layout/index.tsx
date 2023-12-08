import { PropsWithChildren } from 'react'
import commonStyle from '@/styles/common.module.scss'
import style from './style.module.scss'
import themeStyle from '@/styles/theme.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={style.layout}>
      <div className={style.body}>{children}</div>
    </div>
  )
}
