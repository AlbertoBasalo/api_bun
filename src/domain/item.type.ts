/**
 * A received item from the client to be stored.
 * @description The id is optional and it is generated if not provided.
 */
export type NewItem = {
  id?: string;
};

/**
 * An item stored in the database.
 * @description The id and createdAt are required, updatedAt is optional.
 */
export type Item = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  [key: string]: unknown;
};
