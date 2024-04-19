import { API_BUN_CONFIG } from "../api_bun.config";

type LogLevel = "none" | "info" | "verbose";

const logLevel: LogLevel = API_BUN_CONFIG.LOG_LEVEL as LogLevel;

export function logTrace(message: string, payload: unknown): void {
  if (logLevel !== "verbose") {
    return;
  }
  console.log(`❔ ${message}`, stringifyPayload(payload));
}

export function logInfo(message: string, payload: unknown): void {
  if (logLevel === "none") {
    return;
  }
  console.log(`📘 ${message}`, stringifyPayload(payload));
}

export function logWarning(message: string, payload: unknown): void {
  if (logLevel === "none") {
    return;
  }
  console.warn(`📒 ${message}`, stringifyPayload(payload));
}

export function logError(message: string, payload: unknown): void {
  if (logLevel === "none") {
    return;
  }
  console.error(`🔥 ${message}`, stringifyPayload(payload));
}

function stringifyPayload(payload: unknown): string {
  if (!payload) {
    return "";
  }
  if (typeof payload === "object") {
    return JSON.stringify(payload);
  }
  return (payload as string);
}
