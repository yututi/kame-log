import { CSSProperties, ComponentProps, PropsWithChildren } from "react";
import styles from "./style.module.scss"
import Link, { LinkProps } from "next/link";
import { Theme } from "@/utils/theme";
import themeStyle from "@/styles/theme.module.scss"
import commonStyles from "@/styles/common.module.scss"

type Props = {
  theme?: Theme
  style?: CSSProperties
}
export default function Menu({ children, style, theme = "primaryContainer" }: PropsWithChildren<Props>) {

  return (
    <div style={style} className={`${styles.menu} ${themeStyle[theme]}`}>{children}</div>
  )
}

function Item({ children }: PropsWithChildren) {
  return (
    <div className={`${styles.item} ${commonStyles.highlight}`}>{children}</div>
  )
}
Menu.Item = Item

type ButtonProps = {
  onClick: () => void
}
function ButtonItem({ onClick, children }: PropsWithChildren<ButtonProps>) {
  return (
    <div onClick={onClick} className={`${styles.item} ${commonStyles.highlight}`}>{children}</div>
  )
}
Menu.ButtonItem = ButtonItem;

function LinkItem({ children, ...props }: PropsWithChildren<LinkProps>) {
  return (
    <Link {...props} className={`${styles.item} ${commonStyles.highlight}`}>{children}</Link>
  )
}
Menu.LinkItem = LinkItem;
