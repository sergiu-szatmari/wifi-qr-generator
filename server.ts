import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import QRCode from "npm:qrcode";

import type { HttpHandler } from "./types";

const handler: HttpHandler = async (request) => {
  const url = new URL(request.url);

  switch (request.method) {
    case "GET":
      return getHandler(url);
    case "POST":
      return postHandler(url, request);
    default:
      return new Response("Not Found", { status: 404 });
  }
};

async function getHandler(url: URL): Promise<Response> {
  try {
    const path = url.pathname.includes("favicon")
      ? "./public/favicon.ico" // Buggy favicon fetch handling
      : url.pathname === "/"
        ? "./public/index.html" // UI Handling
        : `./public${url.pathname}`; // Static assets handling

    const file = await Deno.readTextFile(path);

    const ext = path.split(".").pop()?.toLowerCase();
    const contentType = getContentType(ext);

    return new Response(file, { headers: { "content-type": contentType } });
  } catch (err) {
    console.error(err);
    return new Response("Not Found", { status: 404 });
  }
}

async function postHandler(url: URL, req: Request): Promise<Response> {
  if (url.pathname !== "/generate") {
    return new Response("Not Found", { status: 404 });
  }

  const { ssid, password, security } = await req.json();
  const wifiString = `WIFI:T:${security};S:${ssid};P:${password};;`;

  const qr = await QRCode.toDataURL(wifiString);

  return Response.json({ qr });
}

function getContentType(ext?: string) {
  if (!ext) return "application/octet-stream";

  const contentType = {
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
    svg: "image/svg+xml",
    png: "image/png",
    ico: "image/x-icon",
  }[ext];

  return contentType ?? "application/octet-stream";
}

// Start the server and listen for requests
serve(handler, { port: 3000 });
