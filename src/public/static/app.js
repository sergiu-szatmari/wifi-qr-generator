const $ = (selector) => document.querySelector(selector);

const form = $("#wifi-form");
const qrContainer = $("#qr-container");
const qrImg = $("#qr");
const loading = $("#loading");
const download = $("#download");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  qrContainer.classList.remove("show");
  loading.style.display = "block";

  // Min timeout so the loading spinner can be visible
  await new Promise((r) => setTimeout(r, 800));

  const formData = new FormData(form);
  const body = {
    ssid: formData.get("ssid"),
    password: formData.get("password"),
    security: formData.get("security"),
  };

  try {
    const res = await fetch("/api/qr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    qrImg.src = data.qr;
    download.href = data.qr;

    loading.style.display = "none";
    qrContainer.classList.add("show");
  } catch (err) {
    loading.style.display = "none";
    alert("Failed to generate QR code. Check console for details.");
    console.error(err);
  }
});
