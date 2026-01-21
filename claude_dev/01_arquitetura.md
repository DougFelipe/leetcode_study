# 🏗️ Análise de Arquitetura

## 📐 Padrão Atual

O projeto segue uma estrutura simples de Single Page Application (SPA) com:

```
Arquitetura de Camadas
┌─────────────────────────────────────────────┐
│                   PAGES                     │
│         Library.tsx │ ProblemDetail.tsx     │
├─────────────────────────────────────────────┤
│                COMPONENTS                   │
│   Badge │ Tabs │ FilterBar │ CodeViewer     │
│   MarkdownRenderer │ SolutionPanel │ etc    │
├─────────────────────────────────────────────┤
│                  UTILS                      │
│              DataLoader.ts                  │
├─────────────────────────────────────────────┤
│                  TYPES                      │
│               schema.ts                     │
├─────────────────────────────────────────────┤
│                  DATA                       │
│           /data/problems/*.yaml             │
└─────────────────────────────────────────────┘
```

---

## ✅ Pontos Positivos

### 1. Separação de Responsabilidades
- **Pages**: Lógica de roteamento e composição
- **Components**: UI reutilizável
- **Utils**: Lógica de negócio (carregamento de dados)
- **Types**: Contratos TypeScript

### 2. Dados em YAML
- Schema versionado (v3)
- Separação clara: `problem.yaml` + `solutions/*.yaml` + `code/*`
- Fácil manutenção e adição de novos problemas

### 3. TypeScript Rigoroso
```typescript
// Tipos bem definidos
export type Difficulty = 'easy' | 'medium' | 'hard';
export type StudyStatus = 'todo' | 'solving' | 'solved' | 'revisiting';
export type Language = 'go' | 'python' | 'java' | 'kotlin' | ...;
```

### 4. Vite + Glob Imports
```typescript
// Carregamento dinâmico eficiente
const problemFiles = import.meta.glob('/data/problems/**/problem.yaml', {
  eager: true,
  query: '?raw',
  import: 'default'
});
```

---

## ⚠️ Problemas Identificados

### 1. DataLoader como Singleton Global

**Problema:**
```typescript
// Singleton no escopo do módulo
export const dataLoader = new DataLoader();
```

**Impacto:**
- Difícil de testar (sem injeção de dependência)
- Não reativo - dados carregados uma vez no startup
- Sem suporte a Server-Side Rendering (SSR)

**Solução Proposta:** Ver `05_otimizacoes.md`

---

### 2. Componentes Grandes (God Components)

**Problema:** `ProblemDetail.tsx` tem 233 linhas com:
- Lógica de tabs inline
- Conteúdo de cada tab definido dentro do componente
- Múltiplas responsabilidades

**Métricas:**
```
ProblemDetail.tsx   → 233 linhas (ALTO)
SolutionPanel.tsx   → 142 linhas (MÉDIO)
Library.tsx         → 75 linhas (OK)
```

---

### 3. Falta de Context/State Management

**Problema:** Estado local em cada componente
- Não há compartilhamento de estado
- Sem memoização adequada
- Props drilling para dados comuns

---

### 4. Estrutura de Pastas Plana

**Atual:**
```
components/
├── Badge.tsx
├── CodeViewer.tsx
├── FilterBar.tsx
└── ... (8 arquivos soltos)
```

**Sugestão:**
```
components/
├── common/           # Componentes base
│   ├── Badge/
│   ├── Tabs/
│   └── Button/
├── problem/          # Específicos de problema
│   ├── ProblemCard/
│   ├── SolutionPanel/
│   └── HistoryTimeline/
├── markdown/         # Renderização de conteúdo
│   ├── MarkdownRenderer/
│   └── CodeViewer/
└── layout/           # Layout e navegação
    ├── FilterBar/
    └── Header/
```

---

## 📊 Fluxo de Dados

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  YAML Files  │────▶│  DataLoader  │────▶│   Pages      │
│  (Static)    │     │  (Singleton) │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  Components  │
                     │  (via props) │
                     └──────────────┘
```

### Pontos de Atenção:
1. **Sem cache invalidation** - dados carregados uma vez
2. **Sem loading states** - tudo síncrono
3. **Sem error boundaries** - erros de YAML quebram a app

---

## 🔧 Recomendações de Arquitetura

### Curto Prazo (Quick Wins)
1. Extrair conteúdo das tabs para sub-componentes
2. Criar pasta de hooks customizados (`hooks/`)
3. Adicionar Error Boundaries

### Médio Prazo
1. Implementar Context para dados do problema
2. Lazy loading de soluções
3. Adicionar React Query ou SWR

### Longo Prazo
1. Considerar SSR se SEO for importante
2. Persistência local (IndexedDB) para modo offline
3. Service Worker para PWA

---

## 📈 Diagrama de Dependências

```
App.tsx
├── Library.tsx
│   ├── FilterBar.tsx
│   └── ProblemCard.tsx
│       └── Badge.tsx
│
└── ProblemDetail.tsx
    ├── Badge.tsx
    ├── Tabs.tsx
    ├── MarkdownRenderer.tsx
    ├── SolutionPanel.tsx
    │   ├── Badge.tsx
    │   ├── MarkdownRenderer.tsx
    │   └── CodeViewer.tsx
    └── HistoryTimeline.tsx

dataLoader.ts ← Usado por Pages (singleton)
schema.ts     ← Usado por todos
```

---

> **Próximo documento**: [02_componentes.md](./02_componentes.md)
