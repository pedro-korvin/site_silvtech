/* ==========================================================================
   Silvtech — monta as partes repetidas do site.

   Uso (dentro da pasta site_silvtech):   node ferramentas/montar.mjs

   Cada página tem marcadores como  <!-- @cabecalho --> ... <!-- /@cabecalho -->
   e o conteúdo entre eles é refeito a cada execução:

     @head-comum    fontes, CSS/JS do núcleo, Meta Pixel e Google Analytics
     @cabecalho     cabeçalho + menu do celular (marca o item da página atual)
     @rodape        rodapé + botão flutuante do WhatsApp
     @blog-recentes 3 posts mais recentes (home)
     @lista-posts   filtros + todos os posts (blog/index.html)
     @post-topo     topo de cada post (foto, título, data, tempo de leitura)
     @post-lateral  cartão lateral do post (diagnóstico + compartilhar)
     @relacionados  "Continue lendo" no fim de cada post

   Os textos do cabeçalho/rodapé ficam em ferramentas/parciais/*.html e a
   lista de posts em ferramentas/posts.json (o primeiro da lista é o mais
   recente).

   Publicar um post novo:
     1. Copie ferramentas/modelo-post.html para blog/posts/<slug>.html e
        preencha o <head> e o texto do artigo.
     2. Acrescente o post no TOPO de ferramentas/posts.json (slug, titulo,
        resumo, categoria, grupo, data, foto do banco em assets/fotos, capa).
     3. Rode este script. Home, blog e "Continue lendo" se atualizam sozinhos.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PARCIAIS = path.join(RAIZ, "ferramentas", "parciais");
const IGNORAR = ["ferramentas", "provedores/modelos", ".git", ".github", "node_modules"];
const SITE = "https://www.silvtech.com.br";
const AUTOR = "Pedro Korvin";
const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const MESES_LONGOS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

const posts = JSON.parse(fs.readFileSync(path.join(RAIZ, "ferramentas", "posts.json"), "utf8"));
const parcial = (nome) => fs.readFileSync(path.join(PARCIAIS, nome + ".html"), "utf8").replace(/\s+$/, "");

const escapar = (t) =>
  String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const dataCurta = (iso) => {
  const [a, m, d] = iso.split("-");
  return `${Number(d)} ${MESES[Number(m) - 1]} ${a}`;
};
const dataLonga = (iso) => {
  const [a, m, d] = iso.split("-");
  return `${Number(d)} de ${MESES_LONGOS[Number(m) - 1]} de ${a}`;
};
const SETA =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>';

/* ---- Páginas do site ---- */
function listarPaginas(dir = RAIZ, saida = []) {
  for (const nome of fs.readdirSync(dir)) {
    const abs = path.join(dir, nome);
    const rel = path.relative(RAIZ, abs).split(path.sep).join("/");
    if (IGNORAR.some((p) => rel === p || rel.startsWith(p + "/"))) continue;
    if (fs.statSync(abs).isDirectory()) listarPaginas(abs, saida);
    else if (nome.endsWith(".html") && !nome.startsWith("google")) saida.push(rel);
  }
  return saida;
}

function hrefAtivo(rel) {
  if (rel === "index.html") return "/";
  if (rel.startsWith("blog/")) return "/blog/index.html";
  if (rel.startsWith("provedores/sites/")) return "/provedores/sites/";
  return "/" + rel;
}

function cabecalho(rel) {
  const ativo = hrefAtivo(rel);
  return parcial("cabecalho")
    .split(`<a href="${ativo}">`)
    .join(`<a href="${ativo}" aria-current="page">`);
}

/* ---- Cartões de post ---- */
function cartao(p, { revelar = true, atraso = 0, nivel = "h3" } = {}) {
  const classe = revelar ? "artigo revelar" : "artigo";
  const estilo = atraso ? ` style="--atraso: ${atraso}ms"` : "";
  return `<article class="${classe}" data-grupo="${escapar(p.grupo)}"${estilo}>
              <a href="/blog/posts/${p.slug}.html">
                <figure class="artigo__foto foto"><img src="/assets/fotos/${p.foto}-p.webp" width="800" height="533" alt="" loading="lazy" /></figure>
                <span class="artigo__tag">${escapar(p.categoria)} <time datetime="${p.data}">${dataCurta(p.data)}</time></span>
                <${nivel}>${escapar(p.titulo)}</${nivel}>
                <p>${escapar(p.resumo)}</p>
              </a>
            </article>`;
}

