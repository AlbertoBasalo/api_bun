export type LogLevels = "info" | "none" | "verbose";
export type StorageTypes = "memory" | "file";

export type ApiBunConfig = {
  /** Log level (info,none,verbose) */
  LOG_LEVEL: LogLevels;
  /** Storage type (memory,file) */
  STORAGE: StorageTypes;
};

/**
 * API Bun Configuration
 */
export const API_BUN_CONFIG: ApiBunConfig = {
  LOG_LEVEL: (Bun.env.LOG_LEVEL as LogLevels) || "info",
  STORAGE: (Bun.env.STORAGE as StorageTypes) || "memory",
};
