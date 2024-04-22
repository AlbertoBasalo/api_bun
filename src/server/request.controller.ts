import { apiController, deleteController, getController, postController, putController } from "../api/api.controller";
import { forcedController } from "../api/forced.controller";
import { API_BUN_CONFIG } from "../api_bun.config";
import { buildClientRequest } from "./client_request.service";
import type { ClientRequest } from "./client_request.type";
import type { ClientResponse } from "./client_response.class";
import { getWebController } from "./web.controller";

/**
 * Handles the request and routes it to the corresponding controller
 * @param request The http native request 
 * @returns A promise with the client response
 */
export async function handleRequest(request: Request): Promise<ClientResponse> {
  const clientRequest: ClientRequest = await buildClientRequest(request);
  if (clientRequest.root === API_BUN_CONFIG.API_ROOT) {
    return await apiController(clientRequest);
  }
  if (clientRequest.root === API_BUN_CONFIG.API_FORCED) {
    return await forcedController(clientRequest);
  }
  return await getWebController(clientRequest);
}
