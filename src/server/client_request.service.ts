import { API_BUN_CONFIG } from "../api_bun.config";
import { verifyToken } from "../domain/crypto.service";
import { logRequest, logTrace } from "../domain/log.service";
import type {
	ClientBody,
	ClientRequest,
	ForcedParams,
	Params,
	Security,
} from "./client_request.type";

/**
 * Extracts structured information from the request object
 * @param request Request object
 * @returns Structured information extracted from the request object
 */
export async function buildClientRequest(request: Request): Promise<ClientRequest> {
	const method = request.method;
	const url = request.url;
	const reqUrl = new URL(url);
	const endPoint = reqUrl.pathname;
	const query: URLSearchParams = reqUrl.searchParams;
	const { root, resource, id } = extractEndPoint(endPoint);
	const body: ClientBody | undefined = await extractBody(request);
	const params: Params | undefined = extractParams(query);
	const force: ForcedParams | undefined = await extractForce(query);
	const security: Security | undefined = extractSecurity(request);
	const clientRequest = {
		method,
		endPoint,
		url,
		root,
		resource,
		id,
		params,
		body,
		force,
		security,
	};
	logRequest(clientRequest);
	return clientRequest;
}

/**
 * Extracts end point information from the request object
 * @param endPoint The end point of the request
 * @returns The root, resource and id of the end point
 */
function extractEndPoint(endPoint: string): {
	root: string;
	resource: string;
	id: string | undefined;
} {
	const splits = endPoint.split("/");
	const root = splits[1] || "";
	const resource = splits[2] || "";
	const id = splits[3];
	return { root, resource, id };
}

/**
 * Extracts the query parameters from the request object
 * @param query The query parameters of the request
 * @returns the expected parameters with values or undefined when not found
 */
function extractParams(query: URLSearchParams): Params | undefined {
	const q = query.get("q") || undefined;
	const key = query.get("key") || undefined;
	const value = query.get("value") || undefined;
	const sort = query.get("sort") || undefined;
	const order = (query.get("order") as "asc" | "desc") || undefined;
	if (!q && !key && !value && !sort && !order) return undefined;
	return { q, key, value, sort, order };
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
 * Extracts the parameters for forced responses from the query
 * @param query The query parameters of the request
 * @returns Delay or expected status code for the response
 */
async function extractForce(query: URLSearchParams): Promise<ForcedParams | undefined> {
	const qDelay = query.get("delay");
	let delay: number | undefined;
	if (qDelay) delay = Number.parseInt(qDelay);
	const qStatus = query.get("status");
	let status: number | undefined;
	if (qStatus) status = Number.parseInt(qStatus);
	if (delay === undefined && status === undefined) {
		return undefined;
	}
	return { delay, status };
}

/**
 * Extracts the status and user id from the request headers
 * @param request Request object
 * @returns User id and anonymous status
 */
function extractSecurity(request: Request): Security | undefined {
	if (API_BUN_CONFIG.SECURITY === "none") return undefined;
	const security: Security = { anonymous: true, userId: undefined };
	const auth = request.headers.get("Authorization");
	if (!auth) return security;
	const accessToken = auth.split(" ")[1];
	if (!accessToken) return security;
	const user = verifyToken(accessToken);
	if (user.error) {
		logTrace("Extracting UserId", user.error);
		return security;
	}
	security.userId = user.data;
	security.anonymous = false;
	return security;
}
