import { API_BUN_CONFIG } from "../api_bun.config";
import type { ClientRequest } from "../server/client_request.type";
import { ClientResponse } from "../server/client_response.class";

export async function forcedController(clientRequest: ClientRequest): Promise<ClientResponse> {
  const status = Number.parseInt(clientRequest.q || '500');
  await new Promise(resolve => setTimeout(resolve, API_BUN_CONFIG.API_FORCED_TIMEOUT));
  const body = getBody(clientRequest);
  return new ClientResponse(body, { status }, clientRequest);
}

function getBody(clientRequest: ClientRequest): unknown {
  if (clientRequest.body) {
    return clientRequest.body;
  }
  if (clientRequest.id) {
    return { id: clientRequest.id, message: "Forced response" };
  }
  return [{ id: 0, message: "Forced response" }];
}