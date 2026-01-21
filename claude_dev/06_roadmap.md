# 🗺️ Roadmap de Implementação

Plano detalhado de execução das otimizações organizadas em sprints.

---

## 📅 Visão Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                    TIMELINE DE IMPLEMENTAÇÃO                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SPRINT 1          SPRINT 2           SPRINT 3                  │
│  ─────────         ─────────          ─────────                 │
│  🔴 Crítico        🟠 Arquitetura     🟡 Polish                 │
│  1-2 dias          3-4 dias           2-3 dias                  │
│                                                                 │
│  • MD Fix          • Context API      • Acessibilidade          │
│  • Loading         • Zod              • Mobile                  │
│  • Quick wins      • Refactor         • Testes                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔴 Sprint 1: Correções Críticas

**Duração:** 1-2 dias
**Objetivo:** Resolver bugs visuais e melhorar UX imediata

### Dia 1 (4-6h)

#### Task 1.1: Corrigir MarkdownRenderer /CONSIDERACAO DO DEV: APROVADA/
**Tempo estimado:** 2h

**Arquivos a modificar:**
- `src/components/MarkdownRenderer.tsx`

**Passos:**
1. Remover dependência da prop `inline`
2. Implementar detecção baseada em className
3. Testar com diferentes formatos de markdown

**Critérios de aceite:**
- [ ] Código inline renderiza inline (sem quebra de linha)
- [ ] Blocos de código renderizam em blocos
- [ ] Sem regressões visuais em outras áreas

---

#### Task 1.2: Criar Skeletons /CONSIDERACAO DO DEV: APROVADA/
**Tempo estimado:** 1.5h

**Arquivos a criar:**
- `src/components/Skeleton.tsx`

**Passos:**
1. Criar componente base Skeleton
2. Criar ProblemCardSkeleton
3. Criar CodeViewerSkeleton
4. Criar SolutionSkeleton

---

#### Task 1.3: Adicionar Loading ao CodeViewer /CONSIDERACAO DO DEV: APROVADA/
**Tempo estimado:** 30min

**Arquivos a modificar:**
- `src/components/CodeViewer.tsx`

**Passos:**
1. Importar CodeViewerSkeleton
2. Adicionar estado loading
3. Renderizar skeleton enquanto carrega

---

### Dia 2 (2-3h)

#### Task 1.4: Refatorar Badge /CONSIDERACAO DO DEV: APROVADA/
**Tempo estimado:** 30min

**Passos:**
1. Criar objetos de mapeamento para cores
2. Substituir switch-case
3. Adicionar prop size opcional

---

#### Task 1.5: Debounce no FilterBar
**Tempo estimado:** 45min

**Arquivos a criar:**
- `src/hooks/useDebounce.ts`

**Arquivos a modificar:**
- `src/pages/Library.tsx`

---

#### Task 1.6: Error Boundary /CONSIDERACAO DO DEV: APROVADA/
**Tempo estimado:** 1h

**Arquivos a criar:**
- `src/components/ErrorBoundary.tsx`

**Arquivos a modificar:**
- `src/App.tsx`

---

### Deliverables Sprint 1
- [ ] Markdown renderizando corretamente
- [ ] Loading states em CodeViewer
- [ ] Skeletons criados
- [ ] Filtro com debounce
- [ ] Error boundary implementado

---

## 🟠 Sprint 2: Arquitetura

**Duração:** 3-4 dias
**Objetivo:** Melhorar manutenibilidade e robustez

### Dia 3-4 (6-8h)

#### Task 2.1: Implementar Context API /CONSIDERACAO DO DEV: APROVADA/
**Tempo estimado:** 4h

**Arquivos a criar:**
- `src/contexts/DataContext.tsx`
- `src/hooks/useData.ts`
- `src/hooks/useProblem.ts`
- `src/hooks/useSolution.ts`

**Arquivos a modificar:**
- `src/App.tsx` (wrap com Provider)
- `src/pages/Library.tsx` (usar useData)
- `src/pages/ProblemDetail.tsx` (usar useProblem)
- `src/components/SolutionPanel.tsx` (usar useSolution)

**Passos detalhados:**
```typescript
// 1. Criar Context
// src/contexts/DataContext.tsx

// 2. Criar Hook customizado
// src/hooks/useData.ts

// 3. Migrar páginas para usar hooks
// Substituir dataLoader.getX() por useData().getX()

// 4. Manter dataLoader como fallback de testes
```

---

#### Task 2.2: Adicionar Validação Zod /CONSIDERACAO DO DEV: APROVADA/
**Tempo estimado:** 3h

**Dependência:** `npm install zod`

**Arquivos a criar:**
- `src/types/validators.ts`

**Arquivos a modificar:**
- `src/utils/dataLoader.ts`

**Passos:**
1. Definir schemas Zod para Problem e Solution
2. Substituir cast `as ProblemV3` por validação
3. Adicionar error handling amigável

---

### Dia 5-6 (6-8h)

#### Task 2.3: Refatorar SolutionPanel /CONSIDERACAO DO DEV: APROVADA/
**Tempo estimado:** 4h

