import { router } from "./routes/index.ts";
import { registerRoutes } from "./routes/index.ts";
import { config } from "./config.ts";

registerRoutes(router);

// Start the server and listen for requests
Deno.serve({ port: config.port }, (request: Request) => {
  return router.handle(request);
});
