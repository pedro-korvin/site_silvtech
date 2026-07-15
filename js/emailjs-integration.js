const EMAILJS_CONFIG = {
  serviceID: "service_8nyjhue",
  templateID: "template_silvtech_lead",
  publicKey: "8WFy5YeQDUK8GYz1d",
};

// Inicializar EmailJS quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar EmailJS
  emailjs.init(EMAILJS_CONFIG.publicKey);

  // Configurar formulários
  setupContactForm();

  // Aguardar e configurar newsletter
  setTimeout(setupNewsletter, 2000);

  console.log("EmailJS inicializado com sucesso!");
});

// ========================================
// FORMULÁRIO PRINCIPAL DE CONTATO
// ========================================
function setupContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmit);

    // Adicionar validações em tempo real
    const inputs = contactForm.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", validateField);
      input.addEventListener("input", clearFieldError);
    });
  }
}

async function handleContactFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;

  // Validar formulário
  if (!validateContactForm(form)) {
    showNotification(
      "Por favor, preencha todos os campos obrigatórios.",
      "error"
    );
    return;
  }

  // Desabilitar botão e mostrar loading
  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";
  submitButton.style.backgroundColor = "#ccc";

  try {
    // Coletar dados do formulário
    const formData = collectFormData(form);

    // Enviar via EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID,
      formData
    );

    console.log("Email enviado com sucesso:", response);

    // Sucesso
    showNotification(
      "Solicitação enviada com sucesso! Entraremos em contato em breve.",
      "success"
    );
    form.reset();
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    showNotification(
      "Erro ao enviar solicitação. Tente novamente ou entre em contato via WhatsApp.",
      "error"
    );
  } finally {
    // Restaurar botão
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    submitButton.style.backgroundColor = "";
  }
}

// ========================================
// NEWSLETTER (VERSÃO SUPER SIMPLES)
// ========================================
function setupNewsletter() {
  console.log("Configurando newsletter...");

  // Buscar de várias formas
  let newsletterForm = document.getElementById("newsletter-form");

  if (!newsletterForm) {
    // Tentar encontrar por classe
    const newsletterSection = document.querySelector(".newsletter");
    if (newsletterSection) {
      newsletterForm = newsletterSection.querySelector("form");
      if (newsletterForm) {
        newsletterForm.id = "newsletter-form";
        console.log("Formulário encontrado e ID adicionado!");
      }
    }
  }

  if (!newsletterForm) {
    // Tentar encontrar qualquer form dentro de .formulario
    const formularioDiv = document.querySelector(".formulario");
    if (formularioDiv) {
      newsletterForm =
        formularioDiv.closest("form") || formularioDiv.querySelector("form");
      if (newsletterForm) {
        newsletterForm.id = "newsletter-form";
        console.log("Formulário encontrado em .formulario!");
      }
    }
  }

  if (newsletterForm) {
    console.log("Newsletter form encontrado:", newsletterForm);

    // Remover qualquer action para evitar submit normal
    newsletterForm.removeAttribute("action");
    newsletterForm.removeAttribute("method");

    // Adicionar evento de submit
    newsletterForm.onsubmit = function (e) {
      e.preventDefault();
      e.stopPropagation();
      handleNewsletterSubmit(e);
      return false;
    };

    console.log("Newsletter configurada com sucesso!");
  } else {
    console.log("Newsletter form NÃO encontrado!");
  }
}

