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
      return new ClientResponse("No Content", { status: 204 }, clientRequest);
    default:
      return new ClientResponse("Method Not Allowed", { status: 405 }, clientRequest);
  }
}


/**
 * Handles GET requests (by id, query, or all)
 * @param clientRequest The client request information
 * @returns {ClientResponse} A client response object
 */
export async function getController(clientRequest: ClientRequest): Promise<ClientResponse> {
  if (clientRequest.id) {
    return await getResourceById(clientRequest.resource, clientRequest.id);
  }
  if (clientRequest.q) {
    return await getResourceByQuery(clientRequest.resource, clientRequest.q);
  }
  if (clientRequest.key && clientRequest.value) {
    return await getResourceByKeyValue(clientRequest.resource, clientRequest.key, clientRequest.value);
  }
  return await getResourceAll(clientRequest.resource);
}

/**
 * Handles POST requests (login, register, or any other resource creation).
 * @param clientRequest The client request information
 * @returns {ClientResponse} A client response object
 * @throws {ClientResponse} If the request is invalid or unauthorized returns an error response
 */
export async function postController(clientRequest: ClientRequest): Promise<ClientResponse> {
  if (!clientRequest.body) return new ClientResponse("Bad request", { status: 400 }, clientRequest);
  if (clientRequest.endPoint === "/login") {
    return await postLogin(clientRequest);
  }
  if (clientRequest.endPoint === "/register") {
    return await postRegister(clientRequest);
  }
  if (!clientRequest.allowWrite) return new ClientResponse("Unauthorized", { status: 401 }, clientRequest);
  clientRequest.body.userId = clientRequest.userId;
  return await postResource(clientRequest.resource, clientRequest.body);
}

/**
 * Handles PUT requests (update a resource by id)
 * @param clientRequest The client request information
 * @returns {ClientResponse} The client response object
 * @throws {ClientResponse} If the request is invalid or unauthorized returns an error response
 */
export async function putController(clientRequest: ClientRequest): Promise<ClientResponse> {
  if (!clientRequest.id) return new ClientResponse("Bad request", { status: 400 }, clientRequest);
  if (!clientRequest.allowWrite) return new ClientResponse("Unauthorized", { status: 401 }, clientRequest);
  return await putResource(clientRequest.resource, clientRequest.id, clientRequest.body as Item);
}

/**
 * Handles DELETE requests (delete a resource by id)
 * @param clientRequest The client request information
 * @returns {ClientResponse} The client response object
 * @throws {ClientResponse} If the request is invalid or unauthorized returns an error response
 */
export async function deleteController(clientRequest: ClientRequest): Promise<ClientResponse> {
  if (!clientRequest.id) return new ClientResponse("Bad request", { status: 400 }, clientRequest);
  if (!clientRequest.allowWrite) return new ClientResponse("Unauthorized", { status: 401 }, clientRequest);
  return await deleteResource(clientRequest.resource, clientRequest.id);
}

