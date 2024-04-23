import { logResponse } from "../domain/log.service";
import type { ClientRequest } from "./client_request.type";

/**
 * Class to create a response object for the client
 */
export class ClientResponse extends Response {
  bytes = 0;
  status = super.status;
  clientRequest: ClientRequest | undefined;
  constructor(reqRes: RequestResponse) {
    const body = reqRes.body;
    const bodyString = body ? (typeof body === "object" ? JSON.stringify(body) : body.toString()) : "";
    const options = { status: reqRes.status };
    super(bodyString, options);
    this.headers.set("Access-Control-Allow-Headers", "*");
    this.headers.set("Access-Control-Allow-Methods", "*");
    this.headers.set("Access-Control-Allow-Origin", "*");
    if (reqRes.clientRequest?.root === "api") {
      this.headers.set("Content-Type", "application/json");
    } else {
      this.headers.set("Content-Type", "text/html");
    }
    this.bytes = bodyString.length;
    this.clientRequest = reqRes.clientRequest;
    logResponse(this);
  }
}

export type RequestResponse = {
  clientRequest: ClientRequest;
} & MyResponse;

export type MyResponse = {
  status: number;
  body?: unknown;
}


//this.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");