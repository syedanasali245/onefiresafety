/**
 * ONE FIRE — Supplemental Image Downloader (haseenhabib.com)
 * Run:  node scripts/download-haseenhabib-images.mjs
 *       bun scripts/download-haseenhabib-images.mjs
 *
 * Downloads better/unique images from haseenhabib.com to fill gaps and
 * replace overlapping/shared images in src/assets/products/
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

if (!existsSync(OUT_DIR)) {
  mkdirSync(OUT_DIR, { recursive: true });
}

const HH = "https://haseenhabib.com/wp-content/uploads";

// [remoteUrl, localFilename]
const DOWNLOADS = [
  // ── Fire Pumps ────────────────────────────────────────────────────────────
  [`${HH}/2025/11/Fire-Fighting-Pumps.jpg`,                              "pump-edj-complete.jpg"],

  // ── Sprinkler Systems ─────────────────────────────────────────────────────
  [`${HH}/2025/11/sprinklers-system.jpg`,                                "sprinkler-system-overview.jpg"],

  // ── Suppression Systems ───────────────────────────────────────────────────
  [`${HH}/2025/11/fire-supressions-system.jpg`,                          "suppression-gaseous.jpg"],

  // ── Fire Alarm ────────────────────────────────────────────────────────────
  [`${HH}/2025/11/Intelligent-Addressable-Fire-Detection-Alarm-System.jpg`, "alarm-addressable-system.jpg"],

  // ── Detection Systems ─────────────────────────────────────────────────────
  [`${HH}/2025/11/Gas-Detection-Systems.jpg`,                            "detector-gas-system.jpg"],
  [`${HH}/2025/11/vesda.jpg`,                                            "detector-aspirating-vesda.jpg"],
  [`${HH}/2025/11/Linear-Heat-Detection-System.jpg`,                     "detector-linear-heat.jpg"],

  // ── Fire Fighting Equipment ───────────────────────────────────────────────
  [`${HH}/2026/03/fire-extinguishers.jpg`,                               "safety-fire-extinguisher-hh.jpg"],
  [`${HH}/2026/03/fire-fighting-hose.jpg`,                               "safety-fire-hose-hh.jpg"],
  [`${HH}/2026/03/Fire-Hose-Reels-Cabinets.jpg`,                         "safety-hose-reel-hh.jpg"],
  [`${HH}/2026/03/Fire-Doors.jpg`,                                       "door-fire-rated-hh.jpg"],
  [`${HH}/2026/03/fire-safety-suits-and-accessories.jpg`,                "ppe-fire-suit.jpg"],

  // ── PPE ───────────────────────────────────────────────────────────────────
  [`${HH}/2026/03/Head-Protection.jpg`,                                  "ppe-head-protection.jpg"],
  [`${HH}/2026/03/Eye-Protection.jpg`,                                   "ppe-eye-protection.jpg"],
  [`${HH}/2026/03/Hearing-Protection.jpg`,                               "ppe-hearing-protection.jpg"],
  [`${HH}/2026/03/Repiratory-Protection.jpg`,                            "ppe-respiratory-protection.jpg"],
  [`${HH}/2026/03/Face-Protection.jpg`,                                  "ppe-face-protection.jpg"],
  [`${HH}/2026/03/Hand-Protection.jpg`,                                  "ppe-hand-protection.jpg"],
  [`${HH}/2026/03/Body-Protection.jpg`,                                  "ppe-body-protection.jpg"],
  [`${HH}/2026/03/Foot-Protection.jpg`,                                  "ppe-foot-protection.jpg"],

  // ── Emergency Lights & Signs ──────────────────────────────────────────────
  [`${HH}/2026/03/Emergency-Lights-Exits.jpg`,                           "emergency-lights-exits.jpg"],
];

function encodeImageUrl(raw) {
  const parsed = new URL(raw);
  parsed.pathname = parsed.pathname
    .split("/")
    .map((seg) => {
      if (!seg) return seg;
      try { return encodeURIComponent(decodeURIComponent(seg)); }
      catch { return encodeURIComponent(seg); }
    })
    .join("/");
  return parsed.href;
}

function isValidImage(buffer, filename) {
  if (!buffer || buffer.length < 200) return false;
  const head = buffer.slice(0, 32).toString("utf8").toLowerCase();
  if (head.includes("<!doctype") || head.includes("<html")) return false;
  const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8;
  const isPng  = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "jpg" || ext === "jpeg") return isJpeg;
  if (ext === "png")  return isPng;
  return isJpeg || isPng;
}

function fetchBuffer(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 8) { reject(new Error("Too many redirects")); return; }
    const encoded = encodeImageUrl(url);
    const lib = encoded.startsWith("https") ? https : http;
    lib.get(encoded, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OneFireImageDownloader/2.0)",
        "Accept": "image/*,*/*;q=0.8",
        "Referer": "https://haseenhabib.com/",
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        fetchBuffer(new URL(res.headers.location, encoded).href, redirectCount + 1).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode < 200 || res.statusCode >= 300) {
        res.resume(); reject(new Error(`HTTP ${res.statusCode}`)); return;
      }
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    }).on("error", reject).setTimeout(60_000, function() { this.destroy(new Error("Timeout")); });
  });
}

let ok = 0, skipped = 0, failed = 0;
const failures = [];

console.log(`\n🔽  Downloading ${DOWNLOADS.length} images from haseenhabib.com\n`);

for (const [url, filename] of DOWNLOADS) {
  const dest = join(OUT_DIR, filename);
  if (existsSync(dest)) {
    const buf = readFileSync(dest);
    if (isValidImage(buf, filename)) {
      console.log(`  ⏭  exists: ${filename} (${buf.length} B)`);
      skipped++;
      continue;
    }
  }
  try {
    const buffer = await fetchBuffer(url);
    if (!isValidImage(buffer, filename)) {
      throw new Error(`Not a valid image (${buffer.length} B)`);
    }
    await new Promise((res, rej) => {
      const f = createWriteStream(dest);
      f.on("finish", () => { f.close(); res(); });
      f.on("error", rej);
      f.write(buffer); f.end();
    });
    console.log(`  ✅ ${filename} (${buffer.length} B)`);
    ok++;
  } catch (e) {
    console.error(`  ❌ ${filename} — ${e.message}`);
    console.error(`     ${url}`);
    failures.push(filename);
    failed++;
  }
}

console.log(`\n✅  Done: ${ok} downloaded, ${skipped} skipped, ${failed} failed.\n`);
if (failures.length) {
  console.log("Failed:", failures.join(", "));
  process.exitCode = 1;
}
