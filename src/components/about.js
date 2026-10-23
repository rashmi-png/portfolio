import { about, profile } from "../data/content.js";
import { icon } from "./icons.js";

/** About: professional introduction plus a quick-facts panel. */
export function renderAbout() {
  const paragraphs = about.paragraphs.map((text) => `<p>${text}</p>`).join("");
  const focus = about.focus.map((item) => `<li class="chip">${item}</li>`).join("");
  const facts = about.facts
    .map(
      ({ label, value }) => `
        <li class="facts__item">
          <span class="facts__label">${label}</span>
          <span class="facts__value">${value}</span>
        </li>`,
    )
    .join("");

  return `
    <section class="section about" id="about" aria-labelledby="about-title">
      <div class="container">
        <header class="section__head" data-reveal>
          <p class="section__eyebrow">About</p>
          <h2 class="section__title" id="about-title">Solving problems with <span class="text-gradient">AI, data &amp; software</span></h2>
        </header>

        <div class="about__grid">
          <div class="about__text" data-reveal>
            ${paragraphs}
            <ul class="about__focus" aria-label="Areas of focus">${focus}</ul>
            <p class="about__seeking">
              ${icon("sparkle")}
              <span>${profile.seeking}</span>
            </p>
          </div>

          <aside class="card facts" data-reveal style="--reveal-delay: 120ms" aria-label="Quick facts">
            <p class="facts__title">${icon("bolt")} Quick facts</p>
            <ul class="facts__list">${facts}</ul>
          </aside>
        </div>
      </div>
    </section>`;
}
