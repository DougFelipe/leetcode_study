# Technology Stack

**Analysis Date:** 2026-02-01

## Languages

**Primary:**
- TypeScript 5.5.3 - All source code and configuration
- JavaScript - Build and configuration files (Vite, ESLint config)

**Secondary:**
- CSS - Styling via Tailwind CSS
- HTML - Document markup in `index.html`
- YAML - Problem and solution data definitions in `/data/problems/`

## Runtime

**Environment:**
- Node.js (version not specified in project, inferred from npm usage)

**Package Manager:**
- npm (with package-lock.json present)

## Frameworks

**Core:**
- React 18.3.1 - UI library and component framework
- react-router-dom 7.12.0 - Client-side routing
- react-dom 18.3.1 - React DOM rendering

**Build/Dev:**
- Vite 5.4.2 - Build tool and dev server
- @vitejs/plugin-react 4.3.1 - React support for Vite

**Styling:**
- Tailwind CSS 3.4.1 - Utility-first CSS framework
- autoprefixer 10.4.18 - CSS vendor prefix support
- PostCSS 8.4.35 - CSS transformation

**Linting:**
- ESLint 9.9.1 - JavaScript/TypeScript linter
- @eslint/js 9.9.1 - ESLint recommended rules
- typescript-eslint 8.3.0 - TypeScript ESLint support
- eslint-plugin-react-hooks 5.1.0-rc.0 - React hooks linting
- eslint-plugin-react-refresh 0.4.11 - Fast refresh validation

## Key Dependencies

**Critical:**
- zod 4.3.5 - Runtime type validation and schema parsing
- js-yaml 4.1.1 - YAML parsing for problem/solution data loading
- @types/js-yaml 4.0.9 - TypeScript types for js-yaml

**UI Components & Icons:**
- lucide-react 0.344.0 - Icon library and icon components
- react-markdown 10.1.0 - Markdown rendering for problem statements and solutions

**Visualization:**
- mermaid 11.12.2 - Diagram rendering (flowcharts, algorithms, complexity visualization)

**Code Highlighting:**
- shiki 3.21.0 - Syntax highlighting for code blocks

**Data Processing:**
- remark-gfm 4.0.1 - GitHub-flavored Markdown support for react-markdown

**Type Definitions:**
- @types/react 18.3.5 - React type definitions
- @types/react-dom 18.3.0 - React DOM type definitions
- globals 15.9.0 - Global type definitions for ESLint

## Configuration

**Environment:**
- `.env` file present (empty) - prepared for future environment variables
- No environment variables currently required for basic operation
- Vite uses `import.meta.glob` for dynamic file loading (not environment-based)

**Build:**
- `vite.config.ts` - Vite build configuration with React plugin
- `tsconfig.json` - Base TypeScript configuration referencing `tsconfig.app.json` and `tsconfig.node.json`
- `tsconfig.app.json` - Application-specific TypeScript settings (ES2020 target, strict mode enabled)
- `tsconfig.node.json` - Node-specific TypeScript settings for build configuration
- `eslint.config.js` - Flat config format ESLint rules for TS/JS files
- `postcss.config.js` - PostCSS configuration with Tailwind and autoprefixer
- `tailwind.config.js` - Tailwind CSS configuration

## Platform Requirements

**Development:**
- Node.js (version not constrained in package.json)
- npm package manager
- TypeScript 5.5.3 or compatible

**Production:**
- Modern browser with ES2020 support
- Client-side rendering only (no backend runtime required)
- Static hosting compatible (SPA)

## Build Output

- **Input:** `src/` (TypeScript/React) and `/data/` (YAML data files)
- **Output:** `dist/` directory with bundled JavaScript, CSS, and assets
- **Target:** Browser (client-side SPA)
- **Module format:** ESNext

---

*Stack analysis: 2026-02-01*
