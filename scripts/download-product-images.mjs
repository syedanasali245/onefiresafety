/**
 * ONE FIRE — Product Image Downloader
 * Run:  node scripts/download-product-images.mjs
 *       node scripts/download-product-images.mjs --force
 *       bun scripts/download-product-images.mjs
 *
 * Downloads product images from azeidk.com into src/assets/products/
 */

import {
  createWriteStream,
  mkdirSync,
  existsSync,
  unlinkSync,
  readFileSync,
  statSync,
} from "fs";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";
import https from "https";
import http from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "../src/assets/products");
const FORCE = process.argv.includes("--force");

if (!existsSync(OUT_DIR)) {
  mkdirSync(OUT_DIR, { recursive: true });
  console.log("📁 Created src/assets/products/");
}

const BASE = "https://azeidk.com/wp-content/uploads";

// slug → [remoteUrl, localFilename]
const IMAGE_MAP = [
  // Fire Cabinets
  ["single-door-surface-mounted-cabinet", `${BASE}/2024/08/Falcongold-2001S-1.png`, "fire-cabinet-single-surface.png"],
  ["single-door-recessed-cabinet",        `${BASE}/2026/01/FGR-1001S-1-768x768.png`, "fire-cabinet-single-recessed.png"],
  ["double-door-fire-cabinet",            `${BASE}/2024/08/Falcongold-2001R-1.png`, "fire-cabinet-double.png"],
  ["horizontal-fire-cabinet",             `${BASE}/2026/01/FG-400S-768x864.png`, "fire-cabinet-horizontal.png"],
  ["vertical-fire-cabinet",               `${BASE}/2026/01/Falcongold3001R-1.png`, "fire-cabinet-vertical.png"],
  ["hose-reel-cabinet",                   `${BASE}/2026/01/FGR-1001R-1.png`, "fire-cabinet-hose-reel.png"],
  ["landing-valve-cabinet",               `${BASE}/2026/01/FGR-2001R.png`, "fire-cabinet-landing-valve.png"],
  ["foam-system-cabinet",                 `${BASE}/2025/12/Falcongold-4001RF-e1751487958737.png`, "fire-cabinet-foam.png"],

  // Sprinklers
  ["upright-sprinklers",         `${BASE}/2024/06/Upright-Sprinklers.png`, "sprinkler-upright.png"],
  ["pendant-sprinklers",         `${BASE}/2024/06/Pendant-Sprinklers.png`, "sprinkler-pendant.png"],
  ["sidewall-sprinklers",        `${BASE}/2024/06/Horizontal-Sidewall-and-Recessed-Horizontal-Sidewall.png`, "sprinkler-sidewall.png"],
  ["recessed-sprinklers",        `${BASE}/2024/06/Horizontal-Sidewall-and-Recessed-Horizontal-Sidewall.png`, "sprinkler-recessed.png"],
  ["esfr-sprinklers",            `${BASE}/2024/06/ESFR-Pendent-Sprinklers.png`, "sprinkler-esfr.png"],
  ["storage-rack-sprinklers",    `${BASE}/2024/06/Upright-Sprinklers-Victaulic.png`, "sprinkler-storage-rack.png"],
  ["concealed-sprinklers",       `${BASE}/2026/01/Series-RFII-—-5.6-K-factor.jpg`, "sprinkler-concealed.jpg"],
  ["quick-response-sprinklers",  `${BASE}/2026/01/TY-B-Sprinklers-1.jpg`, "sprinkler-quick-response.jpg"],

  // Fire Pumps
  ["diesel-fire-pumps",           `${BASE}/2025/01/Fire-Pump-Packages-1.png`, "pump-diesel.png"],
  ["electric-fire-pumps",         `${BASE}/2026/01/Non-UL-Pump.png`, "pump-electric.png"],
  ["jockey-pumps",                `${BASE}/2025/01/Fire-Pump-Packages-1.png`, "pump-jockey.png"],
  ["horizontal-split-case-pumps", `${BASE}/2025/01/Fire-Pump-Packages-1.png`, "pump-horizontal-split.png"],
  ["vertical-turbine-pumps",      `${BASE}/2026/01/Non-UL-Pump.png`, "pump-vertical-turbine.png"],

  // Fire Valves
  ["butterfly-valves",         `${BASE}/2026/01/AG-3000-OSY-GATE-VALVE-GROOVED-819x1024.png`, "valve-butterfly.png"],
  ["gate-valves",              `${BASE}/2026/01/A-3000-OSY-GATE-VALVE-FLANGE-scaled.png`, "valve-gate.png"],
  ["check-valves",             `${BASE}/2026/01/A-3150-SWING-CHECK-VALVE-FLANGE-819x1024.png`, "valve-check.png"],
  ["alarm-valves",             `${BASE}/2026/01/ACV-300-ALARM-CHECK-VALVE.png`, "valve-alarm.png"],
  ["pressure-reducing-valves", `${BASE}/2026/01/A-3100-NRS-GATE-VALVE-scaled.png`, "valve-pressure-reducing.png"],
  ["deluge-valves",            `${BASE}/2026/01/ACV-300-ALARM-CHECK-VALVE.png`, "valve-deluge.png"],

  // Suppression Systems
  ["gas-suppression-systems",              `${BASE}/2024/06/Gas-Fire-Extinguishing-System.png`, "suppression-gas.png"],
  ["foam-suppression-systems",             `${BASE}/2024/06/Ayrosol-System-–-Fire-Pro.png`, "suppression-foam.png"],
  ["aerosol-suppression-systems",          `${BASE}/2024/06/Ayrosol-System-–-Fire-Pro.png`, "suppression-aerosol.png"],
  ["kitchen-hood-suppression-systems",     `${BASE}/2024/06/Gas-Fire-Extinguishing-System.png`, "suppression-kitchen-hood.png"],
  ["water-mist-systems",                   `${BASE}/2024/07/fire-fighting-system-e1736786218489.png`, "suppression-water-mist.png"],
  ["clean-agent-suppression-systems",      `${BASE}/2025/12/AFC-Fire-Suppression-System.jpg`, "suppression-clean-agent.jpg"],
  ["fm200-systems",                        `${BASE}/2025/12/AFC-Fire-Suppression-System.jpg`, "suppression-fm200.jpg"],
  ["novec-fire-suppression-systems",       `${BASE}/2025/12/AFC-Fire-Suppression-System.jpg`, "suppression-novec.jpg"],
  ["electrical-panel-suppression-systems", `${BASE}/2024/06/Gas-Fire-Extinguishing-System.png`, "suppression-electrical-panel.png"],
  ["server-room-suppression-systems",      `${BASE}/2025/12/AFC-Fire-Suppression-System.jpg`, "suppression-server-room.jpg"],
  ["data-center-fire-suppression-systems", `${BASE}/2025/12/AFC-Fire-Suppression-System.jpg`, "suppression-data-center.jpg"],
  ["battery-room-suppression-systems",     `${BASE}/2024/06/Gas-Fire-Extinguishing-System.png`, "suppression-battery-room.png"],

  // Addressable Fire Alarm
  ["addressable-fire-alarm-panels",  `${BASE}/2026/01/Single-Loop-16-Zone-Fire-Panel.jpg`, "alarm-addressable-panel.jpg"],
  ["intelligent-smoke-detectors",    `${BASE}/2024/06/Addressable-Smoke-Detector.png`, "alarm-smoke-detector-addressable.png"],
  ["intelligent-heat-detectors",     `${BASE}/2024/06/Addressable-Heat-Detector.png`, "alarm-heat-detector-addressable.png"],
  ["addressable-modules",            `${BASE}/2024/06/Addressable-Module.png`, "alarm-addressable-module.png"],
  ["addressable-sounders",           `${BASE}/2024/06/Addressable-BASE-SOUNDER.png`, "alarm-addressable-sounder.png"],
  ["addressable-manual-call-points", `${BASE}/2024/06/Addressable-Mannual-Call-Point.png`, "alarm-addressable-call-point.png"],

  // Conventional Fire Alarm
  ["conventional-fire-alarm-panels", `${BASE}/2024/06/CONVENTIONAL-ALARM-SYSTEM-300x192.png`, "alarm-conventional-panel.png"],
  ["smoke-detectors",                `${BASE}/2024/06/Addressable-Smoke-Detector.png`, "alarm-smoke-detector.png"],
  ["heat-detectors",                 `${BASE}/2024/06/Addressable-Heat-Detector.png`, "alarm-heat-detector.png"],
  ["manual-call-points",             `${BASE}/2024/06/Addressable-Mannual-Call-Point.png`, "alarm-manual-call-point.png"],
  ["alarm-sounders",                 `${BASE}/2024/06/Addressable-BASE-SOUNDER.png`, "alarm-sounder.png"],
  ["flashers",                       `${BASE}/2024/06/Addressable-Sounder-With-Flasher-–-Indoor.png`, "alarm-flasher.png"],
  ["sounder-bases",                  `${BASE}/2024/06/Mounting-Base.png`, "alarm-sounder-base.png"],

  // Detection Systems
  ["beam-detectors",                    `${BASE}/2024/06/Addressable-Beam-Detector.png`, "detector-beam.png"],
  ["flame-detectors",                   `${BASE}/2026/01/INTELLIGENT-DUAL-IR2-FLAME-DETECTOR-55000-280.jpg`, "detector-flame.jpg"],
  ["gas-detectors",                     `${BASE}/2026/01/Carbon-Monoxide-Detector-1.png`, "detector-gas.png"],
  ["aspirating-smoke-detection-systems",`${BASE}/2024/06/Addressable-Duct-Detector.png`, "detector-aspirating.png"],
  ["multi-sensor-detectors",            `${BASE}/2026/01/MULTISENSOR-DETECTOR-XPERT-STYLE-55000-885IMC-e1769095623342.png`, "detector-multi-sensor.png"],

  // Notification Systems
  ["alarm-sirens",                 `${BASE}/2026/01/Compact-Wall-Ceiling-Sounder.jpg`, "notification-siren.jpg"],
  ["horn-speakers",                `${BASE}/2026/01/Hi-Output-103dBA-Wall-Sounder-deep-base-CON430A-CX-DR.jpg`, "notification-horn.jpg"],
  ["voice-evacuation-systems",     `${BASE}/2026/01/SigTEL-ECU-Master-Controller.jpg`, "notification-voice-evacuation.jpg"],
  ["emergency-announcement-systems",`${BASE}/2026/01/SigTEL-ECU-Master-Controller.jpg`, "notification-announcement.jpg"],
  ["strobe-lights",                `${BASE}/2024/06/Addressable-Sounder-with-Flasher-Weather-Proof.png`, "notification-strobe.png"],

  // Fire Alarm Accessories
  ["fire-alarm-cables",  `${BASE}/2024/06/fire-alarm-cable-e1718967979103-300x230.png`, "accessory-alarm-cable.png"],
  ["batteries",          `${BASE}/2026/01/ZFP-4-Relay-PCB-half-size.jpg`, "accessory-battery.jpg"],
  ["power-supply-units", `${BASE}/2026/01/ZFP-Repeaters-Expansion-PCBs-Graphic-Interfaces-1.png`, "accessory-psu.png"],
  ["modules",            `${BASE}/2024/06/Addressable-Module.png`, "accessory-module.png"],
  ["junction-boxes",     `${BASE}/2026/01/ZFP-Panels-With-40-Zone-LEDs-1.png`, "accessory-junction-box.png"],

  // Fire Safety Equipment
  ["fire-extinguishers", `${BASE}/2024/06/Automatic-Dry-Powder-Fire-Extinguisher.png`, "safety-fire-extinguisher.png"],
  ["fire-hose-reels",    `${BASE}/2026/01/Falcon-Gold-Fire-hose-768x768.png`, "safety-hose-reel.png"],
  ["fire-hoses",         `${BASE}/2025/12/Fire-hose-box.png`, "safety-fire-hose.png"],
  ["nozzles",            `${BASE}/2025/12/Fire-hose-box.png`, "safety-nozzle.png"],
  ["hose-cabinets",      `${BASE}/2024/08/Falcongold-2001S-1.png`, "safety-hose-cabinet.png"],
  ["fire-blankets",      `${BASE}/2024/06/Automatic-Dry-Powder-Fire-Extinguisher.png`, "safety-fire-blanket.png"],
  ["fire-buckets",       `${BASE}/2024/06/Automatic-Dry-Powder-Fire-Extinguisher.png`, "safety-fire-bucket.png"],

  // Safety Equipment / PPE
  ["safety-helmets",           `${BASE}/2025/12/Safety-Cap-COVER-GUARD-.jpg`, "ppe-helmet.jpg"],
  ["safety-shoes",             `${BASE}/2025/12/Safety-shoe-COVER-GUARD-.jpg`, "ppe-shoes.jpg"],
  ["reflective-safety-jackets",`${BASE}/2025/12/Worker-Vest-COVER-GUARD-.jpg`, "ppe-jacket.jpg"],
  ["safety-gloves",            `${BASE}/2025/12/Workers-suit-1024x828.jpg`, "ppe-gloves.jpg"],
  ["fire-resistant-gloves",    `${BASE}/2025/12/Workers-suit-1024x828.jpg`, "ppe-fire-gloves.jpg"],
  ["industrial-safety-gloves", `${BASE}/2025/12/Workers-suit-1024x828.jpg`, "ppe-industrial-gloves.jpg"],
  ["safety-goggles",           `${BASE}/2025/12/Safety-Cap-COVER-GUARD-.jpg`, "ppe-goggles.jpg"],
  ["face-shields",             `${BASE}/2025/12/Safety-Cap-COVER-GUARD-.jpg`, "ppe-face-shield.jpg"],
  ["respirators",              `${BASE}/2025/12/Workers-suit-1024x828.jpg`, "ppe-respirator.jpg"],
  ["ear-protection",           `${BASE}/2025/12/Safety-Cap-COVER-GUARD-.jpg`, "ppe-ear-protection.jpg"],
  ["protective-coveralls",     `${BASE}/2025/12/Workers-suit-1024x828.jpg`, "ppe-coveralls.jpg"],
  ["chemical-protection-suits",`${BASE}/2025/12/Workers-suit-1024x828.jpg`, "ppe-chemical-suit.jpg"],
  ["welding-protection-equipment",`${BASE}/2025/12/Workers-suit-1024x828.jpg`, "ppe-welding.jpg"],

  // Fire Rated Doors & Accessories
  ["steel-fire-rated-doors",  `${BASE}/2024/12/fire-rated-doors.png`, "door-steel-fire-rated.png"],
  ["wooden-fire-rated-doors", `${BASE}/2024/12/fire-rated-doors.png`, "door-wooden-fire-rated.png"],
  ["emergency-exit-doors",    `${BASE}/2024/12/fire-rated-doors.png`, "door-emergency-exit.png"],
  ["double-leaf-fire-doors",  `${BASE}/2024/12/fire-rated-doors.png`, "door-double-leaf.png"],
  ["single-leaf-fire-doors",  `${BASE}/2024/12/fire-rated-doors.png`, "door-single-leaf.png"],
  ["panic-bar-doors",         `${BASE}/2024/12/fire-rated-doors.png`, "door-panic-bar.png"],
  ["acoustic-fire-doors",     `${BASE}/2024/12/fire-rated-doors.png`, "door-acoustic.png"],
  ["panic-bars",              `${BASE}/2024/12/fire-rated-doors.png`, "door-acc-panic-bar.png"],
  ["door-closers",            `${BASE}/2024/12/fire-rated-doors.png`, "door-acc-closer.png"],
  ["fire-rated-hinges",       `${BASE}/2024/12/fire-rated-doors.png`, "door-acc-hinge.png"],
  ["vision-panels",           `${BASE}/2024/12/fire-rated-doors.png`, "door-acc-vision-panel.png"],
  ["door-seals",              `${BASE}/2024/12/fire-rated-doors.png`, "door-acc-seal.png"],

  // Emergency / Exit Signs
  ["emergency-exit-signs",        `${BASE}/2024/07/fire-alarm-system-e1736785192446.png`, "emergency-exit-sign.png"],
  ["led-exit-signs",              `${BASE}/2024/07/fire-alarm-system-e1736785192446.png`, "emergency-led-exit.png"],
  ["photoluminescent-exit-signs", `${BASE}/2024/07/fire-alarm-system-e1736785192446.png`, "emergency-photolum-sign.png"],
  ["double-side-exit-signs",      `${BASE}/2024/07/fire-alarm-system-e1736785192446.png`, "emergency-double-sign.png"],
  ["emergency-directional-signs", `${BASE}/2024/07/fire-alarm-system-e1736785192446.png`, "emergency-directional-sign.png"],
  ["emergency-exit-lights",       `${BASE}/2024/07/fire-alarm-system-e1736785192446.png`, "emergency-exit-light.png"],
  ["rechargeable-emergency-lights",`${BASE}/2024/07/fire-alarm-system-e1736785192446.png`, "emergency-rechargeable-light.png"],
  ["twin-spot-emergency-lights",  `${BASE}/2024/07/fire-alarm-system-e1736785192446.png`, "emergency-twin-spot.png"],
  ["ceiling-emergency-lights",    `${BASE}/2024/07/fire-alarm-system-e1736785192446.png`, "emergency-ceiling-light.png"],
  ["wall-mounted-emergency-lights",`${BASE}/2024/07/fire-alarm-system-e1736785192446.png`, "emergency-wall-light.png"],
  ["bulkhead-emergency-lights",   `${BASE}/2024/07/fire-alarm-system-e1736785192446.png`, "emergency-bulkhead-light.png"],

  // Pipes
  ["black-steel-pipes",         `${BASE}/2024/07/fire-fighting-system-e1736786218489.png`, "pipe-black-steel.png"],
  ["seamless-pipes",            `${BASE}/2024/07/fire-fighting-system-e1736786218489.png`, "pipe-seamless.png"],
  ["hdpe-pipes",                `${BASE}/2024/07/fire-fighting-system-e1736786218489.png`, "pipe-hdpe.png"],
  ["grooved-pipes",             `${BASE}/2024/07/fire-fighting-system-e1736786218489.png`, "pipe-grooved.png"],
  ["pipe-fittings",             `${BASE}/2024/07/fire-fighting-system-e1736786218489.png`, "pipe-fittings.png"],
  ["couplings",                 `${BASE}/2024/07/fire-fighting-system-e1736786218489.png`, "pipe-couplings.png"],
  ["flexible-sprinkler-hoses",  `${BASE}/2026/01/Falcon-Gold-Fire-hose.png`, "pipe-flexible-hose.png"],
  ["flanges",                   `${BASE}/2024/07/fire-fighting-system-e1736786218489.png`, "pipe-flanges.png"],
];

