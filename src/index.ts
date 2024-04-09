import { extractInfo } from "./api/request.info";
import { deleteResource, getResource, postResource, putResource } from "./api/resource.controller";

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    try {
      return handleRequest(req);
    } catch (error: any) {
      return new Response(error.message, { status: 500 });
    }
  },
});

console.log(`Listening on ${server.url}`);

async function handleRequest(request: Request) {
  let requestInfoOption = await extractInfo(request);
  if (!requestInfoOption.result || requestInfoOption.error) {
    return new Response(requestInfoOption.error, { status: 500 });
  }
  const requestInfo = requestInfoOption.result;
  switch (requestInfo.method) {
    case "GET":
      const path = new URL(request.url).pathname;
      if (path === "/") {
        return new Response("Hello, World!");
      }
      if (path === "/favicon.ico") {
        return new Response(null, { status: 204 });
      }
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
