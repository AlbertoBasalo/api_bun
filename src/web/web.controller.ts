import type { RequestInfo } from "../model/request.info";

export async function getPage(requestInfo: RequestInfo): Promise<Response | null> {
  if (requestInfo.endPoint === "/") {
    return new Response("Hello, World!");
  }
  if (requestInfo.endPoint === "/favicon.ico") {
    return new Response(null, { status: 204 });
  }
  return null;
}
