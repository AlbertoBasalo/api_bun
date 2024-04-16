import { verifyToken } from "./crypto.service";
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
    let body: any | undefined = extractBody(request);
    const userId = extractUserId(request);
    const result = { method, endPoint, resource, id, key, value, body, userId };
    logTrace("Request:", result);
    return result;
  } catch (error: any) {
    logError("Error extracting request info", error);
    return null;
  }
}

async function extractBody(request: Request): Promise<any | undefined> {
  if (request.method === "POST" || request.method === "PUT") {
    return await request.json();
  }
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
