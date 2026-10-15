/* ==========================================================================
   Silvtech — Provedores: acordeão de FAQ
   Progressive enhancement: sem JS (ou sem IntersectionObserver/etc.), todas
   as respostas ficam visíveis via .no-js no <html> — nunca escondidas por
   padrão. Nenhum conteúdo depende de JS pra aparecer.
   ========================================================================== */
(function () {
  "use strict";

  function init() {
    var items = document.querySelectorAll(".faq__item");
    if (!items.length) return;

    document.documentElement.classList.remove("no-js");

    items.forEach(function (item) {
      var btn = item.querySelector(".faq__pergunta");
      if (!btn) return;

      btn.addEventListener("click", function () {
        var abrindo = !item.classList.contains("is-aberto");
        items.forEach(function (outro) {
          outro.classList.remove("is-aberto");
          outro.querySelector(".faq__pergunta").setAttribute("aria-expanded", "false");
        });
        if (abrindo) {
          item.classList.add("is-aberto");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
