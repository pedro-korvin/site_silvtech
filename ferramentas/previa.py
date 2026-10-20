#!/usr/bin/env python3
"""
Gera uma PRÉVIA de site para um provedor real a partir de um dos 10 modelos.

Uso:
    python3 ferramentas/previa.py dados.json

dados.json (só dados PÚBLICOS e verificados do provedor):
{
  "modelo": "01-cidade-pequena",          # pasta em provedores/modelos/
  "nome": "Global Net Quixadá",
  "cidade": "Quixadá",
  "uf": "CE",
  "whatsapp": "5588996950439",             # com DDI 55, só números
  "telefone": "(88) 99695-0439",           # opcional
  "email": "contato@provedor.com.br",      # opcional
  "cidades": ["Quixadá"],                  # opcional; padrão = [cidade]
  "cor_primaria": "#C2410C",               # opcional; padrão = cor do modelo
  "hubspot_id": "123"                      # opcional; só vai para o registro interno
}

O que o script faz:
  1. Copia o modelo para provedores/previas/<código-aleatório>/.
  2. Troca nome, cidade, contatos e cobertura pelos dados informados.
  3. REMOVE tudo que seria afirmação falsa sobre uma empresa real:
     depoimentos, números (clientes, nota no Google, anos), promoção,
     endereço, horário, CNPJ, "mais escolhido", preço "a partir de".
  4. Põe a faixa "Prévia preparada pela Silvtech ... não é o site oficial".
  5. Marca a página como noindex, nofollow e tira canonical/og:url.
  6. Confere se sobrou texto de exemplo. Se sobrou, apaga a pasta e sai com
     erro (código 2): NADA deve ser publicado nesse caso.
  7. Registra a prévia em ferramentas/previas.json (pasta que não sobe pro ar).

Imprime no final a URL pública da prévia.
"""
import json
import re
import secrets
import shutil
import sys
from datetime import date
from pathlib import Path

from bs4 import BeautifulSoup

RAIZ = Path(__file__).resolve().parent.parent
MODELOS = RAIZ / "provedores" / "modelos"
PREVIAS = RAIZ / "provedores" / "previas"
REGISTRO = RAIZ / "ferramentas" / "previas.json"
SITE = "https://www.silvtech.com.br"

# Textos de demonstração que NUNCA podem sobrar numa prévia de empresa real.
PROIBIDOS = [
    "Exemplo", "exemplo", "0000-0000", "5500000000000", "00.000.000",
    "3.200", "4,8", "8 anos", "2017", "Cidade Vizinha", "Distrito Modelo",
    "Vila Serrana", "Jardim das Flores",
]
PROIBIDOS_REGEX = [
    r"\d[\d.]*\s*\+\s*(clientes|famílias|assinantes)",
    r"\b\d+\s+anos\b",
    r"\d,\d\s*(no|de nota no)\s*Google",
]

# Blocos que afirmam fatos que não sabemos sobre o provedor real.
REMOVER = [
    ".hero__confianca", ".hero__oferta", ".flutuante", ".sobre__selo",
    ".secao--prova", "#depoimentos", ".numeros", ".promo-secao",
    ".plano__preco-de", ".plano__fita", ".cta-final__preco",
]


def falhar(msg, pasta=None):
    if pasta and pasta.exists():
        shutil.rmtree(pasta)
    print(f"ERRO: {msg}", file=sys.stderr)
    sys.exit(2)


def so_digitos(s):
    return re.sub(r"\D", "", s or "")


def logo_svg(nome, cor):
    partes = nome.split(" ", 1)
    p1 = partes[0] + (" " if len(partes) > 1 else "")
    p2 = partes[1] if len(partes) > 1 else ""
    largura = 60 + int(len(nome) * 12.5)
    esc = lambda t: t.replace("&", "&amp;").replace("<", "&lt;")
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {largura} 48" role="img" aria-label="{esc(nome)}">
  <g fill="none" stroke="{cor}" stroke-width="3" stroke-linecap="round">
    <path d="M6 28a18 18 0 0 1 28 0" />
    <path d="M12 33a10 10 0 0 1 16 0" />
  </g>
  <circle cx="20" cy="38" r="3" fill="{cor}" />
  <text x="46" y="32" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="20" font-weight="700">
    <tspan fill="#14171A">{esc(p1)}</tspan><tspan fill="{cor}">{esc(p2)}</tspan>
  </text>
