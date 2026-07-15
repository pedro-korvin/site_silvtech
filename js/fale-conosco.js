document.addEventListener("DOMContentLoaded", function () {
  // Inicializar todas as funcionalidades
  initScrollAnimations();
  initCounterAnimations();
  initFormEnhancements();
  initParallaxEffect();
  initTypingEffect();

  console.log("Fale Conosco page loaded successfully!");
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animações específicas por elemento
        if (entry.target.classList.contains("contact-info")) {
          entry.target.classList.add("slide-in-left");
        } else if (entry.target.classList.contains("contact-form-wrapper")) {
          entry.target.classList.add("slide-in-right");
        } else if (entry.target.classList.contains("testimonial-card")) {
          const delay =
            Array.from(entry.target.parentNode.children).indexOf(entry.target) *
            200;
          setTimeout(() => {
            entry.target.classList.add("fade-in-up");
          }, delay);
        } else {
          entry.target.classList.add("fade-in-up");
        }
      }
    });
  }, observerOptions);

  // Observar elementos para animação
  const elementsToAnimate = document.querySelectorAll(
    ".contact-info, .contact-form-wrapper, .testimonial-card, .benefit-item"
  );

  elementsToAnimate.forEach((el) => observer.observe(el));
}

// ========================================
// COUNTER ANIMATIONS
// ========================================
function initCounterAnimations() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
          }, 16);

          observer.unobserve(counter);
        }
      });
    });

    observer.observe(counter);
  });
}

// ========================================
// FORM ENHANCEMENTS
// ========================================
function initFormEnhancements() {
  const form = document.getElementById("contact-form");
  const inputs = form.querySelectorAll("input, select, textarea");
  const submitButton = form.querySelector(".submit-button");

  // Adicionar validação em tempo real
  inputs.forEach((input) => {
    input.addEventListener("blur", validateField);
    input.addEventListener("input", clearFieldError);
    input.addEventListener("focus", handleFieldFocus);
  });

  // Máscara para telefone
  const phoneInput = document.getElementById("whatsapp");
  if (phoneInput) {
    phoneInput.addEventListener("input", formatPhoneNumber);
  }

  // Animação de foco nos campos
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentNode.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentNode.classList.remove("focused");
      }
    });
  });

  // Efeito de digitação no placeholder
  initPlaceholderAnimation();
}

function validateField(e) {
  const field = e.target;
  const fieldGroup = field.parentNode;

  // Remover mensagens de erro anteriores
  clearFieldError(field);

  let isValid = true;
  let errorMessage = "";

  // Validação por tipo de campo
  if (field.hasAttribute("required") && !field.value.trim()) {
    isValid = false;
    errorMessage = "Este campo é obrigatório";
  } else if (field.type === "email" && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      errorMessage = "E-mail inválido";
    }
  } else if (field.name === "whatsapp" && field.value) {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!phoneRegex.test(field.value)) {
      isValid = false;
      errorMessage = "Formato: (11) 99999-9999";
    }
  }

  // Aplicar estilos de validação
  if (!isValid) {
    showFieldError(field, errorMessage);
  } else if (field.value) {
    showFieldSuccess(field);
  }

  return isValid;
}

function showFieldError(field, message) {
  const fieldGroup = field.parentNode;
  fieldGroup.classList.add("error");
  fieldGroup.classList.remove("success");

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.innerHTML = `⚠️ ${message}`;
  fieldGroup.appendChild(errorDiv);

  // Animação de shake
  field.style.animation = "shake 0.5s ease-in-out";
  setTimeout(() => {
    field.style.animation = "";
  }, 500);
}

function showFieldSuccess(field) {
  const fieldGroup = field.parentNode;
  fieldGroup.classList.add("success");
  fieldGroup.classList.remove("error");

  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.innerHTML = `✅ Válido`;
  fieldGroup.appendChild(successDiv);
}

function clearFieldError(field) {
  const fieldGroup = field.parentNode;
  fieldGroup.classList.remove("error", "success");

  const existingMessage = fieldGroup.querySelector(
    ".error-message, .success-message"
  );
  if (existingMessage) {
    existingMessage.remove();
  }
}

function handleFieldFocus(e) {
  const field = e.target;

  // Efeito de highlight
  field.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
  field.style.transform = "translateY(-2px)";
}

