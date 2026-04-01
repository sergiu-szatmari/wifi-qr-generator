# wifi-qr-generator

A minimal WiFi QR code generator web app, originally built with Node.js + TypeScript, now migrated to Deno.  
Primary purpose: generating QR codes to allow devices to connect to your home WiFi quickly.

---

## 1. Original Node.js Version

- **Frontend:** Simple HTML form in `public/index.html`
- **Backend:** Node.js + TypeScript + Express
  - **Dependencies:** `qrcode` npm package
  - **Flow:** User opens `/`, submit (SSID & password & security type)
  3. `/generate` endpoint returns Base64 QR code
  4. QR code scanned → OS prompts device to join WiFi

**Notes:**

- TypeScript required a `types.d.ts` file to define min `qrcode` types
- `tsconfig.json` configured for _CommonJS_ with `esModuleInterop`

---

## 2. Migration to Deno

| Node.js                  | Deno                                         |
| ------------------------ | -------------------------------------------- |
| `express` server         | Built-in `serve()` from `std/http/server.ts` |
| `npm install qrcode`     | `import QRCode from "npm:qrcode"`            |
| `tsconfig.json` needed   | Native TypeScript, minimal config            |
| `package.json` scripts   | No npm scripts needed; use `deno run`        |
| `__dirname` / path hacks | Optional `import.meta.url` adjustments       |
| CommonJS module syntax   | ES Module syntax by default                  |

---

## 3. Deno Setup

### Install Deno

```bash
# macOS / Linux
curl -fsSL https://deno.land/install.sh | sh

# Windows (PowerShell)
iwr https://deno.land/install.ps1 -useb | iex

# Verify installation
deno --version
```
