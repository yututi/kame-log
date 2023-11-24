import { FC, PropsWithChildren } from "react"
import commonStyle from "@/styles/common.module.scss"
import style from "./style.module.css"
import themeStyle from "@/styles/theme.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

export default function Layout({ children }: PropsWithChildren) {
  return <div className={style.body}>{children}</div>
}

const GitHub = () => {
  return (
    <button className={`${commonStyle.iconButton} ${themeStyle.surfaceContainer}`}>
      <FontAwesomeIcon className={commonStyle.icon} icon={faGithub} />
    </button>
  )
}
