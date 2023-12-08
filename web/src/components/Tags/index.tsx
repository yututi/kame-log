import { PropsWithChildren } from 'react'
import styles from './style.module.css'

function Tags({ children }: PropsWithChildren) {
  return <ul className={styles.tags}>{children}</ul>
}

function TagItem({ text, color }: { text: string; color: string }) {
  return <li className={styles.tagItem}>{text}</li>
}

Tags.Item = TagItem

export default Tags