</svg>
'''


def main():
    if len(sys.argv) != 2:
        falhar("uso: python3 ferramentas/previa.py dados.json")
    d = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    for campo in ("modelo", "nome", "cidade", "uf", "whatsapp"):
        if not d.get(campo):
            falhar(f"campo obrigatório ausente: {campo}")

    origem = MODELOS / d["modelo"]
    if not (origem / "index.html").exists():
        falhar(f"modelo não encontrado: {d['modelo']}")

    nome, cidade, uf = d["nome"].strip(), d["cidade"].strip(), d["uf"].strip()
    whats = so_digitos(d["whatsapp"])
    if not whats.startswith("55") or len(whats) < 12:
        falhar("whatsapp precisa ter DDI 55 + DDD + número")
    telefone = d.get("telefone", "").strip()
    email = d.get("email", "").strip()
    cidades = d.get("cidades") or [cidade]

    codigo = secrets.token_hex(5)
    destino = PREVIAS / codigo
    PREVIAS.mkdir(parents=True, exist_ok=True)
    shutil.copytree(origem, destino)
    url = f"{SITE}/provedores/previas/{codigo}/"

    html = (destino / "index.html").read_text(encoding="utf-8")

    # --- trocas de texto simples (antes do parse) ---
    html = html.replace("Provedor Exemplo Telecomunicações Ltda.", nome)
    html = html.replace("Provedor Exemplo", nome)
    html = html.replace("Cidade Exemplo - UF", f"{cidade} - {uf}")
    html = html.replace("Cidade Exemplo", cidade)
    html = html.replace("5500000000000", whats)
    if telefone:
        html = html.replace("(00) 0000-0000", telefone)
        html = html.replace("tel:0000000000", "tel:" + so_digitos(telefone))
    if email:
        html = html.replace("contato@provedorexemplo.com.br", email)

    # cobertura usada pelo JS
    cob = json.dumps([{"cidade": c, "bairros": []} for c in cidades], ensure_ascii=False)
    html = re.sub(r"window\.__COBERTURA__\s*=\s*\[.*?\];", f"window.__COBERTURA__ = {cob};", html, flags=re.S)

    s = BeautifulSoup(html, "html.parser")

    # --- head ---
    for tag in s.select('link[rel="canonical"], meta[property="og:url"]'):
        tag.decompose()
    rob = s.select_one('meta[name="robots"]')
    if rob:
        rob["content"] = "noindex, nofollow"
    else:
        s.head.append(s.new_tag("meta", attrs={"name": "robots", "content": "noindex, nofollow"}))
    titulo = f"Prévia do site · {nome} · {cidade}"
    if s.title:
        s.title.string = titulo
    for sel in ('meta[property="og:title"]', 'meta[name="twitter:title"]'):
        t = s.select_one(sel)
        if t:
            t["content"] = titulo
    for script in s.select('script[type="application/ld+json"]'):
        if "InternetServiceProvider" in (script.string or ""):
            dados_ld = {"@context": "https://schema.org", "@type": "InternetServiceProvider",
                        "name": nome, "areaServed": cidades}
            if telefone:
                dados_ld["telephone"] = telefone
            if email:
                dados_ld["email"] = email
            script.string = json.dumps(dados_ld, ensure_ascii=False)

    # --- blocos com afirmações que não sabemos ---
    for sel in REMOVER:
        for el in s.select(sel):
            el.decompose()
    # itens com endereço, horário ou CNPJ de exemplo
    for li in s.find_all("li"):
        if li.decomposed:
            continue
        txt = li.get_text(" ", strip=True)
        if "Rua Exemplo" in txt or "Segunda a sexta" in txt or (not email and "@" in txt):
            li.decompose()
    # loja física é afirmação que não sabemos: some de destaques e benefícios
    for el in s.select(".vantagem, .beneficio, .sobre__destaques li"):
        if not el.decomposed and re.search(r"\bLoja\b", el.get_text(" ")):
            el.decompose()
    for p in s.select(".rodape__base p"):
        if "CNPJ" in p.get_text() or "©" in p.get_text():
            p.clear()
            p.append(f"© {date.today().year} {nome}")
    for p in s.select(".sobre__paragrafo"):
        p.string = (f"A {nome} leva internet fibra para {cidade} e região. "
                    "Este espaço é para a história de vocês, contada do jeito de vocês.")

    # links de exemplo (central, 2ª via, redes, contrato) viram âncora vazia
    for a in s.find_all("a", href=True):
        if "provedorexemplo" in a["href"]:
            if a.get("aria-label") in ("Instagram", "Facebook"):
                a.decompose()  # rede social desconhecida: some
                continue
            a["href"] = "#"
            a.attrs.pop("target", None)

    # cobertura visível
    sel_cid = s.select_one(".cobertura__select")
    if sel_cid:
        for opt in sel_cid.find_all("option"):
            if opt.get("value"):
                opt.decompose()
        for c in cidades:
            o = s.new_tag("option", value=c)
            o.string = c
            sel_cid.append(o)
    for ul in s.select(".cobertura__cidades ul"):
        ul.clear()
        for c in cidades:
            li = s.new_tag("li")
            li.string = c
            ul.append(li)
    for st in s.select(".cobertura-foto__cartao strong"):
        st.string = f"{cidade} e região" if len(cidades) == 1 else f"{len(cidades)} cidades atendidas"

    # aviso de planos ilustrativos
    nota = s.select_one(".planos__nota")
    aviso = (f"Planos, velocidades e valores desta prévia são ilustrativos. "
             f"No site definitivo entram os planos reais da {nome}.")
    if nota:
        nota.clear()
        nota.append(aviso)
    else:
        sec = s.select_one("#planos .container")
        if sec:
            p = s.new_tag("p", attrs={"class": "planos__nota"})
            p.string = aviso
            sec.append(p)

    # faixa de prévia
    faixa = s.select_one(".demo-faixa")
    if not faixa:
        falhar("modelo sem .demo-faixa; não dá para marcar como prévia", destino)
    faixa.clear()
    sp = s.new_tag("span")
    sp.string = f"Prévia preparada pela Silvtech para a {nome} · não é o site oficial · conteúdo ilustrativo"
    faixa.append(sp)
    a = s.new_tag("a", href="/provedores/sites/")
    a.string = "Conhecer a proposta →"
    faixa.append(a)

    final = str(s)
    (destino / "index.html").write_text(final, encoding="utf-8")
    (destino / "assets" / "logo.svg").write_text(
        logo_svg(nome, d.get("cor_primaria") or "#C2410C"), encoding="utf-8")

    # --- conferência final: nada de exemplo pode sobrar ---
    texto_visivel = BeautifulSoup(final, "html.parser").get_text(" ")
    sobras = [p for p in PROIBIDOS if p in final]
    sobras += [r for r in PROIBIDOS_REGEX if re.search(r, texto_visivel)]
    if 'content="noindex, nofollow"' not in final:
        sobras.append("noindex ausente")
    if sobras:
        falhar(f"sobrou conteúdo de exemplo/afirmação falsa: {sobras}", destino)

    # registro interno (ferramentas/ não sobe para o servidor)
    reg = json.loads(REGISTRO.read_text(encoding="utf-8")) if REGISTRO.exists() else []
    reg.append({"codigo": codigo, "nome": nome, "cidade": cidade, "uf": uf,
                "modelo": d["modelo"], "hubspot_id": d.get("hubspot_id", ""),
                "criada_em": date.today().isoformat(), "url": url})
    REGISTRO.write_text(json.dumps(reg, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(url)


if __name__ == "__main__":
    main()
