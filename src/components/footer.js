import { navLinks, profile } from "../data/content.js";

/** Footer: brand, tagline, navigation, copyright. */
export function renderFooter() {
  const links = navLinks
    .map(({ label, href }) => `<a href="${href}">${label}</a>`)
    .join("");

  const year = new Date().getFullYear();

  return `
    <footer class="footer">
      <div class="container">
        <div class="footer__top">
          <div class="footer__brand">
            <a class="logo" href="#home">${profile.name}<span>.</span></a>
            <p class="footer__tagline">${profile.tagline}</p>
          </div>
          <nav class="footer__nav" aria-label="Footer">
            ${links}
          </nav>
        </div>
        <div class="footer__bottom">
          <p>© <span data-year>${year}</span> ${profile.name}. All rights reserved.</p>
          <p>Built with care · <a href="mailto:${profile.email}">${profile.email}</a></p>
        </div>
      </div>
    </footer>`;
}
