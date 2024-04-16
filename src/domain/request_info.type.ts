import { verifyToken } from "./crypto.service";
import { logError, logTrace } from "./log.service";

/**
 * Structured information extracted from the request object
 */
export type RequestInfo = {
  method: string;
  endPoint: string;
  resource: string;
  id?: string;
  q?: string;
  _sort?: string;
  _order?: "asc" | "desc";
  key?: string;
  value?: string;
  body?: unknown;
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
    const id = endPoint.split("/")[2] || undefined;
    const query = new URL(request.url).searchParams;
    const q = query.get("q") || undefined;
    const _sort = query.get("_sort") || undefined;
    const _order = (query.get("_order") as "asc" | "desc") || undefined;
    const key = query.get("key") || undefined;
    const value = query.get("value") || undefined;
    const body: any | undefined = await extractBody(request);
    const userId: string | undefined = extractUserId(request);
    const result = { method, endPoint, resource, id, q, _sort, _order, key, value, body, userId };
    logTrace("Request:", result);
    return result;
  } catch (error: any) {
    logError("Error extracting request info", error);
    return null;
  }
}

async function extractBody(request: Request): Promise<any | undefined> {
  if (request.method === "POST" || request.method === "PUT") {
    const body = await request.json();
    const props = Object.keys(body).length;
    logTrace("extractBody:", { props, body });
    if (Object.keys(body).length === 0) return undefined;
    return body;
  }
  return undefined;
}

/**
 * Extracts the user id from the request headers
 * @param request Request object
 * @returns User id
 */
function extractUserId(request: Request): string | undefined {
  const auth = request.headers.get("Authorization");
  if (!auth) return undefined;
  const accessToken = auth.split(" ")[1];
  if (!accessToken) return undefined;
  const user = verifyToken(accessToken);
  if (user.error) {
    logTrace("Extracting UserId", user.error);
    return undefined;
  }
  return user.result;
}
