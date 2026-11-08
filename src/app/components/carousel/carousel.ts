import { Component, DestroyRef, ElementRef, computed, inject, input, signal, viewChild } from '@angular/core';
import { prefersReducedMotion } from '../../config';
import { PreferencesService } from '../../services/preferences.service';
import { Slide } from '../projects/projects.data';

const SLIDE_MS = 5000;

/** Auto-playing screenshot carousel with progress dots, arrows, keyboard, swipe and a click-to-enlarge lightbox. */
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  readonly slides = input.required<Slide[]>();
  protected readonly prefs = inject(PreferencesService);

  protected readonly index = signal(0);
  /** 0..1 progress of the active slide's timer */
  protected readonly progress = signal(0);
  /** true while the lightbox is open */
  protected readonly zoomed = signal(false);
  protected readonly offset = computed(() => `translateX(-${this.index() * 100}%)`);
  protected readonly total = computed(() => String(this.slides().length).padStart(2, '0'));
  protected readonly current = computed(() => String(this.index() + 1).padStart(2, '0'));
  protected readonly active = computed(() => this.slides()[this.index()]);

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly reduced = prefersReducedMotion();
  private paused = false;
  private start = performance.now();
  private pointerX: number | null = null;
  /** set when the last pointer gesture was a swipe, so it doesn't also count as a click */
  private swiped = false;
  private frame = 0;

  constructor() {
    const loop = (t: number) => {
      if (this.paused || this.reduced || this.zoomed()) {
        this.start = t - this.progress() * SLIDE_MS;
      } else {
        const k = (t - this.start) / SLIDE_MS;
        if (k >= 1) this.go(this.index() + 1);
        else this.progress.set(k);
      }
      this.frame = requestAnimationFrame(loop);
    };
    this.frame = requestAnimationFrame(loop);
    inject(DestroyRef).onDestroy(() => {
      cancelAnimationFrame(this.frame);
      if (this.zoomed()) this.unlockScroll();
    });
  }

  protected go(i: number): void {
    const n = this.slides().length;
    this.index.set(((i % n) + n) % n);
    this.start = performance.now();
    this.progress.set(0);
  }

  protected prev(e: Event): void {
    e.stopPropagation();
    this.go(this.index() - 1);
  }

  protected next(e: Event): void {
    e.stopPropagation();
    this.go(this.index() + 1);
  }

  protected onKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowLeft') this.go(this.index() - 1);
    if (e.key === 'ArrowRight') this.go(this.index() + 1);
    // only when the carousel itself has focus, not one of its buttons
    if (e.key === 'Enter' && e.target === e.currentTarget) this.open();
  }

  protected pause(): void {
    this.paused = true;
  }

  protected play(): void {
    this.paused = false;
  }

  protected down(e: PointerEvent): void {
    this.pointerX = e.clientX;
    this.swiped = false;
  }

  protected up(e: PointerEvent): void {
    if (this.pointerX == null) return;
    const dx = e.clientX - this.pointerX;
    this.pointerX = null;
    if (Math.abs(dx) > 40) {
      this.swiped = true;
      this.go(this.index() + (dx < 0 ? 1 : -1));
    }
  }

  protected fill(i: number): number {
    if (i < this.index()) return 1;
    if (i === this.index()) return this.progress();
    return 0;
  }

  // ---------- Lightbox ----------

  protected open(e?: Event): void {
    e?.stopPropagation();
    if (this.swiped) {
      this.swiped = false;
      return;
    }
    const dialog = this.dialog().nativeElement;
    if (dialog.open) return;
    dialog.showModal();
    this.zoomed.set(true);
    document.documentElement.style.overflow = 'hidden';
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  /** fires for Esc and the close button */
  protected onClosed(): void {
    this.zoomed.set(false);
    this.unlockScroll();
  }

  /** clicks on the empty area around the image close the lightbox */
  protected onDialogClick(e: MouseEvent): void {
    if (e.target === this.dialog().nativeElement && !this.swiped) this.close();
  }

  protected onDialogKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowLeft') this.go(this.index() - 1);
    if (e.key === 'ArrowRight') this.go(this.index() + 1);
  }

  private unlockScroll(): void {
    document.documentElement.style.overflow = '';
  }
}
