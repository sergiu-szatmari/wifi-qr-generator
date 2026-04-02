import { Router } from "./router.ts";
import { healthHandler } from "./routes/health.route.ts";
import { qrHandler } from "./routes/qr.route.ts";
import { staticHandler } from "./routes/static.route.ts";

const router = new Router();
router.get("/health", healthHandler);
router.post("/api/qr", qrHandler);

// Start the server and listen for requests
// serve(
// ,
//   { port: 3000 },
// );
Deno.serve({ port: 3000 }, async (request: Request) => {
  const handler = router.find(request);
  if (handler) return handler(request);

  // If no handler is found, can be a static asset fetch
  return staticHandler(request);
});
