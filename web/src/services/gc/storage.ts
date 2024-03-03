import { Storage } from "@google-cloud/storage"

const storage = new Storage(
  process.env.VERCEL === "1"
    ? {
        projectId: "kame",
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join("\n"),
        },
      }
    : undefined,
)

export const get = async (bucketName: string, path: string) => {
  const bucket = storage.bucket(bucketName)
  const file = bucket.file(path)
  const [exists] = await file.exists()
  if (!exists) return null

  return await file.download({
    decompress: file.metadata.contentEncoding === "gzip",
  })
}
