import type { Dayjs } from "dayjs"
import Template from "../Template"
import { fetchLogs } from "@/features/devices/api"
import dayjs from "dayjs"

export const revalidate = 60

export default async function Page({ params: { date } }: { params: { date: string } }) {
  console.log({ date })
  const parsedDate = dayjs(date)
  console.log(parsedDate.format("YYYY-MM-DD"))
  const logs = await fetchLogs(parsedDate)
  return <Template date={date} logs={logs}></Template>
}
