# Silvtech — Blog: lote 2 (10 artigos, estrutura + conteúdo final)

Segue o mesmo padrão técnico do `blog-lote-1-hoje.md` (template de
`blog/posts/*.html`, `tokens.css`/`base.css`/`blog.css`, JSON-LD
`BlogPosting` + `BreadcrumbList`). O Claude Code deve encaixar o texto
abaixo no template — não reescrever, resumir ou reinterpretar.

---

## O que garante indexação e autoridade real (ler antes de publicar)

Isso não vem só do texto — depende de decisões técnicas consistentes em
todos os artigos:

1. **Autoria declarada.** Hoje o schema usa `"author": {"@type":
   "Organization", "name": "Silvtech"}`. Isso funciona, mas o Google dá mais
   peso a autoria de pessoa com expertise reconhecível (E-E-A-T: Experience,
   Expertise, Authoritativeness, Trustworthiness). **Decisão sua:** se
   houver uma pessoa (você ou outro sócio) disposta a assinar os artigos com
   nome, isso fortalece a indexação de verdade — mais do que qualquer ajuste
   de texto. Se não houver essa pessoa ainda, manter `Organization` é
   aceitável, só não é o ideal. Recomendo decidir isso antes de escalar o
   volume de artigos, porque trocar autoria depois em massa é retrabalho.
2. **Links de saída para fonte oficial (outbound authoritative links).**
   Artigos que citam lei ou norma (Fio B, CFM, LGPD) ganham credibilidade
   linkando para a fonte real (planalto.gov.br, portal do CFM, gov.br/anpd).
   Não fabriquei URL nenhuma aqui — **o Claude Code ou você precisa
   confirmar a URL oficial exata antes de publicar** e inserir como link de
   saída (`target="_blank" rel="noopener"`) no ponto do texto que cita a
   norma. Link de saída quebrado ou para fonte errada é pior que não linkar.
