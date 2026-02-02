# Coding Conventions

**Analysis Date:** 2026-02-01

## Naming Patterns

**Files:**
- Components: PascalCase with `.tsx` extension (e.g., `ErrorBoundary.tsx`, `ProblemCard.tsx`)
- Utilities: camelCase with `.ts` extension (e.g., `dataLoader.ts`, `useDebounce.ts`)
- Hooks: Prefixed with `use`, camelCase (e.g., `useData`, `useDebounce`, `useProblem`, `useSolution`, `useCode`)
- Type/Schema files: PascalCase (e.g., `schema.ts`, `validators.ts`)
- Context files: PascalCase (e.g., `DataContext.tsx`)
- Page components: PascalCase in `src/pages/` directory (e.g., `Library.tsx`, `ProblemDetail.tsx`)

**Functions:**
- camelCase for all functions: `getAllProblems()`, `getProblemBySlug()`, `getSolutionForProblem()`, `handleSearchChange()`
- Handler functions prefixed with `handle`: `handleRetry()`, `handleCopy()`, `handleDownload()`
- Private methods prefixed with underscore: `_loadData()` (though this project uses class methods without underscore, preferring public methods)
- Custom hooks always start with `use`: `useDebounce()`, `useData()`, `useProblem()`

**Variables:**
- camelCase for local variables and state: `searchQuery`, `debouncedQuery`, `filteredProblems`, `hasError`
- Constant configuration objects: camelCase or SCREAMING_SNAKE_CASE for records. Example: `DIFFICULTY_STYLES` (uppercase for static config objects)
- Boolean variables often prefixed with `is` or `has`: `isOpen`, `hasError`, `showControls`, `isBlock`

**Types:**
- PascalCase for all TypeScript types and interfaces: `ProblemV3`, `SolutionV3`, `DataContextType`, `BadgeProps`
- Props interfaces suffixed with `Props`: `ErrorBoundaryProps`, `ProblemCardProps`, `SolutionPanelProps`
- Union types for variants: `variant?: 'default' | 'difficulty' | 'status' | 'tag'`

## Code Style

**Formatting:**
- No explicit Prettier config found; formatting appears to follow ESLint defaults
- Indentation: 2 spaces
- String quotes: Single quotes for JavaScript/TypeScript strings, double quotes for JSX attributes
- Line length: Code appears to follow ~100-120 character limit

**Linting:**
- ESLint with TypeScript support (`typescript-eslint`)
- Plugins: `react-hooks`, `react-refresh`
- React Hooks rules enforced (dependency arrays, Rules of Hooks)
- Strict TypeScript checks enabled: `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`
- JSX: `react-jsx` (automatic JSX transform, no React import needed)

**Key ESLint Rules** (from `eslint.config.js`):
```javascript
'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
```
Only export components as default or use constant exports in React Refresh context.

## Import Organization

**Order:**
1. React and library imports (React, hooks, external packages)
2. Local absolute imports (from `../` paths)
3. Type imports (using `import type` where applicable)

**Pattern Example:**
```typescript
import { useState, ReactNode, createContext, useContext } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ProblemV3, SolutionV3 } from '../types/schema';
import { DataLoader } from '../utils/dataLoader';
```

**Path Aliases:**
- No path aliases configured; all imports use relative paths from project root
- Standard relative imports: `../components/`, `../types/`, `../utils/`, `../contexts/`

## Error Handling

**Patterns:**
- Try/catch for data loading operations in `DataLoader.loadData()` method
- Console error logging for caught exceptions: `console.error('Error loading problem ${path}:', error)`
- Component-level error boundary using class component `ErrorBoundary` with `getDerivedStateFromError()` and `componentDidCatch()`
- Validation errors using Zod: `validateProblem()`, `validateSolution()`, `safeParseProblem()`, `safeParseSolution()`
- Defensive null checks: `if (!ctx) throw new Error('...')`
- Optional chaining and nullish coalescing: `problem?.content.editorial?.algorithm_blueprint`, `error?.message || 'default'`

## Logging

**Framework:** Console only (no external logging library)

**Patterns:**
- Development logging: `console.error()` for error cases
- Located in: `DataLoader.loadData()` (during file parsing), `ErrorBoundary.componentDidCatch()` (on error boundaries)
- No production logging infrastructure detected

## Comments

