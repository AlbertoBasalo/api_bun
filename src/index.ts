import { API_BUN_CONFIG } from "./api_bun.config";
import { logError, logInfo } from "./domain/log.service";
import { handleRequest } from "./server/request.controller";

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    try {
      if (new URL(req.url).pathname === '/favicon.ico') return new Response(null, { status: 204 });
      return handleRequest(req);
    } catch (error: unknown) {
      logError("Error processing request", { error, req });
      const message = error instanceof Error ? error.message : "Internal server error";
      return new Response(message, { status: 500 });
    }
  },
});

console.clear();
logInfo(`API-bun is listening on ${server.url} 🥖`, API_BUN_CONFIG);
const recipe = { cookedWith: "https://bun.sh", baker: "https://twitter.com/AlbertoBasalo" };
logInfo("Delicious JSON fast food ready to consume. ☕", recipe);
logInfo("Try the sample `activities` end point 🍳", `${server.url}api/activities`);
