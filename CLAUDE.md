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

## Direção visual (v3, aprovada pelo dono em 2026-10-15)

O visual "editorial e sóbrio" anterior foi abandonado a pedido do dono: não
convertia e não mostrava capacidade técnica. A direção atual é **escura,
tecnológica e dinâmica, com fotos em todas as páginas**, sem perder a
sobriedade do posicionamento. Referências citadas pelo dono: v4company.com,
helden.com.br, dasckup.com.

- **Cores** (tokens em `css/nucleo.css`, `:root`): fundo `#05070d`, azul
  elétrico `#2a63ff`, ciano `#3fd8ff` como apoio. Uma seção clara
  (`.secao--clara`, `#eef1f8`) quebra o ritmo (blog, corpo dos artigos).
- **Tipografia:** só duas famílias. Archivo (variável) para tudo, com títulos
  condensados via `font-stretch` (h1 em caixa alta); JetBrains Mono para
  rótulos técnicos (`.mono`). Não reintroduzir Playfair/Montserrat.
- **Fotos:** sempre com tratamento da marca (`.foto--azul`, `.foto--noite`,
  `.foto--grao`, `.visor`). Banco em `assets/fotos/` (Unsplash, créditos em
  `assets/fotos/CREDITOS.md`, 2 tamanhos: `nome.webp` 1600 px e
  `nome-p.webp` 800 px). Foto de banco nunca é apresentada como equipe ou
  cliente da Silvtech, nem ao lado de depoimento. Baixar fotos novas só com
  aprovação do dono, lote a lote.
- **Permitido agora:** degradês da marca, brilho azul, vidro
  (`backdrop-filter`), revelar ao rolar, parallax leve no mouse, faixa de
  logos em loop, rede animada no topo da home.
- **Regras de movimento:** o conteúdo nunca depende de JS para aparecer
  (`.revelar` só esconde quando `html.js-anima` existe, e há uma checagem de
  rolagem de reserva); respeitar `prefers-reduced-motion`; `?estatico` no
  endereço desliga as animações (usado nas capturas de tela).
- **Prova social:** logos de clientes (`assets/clientes/`, versões brancas).
  **Sem cases e sem "cenário ilustrativo"**: o dono removeu as páginas Cases
  e Setores em 2026-10-15 (tiravam credibilidade / pesavam o site). Não
  recriar sem pedido. Nada de números ou resultados inventados.

---

## Como o site é montado

- HTML/CSS/JS puro, sem framework. `css/nucleo.css` + `js/nucleo.js` em
  todas as páginas, mais um CSS (e às vezes um JS) por página: `inicio`,
  `quem-somos`, `servicos`, `metodologia`, `fale-conosco`, `blog`,
  `provedores-sites`.
- **Partes repetidas** (head comum com fontes/Pixel/GA, cabeçalho, menu,
  rodapé, logos, listas do blog) ficam entre marcadores
  `<!-- @nome --> ... <!-- /@nome -->` e são preenchidas por:

      node ferramentas/montar.mjs

  Editar textos em `ferramentas/parciais/*.html` e rodar o script. Nunca
  editar o conteúdo entre marcadores direto na página (é sobrescrito).
- **Blog:** a lista de posts é `ferramentas/posts.json` (o primeiro é o mais
  recente). Post novo: copiar `ferramentas/modelo-post.html` para
  `blog/posts/<slug>.html`, acrescentar no topo do `posts.json`, rodar
  `montar.mjs`. Home, lista do blog, "Continue lendo" e `sitemap.xml` se
  atualizam sozinhos. Imagem de compartilhamento do post em
  `assets/capas/<slug>.jpg` (gerada com `ferramentas/capa-compartilhamento.html`,
  no mesmo padrão visual dos posts); páginas usam `assets/compartilhar.jpg`.
- **Formulário:** `js/contato.js`, via EmailJS (campos `from_name`,
  `company_name`, `from_email`, `whatsapp`, `message`). Ao enviar, dispara
  `generate_lead` (GA4) e `Lead` (Meta Pixel). O configurador da home leva a
  `/fale-conosco.html?desafio=...&setor=...`, que pré-preenche o formulário.
- **Publicação:** push no `main` → GitHub Actions envia por FTP para a
  HostGator (`.github/workflows/deploy.yml`). `ferramentas/`, `.github/` e
  `*.md` não sobem. Push = site no ar: só com ok do dono.

---

## Antes de considerar qualquer entrega pronta

- Isso transmite organização e segurança, ou tenta convencer?
- Existe algum termo da lista proibida, mesmo em nome de classe/variável/
  comentário de código?
- A seção de metodologia (se houver) bate com S.C.A.L.E: 4 etapas, essa
  ordem?
- Algum número, resultado, case ou depoimento inventado?
- O conteúdo aparece sem JS e com movimento reduzido?
- Rodou `node ferramentas/montar.mjs` e conferiu computador e celular?
