import type { Item } from "./item.type";

/**
 * Result type for returning a result or an error
 * Inspired by Rust's Result type
 */
export type Result<T extends Item | Item[]> = {
  result?: T;
  error?: string;
};
