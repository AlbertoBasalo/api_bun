import { deleteController, getController, postController, putController } from "../api/api.controller";
import { ClientResponse } from "./client_response.class";

import type { Result } from "../domain/result.type";
import { buildClientRequest } from "./client_request.service";
import type { ClientRequest } from "./client_request.type";
import { getWebController } from "./web.controller";

export async function handleRequest(request: Request): Promise<ClientResponse> {
  const clientRequestResult: Result<ClientRequest> = await buildClientRequest(request);
  const clientRequest = clientRequestResult.data;
  if (!clientRequest) {
    return new ClientResponse(clientRequestResult.error, { status: 400 });
  }
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
      return new ClientResponse("OK");
    default:
      return new ClientResponse("Method Not Allowed", { status: 405 });
  }
}
