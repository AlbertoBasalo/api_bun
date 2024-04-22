export type LogLevels = "info" | "none" | "verbose";
export type StorageTypes = "memory" | "file";
export type SecurityTypes = "none" | "write";

export type ApiBunConfig = {
  /** Log level (info,none,verbose) */
  LOG_LEVEL: LogLevels;
  /** Storage type (memory,file) */
  STORAGE: StorageTypes;
  /** Security type (none,write) */
  SECURITY: SecurityTypes;
  /** Secret */
  SECRET: string;
  /** API root (api by default) */
  API_ROOT?: string;
  /** Forced result status (api-forced by default) */
  API_FORCED?: string;
  /** Forced timeout in milliseconds */
  API_FORCED_TIMEOUT: number;
};

/**
 * API Bun Configuration
 */
export const API_BUN_CONFIG: ApiBunConfig = {
  LOG_LEVEL: (Bun.env.LOG_LEVEL as LogLevels) || "info",
  STORAGE: (Bun.env.STORAGE as StorageTypes) || "memory",
  SECURITY: (Bun.env.SECURITY as SecurityTypes) || "none",
  SECRET: (Bun.env.SECRET as string) || "secret",
  API_ROOT: Bun.env.API_ROOT as string || "api",
  API_FORCED: Bun.env.API_FORCED as string || "api-forced",
  API_FORCED_TIMEOUT: Number.parseInt(Bun.env.API_FORCED_TIMEOUT || '1000')
};
