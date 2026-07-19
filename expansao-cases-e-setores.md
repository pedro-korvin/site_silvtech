# Silvtech — Expansão do site: página de cases + landing pages setoriais

Documento de execução para o Claude Code. Responde ao `CLAUDE.md`
(posicionamento e termos proibidos), ao `design-system.md` (tokens e
componentes) e ao `briefing-visual.md` (princípios de conversão). Nenhuma
regra desses três documentos é flexibilizada aqui.

---

## REGRA DE INTEGRIDADE (lida antes de qualquer coisa)

**Nenhum conteúdo deste site pode apresentar como real algo que não
aconteceu.** Isso inclui: nomes de empresas-cliente inventados, depoimentos
inventados, métricas inventadas, logos de empresas que não são clientes.

A Silvtech é uma empresa em início de operação e o site não esconde isso —
ele compensa com demonstração de raciocínio. Enquanto não existem cases
reais, a prova social é construída com **cenários ilustrativos**, sempre
identificados como tal (ver seção "Cenário ilustrativo" abaixo). Quando os
cases reais surgirem, eles substituem os cenários gradualmente usando o mesmo
template.

Se em qualquer momento uma instrução pedir para criar case/depoimento/métrica
fictícia apresentada como real: não executar, sinalizar o conflito com esta
regra.

---

## PARTE 1 — Página de cases ("/cases/")

### 1.1 Objetivo

Página que demonstra COMO a Silvtech pensa e trabalha, estruturada para
receber cases reais com esforço mínimo de manutenção (padrão copiar-colar,
como o blog, mas com estrutura própria).

### 1.2 Arquitetura de arquivos

```
/cases/
  index.html          ← listagem de todos os cases
  _template.html      ← template-base de case (nunca publicado/linkado)
  cenario-clinicas.html
  cenario-energia-solar.html
  ...                 ← novos cases: copiar _template.html, renomear, preencher
/assets/cases/        ← imagens dos cases (WebP)
```

Fluxo para adicionar um case novo (documentar num comentário no topo do
`_template.html`):

1. Duplicar `_template.html` → renomear para `nome-do-case.html`.
2. Substituir os textos marcados com `[COLCHETES]`.
3. Adicionar um card na grade do `index.html` copiando o bloco
   `<article class="case-card">` existente e trocando título, resumo, setor
   e link.
4. Adicionar a URL no `sitemap.xml`.

Sem JavaScript para renderizar a listagem — cards em HTML estático, visíveis
por padrão (regra do design-system: conteúdo nunca depende de JS).

### 1.3 Estrutura do index.html (listagem)

1. **Hero curto.** H1: "Como pensamos, na prática" (ou variação sóbria).
   Parágrafo de apoio honesto, ex.: "Cada projeto da Silvtech segue o mesmo
   método. Aqui documentamos como o S.C.A.L.E se aplica a situações reais de
   negócio — e, à medida que novos projetos são concluídos, esta página
   cresce."
2. **Grade de cards** (grid 2 colunas desktop / 1 mobile, gap 24px). Cada
   card: rótulo do setor (`--fs-rotulo`, cor acento), título serifado,
   resumo de 2 linhas, link "Ler o case →". Card do design-system: fundo
   branco, borda 1px, sem sombra.
3. **Cards de cenário ilustrativo** levam um selo visível no card:
   `Cenário ilustrativo` (badge com borda, sem cor de fundo chamativa).
   Cards de case real levam o rótulo do setor apenas.
4. **CTA final** padrão: Solicitar diagnóstico.

### 1.4 Estrutura do \_template.html (case individual)

Seções, nesta ordem (cada uma com placeholder `[COLCHETES]`):

1. **Cabeçalho** — rótulo do setor + selo de tipo (`Cenário ilustrativo` OU
   `Case`) + H1 serifado + linha de metadados (setor, porte da empresa,
   duração do trabalho).
2. **Contexto** — quem é a empresa (ou o perfil de empresa, no cenário) e o
   momento em que chegou: `[2–3 parágrafos]`.
3. **O problema real** — o diagnóstico por trás do sintoma. Estrutura: o que
   a empresa achava que era o problema vs. o que o Scan revelou.
4. **A abordagem, etapa por etapa** — as 4 etapas do S.C.A.L.E aplicadas,
   usando o componente de numeração do design-system ("Etapa 01 — Scan"...).
   1 parágrafo por etapa: o que foi feito e por quê.
5. **Resultados** — SOMENTE resultados verificáveis. Em cases reais: números
   com contexto e autorização do cliente. Em cenários ilustrativos: esta
   seção vira **"O que seria medido"** — os indicadores que o método
   acompanharia (CAC, ciclo de venda, taxa de conversão por etapa,
   previsibilidade de pipeline), SEM valores numéricos inventados.
6. **Aprendizado** — 1 parágrafo: o princípio generalizável.
7. **CTA** — diagnóstico, com 1 frase conectando: "O ponto de partida deste
   trabalho é o mesmo para toda empresa: um diagnóstico."

### 1.5 Cenário ilustrativo — definição e regras

