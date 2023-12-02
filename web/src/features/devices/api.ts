import { get as getStorage } from "@/services/gc/storage"
import { Log, Location } from "./types"
import { getDeviceStatus } from "@/services/switchbot/client"

/**
 * 指定日のログを取得する。timezoneはUTC
 */
export const getLog = async (year: number, month: number, date: number) => {
  const lpad = (val: number) => String(val).padStart(2, "0")
  const filename = `${year}${lpad(month)}${lpad(date)}.json`

  const [baskingspot, shelter, room] = await Promise.all([
    downloadLog(`baskingspot/${filename}`),
    downloadLog(`shelter/${filename}`),
    downloadLog(`room/${filename}`),
  ])

  return {
    baskingspot,
    shelter,
    room,
  }
}

const downloadLog = async (path: string) => {
  const response = await getStorage("km-capture", path)
  if (!response) return []
  const [buf] = response
  return JSON.parse(buf.toString("utf-8")) as Log[]
}

export const getDeviceStatusByLocation = (location: Location): Promise<Log | null> => {
  const locationToDevId = {
    room: process.env.METER_AT_ROOM,
    shelter: process.env.METER_AT_SHELTER,
    baskingspot: process.env.METER_AT_BASKINGSPOT,
  }
  const devId = locationToDevId[location]
  if (!devId) return Promise.resolve(null)
  return getDeviceStatus(devId).then((response) => {
    return {
      temperature: response?.body.temperature,
      humidity: response?.body.humidity,
      at: new Date().toISOString(),
    }
  })
}
