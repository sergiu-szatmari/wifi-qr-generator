import QRCode from "npm:qrcode";
import type { GenerateWifiQrRequest } from "../types.ts";

export const buildWifiQrString = ({
  ssid,
  password,
  security,
}: GenerateWifiQrRequest): string => {
  const safeSsid = ssid.trim();
  const safePassword = password?.trim() ?? "";

  if (security === "nopass") {
    return `WIFI:T:nopass;S:${safeSsid};;`;
  }

  return `WIFI:T:${security};S:${safeSsid};P:${safePassword};;`;
};

export const generateWifiQrDataUrl = async (
  input: GenerateWifiQrRequest,
): Promise<string> => {
  const wifiQrString = buildWifiQrString(input);

  return await QRCode.toDataURL(wifiQrString);
};
