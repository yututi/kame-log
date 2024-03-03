import { getDeviceStatusByLocation, getLog } from "@/features/devices/api"
import { Location } from "@/features/devices/types"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const location = params.get("location")
  if (location == null || !isLocation(location)) {
    return NextResponse.json({}, { status: 400 })
  }

  const data = await getDeviceStatusByLocation(location)

  return NextResponse.json(data)
}

const isLocation = (location: string): location is Location => {
  return ["room", "baskingspot", "shelter"].includes(location)
}
