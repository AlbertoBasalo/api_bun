import { deleteById, insert, selectAll, selectById, selectByKeyValue, update } from "../data/memory.repository";
import type { RequestInfo } from "./request.info";

export async function getResource(requestInfo: RequestInfo): Promise<Response> {
  if (requestInfo.id) {
    const selectedData = await selectById(requestInfo.resource, requestInfo.id);
    if (selectedData.result) {
      return new Response(JSON.stringify(selectedData.result), { status: 200 });
    } else {
      return new Response("Not Found", { status: 404 });
    }
  }
  if (requestInfo.key && requestInfo.value) {
    const selectedData = await selectByKeyValue(requestInfo.resource, requestInfo.key, requestInfo.value);
    if (selectedData.result) {
      const status = selectedData.result.length > 0 ? 200 : 204;
      return new Response(JSON.stringify(selectedData.result), { status });
    }
    if (selectedData.error) {
      return new Response(selectedData.error, { status: 400 });
    }
  }
  const selectedData = await selectAll(requestInfo.resource);
  if (selectedData.result) {
    return new Response(JSON.stringify(selectedData.result), { status: 200 });
  }
  if (selectedData.error) {
    return new Response(selectedData.error, { status: 400 });
  }
  return new Response("Bad Request", { status: 400 });
}

export async function postResource(requestInfo: RequestInfo): Promise<Response> {
  const insertedData = await insert(requestInfo.resource, requestInfo.body);
  if (insertedData.result) {
    return new Response(JSON.stringify(insertedData), { status: 201 });
  }
  if (insertedData.error) {
    return new Response(insertedData.error, { status: 409 });
  }
  return new Response("Bad Request", { status: 400 });
}

export async function putResource(requestInfo: RequestInfo): Promise<Response> {
  const updatedData = await update(requestInfo.resource, requestInfo.id, requestInfo.body);
  if (updatedData.result) {
    return new Response(JSON.stringify(updatedData), { status: 200 });
  }
  if (updatedData.error) {
    return new Response(updatedData.error, { status: 404 });
  }
  return new Response("Bad Request", { status: 400 });
}

export async function deleteResource(requestInfo: RequestInfo): Promise<Response> {
  const deletedData = await deleteById(requestInfo.resource, requestInfo.id);
  if (deletedData.result) {
    return new Response(JSON.stringify(deletedData), { status: 200 });
  }
  if (deletedData.error) {
    return new Response(deletedData.error, { status: 204 });
  }
  return new Response("Bad Request", { status: 400 });
}
