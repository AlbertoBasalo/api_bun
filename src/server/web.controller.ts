import type { ClientRequest } from "./client_request.type";
import { ClientResponse } from "./client_response.class";

const webHeaders = { headers: { "Content-Type": "text/html" } };
export async function getWebController(requestInfo: ClientRequest): Promise<ClientResponse> {
  if (requestInfo.endPoint === "/") {
    return getHomePageWebResponse();
  }
  if (requestInfo.endPoint === "/favicon.ico") {
    return getEmptyWebResponse();
  }
  return getNotFoundWebResponse();
}
function getHomePageWebResponse() {
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
  return new ClientResponse(homePage, webHeaders);
}

function getEmptyWebResponse(): ClientResponse {
  return new ClientResponse("", { ...webHeaders, status: 204 });
}

function getNotFoundWebResponse(): ClientResponse {
  return new ClientResponse("Resource not found", { ...webHeaders, status: 404 });
}