import type { ClientRequest } from "../server/client_request.type";
import { ClientResponse } from "../server/client_response.class";

export async function forcedController(clientRequest: ClientRequest): Promise<ClientResponse> {
	const status = clientRequest.force?.status || 500;
	const body = getBody(clientRequest);
	return new ClientResponse({ body, status, clientRequest });
}

function getBody(clientRequest: ClientRequest): unknown {
	if (clientRequest.body) return clientRequest.body;
	if (clientRequest.id) {
		const forcedObject = { id: clientRequest.id, message: "Forced response" };
		return forcedObject;
	}
	const forcedArray = [{ id: 0, message: "Forced response" }];
	return forcedArray;
}
