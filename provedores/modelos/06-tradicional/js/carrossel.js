/* ==========================================================================
   Silvtech — Provedores: carrossel de planos no celular
   No celular os planos viram uma faixa deslizável (CSS puro, scroll-snap).
   Este script só posiciona a faixa no plano em destaque ao carregar, para o
   visitante já ver o "Mais escolhido" primeiro. Sem JS, a faixa começa no
   primeiro plano e continua deslizável — nada depende disto.
   ========================================================================== */
(function () {
  "use strict";

  function init() {
    document.querySelectorAll("[data-carrossel]").forEach(function (faixa) {
      if (faixa.scrollWidth <= faixa.clientWidth + 4) return; // não é carrossel nesta largura
      var destaque = faixa.querySelector(".plano--destaque");
      if (!destaque) return;
      var inicio = destaque.getBoundingClientRect().left - faixa.getBoundingClientRect().left + faixa.scrollLeft;
      var centro = inicio - (faixa.clientWidth - destaque.offsetWidth) / 2;
      faixa.scrollLeft = Math.max(0, centro);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
