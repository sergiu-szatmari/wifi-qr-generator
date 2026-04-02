import type { HttpHandler, HttpMethod, RouteDefinition } from "./types.ts";

export class Router {
  private routes: RouteDefinition[] = [];

  register(method: HttpMethod, path: string, handler: HttpHandler): void {
    this.routes.push({ method, path, handler });
  }

  get(path: string, handler: HttpHandler): void {
    this.register("GET", path, handler);
  }

  post(path: string, handler: HttpHandler): void {
    this.register("POST", path, handler);
  }

  put(path: string, handler: HttpHandler): void {
    this.register("PUT", path, handler);
  }

  patch(path: string, handler: HttpHandler): void {
    this.register("PATCH", path, handler);
  }

  delete(path: string, handler: HttpHandler): void {
    this.register("DELETE", path, handler);
  }

  options(path: string, handler: HttpHandler): void {
    this.register("OPTIONS", path, handler);
  }

  find(request: Request): HttpHandler | undefined {
    const url = new URL(request.url);

    return this.routes.find(
      ({ method, path }) => method === request.method && path === url.pathname,
    )?.handler;
  }
}
