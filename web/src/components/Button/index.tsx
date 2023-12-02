import { PropsWithChildren } from "react"
import style from "@/styles/common.module.scss"
import themeStyle from "@/styles/theme.module.scss"
import { Theme } from "@/utils/theme"

type Props = {
  onClick: () => void
  theme?: Theme
  size?: "sm" | "md"
}

export default function Button({
  children,
  onClick,
  theme = "primary",
  size = "md",
}: PropsWithChildren<Props>) {
  return (
    <button
      className={`${style.button} ${themeStyle[theme]} ${style[size]} ${style.highlight}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
