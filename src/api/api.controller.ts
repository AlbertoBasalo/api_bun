import type { Item } from "../domain/item.type";
import type { ClientRequest } from "../server/client_request.type";
import { ClientResponse } from "../server/client_response.class";
import { postLogin, postRegister } from "./auth.controller";

import {
	deleteResource,
	getResourceAll,
	getResourceById,
	getResourceByKeyValue,
	getResourceByQuery,
	postResource,
	putResource,
} from "./resource.controller";

// API method Controller
// Receives a ClientRequest object and returns a ClientResponse object

export async function apiController(clientRequest: ClientRequest): Promise<ClientResponse> {
	if (clientRequest.resource === "") {
		return new ClientResponse({
			body: "Api root. Type /api/{resource} to access a resource.",
			status: 200,
			clientRequest,
		});
	}
	switch (clientRequest.method) {
		case "GET":
			return await getController(clientRequest);
		case "POST":
			return await postController(clientRequest);
		case "PUT":
			return await putController(clientRequest);
		case "DELETE":
			return await deleteController(clientRequest);
		case "OPTIONS":
			return new ClientResponse({
				body: "",
				status: 204,
				clientRequest,
			});
		default:
			return new ClientResponse({
				body: "Method not allowed",
				status: 405,
				clientRequest,
			});
	}
}

/**
 * Handles GET requests (by id, query, or all)
 * @param clientRequest The client request information
 * @returns {ClientResponse} A client response object
 */
export async function getController(clientRequest: ClientRequest): Promise<ClientResponse> {
	if (clientRequest.id) {
		const myResponse = await getResourceById(clientRequest.resource, clientRequest.id);
		return new ClientResponse({ ...myResponse, clientRequest });
	}
	const params = clientRequest.params;
	if (!params) {
		const myResponse = await getResourceAll(clientRequest.resource);
		return new ClientResponse({ ...myResponse, clientRequest });
	}
	if (params.q) {
		const myResponse = await getResourceByQuery(clientRequest.resource, params.q);
		return new ClientResponse({ ...myResponse, clientRequest });
	}
	if (params.key && params.value) {
		const myResponse = await getResourceByKeyValue(
			clientRequest.resource,
			params.key,
			params.value,
		);
		return new ClientResponse({ ...myResponse, clientRequest });
	}
	return new ClientResponse({ body: "Bad request", status: 400, clientRequest });
}

/**
 * Handles POST requests (login, register, or any other resource creation).
 * @param clientRequest The client request information
 * @returns {ClientResponse} A client response object
 * @throws {ClientResponse} If the request is invalid or unauthorized returns an error response
 */
export async function postController(clientRequest: ClientRequest): Promise<ClientResponse> {
	if (!clientRequest.body)
		return new ClientResponse({
			body: "Bad request. Body is required.",
			status: 400,
			clientRequest,
		});
	if (clientRequest.endPoint === "/api/login") {
		return await postLogin(clientRequest);
	}
	if (clientRequest.endPoint === "/api/register") {
		return await postRegister(clientRequest);
	}
	if (clientRequest.security) {
		if (clientRequest.security.anonymous)
			return new ClientResponse({
				body: "Unauthorized. Authentication required.",
				status: 401,
				clientRequest,
			});
		clientRequest.body.userId = clientRequest.security.userId;
	}
	const myResponse = await postResource(clientRequest.resource, clientRequest.body);
	return new ClientResponse({ ...myResponse, clientRequest });
}

/**
 * Handles PUT requests (update a resource by id)
 * @param clientRequest The client request information
 * @returns {ClientResponse} The client response object
 * @throws {ClientResponse} If the request is invalid or unauthorized returns an error response
 */
export async function putController(clientRequest: ClientRequest): Promise<ClientResponse> {
	if (!clientRequest.id)
		return new ClientResponse({
			body: "Bad request. Id is required to update a resource object",
			status: 400,
			clientRequest,
		});
	if (clientRequest.security) {
		if (clientRequest.security.anonymous)
			return new ClientResponse({
				body: "Unauthorized, Authentication required.",
				status: 401,
				clientRequest,
			});
	}
	const myResponse = await putResource(
		clientRequest.resource,
		clientRequest.id,
		clientRequest.body as Item,
	);
	return new ClientResponse({ ...myResponse, clientRequest });
}

/**
 * Handles DELETE requests (delete a resource by id)
 * @param clientRequest The client request information
 * @returns {ClientResponse} The client response object
 * @throws {ClientResponse} If the request is invalid or unauthorized returns an error response
 */
export async function deleteController(clientRequest: ClientRequest): Promise<ClientResponse> {
	if (!clientRequest.id)
		return new ClientResponse({
			body: "Bad request. Id is required to delete a resource object",
			status: 400,
			clientRequest,
		});
	if (clientRequest.security) {
		if (clientRequest.security.anonymous)
			return new ClientResponse({
				body: "Unauthorized. Authentication required.",
				status: 401,
				clientRequest,
			});
	}
	const myResponse = await deleteResource(clientRequest.resource, clientRequest.id);
	return new ClientResponse({ ...myResponse, clientRequest });
}