**Estrutura final:**
```
src/components/solution/
├── index.ts              # Export barrel
├── SolutionPanel.tsx     # Container principal
├── SolutionHeader.tsx    # Badges, approach name, complexity
├── SolutionContent.tsx   # Rationale + Walkthrough com MD
├── SolutionCode.tsx      # Tab de artifacts + CodeViewer
└── InsightCard.tsx       # Card genérico (pitfalls, tradeoffs, etc)
```

**Passos:**
1. Criar pasta solution/
2. Extrair SolutionHeader
3. Extrair SolutionContent
4. Extrair SolutionCode
5. Criar InsightCard genérico
6. Atualizar imports

---

#### Task 2.4: Organizar Pastas de Componentes /CONSIDERACAO DO DEV: APROVADA/
**Tempo estimado:** 2h

**Nova estrutura:**
```
src/components/
├── common/
│   ├── Badge/
│   │   ├── Badge.tsx
│   │   └── index.ts
│   ├── Tabs/
│   ├── Skeleton/
│   └── ErrorBoundary/
├── problem/
│   ├── ProblemCard/
│   └── HistoryTimeline/
├── solution/
│   └── (criado em 2.3)
├── markdown/
│   ├── MarkdownRenderer/
│   └── CodeViewer/
└── filters/
    └── FilterBar/
```

---

### Deliverables Sprint 2
- [ ] Context API funcionando
- [ ] Validação Zod ativa
- [ ] SolutionPanel refatorado em 5 sub-componentes
- [ ] Pastas organizadas por domínio
- [ ] Todos os imports atualizados

---

## 🟡 Sprint 3: Polish

**Duração:** 2-3 dias
**Objetivo:** Refinar UX, acessibilidade e responsividade

### Dia 7 (4h)

#### Task 3.1: Acessibilidade nas Tabs /CONSIDERACAO DO DEV: REPROVADA/
**Tempo estimado:** 2h

**Requisitos:**
- role="tablist" e role="tab"
- aria-selected
- Navegação por teclado (Arrow keys)
- Focus visible

---

#### Task 3.2: Responsividade Mobile /CONSIDERACAO DO DEV: APROVADA/
**Tempo estimado:** 2h

**Áreas a ajustar:**
- FilterBar em mobile (stack vertical)
- ProblemCard (resize badges)
- CodeViewer (scroll horizontal)
- Tabs (scrollable em overflow)

---

### Dia 8 (4h)

#### Task 3.3: Syntax Highlighting no Markdown /CONSIDERACAO DO DEV: APROVADA/
**Tempo estimado:** 3h

**Dependência:** `npm install rehype-shiki`

**Integrar Shiki no MarkdownRenderer para blocos de código.**

---

#### Task 3.4: Persistir Filtros na URL /CONSIDERACAO DO DEV: APROVADA/
**Tempo estimado:** 1h

**Usar query params:**
```
/?difficulty=medium&status=todo&q=array
```

---

### Dia 9 (4h)

#### Task 3.5: Testes Unitários Básicos
**Tempo estimado:** 4h

**Setup:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

**Testes prioritários:**
- Badge.test.tsx
- Skeleton.test.tsx
- InsightCard.test.tsx
- useDebounce.test.ts

---

### Deliverables Sprint 3
- [ ] Tabs acessíveis (keyboard + ARIA)
- [ ] Layout responsivo em mobile
- [ ] Syntax highlighting em markdown
- [ ] Filtros na URL
- [ ] Suite de testes básica

---

## 📈 Métricas de Sucesso

### Qualidade
| Métrica | Antes | Meta |
|---------|-------|------|
| Linhas no maior componente | 233 (ProblemDetail) | < 100 |
| Componentes > 100 linhas | 2 | 0 |
| Cobertura de testes | 0% | > 50% |
| Erros de console | Vários | 0 |

### Performance
| Métrica | Antes | Meta |
|---------|-------|------|
| First Contentful Paint | ~1.5s | < 1s |
| Time to Interactive | ~2s | < 1.5s |
| Bundle size | ~300kb | < 250kb |

### UX
| Métrica | Antes | Meta |
|---------|-------|------|
| Loading feedback | Nenhum | Skeletons |
| Keyboard navigation | Nenhum | Full |
| Mobile usabilidade | Parcial | Completo |

---

## 🚀 Próximos Passos (Pós-Sprints)

1. **Dark Mode** - Tema escuro com toggle
2. **PWA** - Service Worker, offline support
3. **Spaced Repetition** - Notificações de review
4. **Analytics** - Tracking de progresso
5. **Export/Import** - Backup de dados

---

## 📋 Resumo Final

```
┌───────────────────────────────────────────────────────────┐
│                    RESUMO DO ROADMAP                       │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Total de Sprints    : 3                                  │
│  Tempo Total Estimado: 6-9 dias                           │
│  Tasks Totais        : 15                                 │
│                                                           │
│  Prioridade Crítica  : 6 tasks (Sprint 1)                 │
│  Prioridade Alta     : 4 tasks (Sprint 2)                 │
│  Prioridade Média    : 5 tasks (Sprint 3)                 │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

> **Documentação concluída.**  
> Para dúvidas ou priorização diferente, consultar `00_overview_geral.md`.
