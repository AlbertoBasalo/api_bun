import { logTrace } from "../domain/log.service";

/**
 * Class to create a response object for the client
 */
export class ClientResponse extends Response {
  constructor(body?: unknown, init?: ResponseInit) {
    const bodyString = body ? JSON.stringify(body) : "";
    const options = init || { status: 200, statusText: "OK" };
    super(bodyString, options);
    this.headers.set("Access-Control-Allow-Headers", "*");
    this.headers.set("Access-Control-Allow-Methods", "*");
    this.headers.set("Access-Control-Allow-Origin", "*");
    const bytes = bodyString.length;
    if (bytes) logTrace(`Response: ${this.status}`, { bytes });
  }
}

//this.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");