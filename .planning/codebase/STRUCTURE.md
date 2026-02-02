# Codebase Structure

**Analysis Date:** 2026-02-01

## Directory Layout

```
project-root/
├── data/                   # Problem and solution definitions in YAML + code files
│   └── problems/           # Organized by problem ID
│       └── lc_XXXX_*/      # Each problem folder
│           ├── problem.yaml
│           ├── solutions/  # Solution metadata YAML files
│           └── code/       # Solution source files (multi-language)
├── src/                    # TypeScript React application source
│   ├── components/         # Reusable UI components
│   │   ├── deepdive/       # Editorial analysis components
│   │   ├── solution/       # Solution display components
│   │   ├── *.tsx           # Shared components (Badge, Accordion, Tabs, etc.)
│   │   └── ErrorBoundary.tsx
│   ├── contexts/           # React Context providers and hooks
│   ├── pages/              # Page-level route components
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility classes and functions
│   ├── hooks/              # Custom React hooks
│   ├── App.tsx             # Root component with routing
│   ├── main.tsx            # React entry point
│   └── index.css           # Global styles (Tailwind)
├── .planning/              # GSD planning documents
├── .github/                # GitHub workflows
├── public/                 # Static assets (favicon, etc.)
├── index.html              # HTML entry point
├── vite.config.ts          # Vite bundler configuration
├── tsconfig.json           # TypeScript root config
├── tsconfig.app.json       # TypeScript app compilation config
├── tsconfig.node.json      # TypeScript Vite config
├── package.json            # Project dependencies and scripts
├── eslint.config.js        # ESLint rules
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS plugins (for Tailwind)
└── .gitignore              # Git exclusions
```

## Directory Purposes

**data/ (Problem Data):**
- Purpose: Centralized repository of problem definitions and solution implementations
- Contains: YAML problem schemas (ProblemV3), solution schemas (SolutionV3), multi-language code implementations
- Key files: `data/problems/lc_XXXX_*/problem.yaml`, `data/problems/lc_XXXX_*/solutions/*.yaml`, `data/problems/lc_XXXX_*/code/*`
- Loaded by: DataLoader at app startup via Vite glob imports

**src/components/ (UI Components):**
- Purpose: Reusable React component library
- Contains: Presentational components (Badge, Accordion, Tabs), composite components (SolutionPanel, ProblemCard), specialized features (MermaidDiagram, MarkdownRenderer)
- Subdirectories:
  - `solution/`: SolutionHeader, SolutionCode, SolutionPanel, ComparePanel, InsightCard
  - `deepdive/`: DeepDiveTab, AlternativeApproachesTable, WhenNotToUsePanel, CommonMistakesList, ComplexityDeepPanel
- Styling: Tailwind CSS applied inline via className props

**src/contexts/ (Data Access):**
- Purpose: Centralized data management and distribution
- Contains: DataContext provider, custom hooks (useProblem, useSolution, useData, useCode)
- Key file: `DataContext.tsx` exports DataProvider and all hooks

**src/pages/ (Route Components):**
- Purpose: Top-level components for each route/page
- Contains: Library.tsx (problem list view), ProblemDetail.tsx (single problem detail view)
- Responsibilities: Orchestrate data fetching, manage page-level state (tabs, filters), compose component hierarchies

**src/types/ (Type Definitions):**
- Purpose: Centralized TypeScript schemas
- Key file: `schema.ts` defines ProblemV3, SolutionV3, SolutionIndexEntry, CodeArtifact, and enums (Difficulty, Language, Paradigm, StudyStatus, SolutionStatus)

**src/utils/ (Utilities):**
- Purpose: Non-React utility classes and functions
- Key file: `dataLoader.ts` exports DataLoader class that loads and caches YAML/code files

**src/hooks/ (Custom Hooks):**
- Purpose: Reusable React logic
- Key file: `useDebounce.ts` implements debounced state for search input

## Key File Locations

**Entry Points:**
- `index.html`: HTML skeleton, loads React root div
- `src/main.tsx`: React DOM mount point, renders App in StrictMode
- `src/App.tsx`: Root component, defines BrowserRouter and Routes

**Configuration:**
- `vite.config.ts`: Vite build config, React plugin, excludes lucide-react from optimization
- `tsconfig.app.json`: TypeScript compiler options (ES2020 target, strict mode, JSX)
- `tailwind.config.js`: Tailwind CSS initialization
- `postcss.config.js`: PostCSS setup for Tailwind
- `eslint.config.js`: ESLint rules
- `package.json`: Dependencies (React, Router, Supabase, js-yaml, lucide-react, etc.)

**Core Logic:**
- `src/types/schema.ts`: Data structure definitions (ProblemV3, SolutionV3)
- `src/utils/dataLoader.ts`: DataLoader class for YAML loading and caching
- `src/contexts/DataContext.tsx`: Data context provider and custom hooks

