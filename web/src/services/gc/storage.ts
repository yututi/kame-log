import { Storage } from '@google-cloud/storage'
let credentials
if (process.env.GOOGLE_SERVICE_KEY) {
  credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY, 'base64').toString().replace(/\n/g, ''),
  )
}
const storage = new Storage({
  credentials,
})

export const get = async (bucketName: string, path: string) => {
  const bucket = storage.bucket(bucketName)
  const file = bucket.file(path)
  const [exists] = await file.exists()
  if (!exists) return null

  return await file.download({
    decompress: file.metadata.contentEncoding === 'gzip',
  })
}
