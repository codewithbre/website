export interface SkillChip {
  name: string;
  icon?: string;
}

export interface Group {
  label: string;
  chips: SkillChip[];
}

export interface SkillRow {
  category: string;
  icon: string;
  groups: Group[];
}

export const skills: SkillRow[] = [
  {
    category: 'Programming',
    icon: 'lucide:code-2',
    groups: [
      {
        label: 'Languages',
        chips: [
          { name: 'TypeScript', icon: 'simple-icons:typescript' },
          { name: 'Python', icon: 'simple-icons:python' },
          { name: 'SQL' },
        ],
      },
      {
        label: 'Frameworks',
        chips: [
          { name: 'React', icon: 'simple-icons:react' },
          { name: 'Next.js', icon: 'simple-icons:nextdotjs' },
          { name: 'Astro', icon: 'simple-icons:astro' },
          { name: 'Storybook', icon: 'simple-icons:storybook' },
        ],
      },
      {
        label: 'Design & Styling',
        chips: [
          { name: 'Figma', icon: 'simple-icons:figma' },
          { name: 'CSS', icon: 'simple-icons:css3' },
          { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
          { name: 'Styled Components', icon: 'simple-icons:styledcomponents' },
          { name: 'Sass', icon: 'simple-icons:sass' },
        ],
      },
      {
        label: 'Build tools',
        chips: [
          { name: 'Vite', icon: 'simple-icons:vite' },
          { name: 'Webpack', icon: 'simple-icons:webpack' },
        ],
      },
      {
        label: 'Protocols',
        chips: [{ name: 'GraphQL', icon: 'simple-icons:graphql' }, { name: 'REST' }],
      },
    ],
  },
  {
    category: 'AI & Agentic Systems',
    icon: 'lucide:bot',
    groups: [
      {
        label: 'Platforms & Tools',
        chips: [
          { name: 'AWS Bedrock', icon: 'simple-icons:amazonaws' },
          { name: 'AWS Strands', icon: 'simple-icons:amazonaws' },
          { name: 'Anthropic SDK', icon: 'simple-icons:anthropic' },
          { name: 'LangChain', icon: 'simple-icons:langchain' },
          { name: 'LangSmith' },
          { name: 'Claude Code', icon: 'simple-icons:anthropic' },
          { name: 'Cursor', icon: 'simple-icons:cursor' },
        ],
      },
      {
        label: 'Practices',
        chips: [
          { name: 'Model Context Protocol (MCP)' },
          { name: 'Retrieval-Augmented Generation (RAG)' },
          { name: 'Agentic workflow design' },
          { name: 'Multi-agent orchestration' },
        ],
      },
    ],
  },
  {
    category: 'Frontend Architecture',
    icon: 'lucide:component',
    groups: [
      {
        label: 'Architecture patterns',
        chips: [
          { name: 'Module federation' },
          { name: 'Bounded contexts' },
          { name: 'Domain driven design' },
          { name: 'Design system development' },
        ],
      },
      {
        label: 'State management',
        chips: [{ name: 'React Context' }, { name: 'Nanostores' }, { name: 'React Query' }],
      },
    ],
  },
  {
    category: 'Testing & Quality',
    icon: 'lucide:check-circle',
    groups: [
      {
        label: 'Unit & Integration',
        chips: [
          { name: 'Jest', icon: 'simple-icons:jest' },
          { name: 'React Testing Library', icon: 'simple-icons:testinglibrary' },
          { name: 'Vitest', icon: 'simple-icons:vitest' },
        ],
      },
      {
        label: 'E2E',
        chips: [
          { name: 'Cypress', icon: 'simple-icons:cypress' },
          { name: 'Playwright', icon: 'simple-icons:playwright' },
        ],
      },
      {
        label: 'Accessibility',
        chips: [{ name: 'axe-core' }, { name: 'WCAG AA' }],
      },
    ],
  },
  {
    category: 'CI/CD & Tooling',
    icon: 'lucide:git-branch',
    groups: [
      {
        label: 'Pipelines & Containers',
        chips: [
          { name: 'GitHub Actions', icon: 'simple-icons:githubactions' },
          { name: 'Jenkins', icon: 'simple-icons:jenkins' },
          { name: 'Argo CD', icon: 'simple-icons:argo' },
          { name: 'Docker', icon: 'simple-icons:docker' },
        ],
      },
      {
        label: 'Code quality',
        chips: [
          { name: 'ESLint', icon: 'simple-icons:eslint' },
          { name: 'Prettier', icon: 'simple-icons:prettier' },
        ],
      },
      {
        label: 'Observability & Security',
        chips: [
          { name: 'Snyk', icon: 'simple-icons:snyk' },
          { name: 'LaunchDarkly' },
          { name: 'Datadog', icon: 'simple-icons:datadog' },
        ],
      },
    ],
  },
  {
    category: 'Infrastructure & Deployment',
    icon: 'lucide:server',
    groups: [
      {
        label: 'Deployment',
        chips: [
          { name: 'AWS', icon: 'simple-icons:amazonaws' },
          { name: 'Vercel', icon: 'simple-icons:vercel' },
          { name: 'Cloudflare Pages', icon: 'simple-icons:cloudflare' },
          { name: 'Cloudflare D1', icon: 'simple-icons:cloudflare' },
          { name: 'Netlify', icon: 'simple-icons:netlify' },
        ],
      },
      {
        label: 'Runtime & Package managers',
        chips: [
          { name: 'Node.js', icon: 'simple-icons:nodedotjs' },
          { name: 'npm', icon: 'simple-icons:npm' },
          { name: 'Yarn', icon: 'simple-icons:yarn' },
          { name: 'pnpm', icon: 'simple-icons:pnpm' },
          { name: 'Poetry', icon: 'simple-icons:poetry' },
        ],
      },
      {
        label: 'Version control',
        chips: [
          { name: 'Git', icon: 'simple-icons:git' },
          { name: 'GitHub', icon: 'simple-icons:github' },
        ],
      },
    ],
  },
];

export const brandColors: Record<string, string> = {
  'simple-icons:typescript': '#3178C6',
  'simple-icons:python': '#3776AB',
  'simple-icons:css3': '#1572B6',
  'simple-icons:react': '#149eca',
  'simple-icons:astro': '#FF5D01',
  'simple-icons:tailwindcss': '#06B6D4',
  'simple-icons:styledcomponents': '#DB7093',
  'simple-icons:sass': '#CC6699',
  'simple-icons:graphql': '#E10098',
  'simple-icons:amazonaws': '#FF9900',
  'simple-icons:storybook': '#FF4785',
  'simple-icons:vite': '#646CFF',
  'simple-icons:webpack': '#3b7abf',
  'simple-icons:jest': '#C21325',
  'simple-icons:testinglibrary': '#E33332',
  'simple-icons:playwright': '#2EAD33',
  'simple-icons:vitest': '#6E9F18',
  'simple-icons:githubactions': '#2088FF',
  'simple-icons:jenkins': '#D24939',
  'simple-icons:argo': '#EF7B4D',
  'simple-icons:docker': '#2496ED',
  'simple-icons:eslint': '#4B32C3',
  'simple-icons:prettier': '#F7B93E',
  'simple-icons:datadog': '#632CA6',
  'simple-icons:langchain': '#1C3C3C',
  'simple-icons:cloudflare': '#F38020',
  'simple-icons:netlify': '#00C7B7',
  'simple-icons:nodedotjs': '#5FA04E',
  'simple-icons:npm': '#CB3837',
  'simple-icons:yarn': '#2C8EBB',
  'simple-icons:pnpm': '#F69220',
  'simple-icons:poetry': '#60A5FA',
  'simple-icons:git': '#F05032',
  'simple-icons:figma': '#F24E1E',
};
