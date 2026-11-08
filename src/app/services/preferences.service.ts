import { Injectable, signal } from '@angular/core';
import { prefersReducedMotion } from '../config';

export type Lang = 'sv' | 'en';
export type Theme = 'dark' | 'light';

/** Holds language + theme and mirrors them onto <html data-lang / data-theme>. */
@Injectable({ providedIn: 'root' })
export class PreferencesService {
  private readonly root = document.documentElement;

  readonly lang = signal<Lang>(this.root.dataset['lang'] === 'en' ? 'en' : 'sv');
  readonly theme = signal<Theme>(this.root.dataset['theme'] === 'light' ? 'light' : 'dark');

  setLang(lang: Lang): void {
    if (lang === this.lang()) return;
    this.lang.set(lang);
    const reduced = prefersReducedMotion();
    const main = document.querySelector('main');
    if (main && !reduced) {
      main.animate(
        [{ opacity: 1 }, { opacity: 0.25, filter: 'blur(3px)' }, { opacity: 1, filter: 'blur(0)' }],
        { duration: 420, easing: 'ease-in-out' },
      );
    }
    setTimeout(() => {
      this.root.dataset['lang'] = lang;
      this.root.lang = lang;
      this.store('cc-lang', lang);
    }, reduced ? 0 : 170);
  }

  /** Toggles theme with a circular reveal starting at the click position. */
  toggleTheme(event: MouseEvent): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    const apply = () => {
      this.root.dataset['theme'] = next;
      this.store('cc-theme', next);
    };

    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || prefersReducedMotion()) {
      apply();
      return;
    }
    const x = event.clientX;
    const y = event.clientY;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    doc.startViewTransition(apply).ready
      .then(() =>
        this.root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 700, easing: 'cubic-bezier(.65,0,.25,1)', pseudoElement: '::view-transition-new(root)' },
        ),
      )
      .catch(() => {});
  }

  private store(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* storage unavailable */
    }
  }
}
