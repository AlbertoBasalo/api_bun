import { API_BUN_CONFIG } from "../api_bun.config";
import type { Item } from "../domain/item.type";
import { logError, logInfo, logTrace, logWarning } from "../domain/log.service";

/**
 * Read a JSON file from the db folder
 * @param collectionName The name of the collection used as the file name
 * @returns An array of items from the collection or an empty array if the file does not exist
 */
export async function readJson(collectionName: string): Promise<Item[]> {
  try {
    const path = getPath(collectionName);
    logTrace("Reading seed data", path);
    return await Bun.file(path).json();
  } catch (e) {
    logInfo("No seed data available. Starting empty collection.", collectionName);
    if (API_BUN_CONFIG.STORAGE === "file") {
      logWarning("Creating file storage", collectionName);
      writeJson(collectionName, []);
    }
    return [];
  }
}

/**
 * Write a JSON file to the db folder
 * @param collectionName The name of the collection used as the file name
 * @param data The data to write to the file
 */
export async function writeJson(collectionName: string, data: Item[]): Promise<void> {
  if (API_BUN_CONFIG.STORAGE !== "file") return;
  try {
    const content = JSON.stringify(data, null, 2);
    await Bun.write(getPath(collectionName), content);
  } catch (e) {
    logError("Error writing to file. Using only memory.", e);
  }
}

function getPath(collection: string): string {
  return `db/${collection}.json`;
}
