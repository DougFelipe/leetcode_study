# 📊 Análise de Lógica e Dados

Este documento analisa a camada de dados do projeto, incluindo:
- Schema TypeScript
- DataLoader
- Estrutura de dados YAML
- Fluxo de dados na aplicação

---

## 📐 Schema TypeScript

### Localização: `src/types/schema.ts`

### Tipos Principais

```typescript
// Enums como union types
export type Difficulty = 'easy' | 'medium' | 'hard';
export type StudyStatus = 'todo' | 'solving' | 'solved' | 'revisiting';
export type SolutionStatus = 'done' | 'draft' | 'wip';
export type Language = 'go' | 'python' | 'java' | 'kotlin' | 'javascript' | 'scala' | 'rust';
export type Paradigm = 'imperative' | 'oop_classic' | 'oop_prototype' | 'functional' | 'systems';
```

### Hierarquia de Interfaces

```
ProblemV3
├── source: { platform, id, slug, url }
├── catalog: { difficulty, topics, patterns, companies }
├── constraints: { summary, notes_md }
├── study: {
│     status, priority, confidence,
│     review: { srs_enabled, next_review, interval_days },
│     mistakes: string[]
│   }
├── content: {
│     statement_md, editorial_summary_md,
│     key_insights, pitfalls, review_questions
│   }
├── solutions_index: SolutionIndexEntry[]
└── history: HistoryEntry[]

SolutionV3
├── approach: { name, tags }
├── complexity: { time, space }
├── text: { rationale_md, walkthrough_md }
├── pitfalls: string[]
├── tradeoffs: string[]
├── comparison_notes: { highlights, gotchas_language_specific }
├── review_questions: string[]
├── code_artifacts: CodeArtifact[]
└── history: HistoryEntry[]
```

---

## ✅ Pontos Positivos do Schema

### 1. Versionamento
```typescript
export interface ProblemV3 {
  schema_version: 3;  // ✅ Versão explícita
  // ...
}
```
Permite migração futura de dados.

### 2. Tipagem Forte
União de tipos garante valores válidos em compile-time.

### 3. Separação Problem vs Solution
Permite múltiplas soluções por problema, cada uma em arquivo separado.

---

## ⚠️ Problemas Identificados

### 1. Campos Opcionais Inconsistentes

```typescript
// Alguns campos são opcionais
export interface ProblemV3 {
  content: {
    statement_md?: string;        // Opcional
    editorial_summary_md?: string; // Opcional
    key_insights: string[];       // Obrigatório (pode ser [])
  };
}
```

**Problema:** Mistura de `undefined` vs array vazio para representar ausência.

**Sugestão:** Padronizar:
- `string | undefined` para texto opcional
- `never empty array` para listas (se vazio, não incluir no YAML)

### 2. Falta de Validação em Runtime

```typescript
// DataLoader confia cegamente no YAML
const problem = yaml.load(content as string) as ProblemV3; // ⚠️ Cast direto
```

**Problema:** Se o YAML estiver mal formado, não há erro claro.

**Sugestão:** Usar Zod para validação:

```typescript
import { z } from 'zod';

const ProblemSchema = z.object({
  schema_version: z.literal(3),
  problem_id: z.string(),
  slug: z.string(),
  title: z.string(),
  // ...
});

// No DataLoader
const problem = ProblemSchema.parse(yaml.load(content));
```

---

## 🔄 DataLoader

### Localização: `src/utils/dataLoader.ts`

### Funcionamento Atual

```typescript
// Glob imports (Vite feature)
const problemFiles = import.meta.glob('/data/problems/**/problem.yaml', {
  eager: true,
  query: '?raw',
  import: 'default'
});

export class DataLoader {
  private problems: Map<string, ProblemWithPath> = new Map();
  private solutions: Map<string, { solution: SolutionV3; path: string }> = new Map();
  private codes: Map<string, string> = new Map();

  constructor() {
    this.loadData(); // Carrega tudo no startup
  }
  // ...
}

// Singleton exportado
export const dataLoader = new DataLoader();
```

### ✅ Pontos Positivos

1. **Carregamento automático** via Vite glob
2. **Cache em memória** (Maps)
3. **Resolução de paths** para solutions e code

### ⚠️ Problemas

#### 1. Singleton Global
- Difícil de mockar em testes
- Sem possibilidade de diferentes instâncias

