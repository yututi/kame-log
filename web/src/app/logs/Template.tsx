"use client"

import Container from "@/components/Container"
import LogGraph from "@/features/devices/components/LogGraph"
import LogGraphController from "@/features/devices/components/LogGraphController"
import { MonitoringItem, Location, LogResponse } from "@/features/devices/types"
import dayjs, { Dayjs } from "dayjs"
import { notFound, useRouter } from "next/navigation"
import { useState } from "react"

const allLocations: Location[] = ["baskingspot", "shelter", "room"]
const initialItem: MonitoringItem = "temperature"

export default function Tepmpate({ date, logs }: { date: string; logs: LogResponse }) {
  const [monitoringItem, setMonitoringItem] = useState<MonitoringItem>(initialItem)
  const [locations, setLocations] = useState<Location[]>(allLocations)
  const router = useRouter()

  const targetDate = dayjs(date)
  if (!targetDate.isValid()) {
    notFound()
  }

  return (
    <Container>
      <LogGraphController
        monitoringItem={monitoringItem}
        setMonitoringItem={setMonitoringItem}
        locations={locations}
        setLocations={setLocations}
        date={targetDate}
        setDate={function (date: Dayjs): void {
          router.push(`/logs/${date.format("YYYY-MM-DD")}/`)
        }}
      />
      <LogGraph logs={logs} monitoringItem={monitoringItem} locations={locations} />
    </Container>
  )
}
