# External Integrations

**Analysis Date:** 2026-02-01

## APIs & External Services

**Not Detected:**
- No external API integrations currently implemented
- No SDK usage for third-party services
- Supabase package (`@supabase/supabase-js` 2.57.4) is listed in dependencies but not actively used in codebase

## Data Storage

**Databases:**
- Not applicable - application uses local YAML data files only
- No database connection configured
- No ORM or database client in use

**File Storage:**
- Local filesystem only
- Problem and solution data loaded from `/data/problems/` directory at build time
- Data files included in application bundle via Vite's `import.meta.glob`

**Caching:**
- No caching service
- In-memory caching via React Context (`DataContext`) in `src/contexts/DataContext.tsx`
- Data loaded once on application startup via `DataLoader` class in `src/utils/dataLoader.ts`

## Authentication & Identity

**Auth Provider:**
- Not applicable - application is unauthenticated
- No user accounts or login required
- No authentication middleware implemented

## Monitoring & Observability

**Error Tracking:**
- Not configured - no error tracking service integrated
- Basic error boundaries implemented in `src/components/ErrorBoundary.tsx`
- Console logging for development debugging only

**Logs:**
- Console logging only (development-oriented)
- No log aggregation service
- Error logging uses `console.error()` in data loading pipeline

## CI/CD & Deployment

**Hosting:**
- Not specified in project configuration
- Application is a static SPA - compatible with any static hosting (GitHub Pages, Vercel, Netlify, etc.)
- No deployment configuration files present

**CI Pipeline:**
- No CI/CD pipeline configured
- No GitHub Actions workflows in `.github/` directory for automated deployment

## Environment Configuration

**Required env vars:**
- None - application functions without any environment variables
- `.env` file present but empty
- All configuration is hardcoded or derived from source code

**Secrets location:**
- Not applicable - no secrets management needed currently

## Webhooks & Callbacks

**Incoming:**
- Not applicable - application is client-side only

**Outgoing:**
- Not applicable - no external API calls made

## Data Sources

**Static Data:**
- All problem and solution data sourced from YAML files in `/data/problems/`
- Data structure defined by `ProblemV3` and `SolutionV3` interfaces in `src/types/schema.ts`
- Code artifacts stored as separate files (`.java`, `.js`, `.kotlin`, `.rust`, `.scala`) referenced by solutions

**Data Loading:**
- Vite glob patterns load all files at build time: eager import mode
- Files loaded: `problem.yaml`, `solutions/*.yaml`, and `code/*` files
- YAML parsed via `js-yaml` library in `DataLoader` class

## Browser APIs

**Used:**
- DOM APIs via React-DOM
- Browser routing via History API (react-router-dom)
- Canvas rendering for Mermaid diagrams

---

*Integration audit: 2026-02-01*
