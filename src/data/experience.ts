export interface Job {
  title: string;
  company?: string;
  companyNote?: string;
  location?: string;
  period: string;
  bullets: string[];
}

export const jobs: Job[] = [
  {
    title: 'Software Engineer - AI Tooling & Frontend Platform',
    company: 'Appfire Flow',
    companyNote: '(fka Pluralsight Flow)',
    location: 'Remote',
    period: 'Feb 2025 – Present',
    bullets: [
      'Led end-to-end design and development of a customer-facing AI chatbot interface using AWS Strands Agents SDK orchestrating Bedrock-hosted models, owning UX patterns, interaction design, and Python tools decorated with docstrings as the schema layer to generate accurate, grounded responses with supporting data visualizations.',
      'Translating high-level product directives into shipped AI features, leading initiative planning and technical research to define scope and architecture, then owning implementation from POC to production.',
      'Developed shared agentic skills and workflows for the internal engineering harness, including a component migration skill for the acquisition process, PR review skills that enforce coding standards, and an implementation skill that breaks down work into structured, verifiable PRs aligned with per-repo coding conventions.',
      "Supported a 6-month post-acquisition migration of frontend package registries, internal design systems and repos into Appfire's ecosystem, addressing rebranding, support tickets, and app stability.",
      'Supporting ongoing frontend dependency management, Snyk vulnerability remediation, and AI developer tooling integrations across the platform.',
    ],
  },
  {
    title: 'Software Engineer - Frontend Platform',
    company: 'Pluralsight Flow',
    location: 'Remote',
    period: 'Mar 2022 – Feb 2025',
    bullets: [
      'Maintained the shared Storybook component library for the Flow BU. Developed reusable widgets, standardized components, and enforced UI consistency across consuming bounded contexts.',
      'Raised frontend test coverage to a minimum of 70% across React repos by backfilling unit and integration tests. Led the accessibility compliance initiative bringing all customer-facing UI to WCAG AA standards, enforced through axe-core and CI pipeline checks.',
      'Led frontend feature initiatives to build, consolidate, and retire reports across the application. Demoed new functionality and alpha/beta releases to go-to-market stakeholders and CSM teams before release.',
      'Mentored interns and conducted frontend engineering interviews; served as teaching assistant for a Pluralsight × Year Up web development program.',
    ],
  },
  {
    title: 'Freelance Web Developer & Designer',
    period: 'Oct 2018 – Jun 2023',
    bullets: [
      'Designed and launched branded static sites for small businesses transitioning off social-only presences, integrating booking and payment systems designed to match existing brand identity.',
      'Owned the full client lifecycle: scoping requirements, UI design and development, and deployment.',
      'Conducted client interviews to build branding and content, and researched SEO strategies for each business.',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'MaxEx',
    location: 'Atlanta, GA',
    period: 'Feb 2020 – Jan 2022',
    bullets: [
      'Built, tested, and documented new and modified features across a .NET/Angular stack.',
      'Researched system workflows and data usage to optimize, automate, and refactor existing business logic.',
    ],
  },
];
