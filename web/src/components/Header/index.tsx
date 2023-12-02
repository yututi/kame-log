import Image from "next/image"
import headerImage from "./header.jpg"
import style from "./style.module.scss"

export default function Header() {
  return (
    <header className={style.header}>
      <Image
        priority
        src={headerImage}
        fill
        sizes="100vw"
        alt="header"
        style={{
          objectFit: "cover",
        }}
      />
      <div
        style={{
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,100,0.16)",
        }}
      >
        <h1>リクガメ飼育ログ</h1>
        <p style={{ textAlign: "center", width: "70%" }}>
          リクガメ飼育の記録やケージ内のモニタリングなどを目的とした個人サイトです。
        </p>
      </div>
    </header>
  )
}
