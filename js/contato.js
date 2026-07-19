/* ==========================================================================
   Silvtech — Formulário de contato (mínimo)
   Envia via EmailJS. Nomes de campo mantidos compatíveis com o template
   existente (from_name, company_name, from_email, whatsapp, message).
   ========================================================================== */
(function () {
  "use strict";

  var EMAILJS_CONFIG = {
    serviceID: "service_8nyjhue",
    templateID: "template_silvtech_lead",
    publicKey: "8WFy5YeQDUK8GYz1d",
  };

  function init() {
    if (typeof emailjs === "undefined") return;
    emailjs.init(EMAILJS_CONFIG.publicKey);

    var form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", handleSubmit);
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
      submission_date: new Date().toLocaleString("pt-BR"),
    };

    emailjs
      .send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, data)
      .then(function () {
        setFeedback(
          feedback,
          "Solicitação enviada. Entraremos em contato em até 72 horas.",
          false,
        );
        form.reset();
      })
      .catch(function () {
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
