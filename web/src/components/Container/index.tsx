import { PropsWithChildren } from "react"
import style from "./style.module.css"

export default function Container({ children }: PropsWithChildren) {
  return <main className={style.container}>{children}</main>
}
