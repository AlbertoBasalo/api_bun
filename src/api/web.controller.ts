import type { ClientRequest } from "../server/client_request.type";
import { ClientResponse, type MyResponse } from "../server/client_response.class";

/**
 * Handles the web request and returns the corresponding html response
 * @param request The http native request
 * @returns A promise with the client response
 */
export async function getWebController(clientRequest: ClientRequest): Promise<ClientResponse> {
	let myResponse = getNotFoundWebResponse(clientRequest);
	if (clientRequest.endPoint === "/") {
		myResponse = getHomePageWebResponse();
	}
	return new ClientResponse({ ...myResponse, clientRequest });
}
function getHomePageWebResponse(): MyResponse {
	const body = `
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
              <li>Check the <a href="./api/activities">activities</a> sample endpoint.</li>
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
	return {
		body,
		status: 200,
	};
}

function getNotFoundWebResponse(clientRequest: ClientRequest): MyResponse {
	const body = `Not found: ${clientRequest.endPoint}`;
	const status = 404;
	return { body, status };
}