3. **Linkagem interna com âncora descritiva.** Nunca "clique aqui" — sempre
   o texto que descreve o destino (ex.: "veja como o Fio B mudou a venda de
   solar"). Já apliquei isso nos links internos indicados em cada artigo
   abaixo.
4. **Texto natural, sem repetição mecânica da palavra-chave.** Cada artigo
   já foi escrito variando a forma de mencionar o tema (sinônimos,
   reformulação), em vez de repetir a keyword exata várias vezes — é
   exatamente o padrão que o Google penaliza quando identifica intenção só
   de otimização.
5. **Datas reais no schema.** `datePublished`/`dateModified` devem refletir
   a data real de publicação (hoje, se for hoje) — nunca datas retroativas
   fictícias para simular histórico.

---

## Artigo 1 — SaaS (lacuna de baixa concorrência)

**Título:** Existe consultoria de marketing especializada em SaaS no Brasil?
**Slug:** `blog/posts/consultoria-marketing-saas-brasil.html`
**Palavra-chave alvo:** consultoria marketing saas brasil
**Meta description:** Antes de contratar marketing para o seu SaaS, entenda por que estratégias importadas dos EUA raramente encaixam no mercado brasileiro.
**Links internos:** `/setores/saas.html`, `/metodologia.html`

# Existe consultoria de marketing especializada em SaaS no Brasil?

A maior parte do conteúdo sobre marketing para SaaS que circula por aí foi
escrito pensando no mercado americano — outro ciclo de vendas, outro custo
de aquisição, outro comportamento de assinatura. Traduzir esse material
literalmente para uma operação brasileira costuma gerar mais frustração do
que resultado.

## O que muda no Brasil

O SaaS brasileiro convive com particularidades que raramente aparecem em
conteúdo internacional: ciclo de decisão mais longo em vendas B2B (o
comprador brasileiro ainda valoriza conversa humana antes de assinar),
concorrência com ferramentas internacionais que chegam com preço em dólar,
e um mercado onde "growth" virou sinônimo de queimar caixa em aquisição sem
processo — o que a maioria das startups descobriu, da forma mais difícil,
que não é sustentável.

## O erro de importar o manual pronto

Aplicar um funil pensado para o mercado americano — geralmente self-service,
cartão de crédito, pouco contato humano — a um comprador brasileiro que
espera reunião e negociação costuma gerar geração de leads que marketing
entrega e vendas descarta. O problema não é falta de tráfego. É
desalinhamento entre como o produto é vendido e como o mercado local
compra.

## Onde entra a estratégia antes do canal

O ponto de partida certo não é escolher a próxima ferramenta de automação
ou o próximo canal pago. É entender, com method, onde está o gargalo real:
geração de demanda, qualificação, ou alinhamento entre marketing e vendas.
Isso é diagnóstico — a etapa que qualquer processo sério de marketing
precisa vir primeiro, antes de qualquer execução.

Quer um diagnóstico real da sua operação de SaaS? [Solicitar diagnóstico]

---

## Artigo 2 — Institucional (lacuna de baixa concorrência)

**Título:** Existe agência de marketing que entende de negócio, não só de campanha?
**Slug:** `blog/posts/agencia-marketing-focada-em-negocios.html`
**Palavra-chave alvo:** agência de marketing focada em negócios
**Meta description:** A maioria das agências entrega campanha. Poucas entendem o negócio por trás dela antes de comunicar. Entenda por que essa diferença importa.
**Links internos:** `/metodologia.html`, `/quemsomos.html`

# Existe agência de marketing que entende de negócio, não só de campanha?

Pergunte a qualquer dono de empresa o que ele espera de uma agência de
marketing e a resposta quase sempre inclui "resultado". Pergunte o que ele
recebeu na última contratação e a resposta costuma ser diferente: posts,
anúncios, um relatório de alcance. Entre a expectativa e a entrega, existe
uma lacuna que a maioria do mercado não resolve.

## O problema de tratar marketing como execução isolada

Agências tradicionais costumam entrar direto na execução: criativo, mídia,
calendário de postagem. O que raramente acontece é uma etapa anterior —
entender como aquele negócio específico gera receita, onde está o gargalo
comercial, e o que precisa ser verdade para o marketing gerar impacto real
no caixa, não só em métrica de vaidade.

## Marketing como decisão de negócio, não como departamento de criação

Empresas que tratam marketing como parte da estratégia de negócio — e não
como um centro de custo terceirizado — tomam decisões diferentes: sabem por
que estão comunicando o que comunicam, entendem o papel de cada canal no
funil, e medem o que realmente indica crescimento sustentável, não apenas
engajamento.

## Isso é o que o método S.C.A.L.E tenta resolver

Scan, Create, Amplify, Leverage — as quatro etapas existem justamente para
garantir que nenhuma campanha comece sem entender o negócio por trás dela
primeiro. Não é sobre ter mais criatividade. É sobre ter direção antes de
executar.

Quer entender como isso se aplicaria à sua empresa? [Conhecer o método]

---

## Artigo 3 — Clínicas (estética + CFM)

**Título:** Marketing para clínica de estética: o que muda com as regras do CFM
**Slug:** `blog/posts/marketing-clinica-estetica-cfm.html`
**Palavra-chave alvo:** marketing para clínica de estética CFM
**Meta description:** A Resolução CFM 2.336/2023 abriu novas possibilidades de comunicação — mas a estética tem um cuidado a mais: o resultado visível pesa na avaliação ética.
**Links internos:** `/blog/posts/marketing-medico-o-que-e-permitido-2026.html`, `/setores/clinicas.html`

# Marketing para clínica de estética: o que muda com as regras do CFM

A medicina estética vive um paradoxo particular: é a especialidade onde o
paciente mais quer ver resultado visual antes de decidir — e é justamente
aí que a fiscalização ética costuma ser mais rigorosa.

## O que a nova resolução já permite

Como [detalhamos no artigo sobre o que a Resolução CFM 2.336/2023
permite](/blog/posts/marketing-medico-o-que-e-permitido-2026.html), a norma
autoriza imagens de "antes e depois" desde que respeitadas condições
específicas: autorização do paciente, anonimização e caráter educativo, sem
promessa de resultado igual para todos.

## Por que a estética pede um cuidado a mais

Em outras especialidades, o resultado do tratamento é menos visualmente
comparável. Na estética, a comparação é o próprio conteúdo — e isso amplia o
risco de o material ser interpretado como promessa, mesmo sem intenção. A
diferença entre "mostrar um caso real, de forma educativa" e "prometer o
mesmo resultado para quem contratar" costuma ser mais sutil do que parece,
e é exatamente onde acontece a maior parte dos questionamentos éticos do
setor.

## Uma comunicação que atrai sem prometer

Clínicas de estética que constroem autoridade de forma sustentável tendem a
investir em conteúdo educativo — explicando procedimentos, expectativas
realistas, cuidados pós-tratamento — em vez de depender exclusivamente de
imagens de resultado. Isso não é só mais seguro do ponto de vista ético. É
mais eficaz para atrair o paciente certo, que decide com informação, não só
com comparação visual.

## Isso é estratégia, não jurídico

Entender os limites da resolução é necessário, mas insuficiente. A pergunta
que realmente importa é: qual comunicação atrai o paciente certo para a
clínica, dentro do que é permitido e do que constrói reputação de longo
prazo? Essa resposta muda de clínica para clínica — e é por isso que
começa com diagnóstico, não com um modelo pronto.

Quer entender como isso se aplicaria à sua clínica? [Solicitar diagnóstico]

---

## Artigo 4 — Segurança Eletrônica (portaria remota)

**Título:** Portaria remota: como comunicar a solução sem parecer só mais uma franquia
**Slug:** `blog/posts/portaria-remota-como-vender-a-solucao.html`
**Palavra-chave alvo:** vender portaria remota
**Meta description:** Quase todo conteúdo sobre portaria remota vende a marca da franquia. Veja como comunicar a solução de forma independente, falando com quem decide de fato: o síndico.
**Links internos:** `/setores/seguranca-eletronica.html`, `/blog/posts/agencia-marketing-seguranca-eletronica-monitoramento.html`

# Portaria remota: como comunicar a solução sem parecer só mais uma franquia

Boa parte do conteúdo disponível sobre portaria remota foi produzido por
redes de franquia vendendo a própria marca — o texto fala do modelo de
negócio, não do problema real de quem decide contratar: o síndico ou a
administradora de condomínio.

## Quem decide, e o que essa pessoa realmente teme

O síndico não compra "tecnologia de portaria remota". Ele resolve um
problema concreto: reduzir custo de portaria 24h sem comprometer segurança,
e convencer uma assembleia — muitas vezes resistente a mudanças — de que a
solução funciona. Comunicação que fala de recursos técnicos sem antes
endereçar esse medo (perder segurança, ou parecer estar cortando custo às
custas da proteção dos moradores) tende a não converter, por melhor que seja
o produto.

## O argumento que costuma funcionar

Portaria remota bem comunicada não é vendida como "mais barata". É vendida
como "mais consistente" — sem falhas humanas de troca de turno, sem
ausência por doença ou férias, com registro de tudo. Esse enquadramento
responde diretamente à objeção que normalmente trava a decisão em
assembleia: a percepção de que menos gente no local significa menos
segurança.

## Da tecnologia à decisão em assembleia

Uma comunicação eficaz para esse setor precisa considerar todo o processo
de decisão — não só o síndico, mas os condôminos que vão votar a proposta.
Isso muda o que precisa ser comunicado, e como: material de apoio para
apresentação em assembleia costuma valer mais do que qualquer anúncio.

Quer estruturar essa comunicação para a sua empresa? [Solicitar diagnóstico]

---

## Artigo 5 — Segurança Eletrônica / SaaS (LGPD)

**Título:** LGPD e câmeras de segurança: o que muda na venda de monitoramento
**Slug:** `blog/posts/lgpd-cameras-seguranca-venda-monitoramento.html`
**Palavra-chave alvo:** LGPD aplicada a câmeras de segurança
**Meta description:** A LGPD trouxe exigências reais para quem instala câmeras e monitora ambientes. Como transformar conformidade em argumento de venda, em vez de obstáculo.
**Links internos:** `/setores/seguranca-eletronica.html`, `/setores/saas.html`

# LGPD e câmeras de segurança: o que muda na venda de monitoramento

Imagem captada por câmera é dado pessoal — e a LGPD trata isso como tal.
Para empresas de segurança eletrônica e monitoramento, isso não é só uma
questão jurídica de fundo. É algo que aparece na conversa comercial, cada
vez com mais frequência.

## O que a lei exige, na prática

Instalação de câmeras precisa de finalidade clara (segurança, não
vigilância genérica), aviso visível de que o ambiente está sendo
monitorado, base legal para o tratamento da imagem, e política definida de
por quanto tempo essa gravação é retida e quem tem acesso a ela. Empresas
de monitoramento que prestam esse serviço para terceiros — condomínios,
comércios, indústrias — também respondem, em alguma medida, pela forma como
orientam o cliente a usar o sistema.

## Por que isso vira argumento de venda, não só obrigação

Clientes cada vez mais informados perguntam sobre isso antes de contratar —
principalmente em ambientes com maior exposição jurídica, como condomínios e
empresas com muitos funcionários. A empresa de monitoramento que já chega
com uma resposta estruturada sobre como orienta o cliente a cumprir a LGPD
sai na frente de quem trata o tema como incômodo a ser evitado na
conversa.

## Transformar conformidade em confiança

Não é sobre virar especialista jurídico. É sobre incorporar, na
comunicação comercial, que a empresa entende as implicações do serviço que
vende — o que constrói exatamente o tipo de confiança que esse mercado
depende para crescer além da indicação.

Quer estruturar essa comunicação para a sua empresa? [Solicitar diagnóstico]

---

## Artigo 6 — Institucional (S.C.A.L.E como resposta)

**Título:** Por que seu marketing parou de dar resultado (antes de gastar mais em anúncio)
**Slug:** `blog/posts/como-escalar-resultados-de-marketing.html`
**Palavra-chave alvo:** como escalar resultados de marketing
**Meta description:** Se aumentar o investimento em anúncio parou de trazer retorno proporcional, o problema raramente é o anúncio. Entenda o que costuma travar o crescimento.
**Links internos:** `/metodologia.html`, `/servicos.html`

# Por que seu marketing parou de dar resultado (antes de gastar mais em anúncio)

É um padrão comum: o marketing funcionava, os resultados vinham, e em algum
momento o crescimento estagnou. A reação mais frequente é aumentar o
investimento em anúncio — e descobrir que isso não resolve, só encarece o
mesmo resultado.

## O sintoma não é a causa

Quando o retorno por real investido cai, a tentação é tratar isso como
problema de mídia: trocar de plataforma, ajustar segmentação, testar novo
criativo. Na maioria dos casos, o que travou o crescimento está em outro
lugar: posicionamento que não diferencia mais a empresa da concorrência,
processo comercial que não absorve o volume de leads gerado, ou
comunicação que atrai o público errado com eficiência cada vez maior.

## Anunciar mais não resolve um problema de direção

Aumentar investimento em um canal que já não converte bem tende a piorar a
métrica, não melhorar — o algoritmo de qualquer plataforma de anúncio
otimiza para o que já está configurado, incluindo os erros de
direcionamento. É por isso que o primeiro passo, antes de qualquer ajuste
de mídia, precisa ser diagnóstico: entender exatamente onde o funil está
perdendo eficiência.

## Isso é o que o S.C.A.L.E resolve

Scan identifica onde está o gargalo real. Create redesenha a estratégia em
cima do que foi identificado — não do que "todo mundo está fazendo".
Amplify executa de forma integrada, com marketing e comercial trabalhando a
partir da mesma informação. Leverage acompanha os indicadores certos para
corrigir antes que o problema volte a crescer.

Quer entender onde está o gargalo do seu marketing? [Solicitar diagnóstico]

---

## Artigo 7 — Indústria (LinkedIn Ads)

**Título:** Vale a pena anunciar maquinário e produtos industriais no LinkedIn?
**Slug:** `blog/posts/linkedin-ads-para-industria.html`
**Palavra-chave alvo:** linkedin ads para indústria
**Meta description:** LinkedIn Ads pode funcionar para venda industrial B2B — mas não do mesmo jeito que funciona para SaaS. Entenda quando faz sentido e quando não faz.
**Links internos:** `/setores/industria.html`, `/blog/posts/reforma-tributaria-impacto-industria-b2b.html`

# Vale a pena anunciar maquinário e produtos industriais no LinkedIn?

A pergunta aparece com frequência entre empresas industriais que veem
concorrentes SaaS obtendo resultado com LinkedIn Ads e se perguntam se
funcionaria para vender maquinário, insumos ou equipamentos industriais.
A resposta curta: pode funcionar, mas exige expectativa diferente da que
funciona para software.

## Por que a lógica muda para venda industrial

Compra industrial é decidida em comitê, com ciclo de venda que costuma
levar meses e envolver engenharia, compras e diretoria ao mesmo tempo.
LinkedIn Ads segmentado por cargo e setor consegue colocar a marca na frente
de quem toma essa decisão — mas o objetivo realista não é conversão direta
no clique, como acontece com produtos de ticket menor e ciclo curto. É
gerar reconhecimento e consideração ao longo de um processo de compra
naturalmente lento.

## O erro mais comum

Empresas industriais que testam LinkedIn Ads esperando resultado de curto
prazo, no mesmo padrão de uma campanha de e-commerce, costumam abandonar o
canal cedo demais — antes que o ciclo de decisão real do comprador
industrial tenha tempo de se completar. O canal não falhou; a expectativa
estava desalinhada com o comportamento de compra do setor.

## Quando faz sentido investir

Faz mais sentido quando a empresa já sabe quem são os cargos e setores que
efetivamente decidem a compra (segmentação precisa vale mais que volume de
impressão), e quando existe conteúdo de apoio — material técnico,
demonstração, estudo de aplicação — capaz de sustentar um relacionamento de
meses, não um clique isolado.

Isso conecta diretamente com [como a reforma tributária está mudando a
conversa comercial na indústria B2B](/blog/posts/reforma-tributaria-impacto-industria-b2b.html)
— comunicação industrial eficaz, hoje, exige entender o contexto de negócio
do comprador, não só o canal de mídia.

Quer estruturar uma estratégia de aquisição B2B para sua indústria? [Solicitar diagnóstico]

---

## Artigo 8 — Energia Solar (leads)

**Título:** Comprar leads de energia solar vale a pena? O que considerar antes
**Slug:** `blog/posts/leads-para-energia-solar.html`
**Palavra-chave alvo:** leads para energia solar
**Meta description:** A maioria do conteúdo sobre leads solares vende planilha pronta. Entenda a diferença entre comprar leads e gerar demanda própria — e o que isso significa pro seu funil.
**Links internos:** `/setores/energia-solar.html`, `/blog/posts/como-vender-energia-solar-fio-b-60.html`

# Comprar leads de energia solar vale a pena? O que considerar antes

Integradores solares recebem constantemente oferta de "leads qualificados"
vendidos em lote. A promessa é sedutora: pular a etapa de geração de
demanda e ir direto para a negociação. Na prática, o resultado costuma
decepcionar mais do que ajudar.

## O problema estrutural de comprar lead pronto

Um lead comprado em lote geralmente foi captado por um terceiro, com
critério de qualificação que a integradora não controla, e frequentemente já
foi oferecido a mais de um concorrente ao mesmo tempo. O resultado comum é
taxa de conversão baixa e um ciclo de negociação que começa em desvantagem
— o cliente já está sendo disputado por preço antes mesmo da primeira
ligação.

## A alternativa: gerar a própria demanda

Empresas que investem em gerar demanda própria — conteúdo que educa sobre o
retorno real do investimento (incluindo [o cenário atual do Fio B em
60%](/blog/posts/como-vender-energia-solar-fio-b-60.html)), presença
consistente nos canais certos, processo de qualificação próprio — constroem
um funil mais previsível ao longo do tempo, mesmo que o resultado inicial
seja mais lento que comprar um lote de leads prontos.

## O que considerar antes de decidir

Comprar leads pode fazer sentido como complemento pontual, nunca como
estratégia única. A pergunta que vale fazer antes de qualquer decisão é:
minha empresa tem processo para qualificar e converter esse volume, ou está
apenas comprando a ilusão de ter um funil cheio?

Quer estruturar geração de demanda própria para sua empresa? [Solicitar diagnóstico]

---

## Artigo 9 — Provedores de Internet (promoção)

**Título:** Promoções para provedor de internet: o que funciona além do desconto
**Slug:** `blog/posts/ideias-promocao-provedor-internet.html`
**Palavra-chave alvo:** ideias de promoção para provedor
**Meta description:** A maior parte do conteúdo sobre promoção para ISP se resume a desconto e brinde. Veja o que realmente sustenta captação e retenção no longo prazo.
**Links internos:** `/setores/provedores-de-internet.html`, `/blog/posts/consultoria-marketing-provedores-internet.html`

# Promoções para provedor de internet: o que funciona além do desconto

Boa parte do conteúdo disponível sobre promoção para provedores de internet
vem de fóruns e grupos de troca entre donos de ISP — útil pela experiência
prática, mas raramente pensado como estratégia de longo prazo.

## O limite do desconto como única ferramenta

"Meses grátis" e desconto de mensalidade funcionam para captar
rapidamente, mas atraem o tipo de cliente mais sensível a preço — o mesmo
que vai embora assim que a promoção acabar ou um concorrente oferecer algo
melhor. Usada como única estratégia, a promoção por desconto alimenta
justamente o problema que mais preocupa provedores regionais: o churn.

## O que sustenta captação de verdade

Provedores que crescem de forma mais sólida combinam promoção pontual com
comunicação de diferencial real — estabilidade da conexão, qualidade do
suporte local, tempo médio de resposta a chamado técnico. São argumentos
menos imediatos que um desconto, mas que atraem o assinante que valoriza
serviço, não só preço — e que tende a permanecer mais tempo na base.

## Retenção como parte da mesma estratégia

Promoção pensada isoladamente da retenção resolve só metade do problema.
Como [discutimos sobre consultoria de marketing para
provedores](/blog/posts/consultoria-marketing-provedores-internet.html), o
ganho real está em tratar aquisição e retenção como parte do mesmo
processo, com indicador acompanhado — não como ações isoladas.

Quer estruturar isso para o seu provedor? [Solicitar diagnóstico]

---

## Artigo 10 — SaaS (CAC)

**Título:** Como reduzir o CAC em SaaS B2B sem cortar investimento às cegas
**Slug:** `blog/posts/reduzir-cac-saas-b2b.html`
**Palavra-chave alvo:** reduzir CAC em SaaS B2B
**Meta description:** Quando o custo de aquisição sobe, a reação comum é cortar investimento em mídia. Isso raramente resolve a causa real do problema.
**Links internos:** `/setores/saas.html`, `/blog/posts/consultoria-marketing-saas-brasil.html`

# Como reduzir o CAC em SaaS B2B sem cortar investimento às cegas

Quando o custo de aquisição de cliente sobe, a reação mais comum em SaaS é
cortar orçamento de mídia. É uma resposta compreensível — e, na maioria das
vezes, trata o sintoma sem tocar na causa.

## Por que só cortar investimento raramente resolve

CAC subindo geralmente indica um entre alguns problemas estruturais:
saturação do canal pago usado até então, posicionamento que já não
diferencia o produto da concorrência, ou desalinhamento entre o que
marketing atrai e o que vendas realmente consegue fechar. Cortar
investimento sem identificar qual desses fatores está em jogo tende a
reduzir volume sem melhorar a eficiência — o problema continua, só em
escala menor.

## Onde geralmente está o gargalo real

Em boa parte dos casos, o problema não está na mídia, mas antes dela: um
posicionamento genérico ("plataforma completa para...") atrai um público
amplo demais, que exige mais esforço de qualificação e fecha menos. Quando
o posicionamento é mais específico sobre o problema que o produto resolve e
para quem, o próprio tráfego chega mais qualificado — o que reduz CAC sem
precisar cortar investimento.

## Diagnóstico antes de decisão

Como [já discutimos sobre consultoria de marketing para SaaS no
Brasil](/blog/posts/consultoria-marketing-saas-brasil.html), a resposta
certa depende de entender, com dado, onde está o gargalo específico daquela
operação — geração de demanda, qualificação, ou alinhamento com vendas —
antes de decidir se o problema se resolve com mais orçamento, menos
orçamento, ou mudança de estratégia.

Quer um diagnóstico real do seu CAC? [Solicitar diagnóstico]

---

## Checklist antes de publicar (igual ao lote 1, reforçando os itens novos)

1. Passou pelo checklist de copy do `CLAUDE.md`?
2. Nenhum número foi inventado nos pontos sensíveis (LGPD, CFM estética)?
3. Meta title, description, canonical e JSON-LD preenchidos, com
   `datePublished` real?
4. Autoria do schema decidida (Organization ou pessoa — ver item 1 da seção
   inicial)?
5. Links de saída para fonte oficial confirmados com URL real antes de
   publicar (não usar placeholder)?
6. Links internos com âncora descritiva presentes (já indicados por
   artigo)?
7. Cards adicionados em `blog/index.html` e URLs no `sitemap.xml`?
