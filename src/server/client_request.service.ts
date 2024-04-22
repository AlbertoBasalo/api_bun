import { API_BUN_CONFIG } from "../api_bun.config";
import { verifyToken } from "../domain/crypto.service";
import { logError, logRequest, logTrace } from "../domain/log.service";
import type { Result } from "../domain/result.type";
import type { ClientBody, ClientRequest } from "./client_request.type";

/**
 * Extracts structured information from the request object
 * @param request Request object
 * @returns Structured information extracted from the request object
 */
export async function buildClientRequest(request: Request): Promise<ClientRequest> {
  const method = request.method;
  const url = new URL(request.url);
  const endPoint = url.pathname;
  const query = url.searchParams;
  const { root, resource, id } = extractFromEndPoint(endPoint);
  const body: ClientBody | undefined = await extractBody(request);
  const q = query.get("q") || undefined;
  const sort = query.get("_sort") || undefined;
  const order = (query.get("_order") as "asc" | "desc") || undefined;
  const key = query.get("key") || undefined;
  const value = query.get("value") || undefined;
  const userId: string | undefined = extractUserId(request);
  const allowWrite: boolean = API_BUN_CONFIG.SECURITY === "none" || userId !== undefined;
  const clientRequest = { method, endPoint, root, resource, allowWrite, id, q, sort, order, key, value, body, userId };
  logRequest(clientRequest);
  return clientRequest;
}

function extractFromEndPoint(endPoint: string): { root: string, resource: string, id: string | undefined } {
  const splits = endPoint.split("/")
  const root = splits[1] || "";
  const resource = splits[2] || "";
  const id = splits[3];
  return { root, resource, id };
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

