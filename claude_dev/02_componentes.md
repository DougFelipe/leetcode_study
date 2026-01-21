# 🧩 Análise de Componentes

Este documento detalha cada componente React do projeto com:
- Propósito e responsabilidades
- Pontos fortes e fracos
- Sugestões de melhoria

---

## 📊 Visão Geral

| Componente | Linhas | Complexidade | Estado |
|------------|--------|--------------|--------|
| Badge | 55 | Baixa | ✅ OK |
| CodeViewer | 52 | Média | ⚠️ Melhorar |
| FilterBar | 63 | Baixa | ✅ OK |
| HistoryTimeline | 30 | Baixa | ✅ OK |
| MarkdownRenderer | 45 | Média | ❌ Problema |
| ProblemCard | 52 | Baixa | ✅ OK |
| SolutionPanel | 142 | Alta | ⚠️ Refatorar |
| Tabs | 42 | Baixa | ✅ OK |

---

## 1. Badge.tsx

### Código Atual
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'difficulty' | 'status' | 'tag';
  difficulty?: Difficulty;
  status?: StudyStatus | SolutionStatus;
}
```

### ✅ Pontos Positivos
- Componente simples e reutilizável
- Suporta múltiplas variantes
- Tipagem correta

### ⚠️ Sugestões
1. Usar objeto de mapeamento ao invés de switch-case extenso
2. Adicionar prop `size` (sm, md, lg)
3. Exportar as cores como constantes para consistência

```typescript
// Melhoria sugerida
const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-amber-100 text-amber-800',
  hard: 'bg-red-100 text-red-800',
} as const;
```

---

## 2. CodeViewer.tsx

### Código Atual
```typescript
export function CodeViewer({ code, language, showLineNumbers = true }) {
  const [html, setHtml] = useState<string>('');
  
  useEffect(() => {
    codeToHtml(code, { lang: language, theme: 'github-light' })
      .then(setHtml);
  }, [code, language]);
  // ...
}
```

### ✅ Pontos Positivos
- Usa Shiki para syntax highlighting de alta qualidade
- Botão de copiar funcional
- Transições suaves

### ⚠️ Problemas
1. **Sem loading state** - Flash de conteúdo vazio
2. **Sem error handling** - Linguagem inválida causa erro
3. **dangerouslySetInnerHTML** sem sanitização (ok para Shiki, mas atenção)

### 🔧 Melhoria Sugerida
```typescript
export function CodeViewer({ code, language, showLineNumbers = true }) {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    codeToHtml(code, { lang: language, theme: 'github-light' })
      .then(setHtml)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [code, language]);

  if (loading) return <CodeSkeleton />;
  if (error) return <CodeFallback code={code} />;
  // ...
}
```

---

## 3. FilterBar.tsx

### ✅ Pontos Positivos
- Props bem tipadas
- Layout responsivo (flex-col md:flex-row)
- Ícone de busca bem posicionado

### ⚠️ Sugestões
1. Debounce na busca para evitar re-renders excessivos
2. Adicionar clear button no input
3. Considerar persistir filtros na URL (query params)

---

## 4. HistoryTimeline.tsx

### ✅ Pontos Positivos
- Design limpo com timeline visual
- Componente pequeno e focado

### ⚠️ Sugestões
1. Formatar datas de forma amigável (e.g., "há 2 dias")
2. Expandir para mostrar diff de mudanças
3. Agrupar por data quando houver muitas entradas

---

## 5. MarkdownRenderer.tsx ⚠️ CRÍTICO

### Código Atual
```typescript
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: ({ inline, children }) =>
            inline ? (
              <code className="bg-slate-100 ...">...</code>
            ) : (
              <code className="block bg-slate-50 ...">...</code>
            ),
          // ...
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
```

### ❌ Problemas Identificados

1. **A prop `inline` está deprecated** no react-markdown v9+
   - Causa: A nova versão não passa `inline` automaticamente

2. **Code blocks renderizados incorretamente**
   - Código inline aparece como bloco
   - Isso causa o problema visual das screenshots

3. **Sem syntax highlighting para blocos de código**
   - Usa apenas estilização básica

### 🔧 Correção Urgente

Ver documento **[03_ui_issues.md](./03_ui_issues.md)** para a solução detalhada.

---

## 6. ProblemCard.tsx

### ✅ Pontos Positivos
- Limita topics a 3 com "+N" para o resto
- Usa Link corretamente para navegação
- Efeito hover sutil

### ⚠️ Sugestões
1. Skeleton loading durante transição
2. Indicador visual de SRS (próxima revisão)
3. Quick actions (marcar como resolvido, etc.)

---

## 7. SolutionPanel.tsx ⚠️ REFATORAR

### Código Atual (142 linhas)
```typescript
export function SolutionPanel({ solution, problemSlug }: SolutionPanelProps) {
  const [activeCodeIndex, setActiveCodeIndex] = useState(0);
  
  return (
    <div className="space-y-6">
      {/* Header com badges */}
      {/* Rationale section */}
      {/* Walkthrough section */}
      {/* Code artifacts */}
      {/* Pitfalls */}
      {/* Tradeoffs */}
      {/* Comparison notes */}
      {/* Review questions */}
    </div>
  );
}
```

### ❌ Problemas
1. **Muitas seções inline** - Difícil de manter
2. **Repetição** - Cards de pitfalls/tradeoffs/questions são similares
3. **Sem lazy loading** - Carrega todas as seções mesmo escondidas

### 🔧 Sugestão de Refatoração

```typescript
// Extrair sub-componentes
components/
├── solution/
│   ├── SolutionPanel.tsx        # Container principal
│   ├── SolutionHeader.tsx       # Badges + approach
│   ├── SolutionContent.tsx      # Rationale + Walkthrough
│   ├── SolutionCode.tsx         # Code artifacts
│   └── InsightCard.tsx          # Reusável: pitfalls, tradeoffs, etc.
```

```typescript
// InsightCard reutilizável
interface InsightCardProps {
  title: string;
  icon: LucideIcon;
  items: string[];
  variant: 'success' | 'warning' | 'info' | 'danger';
}

