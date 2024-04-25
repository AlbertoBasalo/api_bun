import {
	apiController,
	deleteController,
	getController,
	postController,
	putController,
} from "../api/api.controller";
import { forcedController } from "../api/forced.controller";
import { getWebController } from "../api/web.controller";
import { API_BUN_CONFIG } from "../api_bun.config";
import { logInfo, logTrace } from "../domain/log.service";
import { buildClientRequest } from "./client_request.service";
import type { ClientRequest } from "./client_request.type";
import type { ClientResponse } from "./client_response.class";

/**
 * Handles the request and routes it to the corresponding controller
 * @param request The http native request
 * @returns A promise with the client response
 */
export async function handleRequest(request: Request): Promise<ClientResponse> {
	const clientRequest: ClientRequest = await buildClientRequest(request);
	await handleDelayedResponse(clientRequest.force?.delay);
	if (clientRequest.force?.status) {
		return await forcedController(clientRequest);
	}
	if (clientRequest.root === API_BUN_CONFIG.API_ROOT) {
		return await apiController(clientRequest);
	}
	return await getWebController(clientRequest);
}

async function handleDelayedResponse(delayMs: number | undefined): Promise<void> {
	if (!delayMs) return;
	logTrace(`Forced delaying response by ${delayMs} ms`);
	await new Promise((resolve) => setTimeout(resolve, delayMs));
}