/** Encode Unicode/special chars in URL path (em-dash, en-dash, spaces, etc.) */
function encodeImageUrl(raw) {
  const parsed = new URL(raw);
  parsed.pathname = parsed.pathname
    .split("/")
    .map((segment) => {
      if (!segment) return segment;
      try {
        return encodeURIComponent(decodeURIComponent(segment));
      } catch {
        return encodeURIComponent(segment);
      }
    })
    .join("/");
  return parsed.href;
}

function isValidImage(buffer, filename) {
  if (!buffer || buffer.length < 200) return false;
  const ext = filename.split(".").pop()?.toLowerCase();
  const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8;
  const isPng =
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47;
  const isWebp =
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP";
  const isGif = buffer.toString("ascii", 0, 3) === "GIF";
  // Reject HTML error pages saved as images
  const head = buffer.slice(0, 32).toString("utf8").toLowerCase();
  if (head.includes("<!doctype") || head.includes("<html")) return false;

  if (ext === "jpg" || ext === "jpeg") return isJpeg;
  if (ext === "png") return isPng;
  if (ext === "webp") return isWebp;
  if (ext === "gif") return isGif;
  return isJpeg || isPng || isWebp || isGif;
}

function fileNeedsDownload(dest) {
  if (FORCE) return true;
  if (!existsSync(dest)) return true;
  try {
    const buf = readFileSync(dest);
    return !isValidImage(buf, basename(dest));
  } catch {
    return true;
  }
}