#### 2. Sem Loading State
- Dados carregados síncronamente no startup
- Não funciona com SSR/SSG

#### 3. Tratamento de Erro Silencioso
```typescript
try {
  const problem = yaml.load(content as string) as ProblemV3;
  // ...
} catch (error) {
  console.error(`Error loading problem ${path}:`, error);
  continue; // Ignora silenciosamente
}
```

#### 4. Resolução de Path Frágil
```typescript
// Manipulação manual de strings
const problemDir = problemData.path.substring(0, problemData.path.lastIndexOf('/'));
const solutionPath = `${problemDir}/${solutionRef}`;
```

---

## 🔧 Melhorias Propostas

### 1. DataLoader com React Context

```typescript
// src/contexts/DataContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DataContextType {
  problems: ProblemV3[];
  isLoading: boolean;
  error: Error | null;
  getProblemBySlug: (slug: string) => ProblemV3 | undefined;
  // ...
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [problems, setProblems] = useState<ProblemV3[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadAllData()
      .then(setProblems)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  const value = {
    problems,
    isLoading,
    error,
    getProblemBySlug: (slug) => problems.find(p => p.slug === slug),
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be inside DataProvider');
  return ctx;
}
```

### 2. Custom Hooks

```typescript
// src/hooks/useProblem.ts
export function useProblem(slug: string) {
  const { getProblemBySlug, isLoading, error } = useData();
  const problem = getProblemBySlug(slug);
  
  return { problem, isLoading, error };
}

// src/hooks/useSolution.ts
export function useSolution(problemSlug: string, solutionRef: string) {
  const [solution, setSolution] = useState<SolutionV3 | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadSolution(problemSlug, solutionRef)
      .then(setSolution)
      .finally(() => setLoading(false));
  }, [problemSlug, solutionRef]);
  
  return { solution, loading };
}
```

### 3. Validação com Zod

```typescript
// src/types/validators.ts
import { z } from 'zod';

export const DifficultySchema = z.enum(['easy', 'medium', 'hard']);
export const StudyStatusSchema = z.enum(['todo', 'solving', 'solved', 'revisiting']);

export const ProblemSchema = z.object({
  schema_version: z.literal(3),
  problem_id: z.string(),
  slug: z.string().regex(/^[a-z0-9_]+$/),
  title: z.string().min(1),
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
  // ...
});

export type Problem = z.infer<typeof ProblemSchema>;
```

---

## 📂 Estrutura de Dados YAML

### Hierarquia de Arquivos

```
data/problems/
└── lc_0001_two_sum/
    ├── problem.yaml           # Definição do problema
    ├── solutions/
    │   ├── sol_go_hashmap.yaml    # Solução Go
    │   └── sol_py_hashmap.yaml    # Solução Python
    └── code/
        ├── sol_go_hashmap.go   # Código fonte Go
        └── sol_py_hashmap.py   # Código fonte Python
```

### ✅ Pontos Positivos
- Convenção clara de nomes
- Separação por problema
- Código separado do metadata

### ⚠️ Sugestões

1. **Adicionar index.yaml** para metadados do diretório
2. **Usar frontmatter** nos arquivos de código para metadata inline
3. **Considerar SQLite** para queries mais complexas no futuro

---

## 📈 Fluxo de Dados Atual

```
┌────────────────────────────────────────────────────────────┐
│                      STARTUP                               │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  import.meta.glob()  ──▶  yaml.load()  ──▶  Map<>         │
│  (Vite bundler)          (js-yaml)         (in-memory)    │
│                                                            │
└────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────┐
│                     RUNTIME                                │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Component  ──▶  dataLoader.getX()  ──▶  Map.get()        │
│  (render)        (singleton)              (O(1))          │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Análise de Performance

| Operação | Complexidade | Nota |
|----------|--------------|------|
| Listar todos os problemas | O(n) | Cópia do array |
| Buscar por slug | O(1) | Map lookup |
| Filtrar por difficulty | O(n) | Filtro no array |
| Buscar solução | O(1) | Map lookup por path |
| Carregar código | O(1) | Map lookup por path |

**Conclusão:** Performance adequada para ~1000 problemas.

---

> **Próximo documento**: [05_otimizacoes.md](./05_otimizacoes.md) - Propostas de otimização priorizadas
