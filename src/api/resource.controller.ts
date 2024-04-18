import type { Item, NewItem } from "../domain/item.type";
import { del, getAll, getById, getByKeyValue, getByQueryContent, post, put } from "../domain/resource.service";
import { ClientResponse } from "../server/client_response.class";

export async function getResourceAll(resource: string): Promise<ClientResponse> {
  const selectedData = await getAll(resource);
  const status = selectedData.length > 0 ? 200 : 200;
  const body = selectedData;
  return new ClientResponse(body, { status });
}

export async function getResourceById(resource: string, id: string): Promise<ClientResponse> {
  const selectedData = await getById(resource, id);
  const status = selectedData.data ? 200 : 404;
  const body = selectedData.data ? selectedData.data : selectedData.error;
  return new ClientResponse(body, { status });
}

export async function getResourceByKeyValue(resource: string, key: string, value: string): Promise<ClientResponse> {
  const selectedData = await getByKeyValue(resource, key, value);
  const status = selectedData.length > 0 ? 200 : 200;
  const body = selectedData;
  return new ClientResponse(body, { status });
}

export async function getResourceByQuery(resource: string, q: string): Promise<ClientResponse> {
  const selectedData = await getByQueryContent(resource, q);
  const status = selectedData.length > 0 ? 200 : 200;
  const body = selectedData;
  return new ClientResponse(body, { status });
}

export async function postResource(resource: string, newItem: NewItem): Promise<ClientResponse> {
  const insertedData = await post(resource, newItem);
  const status = insertedData.data ? 201 : 409;
  const body = insertedData.data ? insertedData.data : insertedData.error;
  return new ClientResponse(body, { status });
}

export async function putResource(resource: string, id: string, item: Item): Promise<ClientResponse> {
  const updatedData = await put(resource, id, item);
  const status = updatedData.data ? 200 : 404;
  const body = updatedData.data ? updatedData.data : updatedData.error;
  return new ClientResponse(body, { status });
}

export async function deleteResource(resource: string, id: string): Promise<ClientResponse> {
  await del(resource, id);
  return new ClientResponse(null, { status: 204 });
}
