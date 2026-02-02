# Codebase Concerns

**Analysis Date:** 2026-02-01

## Security Issues

**XSS Risk via Mermaid Rendering:**
- Issue: SVG output from Mermaid is rendered directly via `dangerouslySetInnerHTML`
- Files: `src/components/MermaidDiagram.tsx` (line 99)
- Risk: Malicious Mermaid code could inject scripts if validation fails
- Current mitigation: Mermaid initialized with `securityLevel: 'strict'` and `startOnLoad: false`
- Recommendations:
  - Consider sanitizing SVG output before rendering
  - Add Content Security Policy headers
  - Validate Mermaid syntax before render attempt
  - Monitor for Mermaid library security updates

**XSS Risk via Syntax Highlighting:**
- Issue: HTML from Shiki syntax highlighting rendered via `dangerouslySetInnerHTML`
- Files: `src/components/CodeViewer.tsx` (line 119)
- Risk: If code contains malicious HTML patterns, could be executed
- Current mitigation: Shiki is a trusted library with built-in escaping
- Recommendations:
  - Document assumption that Shiki output is always safe
  - Add additional HTML sanitization as defense-in-depth if rendering untrusted code

**Path Traversal Potential:**
- Issue: Code file paths filtered but not fully validated
- Files: `src/utils/dataLoader.ts` (lines 93-95)
- Risk: `relativePath.split('/')` and filter approach could be bypassed
- Current code: `const cleanPath = parts.filter(p => p !== '..').join('/')`
- Problem: Only removes `..` literals but doesn't validate absolute path resolution
- Recommendations:
  - Use `path.normalize()` or equivalent to resolve relative paths
  - Validate resolved path is within expected data directory
  - Add unit tests for path traversal attempts

**Markdown Rendering Security:**
- Issue: User-controlled markdown rendered with `react-markdown`
- Files: `src/components/MarkdownRenderer.tsx`
- Risk: If problem data contains malicious markdown, could execute scripts
- Current mitigation: Using remark-gfm plugin which handles GFM safely
- Recommendations:
  - Add HTML sanitization middleware (e.g., `rehype-sanitize`)
  - Restrict allowed HTML tags/attributes in markdown
  - Validate problem YAML content at load time with Zod (already done)

## Tech Debt

**No Error Handling Layer:**
- Issue: Errors logged to console but not tracked or reported
- Files: `src/utils/dataLoader.ts` (multiple console.error calls), `src/components/MermaidDiagram.tsx`, `src/components/ErrorBoundary.tsx`
- Impact:
  - Silent failures in data loading (problems/solutions skip on error)
  - Users unaware data failed to load
  - No visibility into production issues
- Fix approach:
  - Implement error tracking service (Sentry, LogRocket, etc.)
  - Create error boundary with user-facing error states for failed data loads
  - Add retry mechanism for transient failures

**Unused Dependencies:**
- Issue: `@supabase/supabase-js` imported but never used
- Files: `package.json` (line 14)
- Impact: Adds 30+KB to bundle unnecessarily
- Fix approach: Remove from package.json and dependencies if not planned soon

**Type Safety Gap:**
- Issue: Type assertion with `as any` bypasses type checking
- Files: `src/pages/ProblemDetail.tsx` (line 183)
- Impact: Could silently introduce bugs when ComparePanel solution types change
- Code: `.filter(Boolean) as any` casts filtered solutions array
- Fix approach:
  - Remove `as any` cast
  - Use proper type guard: `solution?.language && solution?.complexity ? solution : undefined`
  - Or use type-safe filter: `.filter((s): s is SolutionV3 => s !== undefined)`

**Hardcoded Language Configurations:**
- Issue: Language display configs scattered across components
- Files:
  - `src/components/CodeViewer.tsx` (lines 7-16: LANGUAGE_CONFIG)
  - `src/pages/ProblemDetail.tsx` (line 164: inline charAt logic)
  - `src/components/solution/ComparePanel.tsx` (line 142: inline charAt logic)
