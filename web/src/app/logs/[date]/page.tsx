import type { Dayjs } from "dayjs"
import Template from "../Template"
import { fetchLogs } from "@/features/devices/api"
import dayjs from "@/utils/timezonedDayjs"

export const revalidate = 60

export default async function Page({ params: { date } }: { params: { date: string } }) {
  const logs = await fetchLogs(dayjs(date))
  return <Template date={date} logs={logs}></Template>
}

export async function generateStaticParams() {
  return []
}
