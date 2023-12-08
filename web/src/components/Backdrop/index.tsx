import { PropsWithChildren } from 'react'
import styles from './style.module.scss'

type Props = {
  absolute?: boolean
}

export default function Backdrop({ absolute, children }: PropsWithChildren<Props>) {
  return (
    <div
      className={styles.backdrop}
      style={{ position: absolute ? 'absolute' : 'fixed' }}
    >
      {children}
    </div>
  )
}
