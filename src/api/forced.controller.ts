import type { ClientRequest } from "../server/client_request.type";
import { ClientResponse } from "../server/client_response.class";

/**
 * Controls forced responses
 * @param clientRequest The client request
 * @returns A response with the forced status code and body
 */
export async function forcedController(clientRequest: ClientRequest): Promise<ClientResponse> {
	let status = clientRequest.force?.status || 500;
	if (status > 599 || status < 100) {
		status = 500;
	}
	const body = getBody(clientRequest);
	return new ClientResponse({ body, status, clientRequest });
}

function getBody(clientRequest: ClientRequest): unknown {
	if (clientRequest.body) return clientRequest.body;
	const forcedItem = {
		id: clientRequest.id || 0,
		message: "Forced response",
		timestamp: new Date().toISOString(),
		force: clientRequest.force,
	};
	if (clientRequest.id) return forcedItem;
	const forcedArray = [forcedItem];
	return forcedArray;
}
