# Testing Patterns

**Analysis Date:** 2026-02-01

## Test Framework

**Status:** No testing framework currently configured

**Runner:**
- Not configured (Jest, Vitest, or similar not in dependencies)

**Assertion Library:**
- Not detected

**Run Commands:**
- No test scripts in `package.json`
- Only available npm scripts: `dev`, `build`, `lint`, `preview`, `typecheck`

**Type Checking:**
```bash
npm run typecheck           # Run TypeScript compiler without emitting (catches type errors)
npm run lint               # Run ESLint to check code style
```

## Test File Organization

**Current State:** No test files exist in the codebase

**File Search Results:**
- `find src/ -name "*.test.*" -o -name "*.spec.*"` returned no matches
- No test directories (`__tests__`, `tests/`, etc.) in src/

**Recommended Structure (if tests were to be added):**
- Co-located tests: `src/components/__tests__/` or `src/utils/__tests__/`
- Or separate test directory: `tests/unit/`, `tests/integration/`
- File naming convention: `[Component].test.tsx` or `[Component].spec.tsx`

## Test Coverage Gaps

**Critical Untested Areas:**

### Data Loading Logic
- **File:** `src/utils/dataLoader.ts`
- **What's not tested:**
  - YAML file parsing and error handling
  - Slug-based lookups and cache management
  - Path resolution for code files
  - Invalid schema version handling
- **Risk:** Silent failures when loading problems/solutions; incorrect path resolution could break data display
- **Priority:** High

### Type Validation
- **File:** `src/types/validators.ts`
- **What's not tested:**
  - Zod schema validation for all problem/solution properties
  - Safe parsing error handling
  - Edge cases (missing optional fields, malformed data)
- **Risk:** Invalid data could reach components causing runtime errors
- **Priority:** High

### Context/Hook Logic
- **File:** `src/contexts/DataContext.tsx`
- **What's not tested:**
  - Context provider initialization
  - Custom hooks (useData, useProblem, useSolution, useCode)
  - Error throwing when hooks used outside provider
  - Memoization behavior
- **Risk:** Data flow bugs in context-based queries
- **Priority:** Medium

### Component Rendering
- **Files:** `src/components/**/*.tsx`
- **What's not tested:**
  - Component rendering with various props
  - User interactions (click, input, selection)
  - Conditional rendering paths
  - Error states (missing data, null props)
- **Risk:** Visual bugs, broken UI flows, accessibility issues
- **Priority:** Medium

### Error Boundary
- **File:** `src/components/ErrorBoundary.tsx`
- **What's not tested:**
  - Error catching and state management
  - Fallback rendering
  - Retry functionality
- **Risk:** Error boundaries won't work as intended when deployed
- **Priority:** Medium

### Filtering and Search
- **File:** `src/pages/Library.tsx`
- **What's not tested:**
  - Search filtering logic (case-insensitive matching)
  - Difficulty/Status filter combinations
  - Debounce behavior
  - URL parameter synchronization
- **Risk:** Search/filter functionality could have edge case bugs
- **Priority:** Medium

### State Management
- **Files:** `src/pages/ProblemDetail.tsx`, `src/pages/Library.tsx`
- **What's not tested:**
  - useState hook behavior
  - useCallback memoization
  - useMemo dependency tracking
- **Risk:** Re-renders, memory leaks, stale state
- **Priority:** Low

## Recommended Testing Strategy

### Phase 1: Utility/Data Layer (High Priority)
```typescript
// Example test structure for DataLoader
describe('DataLoader', () => {
  describe('loadData', () => {
    it('should load valid YAML files')
    it('should skip files with invalid schema version')
    it('should handle YAML parsing errors gracefully')
  })

  describe('getProblemBySlug', () => {
    it('should return problem for valid slug')
    it('should return undefined for invalid slug')
  })

  describe('getCodeFile', () => {
    it('should resolve code file paths correctly')
    it('should prevent directory traversal attacks')
  })
})
```

### Phase 2: Type Validation
```typescript
// Example test for validators
describe('validators', () => {
  describe('validateProblem', () => {
    it('should validate correct problem structure')
    it('should throw on invalid schema version')
    it('should accept optional fields')
  })

  describe('safeParseProblem', () => {
    it('should return success for valid data')
    it('should return error for invalid data without throwing')
  })
})
```

### Phase 3: Context/Hooks
```typescript
// Example test for DataContext hooks
describe('useData hook', () => {
  it('should throw error when used outside DataProvider')
  it('should return all data context functions')
})

describe('useProblem hook', () => {
  it('should return problem by slug')
  it('should return undefined for non-existent slug')
})
```

### Phase 4: Components
```typescript
// Example test for components
describe('ProblemCard', () => {
  it('should render problem title')
  it('should render difficulty badge')
  it('should link to problem detail page')
})

describe('FilterBar', () => {
  it('should call onSearchChange on input')
  it('should call onDifficultyChange on select change')
})
```

## Suggested Testing Framework Setup

**For React + TypeScript:**
- **Framework:** Vitest (modern, fast, Vite-native) or Jest
- **Testing Library:** React Testing Library for component tests
- **Configuration Example:**
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
  },
})
```

- **Add to package.json:**
```json
{
  "devDependencies": {
    "vitest": "^latest",
    "@vitest/ui": "^latest",
    "@testing-library/react": "^latest",
    "@testing-library/jest-dom": "^latest"
  },
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

## Current Type Safety Mechanisms

**Instead of runtime tests, the project relies on:**

1. **TypeScript Strict Mode:** All code type-checked
   - `strict: true` in tsconfig
   - `noUnusedLocals: true` - catches unused variables
   - `noUnusedParameters: true` - catches unused params
   - `noFallthroughCasesInSwitch: true` - enforces switch completeness

2. **ESLint Rules:** React Hooks rules enforced
   - Dependency array validation
   - Rules of Hooks compliance

3. **Zod Runtime Validation:** Type validation at data boundaries
   - Located in `src/types/validators.ts`
   - Used when parsing YAML problem/solution files

4. **Error Boundary:** Catches render errors
   - Located in `src/components/ErrorBoundary.tsx`
   - Logs errors and provides fallback UI

## Manual Testing Observations

**Code structures suggest manual testing via:**
- Development mode: `npm run dev` with browser inspection
- Type checking: `npm run typecheck` catches type errors
- Linting: `npm run lint` catches style/rule violations
- Build validation: `npm run build` ensures no runtime errors in production build

---

*Testing analysis: 2026-02-01*
