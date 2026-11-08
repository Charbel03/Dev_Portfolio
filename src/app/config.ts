/** Personal links shown across the portfolio. Update these with your real values. */
export const PROFILE = {
  email: 'charbel.chayeb03@gmail.com',
  githubUrl: 'https://github.com/Charbel03',
  linkedinUrl: 'https://www.linkedin.com/in/charbel-chayeb/',
  cv: {
    sv: 'cv/charbel-chayeb-cv-sv.pdf',
    en: 'cv/charbel-chayeb-cv-en.pdf',
  },
};

/** Strips protocol, www. and trailing slash: "https://github.com/x/" -> "github.com/x" */
export function shortUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function prefersReducedMotion(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}
