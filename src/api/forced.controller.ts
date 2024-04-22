import type { ClientRequest } from "../server/client_request.type";
import { ClientResponse } from "../server/client_response.class";

export async function getForced(clientRequest: ClientRequest): Promise<ClientResponse> {
  const status = Number.parseInt(clientRequest.q || '500');
  // simulate a wait time
  await new Promise(resolve => setTimeout(resolve, 1000));
  return new ClientResponse("Forced error", { status }, clientRequest);
}