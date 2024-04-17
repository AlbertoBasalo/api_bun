import { API_BUN_CONFIG } from "../api_bun.config";
import type { Item, NewItem } from "../domain/item.type";
import { postLogin, postRegister } from "./auth.controller";
import type { ClientRequest } from "../domain/client_request.type";
import {
  deleteResource,
  getResourceAll,
  getResourceById,
  getResourceByKeyValue,
  getResourceByQuery,
  postResource,
  putResource,
} from "./resource.controller";
import { ClientResponse } from "../domain/client_response.class";

// API method Controller
// Receives a requestInfo object and returns a response object

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

export async function postController(clientRequest: ClientRequest): Promise<ClientResponse> {
  if (clientRequest.endPoint === "/login") {
    return await postLogin(clientRequest);
  }
  if (clientRequest.endPoint === "/register") {
    return await postRegister(clientRequest);
  }
  if (!clientRequest.allowWrite) return new ClientResponse("Unauthorized", { status: 401 });
  (clientRequest.body as any).userId = clientRequest.userId;
  return await postResource(clientRequest.resource, clientRequest.body as NewItem);
}

export async function putController(clientRequest: ClientRequest): Promise<ClientResponse> {
  if (!clientRequest.id) return new ClientResponse("Bad request", { status: 400 });
  if (!clientRequest.allowWrite) return new ClientResponse("Unauthorized", { status: 401 });
  return await putResource(clientRequest.resource, clientRequest.id, clientRequest.body as Item);
}

export async function deleteController(clientRequest: ClientRequest): Promise<ClientResponse> {
  if (!clientRequest.id) return new ClientResponse("Bad request", { status: 400 });
  if (!clientRequest.allowWrite) return new ClientResponse("Unauthorized", { status: 401 });
  return await deleteResource(clientRequest.resource, clientRequest.id);
}

