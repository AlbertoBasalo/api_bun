import { deleteController, getController, postController, putController } from "../api/api.controller";
import { buildClientRequest } from "./client_request.service";
import type { ClientRequest } from "./client_request.type";
import { ClientResponse } from "./client_response.class";
import { getWebController } from "./web.controller";

export async function handleRequest(request: Request): Promise<ClientResponse> {
  const clientRequest: ClientRequest = await buildClientRequest(request);
  switch (clientRequest.method) {
    case "GET":
      {
        const webResponseResult = await getWebController(clientRequest);
        if (webResponseResult.data) return webResponseResult.data;
        return await getController(clientRequest);
      }
    case "POST":
      return await postController(clientRequest);
    case "PUT":
      return await putController(clientRequest);
    case "DELETE":
      return await deleteController(clientRequest);
    case "OPTIONS":
      return new ClientResponse("No Content", { status: 204 }, clientRequest);
    default:
      return new ClientResponse("Method Not Allowed", { status: 405 }, clientRequest);
  }
}
