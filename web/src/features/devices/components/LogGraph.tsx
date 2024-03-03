import dynamic from "next/dynamic"
import dayjs, { Dayjs } from "dayjs"
import { range } from "lodash-es"
import { Log, LogResponse, MonitoringItem, Location } from "../types"

const LineGraph = dynamic(() => import("@/components/LineGraph"), {
  ssr: false,
})

const labels = range(0, 24)
  .map((h) => range(0, 6).map((m) => `${h}:${m}0`))
  .flat()

const allLocations: Location[] = ["baskingspot", "shelter", "room"]

type Props = {
  monitoringItem: MonitoringItem
  locations: Location[]
  logs: LogResponse
}

export default async function LogGraph({ monitoringItem, locations, logs }: Props) {
  const datasets = composeDatasets(logs, monitoringItem, locations)
  return <LineGraph datasets={datasets} labels={labels} />
}

const composeDatasets = (
  log: LogResponse | null,
  item: MonitoringItem,
  locations: Location[],
) => {
  const options = {
    room: {
      label: "部屋",
      color: {
        light: "gray",
        dark: "gray",
      },
    },
    baskingspot: {
      label: "バスキングスポット",
      color: {
        light: "orange",
        dark: "orange",
      },
    },
    shelter: {
      label: "シェルター",
      color: {
        light: "lightblue",
        dark: "lightblue",
      },
    },
  }

  return locations.map((location) => ({
    label: options[location].label,
    records: toRecord(log?.[location] || [], item),
    borderColor: options[location].color,
  }))
}

const toRecord = (logs: Log[], field: "temperature" | "humidity") => {
  return logs.reduce<{ [key: string]: number }>((all, log) => {
    const value = log[field]
    if (value == null) return all
    const key = dayjs(log.at).format("H:mm")
    all[key] = value
    return all
  }, {})
}
