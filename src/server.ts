import { Router } from "./router.ts";
import { registerRoutes } from "./routes/index.ts";
import { staticHandler } from "./routes/static.route.ts";
import { config } from "./config/app.config.ts";

const router = new Router();
registerRoutes(router);

// Start the server and listen for requests
Deno.serve({ port: config.port }, async (request: Request) => {
  const handler = router.find(request);
  if (handler) return handler(request);

  // If no handler is found, the request
  // may be a static asset fetch
  return staticHandler(request);
});
