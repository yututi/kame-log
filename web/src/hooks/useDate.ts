import { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'

// vercelのタイムゾーンをいじれないのでサーバ側で日付をレンダリングするとハイドレーションエラーになる。
// なので、日付をローカルだけで利用するようにするためのフック
export default function useDate(initialDate: Dayjs) {
  const [date, setDate] = useState<Dayjs>()
  useEffect(() => {
    setDate(initialDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [date, setDate] as const
}
