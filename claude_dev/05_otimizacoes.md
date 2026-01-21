# ⚡ Propostas de Otimização

Este documento consolida todas as otimizações identificadas, priorizadas por impacto e esforço.

---

## 📊 Matriz de Priorização

```
                    IMPACTO
          Alto │ 🔴 FAZER AGORA  │ 🟠 PLANEJAR
               │                 │            
               │ Markdown Fix    │ Context API
               │ Loading States  │ Validação Zod
               ├─────────────────┼────────────────
          Baixo│ 🟡 QUICK WINS   │ 🟢 BACKLOG
               │                 │            
               │ Badge refactor  │ PWA/Offline
               │ Debounce filter │ SSR
               └─────────────────┴────────────────
                    Baixo            Alto
                         ESFORÇO
```

---

## 🔴 PRIORIDADE CRÍTICA

### OPT-001: Correção do MarkdownRenderer /CONSIDERACAO DO DEV: APROVADA/

**Problema:** Código inline renderizado como bloco
**Impacto:** Alto - UI quebrada
**Esforço:** Baixo (1-2h)

#### Arquivo: `src/components/MarkdownRenderer.tsx`

```typescript
// DE (código atual)
code: ({ inline, children }) =>
  inline ? (
    <code className="bg-slate-100 ...">...</code>
  ) : (
    <code className="block bg-slate-50 ...">...</code>
  ),

// PARA (código corrigido)
code: ({ node, className, children, ...props }) => {
  // Detectar se é bloco baseado no className (language-xxx)
  const match = /language-(\w+)/.exec(className || '');
  const isBlock = Boolean(match);
  
  if (isBlock) {
    return (
      <code
        className={`block bg-slate-900 text-slate-100 p-4 rounded-lg 
                   text-sm font-mono overflow-x-auto ${className}`}
        {...props}
      >
        {children}
      </code>
    );
  }
  
  return (
    <code
      className="bg-slate-100 text-slate-800 px-1.5 py-0.5 
                 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  );
},
```

#### Teste de Validação:
1. Navegar para `/p/lc_0001_two_sum`
2. Verificar se `` `nums` `` e `` `target` `` estão inline

---

### OPT-002: Estados de Loading /CONSIDERACAO DO DEV: APROVADA/

**Problema:** Sem feedback visual durante carregamento
**Impacto:** Alto - UX ruim
**Esforço:** Baixo (2-3h)

#### Criar: `src/components/Skeleton.tsx`

```typescript
interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div 
      className={`animate-pulse bg-slate-200 rounded ${className}`}
    />
  );
}

export function ProblemCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <div className="flex justify-between mb-3">
        <Skeleton className="h-6 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
      <div className="flex gap-2 mb-3">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

export function CodeViewerSkeleton() {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
```

#### Atualizar: `src/components/CodeViewer.tsx`

```typescript
import { CodeViewerSkeleton } from './Skeleton';

export function CodeViewer({ code, language, showLineNumbers = true }) {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    codeToHtml(code, { lang: language, theme: 'github-light' })
      .then(setHtml)
      .finally(() => setLoading(false));
  }, [code, language]);

  if (loading) return <CodeViewerSkeleton />;
  // ...resto do código
}
```

---

## 🟠 PRIORIDADE ALTA

### OPT-003: Context API para Dados /CONSIDERACAO DO DEV: APROVADA/

**Problema:** DataLoader como singleton é difícil de testar
**Impacto:** Médio - Manutenibilidade
**Esforço:** Médio (4-6h)

#### Criar: `src/contexts/DataContext.tsx`

```typescript
import { createContext, useContext, ReactNode, useMemo } from 'react';
import { ProblemV3, SolutionV3 } from '../types/schema';
import { DataLoader } from '../utils/dataLoader';

interface DataContextType {
  problems: ProblemV3[];
  getProblemBySlug: (slug: string) => ProblemV3 | undefined;
  getSolutionForProblem: (slug: string, ref: string) => SolutionV3 | undefined;
  getCodeFile: (slug: string, path: string) => string | undefined;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const loader = useMemo(() => new DataLoader(), []);
  
  const value: DataContextType = useMemo(() => ({
    problems: loader.getAllProblems(),
    getProblemBySlug: (slug) => loader.getProblemBySlug(slug),
    getSolutionForProblem: (slug, ref) => loader.getSolutionForProblem(slug, ref),
    getCodeFile: (slug, path) => loader.getCodeFile(slug, path),
  }), [loader]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error('useData must be used within a DataProvider');
  }
  return ctx;
}
```

#### Atualizar: `src/App.tsx`

```typescript
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/p/:problemSlug" element={<ProblemDetail />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}
```

---

### OPT-004: Validação com Zod /CONSIDERACAO DO DEV: APROVADA/

**Problema:** Dados YAML não validados em runtime
**Impacto:** Médio - Robustez
**Esforço:** Médio (3-4h)

#### Instalar:
```bash
npm install zod
```

#### Criar: `src/types/validators.ts`

