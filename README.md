# wifi-qr-generator

Start app

```bash
deno run --allow-net --allow-read --allow-env src/server.ts
```

## 🧠 Big Picture

Web app for generating QR codes which can be used in connecting to local Wi-Fi. The app was started using **_Node.js + TypeScript_**, and successfully migrated it to **_Deno_**, keeping it as minimal and standalone as possible.

![Demo](./docs/app.gif)

<br/>

## 🛠️ Deno Setup

```bash
# You must install Deno on your local machine

# macOS / Linux
curl -fsSL https://deno.land/install.sh | sh

# Windows (PowerShell)
iwr https://deno.land/install.ps1 -useb | iex

# Verify installation
deno --version
```

<br/>

## ⚙️ Backend Progress

- Started with **Node.js + Express + TypeScript**
- Fixed:
  - missing/deprecated `@types/qrcode`
  - TS module issues (`CommonJS` vs `ESM`)
- Added custom `types.d.ts` for `qrcode` lib

<br/>

#### ➡️ Then migrated to Deno:

- Replaced `Express` with Deno native `serve()`
- Used `import QRCode from "npm:qrcode"`
- Ran with: `deno run --allow-net --allow-read --watch server.ts`
- Implemented:
  - API Endpoint: `POST /generate` → returns QR code (in base64 format)
  - static file serving from `/public/**`

#### 📝 Migration Summary

| Node.js                  | Deno                                         |
| ------------------------ | -------------------------------------------- |
| `express` server         | Built-in `serve()` from `std/http/server.ts` |
| `npm install qrcode`     | `import QRCode from "npm:qrcode"`            |
| `tsconfig.json` needed   | Native TypeScript, minimal config            |
| `package.json` scripts   | No npm scripts needed; use `deno run`        |
| `__dirname` / path hacks | Optional `import.meta.url` adjustments       |
| CommonJS module syntax   | ES Module syntax by default                  |

#### Architecture

- Basic architecture added, similar to Express/Hono. In-house router and handling of static assets fetching.
- Added some initial environment variables, just for the sake of experimenting with Deno 😅
- Must be started with: `deno run --allow-net --allow-read --allow-env src/server.ts`

<br/>

## 🎨 Frontend Progress

- Built a minimal **HTML/CSS/JS** UI
- Upgraded it to:
  - modern card layout
  - gradient background
  - Google font (Inter)
  - WiFi illustration
  - loading spinner animation
  - fade-in QR display
  - download QR button

<br/>

## 🙌 Credits

- Illustrations provided by [unDraw](https://undraw.co/) — free, open-source SVG illustrations
- Loading animations generated with [loading.io](https://loading.io/)
- Favicon provided by [FlatIcon](https://www.flaticon.com/)
