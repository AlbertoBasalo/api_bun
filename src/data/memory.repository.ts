import type { Result } from "../util/result.type";
import { readJson, writeJson } from "./file.repository";
// A dictionary of collections
const db: Record<string, unknown[]> = {};

async function readCollection(collectionName: string): Promise<unknown[]> {
  if (!db[collectionName]) {
    db[collectionName] = [];
  }
  if (db[collectionName].length === 0) {
    const fileContent = await readJson(collectionName);
    db[collectionName] = fileContent;
  }
  return [...db[collectionName]];
}

async function writeCollection(collectionName: string, data: unknown[]) {
  db[collectionName] = [...data];
  await writeJson(collectionName, data);
}

/**
 * Get all items from a collection
 * @param collection Collection name
 * @returns The array of items in the collection
 */
export async function selectAll(collection: string): Promise<Result<unknown[]>> {
  const result = await readCollection(collection);
  return { result };
}

/**
 * Get a items from a collection that contain a specific key value pair
 * @param collection Collection name
 * @param key The key to search for
 * @param value The value to search for
 * @returns The items that match the key value pair or an empty array if none are found
 */
export async function selectByKeyValue(collection: string, key: string, value: string): Promise<Result<unknown[]>> {
  const selectedData = await selectAll(collection);
  if (selectedData.result) {
    const result = selectedData.result.filter((item: any) => item[key] == value);
    return { result };
  }
  return { result: [] };
}

/**
 * Get a single item from a collection
 * @param collection Collection name
 * @param id The id of the item to retrieve
 * @returns The item or null if the item is not found
 */
export async function selectById(collection: string, id: string): Promise<Result<unknown>> {
  const selectedData = await selectByKeyValue(collection, "id", id);
  if (selectedData.result && selectedData.result.length > 0) {
    const result = selectedData.result[0];
    return { result };
  }
  return {};
}

/**
 * Get a items from a collection that contain a specific content in any field
 * @param collection Collection name
 * @param content The content to search for
 * @returns The items that match the content or an empty array if none are found
 */
export async function selectByContent(collection: string, content: string): Promise<Result<unknown[]>> {
  const selectedData = await selectAll(collection);
  let result: unknown[] = [];
  if (selectedData.result) {
    result = selectedData.result.filter((item: any) => {
      const values = Object.values(item);
      return values.some((value: any) => value.toString().includes(content));
    });
  }
  return { result };
}

/**
 * Insert an item into a collection
 * @param collection Collection name
 * @param item The item to insert
 * @returns The item that was inserted
 */
export async function insert(collection: string, item: any): Promise<Result<unknown>> {
  if (item.hasOwnProperty("id")) {
    const id = item.id;
    const existingItem = await selectById(collection, id);
    if (existingItem) {
      return { error: `Item ${id} already exists on ${collection}` };
    }
  } else {
    item.id = Math.random().toString(36).substring(2, 9);
  }
  item.createdAt = new Date().toISOString();
  const collectionData = await readCollection(collection);
  collectionData.push(item);
  await writeCollection(collection, collectionData);
  const result = item as unknown;
  return { result };
}

/**
 * Update an item in a collection
 * @param collection Collection name
 * @param id The id of the item to update
 * @param item The item data to update
 * @returns The updated item or null if the item was not found
 */
export async function update(collection: string, id: string, item: any): Promise<Result<unknown>> {
  const collectionData = await readCollection(collection);
  const index = collectionData.findIndex((i: any) => i.id == id);
  if (index === -1) {
    return { error: `Item ${id} not found on ${collection}` };
  }
  item.updatedAt = new Date().toISOString();
  collectionData[index] = item;
  await writeCollection(collection, collectionData);
  const result = collectionData[index];
  return { result };
}

/**
 * Delete an item from a collection
 * @param collection Collection name
 * @param id The id of the item to delete
 * @returns The deleted item or null if the item was not found
 */
export async function deleteById(collection: string, id: string): Promise<Result<unknown>> {
  const collectionData = await readCollection(collection);
  const index = collectionData.findIndex((i: any) => i.id == id);
  if (index === -1) {
    return { error: `Item ${id} not found on ${collection}` };
  }
  collectionData.splice(index, 1);
  await writeCollection(collection, collectionData);
  return { result: { id } };
}
