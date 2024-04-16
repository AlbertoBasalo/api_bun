import type { Item } from "../domain/item.type";
import { readJson, writeJson } from "./file.repository";

/**
 * Get all items from a collection
 * @param collection Collection name
 * @returns The array of items in the collection
 */
export async function selectAll(collection: string): Promise<Item[]> {
  const result = await readCollection(collection);
  return result;
}

/**
 * Get a items from a collection that contain a specific key value pair
 * @param collection Collection name
 * @param key The key to search for
 * @param value The value to search for
 * @returns The items that match the key value pair or an empty array if none are found
 */
export async function selectByKeyValue(collection: string, key: string, value: string): Promise<Item[]> {
  const selectedData = await selectAll(collection);
  const result = selectedData.filter((item: any) => item[key] == value);
  return result;
}

/**
 * Get a single item from a collection
 * @param collection Collection name
 * @param id The id of the item to retrieve
 * @returns The item or null if the item is not found
 */
export async function selectById(collection: string, id: string): Promise<Item> {
  const selectedData = await selectByKeyValue(collection, "id", id);
  const result = selectedData[0];
  return result;
}

/**
 * Get a items from a collection that contain a specific content in any field
 * @param collection Collection name
 * @param content The content to search for
 * @returns The items that match the content or an empty array if none are found
 */
export async function selectByContent(collection: string, content: string): Promise<Item[]> {
  const selectedData = await selectAll(collection);
  const result = selectedData.filter((item: Item) => {
    const values = Object.values(item);
    return values.some((value: any) => value.toString().includes(content));
  });
  return result;
}

/**
 * Insert an item into a collection
 * @param collection Collection name
 * @param newItem The new item to insert
 * @returns The item that was inserted
 */
export async function insert(collection: string, item: Item): Promise<Item> {
  const collectionData = await readCollection(collection);
  collectionData.push(item);
  await writeCollection(collection, collectionData);
  const result = item;
  return result;
}

/**
 * Update an item in a collection
 * @param collection Collection name
 * @param id The id of the item to update
 * @param item The item data to update
 * @returns The updated item or null if the item was not found
 */
export async function update(collection: string, id: string, item: Item): Promise<Item | null> {
  const collectionData = await readCollection(collection);
  const index = collectionData.findIndex((i: Item) => i.id === id);
  if (index === -1) {
    return null;
  }
  collectionData[index] = item;
  await writeCollection(collection, collectionData);
  const result = collectionData[index];
  return result;
}

/**
 * Delete an item from a collection
 * @param collection Collection name
 * @param id The id of the item to delete
 * @returns The deleted item or null if the item was not found
 */
export async function deleteById(collection: string, id: string): Promise<void> {
  const collectionData = await readCollection(collection);
  const index = collectionData.findIndex((i: any) => i.id == id);
  if (index >= 0) {
    collectionData.splice(index, 1);
    await writeCollection(collection, collectionData);
  }
}

/**
 * Memory database
 * @description Can read and write to file system if env.STORAGE is set to "file"
 */
const db: Record<string, Item[]> = {};

/**
 * Read a collection from memory or file
 * @param collectionName The name of the collection
 * @returns An array of items from the collection or an empty array if the collection does not exist
 */
async function readCollection(collectionName: string): Promise<Item[]> {
  if (!db[collectionName]) {
    const fileContent = await readJson(collectionName);
    db[collectionName] = fileContent;
  }
  return [...db[collectionName]];
}

/**
 * Write a collection to memory
 * @param collectionName The name of the collection
 * @param data The data to write to the collection
 */
async function writeCollection(collectionName: string, data: Item[]) {
  db[collectionName] = [...data];
  await writeJson(collectionName, data);
}
