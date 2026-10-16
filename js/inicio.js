/* ==========================================================================
   Silvtech — Página inicial: setores girando, painel S.C.A.L.E do topo,
   texto que acende ao rolar, configurador de diagnóstico e S.C.A.L.E fixo.
   ========================================================================== */
(function () {
  "use strict";

  var WHATSAPP = "5543988738360";

  function semMovimento() {
    return window.Silvtech && window.Silvtech.semMovimento;
  }

  /* ---- Setores girando no topo ---- */
  function iniciarRotativo() {
    var itens = document.querySelectorAll(".rotativo__item");
    if (itens.length < 2 || semMovimento()) return;
    var atual = 0;
    setInterval(function () {
      var anterior = itens[atual];
      atual = (atual + 1) % itens.length;
      anterior.classList.remove("ativo");
      anterior.classList.add("saindo");
      itens[atual].classList.remove("saindo");
      itens[atual].classList.add("ativo");
      setTimeout(function () {
        anterior.classList.remove("saindo");
      }, 750);
    }, 2400);
  }

  /* ---- Painel do topo percorrendo as 4 etapas ---- */
  function iniciarHud() {
    var etapas = document.querySelectorAll(".hud__etapas li");
    var barra = document.querySelector(".hud__barra i");
    if (!etapas.length || semMovimento()) return;
    var atual = 0;
    setInterval(function () {
      atual = (atual + 1) % etapas.length;
      etapas.forEach(function (li, i) {
        li.classList.toggle("ativo", i === atual);
        li.classList.toggle("feito", i < atual);
      });
      if (barra) barra.style.width = ((atual + 1) / etapas.length) * 100 + "%";
    }, 1900);
  }

  /* ---- Configurador "Monte seu diagnóstico" ---- */
  function iniciarConfigurador() {
    var sec = document.querySelector("[data-config]");
    if (!sec) return;
    var caixa = sec.querySelector(".config__caixa");
    var etapas = sec.querySelectorAll(".config__etapa");
    var passos = sec.querySelectorAll(".config__passos li");
    var abas = Array.prototype.slice.call(sec.querySelectorAll(".config__aba"));
    var paineis = Array.prototype.slice.call(sec.querySelectorAll(".config__painel"));
    var estado = { indice: 0, setor: null };

    sec.classList.add("config--ativo");

    function irPara(n, rolar) {
      etapas.forEach(function (e) {
        e.classList.toggle("atual", Number(e.getAttribute("data-etapa")) === n);
      });
      passos.forEach(function (p) {
        var k = Number(p.getAttribute("data-passo"));
        p.classList.toggle("ativo", k === n);
        p.classList.toggle("feito", k < n);
      });
      if (rolar) {
        var topo = caixa.getBoundingClientRect().top;
        if (topo < 0 || topo > window.innerHeight * 0.5) {
          var y = window.scrollY + topo - (window.innerWidth >= 768 ? 150 : 120);
          window.scrollTo({ top: y, behavior: semMovimento() ? "auto" : "smooth" });
        }
      }
    }

    function selecionar(i, focar) {
      estado.indice = i;
      abas.forEach(function (aba, k) {
        var ativa = k === i;
        aba.setAttribute("aria-selected", ativa ? "true" : "false");
        aba.tabIndex = ativa ? 0 : -1;
      });
      paineis.forEach(function (p, k) {
        var ativo = k === i;
        if (ativo && p.hidden) {
          p.hidden = false;
          p.classList.remove("entrando");
          void p.offsetWidth;
          p.classList.add("entrando");
        } else if (!ativo) {
          p.hidden = true;
        }
      });
      if (focar) abas[i].focus();
    }

    abas.forEach(function (aba, i) {
      aba.addEventListener("click", function () {
        selecionar(i, false);
      });
    });
    sec.querySelector(".config__abas").addEventListener("keydown", function (e) {
      var teclas = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (!(e.key in teclas)) return;
      e.preventDefault();
      selecionar((estado.indice + teclas[e.key] + abas.length) % abas.length, true);
    });

    sec.querySelectorAll("[data-avancar]").forEach(function (b) {
      b.addEventListener("click", function () {
        irPara(2, true);
      });
    });
    sec.querySelectorAll("[data-voltar], [data-reiniciar]").forEach(function (b) {
      b.addEventListener("click", function () {
        irPara(1, true);
      });
    });

    sec.querySelectorAll(".setor-opcao").forEach(function (op) {
      op.addEventListener("click", function (e) {
        e.preventDefault();
        mostrarResultado(op);
        irPara(3, true);
      });
    });

    function mostrarResultado(op) {
      var painel = paineis[estado.indice];
      var desafio = abas[estado.indice].getAttribute("data-desafio");
      var solucao = painel.getAttribute("data-solucao");
      var problema = painel.getAttribute("data-problema");
      var setor = op.getAttribute("data-setor");
      var nome = op.getAttribute("data-nome");

      sec.querySelector("[data-r-solucao]").textContent = solucao;
      sec.querySelector("[data-r-setor]").textContent = nome;
      sec.querySelector("[data-r-frase]").textContent = op.getAttribute("data-frase");
      var foto = sec.querySelector("[data-r-foto]");
      foto.src = "/assets/fotos/" + op.getAttribute("data-foto") + "-p.webp";

      sec.querySelector("[data-r-link]").href =
        "/fale-conosco.html?desafio=" + encodeURIComponent(desafio) + "&setor=" + encodeURIComponent(setor);

      var msg =
        "Olá! Vim pelo site da Silvtech. Meu principal desafio hoje: " +
        problema +
        ". Setor: " +
        (setor === "outro" ? "outro" : nome) +
        ". Gostaria de solicitar um diagnóstico.";
      sec.querySelector("[data-r-whats]").href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);

      if (typeof window.gtag === "function") {
        window.gtag("event", "configurador_resultado", { desafio: desafio, setor: setor });
      }
    }

    selecionar(0, false);
    irPara(1, false);
  }

  function iniciar() {
    iniciarRotativo();
    iniciarHud();
    iniciarConfigurador();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
