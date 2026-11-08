import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { PROFILE } from '../../config';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly prefs = inject(PreferencesService);
  private timer?: ReturnType<typeof setTimeout>;

  protected readonly profile = PROFILE;
  protected readonly copied = signal(false);
  protected readonly cvHref = computed(() => PROFILE.cv[this.prefs.lang()]);
  protected readonly copyLabel = computed(() => {
    const en = this.prefs.lang() === 'en';
    if (this.copied()) return en ? 'copied ✓' : 'kopierad ✓';
    return en ? 'copy' : 'kopiera';
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected copyEmail(): void {
    navigator.clipboard?.writeText(PROFILE.email).catch(() => {});
    this.copied.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), 1800);
  }
}
