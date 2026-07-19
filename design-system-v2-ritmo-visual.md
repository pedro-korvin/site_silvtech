# Silvtech — Design system v2: ritmo visual e contraste entre seções

Adendo ao `design-system.md` (não substitui — soma). Motivo: a v1 traduziu
"sóbrio e editorial" como "uma única cor de fundo do início ao fim da
página", separando seções só com `border-top` de 1px. Na prática, isso
deixou o site com aparência de template genérico (tipo Google Sites) em vez
de premium — falta hierarquia visual perceptível entre blocos de conteúdo.

**Este documento não muda a paleta, não introduz cor nova, não afrouxa
nenhuma proibição do CLAUDE.md (sem gradiente, sem glow, sem
glassmorphism).** Ele corrige a *aplicação* das 4 cores existentes, usando-as
com mais confiança e amplitude.

Aplicar em: `index.html`, `metodologia.html`, `servicos.html`,
`quemsomos.html`, `fale-conosco.html`, `blog/index.html`, `cases/index.html`,
`cases/_template.html` (+ cases já publicados), `setores/index.html` e as 6
landing pages de setor. Ou seja: o site inteiro, mantendo a estrutura de
conteúdo já definida no `briefing-visual.md` e no `expansao-cases-e-setores.md`
— muda o tratamento visual das seções, não o conteúdo ou a ordem delas.

---

## 1. Diagnóstico técnico (por que ficou "Google Sites")

- `--cor-fundo` (`#f6f4ef`) e `--cor-superficie` (`#ffffff`) têm diferença de
  luminosidade quase nula — a olho nu, quase todas as seções da página
  parecem ter exatamente a mesma cor.
- A cor de acento (`--cor-acento`) está sendo usada em poucos pontos
  decorativos isolados, nunca como fundo de seção inteira com conteúdo
  dentro — perdendo a chance de criar um "momento de peso" na página.
  Onde já aparece como fundo de bloco, funciona bem — é questão de estender
  esse uso, com intenção, a mais um ou dois pontos estratégicos por página.
- Blocos de conteúdo relacionado (etapas do método, cards de serviço,
  colunas de dor/setor) são separados só por `border-top: 1px solid`, sem
  nenhum card real — o olho não agrupa o conteúdo visualmente, só lê texto
  corrido dividido por traços.
- Resultado: nenhuma seção "assina" a página. Tudo tem o mesmo peso visual,
  o que lê como falta de intenção de design, não como sobriedade.

---

## 2. Tokens novos (adicionar ao `tokens.css`, não substituir os existentes)

```css
:root {
  /* Tom stone — alternância de seção, mesma família do off-white */
  --cor-fundo-alt: #ede9dc;

  /* Superfície com contraste real contra o fundo (era quase igual antes) */
  --cor-superficie: #ffffff;      /* mantém, mas ver regra de uso na seção 3 */
  --cor-borda-alt: #d8d4c6;       /* borda de card sobre fundo-alt */

  /* Versão translúcida do acento, só para uso EM CIMA do próprio acento
     (ex.: badges/chips dentro de seção escura) */
  --cor-acento-translucido: rgba(246, 244, 239, 0.08);
  --cor-acento-borda-translucida: rgba(246, 244, 239, 0.25);
}
```

Nenhuma cor nova de matiz — `--cor-fundo-alt` é um stone dentro da mesma
família bege do `--cor-fundo`. `--cor-acento-translucido` é o próprio acento
com opacidade, usado só sobre fundo escuro (não é glassmorphism decorativo:
é texto/chip legível sobre fundo de cor sólida, sem blur).

---

## 3. Regra de ritmo — aplicar em toda página com 4+ seções

Cada página passa a alternar entre três tratamentos de seção, nesta lógica:

### A. Seção clara padrão
`background: var(--cor-fundo)`. Uso: hero, seções de leitura corrida
(posicionamento, contexto, textos longos). Continua a maioria das seções.

### B. Seção clara alternada
`background: var(--cor-fundo-alt)`. Uso: toda seção que segue uma seção tipo
A e precisa se diferenciar dela sem virar âncora escura (ex.: "prova social",
"dores do setor", "FAQ"). Regra prática: nunca duas seções tipo A seguidas
sem pelo menos uma B ou C entre elas.

### C. Seção âncora (acento como fundo total)
`background: var(--cor-acento)`, texto em `--cor-fundo`. Uso: **no máximo 1
por página** (2 apenas na home, ver seção 4), reservada para a seção de maior
peso estratégico daquela página — geralmente onde o método ou a
demonstração de raciocínio aparece. Dentro dela, chips/badges usam
`--cor-acento-translucido` + `--cor-acento-borda-translucida`, nunca cor
sólida diferente.

**Regra de contraste mínimo:** toda seção B ou C precisa ser perceptível sem
precisar da borda para se diferenciar da seção anterior — testar em
grayscale/preto-e-branco: se sumir, o contraste está fraco.

---

## 4. Aplicação por página

