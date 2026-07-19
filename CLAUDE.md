# Silvtech — Contexto do Projeto (site institucional)

Este arquivo é lido automaticamente no início de cada sessão. Ele existe para
que qualquer trabalho de código neste repositório — bugs, performance, UI —
respeite o posicionamento de marca da Silvtech. Trate as regras abaixo como
não-negociáveis, no mesmo nível de prioridade que corretude técnica.

---

## Quem é a Silvtech

Empresa de **marketing orientado por estratégia**. Não é agência tradicional,
não é empresa de tráfego pago, não é social media, não é consultoria, não é
aceleradora. O trabalho começa entendendo o negócio do cliente antes de propor
qualquer tática ou ferramenta.

**Tagline oficial (deve aparecer em metadata, títulos e pontos-chave de
comunicação):** "Marketing orientado por estratégia"

**Como a marca quer ser percebida:** séria, organizada, inteligente,
confiável, ética, competente, parceira. Entende de negócios antes de falar de
marketing.

**Como a marca NÃO quer ser percebida:** que promete milagres, que exagera
resultados, que vende hype, que fala difícil pra parecer inteligente, que
tenta impressionar.

**Cliente ideal (ICP):** empresas B2B com mentalidade de crescimento — SaaS,
energia solar, telecom, indústria, clínicas, segurança eletrônica. Não
procuram atalho, procuram direção. Rejeitam comunicação emocional/vendedora;
respondem a clareza e competência demonstrada.

---

## Metodologia oficial: S.C.A.L.E

Único framework válido. Qualquer seção do site que descreva "etapas do
processo" precisa refletir exatamente estas 4, nesta ordem — nunca inventar
uma sequência paralela (ex.: a home atual tem uma seção "framework" com 6
etapas diferentes; isso é um bug de conteúdo, não uma segunda metodologia):

1. **SCAN** — diagnóstico profundo do negócio, mercado, concorrência,
   processos, comunicação.
2. **CREATE** — construção: prioridades, cronograma, campanhas, conteúdo,
   processos.
3. **AMPLIFY** — execução integrada (marketing + comunicação + conteúdo +
   publicidade + relacionamento funcionando como um sistema).
4. **LEVERAGE** — acompanhamento contínuo, correção de desvios, melhoria.

---

## Termos proibidos (bloquear em qualquer copy, comentário de código, nome de

classe/variável, texto alt, título de página)

