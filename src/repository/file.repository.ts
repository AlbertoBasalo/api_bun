import { API_BUN_CONFIG } from "../api_bun.config";
import type { Item } from "../domain/item.type";
import { logError, logInfo, logTrace, logWarning } from "../domain/log.service";

/**
 * Read a JSON file from the db folder
 * @param collectionName The name of the collection used as the file name
 * @returns An array of items from the collection or an empty array if the file does not exist
 */
export async function readJson(collectionName: string): Promise<Item[]> {
  const path = getPath(collectionName);
  try {
    const seedData = await Bun.file(path).json();
    logTrace("Seed data loaded", { path });
    return seedData;
  } catch (e) {
    logTrace("No seed data available. Starting empty collection.", { path });
    if (API_BUN_CONFIG.STORAGE === "file") {
      logInfo("Creating file storage", { path });
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
  const path = getPath(collectionName);
  try {
    const content = JSON.stringify(data, null, 2);
    await Bun.write(path, content);
  } catch (e) {
    logError("Error writing to file system. Using only memory.", e);
  }
}

function getPath(collection: string): string {
  return `db/${collection}.json`;
}
