import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import styles from "./style.module.scss"
import commonStyle from "@/styles/common.module.scss"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import Link from "next/link"
import { PropsWithChildren } from "react"

type Props = {
  active?: boolean
}

export default function Nav({ active = false, children }: PropsWithChildren<Props>) {
  return <nav className={`${styles.nav} ${active && styles.active}`}>{children}</nav>
}

type ItemPropsBase = {
  icon: IconProp
  text: string
}

type ItemProps = (
  | {
      onClick: () => void
    }
  | {
      href: string
    }
) &
  ItemPropsBase

Nav.Item = function NavItem(props: ItemProps) {
  const inner = (
    <>
      <FontAwesomeIcon className={commonStyle.icon} icon={props.icon} />
      <span>{props.text}</span>
    </>
  )

  if ("onClick" in props) {
    return (
      <button onClick={props.onClick} className={styles.navItem}>
        {inner}
      </button>
    )
  }
  return (
    <Link href={props.href} className={`${styles.navItem} ${commonStyle.highlight}`}>
      {inner}
    </Link>
  )
}
