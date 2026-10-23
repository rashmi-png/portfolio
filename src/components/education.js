import { education } from "../data/content.js";
import { icon } from "./icons.js";

/** Education history as cards. */
export function renderEducation() {
  const cards = education
    .map(
      ({ institution, credential, period, current }, i) => `
        <article class="card card--hover edu-card" data-reveal style="--reveal-delay: ${i * 80}ms">
          <p class="edu-card__period">
            ${current ? '<span class="live" aria-hidden="true"></span>' : icon("cap")}
            ${period}
          </p>
          <h3 class="edu-card__institution">${institution}</h3>
          <p class="edu-card__credential">${credential}</p>
        </article>`,
    )
    .join("");

  return `
    <section class="section education" id="education" aria-labelledby="education-title">
      <div class="container">
        <header class="section__head" data-reveal>
          <p class="section__eyebrow">Education</p>
          <h2 class="section__title" id="education-title">Academic <span class="text-gradient">journey</span></h2>
        </header>

        <div class="edu__grid">
          ${cards}
        </div>
      </div>
    </section>`;
}
