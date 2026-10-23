/**
 * Inline SVG icon set (stroke-based, inherits currentColor).
 * Keeping icons inline avoids extra network requests and lets them
 * adapt to text colour for free.
 */

const paths = {
  menu: '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>',
  close: '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
  download:
    '<path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M4 19h16"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  location: '<path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  github:
    '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19.9 5a4.9 4.9 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.6 0C6.9 1.1 5.8 1.4 5.8 1.4A4.9 4.9 0 0 0 5.7 5a5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V21"/>',
  linkedin:
    '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7"/><circle cx="8" cy="7" r="0.6" fill="currentColor"/><path d="M12 17v-4a2.5 2.5 0 0 1 5 0v4"/><path d="M12 10v7"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  arrowDown: '<path d="M12 5v14"/><path d="m6 13 6 6 6-6"/>',
  external: '<path d="M14 5h5v5"/><path d="M19 5 10 14"/><path d="M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"/>',
  chart: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M21 20H3"/>',
  brain:
    '<path d="M12 5a3 3 0 0 0-5.6-1.5A2.8 2.8 0 0 0 4 8.7a3 3 0 0 0 .8 5.6A3 3 0 0 0 12 19V5Z"/><path d="M12 5a3 3 0 0 1 5.6-1.5A2.8 2.8 0 0 1 20 8.7a3 3 0 0 1-.8 5.6A3 3 0 0 1 12 19V5Z"/>',
  code: '<path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="m13 5-2 14"/>',
  users:
    '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.5a3.2 3.2 0 0 1 0 5"/><path d="M17.5 14.6A5.5 5.5 0 0 1 20.5 20"/>',
  sparkle: '<path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="m6.3 6.3 2.5 2.5"/><path d="m15.2 15.2 2.5 2.5"/><path d="m17.7 6.3-2.5 2.5"/><path d="m8.8 15.2-2.5 2.5"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3.5 10h17"/>',
  cap: '<path d="m12 4 9 4.5-9 4.5-9-4.5L12 4Z"/><path d="M6.5 11v4.2c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8V11"/><path d="M21 9v5"/>',
  briefcase: '<rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>',
  send: '<path d="M21 3 3 10.5l7 3 3 7L21 3Z"/><path d="m10 13.5 4-4"/>',
  shield: '<path d="M12 3.5 5 6v5.5c0 4.2 2.9 7.4 7 9 4.1-1.6 7-4.8 7-9V6l-7-2.5Z"/><path d="m9 12 2 2 4-4"/>',
  bolt: '<path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z"/>',
};

/**
 * @param {keyof typeof paths} name
 * @param {{ className?: string, ariaHidden?: boolean }} [opts]
 * @returns {string} SVG markup
 */
export function icon(name, opts = {}) {
  const { className = "", ariaHidden = true } = opts;
  const body = paths[name] || "";
  const attrs = [
    'xmlns="http://www.w3.org/2000/svg"',
    'viewBox="0 0 24 24"',
    'fill="none"',
    'stroke="currentColor"',
    'stroke-width="1.8"',
    'stroke-linecap="round"',
    'stroke-linejoin="round"',
  ];
  if (className) attrs.push(`class="${className}"`);
  if (ariaHidden) attrs.push('aria-hidden="true"');
  return `<svg ${attrs.join(" ")}>${body}</svg>`;
}
