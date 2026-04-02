import type { HttpHandler } from "../types.ts";
import { json } from "../utils/response.ts";

export const healthHandler: HttpHandler = () => {
  return json({
    status: "ok",
    service: "wifi-qr-generator",
  });
};
