import { Component, computed, inject } from '@angular/core';
import { PROFILE, shortUrl } from '../../config';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  // keeps the column alignment in the profile.py code block
  preserveWhitespaces: true,
})
export class Hero {
  private readonly prefs = inject(PreferencesService);

  protected readonly profile = PROFILE;
  protected readonly githubShort = shortUrl(PROFILE.githubUrl);
  protected readonly linkedinShort = shortUrl(PROFILE.linkedinUrl);
  protected readonly cvHref = computed(() => PROFILE.cv[this.prefs.lang()]);
}
