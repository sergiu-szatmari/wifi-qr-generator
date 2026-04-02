import type { WifiSecurity } from "./types.ts";

const getEnv = (key: string, fallback?: string): string => {
  return Deno.env.get(key) ?? fallback ?? "";
};

export const config = {
  port: Number(getEnv("PORT", "3000")),

  wifi: {
    defaultSsid: getEnv("DEFAULT_SSID", ""),
    defaultPassword: getEnv("DEFAULT_PASSWORD", ""),
    defaultSecurity: getEnv("DEFAULT_SECURITY", "WPA") as WifiSecurity,
  },
};
