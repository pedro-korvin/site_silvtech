/* ==========================================================================
   Silvtech — Provedores: consulta de cobertura
   Lê window.__COBERTURA__ (injetado pelo build a partir do JSON do cliente)
   e window.__CONTATO_WHATSAPP__ / window.__PROVEDOR_NOME__.
   Progressive enhancement: sem JS, o formulário simplesmente não envia
   (navegador nativo bloqueia submit sem action) — nunca quebra a página.
   Depende de whatsapp.js (SilvtechWhatsapp) carregado antes.
   ========================================================================== */
(function () {
  "use strict";

  function init() {
    var form = document.getElementById("cobertura-form");
    if (!form || typeof SilvtechWhatsapp === "undefined") return;

    var select = document.getElementById("cobertura-select");
    var ok = document.getElementById("cobertura-ok");
    var fora = document.getElementById("cobertura-fora");
    var okLink = document.getElementById("cobertura-ok-link");
    var foraLink = document.getElementById("cobertura-fora-link");

    var lista = window.__COBERTURA__ || [];
    var numero = window.__CONTATO_WHATSAPP__ || "";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var cidade = select.value;
      if (!cidade) return;

      var atende = lista.some(function (item) {
        return item.cidade === cidade;
      });

      ok.classList.remove("is-visivel");
      fora.classList.remove("is-visivel");

      if (atende) {
        okLink.href = SilvtechWhatsapp.waLink(
          numero,
          "Olá! Vi no site que atendem " + cidade + " e quero contratar um plano."
        );
        ok.classList.add("is-visivel");
        ok.setAttribute("tabindex", "-1");
        ok.focus();
      } else {
        foraLink.href = SilvtechWhatsapp.waLink(
          numero,
          "Olá! Não vi " + cidade + " na área de cobertura ainda. Avisam quando chegarem por aí?"
        );
        fora.classList.add("is-visivel");
        fora.setAttribute("tabindex", "-1");
        fora.focus();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