async function handleNewsletterSubmit(e) {
  console.log("Newsletter submit iniciado!");

  const form = e.target;
  const emailInput =
    form.querySelector('input[type="email"]') ||
    form.querySelector('input[name="from_email"]');
  const submitButton = form.querySelector("button");

  if (!emailInput) {
    showNotification("Campo de e-mail não encontrado.", "error");
    return;
  }

  const email = emailInput.value.trim();

  if (!email) {
    showNotification("Por favor, insira um e-mail.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showNotification("Por favor, insira um e-mail válido.", "error");
    return;
  }

  const originalButtonText = submitButton.textContent;

  // Desabilitar botão
  submitButton.disabled = true;
  submitButton.textContent = "Inscrevendo...";
  submitButton.style.backgroundColor = "#ccc";

  try {
    const newsletterData = {
      from_name: "Newsletter",
      company_name: "Inscrição Newsletter",
      from_email: email,
      whatsapp: "Newsletter",
      faturamento: "Newsletter",
      segmento: "Newsletter",
      submission_date: new Date().toLocaleString("pt-BR"),
    };

    console.log("Enviando newsletter:", newsletterData);

    await emailjs.send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID,
      newsletterData
    );

    showNotification(
      "Inscrição realizada com sucesso! Obrigado por se juntar à nossa newsletter.",
      "success"
    );
    emailInput.value = "";
  } catch (error) {
    console.error("Erro newsletter:", error);
    showNotification("Erro ao realizar inscrição. Tente novamente.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    submitButton.style.backgroundColor = "";
  }
}

// ========================================
// FUNÇÕES DE VALIDAÇÃO
// ========================================
function validateContactForm(form) {
  const requiredFields = form.querySelectorAll(
    "input[required], select[required]"
  );
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      showFieldError(field, "Este campo é obrigatório");
      isValid = false;
    } else if (field.type === "email" && !isValidEmail(field.value)) {
      showFieldError(field, "E-mail inválido");
      isValid = false;
    }
  });

  return isValid;
}

function validateField(e) {
  const field = e.target;

  if (field.hasAttribute("required") && !field.value.trim()) {
    showFieldError(field, "Este campo é obrigatório");
  } else if (
    field.type === "email" &&
    field.value &&
    !isValidEmail(field.value)
  ) {
    showFieldError(field, "E-mail inválido");
  } else {
    clearFieldError(field);
  }
}

function showFieldError(field, message) {
  clearFieldError(field);

  field.style.borderColor = "#dc3545";
  field.style.backgroundColor = "#000000ff";

  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: block;
    `;
  errorDiv.textContent = message;

  field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
  field.style.borderColor = "";
  field.style.backgroundColor = "";

  const existingError = field.parentNode.querySelector(".field-error");
  if (existingError) {
    existingError.remove();
  }
}

// ========================================
// FUNÇÕES UTILITÁRIAS
// ========================================
function collectFormData(form) {
  const formData = new FormData(form);
  const data = {};

  // Coletar dados básicos
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  // Corrigir nomes dos campos para o template
  if (data.from_name) {
    const nameInputs = form.querySelectorAll('input[name="from_name"]');
    if (nameInputs.length >= 2) {
      data.from_name = nameInputs[0].value;
      data.company_name = nameInputs[1].value;
    }
  }

  // Coletar dados dos selects
  const selects = form.querySelectorAll("select");
  selects.forEach((select, index) => {
    if (index === 0) {
      data.faturamento = select.value;
    } else if (index === 1) {
      data.segmento = select.value;
    }
  });

  data.submission_date = new Date().toLocaleString("pt-BR");
  return data;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = "notification";
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
    `;

  switch (type) {
    case "success":
      notification.style.backgroundColor = "#28a745";
      break;
    case "error":
      notification.style.backgroundColor = "#dc3545";
      break;
    default:
      notification.style.backgroundColor = "#1149ff";
  }

  notification.textContent = message;

  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-in";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// ========================================
// CORREÇÃO DO HTML DO FORMULÁRIO
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const nameInputs = contactForm.querySelectorAll('input[name="from_name"]');
    if (nameInputs.length >= 2) {
      nameInputs[1].setAttribute("name", "company_name");
      nameInputs[1].setAttribute("placeholder", "Qual o nome da sua empresa?");
    }

    const selects = contactForm.querySelectorAll("select");
    selects.forEach((select) => {
      const options = select.querySelectorAll('option:not([value=""])');
      options.forEach((option, index) => {
        if (select === selects[0]) {
          const faturamentoValues = [
            "ate-50k",
            "51k-100k",
            "101k-200k",
            "201k-300k",
            "301k-500k",
            "acima-500k",
          ];
          option.value = faturamentoValues[index] || option.textContent;
        } else if (select === selects[1]) {
          option.value = option.textContent.toLowerCase().replace(/\s+/g, "-");
        }
      });
    });
  }
});

console.log("EmailJS Simples e Funcional carregado!");
