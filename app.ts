import express from "express";
import QRCode from "qrcode";
import path from "path";

const PUBLIC_DIR_PATH = path.join(__dirname, "./public");

const app = express();

app.use(express.json());

app.use(express.static(PUBLIC_DIR_PATH));

app.post("/generate", async (req, res) => {
  const { ssid, password, security } = req.body;

  const wifiString = `WIFI:T:${security};S:${ssid};P:${password};;`;

  try {
    const qr = await QRCode.toDataURL(wifiString);
    res.json({ qr });
  } catch (err) {
    res.status(500).send("QR generation failed");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
