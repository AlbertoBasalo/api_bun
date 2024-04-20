import { logResponse, logTrace } from "../domain/log.service";
import type { ClientRequest } from "./client_request.type";

/**
 * Class to create a response object for the client
 */
export class ClientResponse extends Response {
  bytes = 0;
  status = super.status;
  clientRequest: ClientRequest | undefined;
  constructor(body?: unknown, init?: ResponseInit, clientRequest?: ClientRequest) {
    const bodyString = body ? (typeof body === "object" ? JSON.stringify(body) : body.toString()) : "";
    const options = init || { status: 200, statusText: "OK" };
    super(bodyString, options);
    this.headers.set("Access-Control-Allow-Headers", "*");
    this.headers.set("Access-Control-Allow-Methods", "*");
    this.headers.set("Access-Control-Allow-Origin", "*");
    this.bytes = bodyString.length;
    this.clientRequest = clientRequest;
    logResponse(this);
  }
}



//this.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");