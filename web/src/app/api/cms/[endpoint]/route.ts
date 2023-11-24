import { getList } from "@/services/cms/client";
import { isValidEndpoint } from "@/services/cms/utils";
import { NextResponse } from "next/server";

// https://document.microcms.io/content-api/get-list-contents へのプロキシ
export async function GET(request: Request, { param }: { param: { endpoint: string } }) {

  const url = new URL(request.url)

  const { endpoint } = param;

  if (!isValidEndpoint(endpoint)) {
    return new NextResponse(null, {
      status: 404
    })
  }

  const data = await getList(endpoint, url.searchParams);

  NextResponse.json(data);
}
