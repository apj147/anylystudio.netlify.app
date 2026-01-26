# Anyly Studio Portfolio

Single-page static website for custom artwork commissions.

## Features

- **Responsive Design** — Mobile hamburger menu, fluid layouts, reduced-motion support
- **Portfolio Gallery** — 9-item grid with lightbox viewer and hover captions
- **Netlify Forms** — Contact form with honeypot bot protection and success messaging
- **SEO Optimized** — Meta tags, Open Graph, Twitter Cards, canonical URL, favicon

## Tech Stack

- HTML5 / CSS3 (CSS Grid, Flexbox, CSS Variables)
- Vanilla JavaScript (no dependencies)
- Google Fonts (Cormorant Garamond, Montserrat)
- Netlify hosting + forms

## Structured Summaries

Self-documenting analysis generated via AST-based tool:

- [project-overview.xml](summaries/project-overview.xml) — Stack, architecture, design system
- [index-html.xml](summaries/index-html.xml) — Full HTML breakdown
- [css-design-system.xml](summaries/css-design-system.xml) — Colors, fonts, breakpoints
- [html-sections.xml](summaries/html-sections.xml) — Section mapping
- [javascript.xml](summaries/javascript.xml) — Scripts
- [github-actions.xml](summaries/github-actions.xml) — CI/CD

## Local Development

```bash
cd anyly-studio-netlify
python -m http.server 8000
# Visit http://localhost:8000
```

## Deployment

Automatically deploys to Netlify on push to `main` branch.
