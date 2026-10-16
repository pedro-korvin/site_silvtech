/* ==========================================================================
   Silvtech — Formulário de contato
   Envia via EmailJS. Nomes de campo mantidos compatíveis com o template
   existente (from_name, company_name, from_email, whatsapp, message).
   ========================================================================== */
(function () {
  "use strict";

  var EMAILJS_CONFIG = {
    publicKey: "tAdAYvLXjMnBVt55G",
    serviceId: "service_zb4k10g",
    templateId: "template_norkezq",
  };

  // Mesmos códigos usados pelo configurador da home:
  // /fale-conosco.html?desafio=gestao&setor=saas
  var DESAFIOS = {
    gestao: "Não tenho uma equipe de marketing dedicada",
    comercial: "Marketing e comercial não conversam",
    marca: "Minha marca não é reconhecida no mercado",
    digital: "Minha presença digital não gera resultado",
  };
  var SETORES = {
    "provedores-de-internet": "Provedores de internet",
    clinicas: "Clínicas",
    "energia-solar": "Energia solar",
    industria: "Indústria",
    "seguranca-eletronica": "Segurança eletrônica",
    saas: "SaaS",
    outro: "Outro setor B2B",
  };

  var desafioEscolhido = "";

  function iniciarDesafios(form) {
    var fichas = form.querySelectorAll("[data-desafio]");
    fichas.forEach(function (ficha) {
      ficha.addEventListener("click", function () {
        var ativa = ficha.getAttribute("aria-pressed") === "true";
        fichas.forEach(function (f) {
          f.setAttribute("aria-pressed", "false");
        });
        ficha.setAttribute("aria-pressed", ativa ? "false" : "true");
        desafioEscolhido = ativa ? "" : ficha.getAttribute("data-desafio");
      });
    });
  }

  function preencherPelaUrl(form) {
    if (typeof URLSearchParams === "undefined") return;
    var q = new URLSearchParams(window.location.search);
    var desafio = q.get("desafio");
    var setor = q.get("setor");
    if (DESAFIOS[desafio]) {
      var ficha = form.querySelector('[data-desafio="' + desafio + '"]');
      if (ficha) ficha.click();
    }
    if (SETORES[setor] && form.message && !form.message.value) {
      form.message.value = "Setor: " + SETORES[setor] + ".\n";
    }
  }

  // "(48) 99999-0000" -> "48999990000"
  function onlyDigits(value) {
    return (value || "").replace(/\D/g, "");
  }

  function setFeedback(el, message, isError) {
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
    el.classList.toggle("form-feedback--erro", isError);
  }

  function handleSubmit(e) {
    e.preventDefault();

    var form = e.target;
    var button = form.querySelector('button[type="submit"]');
    var feedback = form.querySelector(".form-feedback");

    form.classList.add("tentou");
    if (!form.checkValidity()) {
      setFeedback(feedback, "Preencha nome, empresa, e-mail e WhatsApp para enviarmos o diagnóstico.", true);
      var invalido = form.querySelector(":invalid");
      if (invalido) invalido.focus();
      return;
    }

    if (typeof emailjs === "undefined") {
      setFeedback(feedback, "Não foi possível enviar agora. Fale com a gente pelo WhatsApp: (43) 98873-8360.", true);
      return;
    }

    var originalHtml = button.innerHTML;
    button.disabled = true;
    button.textContent = "Enviando...";

    var mensagem = form.message.value.trim();
    if (desafioEscolhido) mensagem = "Principal desafio: " + DESAFIOS[desafioEscolhido] + "\n" + mensagem;

    var data = {
      from_name: form.from_name.value,
      company_name: form.company_name.value,
      from_email: form.from_email.value,
      whatsapp: form.whatsapp.value,
      message: mensagem,
      whatsapp_digits: onlyDigits(form.whatsapp.value),
      page_url: window.location.href,
      sent_at: new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      }),
    };

    emailjs
      .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, data)
      .then(function () {
        setFeedback(feedback, "Solicitação enviada. Entraremos em contato em até 72 horas.", false);
        form.reset();
        form.classList.remove("tentou");
        desafioEscolhido = "";
        form.querySelectorAll("[data-desafio]").forEach(function (f) {
          f.setAttribute("aria-pressed", "false");
        });
        if (typeof window.gtag === "function") window.gtag("event", "generate_lead", { form: "diagnostico" });
        if (typeof window.fbq === "function") window.fbq("track", "Lead");
      })
      .catch(function (error) {
        console.error("EmailJS error:", error);
        setFeedback(feedback, "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.", true);
      })
      .finally(function () {
        button.disabled = false;
        button.innerHTML = originalHtml;
      });
  }

  function init() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    // O envio é sempre tratado aqui: sem isso, o navegador mandaria os dados
    // pelo endereço da página caso o EmailJS não carregasse.
    form.addEventListener("submit", handleSubmit);
    iniciarDesafios(form);
    preencherPelaUrl(form);
    if (typeof emailjs !== "undefined") emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
