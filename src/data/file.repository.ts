/**
 * Read a JSON file from the db folder
 * @param collectionName The name of the collection used as the file name
 * @returns An array of items from the collection or an empty array if the file does not exist
 */
export async function readJson(collectionName: string): Promise<unknown[]> {
  try {
    console.log("readJson", collectionName);
    return await Bun.file(getPath(collectionName)).json();
  } catch (e) {
    await writeJson(collectionName, []);
    return [];
  }
}

/**
 * Write a JSON file to the db folder
 * @param collectionName The name of the collection used as the file name
 * @param data The data to write to the file
 */
export async function writeJson(collectionName: string, data: unknown[]): Promise<void> {
  try {
    const content = JSON.stringify(data, null, 2);
    await Bun.write(getPath(collectionName), content);
  } catch (e) {
    console.error(e);
  }
}

function getPath(collection: string): string {
  return `db/${collection}.json`;
}
