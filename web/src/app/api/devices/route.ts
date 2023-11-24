import { getDeviceStatusByLocation, getLog } from "@/features/devices/api";
import { Location } from "@/features/devices/types";
import { getDeviceStatus } from "@/services/switchbot/client";
import { NextResponse } from "next/server";

const cache = new Map();

setInterval(() => {
  cache.clear();
}, 1000 * 60)

export async function GET(request: Request) {

  const params = new URL(request.url).searchParams;
  const location = params.get("location");
  if (location == null || !isLocation(location)) return NextResponse.json({}, { status: 400 });

  if (cache.has(location)) {
    return NextResponse.json(cache.get(location));
  }

  const data = await getDeviceStatusByLocation(location);
  cache.set(location, data);

  return NextResponse.json(data);
}

const isLocation = (location: string): location is Location => {
  return ["room", "baskingspot", "shelter"].includes(location);
}