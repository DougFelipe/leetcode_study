
Otimizações de UI (alto impacto)
1) Hierarquia visual e “scannability”

Header do problema: incluir um “subheader” pequeno com:

patterns (ex: hashmap • one-pass) e time/space (quando estiver em Solutions).

Chips: limite de chips por linha e use “+N more” (evita poluição quando tiver muitos tópicos/padrões).

Cards: padronize altura e espaçamento (Pitfalls/Tradeoffs/Comparison/Gotchas) pra leitura “em grade” sem parecer desalinhado.

2) Melhorar a aba Solutions para “fluxo de estudo”

Hoje você tem muita informação boa, mas o usuário ainda pode ficar “sem rumo”.

Sugestões:

Adicionar “Suggested order” (mini stepper no topo):

Rationale → 2) Walkthrough → 3) Code → 4) Pitfalls → 5) Review Questions

Botões no topo:

Expand all / Collapse all

Open Code by default (preferência)

Copy code sempre visível (não só dentro do accordion)

3) Code Viewer mais “ferramenta”

Mesmo sem mexer no visual, isso aumenta MUITO o valor:

Toggle Line numbers

Toggle Wrap

Botão Copy com feedback

Botão Download / Open raw

Pequeno badge “Language: Go / Python” com ícone

4) “Compare Mode” /FEATURE NOVA/

Como seu foco é comparação de paradigmas, esse é o upgrade #1:

NOVA ABA AO LADO DE SOLUTIONS → abre 2 colunas:

esquerda: Go

direita: Python

Seletor de linguagem em cada coluna

Opção: comparar “Code only” ou “Code + Pitfalls/Gotchas”

5) Acessibilidade e responsividade (melhora UX e SEO)

Garantir semântica de Tabs (role=tablist/tab, aria-selected, keyboard nav).

6) Code Viewer mais “ferramenta” e menos “bloco estático”
Quick wins

Linha numerada (toggle)

Copy button (snippet + feedback “Copied!”)

Wrap toggle (pra telas menores)

Upgrade forte

“Highlight lines referenced in walkthrough”

No YAML, você pode opcionalmente marcar steps com line_range: [12, 19]

A UI destaca essas linhas quando você clica no passo.


Refatorações de arquitetura/dados (pra escalar com muitos problemas)


A) Index gerado (performance + busca)

Se você colocar 200 problemas, carregar e parsear tudo no startup pode ficar lento.

Sugestão

Criar um data/index.json (gerado por script) com campos mínimos pro Library:

title, slug, difficulty, status, topics, patterns, solution_count, languages, last_updated, next_review

No detalhe do problema, aí sim você carrega YAML completo.

Isso deixa a UI instantânea e facilita busca.