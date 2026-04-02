import type { GenerateWifiQrResponse, HttpHandler } from "../types.ts";
import { generateWifiQrDataUrl } from "../services/wifi-qr.service.ts";
import { validateGenerateWifiQrRequest } from "../services/wifi-qr.validation.ts";
import { badRequest, internalServerError, json } from "../utils/response.ts";

export const qrHandler: HttpHandler = async (request) => {
  try {
    const body = await request.json();
    const validationResult = validateGenerateWifiQrRequest(body);

    if (!validationResult.success) {
      return badRequest(validationResult.error.error);
    }

    const qr = await generateWifiQrDataUrl(validationResult.data);

    return json<GenerateWifiQrResponse>({ qr });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return badRequest("Invalid JSON body");
    }

    return internalServerError("Failed to generate QR code");
  }
};
