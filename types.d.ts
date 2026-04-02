declare module "qrcode" {
  export function toDataURL(text: string, options?: any): Promise<string>;

  export function toFile(
    path: string,
    text: string,
    options?: any,
  ): Promise<void>;
}

export type HttpHandler = (request: Request) => Promise<Response> | Response;
