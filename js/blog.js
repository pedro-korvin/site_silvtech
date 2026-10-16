/* ==========================================================================
   Silvtech — Blog: filtro por tema (lista), barra de leitura e "copiar link"
   (artigo). Sem JS a lista mostra todos os artigos.
   ========================================================================== */
(function () {
  "use strict";

  function iniciarFiltros() {
    var filtros = document.querySelector(".blog-filtros");
    if (!filtros) return;
    var botoes = Array.prototype.slice.call(filtros.querySelectorAll("[data-filtro]"));
    var itens = Array.prototype.slice.call(document.querySelectorAll(".destaque-post, .blog-grade .artigo"));
    var vazio = document.querySelector(".blog-vazio");
    document.documentElement.classList.add("filtros-ativos");

    botoes.forEach(function (botao) {
      botao.addEventListener("click", function () {
        var filtro = botao.getAttribute("data-filtro");
        botoes.forEach(function (b) {
          b.setAttribute("aria-pressed", b === botao ? "true" : "false");
        });
        var visiveis = 0;
        itens.forEach(function (item) {
          var mostra = filtro === "todos" || item.getAttribute("data-grupo") === filtro;
          item.hidden = !mostra;
          if (mostra) {
            visiveis++;
            item.classList.add("visivel");
          }
        });
        if (vazio) vazio.hidden = visiveis > 0;
      });
    });
  }

  function iniciarLeitura() {
    var barra = document.querySelector(".leitura i");
    var artigo = document.querySelector(".prosa");
    if (!barra || !artigo) return;
    var pendente = false;
    function atualizar() {
      pendente = false;
      var r = artigo.getBoundingClientRect();
      var total = r.height - window.innerHeight * 0.6;
      var p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      barra.style.transform = "scaleX(" + p.toFixed(4) + ")";
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!pendente) {
          pendente = true;
          requestAnimationFrame(atualizar);
        }
      },
      { passive: true }
    );
    atualizar();
  }

  function iniciarCopiar() {
    document.querySelectorAll("[data-copiar]").forEach(function (botao) {
      botao.addEventListener("click", function () {
        var url = botao.getAttribute("data-copiar");
        var texto = botao.textContent;
        function ok() {
          botao.textContent = "Link copiado";
          setTimeout(function () {
            botao.textContent = texto;
          }, 2000);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(ok, function () {
            window.prompt("Copie o link:", url);
          });
        } else {
          window.prompt("Copie o link:", url);
        }
      });
    });
  }

  function iniciar() {
    iniciarFiltros();
    iniciarLeitura();
    iniciarCopiar();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
