import { deleteResource, getResource, postResource, putResource } from "./api/resource.controller";
import { extractInfo } from "./model/request_info.type";
import { API_BUN_CONFIG } from "./util/api_bun.config";
import { logError, logInfo } from "./util/log.service";
import { getPage } from "./web/web.controller";

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

async function handleRequest(request: Request) {
  const requestInfo = await extractInfo(request);
  if (!requestInfo) {
    return new Response("Bad request", { status: 400 });
  }
  switch (requestInfo.method) {
    case "GET":
      const page = await getPage(requestInfo);
      if (page) return page;
      return await getResource(requestInfo);
    case "POST":
      return await postResource(requestInfo);
    case "PUT":
      return await putResource(requestInfo);
    case "DELETE":
      return await deleteResource(requestInfo);
    default:
      return new Response("Method Not Allowed", { status: 405 });
  }
}