function fetchBuffer(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 8) {
      reject(new Error("Too many redirects"));
      return;
    }

    const encoded = encodeImageUrl(url);
    const parsed = new URL(encoded);
    const lib = parsed.protocol === "https:" ? https : http;

    const req = lib.get(
      encoded,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; OneFireProductImageDownloader/1.0)",
          Accept: "image/*,*/*;q=0.8",
        },
      },
      (res) => {
        const status = res.statusCode ?? 0;

        if (
          status >= 300 &&
          status < 400 &&
          res.headers.location
        ) {
          const next = new URL(res.headers.location, encoded).href;
          res.resume();
          fetchBuffer(next, redirectCount + 1).then(resolve).catch(reject);
          return;
        }

        if (status < 200 || status >= 300) {
          res.resume();
          reject(new Error(`HTTP ${status}`));
          return;
        }

        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          const buffer = Buffer.concat(chunks);
          const type = (res.headers["content-type"] || "").toLowerCase();
          if (type.includes("text/html")) {
            reject(new Error("Server returned HTML instead of image"));
            return;
          }
          resolve({ buffer, contentType: type });
        });
      }
    );

    req.on("error", reject);
    req.setTimeout(60_000, () => {
      req.destroy(new Error("Request timeout"));
    });
  });
}

async function download(url, dest) {
  const name = basename(dest);

  if (!fileNeedsDownload(dest)) {
    const size = statSync(dest).size;
    process.stdout.write(`  ⏭  valid (${size} B): ${name}\n`);
    return { ok: true, skipped: true };
  }

  if (existsSync(dest)) {
    try {
      unlinkSync(dest);
    } catch {
      /* ignore */
    }
  }

  const { buffer } = await fetchBuffer(url);

  if (!isValidImage(buffer, name)) {
    throw new Error(
      `Downloaded file is not a valid image (${buffer.length} bytes)`
    );
  }

  await new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    file.on("error", reject);
    file.on("finish", () => {
      file.close();
      resolve();
    });
    file.write(buffer);
    file.end();
  });

  process.stdout.write(`  ✅ ${name} (${buffer.length} B)\n`);
  return { ok: true, skipped: false };
}

