// import { deleteById, insert, selectAll, selectByKeyValue, update } from "../data/memory.repository";
// import type { Option } from "../util/option.type";

// // ToDo: Do not respond, return the data or throw an error

// /**
//  * Get all items from a resource
//  * @param resource resource name
//  * @returns The array of items in the resource or an empty array if the resource is empty
//  */
// export async function getAll(resource: string): Promise<Option<unknown[]>> {
//   return await selectAll(resource);
// }

// /**
//  * Get a single item from a resource
//  * @param resource resource name
//  * @param id The id of the item to retrieve
//  * @returns The item or an error if the item is not found
//  */
// export async function getById(resource: string, id: string): Promise<Option<unknown>> {
//   const data = await selectByKeyValue(resource, "id", id);
//   if (data.result && data.result.length > 0) {
//     return { result: data.result[0] };
//   } else {
//     return { error: `Item ${id} not found on ${resource}` };
//   }
// }

// /**
//  * Get a items from a resource that contain a specific key value pair
//  * @param resource resource name
//  * @param key The key to search for
//  * @param value The value to search for
//  * @returns The items that match the key value pair or a 204 response if empty
//  */
// export async function getByKeyValue(resource: string, key: string, value: string): Promise<Option<unknown[]>> {
//   return await selectByKeyValue(resource, key, value);
// }

// /**
//  * Insert an item into a resource
//  * @param resource resource name
//  * @param body The item to insert
//  * @returns The inserted item or a 409 response if the item already exists
//  */
// export async function postItem(resource: string, body: any) {
//   const inserted = await insert(resource, body);
//   if (inserted) {
//     return Response.json(inserted, { status: 201 });
//   }
//   return new Response(`Item ${body.id} already exists on ${resource}`, { status: 409 });
// }

// /**
//  * Update an item in a resource
//  * @param resource resource name
//  * @param id The id of the item to update
//  * @param body The item to update
//  * @returns The updated item or a 404 response if the item is not found
//  */
// export async function putItem(resource: string, id: string, body: any) {
//   const updated = await update(resource, id, body);
//   if (updated) {
//     return Response.json(updated);
//   }
//   return new Response(`Item ${id} not found on ${resource}`, { status: 404 });
// }

// export async function deleteItem(resource: string, id: string) {
//   const deleted = await deleteById(resource, id);
//   if (deleted) {
//     return Response.json({}, { status: 204 });
//   }
//   return new Response(`Item ${id} not found on ${resource}`, { status: 204 });
// }