export function InsightCard({ title, icon: Icon, items, variant }) {
  const colors = VARIANT_COLORS[variant];
  return (
    <div className={`rounded-lg p-4 border ${colors.bg} ${colors.border}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${colors.icon}`} />
        <h4 className={`font-semibold ${colors.title}`}>{title}</h4>
      </div>
      <ul className={`list-disc pl-5 space-y-1 text-sm ${colors.text}`}>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}
```

---

## 8. Tabs.tsx

### ✅ Pontos Positivos
- Interface limpa e extensível
- Indicador de tab ativa bem implementado
- Suporta conteúdo dinâmico via ReactNode

### ⚠️ Sugestões
1. Adicionar animação de transição entre tabs
2. Suporte a keyboard navigation (acessibilidade)
3. Lazy render do conteúdo (não renderizar tabs inativas)

```typescript
// Lazy rendering
<div>
  {tabs.find((tab) => tab.id === activeTab)?.content}
  {/* Ao invés de renderizar todos e esconder */}
</div>
```

---

## 📈 Priorização de Refatoração

| Prioridade | Componente | Ação |
|------------|------------|------|
| 🔴 Alta | MarkdownRenderer | Fix urgente - prop inline deprecated |
| 🟠 Média | SolutionPanel | Extrair sub-componentes |
| 🟠 Média | CodeViewer | Adicionar loading/error states |
| 🟡 Baixa | Badge | Refatorar para objeto de mapeamento |
| 🟢 OK | FilterBar, Tabs, ProblemCard, HistoryTimeline | Manter |

---

> **Próximo documento**: [03_ui_issues.md](./03_ui_issues.md) - Detalhes do problema de formatação
