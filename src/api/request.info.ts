import type { Result } from "../util/result.type";
/**
 * Structured information extracted from the request object
 */
export type RequestInfo = {
  method: string;
  endPoint: string;
  resource: string;
  id: string;
  key: string;
  value: string;
  body?: any;
};

/**
 * Extracts structured information from the request object
 * @param request Request object
 * @returns Structured information extracted from the request object
 */
export async function extractInfo(request: Request): Promise<Result<RequestInfo>> {
  const method = request.method;
  const endPoint = new URL(request.url).pathname;
  const resource = endPoint.split("/")[1] || "";
  const id = endPoint.split("/")[2] || "";
  const query = new URL(request.url).searchParams;
  const key = query.get("key") || "";
  const value = query.get("value") || "";
  let body = {};
  if (method === "POST" || method === "PUT") {
    body = await request.json();
  }
  const result = { method, endPoint, resource, id, key, value, body };
  console.log(JSON.stringify(result));
  return { result };
}
