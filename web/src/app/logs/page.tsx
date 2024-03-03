import { fetchLogs } from "@/features/devices/api"
import Template from "./Template"
import dayjs from "@/utils/timezonedDayjs"

export const revalidate = 60

export default async function Page() {
  const date = dayjs.tz()
  const logs = await fetchLogs(date)
  return <Template date={date.format("YYYY-MM-DD")} logs={logs}></Template>
}
