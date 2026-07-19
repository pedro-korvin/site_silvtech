# Silvtech — Briefing do novo visual do site

Este documento define **o que o novo site precisa comunicar e como cada página
deve fazer isso**. O `design-system.md` define os materiais (cores, tipos,
espaçamentos); este briefing define a intenção. Os dois andam juntos e ambos
respondem ao `CLAUDE.md`.

---

## 1. O problema que o redesign resolve

O site atual tem a estética de uma agência de growth hacking: gradiente
azul-ciano, glassmorphism, glow, emojis, animações constantes, home com 9
seções competindo. Essa linguagem atrai o cliente errado e repele o certo.

O cliente ideal da Silvtech (dono de ISP, indústria, SaaS, clínica) não compra
de quem parece "mais uma agência digital". Ele compra de quem transmite o que
o ICP descreve: segurança, competência, organização, objetividade, clareza.
Ele desconfia de quem tenta convencer pela emoção — e o site atual tenta
convencer pela emoção o tempo inteiro.

**O redesign não é uma troca de roupa. É alinhar a primeira impressão ao
posicionamento: uma empresa que pensa antes de executar.**

## 2. Sensação-alvo

Quando o visitante certo abre o site, em 5 segundos ele deve pensar:

> "Essa empresa é séria. Sabe o que está fazendo. Não está tentando me vender
> nada — está me mostrando como pensa."

Referência mental: a sobriedade de uma consultoria estratégica (McKinsey,
Bain) com o calor editorial de uma publicação de negócios (The Economist,
Harvard Business Review). Não a frieza corporativa genérica; elegância com
personalidade tipográfica.

O que gera essa sensação, na prática:

- **Contenção.** Poucas cores, pouco movimento, poucas seções. Quem tem
  autoridade não precisa gritar.
- **Tipografia como protagonista.** A serifada nos títulos carrega o peso
  editorial. Não há mascote, ilustração 3D nem ícone colorido fazendo esse
  papel.
- **Espaço em branco generoso.** Ar entre seções comunica organização e
  calma — o oposto do site-panfleto.
- **Método visível.** O S.C.A.L.E aparece cedo e com destaque. É a prova de
  que existe processo, não improviso.

## 3. Princípios de conversão (alta conversão sem parecer vendedor)

Alta conversão para o ICP da Silvtech não vem de urgência, pop-up ou botão
pulsando. Vem de:

1. **Clareza imediata de proposta.** O h1 diz o que a Silvtech é e para quem,
   sem metáfora. Ninguém deve rolar a página para entender o que a empresa
   faz.
2. **Um CTA por página, repetido.** "Solicitar diagnóstico" é o único pedido.
   Aparece no header, após o método e no fim da página. Nada de newsletter +
   WhatsApp + formulário + simulador competindo.
3. **Prova sem exagero.** Logos de clientes reais e depoimentos reais (com
   nome e empresa). Se um depoimento não puder ser verificado, ele sai — a
   credibilidade do conjunto vale mais que a quantidade. Nunca inventar
   métrica.
4. **Demonstrar raciocínio antes de pedir contato.** O visitante do ICP
   decide devagar e compara. O site deve dar a ele material para concluir
   sozinho que a Silvtech pensa melhor que as alternativas — método explicado,
   diagnóstico como porta de entrada (não "orçamento"), conteúdo do blog
   alinhado.
5. **Reduzir atrito e medo, não criar pressão.** O formulário pede o mínimo
   (nome, empresa, contato, contexto). O texto ao redor explica o que
   acontece depois do envio — previsibilidade é valor central do ICP.

## 4. Arquitetura página a página

### Home (primeira a ser refeita — define o padrão)

Estrutura enxuta, nesta ordem:

1. **Hero.** H1 direto com o posicionamento + 1 parágrafo de apoio + CTA
   "Solicitar diagnóstico" + CTA secundário "Conhecer o método". Sem vídeo
   autoplay, sem carrossel, sem animação de entrada chamativa.
2. **Posicionamento em um parágrafo.** O que a Silvtech é / o que não é
   (linguagem do documento de posicionamento). Bloco tipográfico, sem card.
