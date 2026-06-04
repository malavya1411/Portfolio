# Malavya Mankar — Portfolio

Full Stack Developer & AI Engineer

React Developer, Node.js Developer & Software Engineer — I design and ship practical web applications, developer tools, and applied AI systems with clean architecture and product-focused execution.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, TypeScript
- **Styling:** Tailwind CSS v4 with CSS custom property design tokens
- **Animation:** Framer Motion
- **Icons:** Lucide React + inline SVGs for brand icons
- **Deploy:** Vercel-ready

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/                    # Next.js App Router
  layout.tsx            # Root layout with fonts, metadata, theme
  page.tsx              # Single-page portfolio
  globals.css           # Design tokens + theme system
components/
  layout/               # Navbar, Footer, ThemeToggle
  sections/             # Hero, About, Skills, Projects, Achievements, Contact
  ui/                   # Reusable primitives (Button, Tag, Cards, etc.)
lib/
  data.ts               # All portfolio content with typed interfaces
  utils.ts              # Utility functions
  constants.ts          # Site-wide constants
```

## Features

- 🌗 Dark/light theme with system preference detection
- 🎨 CSS custom property design system
- ✨ Smooth Framer Motion animations
- 📱 Fully responsive (mobile → wide)
- ♿ Accessible (semantic HTML, ARIA, keyboard nav, reduced motion)
- 🔍 SEO optimized with Open Graph metadata
- 🚀 Static generation for performance

## Customization

All content lives in `lib/data.ts` — update your info, projects, and links there. Theme colors are defined as CSS custom properties in `app/globals.css`.

## Deploy

```bash
npm run build
```

Deploy to [Vercel](https://vercel.com) — zero config needed.
