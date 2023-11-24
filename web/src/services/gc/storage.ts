import { Storage } from "@google-cloud/storage"

const storage = new Storage();

export const get = async (bucketName: string, path: string) => {
  const bucket = storage.bucket(bucketName)
  const file = bucket.file(path)
  const [exists] = await file.exists()
  if (!exists) return null;

  return await file.download({
    decompress: file.metadata.contentEncoding === "gzip"
  })
}