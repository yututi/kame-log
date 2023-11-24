import { createHmac } from "crypto"
import { DeviceStatusResponse } from "./types"

const createHeaders = () => {
  const token = process.env.SWITCHBOT_TOKEN || ""
  const secret = process.env.SWITCHBOT_SECRET || ""
  const t = Date.now()
  const nonce = "requestID"
  const data = token + t + nonce
  const signTerm = createHmac("sha256", secret)
    .update(Buffer.from(data, "utf-8"))
    .digest()
  const sign = signTerm.toString("base64")

  return {
    Authorization: token,
    sign: sign,
    nonce: nonce,
    t: String(t),
  }
}
export const get = <T>(path: string, params?: URLSearchParams) => {
  return fetch(`https://api.switch-bot.com/v1.1/${path}?${params?.toString()}`, {
    headers: createHeaders(),
  }).then((res) => res.json() as T | null)
}

export const getDeviceStatus = (deviceId: string) => {
  return get<DeviceStatusResponse>(`devices/${deviceId}/status`)
}
