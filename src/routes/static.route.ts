import { fromFileUrl, join } from "jsr:@std/path";
import type { HttpHandler } from "../types.ts";
import { notFound } from "../utils/response.ts";

const getContentType = (path: string): string => {
  if (path.endsWith(".html")) return "text/html; charset=utf-8";
  if (path.endsWith(".css")) return "text/css; charset=utf-8";
  if (path.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (path.endsWith(".svg")) return "image/svg+xml";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".ico")) return "image/x-icon";
  if (path.endsWith(".json")) return "application/json; charset=utf-8";
  if (path.endsWith(".txt")) return "text/plain; charset=utf-8";

  return "application/octet-stream";
};

const CURRENT_DIR = fromFileUrl(new URL(".", import.meta.url));
const PUBLIC_DIR = join(CURRENT_DIR, "..", "public");

const resolvePublicFilePath = (pathname: string): string => {
  if (pathname === "/") {
    return join(PUBLIC_DIR, "index.html");
  }

  const sanitizedPath = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  return join(PUBLIC_DIR, sanitizedPath);
};

export const staticHandler: HttpHandler = async (request) => {
  const url = new URL(request.url);
  const filePath = resolvePublicFilePath(url.pathname);

  try {
    const file = await Deno.readFile(filePath);

    return new Response(file, {
      status: 200,
      headers: {
        "content-type": getContentType(filePath),
      },
    });
  } catch (err) {
    console.error(err);
    return notFound();
  }
};
