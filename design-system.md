# Silvtech — Design System do site

Sistema visual oficial do rebranding. Toda página, componente e ajuste de CSS
deste repositório deve derivar destes tokens. Não inventar valores fora daqui.
Complementa o `CLAUDE.md` (posicionamento, termos proibidos, bugs) e o
`briefing-visual.md` (direção estratégica por página).

---

## 1. Paleta

Quatro cores. Nada além delas.

| Token CSS      | Hex       | Papel                                                                                                          |
| -------------- | --------- | -------------------------------------------------------------------------------------------------------------- |
| `--cor-fundo`  | `#F6F4EF` | Fundo dominante de todas as páginas (off-white quente)                                                         |
| `--cor-texto`  | `#16161A` | Texto principal, títulos, botão primário (grafite quase-preto)                                                 |
| `--cor-acento` | `#1B2A4A` | Acento sóbrio: CTA em destaque, detalhes pontuais (azul-marinho profundo)                                      |
| `--cor-neutro` | `#6B6960` | Texto secundário, legendas, metadados (ajustado para 5:1 de contraste contra `--cor-fundo`, atendendo WCAG AA) |

Derivados permitidos (únicos):

| Token CSS          | Hex       | Papel                             |
| ------------------ | --------- | --------------------------------- |
| `--cor-superficie` | `#FFFFFF` | Fundo de cards e formulários      |
| `--cor-borda`      | `#E2E0D6` | Bordas de 1px, divisores de seção |

### Regras de cor

- O acento (`#1B2A4A`) aparece com parcimônia: CTA principal, numeração de
  etapas, pequenos detalhes. Nunca como fundo de seção inteira, nunca em texto
  corrido.
- **Proibido:** gradientes de qualquer tipo, `#1149ff`, ciano/`#06b6d4`,
  glow (`box-shadow` colorido), `backdrop-filter`, transparências decorativas
  (`rgba` como efeito visual).
- Seções escuras (se necessárias, ex.: footer): fundo `#16161A`, texto
  `#F6F4EF`, mesma lógica invertida. No máximo 1 seção escura por página além
  do footer.

---

## 2. Tipografia

Duas famílias. Descartar Lexend Deca do projeto.

| Uso             | Família          | Pesos carregados |
| --------------- | ---------------- | ---------------- |
| Títulos (h1–h3) | Playfair Display | 700 (único)      |
| Todo o resto    | Montserrat       | 400, 500, 600    |

Import único, no `<head>` de cada página (nunca no footer):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

### Escala tipográfica (desktop / mobile)

| Token           | Desktop | Mobile | Família    | Peso | line-height                                                |
| --------------- | ------- | ------ | ---------- | ---- | ---------------------------------------------------------- |
| `--fs-h1`       | 52px    | 34px   | Playfair   | 700  | 1.15                                                       |
| `--fs-h2`       | 36px    | 27px   | Playfair   | 700  | 1.2                                                        |
| `--fs-h3`       | 24px    | 20px   | Playfair   | 700  | 1.3                                                        |
| `--fs-destaque` | 20px    | 18px   | Montserrat | 500  | 1.5                                                        |
| `--fs-corpo`    | 17px    | 16px   | Montserrat | 400  | 1.7                                                        |
| `--fs-legenda`  | 14px    | 13px   | Montserrat | 400  | 1.5                                                        |
| `--fs-rotulo`   | 13px    | 12px   | Montserrat | 600  | 1.2 (letter-spacing: 0.08em, caixa alta permitida só aqui) |

### Regras tipográficas

- Playfair Display **nunca** recebe `background-clip: text`, gradiente, cor
  de acento em bloco inteiro, ou sombra. Cor: `--cor-texto` (ou `--cor-fundo`
  em seção escura).
- Montserrat 600 só em rótulos pequenos e navegação. Corpo de texto é sempre 400. Nada de bold espalhado em parágrafo.
- Largura máxima de parágrafo: `65ch`. Texto corrido nunca ocupa a tela
  inteira.
- Sem itálico decorativo. Itálico só quando semanticamente necessário.

---

## 3. Espaçamento e grid

Grade de 8px. Todo `margin`, `padding` e `gap` usa múltiplos desta escala:

```
--esp-1: 8px    --esp-2: 16px   --esp-3: 24px   --esp-4: 32px
--esp-5: 48px   --esp-6: 64px   --esp-7: 96px   --esp-8: 128px
```

- **Container:** largura máxima `1140px`, padding lateral `24px` (mobile)
  / `48px` (desktop).
