import { get } from "@/services/cms/client"
import { isValidEndpoint } from "@/services/cms/utils"
import { NextResponse } from "next/server"

// https://document.microcms.io/content-api/get-content へのプロキシ
export async function GET(
  request: Request,
  { param }: { param: { endpoint: string; contentId: string } },
) {
  const url = new URL(request.url)

  const { endpoint } = param

  if (!isValidEndpoint(endpoint)) {
    return new NextResponse(null, {
      status: 404,
    })
  }

  const data = await get(endpoint, param.contentId, url.searchParams)

  return NextResponse.json(data)
}
