/* ==========================================================================
   Silvtech — JS compartilhado do site redesenhado.
   Mínimo e progressivo: nada aqui é pré-requisito para o conteúdo aparecer.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Menu mobile ---- */
  function initMenu() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var toggle = header.querySelector(".site-header__toggle");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Fecha o menu ao clicar num link (mobile)
    header.querySelectorAll(".site-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Fade-in sutil (aprimoramento progressivo) ----
     Só ativa se houver IntersectionObserver. Sem ele, o conteúdo
     permanece 100% visível (nunca escondemos por JS). */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length || !("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("js-reveal");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- Abas (progressive enhancement) ----
     Converte grupos de itens empilhados em abas: clicar no nome troca o
     painel visível, com fade curto (ver .tabs-panel em base.css).
     Sem JS, os itens continuam todos empilhados e visíveis — o HTML não
     muda, só ganha uma camada de interação por cima. */
  function initTabs(opts) {
    var containers = document.querySelectorAll(opts.container);
    if (!containers.length) return;

    containers.forEach(function (container, groupIndex) {
      var items = Array.prototype.slice.call(
        container.querySelectorAll(opts.item)
      );
      if (items.length < 2) return;

      var groupId = "tabs-" + groupIndex + "-" + Math.random().toString(36).slice(2, 7);
      var tablist = document.createElement("div");
      tablist.className = "tabs-nav";
      tablist.setAttribute("role", "tablist");

      items.forEach(function (item, i) {
        var labelEl = item.querySelector(opts.label);
        var label = labelEl ? labelEl.textContent.trim() : "Item " + (i + 1);

        if (opts.number) {
          var numEl = item.querySelector(opts.number);
          var match = numEl && numEl.textContent.match(/\d+/);
          if (match) label = match[0] + " — " + label;
        }

        var btnId = groupId + "-tab-" + i;
        var panelId = groupId + "-panel-" + i;

        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "tabs-nav__btn";
        btn.id = btnId;
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
        btn.setAttribute("aria-controls", panelId);
        btn.tabIndex = i === 0 ? 0 : -1;
        btn.textContent = label;

        item.id = panelId;
        item.setAttribute("role", "tabpanel");
        item.setAttribute("aria-labelledby", btnId);
        item.classList.add("tabs-panel");
        // Painéis de aba trocam ao clique, não ao scroll: remove o
        // fade-in por IntersectionObserver (evita conflito de estado
        // visível/oculto entre os dois mecanismos) e garante visível.
        item.classList.remove("reveal");
        item.classList.add("is-visible");
        if (i !== 0) item.classList.add("is-hidden");

        btn.addEventListener("click", function () {
          activate(i, true);
        });

        tablist.appendChild(btn);
      });

      container.insertBefore(tablist, items[0]);
      container.classList.add("is-enhanced");

      function activate(index, moveFocus) {
        items.forEach(function (item, i) {
          var btn = tablist.children[i];
          var active = i === index;
          btn.setAttribute("aria-selected", String(active));
          btn.tabIndex = active ? 0 : -1;

          if (active) {
            item.classList.remove("is-hidden");
            item.classList.add("is-entering");
            // Força reflow antes de tirar 'is-entering', garantindo que a
            // transição de opacity/transform seja disparada pelo navegador.
            void item.offsetWidth;
            item.classList.remove("is-entering");
          } else {
            item.classList.add("is-hidden");
          }
        });
        if (moveFocus) tablist.children[index].focus();
      }

      tablist.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        var current = Array.prototype.indexOf.call(
          tablist.children,
          document.activeElement
        );
        if (current === -1) return;
        e.preventDefault();
        var next =
          e.key === "ArrowRight"
            ? (current + 1) % items.length
            : (current - 1 + items.length) % items.length;
        activate(next, true);
      });
    });
  }

  function init() {
    initMenu();
    initReveal();
    initTabs({ container: ".solucoes .container", item: ".solucao", label: "h3" });
    initTabs({
      container: ".etapas .container",
      item: ".etapa",
      label: "h2",
      number: ".rotulo--acento",
    });
    initTabs({
      container: ".scale__grid",
      item: ".scale__etapa",
      label: "h3",
      number: ".rotulo--acento",
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
