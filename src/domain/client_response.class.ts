import { logTrace } from "./log.service";

export class ClientResponse extends Response {
  constructor(body?: any, init?: any) {
    super(JSON.stringify(body), init);
    this.headers.set("Access-Control-Allow-Origin", "*");
    this.headers.set("Access-Control-Allow-Methods", "*");
    this.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (body?.length) logTrace(`Response: ${this.status}`, { size: body?.length });
  }
}
