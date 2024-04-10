/**
 * Result type for returning a result or an error
 * Inspired by Rust's Result type
 */
export type Result<T> = {
  result?: T;
  error?: any | undefined;
};
