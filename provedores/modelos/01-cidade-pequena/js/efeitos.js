/* ==========================================================================
   Silvtech — Provedores: efeitos de foto (revelar ao rolar + profundidade)
   Só acabamento: sem este script (ou sem IntersectionObserver), todas as
   fotos aparecem normalmente. Quem pede "reduzir movimento" no sistema não
   recebe nenhum efeito.
   ========================================================================== */
(function () {
  "use strict";

  // "?estatico" na URL desliga os efeitos (capturas de tela / impressão).
  var reduzir =
    /[?&]estatico/.test(window.location.search) ||
    (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  function revelarAoRolar() {
    var alvos = document.querySelectorAll(".foto, .revelar");
    if (reduzir || !alvos.length || !("IntersectionObserver" in window)) return;

    var funcionou = false;
    document.documentElement.classList.add("tem-revelar");

    var observador = new IntersectionObserver(
      function (entradas) {
        funcionou = true;
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("revelado");
            observador.unobserve(entrada.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px" }
    );
    alvos.forEach(function (el) {
      observador.observe(el);
    });

    // Rede de segurança: se o navegador nunca chamar o observador, mostra tudo.
    setTimeout(function () {
      if (funcionou) return;
      alvos.forEach(function (el) {
        el.classList.add("revelado");
      });
    }, 2500);
  }

  function profundidade() {
    var alvos = document.querySelectorAll("[data-profundidade]");
    if (reduzir || !alvos.length) return;

    var agendado = false;
    function atualizar() {
      agendado = false;
      var alturaTela = window.innerHeight;
      alvos.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > alturaTela) return;
        var fator = parseFloat(el.getAttribute("data-profundidade")) || 0.12;
        var deslocamento = (r.top + r.height / 2 - alturaTela / 2) * -fator;
        el.style.setProperty("--profundidade", deslocamento.toFixed(1) + "px");
      });
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!agendado) {
          agendado = true;
          window.requestAnimationFrame(atualizar);
        }
      },
      { passive: true }
    );
    atualizar();
  }

  function init() {
    revelarAoRolar();
    profundidade();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
