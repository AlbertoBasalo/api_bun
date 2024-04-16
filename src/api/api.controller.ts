import { API_BUN_CONFIG } from "../api_bun.config";
import type { Item, NewItem } from "../domain/item.type";
import { postLogin, postRegister } from "./auth.controller";
import type { RequestInfo } from "./request_info.type";
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
// Receives a requestInfo object and returns a response object

export async function getController(requestInfo: RequestInfo): Promise<Response> {
  if (requestInfo.id) {
    return await getResourceById(requestInfo, requestInfo.id);
  }
  if (requestInfo.q) {
    return await getResourceByQuery(requestInfo, requestInfo.q);
  }
  if (requestInfo.key && requestInfo.value) {
    return await getResourceByKeyValue(requestInfo, requestInfo.key, requestInfo.value);
  }
  return await getResourceAll(requestInfo);
}

export async function postController(requestInfo: RequestInfo): Promise<Response> {
  if (requestInfo.endPoint === "/login") {
    return await postLogin(requestInfo);
  }
  if (requestInfo.endPoint === "/register") {
    return await postRegister(requestInfo);
  }
  if (API_BUN_CONFIG.SECURITY === "write") {
    if (!requestInfo.userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    (requestInfo.body as any).userId = requestInfo.userId;
  }
  return await postResource(requestInfo, requestInfo.body as NewItem);
}

export async function putController(requestInfo: RequestInfo): Promise<Response> {
  requestInfo.id = requestInfo.id || (requestInfo.body as any)?.id;
  if (!requestInfo.id) {
    return new Response("Bad request", { status: 400 });
  }
  if (API_BUN_CONFIG.SECURITY === "write") {
    if (!requestInfo.userId) {
      return new Response("Unauthorized", { status: 401 });
    }
  }
  return await putResource(requestInfo, requestInfo.id, requestInfo.body as Item);
}

export async function deleteController(requestInfo: RequestInfo): Promise<Response> {
  if (!requestInfo.id) {
    return new Response("Bad request", { status: 400 });
  }
  if (API_BUN_CONFIG.SECURITY === "write") {
    if (!requestInfo.userId) {
      return new Response("Unauthorized", { status: 401 });
    }
  }
  return await deleteResource(requestInfo, requestInfo.id);
}
