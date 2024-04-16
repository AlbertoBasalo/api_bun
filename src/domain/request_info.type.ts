import { logError, logTrace } from "./log.service";

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
  userId?: string;
};

/**
 * Extracts structured information from the request object
 * @param request Request object
 * @returns Structured information extracted from the request object
 */
export async function extractInfo(request: Request): Promise<RequestInfo | null> {
  try {
    const method = request.method;
    const endPoint = new URL(request.url).pathname;
    const resource = endPoint.split("/")[1] || "";
    let id = endPoint.split("/")[2] || "";
    const query = new URL(request.url).searchParams;
    const key = query.get("key") || "";
    const value = query.get("value") || "";
    let body: any = {};
    if (method === "POST" || method === "PUT") {
      body = await request.json();
      if (method === "PUT") {
        id = body.id || id;
      }
    }
    // get UserId from request headers
    const result = { method, endPoint, resource, id, key, value, body };
    logTrace("Request:", result);
    return result;
  } catch (error: any) {
    logError("Error extracting request info", error);
    return null;
  }
}
