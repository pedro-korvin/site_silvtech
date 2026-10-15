/* ==========================================================================
   Silvtech — Formulário de contato (mínimo)
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

  function init() {
    if (typeof emailjs === "undefined") return;
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });

    var form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", handleSubmit);
  }

  // "(48) 99999-0000" -> "48999990000"
  function onlyDigits(value) {
    return (value || "").replace(/\D/g, "");
  }

  function handleSubmit(e) {
    e.preventDefault();

    var form = e.target;
    var button = form.querySelector('button[type="submit"]');
    var originalText = button.textContent;
    var feedback = form.querySelector(".form-feedback");

    button.disabled = true;
    button.textContent = "Enviando...";

    var data = {
      from_name: form.from_name.value,
      company_name: form.company_name.value,
      from_email: form.from_email.value,
      whatsapp: form.whatsapp.value,
      message: form.message.value,
      whatsapp_digits: onlyDigits(form.whatsapp.value),
      page_url: window.location.href,
      sent_at: new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      }),
    };

    emailjs
      .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, data)
      .then(function () {
        setFeedback(
          feedback,
          "Solicitação enviada. Entraremos em contato em até 72 horas.",
          false,
        );
        form.reset();
      })
      .catch(function (error) {
        console.error("EmailJS error:", error);
        setFeedback(
          feedback,
          "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.",
          true,
        );
      })
      .finally(function () {
        button.disabled = false;
        button.textContent = originalText;
      });
  }

  function setFeedback(el, message, isError) {
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
    el.classList.toggle("form-feedback--erro", isError);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
