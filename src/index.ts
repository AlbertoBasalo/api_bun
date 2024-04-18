import { API_BUN_CONFIG } from "./api_bun.config";
import { logError, logInfo } from "./domain/log.service";
import { handleRequest } from "./server/request.controller";

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    try {
      return handleRequest(req);
    } catch (error: unknown) {
      logError("Error processing request", error);
      const message = error instanceof Error ? error.message : "Internal server error";
      return new Response(message, { status: 500 });
    }
  },
});

logInfo(`API-bun is listening on ${server.url}`, API_BUN_CONFIG);
