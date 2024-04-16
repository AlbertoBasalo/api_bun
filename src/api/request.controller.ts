import { ClientResponse } from "../domain/client_response.class";
import { extractInfo } from "../domain/request_info.type";
import { deleteController, getController, postController, putController } from "./api.controller";
import { getWebController } from "./web.controller";

export async function handleRequest(request: Request): Promise<Response> {
  const requestInfo = await extractInfo(request);
  if (!requestInfo) {
    return new ClientResponse("Bad request", { status: 400 });
  }
  switch (requestInfo.method) {
    case "GET":
      const pageResponse = await getWebController(requestInfo);
      if (pageResponse) return pageResponse;
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
      return new ClientResponse("Method Not Allowed", { status: 200 });
  }
}