function blogRecentes() {
  return posts
    .slice(0, 3)
    .map((p, i) => "            " + cartao(p, { atraso: i * 100 }))
    .join("\n");
}

function listaPosts() {
  const grupos = [];
  for (const p of posts) if (!grupos.includes(p.grupo)) grupos.push(p.grupo);
  grupos.sort((a, b) => (a === "Estratégia e gestão" ? -1 : b === "Estratégia e gestão" ? 1 : 0));
  const conta = (g) => posts.filter((p) => p.grupo === g).length;
  const filtros = [`<button class="ficha" type="button" aria-pressed="true" data-filtro="todos">Todos <small>${posts.length}</small></button>`]
    .concat(grupos.map((g) => `<button class="ficha" type="button" aria-pressed="false" data-filtro="${escapar(g)}">${escapar(g)} <small>${conta(g)}</small></button>`))
    .map((b) => "            " + b)
    .join("\n");
  const [primeiro, ...resto] = posts;
  return `          <div class="blog-filtros" role="group" aria-label="Filtrar artigos por tema">
${filtros}
          </div>

          <article class="destaque-post revelar" data-grupo="${escapar(primeiro.grupo)}">
            <a href="/blog/posts/${primeiro.slug}.html">
              <figure class="destaque-post__foto foto"><img src="/assets/fotos/${primeiro.foto}-p.webp" srcset="/assets/fotos/${primeiro.foto}-p.webp 800w, /assets/fotos/${primeiro.foto}.webp 1600w" sizes="(min-width: 1024px) 55vw, 100vw" width="1600" height="1066" alt="" /></figure>
              <span class="destaque-post__texto">
                <span class="artigo__tag">Mais recente · ${escapar(primeiro.categoria)} <time datetime="${primeiro.data}">${dataCurta(primeiro.data)}</time></span>
                <span class="destaque-post__titulo">${escapar(primeiro.titulo)}</span>
                <span class="destaque-post__resumo">${escapar(primeiro.resumo)}</span>
                <span class="link-seta">Ler artigo ${SETA}</span>
              </span>
            </a>
          </article>

          <div class="blog-grade">
${resto.map((p, i) => "            " + cartao(p, { atraso: (i % 3) * 80, nivel: "h2" })).join("\n")}
          </div>
          <p class="blog-vazio" hidden>Nenhum artigo neste tema ainda.</p>`;
}

/* ---- Partes de cada post ---- */
function tempoLeitura(html) {
  const m = html.match(/<article class="prosa"[^>]*>([\s\S]*?)<\/article>/);
  const palavras = m ? m[1].replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length : 0;
  return Math.max(1, Math.round(palavras / 200));
}

function postTopo(p, html) {
  return `      <header class="post-topo">
        <figure class="post-topo__foto foto foto--azul foto--grao" aria-hidden="true">
          <img src="/assets/fotos/${p.foto}-p.webp" srcset="/assets/fotos/${p.foto}-p.webp 800w, /assets/fotos/${p.foto}.webp 1600w" sizes="100vw" width="1600" height="1066" alt="" fetchpriority="high" />
        </figure>
        <div class="container post-topo__dentro">
          <nav class="migalhas" aria-label="Você está em">
            <a href="/blog/index.html">Blog</a><span aria-hidden="true">/</span><span>${escapar(p.categoria)}</span>
          </nav>
          <h1>${escapar(p.titulo)}</h1>
          <p class="post-topo__meta">
            <span><time datetime="${p.data}">${dataLonga(p.data)}</time></span>
            <span>${AUTOR}</span>
            <span>${tempoLeitura(html)} min de leitura</span>
          </p>
        </div>
      </header>`;
}

