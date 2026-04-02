// Fix for "npm:qrcode" types
declare module "qrcode" {
  export function toDataURL(text: string, options?: any): Promise<string>;

  export function toFile(
    path: string,
    text: string,
    options?: any,
  ): Promise<void>;
}

export type HttpHandler = (request: Request) => Promise<Response> | Response;
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS";

export type RouteDefinition = {
  method: HttpMethod;
  path: string;
  handler: HttpHandler;
};

export type WifiSecurity = "WPA" | "WEP" | "nopass";

export type GenerateWifiQrRequest = {
  ssid: string;
  password?: string;
  security: WifiSecurity;
};

export type GenerateWifiQrResponse = {
  qr: string;
};

export type ErrorResponse = {
  error: string;
};
