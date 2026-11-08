export interface Bilingual {
  sv: string;
  en: string;
}

export interface Slide {
  src: string;
  alt: Bilingual;
}

export interface TerminalLine {
  /** prefix symbol: "$", "→" or "←" */
  prefix: string;
  text: string;
  /** trailing highlighted text, e.g. "✓" or "200 OK" */
  ok?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  primary?: boolean;
}

export interface Project {
  id: string;
  urlBar: string;
  kind: Bilingual;
  badge: Bilingual;
  title: string;
  description: Bilingual;
  terminal: TerminalLine[];
  tech: string[];
  links: ProjectLink[];
  slides: Slide[];
}

export const PROJECTS: Project[] = [
  {
    id: 'ftsim',
    urlBar: 'charbel03.github.io/FootballTournamentSimulator',
    kind: { sv: 'eget projekt', en: 'side project' },
    badge: { sv: 'GitHub Pages', en: 'GitHub Pages' },
    title: 'Football Tournament Simulator',
    description: {
      sv: 'Webbapp i Angular för att skapa och simulera fotbollsturneringar med 8–48 lag, från gruppspel till slutspelsträd — med manuell eller automatisk lottning, automatisk simulering av gruppmatcher och möjlighet att skapa egna lag. Landsdata hämtas från REST Countries via en Cloudflare Worker som håller API-nyckeln hemlig, begränsar CORS och cachar svaren, och lagen cachas i localStorage. Publicerad på GitHub Pages med automatisk deploy via GitHub Actions.',
      en: 'Angular web app for creating and simulating football tournaments with 8–48 teams, from group stage to a knockout bracket — with manual or automatic draws, auto-simulation of group matches and support for custom teams. Country data comes from REST Countries through a Cloudflare Worker that keeps the API key secret, restricts CORS and caches responses, while teams are cached in localStorage. Published on GitHub Pages with automated deploys via GitHub Actions.',
    },
    terminal: [
      { prefix: '$', text: 'git push origin master' },
      { prefix: '→', text: 'GitHub Actions: build → Pages', ok: '✓' },
      { prefix: '→', text: 'GET /countries (Cloudflare Worker)', ok: '200 OK' },
    ],
    tech: ['Angular', 'TypeScript', 'Cloudflare Workers', 'REST API', 'GitHub Actions', 'CI/CD'],
    links: [
      { label: 'Live demo ↗', url: 'https://charbel03.github.io/FootballTournamentSimulator/Home', primary: true },
      { label: 'GitHub ↗', url: 'https://github.com/Charbel03/FootballTournamentSimulator' },
    ],
    slides: [
      { src: 'projects/ftsim-1.webp', alt: { sv: 'Startsida — välj turnering', en: 'Start page — choose a tournament' } },
      { src: 'projects/ftsim-2.webp', alt: { sv: 'Gruppspel med tabell och matcher', en: 'Group stage with table and fixtures' } },
      { src: 'projects/ftsim-3.webp', alt: { sv: 'Slutspelsträd', en: 'Knockout bracket' } },
    ],
  },
  {
    id: 'aichatbot-api',
    urlBar: 'aichatbot-api · localhost:5197/swagger',
    kind: { sv: 'eget projekt', en: 'side project' },
    badge: { sv: 'REST API', en: 'REST API' },
    title: 'AIChatBot API',
    description: {
      sv: 'REST API i C# och ASP.NET Core som driver AI-chatboten. Använder OpenAI Chat Completions med function calling för att hämta väder, valutakurser och tid i olika tidszoner, och har endpoints för chatt och återställning av konversationen. Dokumenterat med Swagger och öppnat för frontenden via CORS — det är backenden som UI-versionen nedan pratar med.',
      en: 'C# and ASP.NET Core REST API that powers the AI chatbot. Uses OpenAI Chat Completions with function calling to fetch weather, exchange rates and time across time zones, with endpoints for chatting and resetting the conversation. Documented with Swagger and opened up to the frontend via CORS — it is the backend the UI version below talks to.',
    },
    terminal: [
      { prefix: '$', text: 'dotnet run' },
      { prefix: '→', text: 'POST /Ai/Message', ok: '200 OK' },
      { prefix: '→', text: 'tools: weather · currency · time', ok: '✓' },
    ],
    tech: ['C#', '.NET 8', 'ASP.NET Core', 'OpenAI', 'Swagger', 'CORS'],
    links: [{ label: 'GitHub ↗', url: 'https://github.com/Charbel03/AIChatBot', primary: true }],
    slides: [
      { src: 'projects/api-1.jpg', alt: { sv: 'Swagger — översikt av endpoints', en: 'Swagger — endpoint overview' } },
      { src: 'projects/api-2.jpg', alt: { sv: 'GET /Weather/forecast — väderprognos', en: 'GET /Weather/forecast — weather forecast' } },
      { src: 'projects/api-3.jpg', alt: { sv: 'Svar från AI om valutakurs', en: 'AI response about an exchange rate' } },
    ],
  },
  {
    id: 'aichatbot-ui',
    urlBar: 'aichatbot-ui · localhost:4200',
    kind: { sv: 'eget projekt', en: 'side project' },
    badge: { sv: 'Frontend', en: 'Frontend' },
    title: 'AIChatBot UI',
    description: {
      sv: 'Chattgränssnitt i Angular och Angular Material kopplat till AIChatBot API:t. Ställ frågor om väder, valuta och tid på svenska eller engelska, se en typing-indikator medan AI:n svarar och återställ chatthistoriken med ett klick.',
      en: 'Angular and Angular Material chat interface connected to the AIChatBot API. Ask about weather, currency and time in Swedish or English, watch a typing indicator while the AI replies, and reset the chat history with one click.',
    },
    terminal: [
      { prefix: '$', text: 'ng serve' },
      { prefix: '→', text: 'POST /Ai/Message' },
      { prefix: '←', text: 'AIChatBot API', ok: '200 OK' },
    ],
    tech: ['Angular', 'Angular Material', 'TypeScript', 'REST API'],
    links: [{ label: 'GitHub ↗', url: 'https://github.com/Charbel03/AiChatBotUI', primary: true }],
    slides: [
      { src: 'projects/ui-1.jpg', alt: { sv: 'Chattvy med svar om väder, valuta och tid', en: 'Chat view answering weather, currency and time' } },
      { src: 'projects/ui-2.jpg', alt: { sv: 'Dialog för att återställa chatthistorik', en: 'Reset chat history dialog' } },
      { src: 'projects/ui-3.jpg', alt: { sv: 'Väntar på svar från AI:n', en: 'Waiting for the AI to reply' } },
    ],
  },
];
