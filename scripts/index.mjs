import functions from '@google-cloud/functions-framework';
import { Storage } from "@google-cloud/storage"

import { get } from "./switchbot/httpClient.mjs"
import dayjs from 'dayjs';

functions.cloudEvent('capture', async () => {

  const now = dayjs();

  await capture({ dirname: "shelter", deviceId: process.env.METER_AT_SHELTER, now })
  await capture({ dirname: "baskingspot", deviceId: process.env.METER_AT_BASKINGSPOT, now })
  await capture({ dirname: "room", deviceId: process.env.METER_AT_ROOM, now })
});

const capture = async ({ dirname, deviceId, now }) => {
  const storage = new Storage();
  const today = now.format("YYYYMMDD")
  const bucket = storage.bucket(process.env.BUCKET_NAME)

  const file = bucket.file(`${dirname}/${today}.json`)
  let capturedResults = [];

  const [exists] = await file.exists()
  if (exists) {

    const [jsonText] = await file.download({
      decompress: file.metadata.contentEncoding === "gzip"
    })
    capturedResults = JSON.parse(jsonText.toString("utf-8"));
  }

  const res = await get(`/devices/${deviceId}/status`)

  const result = {
    temperature: res.body?.temperature,
    humidity: res.body?.humidity,
    at: now.second(0).format("YYYY-MM-DDTHH:mm:ss")
  }
  capturedResults.push(result)

  console.log("pushed: %s", result)

  await file.save(JSON.stringify(capturedResults), {
    gzip: true
  })
}