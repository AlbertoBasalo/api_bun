/**
 * Result type for returning data or an error
 * Inspired by Rust's Result type
 */
export type Result<T> = {
  data?: T;
  error?: string;
};
