import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import QRCode from "npm:qrcode";

serve(
  async (req) => {
    const url = new URL(req.url);

    // Serve frontend
    if (req.method === "GET" && url.pathname === "/") {
      const html = await Deno.readTextFile("./public/index.html");
      return new Response(html, {
        headers: { "content-type": "text/html" },
      });
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
