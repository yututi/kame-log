import { Theme } from "@/utils/theme"
import themeStyle from "@/styles/theme.module.scss"
import commonStyle from "@/styles/common.module.scss"
import { CSSProperties, PropsWithChildren } from "react"

type Props = {
  theme?: Theme
  style?: CSSProperties
  className?: string
}

export default function Card({
  theme = "primaryContainer",
  style,
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      style={style}
      className={`${commonStyle.card} ${themeStyle[theme]} ${className}`}
    >
      {children}
    </div>
  )
}

function CardContent({ children }: PropsWithChildren) {
  return <div className={commonStyle.cardContent}>{children}</div>
}
function CardAction({ children }: PropsWithChildren) {
  return <div className={commonStyle.cardAction}>{children}</div>
}

Card.Content = CardContent
Card.Action = CardAction
