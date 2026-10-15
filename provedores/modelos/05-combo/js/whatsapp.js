/* ==========================================================================
   Silvtech — Provedores: geração de links wa.me
   Usado tanto no build (Node, planos com mensagem fixa) quanto no cliente
   (navegador, mensagem de cobertura que depende da cidade escolhida).
   Precisa funcionar nos dois ambientes sem módulos (CommonJS opcional).
   ========================================================================== */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.SilvtechWhatsapp = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  function onlyDigits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function waLink(numero, texto) {
    var digits = onlyDigits(numero);
    return "https://wa.me/" + digits + "?text=" + encodeURIComponent(texto || "");
  }

  return { onlyDigits: onlyDigits, waLink: waLink };
});
