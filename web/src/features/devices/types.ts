export type MonitoringItem = "temperature" | "humidity"
export type Location = "room" | "baskingspot" | "shelter"

export type Log = {
  temperature?: number
  humidity?: number
  at: string
}

export type LogResponse = {
  baskingspot: Log[]
  shelter: Log[]
  room: Log[]
}
