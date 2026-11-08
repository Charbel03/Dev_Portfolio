import { Component, computed, inject } from '@angular/core';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly prefs = inject(PreferencesService);

  protected readonly navItems = [
    { id: 'om', label: 'about.md' },
    { id: 'utbildning', label: 'Education.java' },
    { id: 'stack', label: 'stack.json' },
    { id: 'erfarenhet', label: 'experience.log' },
    { id: 'projekt', label: 'projects/' },
    { id: 'kontakt', label: 'contact.sh' },
  ];

  protected readonly dark = computed(() => this.prefs.theme() === 'dark');
}
