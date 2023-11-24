import { getLog } from "@/features/devices/api"
import dayjs from "dayjs"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const date = dayjs(params.get("date"), "YYYY-MM-DD")
  const now = dayjs().hour(0).minute(0).second(0).millisecond(0)

  if (!date.isValid()) return NextResponse.json({}, { status: 400 })

  return NextResponse.json(await getLog(date.year(), date.month() + 1, date.date()), {
    headers: {
      // 前日以降のデータであれば可能な限りキャッシュする
      "Cache-Control": `max-age=${
        date.isBefore(now) ? 60 * 60 * 24 * 365 : 60 * 10
      }, immutable`,
    },
  })
}
