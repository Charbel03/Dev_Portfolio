import { Component, computed, input } from '@angular/core';
import { Carousel } from '../carousel/carousel';
import { Project } from '../projects/projects.data';

@Component({
  selector: 'app-project-card',
  imports: [Carousel],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly index = input.required<number>();
  /** puts the screenshots on the right */
  readonly reverse = input(false);

  protected readonly number = computed(() => String(this.index() + 1).padStart(2, '0'));
}
