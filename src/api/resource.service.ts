// Logic service for the resource API
// Receives arguments and returns a promise result with the data or an error message

// ToDo: Implement user authorization

import { deleteById, insert, selectAll, selectByKeyValue, update } from "../data/memory.repository";
import type { Item, NewItem } from "../model/item.type";
import type { Result } from "../model/result.type";

export async function getAll(collection: string): Promise<Item[]> {
  const result = await selectAll(collection);
  return result;
}

export async function getById(collection: string, id: string): Promise<Result<Item>> {
  const selectedData = await selectByKeyValue(collection, "id", id);
  const result = selectedData[0];
  const error = result ? undefined : `Item with id ${id} not found in ${collection}`;
  return { result, error };
}

export async function getByKeyValue(collection: string, key: string, value: string): Promise<Item[]> {
  const selectedData = await selectByKeyValue(collection, key, value);
  const result = selectedData;
  return result;
}

export async function post(collection: string, newItem: NewItem): Promise<Result<Item>> {
  let id = newItem.id;
  if (id) {
    const existingItem = await getById(collection, id);
    if (existingItem.result) {
      return { result: undefined, error: `Item with id ${id} already exists in ${collection}` };
    }
  } else {
    id = Math.random().toString(36).substr(2, 9);
  }
  const createdAt = new Date();
  const updatedAt = null;
  const item: Item = { ...newItem, id, createdAt, updatedAt };
  const result = await insert(collection, item);
  return { result };
}

export async function put(collection: string, id: string, item: Item): Promise<Result<Item>> {
  const existingItem = await getById(collection, id);
  if (existingItem.error) {
    return { error: `Item ${id} not found on ${collection}` };
  }
  const updatedAt = new Date();
  const updatedItem = { ...existingItem.result, ...item, updatedAt };
  const updated = await update(collection, id, updatedItem);
  const result = updated ? updatedItem : undefined;
  const error = updated ? undefined : `Item ${id} not updated on ${collection}`;
  return { result, error };
}

export async function del(collection: string, id: string): Promise<void> {
  await deleteById(collection, id);
}
