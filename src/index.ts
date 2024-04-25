import { API_BUN_CONFIG } from "./api_bun.config";
import { logError, logInfo } from "./domain/log.service";
import { handleRequest } from "./server/request.handler";

const server = Bun.serve({
	port: 3000,
	fetch(req) {
		try {
			if (isFavIcon(req)) return new Response(null, { status: 204 });
			return handleRequest(req);
		} catch (error: unknown) {
			logError("Fatal Error processing request", { error, req });
			const message = getErrorMessage(error);
			return new Response(message, { status: 500 });
		}
	},
});

function getErrorMessage(error: unknown) {
	return error instanceof Error ? error.message : "Internal server error";
}

function isFavIcon(req: Request) {
	return new URL(req.url).pathname === "/favicon.ico";
}

function main() {
	console.clear();
	logInfo(`API-bun is listening on ${server.url} 🥖`, API_BUN_CONFIG);
	const recipe = {
		bun: "https://bun.sh",
		baker: "https://twitter.com/AlbertoBasalo",
	};
	logInfo("Delicious JSON fast food ready to consume. ☕");
	logInfo(`Cooked with ${recipe.bun} 🫶; by ${recipe.baker} 🧑‍🍳`, recipe);
	const sampleEndPoint = `${server.url}api/activities`;
	logInfo(`Try the sample ${sampleEndPoint} end point 🍳`);
}

main();
