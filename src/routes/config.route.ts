import { config } from "../config/app.config.ts";
import { json } from "../utils/response.ts";
import type { HttpHandler } from "../types.ts";

export const configHandler: HttpHandler = () => {
  return json({
    wifi: config.wifi,
  });
};
