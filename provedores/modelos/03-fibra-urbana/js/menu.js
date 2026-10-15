/* ==========================================================================
   Silvtech — Provedores: menu do celular (abre/fecha a navegação do header)
   Só age quando o modelo tem .header__menu-btn. Sem JS, o botão fica
   escondido (só aparece com .js no <html>) e os links continuam no rodapé.
   ========================================================================== */
(function () {
  "use strict";

  function init() {
    var header = document.querySelector(".header");
    var botao = document.querySelector(".header__menu-btn");
    if (!header || !botao) return;

    document.documentElement.classList.add("tem-menu-js");

    function fechar() {
      header.classList.remove("menu-aberto");
      botao.setAttribute("aria-expanded", "false");
    }

    botao.addEventListener("click", function () {
      var abrindo = !header.classList.contains("menu-aberto");
      header.classList.toggle("menu-aberto", abrindo);
      botao.setAttribute("aria-expanded", abrindo ? "true" : "false");
    });

    header.querySelectorAll(".header__nav a").forEach(function (link) {
      link.addEventListener("click", fechar);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") fechar();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