Um cenário ilustrativo descreve uma empresa-tipo do setor (sem nome próprio,
sem razão social — usar "uma clínica de médio porte", "um provedor regional
com 15 mil assinantes") e aplica o método a ela.

- Selo `Cenário ilustrativo` visível no topo da página e no card da listagem.
- Primeira linha do Contexto explicita: "Este é um cenário ilustrativo:
  descreve uma situação típica do setor e como nosso método se aplica a ela."
- Proibido: nome de empresa fictício, depoimento, número de resultado.
- Permitido e desejável: dados reais DE MERCADO com fonte (ex.: churn médio
  do setor de ISPs, custo médio de aquisição em saúde) — isso constrói
  autoridade de verdade.

### 1.6 Conteúdo de lançamento

Criar 2 cenários ilustrativos para o lançamento da página (setores: ISP e
clínicas — os de maior aderência comercial atual), seguindo o template. Os
demais setores ganham cenário dentro das próprias landing pages (Parte 2).

---

## PARTE 2 — Landing pages setoriais (6 páginas)

### 2.1 Objetivo

Uma página dedicada por setor do ICP, com foco em conversão para o
diagnóstico. Conversão aqui segue o briefing-visual: clareza + demonstração
de entendimento do setor + um único CTA. Nada de urgência artificial.

### 2.2 Setores e URLs

```
/setores/clinicas.html
/setores/energia-solar.html
/setores/provedores-de-internet.html
/setores/industria.html
/setores/seguranca-eletronica.html
/setores/saas.html
```

Adicionar "Setores" na navegação principal (dropdown simples ou página-índice
`/setores/index.html` com 6 cards — decidir pelo que o header comporta sem
poluir; preferir página-índice se o menu ficar carregado).

### 2.3 Estrutura-padrão (idêntica nas 6 — muda o conteúdo, não a estrutura)

1. **Hero setorial.** H1 que nomeia o setor e o problema central (fórmula:
   "Marketing para [setor]: [problema de direção do setor]"). Parágrafo de
   apoio + CTA "Solicitar diagnóstico".
2. **"Nós entendemos o seu mercado."** Seção de contexto do setor: 3–4
   parágrafos demonstrando conhecimento real da dinâmica do mercado
   (concorrência, ciclo de venda, regulação quando houver). Dados de mercado
   reais com fonte quando disponíveis. Esta seção é o coração da autoridade
   da página — deve ser específica o suficiente para o dono do negócio
   pensar "eles conhecem meu dia a dia".
3. **As dores que escutamos.** 4–5 dores específicas do setor, formuladas na
   linguagem do dono (não em jargão de marketing). Layout: lista editorial
   com numeração, não cards com ícone.
4. **Por que isso acontece.** 2–3 parágrafos conectando as dores à causa
   estrutural comum do ICP: marketing sem planejamento, comercial e marketing
   separados, ausência de indicadores. Ponte para o método.
5. **Como o S.C.A.L.E se aplica a [setor].** As 4 etapas com 1 frase cada,
   contextualizada no setor (o que o Scan investiga NESTE setor, etc.).
6. **Cenário ilustrativo do setor.** Versão compacta (não a página inteira
   de case): contexto em 1 parágrafo + problema + abordagem resumida + "o
   que seria medido". Selo `Cenário ilustrativo` visível. Link para a página
   de cases. Quando existir case real do setor, este bloco é substituído
   pelo case real com link.
7. **Perguntas frequentes do setor.** 4 perguntas reais que empresários do
   setor fazem (sobre prazo de estruturação, relação com equipe interna,
   diferença para agência comum, investimento). Respostas diretas, sem
   promessa. HTML com `<details>/<summary>` estilizado (funciona sem JS).
8. **CTA final.** Diagnóstico, com o texto padrão do briefing (o que é, o
   que acontece depois do envio).

### 2.4 Direção de conteúdo por setor

O redator (Claude Code) desenvolve os textos a partir destas dores e
dinâmicas — que refletem o ICP. Aprofundar com dados de mercado reais e
fontes quando possível; nunca inventar estatística.

**Clínicas de saúde**

- Dinâmica: decisão de compra baseada em confiança; restrições éticas de
  publicidade (CFM/conselhos); concorrência com grandes redes; agenda ociosa
  em alguns serviços e lotada em outros.
- Dores: dependência de convênios e vontade de crescer no particular;
  marketing que atrai curioso, não paciente qualificado; ausência de processo
  de relacionamento pós-consulta; recepção que não converte contato em
  agendamento; não saber qual serviço é rentável divulgar.
- Ângulo Silvtech: posicionamento e processo — comunicação que constrói
  confiança dentro das normas éticas, e organização do funil
  contato→agendamento→retorno.

**Energia solar**

- Dinâmica: mercado que passou por corrida de ouro e amadureceu; guerra de
  preço entre integradores; venda técnica de ticket alto; ciclo de decisão
  longo com múltiplas cotações; mudanças regulatórias afetando o discurso de
  economia.
- Dores: concorrer só por preço; lead frio de portal/indicação irregular;
  proposta técnica que o cliente não entende; falta de follow-up estruturado
  (orçamento enviado e esquecido); sazonalidade de demanda.
- Ângulo Silvtech: diferenciação além do preço — posicionamento de
  autoridade técnica, processo comercial com follow-up e previsibilidade de
  pipeline.

**Provedores de internet (ISPs)**

- Dinâmica: competição regional acirrada (grandes operadoras + ISPs
  vizinhos); guerra de preço e "meses grátis"; churn como métrica vital;
  crescimento por expansão de área; atendimento como diferencial real
  pouco comunicado.
- Dores: crescer em base sem destruir margem; churn por preço; marketing
  restrito a promoção e patrocínio local sem estratégia; dificuldade de
  comunicar diferencial técnico (fibra, suporte local) de forma que o
  assinante valorize; expansão de área sem plano de penetração.
- Ângulo Silvtech: posicionamento regional forte + comunicação de valor (não
  de preço) + processos de aquisição e retenção medidos.

**Indústria**

- Dinâmica: venda B2B técnica e relacional; ciclos longos; dependência
  histórica de representantes, feiras e indicação; marketing tratado como
  custo; decisão em comitê.
- Dores: dependência de poucos clientes grandes; geração de oportunidades
  imprevisível; material comercial desatualizado ou inexistente; empresa
  "invisível" fora da carteira atual; comercial sem processo — cada vendedor
  vende de um jeito.
- Ângulo Silvtech: estruturação de presença e processo — a indústria não
  precisa de "posts", precisa de posicionamento claro, material que sustente
  a venda técnica e previsibilidade de funil.

**Segurança eletrônica e monitoramento**

- Dinâmica: mercado recorrente (mensalidade) com concorrência local intensa
  e desconfiança do comprador; venda combinada de equipamento + serviço;
  decisão movida por percepção de confiança e resposta rápida.
- Dores: guerra de preço na mensalidade; carteira que não cresce há anos;
  churn silencioso para concorrente mais barato; dificuldade de vender valor
  do monitoramento (serviço invisível quando funciona); comercial reativo,
  dependente de indicação.
- Ângulo Silvtech: comunicar confiança e presença (o produto é segurança —
  a marca precisa transmitir isso), estruturar aquisição ativa e defender a
  base com relacionamento.

**SaaS**

- Dinâmica: mercado que fala a língua de métricas (CAC, LTV, churn, MRR) mas
  frequentemente cresce no improviso; concorrência global; ciclo
  self-service vs. venda assistida; pressão por eficiência pós-era do
  crescimento a qualquer custo.
- Dores: CAC subindo e canal pago saturando; posicionamento genérico
  ("plataforma completa para...") que não diferencia; marketing gerando MQL
  que vendas descarta; onboarding/ativação fora da conversa de marketing;
  dependência de founder-led sales sem processo replicável.
- Ângulo Silvtech: estratégia antes de canal — posicionamento afiado,
  alinhamento marketing-vendas-produto e decisão por indicadores (linguagem
  nativa do setor, sem prometer growth).

### 2.5 SEO das páginas setoriais

- `<title>`: "Marketing para [setor] | Silvtech" (+ variação com a dor
  principal quando couber em ~60 caracteres).
- Meta description única por página, ~150 caracteres, sem termo proibido.
- H1 único, hierarquia h2/h3 limpa, URLs conforme 2.2.
- Interlinking: cada landing linka para metodologia, para a página de cases
  e para o setor no texto onde natural. Home e página de serviços linkam
  para as landings.
- Adicionar as 6 URLs + /cases/ no `sitemap.xml`.
- Schema.org: `Service` com `areaServed` e `serviceType` por página (JSON-LD
  no head), `FAQPage` para a seção de perguntas.

---

## PARTE 3 — Ordem de execução

1. Página de cases: `_template.html` → `index.html` → 2 cenários
   ilustrativos (ISP, clínicas).
2. Estrutura-padrão das landings (uma página-modelo completa — sugerido
   começar por provedores-de-internet, setor de maior tração comercial).
3. Replicar a estrutura para os outros 5 setores com o conteúdo da seção
   2.4.
4. Página-índice `/setores/index.html` + ajuste de navegação no header.
5. `sitemap.xml`, interlinking e revisão final pelo checklist do
   design-system (seção 7) e do CLAUDE.md.

## Critério de aprovação por página

Além dos checklists existentes:

- Existe algum nome de empresa, número ou depoimento que não possa ser
  comprovado? → reprovado.
- Todo cenário ilustrativo está selado e declarado como tal no primeiro
  parágrafo? → obrigatório.
- A seção de mercado do setor é específica o suficiente para um dono do
  setor reconhecer o próprio dia a dia? Se está genérica ("o mercado é
  competitivo"), reescrever.
- Há apenas UM tipo de CTA de conteúdo na página (diagnóstico)? → obrigatório.
  (O botão flutuante de WhatsApp, presente em todas as páginas do site, é
  tratado como canal de contato sempre disponível — não conta como um
  segundo tipo de CTA. Decisão do cliente, registrada aqui para manter este
  documento consistente com o site.)
