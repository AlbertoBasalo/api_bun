import { API_BUN_CONFIG } from "../api_bun.config";
import { verifyToken } from "../domain/crypto.service";
import { logError, logTrace } from "../domain/log.service";
import type { Result } from "../domain/result.type";
import type { ClientBody, ClientRequest } from "./client_request.type";

/**
 * Extracts structured information from the request object
 * @param request Request object
 * @returns Structured information extracted from the request object
 */
export async function buildClientRequest(request: Request): Promise<Result<ClientRequest>> {
  try {
    const method = request.method;
    const endPoint = new URL(request.url).pathname;
    const resource = endPoint.split("/")[1] || "";
    const query = new URL(request.url).searchParams;
    const q = query.get("q") || undefined;
    const sort = query.get("_sort") || undefined;
    const order = (query.get("_order") as "asc" | "desc") || undefined;
    const key = query.get("key") || undefined;
    const value = query.get("value") || undefined;
    const body: ClientBody | undefined = await extractBody(request);
    const id = extractId(endPoint, body);
    const userId: string | undefined = extractUserId(request);
    const allowWrite: boolean = API_BUN_CONFIG.SECURITY === "none" || userId !== undefined;
    const result = { method, endPoint, resource, allowWrite, id, q, sort, order, key, value, body, userId };
    logTrace("Request info", { method, endPoint, resource, allowWrite, id, q, sort, order, key, value, userId });
    return { data: result };
  } catch (error: unknown) {
    logError("Error extracting request info", error);
    return { error: "Bad request" };
  }
}

/**
 * Extracts the body for POST and PUT requests
 * @param request The current http request object
 * @returns The body of the request or undefined if the request does not have a body
 */
async function extractBody(request: Request): Promise<ClientBody | undefined> {
  if (request.method === "POST" || request.method === "PUT") {
    const body = await request.json();
    const props = Object.keys(body).length;
    if (props === 0) return undefined;
    return body;
  }
  return undefined;
}

/**
 * Extracts the id from the request endpoint or body
 * @param endPoint Request endpoint
 * @param body Request body if not present in the endpoint
 * @returns The id extracted from the endpoint or body
 */
function extractId(endPoint: string, body?: ClientBody): string | undefined {
  let id = undefined;
  id = endPoint.split("/")[2];
  if (id) return id;
  id = body?.id;
  return id;
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
  return user.data;
}

