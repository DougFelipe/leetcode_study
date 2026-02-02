# Architecture

**Analysis Date:** 2026-02-01

## Pattern Overview

**Overall:** Three-tier client-side MVC with React Router-based navigation

**Key Characteristics:**
- Stateless file-based data loading (YAML at build time via Vite glob imports)
- Context-based data access layer with hooks for consuming components
- Declarative tab/accordion component composition for UI presentation
- Strict TypeScript with schema validation via interfaces

## Layers

**Presentation Layer (Components):**
- Purpose: Render UI, manage local state, compose views from smaller components
- Location: `src/components/` and `src/pages/`
- Contains: React functional components (Tabs, Accordion, Badge, etc.), page containers
- Depends on: Custom hooks, Context API data hooks, TypeScript types from `src/types/`
- Used by: Pages, other components, and App root

**Data Access Layer (Context + Hooks):**
- Purpose: Provide centralized data fetching and lookups, abstract static YAML loading
- Location: `src/contexts/DataContext.tsx` and `src/utils/dataLoader.ts`
- Contains: React Context provider, custom hooks (useProblem, useSolution, useCode, useData), DataLoader class
- Depends on: YAML parsing (js-yaml), glob-imported data files
- Used by: Pages and components that need problem/solution data

**Routing Layer:**
- Purpose: Handle navigation between pages and URL parameter extraction
- Location: `src/App.tsx`
- Contains: BrowserRouter, Routes, Route definitions
- Depends on: react-router-dom, pages
- Used by: Entry point (App)

**Utilities & Helpers:**
- Purpose: Reusable logic, data transformation, performance utilities
- Location: `src/utils/` and `src/hooks/`
- Contains: DataLoader class, custom React hooks (useDebounce)
- Depends on: Types, libraries
- Used by: Components, pages, context

**Type System:**
- Purpose: Define shared data structures and enums
- Location: `src/types/schema.ts`
- Contains: ProblemV3, SolutionV3, CodeArtifact interfaces; Difficulty, StudyStatus, Language, Paradigm types
- Used by: All layers

## Data Flow

**Initial Load (Page Mount):**

1. `main.tsx` mounts React app into DOM root
2. `App.tsx` initializes BrowserRouter and DataProvider context
3. DataProvider creates DataLoader instance, loads all YAML files via Vite glob imports
4. DataContext stores loaded problems and solutions in DataLoader maps
5. Router matches URL to page (/ → Library, /p/:problemSlug → ProblemDetail)

**Library Page (Problem Browsing):**

1. Library component mounts, calls `dataLoader.getAllProblems()` directly
2. Uses local state for search query and filter params
3. Updates URL search params when filters change
4. useMemo filters problem array by search, difficulty, status
5. Renders ProblemCard for each filtered problem

**Problem Detail Page (Solution Viewing):**

1. ProblemDetail extracts problemSlug from URL params
2. Calls `useProblem(problemSlug)` hook → DataContext → DataLoader.getProblemBySlug()
3. Renders problem metadata, multiple tabs (Overview, Solutions, Compare, Deep Dive, History)
4. User selects solution language via inline buttons
5. Current solution fetched via `useSolution(problemSlug, solutionRef)` hook
6. SolutionPanel composes SolutionHeader, SolutionCode, and InsightCards

**State Management:**

- **Static data:** Loaded once at app start via DataLoader, never mutates
- **URL state:** Routing params (problemSlug) and search params (q, difficulty, status) drive filtering
- **Local component state:** tabs, accordions, solution language selection stored in useState
- **Context state:** DataContext provides read-only access to loaded data via custom hooks

## Key Abstractions

**Problem & Solution:**
- Purpose: Represent LeetCode problems with metadata, solutions in multiple languages, and study tracking
- Examples: `src/types/schema.ts` (ProblemV3, SolutionV3, SolutionIndexEntry)
- Pattern: Strict TypeScript interfaces with nested objects for catalog, study, content, complexity

**DataLoader:**
- Purpose: Singleton that loads and caches YAML/code files at startup, provides query methods
- Examples: `src/utils/dataLoader.ts`
- Pattern: Private maps for problems, solutions, code; public getter methods that search by slug/ref

**Custom Data Hooks:**
- Purpose: Encapsulate data context access, hide DataContext from components
- Examples: `useProblem()`, `useSolution()`, `useCode()` in `src/contexts/DataContext.tsx`
- Pattern: Wrapper hooks around useContext(DataContext) with type-safe returns

**Component Composition:**
- Purpose: Build UI from small, reusable pieces (Badge, Accordion, Tabs)
- Examples: `src/components/Badge.tsx`, `src/components/Accordion.tsx`, `src/components/Tabs.tsx`
- Pattern: Props-based configuration, Tailwind CSS for styling, icon support via lucide-react

**Accordion & AccordionGroup:**
- Purpose: Collapsible sections with optional global expand/collapse controls
- Examples: `src/components/Accordion.tsx`
- Pattern: Context-based forceState for synchronized expand/collapse across multiple Accordion children

## Entry Points

**Application Root:**
- Location: `src/main.tsx`
- Triggers: Page load, hydrates React app at `<div id="root">`
- Responsibilities: Create React root and render App component in StrictMode

**App Component:**
- Location: `src/App.tsx`
- Triggers: React initialization
- Responsibilities: Wrap routes and pages in DataProvider, ErrorBoundary; define route structure

**Library Page:**
- Location: `src/pages/Library.tsx`
- Triggers: Navigation to `/` or direct page load
- Responsibilities: Display all problems, filter by search/difficulty/status, render problem grid

**Problem Detail Page:**
- Location: `src/pages/ProblemDetail.tsx`
- Triggers: Navigation to `/p/:problemSlug`
- Responsibilities: Load problem data, render multi-tab view (overview, solutions, compare, deep dive, history)

## Error Handling

**Strategy:** React Error Boundary wrapper at app root

**Patterns:**
- ErrorBoundary component (`src/components/ErrorBoundary.tsx`) catches render errors in subtree
- DataLoader logs YAML parse errors to console, skips invalid files
- ProblemDetail renders "Problem Not Found" fallback if slug doesn't match any loaded problem
- Hooks throw error if used outside DataProvider context

## Cross-Cutting Concerns

**Logging:** Console.error for YAML parse failures and React errors; component logs managed by DataLoader

**Validation:** TypeScript strict mode enforces type safety; Zod imported but not actively used in current codebase; YAML schema_version check ensures file compatibility

**Authentication:** Not present; app is read-only study tool with no user accounts

**Styling:** Tailwind CSS utility classes; theme colors (slate, blue, green, red, amber, purple, yellow) applied via variant patterns in components like Badge

**Performance:**
- useDebounce hook delays search filter updates to avoid excessive re-renders
- useMemo in Library filters problems array only when dependencies change
- YAML loading occurs at build time via Vite glob imports, not runtime

---

*Architecture analysis: 2026-02-01*
