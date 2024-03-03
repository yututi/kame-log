import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret")
  if (secret !== process.env.MY_SECRET_TOKEN) {
    return Response.json({ message: "Invalid secret" }, { status: 401 })
  }

  const { date } = await request.json()
  revalidatePath(`/logs/${date}`)

  return Response.json({})
}
