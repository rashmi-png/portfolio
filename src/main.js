import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/sections.css";

import { profile } from "./data/content.js";
import { renderHeader } from "./components/header.js";
import { renderHero } from "./components/hero.js";
import { renderAbout } from "./components/about.js";
import { renderSkills } from "./components/skills.js";
import { renderExperience } from "./components/experience.js";
import { renderProjects } from "./components/projects.js";
import { renderEducation } from "./components/education.js";
import { renderContact } from "./components/contact.js";
import { renderFooter } from "./components/footer.js";

/* ------------------------------------------------------------------ */
/* Render                                                              */
/* ------------------------------------------------------------------ */
const app = document.querySelector("#app");

app.innerHTML = `
  ${renderHeader()}
  <main id="main">
    ${renderHero()}
    ${renderAbout()}
    ${renderSkills()}
    ${renderExperience()}
    ${renderProjects()}
    ${renderEducation()}
    ${renderContact()}
  </main>
  ${renderFooter()}
  <div class="toast" role="status" aria-live="polite" data-toast></div>
`;

document.title = `${profile.name} — AI/ML Enthusiast, Data Analyst & Full Stack Developer`;

/* ------------------------------------------------------------------ */
/* Interactions                                                        */
/* ------------------------------------------------------------------ */

/** Header background once the page is scrolled. */
function initHeaderScroll() {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

/** Mobile navigation toggle. */
function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("#site-nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  // Reset when switching to desktop layout.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 832) setOpen(false);
  });
}

/** Highlight the nav link for the section currently in view. */
function initActiveSection() {
  const links = [...document.querySelectorAll("[data-nav-link]")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const visible = new Map();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => visible.set(entry.target.id, entry.intersectionRatio));
      let bestId = null;
      let bestRatio = 0;
      visible.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });
      links.forEach((link) => {
        const active = bestId && link.getAttribute("href") === `#${bestId}`;
        link.classList.toggle("is-active", Boolean(active));
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
  );

  sections.forEach((section) => observer.observe(section));
}

/** Fade elements in as they scroll into view. */
function initRevealOnScroll() {
  const elements = document.querySelectorAll("[data-reveal]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  elements.forEach((el) => observer.observe(el));
}

/** Copy-email button with a small toast confirmation. */
function initCopyEmail() {
  const button = document.querySelector("[data-copy-email]");
  const toast = document.querySelector("[data-toast]");
  if (!button || !toast) return;

  let timer;

  button.addEventListener("click", async () => {
    const email = button.getAttribute("data-copy-email");
    let copied = false;

    try {
      await navigator.clipboard.writeText(email);
      copied = true;
    } catch {
      // Fallback for browsers/contexts without the async clipboard API.
      const input = document.createElement("textarea");
      input.value = email;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      }
      input.remove();
    }

    toast.textContent = copied ? `Copied ${email}` : `Email: ${email}`;
    toast.classList.add("is-visible");
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
  });
}

initHeaderScroll();
initMobileNav();
initActiveSection();
initRevealOnScroll();
initCopyEmail();
