import { StaticImport } from "next/dist/shared/lib/get-img-props";
import NextImage from "next/image";
import style from "./style.module.css"

type Props = {
  src: string | StaticImport;
  alt: string;
  className: string;
}

/**
 * レスポンシブ対応させる場合のImageコンポーネント
 */
export default function Image(props: Props) {

  return (
    <div className={[style.imageWrapper, props.className].join(" ")}>
      <NextImage src={props.src} alt={props.alt} layout="fill" />
    </div>
  )
}