**UI Components:**
- `src/components/Badge.tsx`: Status and difficulty badges
- `src/components/Accordion.tsx`: Collapsible sections
- `src/components/Tabs.tsx`: Tab navigation
- `src/components/solution/SolutionPanel.tsx`: Main solution display composite
- `src/components/deepdive/DeepDiveTab.tsx`: Editorial analysis tab

**Testing:**
- No test files present (not detected)

## Naming Conventions

**Files:**
- Components: PascalCase, `.tsx` extension (e.g., `Badge.tsx`, `SolutionPanel.tsx`)
- Utilities: camelCase, `.ts` extension (e.g., `dataLoader.ts`, `useDebounce.ts`)
- Pages: PascalCase, `.tsx` extension (e.g., `Library.tsx`, `ProblemDetail.tsx`)
- YAML data: lowercase_with_underscores (e.g., `problem.yaml`, `sol_js_hashmap.yaml`)

**Directories:**
- Component folders: lowercase (e.g., `components/`, `solution/`, `deepdive/`)
- Feature folders: lowercase (e.g., `contexts/`, `utils/`, `hooks/`)
- Problem data: lowercase_with_underscores prefix + slug (e.g., `lc_0001_two_sum/`)

**Variables & Functions:**
- React components: PascalCase
- Functions: camelCase (e.g., `getProblemBySlug()`, `handleSearchChange()`)
- Constants: UPPER_CASE for enums and style maps (e.g., `DIFFICULTY_STYLES`)
- Props interfaces: PascalCase + `Props` suffix (e.g., `SolutionPanelProps`, `BadgeProps`)

**Types:**
- Interface names: PascalCase, describe shape of data (e.g., `ProblemV3`, `DataContextType`, `BadgeProps`)
- Type unions for literals: lowercase, describe concept (e.g., `type Difficulty = 'easy' | 'medium' | 'hard'`)

## Where to Add New Code

**New Feature (e.g., Dark Mode Toggle):**
- Primary code: `src/contexts/` (context provider) or `src/hooks/` (custom hook)
- Components: `src/components/` (UI elements)
- Example: Add DarkModeContext to provide theme state, create useTheme hook, update components to use it

**New Solution/Problem:**
- Data files: `data/problems/lc_XXXX_problem_slug/`
  - Metadata: `problem.yaml` (ProblemV3 schema)
  - Solution metadata: `solutions/sol_LANG_APPROACH.yaml` (SolutionV3 schema)
  - Code files: `code/sol_LANG_APPROACH.EXT` (multi-language implementations)
- No changes to component/type files needed; DataLoader discovers via glob patterns

**New Component:**
- Location: `src/components/FeatureName.tsx` (standalone) or `src/components/category/ComponentName.tsx` (grouped)
- Pattern: Export function component, define TypeScript interface for props, use Tailwind CSS for styles
- Example: Create `src/components/StatisticCard.tsx` that displays a single stat with icon and value

**New Page/Route:**
- Location: `src/pages/PageName.tsx`
- Pattern: Functional component that uses useParams/useSearchParams for URL state, calls custom hooks for data
- Update routing: Add Route in `src/App.tsx`
- Example: Create `src/pages/Dashboard.tsx` for analytics, add route `/dashboard`

**Utilities:**
- Location: `src/utils/` for classes/functions, `src/hooks/` for React hooks only
- Pattern: Export named functions/classes, use TypeScript for type safety
- Example: Create `src/utils/problemFilter.ts` with filtering logic functions

**Error Handling:**
- Global errors: Enhance `src/components/ErrorBoundary.tsx`
- Data-specific errors: Add logging in `src/utils/dataLoader.ts`
- Component errors: Use try/catch in event handlers, set error state, display fallback UI

## Special Directories

**data/ (Problem Data):**
- Purpose: Source of truth for problem definitions
- Generated: No (manually created/imported)
- Committed: Yes (part of codebase)
- Structure: Follows `lc_XXXX_slug/` naming; DataLoader discovers via glob patterns
- Update: Add new problem folders following the same structure; Vite will pick them up automatically

**.planning/ (GSD Documentation):**
- Purpose: Architecture, structure, conventions, concerns documentation for other GSD commands
- Generated: Yes (by GSD mappers)
- Committed: Yes
- Contains: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, CONCERNS.md, etc.

**node_modules/ (Dependencies):**
- Purpose: Installed NPM packages
- Generated: Yes (by npm install)
- Committed: No (.gitignored)
- Lock file: `package-lock.json` (committed)

**.git/ (Version Control):**
- Purpose: Git repository metadata
- Generated: Yes (by git init)
- Committed: N/A (system directory)

**.github/ (CI/CD Workflows):**
- Purpose: GitHub Actions workflows
- Generated: No (configured manually)
- Committed: Yes
- Contains: Workflow YAML files for CI/CD pipelines

---

*Structure analysis: 2026-02-01*
