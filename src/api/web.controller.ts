import type { RequestInfo } from "./request_info.type";

export async function getWebController(requestInfo: RequestInfo): Promise<Response | null> {
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
    return new Response(homePage, { headers: { "Content-Type": "text/html" } });
  }
  if (requestInfo.endPoint === "/favicon.ico") {
    return new Response(null, { status: 204 });
  }
  return null;
}