3. **S.C.A.L.E.** As 4 etapas com numeração ("Etapa 01 — Scan"...), uma frase
   por etapa, link para a página de metodologia. É a seção-assinatura do site.
4. **Serviços em resumo.** Os fronts de atuação em cards sóbrios, sem preço,
   sem emoji, sem tabs. Link para a página de serviços.
5. **Prova.** Logos de clientes (estáticos, em grade — sem carrossel
   infinito) e 1–2 depoimentos verificados.
6. **Insights.** 3 posts do blog, se o conteúdo estiver alinhado ao
   posicionamento.
7. **CTA final.** Repetição do diagnóstico, com o texto explicando o que o
   diagnóstico é e o que acontece depois.

**Sai da home:** framework de 6 etapas (contradiz o S.C.A.L.E),
growth-simulator, seção de planos e preços, newsletter, promessa de
"implementação em 7 dias" (a menos que seja garantida), qualquer emoji.

### Metodologia

A página mais importante depois da home para este ICP. Aprofunda cada etapa
do S.C.A.L.E: o que acontece, o que o cliente recebe, o que a etapa evita.
Tom de "como pensamos", não de "por que somos incríveis". CTA de diagnóstico
ao final conectando: o diagnóstico é a porta de entrada do Scan.

### Serviços

Organizar por problema de negócio que o serviço resolve, não por entregável.
O ICP não procura "social media" — procura "marketing e comercial trabalhando
juntos". Cada serviço: para quem é, que problema resolve, como se conecta ao
método. Sem preço público, sem comparativo de planos.

### Quem somos

História e visão com o tom do manual: humano, direto, sem autoelogio. Espaço
ideal para fotografia real (equipe, ambiente). Se não houver fotografia
própria ainda, manter tipográfico — não usar banco de imagem.

### Fale conosco

Formulário mínimo + expectativa clara de resposta (prazo e formato). Remover
qualquer depoimento não verificado. Sem múltiplos canais competindo: um
formulário, um telefone/WhatsApp discreto.

### Blog

Grade editorial simples (título serifado, data, resumo). Sem efeito
typewriter, sem hero animado. O conteúdo publicado precisa passar pelo filtro
do manual de conteúdo — post desalinhado despublicado vale mais que volume.

## 5. O que é proibido em qualquer página

Consolidado do CLAUDE.md e do design-system, para consulta rápida:

- Gradientes, glow, glassmorphism, blur decorativo.
- Animação infinita, bounce, tilt, typewriter, parallax, autoplay de vídeo.
- Emojis em qualquer superfície.
- Termos banidos do manual (Transformar, Disruptivo, Growth Hacking,
  Revolucionário, superlativos, métricas inventadas — lista completa no
  CLAUDE.md).
- Depoimento, logo ou número que não possa ser comprovado.
- Promessa de prazo ou resultado específico não garantido.
- Mais de um tipo de CTA por página.
- Conteúdo que só aparece se JavaScript rodar.

## 6. Ordem de execução recomendada

1. **Fundação:** criar `tokens.css` a partir do design-system (variáveis de
   cor, tipo, espaçamento) + refazer header e footer como fragmentos no novo
   padrão. Tudo herda disso.
2. **Home** completa no novo sistema (é o template mental das demais).
3. **Metodologia** (maior peso estratégico para o ICP).
4. **Serviços** (reescrita estrutural: de entregáveis para problemas).
5. **Fale conosco** (resolver depoimentos + formulário mínimo).
6. **Quem somos**.
7. **Blog** (índice + template de post).

Cada página entregue passa pelo checklist do design-system (seção 7) e pelo
checklist de copy do CLAUDE.md antes do commit.

## 7. Critério final

Antes de aprovar qualquer tela, a pergunta não é "está bonito?".

É: **"um dono de indústria que desconfia de agência olharia isso e pensaria
'essas pessoas são organizadas e sabem o que fazem'?"**

Se a resposta for sim, está no caminho. Se a tela precisar de efeito para
impressionar, está tentando convencer — e convencer não é o nosso jeito.
