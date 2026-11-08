import { Component, signal } from '@angular/core';

type Category = 'backend' | 'data' | 'cloud' | 'frontend' | 'tools';
type Filter = 'all' | Category;
/** where the skill has been used: professionally (work or internship) or in a side project */
type Source = 'work' | 'proj';

interface Skill {
  name: string;
  cat: Category;
  src?: Source[];
}

@Component({
  selector: 'app-stack',
  templateUrl: './stack.html',
  styleUrl: './stack.css',
})
export class Stack {
  protected readonly filter = signal<Filter>('all');

  protected readonly tabs: { key: Filter; sv: string; en: string }[] = [
    { key: 'all', sv: 'alla', en: 'all' },
    { key: 'backend', sv: 'backend', en: 'backend' },
    { key: 'data', sv: 'databaser', en: 'databases' },
    { key: 'cloud', sv: 'moln & devops', en: 'cloud & devops' },
    { key: 'frontend', sv: 'frontend', en: 'frontend' },
    { key: 'tools', sv: 'integrationer & arbetssätt', en: 'integrations & workflow' },
  ];

  protected readonly legend: { key: Source; sv: string; en: string }[] = [
    { key: 'work', sv: 'använt i arbetslivet (jobb & praktik)', en: 'used professionally (work & internships)' },
    { key: 'proj', sv: 'använt i egna projekt', en: 'used in side projects' },
  ];

  protected readonly skills: Skill[] = [
    { name: 'Python', cat: 'backend', src: ['work'] },
    { name: 'Java', cat: 'backend', src: ['proj'] },
    { name: 'Spring Boot', cat: 'backend', src: ['proj'] },
    { name: 'C#', cat: 'backend', src: ['work', 'proj'] },
    { name: '.NET', cat: 'backend', src: ['proj'] },
    { name: 'C++', cat: 'backend', src: ['proj'] },
    { name: 'REST API', cat: 'backend', src: ['work', 'proj'] },
    { name: 'Selenium', cat: 'backend', src: ['work'] },
    { name: 'requests', cat: 'backend', src: ['work'] },
    { name: 'cron jobs', cat: 'backend', src: ['work'] },
    { name: 'OpenAI API', cat: 'backend', src: ['work', 'proj'] },

    { name: 'PostgreSQL', cat: 'data', src: ['proj'] },
    { name: 'MySQL', cat: 'data', src: ['work'] },
    { name: 'Redis', cat: 'data', src: ['work'] },
    { name: 'SQL', cat: 'data', src: ['work'] },

    { name: 'AWS CloudWatch', cat: 'cloud', src: ['work'] },
    { name: 'AWS S3', cat: 'cloud', src: ['work'] },
    { name: 'Docker', cat: 'cloud', src: ['work'] },
    { name: 'Kubernetes', cat: 'cloud', src: ['work'] },
    { name: 'GitHub Actions', cat: 'cloud', src: ['proj'] },
    { name: 'Cloudflare Workers', cat: 'cloud', src: ['proj'] },
    { name: 'Azure', cat: 'cloud', src: ['proj'] },

    { name: 'Angular', cat: 'frontend', src: ['work', 'proj'] },
    { name: 'TypeScript', cat: 'frontend', src: ['work', 'proj'] },
    { name: 'React', cat: 'frontend', src: ['proj'] },
    { name: 'Angular Material', cat: 'frontend', src: ['proj'] },
    { name: 'JavaScript', cat: 'frontend', src: ['proj'] },
    { name: 'HTML', cat: 'frontend', src: ['work', 'proj'] },
    { name: 'CSS', cat: 'frontend', src: ['work', 'proj'] },

    { name: 'Sinch', cat: 'tools', src: ['work'] },
    { name: 'Infobip', cat: 'tools', src: ['work'] },
    { name: 'Postman', cat: 'tools', src: ['work'] },
    { name: 'Scrum', cat: 'tools', src: ['work'] },
  ];

  protected isOn(skill: Skill): boolean {
    const f = this.filter();
    return f === 'all' || f === skill.cat;
  }
}
