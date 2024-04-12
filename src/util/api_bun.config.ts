/**
 * API Bun Configuration
 */
export const API_BUN_CONFIG = {
  /** Log level (none,info,verbose) */
  LOG_LEVEL: Bun.env.LOG_LEVEL || "info",
  /** Storage type (memory,file) */
  STORAGE: Bun.env.STORAGE || "memory",
};
