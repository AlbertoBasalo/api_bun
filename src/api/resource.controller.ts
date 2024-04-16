import { ClientResponse } from "../domain/client_response.class";
import type { Item, NewItem } from "../domain/item.type";
import { del, getAll, getById, getByKeyValue, getByQueryContent, post, put } from "../domain/resource.service";
import type { RequestInfo } from "./request_info.type";

export async function getResourceAll(requestInfo: RequestInfo): Promise<Response> {
  const selectedData = await getAll(requestInfo.resource);
  const status = selectedData.length > 0 ? 200 : 200;
  const body = selectedData;
  return new ClientResponse(body, { status });
}

export async function getResourceById(requestInfo: RequestInfo, id: string): Promise<Response> {
  const selectedData = await getById(requestInfo.resource, id);
  const status = selectedData.result ? 200 : 404;
  const body = selectedData.result ? selectedData.result : selectedData.error;
  return new ClientResponse(body, { status });
}

export async function getResourceByKeyValue(requestInfo: RequestInfo, key: string, value: string): Promise<Response> {
  const selectedData = await getByKeyValue(requestInfo.resource, key, value);
  const status = selectedData.length > 0 ? 200 : 200;
  const body = selectedData;
  return new ClientResponse(body, { status });
}

export async function getResourceByQuery(requestInfo: RequestInfo, q: string): Promise<Response> {
  const selectedData = await getByQueryContent(requestInfo.resource, q);
  const status = selectedData.length > 0 ? 200 : 200;
  const body = selectedData;
  return new ClientResponse(body, { status });
}

export async function postResource(requestInfo: RequestInfo, newItem: NewItem): Promise<Response> {
  const insertedData = await post(requestInfo.resource, newItem);
  const status = insertedData.result ? 201 : 409;
  const body = insertedData.result ? insertedData.result : insertedData.error;
  return new ClientResponse(body, { status });
}

export async function putResource(requestInfo: RequestInfo, id: string, item: Item): Promise<Response> {
  const updatedData = await put(requestInfo.resource, id, item);
  const status = updatedData.result ? 200 : 404;
  const body = updatedData.result ? updatedData.result : updatedData.error;
  return new ClientResponse(body, { status });
}

export async function deleteResource(requestInfo: RequestInfo, id: string): Promise<Response> {
  await del(requestInfo.resource, id);
  return new ClientResponse(null, { status: 204 });
}
