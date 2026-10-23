import { internships } from "../data/content.js";
import { icon } from "./icons.js";

/** Internship experience rendered as a professional timeline. */
export function renderExperience() {
  const items = internships
    .map(
      ({ role, company, period, current, bullets }, i) => `
        <li class="timeline__item" data-reveal style="--reveal-delay: ${i * 90}ms">
          <article class="card card--hover timeline__card">
            <div class="timeline__top">
              <div>
                <h3 class="timeline__role">${role}</h3>
                <span class="timeline__company">${company}</span>
              </div>
              <p class="timeline__period">
                ${current ? '<span class="live" aria-hidden="true"></span>' : icon("calendar")}
                ${period}
              </p>
            </div>
            <ul class="timeline__bullets">
              ${bullets.map((b) => `<li>${b}</li>`).join("")}
            </ul>
          </article>
        </li>`,
    )
    .join("");

  return `
    <section class="section experience" id="experience" aria-labelledby="experience-title">
      <div class="container">
        <header class="section__head" data-reveal>
          <p class="section__eyebrow">Internships</p>
          <h2 class="section__title" id="experience-title">Experience across <span class="text-gradient">code, data &amp; AI</span></h2>
          <p class="section__lead">Three internships spanning full-stack engineering, data analytics, and applied machine learning.</p>
        </header>

        <ol class="timeline">
          ${items}
        </ol>
      </div>
    </section>`;
}
