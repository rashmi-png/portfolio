import { profile, socialLinks } from "../data/content.js";
import { icon } from "./icons.js";

/**
 * Social button — real link when a URL is configured,
 * otherwise a clearly-labelled placeholder.
 */
function socialButton(url, label, iconName) {
  if (url) {
    return `
      <a class="btn btn--secondary" href="${url}" target="_blank" rel="noopener noreferrer">
        ${icon(iconName)} ${label} ${icon("external")}
      </a>`;
  }
  return `
    <span class="btn btn--pending" role="link" aria-disabled="true" title="Add this URL in src/data/content.js">
      ${icon(iconName)} ${label} <span class="btn__badge">link pending</span>
    </span>`;
}

/** Contact section: working email link, location, copy action, social placeholders. */
export function renderContact() {
  return `
    <section class="section contact" id="contact" aria-labelledby="contact-title">
      <div class="container">
        <div class="contact__panel" data-reveal>
          <p class="section__eyebrow" style="justify-content: center">Contact</p>
          <h2 class="contact__title" id="contact-title">Let's <span class="text-gradient">work together</span></h2>
          <p class="contact__lead">
            I'm open to entry-level roles and internships in data analytics, machine learning, and full stack development.
            My inbox is always open — whether you have a question or just want to say hello.
          </p>

          <div class="btn-row contact__actions">
            <a class="btn btn--primary" href="mailto:${profile.email}">
              ${icon("mail")} Email Me
            </a>
            <button class="btn btn--secondary" type="button" data-copy-email="${profile.email}">
              ${icon("copy")} Copy Email
            </button>
          </div>

          <div class="contact__grid">
            <a class="contact-item" href="mailto:${profile.email}">
              <span class="icon-box" aria-hidden="true">${icon("mail")}</span>
              <span>
                <span class="contact-item__label">Email</span>
                <span class="contact-item__value">${profile.email}</span>
              </span>
            </a>
            <div class="contact-item">
              <span class="icon-box" aria-hidden="true">${icon("location")}</span>
              <span>
                <span class="contact-item__label">Location</span>
                <span class="contact-item__value">${profile.location}</span>
              </span>
            </div>
          </div>

          <div class="contact__socials" aria-label="Social profiles">
            ${socialButton(socialLinks.linkedin, "LinkedIn", "linkedin")}
            ${socialButton(socialLinks.github, "GitHub", "github")}
          </div>
        </div>
      </div>
    </section>`;
}
