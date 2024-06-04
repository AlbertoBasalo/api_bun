import { API_BUN_CONFIG } from "../api_bun.config";
import type { ClientRequest } from "../server/client_request.type";
import type { ClientResponse } from "../server/client_response.class";

type LogLevel = "none" | "info" | "verbose";

const logLevel: LogLevel = API_BUN_CONFIG.LOG_LEVEL as LogLevel;

export function logTrace(message: string, payload?: unknown): void {
	if (logLevel !== "verbose") return;
	console.log(`📖\t${message}`);
	printPayload(payload);
}

export function logInfo(message: string, payload?: unknown): void {
	if (logLevel === "none") return;
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

export function logRequest(clientRequest: ClientRequest): void {
	if (logLevel !== "verbose") return;
	if (clientRequest.method === "OPTIONS") return;
	const request = getLogForRequest(clientRequest);
	console.log(`💌\t${request}`);
	printPayload(clientRequest);
}
export function logResponse(clientResponse: ClientResponse): void {
	if (logLevel === "none") return;
	if (clientResponse.clientRequest?.method === "OPTIONS") return;
	const status = getLogForStatus(clientResponse);
	const request = getLogForRequest(clientResponse.clientRequest);
	console.log(`${status} ${request} `);
	printPayload(clientResponse);
}

function getLogForRequest(clientRequest?: ClientRequest) {
	return `${clientRequest?.method.padEnd(6, " ")} ${clientRequest?.url}`;
}

function printPayload(payload?: unknown): void {
	if (!payload) return;
	if (logLevel !== "verbose") return;
	console.log(`\t${stringifyPayload(payload)}`);
	console.write("\n");
}

function stringifyPayload(payload: unknown): string {
	if (typeof payload !== "object") return payload as string;
	try {
		return JSON.stringify(payload);
	} catch (error: unknown) {
		console.error("Error stringifying payload", error);
		return "";
	}
}

function getLogForStatus(clientResponse: ClientResponse): string {
	const status = clientResponse.status;
	const heart = statusColoredHearts[status] || "💔";
	const text = clientResponse.statusText || statusMessages[status] || "Unknown";
	const statusLog = `${heart}\t${status} ${text.toUpperCase().slice(0, 12).padEnd(12, " ")}`;
	return statusLog;
}

const statusColoredHearts: Record<string, string> = {
	"200": "💚",
	"201": "💙",
	"204": "💜",
	"400": "💔 ",
	"401": "💘",
	"403": "💘",
	"404": "💗",
	"500": "🖤",
};

const statusMessages: Record<string, string> = {
	"200": "OK",
	"201": "Created",
	"204": "No Content",
	"400": "Bad Request",
	"401": "Unauthorized",
	"403": "Forbidden",
	"404": "Not Found",
	"500": "Server Error",
};
