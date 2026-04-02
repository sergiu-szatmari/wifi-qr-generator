import { HttpHandler, IRouter, RouteDefinition } from "../types.ts";
import { staticHandler } from "./static.route.ts";

class Router implements IRouter {
  private routes: RouteDefinition[] = [];

  private register(routeDefinition: RouteDefinition) {
    this.routes.push(routeDefinition);
  }

  public get(path: string, handler: HttpHandler) {
    this.register({ method: "GET", path, handler });
  }
  public post(path: string, handler: HttpHandler) {
    this.register({ method: "POST", path, handler });
  }
  public put(path: string, handler: HttpHandler) {
    this.register({ method: "PUT", path, handler });
  }
  public patch(path: string, handler: HttpHandler) {
    this.register({ method: "PATCH", path, handler });
  }
  public delete(path: string, handler: HttpHandler) {
    this.register({ method: "DELETE", path, handler });
  }
  public options(path: string, handler: HttpHandler) {
    this.register({ method: "OPTIONS", path, handler });
  }

  public async handle(request: Request) {
    const url = new URL(request.url);

    const matchingRoute = this.routes.find(
      ({ method, path }) => method === request.method && path === url.pathname,
    );

    console.log({ path: url.pathname, method: request.method, matchingRoute });

    if (!matchingRoute) {
      // If no registered route matches, the request may
      // be sent by Frontend (fetching static assets)
      return staticHandler(request);
    }

    return matchingRoute.handler(request);
  }
}

export const router = new Router();
