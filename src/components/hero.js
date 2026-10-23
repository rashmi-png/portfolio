import { profile } from "../data/content.js";
import { icon } from "./icons.js";

/** Hero: headline, intro, CTAs, meta, and an abstract animated background. */
export function renderHero() {
  const headline = profile.headline
    .split("|")
    .map((part) => part.trim())
    .join('<span class="sep" aria-hidden="true">|</span>');

  return `
    <section class="hero" id="home" aria-labelledby="hero-title">
      <div class="hero__bg" aria-hidden="true">
        <div class="hero__grid"></div>
        <div class="hero__orb hero__orb--purple"></div>
        <div class="hero__orb hero__orb--blue"></div>
        <div class="hero__orb hero__orb--sky"></div>
      </div>

      <div class="container hero__inner">
        <div class="hero__content">
          <p class="hero__eyebrow" data-reveal>
            <span class="dot"></span>
            Open to entry-level opportunities
          </p>

          <h1 class="hero__name" id="hero-title" data-reveal style="--reveal-delay: 80ms">
            Hi, I'm <span class="text-gradient">${profile.name}</span>
          </h1>

          <p class="hero__headline" data-reveal style="--reveal-delay: 160ms">${headline}</p>

          <p class="hero__intro" data-reveal style="--reveal-delay: 240ms">${profile.introShort}</p>

          <div class="btn-row hero__actions" data-reveal style="--reveal-delay: 320ms">
            <a class="btn btn--primary" href="#projects">
              Explore My Projects ${icon("arrowRight")}
            </a>
            <a class="btn btn--secondary" href="${profile.resumeUrl}" download>
              ${icon("download")} Download Resume
            </a>
            <a class="btn btn--ghost" href="#contact">
              ${icon("send")} Contact Me
            </a>
          </div>

          <ul class="hero__meta" data-reveal style="--reveal-delay: 400ms">
            <li>${icon("cap")} B.E. Computer Science (AI &amp; ML) — Expected 2028</li>
            <li>${icon("location")} Kundapura, Karnataka, India</li>
          </ul>
        </div>

        <aside class="terminal" data-reveal style="--reveal-delay: 300ms" aria-label="Snapshot of Rashmi's focus areas">
          <div class="terminal__bar" aria-hidden="true">
            <i></i><i></i><i></i>
            <span>rashmi.ts</span>
          </div>
          <div class="terminal__body" aria-hidden="true">
            <div class="line"><span class="c-fn">const</span> <span class="c-key">rashmi</span> <span class="c-punct">= {</span></div>
            <div class="line">  <span class="c-key">role</span><span class="c-punct">:</span> <span class="c-str">"CS Student (AI &amp; ML)"</span><span class="c-punct">,</span></div>
            <div class="line">  <span class="c-key">focus</span><span class="c-punct">: [</span></div>
            <div class="line">    <span class="c-str">"AI &amp; Machine Learning"</span><span class="c-punct">,</span></div>
            <div class="line">    <span class="c-str">"Data Analytics"</span><span class="c-punct">,</span></div>
            <div class="line">    <span class="c-str">"Full Stack Development"</span><span class="c-punct">,</span></div>
            <div class="line">  <span class="c-punct">],</span></div>
            <div class="line">  <span class="c-key">internships</span><span class="c-punct">:</span> <span class="c-punct">[</span><span class="c-str">"Workora"</span><span class="c-punct">,</span> <span class="c-str">"Thiranex"</span><span class="c-punct">,</span> <span class="c-str">"Rabtech"</span><span class="c-punct">],</span></div>
            <div class="line">  <span class="c-key">status</span><span class="c-punct">:</span> <span class="c-str">"Ready to build"</span><span class="c-punct">,</span></div>
            <div class="line">  <span class="c-key">location</span><span class="c-punct">:</span> <span class="c-str">"Kundapura, Karnataka, India"</span> <span class="c-punct">,</span></div>
            <div class="line"><span class="c-punct">};</span> <span class="terminal__cursor"></span></div>
          </div>
        </aside>
      </div>
    </section>`;
}
