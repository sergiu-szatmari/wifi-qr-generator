import type {
  ErrorResponse,
  GenerateWifiQrResponse,
  HttpHandler,
} from "../types.ts";
import { generateWifiQrDataUrl } from "../services/wifi-qr.service.ts";
import { validateGenerateWifiQrRequest } from "../services/wifi-qr.validation.ts";

export const qrHandler: HttpHandler = async (request) => {
  try {
    const body = await request.json();
    const validationResult = validateGenerateWifiQrRequest(body);

    if (!validationResult.success) {
      return Response.json<ErrorResponse>(validationResult.error, {
        status: 400,
      });
    }

    const qr = await generateWifiQrDataUrl(validationResult.data);

    return Response.json<GenerateWifiQrResponse>({ qr }, { status: 200 });
  } catch {
    return Response.json<ErrorResponse>(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }
};
