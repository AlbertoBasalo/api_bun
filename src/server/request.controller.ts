import { ClientResponse } from "../domain/client_response.class";
import { deleteController, getController, postController, putController } from "../api/api.controller";

import { getWebController } from "./web.controller";
import { extractInfo } from "../domain/request.service";
import type { ClientRequest } from "../domain/client_request.type";

export async function handleRequest(request: Request): Promise<ClientResponse> {
  const clientRequest: ClientRequest | undefined = await extractInfo(request);
  if (!clientRequest) {
    return new ClientResponse("Bad request", { status: 400 });
  }
  switch (clientRequest.method) {
    case "GET":
      const pageResponse = await getWebController(clientRequest);
      if (pageResponse) return pageResponse;
      return await getController(clientRequest);
    case "POST":
      return await postController(clientRequest);
    case "PUT":
      return await putController(clientRequest);
    case "DELETE":
      return await deleteController(clientRequest);
    case "OPTIONS":
      return new ClientResponse("OK");
    default:
      return new ClientResponse("Method Not Allowed", { status: 200 });
  }
}