### Home (`index.html`)
1. Hero — tipo A.
2. Posicionamento — tipo **B** (era A).
3. S.C.A.L.E — tipo **C** (era A/superfície quase igual). Os 4 blocos de
   etapa viram cards reais dentro da seção escura: fundo
   `--cor-acento-translucido`, borda `--cor-acento-borda-translucida`,
   `border-radius: var(--raio)`, padding `var(--esp-3)`. É a seção-assinatura
   do site — tratar com mais cuidado de composição que as demais.
4. Serviços — tipo A, mas os cards de serviço passam a usar
   `background: var(--cor-superficie)` + `border: 1px solid var(--cor-borda)`
   sobre fundo A (contraste já suficiente porque A ≠ superfície agora).
5. Prova — tipo **B**. Cards de depoimento/logo com
   `border: 1px solid var(--cor-borda-alt)` (a variante que contrasta com
   fundo-alt).
6. Insights (blog) — tipo A.
7. CTA final — pode repetir tipo **C** (segunda ocorrência liberada só aqui,
   por ser o fechamento da página e reforçar o CTA único do briefing-visual).

### Metodologia
As 4 etapas do S.C.A.L.E aqui merecem o mesmo tratamento da home (tipo C),
já que é a página que aprofunda o método. Demais seções alternam A/B
normalmente. O bloco que já usa `--cor-acento` (linha 130/196 do
`metodologia.css`) mantém, mas revisar se o conteúdo dentro dele usa cards
translúcidos como definido acima em vez de texto solto.

### Serviços
Cada serviço vira um bloco alternando A/B conforme a ordem (serviço 1 = A,
serviço 2 = B, serviço 3 = A...). Evita repetir o mesmo tom em serviços
adjacentes. O bloco existente com `--cor-acento` (linha 94/119) funciona como
âncora única da página — provavelmente a seção de metodologia resumida ou
CTA; manter como está se já for isso.

### Setores (as 6 landing pages + índice)
Estrutura já definida no `expansao-cases-e-setores.md` (hero → mercado →
dores → causa → S.C.A.L.E aplicado → cenário → FAQ → CTA). Aplicar:
- Hero: A.
- Mercado: A.
- Dores do setor: **B** — cada dor vira um item de lista dentro de um card
  (não apenas texto numerado solto), fundo `--cor-superficie`, borda
  `--cor-borda-alt`.
- Causa estrutural: A.
- S.C.A.L.E aplicado ao setor: **C** — mesma lógica da home/metodologia.
- Cenário ilustrativo: **B**, card com borda mais evidente e o selo
  "Cenário ilustrativo" com destaque (chip com `--cor-acento` como fundo
  sólido pequeno, não translúcido — aqui é badge sobre fundo claro).
- FAQ: A.
- CTA final: A ou B, sem repetir C (reservar C só pra 1 seção por página aqui,
  diferente da home).

### Cases (índice + template)
Cards da listagem: `--cor-superficie` + `--cor-borda`, sobre fundo A. Dentro
do case individual, a seção "A abordagem, etapa por etapa" (as 4 etapas do
S.C.A.L.E) recebe tratamento C, igual às demais páginas — consistência entre
"onde o método aparece" em qualquer página do site.

### Quem somos / Fale conosco / Blog
Alternar A/B normalmente conforme número de seções. Quem somos já tem um
bloco `--cor-acento` (linha 84) — manter como âncora única da página.
Fale conosco e blog, por serem páginas mais funcionais/curtas, podem ficar só
em A/B, sem seção C — não forçar âncora escura onde não há conteúdo de peso
estratégico suficiente para justificar.

---

## 5. Regra geral para não recair no visual antigo

Continuam proibidos (do CLAUDE.md e design-system v1, reforçando aqui):
gradiente, glow, `backdrop-filter`/blur decorativo, sombra colorida,
animação de entrada chamativa, emoji. A seção tipo C **não é** um retorno ao
azul-ciano antigo — é a MESMA cor de acento do sistema atual (`#1B2A4A`),
usada em bloco sólido, sem gradiente nem glow, com tipografia idêntica ao
resto do site.

Teste rápido antes de aprovar qualquer página: tirar uma captura de tela e
converter para preto e branco. Se as seções ainda são visualmente
distinguíveis (não só pela cor, mas pelo peso/contraste), o ritmo está
correto. Se sumir tudo numa mancha cinza uniforme, ainda está monocromático
demais.

---

## 6. Ordem de execução

1. Adicionar os tokens novos ao `tokens.css` (seção 2).
2. Aplicar o padrão A/B/C na home primeiro — é a referência visual pras
   demais páginas.
3. Revisar e ajustar metodologia e serviços (já têm uso parcial de
   `--cor-acento`, só precisam do tratamento de card dentro da seção C).
4. Aplicar nas 6 landing pages de setor + índice de setores.
5. Aplicar em cases (índice + template + cases já publicados).
6. Aplicar em quem-somos, fale-conosco, blog.
7. Rodar o teste de grayscale (seção 5) em cada página antes de considerar
   concluído.