function postLateral(p) {
  const url = `${SITE}/blog/posts/${p.slug}.html`;
  const whats = `https://wa.me/?text=${encodeURIComponent(p.titulo + " " + url)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  return `          <aside class="post-lateral" aria-label="Diagnóstico e compartilhamento">
            <div class="post-lateral__cartao">
              <p class="mono"><span class="ponto" aria-hidden="true"></span> Diagnóstico gratuito</p>
              <p class="post-lateral__titulo">Quer aplicar isso na sua empresa?</p>
              <p>Analisamos o seu negócio e mostramos por onde começar, antes de qualquer proposta.</p>
              <a class="btn btn--primario" href="/fale-conosco.html">Solicitar diagnóstico ${SETA}</a>
            </div>
            <div class="post-lateral__compartilhar">
              <span class="mono">Compartilhar</span>
              <a href="${whats}" target="_blank" rel="noopener">WhatsApp</a>
              <a href="${linkedin}" target="_blank" rel="noopener">LinkedIn</a>
              <button type="button" data-copiar="${url}">Copiar link</button>
            </div>
          </aside>`;
}

function relacionados(p) {
  const outros = posts.filter((x) => x.slug !== p.slug);
  const escolhidos = outros.filter((x) => x.grupo === p.grupo).slice(0, 3);
  for (const x of outros) {
    if (escolhidos.length >= 3) break;
    if (!escolhidos.includes(x)) escolhidos.push(x);
  }
  return escolhidos.map((x, i) => "            " + cartao(x, { atraso: i * 100 })).join("\n");
}

/* ---- Troca o conteúdo entre <!-- @nome --> e <!-- /@nome --> ---- */
function montar(rel) {
  const arquivo = path.join(RAIZ, rel);
  const original = fs.readFileSync(arquivo, "utf8");
  const post = rel.startsWith("blog/posts/") ? posts.find((p) => `blog/posts/${p.slug}.html` === rel) : null;
  const blocos = {
    "head-comum": () => parcial("head-comum"),
    cabecalho: () => cabecalho(rel),
    rodape: () => parcial("rodape"),
    "logos-clientes": () => parcial("logos-clientes"),
    "blog-recentes": blogRecentes,
    "lista-posts": listaPosts,
    "post-topo": () => (post ? postTopo(post, original) : null),
    "post-lateral": () => (post ? postLateral(post) : null),
    relacionados: () => (post ? relacionados(post) : null),
  };
  const usados = [];
  const novo = original.replace(/([ \t]*)<!-- @([\w-]+) -->[\s\S]*?<!-- \/@\2 -->/g, (trecho, recuo, nome) => {
    const gerar = blocos[nome];
    if (!gerar) throw new Error(`${rel}: marcador desconhecido @${nome}`);
    const conteudo = gerar();
    if (conteudo === null) throw new Error(`${rel}: @${nome} só funciona em posts listados no posts.json`);
    usados.push(nome);
    return `${recuo}<!-- @${nome} -->\n${conteudo}\n${recuo}<!-- /@${nome} -->`;
  });
  if (novo !== original) fs.writeFileSync(arquivo, novo);
  return { usados, mudou: novo !== original };
}

/* ---- sitemap.xml (páginas fixas + posts do posts.json) ---- */
const ULTIMA_REVISAO = "2026-10-15"; // atualize ao mudar as páginas fixas
const PAGINAS_SITEMAP = [
  ["/", "1.00", "weekly"],
  ["/servicos.html", "0.90", "monthly"],
  ["/metodologia.html", "0.90", "monthly"],
  ["/provedores/sites/", "0.90", "monthly"],
  ["/fale-conosco.html", "0.80", "monthly"],
  ["/blog/index.html", "0.80", "weekly"],
  ["/quemsomos.html", "0.70", "monthly"],
];

function sitemap() {
  const url = (loc, data, freq, prio) =>
    `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${data}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${prio}</priority>\n  </url>\n`;
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const [loc, prio, freq] of PAGINAS_SITEMAP) xml += url(loc, ULTIMA_REVISAO, freq, prio);
  for (const p of posts) {
    xml += url(`/blog/posts/${p.slug}.html`, p.data > ULTIMA_REVISAO ? p.data : ULTIMA_REVISAO, "yearly", "0.60");
  }
  return xml + "</urlset>\n";
}

let alteradas = 0;
for (const rel of listarPaginas()) {
  const { usados, mudou } = montar(rel);
  if (mudou) alteradas++;
  console.log(`${mudou ? "atualizada " : "sem mudança"}  ${rel}${usados.length ? "  [" + usados.join(", ") + "]" : "  (sem marcadores)"}`);
}
for (const p of posts) {
  if (!fs.existsSync(path.join(RAIZ, "blog", "posts", p.slug + ".html"))) console.warn(`AVISO: posts.json cita ${p.slug}, mas o arquivo não existe`);
  if (!fs.existsSync(path.join(RAIZ, "assets", "fotos", p.foto + "-p.webp"))) console.warn(`AVISO: foto "${p.foto}" do post ${p.slug} não existe em assets/fotos`);
}
const caminhoSitemap = path.join(RAIZ, "sitemap.xml");
const novoSitemap = sitemap();
if (fs.readFileSync(caminhoSitemap, "utf8") !== novoSitemap) {
  fs.writeFileSync(caminhoSitemap, novoSitemap);
  console.log("sitemap.xml atualizado");
}
console.log(`\n${alteradas} página(s) atualizada(s).`);
