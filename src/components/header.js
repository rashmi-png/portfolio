import { navLinks, profile } from "../data/content.js";
import { icon } from "./icons.js";

/** Fixed site header: logo, primary navigation, resume CTA, mobile toggle. */
export function renderHeader() {
  const links = navLinks
    .map(
      ({ label, href }) => `
        <li>
          <a class="nav__link" href="${href}" data-nav-link>${label}</a>
        </li>`,
    )
    .join("");

  return `
    <header class="header" data-header>
      <div class="container header__inner">
        <a class="logo" href="#home" aria-label="${profile.name} — back to top">${profile.name}<span>.</span></a>

        <nav class="nav" id="site-nav" aria-label="Primary">
          <ul class="nav__list">
            ${links}
          </ul>
        </nav>

        <div class="header__actions">
          <a class="btn btn--primary btn--sm" href="${profile.resumeUrl}" download>
            ${icon("download")} Resume
          </a>
          <button
            class="nav-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="site-nav"
            aria-label="Toggle navigation menu"
            data-nav-toggle
          >
            ${icon("menu", { className: "icon-menu" })}
            ${icon("close", { className: "icon-close" })}
          </button>
        </div>
      </div>
    </header>`;
}
