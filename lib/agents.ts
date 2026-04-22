import { aiExperimentsAgentSummary, crawlHints, homeProjects, primaryNavigation, siteIdentity, specialties, timelineEntries } from "@/lib/site-content"

function buildProjectLines() {
  return homeProjects.map((project) => ({
    route: `/work/${project.slug}`,
    title: project.client,
    year: project.year,
    summary: project.summary.en,
  }))
}

function buildNavigationLines() {
  return primaryNavigation.map((item) => ({
    route: item.href,
    label: item.label.en,
    note: item.note ?? "",
  }))
}

export function buildAgentsMarkdown() {
  const lines = [
    '# agents.md',
    '',
    `site: ${siteIdentity.name}`,
    `role: ${siteIdentity.role}`,
    `location: ${siteIdentity.location}`,
    'languages: es, en',
    '',
    '## Summary',
    `${siteIdentity.name} is a marketer and consultant working across brand strategy, content systems, storytelling and AI-assisted production workflows. This website is a portfolio with project case studies, an about page, a career timeline, an AI experiments section and an experimental home variant.`,
    '',
    '## Primary Routes',
    ...buildNavigationLines().map((item) => `- \`${item.route}\` - ${item.label}. ${item.note}`),
    '',
    '## Projects',
    ...buildProjectLines().map((item) => `- \`${item.route}\` - ${item.year} - ${item.title}. ${item.summary}`),
    '',
    '## AI Experiments',
    `- Route: \`${aiExperimentsAgentSummary.route}\``,
    `- Overview: ${aiExperimentsAgentSummary.overview.en}`,
    '- Stack:',
    ...aiExperimentsAgentSummary.stack.map((section) => `  - ${section.label}: ${section.items.join(', ')}`),
    '- Highlights:',
    ...aiExperimentsAgentSummary.highlights.map((item) => `  - ${item.en}`),
    '- 2025 Work Examples:',
    ...aiExperimentsAgentSummary.workExamples2025.map((example) => `  - ${example.title}: ${example.summary.en} ${example.pipeline.en} Tools: ${example.tools.join(', ')}.`),
    '- Vibe-coding Webapps:',
    ...aiExperimentsAgentSummary.webapps.map((tool) => `  - \`${tool.route}\` - ${tool.title}. ${tool.summary.en}`),
    '- 2022-2024 Archive Highlights:',
    ...aiExperimentsAgentSummary.archiveHighlights.map((item) => `  - ${item.title}: ${item.summary.en}`),
    '',
    '## Specialties',
    ...specialties.map((specialty) => `- ${specialty}`),
    '',
    '## Timeline Highlights',
    ...timelineEntries.map((entry) => `- ${entry.year} - ${entry.title} - ${entry.role.en}. ${entry.description.en}`),
    '',
    '## Crawl Hints',
    ...crawlHints.map((hint) => `- ${hint}`),
    '',
    '## Notes',
    '- The primary detailed content lives under /work/*.',
    '- /home-variant is intentionally separate from / and does not replace the default home.',
    '- /agents.md and /agents.txt are provided for agent-friendly crawling and summarization.',
  ]

  return lines.join('\n')
}

export function buildAgentsText() {
  const lines = [
    'AGENTS.TXT',
    '',
    `SITE: ${siteIdentity.name}`,
    `ROLE: ${siteIdentity.role}`,
    `LOCATION: ${siteIdentity.location}`,
    'LANGUAGES: es, en',
    '',
    'SUMMARY:',
    `${siteIdentity.name} works across brand strategy, content systems, storytelling and AI-assisted production workflows. The site is a portfolio with case studies, profile information, timeline history and an experimental home variant.`,
    '',
    'PRIMARY ROUTES:',
    ...buildNavigationLines().map((item) => `- ${item.route} :: ${item.label} :: ${item.note}`),
    '',
    'PROJECTS:',
    ...buildProjectLines().map((item) => `- ${item.route} :: ${item.year} :: ${item.title} :: ${item.summary}`),
    '',
    'AI_EXPERIMENTS:',
    `- ROUTE :: ${aiExperimentsAgentSummary.route}`,
    `- OVERVIEW :: ${aiExperimentsAgentSummary.overview.en}`,
    ...aiExperimentsAgentSummary.stack.map((section) => `- STACK :: ${section.label} :: ${section.items.join(', ')}`),
    ...aiExperimentsAgentSummary.highlights.map((item) => `- HIGHLIGHT :: ${item.en}`),
    ...aiExperimentsAgentSummary.workExamples2025.map((example) => `- 2025_EXAMPLE :: ${example.title} :: ${example.summary.en} ${example.pipeline.en} :: TOOLS ${example.tools.join(', ')}`),
    ...aiExperimentsAgentSummary.webapps.map((tool) => `- WEBAPP :: ${tool.route} :: ${tool.title} :: ${tool.summary.en}`),
    ...aiExperimentsAgentSummary.archiveHighlights.map((item) => `- ARCHIVE :: ${item.title} :: ${item.summary.en}`),
    '',
    'SPECIALTIES:',
    ...specialties.map((specialty) => `- ${specialty}`),
    '',
    'TIMELINE:',
    ...timelineEntries.map((entry) => `- ${entry.year} :: ${entry.title} :: ${entry.role.en} :: ${entry.description.en}`),
    '',
    'CRAWL_HINTS:',
    ...crawlHints.map((hint) => `- ${hint}`),
  ]

  return lines.join('\n')
}