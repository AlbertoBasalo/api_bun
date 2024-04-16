import { deleteController, getController, postController, putController } from "./api/api.controller";
import { getWebController } from "./api/web.controller";
import { API_BUN_CONFIG } from "./api_bun.config";
import { ClientResponse } from "./domain/client_response.class";
import { logError, logInfo } from "./domain/log.service";
import { extractInfo } from "./domain/request_info.type";

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

async function handleRequest(request: Request): Promise<Response> {
  const requestInfo = await extractInfo(request);
  if (!requestInfo) {
    return new Response("Bad request", { status: 400 });
  }
  switch (requestInfo.method) {
    case "GET":
      const page = await getWebController(requestInfo);
      if (page) return page;
      return await getController(requestInfo);
    case "POST":
      return await postController(requestInfo);
    case "PUT":
      return await putController(requestInfo);
    case "DELETE":
      return await deleteController(requestInfo);
    case "OPTIONS":
      return new ClientResponse("OK");
    default:
      return new Response("Method Not Allowed", { status: 200 });
  }
}
