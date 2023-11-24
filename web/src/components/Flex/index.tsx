import { PropsWithChildren } from "react"

type Props = {
  direction?: "column"
  justify?: "center" | "flex-start" | "flex-end" | "space-between"
  alignItems?: "center"
  gap?: number
  className?: string
  wrap?: boolean
}

export default function Flex({
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: props.direction,
        justifyContent: props.justify,
        alignItems: props.alignItems,
        gap: `${props.gap}px`,
        flexWrap: props.wrap ? "wrap" : "initial",
      }}
    >
      {children}
    </div>
  )
}
