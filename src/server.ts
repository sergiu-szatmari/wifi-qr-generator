import { router } from "./routes/index.ts";
import { config } from "./config.ts";

// Start the server & listen for requests
Deno.serve({ port: config.port }, (request: Request) => {
  return router.handle(request);
});