// Deduplicate by local filename
const seen = new Set();
const uniqueDownloads = [];
for (const [, url, filename] of IMAGE_MAP) {
  if (!seen.has(filename)) {
    seen.add(filename);
    uniqueDownloads.push([url, join(OUT_DIR, filename)]);
  }
}

const jpgCount = uniqueDownloads.filter(([, d]) => d.endsWith(".jpg")).length;
console.log(
  `\n🔽  Downloading ${uniqueDownloads.length} product images (${jpgCount} JPEG) → src/assets/products/`
);
if (FORCE) console.log("   (--force: re-downloading all files)\n");
else console.log("   (invalid/corrupt files will be re-downloaded)\n");

let ok = 0;
let skipped = 0;
let failed = 0;
const failures = [];

for (const [url, dest] of uniqueDownloads) {
  try {
    const result = await download(url, dest);
    if (result.skipped) skipped++;
    else ok++;
  } catch (e) {
    failed++;
    const msg = e.message || String(e);
    failures.push({ url: encodeImageUrl(url), dest: basename(dest), msg });
    console.error(`  ❌ ${basename(dest)} — ${msg}`);
    console.error(`     ${encodeImageUrl(url)}`);
  }
}

console.log(`\n✅  Done: ${ok} downloaded, ${skipped} skipped, ${failed} failed.\n`);

if (failures.length) {
  console.log("Failed downloads:");
  for (const f of failures) {
    console.log(`  - ${f.dest}: ${f.msg}`);
  }
  process.exitCode = 1;
}

// Print import map snippet for product-images.ts
const lines = IMAGE_MAP.map(
  ([slug, , filename]) =>
    `  "${slug}": new URL("../assets/products/${filename}", import.meta.url).href,`
);
console.log("─".repeat(60));
console.log("Update src/lib/product-images.ts imports to use local files.\n");
