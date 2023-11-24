export type DeviceStatusResponse = {
  statusCode: number
  body: {
    deviceId: string
    deviceType: string
    humidity: number
    temperature: number
    version: string
    battery: number
  }
  message: string
}
