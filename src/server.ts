import { router } from "./routes/index.ts";
import { registerRoutes } from "./routes/index.ts";
import { config } from "./config.ts";

// Firstly, register all routes
// after initializing the router
registerRoutes(router);

// Then, start the server & listen for requests
Deno.serve({ port: config.port }, (request: Request) => {
  return router.handle(request);
});