**When to Comment:**
- JSDoc-style comments for custom hooks explaining purpose and parameters
- Inline comments for non-obvious logic (e.g., state management in `Accordion` component explaining forceState precedence)
- Section separators using comments: `// Context para controle global dos accordions`
- HTML comments in JSX for section organization: `{/* Header: Título + Badges */}`

**JSDoc/TSDoc:**
```typescript
/**
 * Hook para debounce de valores.
 * Útil para evitar chamadas excessivas durante digitação.
 *
 * @param value - Valor a ser debounced
 * @param delay - Delay em milissegundos
 * @returns Valor após o delay
 */
export function useDebounce<T>(value: T, delay: number): T
```

Language: Portuguese comments are used throughout (e.g., "Útil para evitar chamadas excessivas")

## Function Design

**Size:** Functions generally 10-50 lines; no excessive long functions observed

**Parameters:**
- Props passed as single destructured object in React components: `{ problem }: ProblemCardProps`
- Callback handlers use arrow functions: `const handleRetry = () => { ... }`
- Configuration objects for static data: `const DIFFICULTY_STYLES: Record<Difficulty, string> = { ... }`

**Return Values:**
- Components return JSX.Element explicitly (via React function component return type)
- Utility functions return typed values: `getAllProblems(): ProblemV3[]`, `getProblemBySlug(slug: string): ProblemV3 | undefined`
- Hooks return typed values with generics where appropriate: `useDebounce<T>(value: T, delay: number): T`
- Optional returns use undefined: `ProblemV3 | undefined` rather than null

## Module Design

**Exports:**
- Named exports for most functions: `export function DataProvider() { ... }`
- Default export for App component: `export default App`
- Component modules export single component as named export: `export function ProblemCard() { ... }`
- Context exports both provider and custom hooks: `export function DataProvider()`, `export function useData()`, `export function useProblem()`

**Barrel Files:**
- Used for component groups: `src/components/solution/index.ts` and `src/components/deepdive/index.ts` export multiple components
- Example from `src/components/solution/index.ts`:
```typescript
export { SolutionPanel, ComparePanel } from './SolutionPanel';
export { SolutionHeader } from './SolutionHeader';
// ... other exports
```
Simplifies imports: `import { SolutionPanel } from '../components/solution'` instead of full path

## React Patterns

**Functional Components:**
- All React components are functional components (no class components except ErrorBoundary)
- Hooks-based state management using `useState`, `useContext`, `useMemo`, `useCallback`, `useEffect`

**Props Typing:**
- Props interfaces defined above component function
- Destructuring in function signature: `export function Badge({ children, variant = 'default', ... }: BadgeProps)`
- Default values directly in destructuring: `variant = 'default'`, `size = 'md'`

**State Management:**
- Local state with `useState()` for UI state (activeTab, activeSolutionIndex, isOpen)
- Context for app-level data sharing: `DataContext` provides problems and query methods
- Custom hooks for data access: `useData()`, `useProblem()`, `useSolution()`
- No external state management (Redux, Zustand, etc.)

**Conditional Rendering:**
- Ternary operators for simple branches
- Short-circuit evaluation with `&&` for single-branch conditions
- Falsy value checks: `if (!problem)` before rendering

## Styling

**Framework:** Tailwind CSS with full config

**Patterns:**
- Utility-first CSS classes applied directly to elements: `className="min-h-screen bg-slate-50"`
- Responsive design with Tailwind breakpoints: `sm:`, `md:`, `lg:` prefixes
- Color palette: slate-* for neutral, blue-* for primary, green-*/red-*/amber-* for semantic colors
- Spacing conventions: consistent gap sizes (`gap-2`, `gap-3`, `gap-4`), padding (`p-3`, `p-4`)
- Hover/transition states: `hover:bg-blue-700 transition-colors`
- Conditional classes using template literals: `className={`${sizeClasses} font-medium rounded-full ${colorClasses}`}`

## Data Validation

**Pattern:** Zod schemas for runtime type validation

**Location:** `src/types/validators.ts`

**Usage:**
```typescript
export function validateProblem(data: unknown): ValidatedProblem {
    return ProblemSchema.parse(data);
}

export function safeParseProblem(data: unknown) {
    return ProblemSchema.safeParse(data);
}
```

Type-safe parsing: throwing version for strict validation, safe version for error handling

---

*Convention analysis: 2026-02-01*