```typescript
import { z } from 'zod';

export const DifficultySchema = z.enum(['easy', 'medium', 'hard']);
export const StudyStatusSchema = z.enum(['todo', 'solving', 'solved', 'revisiting']);
export const LanguageSchema = z.enum(['go', 'python', 'java', 'kotlin', 'javascript', 'scala', 'rust']);

export const ProblemSchema = z.object({
  schema_version: z.literal(3),
  problem_id: z.string(),
  slug: z.string(),
  title: z.string(),
  source: z.object({
    platform: z.string(),
    id: z.number(),
    slug: z.string(),
    url: z.string().url(),
  }),
  catalog: z.object({
    difficulty: DifficultySchema,
    topics: z.array(z.string()),
    patterns: z.array(z.string()),
    companies: z.array(z.string()).optional(),
  }),
  // ... restante do schema
});

export function validateProblem(data: unknown): ProblemV3 {
  return ProblemSchema.parse(data);
}
```

---

### OPT-005: Refatorar SolutionPanel /CONSIDERACAO DO DEV: APROVADA/

**Problema:** Componente com 142 linhas e múltiplas responsabilidades
**Impacto:** Médio - Manutenibilidade
**Esforço:** Médio (3-4h)

#### Nova Estrutura:

```
components/
├── solution/
│   ├── index.ts
│   ├── SolutionPanel.tsx      # Container (50 linhas)
│   ├── SolutionHeader.tsx     # Header com badges (30 linhas)
│   ├── SolutionContent.tsx    # Rationale + Walkthrough (40 linhas)
│   ├── SolutionCode.tsx       # Code artifacts (40 linhas)
│   └── InsightCard.tsx        # Card reutilizável (25 linhas)
```

---

## 🟡 QUICK WINS

### OPT-006: Badge com Mapeamento /CONSIDERACAO DO DEV: APROVADA/

**Esforço:** 15min

```typescript
// DE
switch (difficulty) {
  case 'easy': className += 'bg-green-100 text-green-800'; break;
  case 'medium': className += 'bg-amber-100 text-amber-800'; break;
  case 'hard': className += 'bg-red-100 text-red-800'; break;
}

// PARA
const DIFFICULTY_STYLES = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-amber-100 text-amber-800',
  hard: 'bg-red-100 text-red-800',
} as const;

className += DIFFICULTY_STYLES[difficulty] ?? 'bg-gray-100 text-gray-800';
```

---

### OPT-007: Debounce no Filtro /CONSIDERACAO DO DEV: APROVADA/

**Esforço:** 20min

```typescript
// src/hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Uso em Library.tsx
const debouncedQuery = useDebounce(searchQuery, 300);

const filteredProblems = useMemo(() => {
  return problems.filter((problem) => {
    const matchesSearch = debouncedQuery === '' || /* ... */;
    // ...
  });
}, [problems, debouncedQuery, selectedDifficulty, selectedStatus]);
```

---

### OPT-008: Keyboard Navigation nas Tabs /CONSIDERACAO DO DEV: REPROVADA/

**Esforço:** 30min

```typescript
// Tabs.tsx
export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    
    if (e.key === 'ArrowRight') {
      const nextIndex = (currentIndex + 1) % tabs.length;
      onTabChange(tabs[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      onTabChange(tabs[prevIndex].id);
    }
  };

  return (
    <div className="w-full" onKeyDown={handleKeyDown}>
      <div className="border-b border-slate-200 mb-6" role="tablist">
        {/* tabs com role="tab" e aria-selected */}
      </div>
    </div>
  );
}
```

---

## 🟢 BACKLOG (Futuro)

### OPT-009: PWA / Offline Support
- Service Worker
- IndexedDB para cache de problemas
- Manifest.json

### OPT-010: Syntax Highlighting no Markdown /CONSIDERACAO DO DEV: APROVADA APENAS ESSA/
- Integrar rehype-shiki
- Unificar tema com CodeViewer

### OPT-011: Temas (Dark Mode)
- CSS variables
- Theme context
- Persistência no localStorage

### OPT-012: Testes Automatizados
- Vitest para unit tests
- Testing Library para componentes
- Playwright para E2E

### OPT-013: i18n
- react-i18next
- Português/Inglês

---

## 📋 Checklist de Implementação

### Sprint 1 - Crítico (1-2 dias)
- [ ] OPT-001: Fix MarkdownRenderer
- [ ] OPT-002: Loading states
- [ ] OPT-006: Badge refactor
- [ ] OPT-007: Debounce filter

### Sprint 2 - Arquitetura (3-4 dias)
- [ ] OPT-003: Context API
- [ ] OPT-004: Validação Zod
- [ ] OPT-005: Refatorar SolutionPanel

### Sprint 3 - Polish (2-3 dias)
- [ ] OPT-008: Keyboard navigation
- [ ] OPT-010: Syntax highlighting markdown
- [ ] Responsividade mobile

---

> **Próximo documento**: [06_roadmap.md](./06_roadmap.md) - Plano de implementação detalhado
