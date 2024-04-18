import type { Result } from "../domain/result.type";
import type { ClientRequest } from "./client_request.type";
import { ClientResponse } from "./client_response.class";

export async function getWebController(requestInfo: ClientRequest): Promise<Result<ClientResponse>> {
  if (requestInfo.endPoint === "/") {
    const homePage = `
      <html>
        <head>
          <title>API Bun</title>
        </head>
        <body>
          <h1><a href="https://github.com/AlbertoBasalo/api_bun">API Bun</a></h1>
          <p>Hello, this is your ready to to use REST server.</p>
          <p>Read the <a href="https://github.com/AlbertoBasalo/api_bun/blob/main/README.md">docs</a> for more information.</p>
          <p>Check the <a href="./activities">activities</a> sample endpoint.</p>
          <footer>Cooked with love by <a href="https://albertobasalo.dev">Alberto Basalo</a></footer>
        </body>
      </html>
    `;
    return { data: new ClientResponse(homePage, { headers: { "Content-Type": "text/html" } }) };
  }
  if (requestInfo.endPoint === "/favicon.ico") {
    return {
      data: new ClientResponse(null, { status: 204 }),
    };
  }
  return { data: undefined };
}