- **Respiro entre seções:** `--esp-7` (96px) no desktop, `--esp-6` (64px) no
  mobile. Generosidade de espaço é parte da identidade — na dúvida, mais ar.
- **Grid interno:** 12 colunas no desktop, gap `24px`. Layouts assimétricos
  são bem-vindos (ex.: título ocupando 5 colunas, texto começando na 7ª) —
  remetem a diagramação editorial.

### Breakpoints

```
--bp-mobile: até 767px
--bp-tablet: 768px – 1023px
--bp-desktop: 1024px+
```

Mobile-first no CSS: estilos base para mobile, `@media (min-width: ...)` para
cima.

---

## 4. Componentes

### Botão primário

```css
background: var(--cor-texto); /* ou --cor-acento no CTA principal da página */
color: var(--cor-fundo);
border: none;
border-radius: 4px;
padding: 14px 24px;
font: 500 15px/1 "Montserrat";
transition: opacity 150ms ease;
/* hover: opacity 0.85 — nada de scale, glow ou mudança de cor chamativa */
```

### Botão secundário

Igual ao primário, mas `background: transparent`, `color: var(--cor-texto)`,
`border: 1px solid var(--cor-texto)`.

### Card

```css
background: var(--cor-superficie);
border: 1px solid var(--cor-borda);
border-radius: 4px;
padding: var(--esp-4);
/* Sem box-shadow. Hover: border-color: var(--cor-texto); nada além disso. */
```

### Formulários

- Inputs: fundo `--cor-superficie`, borda `1px solid var(--cor-borda)`,
  radius 4px, padding `12px 16px`, fonte Montserrat 400 16px (nunca menos de
  16px no mobile — evita zoom automático do iOS).
- Focus: `border-color: var(--cor-acento)` + `outline: 2px solid` com offset.
  Sem glow.
- Labels sempre visíveis acima do campo (não usar placeholder como label).

### Navegação (header)

- Fundo `--cor-fundo` com borda inferior `1px solid var(--cor-borda)`.
  Sem transparência, sem blur.
- Links: Montserrat 500 15px, cor `--cor-texto`. Estado ativo: sublinhado
  fino (`text-underline-offset: 6px`), não mudança de cor.
- CTA do header: botão primário compacto (`padding: 10px 18px`).

### Numeração de etapas (S.C.A.L.E)

Rótulo `--fs-rotulo` em `--cor-acento` ("Etapa 01") + título Playfair.
É o padrão visual da metodologia em qualquer página.

---

## 5. Movimento

- **Permitido:** fade-in sutil (opacity 0.6 → 1, `translateY(8px)` → 0),
  duração 200ms, `ease-out`, uma única vez por elemento.
- **Conteúdo nunca depende de JS para ficar visível.** Estado padrão de tudo
  é visível; animação é aprimoramento progressivo. (Regra nascida do bug do
  blog mobile — ver CLAUDE.md.)
- **Proibido:** animações infinitas (pulse, float, glow), bounce, scale/tilt
  em hover, typewriter, parallax, `background-attachment: fixed`.
- Todo CSS de animação envolvido em:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 6. Imagens e ícones

- Formato WebP com fallback quando necessário. `loading="lazy"` em tudo
  abaixo da dobra. `width`/`height` explícitos sempre (evita layout shift).
- **Sem Font Awesome.** Ícones em SVG inline, traço fino (1.5px),
  monocromáticos (`currentColor`). Quantidade mínima — o site editorial usa
  tipografia e numeração onde antes havia ícone.
- **Sem emojis** em qualquer superfície do site (títulos, cards, botões,
  menu).
- Fotografia: real, luz natural, dessaturação leve. Nada de banco de imagem
  clichê (aperto de mão, foguete, gráfico subindo). Enquanto não houver
  fotografia própria, preferir composições tipográficas ou o infográfico do
  S.C.A.L.E a imagem genérica.

---

## 7. Checklist antes de commitar qualquer tela

1. Só existem as 4 cores + 2 derivados? Nenhum gradiente/glow/blur entrou?
2. Playfair só em títulos, sem efeitos? Montserrat no resto, corpo em 400?
3. Todos os espaçamentos são múltiplos de 8?
4. Conteúdo visível por padrão, sem depender de JS/observer?
5. `prefers-reduced-motion` respeitado?
6. Imagens com lazy + dimensões explícitas?
7. Passou no checklist de copy do CLAUDE.md (termos proibidos, S.C.A.L.E)?