- Impact: Duplicate language formatting logic, difficult to maintain
- Fix approach:
  - Create `src/utils/languageConfig.ts` with centralized config
  - Export functions like `getLanguageLabel()`, `getLanguageColor()`
  - Import and use consistently across all components

## Performance Bottlenecks

**Mermaid Rendering Performance:**
- Issue: Async rendering blocks diagram display until completion
- Files: `src/components/MermaidDiagram.tsx` (lines 25-43)
- Current behavior: SVG renders after async operation completes, shows nothing until ready
- Potential improvement:
  - Add loading skeleton while rendering
  - Cache rendered diagrams to avoid re-renders
  - Consider debouncing if code prop changes frequently

**Data Loading at App Start:**
- Issue: All problems and solutions loaded synchronously on DataProvider mount
- Files: `src/contexts/DataContext.tsx` (line 15), `src/utils/dataLoader.ts` (line 33)
- Impact:
  - Single large DataLoader instance loads all YAML files at startup
  - No lazy loading or pagination
  - Could become slow as problem count grows (currently 1+ problem/solution pairs)
- Current data load pattern:
  - `import.meta.glob()` with `eager: true` loads all files eagerly
  - DataLoader iterates and parses in constructor
  - No way to load problems on-demand
- Fix approach:
  - Implement lazy loading for problems (load on route change)
  - Consider virtual scrolling for library view
  - Split code artifacts loading from metadata loading
  - Profile with DevTools to measure baseline

**Context Value Recreation:**
- Issue: DataProvider context value recreated on every parent render
- Files: `src/contexts/DataContext.tsx` (lines 17-22)
- Current code: Value object created in useMemo but depends on `loader` which is stable
- Note: Already optimized with useMemo, but verify no unnecessary re-renders

**CodeViewer Syntax Highlighting Performance:**
- Issue: Shiki highlights code asynchronously on every render
- Files: `src/components/CodeViewer.tsx` (lines 38-46)
- Impact: Each code view waits for highlighting, shows skeleton loader
- Potential improvement:
  - Cache highlighted HTML by language+code hash
  - Pre-highlight common algorithms on build time
  - Lazy-load syntax themes

## Testing Gaps

**No Test Coverage:**
- Issue: Zero automated tests in codebase
- Files: Entire `src/` directory
- What's not tested:
  - Data loading and validation (YAML parsing, schema validation)
  - Filter logic in Library view (search, difficulty, status)
  - Problem detail page rendering with missing/partial data
  - Solution comparison logic
  - Error boundary behavior
  - Path traversal protection in dataLoader
- Risk: High - refactoring or bug fixes could break features silently
- Priority: **High** - Data loading and validation should be tested first

**Missing Integration Tests:**
- Issue: No tests for data flow from YAML to UI
- Risk: Schema changes could break without obvious error
- Priority: **Medium** - Add after unit tests

## Fragile Areas

**Data Loading Error Recovery:**
- Files: `src/utils/dataLoader.ts` (lines 36-66)
- Why fragile:
  - YAML parsing failures silently skip problems (line 46)
  - No way to diagnose which files failed
  - Solutions orphaned if problem fails to load (lines 50-61)
  - If solution references a failed problem, silently returns undefined
- Safe modification: Add logging/metrics before changing, add tests for error cases

**ProblemDetail Statement Parsing:**
- Files: `src/pages/ProblemDetail.tsx` (lines 41-43)
- Why fragile:
  - Splits statement on regex `\*\*Example \d+` expecting exact format
  - No validation that split produced expected parts
  - If statement format changes, examples silently disappear
  - No fallback for malformed statements
- Safe modification: Add unit test, validate statement structure with schema

