import type { Option } from "../util/option.type";
export type RequestInfo = {
  method: string;
  resource: string;
  id: string;
  key: string;
  value: string;
  body?: any;
};

export async function extractInfo(request: Request): Promise<Option<RequestInfo>> {
  const endPoint = new URL(request.url).pathname;
  const method = request.method;
  const resource = endPoint.split("/")[1];
  if (!resource) {
    return { error: "Resource name not found on endpoint" };
  }
  const id = endPoint.split("/")[2] || "";
  const query = new URL(request.url).searchParams;
  const key = query.get("key") || "";
  const value = query.get("value") || "";
  let body = {};
  if (method === "POST" || method === "PUT") {
    body = await request.json();
  }
  const result = { method, resource, id, key, value, body };
  console.log(result);
  return { result };
}
