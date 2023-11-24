import { PropsWithChildren } from "react"
import style from "./style.module.scss"

export default function Sheet({ children }: PropsWithChildren) {
  return <div className={style.sheet}>{children}</div>
}
