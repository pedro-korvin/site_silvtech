/* ==========================================================================
   Silvtech — JS compartilhado do design system v3.
   Tudo aqui é aprimoramento progressivo: sem JS, todo o conteúdo aparece.
   "?estatico" no endereço desliga as animações (usado nas capturas de tela).
   ========================================================================== */
(function () {
  "use strict";

  var raiz = document.documentElement;
  var estatico = /[?&]estatico\b/.test(location.search);
  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var semMovimento = estatico || reduzido;
  var ponteiroFino = window.matchMedia("(pointer: fine)").matches;

  window.Silvtech = { estatico: estatico, semMovimento: semMovimento };

  /* ---- Cabeçalho: fundo ao rolar, esconde ao descer, volta ao subir ---- */
  function iniciarCabecalho() {
    var cab = document.querySelector(".cabecalho");
    if (!cab) return;
    var ultimo = window.scrollY;
    var pendente = false;

    function atualizar() {
      pendente = false;
      var y = window.scrollY;
      cab.classList.toggle("rolado", y > 24);
      if (!raiz.classList.contains("menu-aberto")) {
        cab.classList.toggle("escondido", y > 480 && y > ultimo + 4);
        if (y < ultimo - 4) cab.classList.remove("escondido");
      }
      ultimo = y;
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

  /* ---- Menu de tela cheia ---- */
  function iniciarMenu() {
    var botao = document.querySelector(".menu-botao");
    var menu = document.getElementById("menu");
    if (!botao || !menu) return;

    function definir(aberto) {
      raiz.classList.toggle("menu-aberto", aberto);
      botao.setAttribute("aria-expanded", aberto ? "true" : "false");
      botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    }

    botao.addEventListener("click", function () {
      definir(!raiz.classList.contains("menu-aberto"));
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        definir(false);
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && raiz.classList.contains("menu-aberto")) {
        definir(false);
        botao.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1180) definir(false);
    });
  }

  /* ---- Revelar ao rolar ----
     Só esconde se houver IntersectionObserver. Além do observer, uma
     checagem na rolagem garante que nada fique invisível (bug antigo do
     blog no Safari). */
  function iniciarRevelar() {
    var els = Array.prototype.slice.call(document.querySelectorAll(".revelar, .revelar-foto"));
    if (!els.length || semMovimento || !("IntersectionObserver" in window)) return;

    raiz.classList.add("js-anima");

    function mostrar(el) {
      el.classList.add("visivel");
    }

    var obs = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (en) {
          if (en.isIntersecting) {
            mostrar(en.target);
            obs.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach(function (el) {
      obs.observe(el);
    });

    var pendente = false;
    function conferir() {
      pendente = false;
      var limite = window.innerHeight * 1.05;
      els = els.filter(function (el) {
        if (el.classList.contains("visivel")) return false;
        if (el.getBoundingClientRect().top < limite) {
          mostrar(el);
          return false;
        }
        return true;
      });
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!pendente && els.length) {
          pendente = true;
          setTimeout(function () {
            requestAnimationFrame(conferir);
          }, 250);
        }
      },
      { passive: true }
    );
    setTimeout(conferir, 1200);
  }

  /* ---- Brilho que segue o mouse nos cartões ---- */
  function iniciarBrilho() {
    if (!ponteiroFino) return;
    document.querySelectorAll(".brilho").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", e.clientX - r.left + "px");
        el.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }

  /* ---- Faixa de logos em loop (clona a lista uma vez) ---- */
  function iniciarLogos() {
    if (reduzido) return;
    document.querySelectorAll("[data-logos]").forEach(function (faixa) {
      var trilha = faixa.querySelector(".logos__trilha");
      if (!trilha) return;
      Array.prototype.slice.call(trilha.children).forEach(function (item) {
        var copia = item.cloneNode(true);
        copia.setAttribute("aria-hidden", "true");
        copia.querySelectorAll("img").forEach(function (img) {
          img.alt = "";
        });
        trilha.appendChild(copia);
      });
      faixa.classList.add("ativo");
      if (estatico) faixa.classList.add("parado");
      var largura = trilha.scrollWidth / 2;
      faixa.style.setProperty("--duracao", Math.max(24, largura / 45) + "s");
    });
  }

  /* ---- Profundidade: camadas que acompanham o mouse ---- */
  function iniciarProfundidade() {
    if (semMovimento || !ponteiroFino) return;
    var grupos = new Map();
    document.querySelectorAll("[data-profundidade]").forEach(function (el) {
      var pai = el.closest("section") || document.body;
      if (!grupos.has(pai)) grupos.set(pai, []);
      grupos.get(pai).push(el);
    });
    grupos.forEach(function (camadas, pai) {
      var alvoX = 0;
      var alvoY = 0;
      var x = 0;
      var y = 0;
      var rodando = false;
      function passo() {
        x += (alvoX - x) * 0.08;
        y += (alvoY - y) * 0.08;
        camadas.forEach(function (el) {
          var p = parseFloat(el.getAttribute("data-profundidade")) || 0;
          el.style.translate = (x * p * 22).toFixed(2) + "px " + (y * p * 22).toFixed(2) + "px";
        });
        if (Math.abs(alvoX - x) > 0.001 || Math.abs(alvoY - y) > 0.001) {
          requestAnimationFrame(passo);
        } else {
          rodando = false;
        }
      }
      function mover(nx, ny) {
        alvoX = nx;
        alvoY = ny;
        if (!rodando) {
          rodando = true;
          requestAnimationFrame(passo);
        }
      }
      pai.addEventListener("pointermove", function (e) {
        var r = pai.getBoundingClientRect();
        mover((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
      });
      pai.addEventListener("pointerleave", function () {
        mover(0, 0);
      });
    });
  }

  /* ---- Rede de pontos animada (fundo do topo) ---- */
  function iniciarRede() {
    var canvas = document.querySelector(".hero__rede");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var w = 0;
    var h = 0;
    var pontos = [];
    var mouse = { x: -9999, y: -9999 };
    var visivel = true;
    var quadroId = 0;
    var LIMITE = 150;

    function dimensionar() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(95, (w * h) / 15000));
      pontos = [];
      for (var i = 0; i < n; i++) {
        pontos.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.3 + 0.6,
        });
      }
    }

    function desenhar(mover) {
      ctx.clearRect(0, 0, w, h);
      var i;
      var j;
      var a;
      var b;
      var dx;
      var dy;
      var d;
      for (i = 0; i < pontos.length; i++) {
        a = pontos[i];
        if (mover) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < -20) a.x = w + 20;
          if (a.x > w + 20) a.x = -20;
          if (a.y < -20) a.y = h + 20;
          if (a.y > h + 20) a.y = -20;
        }
      }
      ctx.lineWidth = 1;
      for (i = 0; i < pontos.length; i++) {
        a = pontos[i];
        for (j = i + 1; j < pontos.length; j++) {
          b = pontos[j];
          dx = a.x - b.x;
          dy = a.y - b.y;
          d = dx * dx + dy * dy;
          if (d < LIMITE * LIMITE) {
            ctx.strokeStyle = "rgba(92, 140, 255," + (1 - Math.sqrt(d) / LIMITE) * 0.32 + ")";
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        dx = a.x - mouse.x;
        dy = a.y - mouse.y;
        d = Math.sqrt(dx * dx + dy * dy);
        if (d < 190) {
          ctx.strokeStyle = "rgba(63, 216, 255," + (1 - d / 190) * 0.55 + ")";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      for (i = 0; i < pontos.length; i++) {
        a = pontos[i];
        ctx.fillStyle = "rgba(160, 190, 255, 0.75)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function laco() {
      quadroId = 0;
      if (!visivel || document.hidden) return;
      desenhar(true);
      quadroId = requestAnimationFrame(laco);
    }

    function retomar() {
      if (semMovimento) return;
      if (!quadroId && visivel && !document.hidden) quadroId = requestAnimationFrame(laco);
    }

    dimensionar();
    desenhar(false);
    if (semMovimento) return;

    var tempo;
    window.addEventListener("resize", function () {
      clearTimeout(tempo);
      tempo = setTimeout(function () {
        dimensionar();
        desenhar(false);
      }, 200);
    });
    var sec = canvas.parentElement;
    if (ponteiroFino) {
      sec.addEventListener("pointermove", function (e) {
        var r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
      });
      sec.addEventListener("pointerleave", function () {
        mouse.x = mouse.y = -9999;
      });
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        visivel = en[0].isIntersecting;
        retomar();
      }).observe(canvas);
    }
    document.addEventListener("visibilitychange", retomar);
    retomar();
  }

  /* ---- Texto que acende palavra por palavra conforme a rolagem ---- */
  function quebrarPalavras(no) {
    Array.prototype.slice.call(no.childNodes).forEach(function (filho) {
      if (filho.nodeType === 3) {
        var frag = document.createDocumentFragment();
        filho.textContent.split(/(s+)/).forEach(function (parte) {
          if (!parte) return;
          if (/^s+$/.test(parte)) {
            frag.appendChild(document.createTextNode(parte));
          } else {
            var s = document.createElement("span");
            s.className = "palavra";
            s.textContent = parte;
            frag.appendChild(s);
          }
        });
        no.replaceChild(frag, filho);
      } else if (filho.nodeType === 1) {
        quebrarPalavras(filho);
      }
    });
  }

  function iniciarPalavras() {
    if (semMovimento) return;
    document.querySelectorAll("[data-palavras]").forEach(function (bloco) {
      quebrarPalavras(bloco);
      var palavras = bloco.querySelectorAll(".palavra");
      bloco.classList.add("palavras-ativas");
      var pendente = false;

      function atualizar() {
        pendente = false;
        var r = bloco.getBoundingClientRect();
        var vh = window.innerHeight;
        var progresso = (vh * 0.88 - r.top) / (r.height + vh * 0.38);
        progresso = Math.max(0, Math.min(1, progresso));
        var acesas = Math.round(progresso * palavras.length);
        palavras.forEach(function (p, i) {
          p.classList.toggle("acesa", i < acesas);
        });
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
    });
  }

  /* ---- S.C.A.L.E: letra e índice acompanham a etapa na tela ---- */
  function iniciarScale() {
    var sec = document.querySelector("[data-scale]");
    if (!sec || !("IntersectionObserver" in window)) return;
    var letras = sec.querySelectorAll(".scale__letra span");
    var indice = sec.querySelectorAll(".scale__indice li");
    var atual = 0;

    function ativar(n) {
      if (n === atual) return;
      atual = n;
      letras.forEach(function (l, i) {
        l.classList.toggle("ativa", i === n);
        l.classList.toggle("saiu", i < n);
      });
      indice.forEach(function (li, i) {
        li.classList.toggle("ativo", i === n);
        li.classList.toggle("feito", i < n);
      });
    }

    var obs = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (en) {
          if (en.isIntersecting) ativar(Number(en.target.getAttribute("data-indice")));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sec.querySelectorAll(".scale__etapa").forEach(function (el) {
      obs.observe(el);
    });
  }

  /* ---- Abas genéricas: [data-abas] com .abas__botao e .abas__painel ---- */
  function iniciarAbas() {
    document.querySelectorAll("[data-abas]").forEach(function (grupo, g) {
      var botoes = Array.prototype.slice.call(grupo.querySelectorAll(".abas__botao"));
      var paineis = Array.prototype.slice.call(grupo.querySelectorAll(".abas__painel"));
      if (botoes.length < 2 || botoes.length !== paineis.length) return;
      var atual = 0;
      botoes.forEach(function (b, i) {
        b.id = b.id || "aba-" + g + "-" + i;
        paineis[i].id = paineis[i].id || "painel-" + g + "-" + i;
        b.setAttribute("role", "tab");
        b.setAttribute("aria-controls", paineis[i].id);
        paineis[i].setAttribute("role", "tabpanel");
        paineis[i].setAttribute("aria-labelledby", b.id);
        b.addEventListener("click", function () {
          mostrar(i, false);
        });
      });
      var lista = grupo.querySelector(".abas__lista");
      if (lista) {
        lista.setAttribute("role", "tablist");
        lista.addEventListener("keydown", function (e) {
          var passo = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
          if (!passo) return;
          e.preventDefault();
          mostrar((atual + passo + botoes.length) % botoes.length, true);
        });
      }
      function mostrar(n, focar) {
        atual = n;
        botoes.forEach(function (b, i) {
          b.setAttribute("aria-selected", i === n ? "true" : "false");
          b.tabIndex = i === n ? 0 : -1;
        });
        paineis.forEach(function (p, i) {
          if (i === n) {
            if (p.hidden) {
              p.hidden = false;
              p.classList.remove("entrando");
              void p.offsetWidth;
              p.classList.add("entrando");
            }
          } else {
            p.hidden = true;
          }
        });
        if (focar) botoes[n].focus();
      }
      grupo.classList.add("abas--ativas");
      mostrar(0, false);
    });
  }

  /* ---- Atalhos de página: marca a seção que está na tela ---- */
  function iniciarAtalhos() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".atalhos__lista a[href^=\"#\"]"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var obs = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle("ativo", a.getAttribute("href") === "#" + en.target.id);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach(function (a) {
      var alvo = document.getElementById(a.getAttribute("href").slice(1));
      if (alvo) obs.observe(alvo);
    });
  }

  /* ---- Quadrantes que se acendem em sequência ([data-quadrantes]) ---- */
  function iniciarQuadrantes() {
    if (semMovimento) return;
    document.querySelectorAll("[data-quadrantes]").forEach(function (grupo) {
      var itens = grupo.children;
      var atual = 0;
      setInterval(function () {
        itens[atual].classList.remove("ativo");
        atual = (atual + 1) % itens.length;
        itens[atual].classList.add("ativo");
      }, 2200);
    });
  }

  function iniciar() {
    iniciarCabecalho();
    iniciarMenu();
    iniciarRevelar();
    iniciarBrilho();
    iniciarLogos();
    iniciarProfundidade();
    iniciarRede();
    iniciarPalavras();
    iniciarScale();
    iniciarAbas();
    iniciarAtalhos();
    iniciarQuadrantes();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
