import { Component } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { PROJECTS } from './projects.data';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  protected readonly projects = PROJECTS;
}
