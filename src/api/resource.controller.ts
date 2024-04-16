import { ClientResponse } from "../domain/client_response.class";
import type { RequestInfo } from "../domain/request_info.type";
import { del, getAll, getById, getByKeyValue, post, put } from "../domain/resource.service";

export async function getResourceAll(requestInfo: RequestInfo): Promise<Response> {
  const selectedData = await getAll(requestInfo.resource);
  const status = selectedData.length > 0 ? 200 : 200;
  const body = selectedData;
  return new ClientResponse(body, { status });
}

export async function getResourceById(requestInfo: RequestInfo): Promise<Response> {
  const selectedData = await getById(requestInfo.resource, requestInfo.id);
  const status = selectedData.result ? 200 : 404;
  const body = selectedData.result ? selectedData.result : selectedData.error;
  return new ClientResponse(body, { status });
}

export async function getResourceByKeyValue(requestInfo: RequestInfo): Promise<Response> {
  const selectedData = await getByKeyValue(requestInfo.resource, requestInfo.key, requestInfo.value);
  const status = selectedData.length > 0 ? 200 : 200;
  const body = selectedData;
  return new ClientResponse(body, { status });
}
export async function postResource(requestInfo: RequestInfo): Promise<Response> {
  const insertedData = await post(requestInfo.resource, requestInfo.body);
  const status = insertedData.result ? 201 : 409;
  const body = insertedData.result ? insertedData.result : insertedData.error;
  return new ClientResponse(body, { status });
}

export async function putResource(requestInfo: RequestInfo): Promise<Response> {
  const updatedData = await put(requestInfo.resource, requestInfo.id, requestInfo.body);
  const status = updatedData.result ? 200 : 404;
  const body = updatedData.result ? updatedData.result : updatedData.error;
  return new ClientResponse(body, { status });
}

export async function deleteResource(requestInfo: RequestInfo): Promise<Response> {
  await del(requestInfo.resource, requestInfo.id);
  return new ClientResponse(null, { status: 204 });
}
