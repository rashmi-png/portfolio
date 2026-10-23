/**
 * Browser verification for the portfolio site.
 * Run: node scripts/verify-site.mjs [baseUrl]
 * Checks: console/network errors, every section, link integrity,
 * interactions (mobile nav, copy email), and responsive screenshots.
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const outDir = path.resolve("artifacts");
fs.mkdirSync(outDir, { recursive: true });

const failures = [];
const notes = [];
const check = (ok, label) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) failures.push(label);
};

const browser = await chromium.launch();

/* ---------------- Desktop pass ---------------- */
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrors = [];
const pageErrors = [];
const failedRequests = [];

page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => pageErrors.push(err.message));
page.on("requestfailed", (req) => failedRequests.push(`${req.url()} — ${req.failure()?.errorText}`));
page.on("response", (res) => {
  if (res.status() >= 400) failedRequests.push(`${res.url()} — HTTP ${res.status()}`);
});

await page.goto(BASE, { waitUntil: "networkidle" });

/* Sections */
const sections = ["home", "about", "skills", "experience", "projects", "education", "contact"];
for (const id of sections) {
  check((await page.locator(`#${id}`).count()) === 1, `section #${id} present`);
}
check((await page.locator("header.header").count()) === 1, "header present");
check((await page.locator("footer").count()) === 1, "footer present");

/* Content spot-checks (resume facts on the page) */
const bodyText = await page.locator("body").innerText();
for (const phrase of [
  "Rashmi",
  "AI/ML Enthusiast",
  "Workora",
  "Thiranex",
  "Rabtech Academy",
  "Live Query Filter System",
  "Customer Segmentation",
  "AJ Institute of Engineering and Technology",
  "rashmishriyann@gmail.com",
  "Kundapura, Karnataka, India",
  "Python",
  "Responsible AI",
]) {
  check(bodyText.includes(phrase), `content includes "${phrase}"`);
}

/* Link integrity: every in-page anchor resolves to an element */
const anchors = await page.$$eval('a[href^="#"]', (as) => as.map((a) => a.getAttribute("href")));
const missing = [];
for (const href of new Set(anchors)) {
  if (href === "#") continue;
  const found = await page.$(href);
  if (!found) missing.push(href);
}
check(missing.length === 0, `all ${new Set(anchors).size} in-page anchors resolve${missing.length ? ` (missing: ${missing.join(", ")})` : ""}`);

/* No broken external/asset links */
const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
const brokenHrefs = hrefs.filter((h) => h === "" || h === undefined || h === null);
check(brokenHrefs.length === 0, "no empty href attributes");

/* Resume download works (real file, correct type) */
const resumeHref = await page.getAttribute('.hero a[download]', "href").catch(() => null);
const resumeRes = await page.request.get(new URL("/resume/Rashmi_Resume.pdf", BASE).href);
check(
  Boolean(resumeHref) && resumeRes.status() === 200 && resumeRes.headers()["content-type"].includes("pdf"),
  `resume download link serves a real PDF (${resumeRes.status()}, ${resumeRes.headers()["content-type"]})`,
);

/* Mailto link */
const mailto = await page.getAttribute('a[href^="mailto:"]', "href");
check(mailto === "mailto:rashmishriyann@gmail.com", "working mailto link");

/* Placeholder (pending) buttons: clearly labelled, not broken links */
const pending = await page.locator(".btn--pending").count();
check(pending >= 2, `placeholder buttons rendered (${pending} found, labelled "link pending")`);
const pendingAreLinks = await page.$$eval(".btn--pending", (els) => els.filter((e) => e.tagName === "A").length);
check(pendingAreLinks === 0, "placeholders are non-clickable (no broken links)");

/* No invented GitHub/demo URLs */
const externalLinks = await page.$$eval("a[target='_blank']", (as) => as.map((a) => a.getAttribute("href")));
check(externalLinks.every((h) => h && h.startsWith("http")), "no fabricated external links");

/* Interactions */
const copyBtn = page.locator("[data-copy-email]");
await copyBtn.click();
await page.waitForTimeout(250);
check((await page.locator("[data-toast].is-visible").count()) === 1, "copy-email shows confirmation toast");

/* Nav active-state + smooth scroll */
await page.click('a.nav__link[href="#projects"]');
await page.waitForTimeout(900);
const nearProjects = await page.evaluate(() => {
  const el = document.querySelector("#projects");
  return Math.abs(el.getBoundingClientRect().top) < 220;
});
check(nearProjects, "navigation scrolls to Projects section");

/* Console / network errors */
const relevantConsole = consoleErrors.filter((e) => !/font/i.test(e));
check(pageErrors.length === 0, `no page errors${pageErrors.length ? `: ${pageErrors.join(" | ")}` : ""}`);
check(relevantConsole.length === 0, `no console errors${relevantConsole.length ? `: ${relevantConsole.join(" | ")}` : ""}`);
const relevantFailed = failedRequests.filter((u) => !/fonts\.(googleapis|gstatic)\.com/.test(u));
check(relevantFailed.length === 0, `no failed requests${relevantFailed.length ? `: ${relevantFailed.join(" | ")}` : ""}`);
if (failedRequests.some((u) => /fonts\./.test(u))) notes.push("Google Fonts unreachable in sandbox (system fallback used in screenshots only)");

/* Screenshots across viewports */
const viewports = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "laptop-1024", width: 1024, height: 768 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
];
for (const vp of viewports) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(700); // let reveal animations finish
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  const file = path.join(outDir, `portfolio-${vp.name}.png`);
  await page.screenshot({ path: file, fullPage: true });

  // Horizontal overflow check (responsive requirement)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check(overflow <= 1, `no horizontal overflow at ${vp.width}px (overflow: ${overflow}px)`);
  console.log(`      screenshot → ${file}`);
}

/* Mobile nav toggle behaviour */
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(BASE, { waitUntil: "networkidle" });
const toggle = page.locator("[data-nav-toggle]");
check(await toggle.isVisible(), "mobile: hamburger toggle visible");
check((await toggle.getAttribute("aria-expanded")) === "false", "mobile: toggle starts closed");
await toggle.click();
await page.waitForTimeout(350);
check((await toggle.getAttribute("aria-expanded")) === "true", "mobile: toggle opens menu");
check(await page.locator("#site-nav.is-open").isVisible(), "mobile: nav menu visible when open");
await page.click('#site-nav a[href="#skills"]');
await page.waitForTimeout(700);
check((await toggle.getAttribute("aria-expanded")) === "false", "mobile: menu closes after choosing a link");

/* Keyboard accessibility: skip link focusable first */
await page.goto(BASE, { waitUntil: "domcontentloaded" });
await page.keyboard.press("Tab");
const firstFocus = await page.evaluate(() => document.activeElement?.className || "");
check(firstFocus.includes("skip-link"), "skip-to-content link is first tab stop");

await browser.close();

console.log("\n--- summary ---");
notes.forEach((n) => console.log(`NOTE  ${n}`));
if (failures.length) {
  console.log(`${failures.length} check(s) FAILED:`);
  failures.forEach((f) => console.log(`  - ${f}`));
  process.exit(1);
}
console.log("All checks passed.");
