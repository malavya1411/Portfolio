# System Architecture Documentation

This document explains the organization, configuration, and design systems of the **Portfolio** codebase.

---

## 1. Directory Structure

The project follows a standard Next.js App Router structure under the `src/` directory:

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router (pages, layouts, routes)
│   │   ├── (home)/
│   │   │   └── page.tsx        # Main landing page
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Dynamic project detail page (generates statically)
│   │   ├── layout.tsx          # Root HTML layout with fonts & ThemeProvider
│   │   └── globals.css         # Global stylesheet & Tailwind tokens
│   │
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # Core primitive components (Button, Card, LimelightNav)
│   │   ├── sections/           # Large page block sections (Hero, About, Contact)
│   │   └── layout/             # Structure-related elements (Navbar, Footer, ThemeToggle)
│   │
│   ├── lib/                    # Data sources, constants, and utilities
│   │   ├── data.ts             # Projects, achievements, skills data source
│   │   └── constants.ts        # Animation speeds & easing definitions
│   │
│   └── types/                  # Global TypeScript type definitions
│       └── index.ts
│
├── public/                     # Static assets (images, favicon)
├── docs/                       # Architecture and Setup documentation
├── package.json
└── tsconfig.json
```

---

## 2. Design System & Tokens

Styling is handled by **Tailwind CSS v4** combined with custom CSS Variables located in `src/app/globals.css`.

### Theme Variables

Colors adjust automatically between light and dark modes:

- **Background (`--bg`)**: `#F7F8FA` (Light) / `#080D12` (Dark)
- **Surface (`--surface`)**: `#FFFFFF` (Light) / `#0E1620` (Dark)
- **Elevated (`--elevated`)**: `#F0F2F5` (Light) / `#141F2C` (Dark)
- **Accent (`--accent`)**: `#0E9F8C` (Light) / `#20BFAF` (Dark) (Greenish Teal)
- **Primary (`--primary`)**: Maps directly to `--accent` as a fallback.
- **Border (`--border`)**: Low-contrast borders for layouts.

### Typography
- **Sans-serif Font**: `Inter` (via Google Fonts in Next.js).
- **Monospace Font**: `JetBrains Mono` (for data lists, code snippets, and cards).

---

## 3. Core Components & Logic

### Limelight Navigation
- **Location:** `src/components/ui/limelight-nav.tsx`
- **Purpose:** A floating interactive top navigation bar featuring a dynamic clip-path beam that moves to highlight the active section.
- **Scroll Spy Sync:** The navigation index updates dynamically in real-time as the user scrolls, controlled by an `IntersectionObserver` observing section bounds inside `src/components/layout/Navbar.tsx`.

### Dynamic Project Routing
- **Location:** `src/app/projects/[slug]/page.tsx`
- **Mechanism:** Leverages `generateStaticParams` to statically pre-render dedicated detail pages for all projects registered in `src/lib/data.ts` at build time.
