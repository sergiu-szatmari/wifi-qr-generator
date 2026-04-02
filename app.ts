import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import QRCode from "npm:qrcode";

serve(
  async (req) => {
    const url = new URL(req.url);

    // Serve frontend
    if (req.method === "GET") {
      return getHandler(url);
    }

    // API endpoint
    if (req.method === "POST" && url.pathname === "/generate") {
      const { ssid, password, security } = await req.json();

      const wifiString = `WIFI:T:${security};S:${ssid};P:${password};;`;

      const qr = await QRCode.toDataURL(wifiString);

      return Response.json({ qr });
    }

    return new Response("Not Found", { status: 404 });
  },
  { port: 3000 },
);

async function getHandler(url: URL) {
  let filePath = `./public${url.pathname}`;
  if (url.pathname === "/") filePath = "./public/index.html";

  try {
    const file = await Deno.readFile(filePath);
    const ext = filePath.split(".").pop()?.toLowerCase();
    const contentType =
      ext === "html"
        ? "text/html"
        : ext === "css"
          ? "text/css"
          : ext === "js"
            ? "text/javascript"
            : ext === "svg"
              ? "image/svg+xml"
              : ext === "png"
                ? "image/png"
                : ext === "ico"
                  ? "image/x-icon"
                  : "application/octet-stream";

    return new Response(file, { headers: { "content-type": contentType } });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
  /////////////////////
  ///
  if (url.pathname !== "/") throw new Error(`unhandled path "${url.pathname}"`);

  const html = await Deno.readTextFile("./public/index.html");
  return new Response(html, { headers: { "content-type": "text/html" } });
}
