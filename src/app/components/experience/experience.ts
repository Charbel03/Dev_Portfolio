import { Component } from '@angular/core';

interface Bilingual {
  sv: string;
  en: string;
}

interface Job {
  period: Bilingual;
  title: Bilingual;
  company: string;
  current?: boolean;
  /** may contain <b> tags */
  points: Bilingual[];
  tags: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  protected readonly jobs: Job[] = [
    {
      period: { sv: 'jun 2026 — nu', en: 'Jun 2026 — present' },
      title: { sv: 'Junior Backend Developer', en: 'Junior Backend Developer' },
      company: 'Dibz',
      current: true,
      points: [
        {
          sv: 'Utvecklar och underhåller backendlösningar i Python med <b>Selenium</b>, <b>requests</b> och <b>cron jobs</b> för automatisering och användarflöden, bland annat utskick av SMS och mejl via <b>Sinch</b> och <b>Infobip</b>.',
          en: 'Develop and maintain backend solutions in Python using <b>Selenium</b>, <b>requests</b> and <b>cron jobs</b> for automation and user flows, including SMS and email delivery via <b>Sinch</b> and <b>Infobip</b>.',
        },
        {
          sv: 'Ansvarar för integrationerna mot bostadsköer och hyresvärdar som <b>Heimstaden</b>, inklusive deras KPI:er. Övervakar login- och registreringsflödena så att användarnas intresseanmälningar hålls uppdaterade, och felsöker och löser problem när ändringar eller fel påverkar flödena.',
          en: 'Responsible for our integrations with housing queues and landlords such as <b>Heimstaden</b>, including their KPIs. Monitor the login and registration flows that keep users\' housing applications up to date, and troubleshoot and fix issues when changes or errors affect them.',
        },
        {
          sv: 'Använder <b>AWS CloudWatch</b> för loggövervakning och felsökning, och <b>AWS S3</b> för att hantera bilder kopplade till köerna.',
          en: 'Use <b>AWS CloudWatch</b> for log monitoring and troubleshooting, and <b>AWS S3</b> to manage images linked to the queues.',
        },
        {
          sv: 'Administrerar köer via <b>Postman</b>: skapar, ändrar, aktiverar och inaktiverar dem.',
          en: 'Manage queues through <b>Postman</b>: creating, updating, activating and deactivating them.',
        },
        {
          sv: 'Arbetar i tvåveckorssprintar med sprintplanering, regelbundna teammöten, tech syncs och tech demos.',
          en: 'Work in two-week sprints with sprint planning, regular team meetings, tech syncs and tech demos.',
        },
      ],
      tags: ['Python', 'Selenium', 'requests', 'cron', 'AWS CloudWatch', 'AWS S3', 'Postman', 'Sinch', 'Infobip', 'Scrum'],
    },
    {
      period: { sv: 'jan 2025 — apr 2025', en: 'Jan 2025 — Apr 2025' },
      title: { sv: 'Fullstackutvecklare (praktik)', en: 'Software Engineer Intern' },
      company: 'APCOA · Stockholm',
      points: [
        {
          sv: 'Utvecklade en AI-driven kundtjänstchatbot med <b>OpenAI GPT</b> och <b>function calling</b>, med realtidsdata och automatiskt genererade mejlmallar.',
          en: 'Developed an AI-powered customer-service chatbot using <b>OpenAI GPT</b> and <b>function calling</b>, with real-time data and automatically generated email templates.',
        },
        {
          sv: 'Designade, utvecklade och driftsatte <b>REST API:t</b> som chatboten bygger på.',
          en: 'Designed, built and deployed the <b>REST API</b> behind it.',
        },
        {
          sv: 'Testade i flera miljöer för att säkerställa kvalitet och tillförlitlighet.',
          en: 'Tested across multiple environments to ensure quality and reliability.',
        },
        { sv: 'Arbetade i ett agilt <b>Scrum</b>-team.', en: 'Worked in an Agile <b>Scrum</b> team.' },
      ],
      tags: ['OpenAI API', 'REST API', 'Scrum'],
    },
    {
      period: { sv: 'okt 2024 — dec 2024', en: 'Oct 2024 — Dec 2024' },
      title: { sv: 'Fullstackutvecklare (praktik)', en: 'Software Engineer Intern' },
      company: 'APCOA · Stockholm',
      points: [
        { sv: 'Byggde en <b>mobilapp från grunden</b> under praktiken.', en: 'Built a <b>mobile app from scratch</b> during the internship.' },
        {
          sv: 'Tog fram <b>UI/UX-skisser</b> med fokus på användarcentrerad design och integrerade <b>externa API:er</b>.',
          en: 'Created <b>UI/UX mockups</b> with a user-centred focus and integrated <b>external APIs</b>.',
        },
        { sv: 'Designade <b>databasscheman och ER-diagram</b>.', en: 'Designed <b>database schemas and ER diagrams</b>.' },
        {
          sv: 'Deltog i sprintplanering och uppgiftshantering i en agil miljö.',
          en: 'Took part in sprint planning and task management in an Agile setting.',
        },
      ],
      tags: ['C#', 'TypeScript', 'Angular', 'HTML', 'CSS'],
    },
  ];
}
