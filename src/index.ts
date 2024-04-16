import { handleRequest } from "./api/request.controller";
import { API_BUN_CONFIG } from "./api_bun.config";
import { logError, logInfo } from "./domain/log.service";

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    try {
      return handleRequest(req);
    } catch (error: any) {
      logError("Error processing request", error);
      return new Response(error.message, { status: 500 });
    }
  },
});

logInfo(`Listening on ${server.url}`, API_BUN_CONFIG);
