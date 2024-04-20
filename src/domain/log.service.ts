import { API_BUN_CONFIG } from "../api_bun.config";
import type { ClientRequest } from "../server/client_request.type";
import type { ClientResponse } from "../server/client_response.class";

type LogLevel = "none" | "info" | "verbose";

const logLevel: LogLevel = API_BUN_CONFIG.LOG_LEVEL as LogLevel;

export function logTrace(message: string, payload?: unknown): void {
  if (logLevel !== "verbose") {
    return;
  }
  console.log(`📖\t${message}`);
  printPayload(payload);
}

export function logInfo(message: string, payload?: unknown): void {
  if (logLevel === "none") {
    return;
  }
  console.log(`📘\t${message}`);
  printPayload(payload);
}

export function logWarning(message: string, payload?: unknown): void {
  if (logLevel === "none") {
    return;
  }
  console.warn(`📒\t${message}`);
  printPayload(payload);
}

export function logError(message: string, payload?: unknown): void {
  if (logLevel === "none") {
    return;
  }
  console.error(`📕\t${message}`);
  printPayload(payload);
}

export function logRequest(payload: ClientRequest): void {
  if (logLevel === "none") {
    return;
  }
  if (payload.method === "OPTIONS") {
    return;
  }
  console.log(`💌\t${payload.endPoint}`);
  printPayload(payload);
}
export function logResponse(payload: ClientResponse): void {
  if (logLevel === "none") {
    return;
  }
  if (payload.clientRequest && payload.clientRequest.method === "OPTIONS") {
    return;
  }
  const statusHeart = statusColoredHearts[payload.status] || "💔";
  const statusMessage = payload.statusText || statusMessages[payload.status] || "Unknown";
  console.log(`${statusHeart}\t${statusMessage.toUpperCase()} ${payload.status} ${payload.clientRequest?.endPoint}`);
  printPayload(payload);
}

function printPayload(payload?: unknown): void {
  if (!payload) {
    return;
  }
  console.log(`\t${stringifyPayload(payload)}`);
  console.write("\n");
}

function stringifyPayload(payload: unknown): string {
  if (typeof payload === "object") {
    try {
      return JSON.stringify(payload);
    }
    catch (error: unknown) {
      console.error("Error stringifying payload", error);
    }
  }
  return (payload as string);
}

const statusColoredHearts: Record<string, string> = {
  "200": "💚",
  "201": "💙",
  "204": "💜",
  "400": "❤️ ",
  "401": "💔",
  "403": "💖",
  "404": "💗",
  "500": "💘",
};

const statusMessages: Record<string, string> = {
  "200": "OK",
  "201": "Created",
  "204": "No Content",
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden",
  "404": "Not Found",
  "500": "Internal Server Error",
};