**Accordion State Management:**
- Files: `src/components/Accordion.tsx` (lines 4-44)
- Why fragile:
  - Complex state precedence: forceState > controlledIsOpen > internalIsOpen
  - AccordionGroup context clears forceState but Accordion handler also clears it
  - Potential race condition if multiple accordions toggle simultaneously
  - Manual state cleanup in handleToggle (line 49) could leave context in bad state
- Safe modification: Add integration tests for AccordionGroup + Accordion interactions

**ErrorBoundary State Handling:**
- Files: `src/components/ErrorBoundary.tsx` (lines 28-30)
- Why fragile:
  - Retry button resets state but doesn't reset error condition
  - If error is deterministic (e.g., missing data), retry will fail again silently
  - No indication whether data was actually recovered
  - Portuguese error messages hardcoded (lines 45, 48, 55)
- Safe modification: Add error recovery validation, support i18n

## Missing Critical Features

**No Offline Support:**
- Issue: Application requires all data loaded at startup
- Impact: No graceful degradation if network fails or data missing
- Blocker: Can't continue studying if data partially loaded
- Recommendation: Implement IndexedDB caching with fallback

**No Data Persistence:**
- Issue: Study progress (status, priority, confidence, mistakes) only in memory
- Impact: All study tracking lost on page reload
- Blocker: Can't reliably track learning progress
- Note: `study` field in problem schema supports persistence but not implemented

**No Update Mechanism:**
- Issue: Problems/solutions fixed at build time
- Impact: Can't add new problems or update solutions without rebuild
- Blocker: Limits scalability as problem count grows
- Recommendation: Separate data loading (fetch from CDN/API) from build artifacts

**Limited Problem Metadata:**
- Issue: No tags, categories, or custom organization beyond topics/patterns
- Impact: Hard to organize study sessions by learning objective
- Blocker: Scalability issue as problem count grows

## Scaling Limits

**Data Structure Growth:**
- Current: Single DataLoader instance holds all problems and solutions in memory
- Limit: ~100+ problems becomes noticeably slow
- Scaling path:
  - Implement pagination in Library view (load 20 problems at a time)
  - Lazy-load solution content on demand
  - Use virtual scrolling for problem list

**Build Time:**
- Current: Glob all YAML files eagerly
- Limit: 500+ problems could make build slow
- Scaling path:
  - Lazy-load problems from JSON instead of YAML at runtime
  - Generate problem index at build time, load data on demand

## Dependencies at Risk

**Mermaid Library - Large Bundle Impact:**
- Package: `mermaid@^11.12.2` (located in package.json, line 18)
- Risk: Large library (~500KB gzipped) for diagram rendering
- Impact: Increases initial bundle size significantly
- Current usage: Only for algorithm blueprint diagrams
- Migration options:
  - Use SVG directly if diagrams are static
  - Lazy-load mermaid only when deep dive tab accessed
  - Consider simpler alternative (D3, Vis.js) for common diagram types

**React Markdown Processing:**
- Package: `react-markdown@^10.1.0` (located in package.json, line 21)
- Risk: Renders untrusted markdown content (problem statements)
- Impact: XSS vulnerability if markdown contains malicious HTML
- Mitigation: Add `rehype-sanitize` plugin
- Files affected: `src/components/MarkdownRenderer.tsx`

**Outdated React Hooks Plugin:**
- Package: `eslint-plugin-react-hooks@^5.1.0-rc.0` (package.json, line 34)
- Risk: Using release candidate instead of stable version
- Impact: May receive breaking changes in minor updates
- Recommendation: Upgrade to stable version when available

## Internationalization Debt

**Hardcoded Portuguese UI Strings:**
- Files: `src/components/ErrorBoundary.tsx` (lines 45, 48, 55)
- Error messages: "Algo deu errado", "Ocorreu um erro inesperado", "Tentar novamente"
- Impact: Application UI not in English, difficult to add multiple languages
- Scale: If more UI strings added in Portuguese, i18n becomes harder to retrofit
- Fix approach: Extract strings to i18n config, use library like react-i18next

---

*Concerns audit: 2026-02-01*
