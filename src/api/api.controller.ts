import type { RequestInfo } from "../domain/request_info.type";
import { postLogin } from "./auth.controller";
import {
  deleteResource,
  getResourceAll,
  getResourceById,
  getResourceByKeyValue,
  postResource,
  putResource,
} from "./resource.controller";

// API method Controller
// Receives a requestInfo object and returns a response object

export async function getController(requestInfo: RequestInfo): Promise<Response> {
  if (requestInfo.id) {
    return await getResourceById(requestInfo);
  }
  if (requestInfo.key && requestInfo.value) {
    return await getResourceByKeyValue(requestInfo);
  }
  return await getResourceAll(requestInfo);
}

export async function postController(requestInfo: RequestInfo): Promise<Response> {
  if (requestInfo.endPoint === "/login") {
    return await postLogin(requestInfo);
  }
  return await postResource(requestInfo);
}

export async function putController(requestInfo: RequestInfo): Promise<Response> {
  return await putResource(requestInfo);
}

export async function deleteController(requestInfo: RequestInfo): Promise<Response> {
  return await deleteResource(requestInfo);
}
