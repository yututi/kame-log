import { get } from "./httpClient.mjs"

get("/devices").then(data => {
  console.log(JSON.stringify(data, null, " "))
})