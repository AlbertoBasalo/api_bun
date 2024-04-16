import type { RequestInfo } from "../domain/request_info.type";
import { postLogin, postRegister } from "./auth.controller";
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
  if (requestInfo.endPoint === "/register") {
    return await postRegister(requestInfo);
  }
  return await postResource(requestInfo);
}

export async function putController(requestInfo: RequestInfo): Promise<Response> {
  requestInfo.id = requestInfo.id || requestInfo.body.id;
  if (!requestInfo.id) {
    return new Response("Bad request", { status: 400 });
  }
  return await putResource(requestInfo);
}

export async function deleteController(requestInfo: RequestInfo): Promise<Response> {
  if (!requestInfo.id) {
    return new Response("Bad request", { status: 400 });
  }
  return await deleteResource(requestInfo);
}
