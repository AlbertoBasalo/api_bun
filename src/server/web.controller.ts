import type { Result } from "../domain/result.type";
import type { ClientRequest } from "./client_request.type";
import { ClientResponse } from "./client_response.class";

export async function getWebController(requestInfo: ClientRequest): Promise<Result<ClientResponse>> {
  if (requestInfo.endPoint === "/") {
    const homePage = `
    <!DOCTYPE html>
      <html lang="en" >
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2.0.6/css/pico.classless.min.css"/>
          <title>🥖 API Bun</title>
        </head>
        <body>
          <header>  
            <h1>🥖<a href="https://github.com/AlbertoBasalo/api_bun" target="_blank" >API Bun</a></h1>
            <h3>☕ Your delicious and fast Rest API ready to consume.</h3>
          </header>
          <main >
            <ul>
              <li>For rapid prototypes.</li>
              <li>For small pet projects.</li>
              <li>For educational purposes.</li>
              <li>Read the <a href="https://github.com/AlbertoBasalo/api_bun/blob/main/README.md" target="_blank" >docs</a> for more information.</li>
              <li>Check the <a href="./activities">activities</a> sample endpoint.</li>
            </ul>
          </main>
          <footer>
            <blockquote>
              🧑‍🍳 Cooked with <a href="https://bun.sh" target="_blank">bun</a> and love
              <footer><cite>by <a href="https://albertobasalo.dev" target="_blank" >Alberto Basalo</a></cite></footer>
            </blockquote>
          </footer>
        </body>
      </html>
    `;
    return { data: new ClientResponse(homePage, { headers: { "Content-Type": "text/html" } }) };
  }
  if (requestInfo.endPoint === "/favicon.ico") {
    return {
      data: new ClientResponse("", { status: 204 }),
    };
  }
  return { data: undefined };
}
