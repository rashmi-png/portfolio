/**
 * Renders public/resume/Rashmi_Resume.html to Rashmi_Resume.pdf.
 * Run: node scripts/generate-resume-pdf.mjs
 */
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "public", "resume", "Rashmi_Resume.html");
const output = path.join(root, "public", "resume", "Rashmi_Resume.pdf");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`file://${source}`, { waitUntil: "networkidle" });
// Fonts on the resume page fall back to system faces, so no network wait is needed.
await page.pdf({
  path: output,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "0", bottom: "0", left: "0", right: "0" },
});
await browser.close();

console.log(`PDF written to ${output}`);
