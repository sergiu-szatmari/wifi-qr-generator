import { Router } from "../router.ts";
import { configHandler } from "./config.route.ts";
import { healthHandler } from "./health.route.ts";
import { qrHandler } from "./qr.route.ts";

export const registerRoutes = (router: Router): void => {
  router.get("/health", healthHandler);
  router.post("/api/qr", qrHandler);
  router.get("/api/config", configHandler);
};
