import { get } from "./httpClient.mjs"

get(`/devices/${process.env.METER_AT_SHELTER}/status`).then(data => {
  console.log(JSON.stringify(data, null, " "))
})