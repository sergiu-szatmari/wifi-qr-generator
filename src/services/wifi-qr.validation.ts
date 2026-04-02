import type {
  ErrorResponse,
  GenerateWifiQrRequest,
  WifiSecurity,
} from "../types.ts";

const ALLOWED_SECURITIES: WifiSecurity[] = ["WPA", "WEP", "nopass"];

type ValidationSuccess = {
  success: true;
  data: GenerateWifiQrRequest;
};

type ValidationFailure = {
  success: false;
  error: ErrorResponse;
};

export type ValidationResult = ValidationSuccess | ValidationFailure;

export const validateGenerateWifiQrRequest = (
  input: unknown,
): ValidationResult => {
  if (typeof input !== "object" || input === null) {
    return {
      success: false,
      error: { error: "Request body must be a JSON object" },
    };
  }

  const body = input as Record<string, unknown>;

  const ssid = body.ssid;
  const password = body.password;
  const security = body.security;

  if (typeof ssid !== "string" || ssid.trim().length === 0) {
    return {
      success: false,
      error: { error: "SSID is required" },
    };
  }

  if (ssid.trim().length > 32) {
    return {
      success: false,
      error: { error: "SSID must be 32 characters or fewer" },
    };
  }

  if (
    typeof security !== "string" ||
    !ALLOWED_SECURITIES.includes(security as WifiSecurity)
  ) {
    return {
      success: false,
      error: { error: "Security must be one of: WPA, WEP, nopass" },
    };
  }

  if (security !== "nopass") {
    if (typeof password !== "string" || password.trim().length === 0) {
      return {
        success: false,
        error: { error: "Password is required unless security is nopass" },
      };
    }
  }

  return {
    success: true,
    data: {
      ssid: ssid.trim(),
      password: typeof password === "string" ? password.trim() : undefined,
      security: security as WifiSecurity,
    },
  };
};
