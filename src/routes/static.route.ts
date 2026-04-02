import type { HttpHandler } from "../types.ts";

export const staticHandler: HttpHandler = async (request) => {
  const url = new URL(request.url);

  let filePath = "./public" + url.pathname;

  if (url.pathname === "/") {
    filePath = "./public/index.html";
  }

  try {
    const file = await Deno.readFile(filePath);

    return new Response(file, {
      status: 200,
      headers: {
        "content-type": getContentType(filePath),
      },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
};

function getContentType(path: string): string {
  if (path.endsWith(".html")) return "text/html; charset=utf-8";
  if (path.endsWith(".css")) return "text/css; charset=utf-8";
  if (path.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (path.endsWith(".svg")) return "image/svg+xml";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".ico")) return "image/x-icon";
  if (path.endsWith(".json")) return "application/json; charset=utf-8";

  return "application/octet-stream";
}
