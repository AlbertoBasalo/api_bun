import { ClientResponse } from "../model/client_response.class";
import type { RequestInfo } from "../model/request_info.type";
import { del, getAll, getById, getByKeyValue, post, put } from "./resource.service";

// API Controller
// Receives a requestInfo object and returns a response object

export async function getResource(requestInfo: RequestInfo): Promise<Response> {
  if (requestInfo.id) {
    return getResourceById(requestInfo);
  }
  if (requestInfo.key && requestInfo.value) {
    return getResourceByKeyValue(requestInfo);
  }
  return getResourceAll(requestInfo);
}

export async function postResource(requestInfo: RequestInfo): Promise<Response> {
  if (requestInfo.endPoint === "/login") {
    const user = requestInfo.body;
    delete user.password;
    const userToken = {
      user,
      accessToken: "json.web.token",
    };
    return new ClientResponse(userToken);
  }
  const insertedData = await post(requestInfo.resource, requestInfo.body);
  const status = insertedData.result ? 201 : 409;
  const body = insertedData.result ? insertedData.result : insertedData.error;
  return new ClientResponse(body, { status });
}

export async function putResource(requestInfo: RequestInfo): Promise<Response> {
  if (!requestInfo.id) {
    requestInfo.id = requestInfo.body.id;
  }
  const updatedData = await put(requestInfo.resource, requestInfo.id, requestInfo.body);
  const status = updatedData.result ? 200 : 404;
  const body = updatedData.result ? updatedData.result : updatedData.error;
  return new ClientResponse(body, { status });
}

export async function deleteResource(requestInfo: RequestInfo): Promise<Response> {
  await del(requestInfo.resource, requestInfo.id);
  return new ClientResponse(null, { status: 204 });
}

async function getResourceAll(requestInfo: RequestInfo): Promise<Response> {
  const selectedData = await getAll(requestInfo.resource);
  const status = selectedData.length > 0 ? 200 : 200;
  const body = selectedData;
  return new ClientResponse(body, { status });
}

async function getResourceById(requestInfo: RequestInfo): Promise<Response> {
  const selectedData = await getById(requestInfo.resource, requestInfo.id);
  const status = selectedData.result ? 200 : 404;
  const body = selectedData.result ? selectedData.result : selectedData.error;
  return new ClientResponse(body, { status });
}

async function getResourceByKeyValue(requestInfo: RequestInfo): Promise<Response> {
  const selectedData = await getByKeyValue(requestInfo.resource, requestInfo.key, requestInfo.value);
  const status = selectedData.length > 0 ? 200 : 200;
  const body = selectedData;
  return new ClientResponse(body, { status });
}
