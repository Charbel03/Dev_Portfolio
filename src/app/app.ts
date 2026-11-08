import { Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Education } from './components/education/education';
import { Experience } from './components/experience/experience';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Projects } from './components/projects/projects';
import { Stack } from './components/stack/stack';
import { prefersReducedMotion } from './config';

/**
 * Root component. Besides composing the sections it owns the page-wide effects:
 * intro animation, scroll reveal, header state, scroll progress, active nav item,
 * timeline fill, parallax, cursor spotlight and card tilt.
 */
@Component({
  selector: 'app-root',
  imports: [Header, Hero, About, Stack, Experience, Projects, Education, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly reduced = prefersReducedMotion();
  private observer?: IntersectionObserver;
  private raf = 0;
  private tiltEl: HTMLElement | null = null;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      this.intro();
      this.setupReveal();

      const onScroll = () => {
        if (this.raf) return;
        this.raf = requestAnimationFrame(() => {
          this.raf = 0;
          this.tick();
        });
      };
      const onMove = (e: PointerEvent) => this.move(e);

      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('resize', onScroll);
      addEventListener('pointermove', onMove, { passive: true });
      this.tick();

      destroyRef.onDestroy(() => {
        removeEventListener('scroll', onScroll);
        removeEventListener('resize', onScroll);
        removeEventListener('pointermove', onMove);
        cancelAnimationFrame(this.raf);
        this.observer?.disconnect();
      });
    });
  }

  private intro(): void {
    if (this.reduced) return;
    document.querySelectorAll<HTMLElement>('[data-intro]').forEach((el) => {
      const i = Number(el.dataset['intro']);
      el.animate(
        [
          { opacity: 0, transform: 'translateY(24px)', filter: 'blur(8px)' },
          { opacity: 1, transform: 'none', filter: 'blur(0)' },
        ],
        { duration: 900, delay: 120 + i * 110, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' },
      );
    });
  }

  private setupReveal(): void {
    if (this.reduced) return;
    this.observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.filter = 'none';
          this.observer?.unobserve(el);
        }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    );

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight * 0.9) return;
      const d = Number(el.dataset['reveal']) || 0;
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.filter = 'blur(6px)';
      el.style.transition =
        `opacity .9s cubic-bezier(.2,.7,.2,1) ${d}ms, transform .9s cubic-bezier(.2,.7,.2,1) ${d}ms, filter .9s ease ${d}ms`;
      this.observer!.observe(el);
    });
  }

  private tick(): void {
    const root = document.documentElement;
    const vh = innerHeight;

    const progress = root.scrollTop / Math.max(1, root.scrollHeight - vh);
    const bar = document.querySelector<HTMLElement>('[data-progress]');
    if (bar) bar.style.transform = `scaleX(${progress})`;

    document.querySelector('[data-header]')?.classList.toggle('scrolled', root.scrollTop > 12);

    if (!this.reduced) {
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const r = el.parentElement!.getBoundingClientRect();
        const c = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0,${(-c * Number(el.dataset['parallax'])).toFixed(1)}px,0)`;
      });
    }

    const tl = document.querySelector<HTMLElement>('[data-tl]');
    const fill = document.querySelector<HTMLElement>('[data-tl-fill]');
    if (tl && fill) {
      const r = tl.getBoundingClientRect();
      const k = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      fill.style.height = `calc(${k * 100}% - ${k * 12}px)`;
    }

    let current: string | null = null;
    document.querySelectorAll<HTMLElement>('[data-section]').forEach((s) => {
      if (s.getBoundingClientRect().top < vh * 0.4) current = s.id;
    });
    document.querySelectorAll<HTMLElement>('[data-nav]').forEach((a) => {
      a.classList.toggle('active', a.dataset['nav'] === current);
    });
  }

  private move(e: PointerEvent): void {
    const root = document.documentElement;
    root.style.setProperty('--mx', `${e.clientX}px`);
    root.style.setProperty('--my', `${e.clientY}px`);
    if (e.pointerType === 'touch' || this.reduced) return;

    const target = (e.target as Element | null)?.closest?.<HTMLElement>('[data-tilt]') ?? null;
    if (this.tiltEl && this.tiltEl !== target) {
      this.tiltEl.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
      this.tiltEl.style.setProperty('--po', '0');
    }
    this.tiltEl = target;
    if (!target) return;

    const r = target.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const max = Number(target.dataset['tilt']) || 8;
    target.style.transform =
      `perspective(900px) rotateX(${((0.5 - y) * max).toFixed(2)}deg) rotateY(${((x - 0.5) * max).toFixed(2)}deg) translateY(-4px)`;
    target.style.setProperty('--px', `${x * 100}%`);
    target.style.setProperty('--py', `${y * 100}%`);
    target.style.setProperty('--po', '1');
  }
}
