// Logic service for the resource API
// Receives arguments and returns a promise result with the data or an error message

import {
  deleteById,
  insert,
  selectAll,
  selectByContent,
  selectByKeyValue,
  update,
} from "../repository/memory.repository";
import type { Item, NewItem } from "./item.type";
import type { Result } from "./result.type";

export async function getAll(collection: string): Promise<Item[]> {
  const result = await selectAll(collection);
  return result;
}

export async function getById(collection: string, id: string): Promise<Result<Item>> {
  const selectedData = await selectByKeyValue(collection, "id", id);
  const result = selectedData[0];
  const error = result ? undefined : `Item with id ${id} not found in ${collection}`;
  return { data: result, error };
}

export async function getByKeyValue(
  collection: string,
  key: string,
  value: string
): Promise<Item[]> {
  const selectedData = await selectByKeyValue(collection, key, value);
  const result = selectedData;
  return result;
}

export async function getByQueryContent(collection: string, queryContent: string): Promise<Item[]> {
  const selectedData = await selectByContent(collection, queryContent);
  const result = selectedData;
  return result;
}

export async function post(collection: string, newItem: NewItem): Promise<Result<Item>> {
  let id = newItem.id;
  if (id) {
    const existingItem = await getById(collection, id);
    if (existingItem.data) {
      return { data: undefined, error: `Item with id ${id} already exists in ${collection}` };
    }
  } else {
    id = await generateCustomId(collection); // old id = generateUUID();
  }
  const createdAt = new Date();
  const updatedAt = null;
  const item: Item = { ...newItem, id, createdAt, updatedAt };
  const result = await insert(collection, item);
  return { data: result };
}

// Start Generation Here
export async function generateCustomId(collection: string): Promise<string> {
  const items = await getAll(collection);
  const count = items.length;
  const number = (count + 1).toString();
  const consonants = collection.match(/[bcdfghjklmnpqrstvwxyz]/gi);
  let prefix = "";
  if (consonants && consonants.length >= 3) {
    prefix = consonants.slice(0, 3).join("").toLowerCase();
  } else {
    prefix = collection.substring(0, 3).toLowerCase();
  }
  return `${prefix}_${number}`;
}

export async function put(collection: string, id: string, item: Item): Promise<Result<Item>> {
  const existingItem = await getById(collection, id);
  if (existingItem.error) {
    return { error: `Item ${id} not found on ${collection}` };
  }
  const updatedAt = new Date();
  const updatedItem = { ...existingItem.data, ...item, updatedAt };
  const updated = await update(collection, id, updatedItem);
  const result = updated ? updatedItem : undefined;
  const error = updated ? undefined : `Item ${id} not updated on ${collection}`;
  return { data: result, error };
}

export async function del(collection: string, id: string): Promise<void> {
  await deleteById(collection, id);
}
