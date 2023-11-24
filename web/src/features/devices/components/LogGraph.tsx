"use client"

import LineGraph from "@/components/LineGraph";
import dayjs from "dayjs";
import { range } from "lodash-es";
import useFetch from "@/hooks/useFetch";
import { Log, LogResponse, MonitoringItem, Location } from "../types";
import { useMemo, useState } from "react";
import Flex from "@/components/Flex";
import Button from "@/components/Button";
import Sheet from "@/components/Sheet";


const labels = range(0, 24).map(h => range(0, 6).map(m => `${h}:${m}0`)).flat();

const allLocations: Location[] = ["baskingspot", "shelter", "room"];

type Props = {
  initialItem?: MonitoringItem
}

export default function LogGraph({ initialItem = "temperature" }: Props) {

  const [date, setDate] = useState(dayjs().hour(0).minute(0).second(0).millisecond(0))
  const log = useFetch<LogResponse>(`/api/logs?${new URLSearchParams({
    date: date.format("YYYY-MM-DD")
  })}`)

  const [monitoringItem, setMonitoringItem] = useState<MonitoringItem>(initialItem)
  const [locations, setLocations] = useState<Location[]>(allLocations)

  const datasets = useMemo(() => composeDatasets(log, monitoringItem, locations), [locations, monitoringItem, log])

  return (
    <Flex direction="column">
      <Sheet>
        <Button onClick={() => { setDate(date.subtract(1, "day")) }}>前の日</Button>
        <Button onClick={() => { setDate(date.add(1, "day")) }}>次の日</Button>
        <Button onClick={() => { setMonitoringItem("temperature") }}>温度</Button>
        <Button onClick={() => { setMonitoringItem("humidity") }}>湿度</Button>
      </Sheet>
      <LineGraph
        datasets={datasets}
        labels={labels}
      />
    </Flex>
  )
}

const composeDatasets = (log: LogResponse | null, item: MonitoringItem, locations: Location[]) => {

  const options = {
    room: {
      label: "部屋",
      color: {
        light: "gray",
        dark: "gray"
      }
    },
    baskingspot: {
      label: "バスキングスポット",
      color: {
        light: "orange",
        dark: "orange"
      }
    },
    shelter: {
      label: "シェルター",
      color: {
        light: "lightblue",
        dark: "lightblue"
      }
    }
  }

  return locations.map(location => ({
    label: options[location].label,
    records: toRecord(log?.[location] || [], item),
    borderColor: options[location].color
  }))
}

const toRecord = (logs: Log[], field: "temperature" | "humidity") => {
  return logs.reduce<{ [key: string]: number }>((all, log) => {
    const value = log[field]
    if (value == null) return all;
    const key = dayjs(log.at).format("H:mm")
    all[key] = value
    return all
  }, {})
}
