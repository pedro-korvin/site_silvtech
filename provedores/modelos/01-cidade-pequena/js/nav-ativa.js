/* ==========================================================================
   Silvtech — Provedores: destaque do link ativo no menu conforme a rolagem.
   Comum a todos os modelos que têm .header__nav com âncoras internas.
   Puramente decorativo — nenhum conteúdo depende disto para aparecer.
   ========================================================================== */
(function () {
  "use strict";

  function initNavAtiva() {
    var links = document.querySelectorAll(".header__nav a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;

    var alvoPorId = {};
    links.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var secao = document.getElementById(id);
      if (secao) alvoPorId[id] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = alvoPorId[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach(function (l) {
              l.removeAttribute("aria-current");
            });
            link.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    Object.keys(alvoPorId).forEach(function (id) {
      observer.observe(document.getElementById(id));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavAtiva);
  } else {
    initNavAtiva();
  }
})();
