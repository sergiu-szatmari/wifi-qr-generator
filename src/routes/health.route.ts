import type { HttpHandler } from "../types.ts";

export const healthHandler: HttpHandler = () => {
  // return Response.json({
  //   status: "ok",
  //   service: "wifi-qr-generator",
  // });
  return new Response("OK", { status: 200 });
};