Growth Hacker, Growth Ninja, Hack, Segredo, Método secreto, Escala
exponencial, Resultado garantido, Fórmula, Explodir vendas, Marketing
científico, Disruptivo, Revolucionário, Data Driven Growth, Transformar /
Transforme, qualquer percentual ou métrica inventada (ex.: "aumente em
300%", "ROI de 200%"), "Maior agência", "Melhor agência", "Líder absoluta",
"Especialistas em tudo", "7 dígitos", "8 dígitos".

**Vocabulário preferido:** estratégia, organização, processos, planejamento,
posicionamento, clareza, evolução, crescimento sustentável, marketing
corporativo, marketing orientado pelo negócio, tomada de decisão, eficiência,
resultados consistentes.

**Tom de voz:** simples, direto, objetivo, elegante, corporativo, humano,
profissional. Frases curtas. Sem excesso de adjetivo. Sem promessa de prazo
específico a menos que seja garantidamente cumprível.

---

## Direção visual do rebranding (em execução)

O site está migrando de uma identidade "startup de growth hacking" (gradiente
azul-ciano, glassmorphism, glow, animações constantes) para uma identidade
editorial e sóbria, alinhada ao posicionamento acima. Ao mexer em qualquer
CSS/HTML, seguir esta direção — não reintroduzir o padrão antigo:

- **Paleta reduzida.** Preto/grafite + off-white + um único acento sóbrio
  usado com parcimônia (nunca em gradiente, nunca como glow).
- **Zero gradientes coloridos, zero glassmorphism (`backdrop-filter: blur`),
  zero `box-shadow` com cor de marca (glow).** Sombras discretas neutras ou
  nenhuma.
- **Tipografia:** Playfair Display para títulos (sem `background-clip: text`
  com gradiente) pareada com UMA sans neutra. Descartar a terceira família
  (o projeto tem 3 famílias carregadas hoje — Lexend Deca, Montserrat,
  Playfair Display — isso deve virar 2).
- **Animações mínimas.** Fade curto (~200ms) no máximo. Nada de infinito,
  nada de bounce/scale/tilt em hover. Sempre respeitar
  `prefers-reduced-motion` (hoje só `header.css` trata isso — estender pra
  todo o CSS).
- **Espaçamento generoso, grid editorial.** Menos seções competindo por
  atenção na home.

---

## Bugs conhecidos (prioridade de correção antes de qualquer refino visual)

### 1. Posts do blog não aparecem no mobile real (crítico)

Causa raiz identificada em `blog.js`:

```js
document.querySelectorAll(".post, section, .blogs").forEach((el) => {
  el.classList.add("reveal"); // aplica opacity:0 via CSS
  observer.observe(el); // só volta a opacity:1 quando IntersectionObserver dispara
});
```

A classe `.reveal` (CSS) zera `opacity` e depende do `IntersectionObserver`
pra reverter via `.active`. Em Safari mobile real (não no emulador de
DevTools) essa combinação, junto com `overflow-x: hidden` no `body` e
`rootMargin: "0px 0px -50px 0px"`, frequentemente não dispara pra elementos
abaixo da dobra inicial — os posts ficam permanentemente invisíveis.

Problema estrutural adicional: no HTML do blog, todos os posts estão dentro
de um único `<div class="post">` — deveriam ser `<article class="post">`
individuais. O seletor `.post:nth-child(even)` nunca funciona hoje porque não
há múltiplos irmãos `.post`.

**Correção esperada:** refatorar cada post pra `<article class="post">`
próprio + revisar (ou remover) a dependência de `IntersectionObserver` pra
visibilidade — usar CSS puro com fallback visível por padrão, animação como
progressive enhancement, nunca como gate de visibilidade.

### 2. Posts despublicados ainda linkados

`growth-hacking.html` e `estrategias-growth-hacking.html` foram despublicados
mas continuam:

- Linkados em `index.html` (raiz) e em `blog/index.html`.
- Presentes no repositório (arquivos ainda existem).
  Ação: remover os links de todas as páginas que os referenciam, remover (ou
  redirecionar 301) os arquivos, e conferir `sitemap.xml` / `robots.txt` pra
  garantir que não fiquem indexados.

### 3. Copy com termos banidos já no ar

- `blog.js`: typewriter alterna texto incluindo "Estratégias que
  **Transformam** Negócios" e "**Growth Hacking** para Empresas".
- Nome de classe `BlogRevolucionario` em `blog.js` — renomear.
- `header.js`: CTA mobile usa emoji + "🚀 Solicitar Consultoria",
  inconsistente com o CTA desktop "Solicitar Diagnóstico".
- `header.html`: alt do logo é "Silvtech - Marketing de Performance" —
  desatualizado, trocar por algo alinhado à tagline oficial.
- `index.html` `<title>`: "Assessoria de Marketing orientado por
  estratégias." — "Assessoria" enfraquece posicionamento, plural errado.
  Corrigir para algo como "Silvtech | Marketing orientado por estratégia".
- Seção "framework" da home com 6 etapas contradiz o S.C.A.L.E oficial
  (4 etapas) — ver seção de metodologia acima.
- "Implementação da equipe em 7 dias" — promessa de prazo específico;
  verificar se é garantida antes de manter.

### 4. `header.html` / `footer.html` são documentos HTML completos

Ambos têm `<!doctype>`, `<html>`, `<head>`, `<body>` e são injetados via
`fetch().then(el.innerHTML = data)`. Isso é HTML inválido (documento dentro
de documento) e faz o Google Fonts ser carregado duas vezes (uma no
`<head>` da página, outra dentro do footer). Corrigir para fragmentos HTML
puros (sem doctype/html/head/body), com CSS/JS já linkados uma única vez na
página principal.

---

## Problemas de performance (causa da nota baixa em PageSpeed/Lighthouse)

Ordem de impacto, do maior pro menor:

1. **Nenhum script tem `async`/`defer`.** Todos bloqueiam o parse do HTML.
2. **Header e footer carregam via `fetch()` inline, depois do HTML já ter
   sido processado** — isso atrasa o LCP e causa layout shift grande (o
   header "pisca" depois do resto da página já estar visível).
3. **Font Awesome completo (`all.min.css`, ~100KB)** carregado via CDN pra
   uso de ~20 ícones. Trocar por SVG inline ou subset.
4. **3 famílias de fonte, todos os pesos (`100..900` incluindo itálico)**
   carregadas via Google Fonts, sem `preload`, e carregadas duas vezes
   (index + footer). Cortar para 2-3 pesos por família realmente usados.
5. **Zero imagens com `loading="lazy"`.** 31 `<img>` no index, 12 no
   blog/index — nenhuma lazy.
6. **Todas as imagens em `.png`.** Migrar para WebP (30-50% menor).
7. **Carrossel de logos duplica 10 imagens manualmente no HTML** pra
   simular loop infinito — 20 imagens carregando na home só por isso.
   Resolver via CSS ou clone via JS, não duplicação manual no markup.
8. **Vídeo autoplay sem controle de preload**
   (`marekting_video.mp4` — atenção: nome do arquivo tem typo) carrega no
   mobile mesmo antes do usuário rolar até a seção. Adicionar
   `preload="none"` no mínimo, ou lazy-load do vídeo.
9. **CSS não minificado**, arquivos grandes (`home.css` ~32KB,
   `servicos.css` ~40KB) sem code splitting por página.
10. **`background-attachment: fixed`** no hero da home — notoriamente lento
    em Safari mobile, contribui pra jank de scroll.
11. **Animações infinitas rodando sempre** (`pulseGlow`, `float`) mesmo fora
    de viewport — consroem CPU/bateria sem necessidade.

---

## Convenções já existentes no projeto (manter consistência)

- HTML/CSS/JS vanilla, sem framework/bundler. Cada página tem seu próprio
  `.css` e `.js` (ex.: `home.css`/`home.js`, `metodologia.css`/`metodologia.js`).
- Header e footer são parciais compartilhados, injetados via `fetch()` em
  cada página (ver bug #4 acima sobre a estrutura desses arquivos).
- Paths de asset variam por profundidade de pasta (`./assets/...` na raiz,
  `../assets/...` dentro de `/blog/`) — atenção ao mexer em arquivos que
  vivem em pastas diferentes.
- Google Fonts, Font Awesome via CDN, Meta Pixel no footer, EmailJS para
  formulários (`emailjs-integration.js`).

---

## Antes de considerar qualquer entrega pronta

Passar pelo checklist do manual da marca:

- Isso transmite organização e segurança, ou tenta convencer?
- Existe algum termo da lista proibida, mesmo em nome de classe/variável/
  comentário de código?
- A seção de metodologia (se houver) bate com S.C.A.L.E — 4 etapas, essa
  ordem?
- A mudança resolve o problema técnico sem reintroduzir gradiente/glow/
  glassmorphism/animação excessiva?
