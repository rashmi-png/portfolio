import { skillCategories } from "../data/content.js";
import { icon } from "./icons.js";

/** Technical + professional skills grouped into category cards. */
export function renderSkills() {
  const cards = skillCategories
    .map(
      ({ title, icon: iconName, description, skills }, i) => `
        <article class="card card--hover skill-card" data-reveal style="--reveal-delay: ${i * 80}ms">
          <div class="skill-card__head">
            <span class="icon-box">${icon(iconName)}</span>
            <h3 class="skill-card__title">${title}</h3>
          </div>
          <p class="skill-card__desc">${description}</p>
          <ul class="skill-card__list" aria-label="${title} skills">
            ${skills.map((skill) => `<li class="chip">${skill}</li>`).join("")}
          </ul>
        </article>`,
    )
    .join("");

  return `
    <section class="section skills" id="skills" aria-labelledby="skills-title">
      <div class="container">
        <header class="section__head" data-reveal>
          <p class="section__eyebrow">Technical Skills</p>
          <h2 class="section__title" id="skills-title">The tools I work <span class="text-gradient">every day</span></h2>
          <p class="section__lead">A blend of data, machine learning, and web development skills — backed by internship and project experience.</p>
        </header>

        <div class="skills__grid">
          ${cards}
        </div>
      </div>
    </section>`;
}