function formatPhoneNumber(e) {
  let value = e.target.value.replace(/\D/g, "");

  if (value.length >= 11) {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (value.length >= 7) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else if (value.length >= 3) {
    value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  } else if (value.length >= 1) {
    value = value.replace(/(\d{0,2})/, "($1");
  }

  e.target.value = value;
}

// ========================================
// PARALLAX EFFECT
// ========================================
function initParallaxEffect() {
  const heroSection = document.querySelector(".hero-section");

  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;

      const heroBackground = heroSection.querySelector(".hero-background");
      if (heroBackground) {
        heroBackground.style.transform = `translateY(${rate}px)`;
      }
    });
  }
}

// ========================================
// TYPING EFFECT
// ========================================
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero-content h1");

  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    // Iniciar após um pequeno delay
    setTimeout(typeWriter, 1000);
  }
}

// ========================================
// PLACEHOLDER ANIMATION
// ========================================
function initPlaceholderAnimation() {
  const inputs = document.querySelectorAll(
    "input[placeholder], textarea[placeholder]"
  );

  inputs.forEach((input) => {
    const originalPlaceholder = input.placeholder;

    input.addEventListener("focus", function () {
      if (this.placeholder === originalPlaceholder) {
        this.placeholder = "";

        let i = 0;
        const typePlaceholder = () => {
          if (i < originalPlaceholder.length) {
            this.placeholder += originalPlaceholder.charAt(i);
            i++;
            setTimeout(typePlaceholder, 50);
          }
        };

        setTimeout(typePlaceholder, 200);
      }
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.placeholder = originalPlaceholder;
      }
    });
  });
}

// ========================================
// INTERACTIVE ELEMENTS
// ========================================
function initInteractiveElements() {
  // Hover effect nos benefit items
  const benefitItems = document.querySelectorAll(".benefit-item");

  benefitItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
      this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.15)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-5px) scale(1)";
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.12)";
    });
  });

  // Efeito ripple no botão de submit
  const submitButton = document.querySelector(".submit-button");

  if (submitButton) {
    submitButton.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }
}

// ========================================
// FORM PROGRESS INDICATOR
// ========================================
function initFormProgress() {
  const form = document.getElementById("contact-form");
  const requiredFields = form.querySelectorAll("[required]");

  // Criar indicador de progresso
  const progressContainer = document.createElement("div");
  progressContainer.className = "form-progress";
  progressContainer.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <span class="progress-text">0% completo</span>
    `;

  // Inserir antes do formulário
  form.parentNode.insertBefore(progressContainer, form);

  const progressFill = progressContainer.querySelector(".progress-fill");
  const progressText = progressContainer.querySelector(".progress-text");

  function updateProgress() {
    let filledFields = 0;

    requiredFields.forEach((field) => {
      if (field.value.trim()) {
        filledFields++;
      }
    });

    const percentage = Math.round((filledFields / requiredFields.length) * 100);

    progressFill.style.width = percentage + "%";
    progressText.textContent = percentage + "% completo";

    // Mudar cor baseada no progresso
    if (percentage < 30) {
      progressFill.style.background = "#ef4444";
    } else if (percentage < 70) {
      progressFill.style.background = "#f59e0b";
    } else {
      progressFill.style.background = "#10b981";
    }
  }

  // Atualizar progresso quando campos mudarem
  requiredFields.forEach((field) => {
    field.addEventListener("input", updateProgress);
    field.addEventListener("change", updateProgress);
  });

  // CSS para o indicador de progresso
  const style = document.createElement("style");
  style.textContent = `
        .form-progress {
            margin-bottom: 30px;
            text-align: center;
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e5e7eb;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        
        .progress-fill {
            height: 100%;
            background: #ef4444;
            transition: all 0.3s ease;
            width: 0%;
        }
        
        .progress-text {
            font-size: 0.9rem;
            color: #6b7280;
            font-weight: 500;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
    `;

  document.head.appendChild(style);
}

// ========================================
// SCROLL TO FORM
// ========================================
function initScrollToForm() {
  const ctaButtons = document.querySelectorAll('a[href="#contact-form"]');

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const form = document.getElementById("contact-form");
      const offsetTop = form.offsetTop - 100;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // Destacar formulário
      setTimeout(() => {
        form.style.boxShadow = "0 0 20px rgba(59, 130, 246, 0.3)";
        setTimeout(() => {
          form.style.boxShadow = "";
        }, 2000);
      }, 500);
    });
  });
}

// Inicializar funcionalidades adicionais
document.addEventListener("DOMContentLoaded", function () {
  initInteractiveElements();
  initFormProgress();
  initScrollToForm();
});

console.log("Fale Conosco JavaScript loaded successfully!");
