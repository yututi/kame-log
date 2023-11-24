import { PropsWithChildren } from "react";
import styles from "./style.module.scss"

function List({ children }: PropsWithChildren) {
  return (
    <ul className={styles.list}>{children}</ul>
  )
}

function ListItem({ children }: PropsWithChildren) {
  return <li className={styles.listItem}>{children}</li>
}

List.Item = ListItem;
List.itemStyle = styles.listItem;

export default List;