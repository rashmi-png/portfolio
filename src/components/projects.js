import { projects } from "../data/content.js";
import { icon } from "./icons.js";

/**
 * Renders an action button. When a URL exists it is a normal link;
 * otherwise it renders a clearly-labelled, non-clickable placeholder
 * so no broken links ship with the site.
 */
function actionButton(url, label, iconName) {
  if (url) {
    return `
      <a class="btn btn--secondary btn--sm" href="${url}" target="_blank" rel="noopener noreferrer">
        ${icon(iconName)} ${label} ${icon("external")}
      </a>`;
  }
  return `
    <span class="btn btn--sm btn--pending" role="link" aria-disabled="true" title="Add this URL in src/data/content.js">
      ${icon(iconName)} ${label} <span class="btn__badge">link pending</span>
    </span>`;
}

/** Project cards with tech tags and GitHub / live-demo actions. */
export function renderProjects() {
  const cards = projects
    .map(
      ({ name, description, tags, github, demo }, i) => `
        <article class="card card--hover project-card" data-reveal style="--reveal-delay: ${i * 80}ms">
          <div class="project-card__head">
            <div>
              <p class="project-card__index">Project / ${String(i + 1).padStart(2, "0")}</p>
              <h3 class="project-card__title">${name}</h3>
            </div>
            <span class="icon-box" aria-hidden="true">${icon("folder")}</span>
          </div>
          <p class="project-card__desc">${description}</p>
          <ul class="project-card__tags" aria-label="Technologies and skills used">
            ${tags.map((tag) => `<li class="tag">${tag}</li>`).join("")}
          </ul>
          <div class="project-card__actions">
            ${actionButton(github, "GitHub", "github")}
            ${actionButton(demo, "Live Demo", "external")}
          </div>
        </article>`,
    )
    .join("");

  return `
    <section class="section projects" id="projects" aria-labelledby="projects-title">
      <div class="container">
        <header class="section__head" data-reveal>
          <p class="section__eyebrow">Projects</p>
          <h2 class="section__title" id="projects-title">Things I've <span class="text-gradient">built &amp; framed</span></h2>
          <p class="section__lead">Hands-on work from internships and self-driven practice — from real-time full-stack features to machine learning problem framing.</p>
        </header>

        <div class="projects__grid">
          ${cards}
        </div>
      </div>
    </section>`;
}
