class SilvtechServicesPage {
  constructor() {
    this.isLoaded = false;
    this.currentStep = 1;
    this.totalSteps = 3;
    this.formData = {};
    this.animations = new Map();
    this.observers = [];
    this.counters = new Map();

    this.init();
  }

  init() {
    this.setupLoadingScreen();
    this.setupScrollEffects();
    this.setupIntersectionObservers();
    this.setupCounterAnimations();
    this.setupTabSystem();
    this.setupFormSystem();
    this.setupMicroInteractions();
    this.setupParticleEffects();
    this.setupGrowthChart();
    this.setupPerformanceOptimizations();

    console.log("🚀 Silvtech Services - Sistema de Conversão Ativado!");
  }

  // ========================================
  // LOADING SCREEN
  // ========================================
  setupLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    const progressBar = document.querySelector(".loading-progress");

    if (!loadingScreen || !progressBar) return;

    // Simular carregamento
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) progress = 100;

      progressBar.style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(loadingInterval);
        setTimeout(() => {
          loadingScreen.classList.add("hidden");
          this.isLoaded = true;
          this.startPageAnimations();
        }, 500);
      }
    }, 200);

    // Fallback para garantir que a tela de loading desapareça
    setTimeout(() => {
      if (!this.isLoaded) {
        loadingScreen.classList.add("hidden");
        this.isLoaded = true;
        this.startPageAnimations();
      }
    }, 4000);
  }

  startPageAnimations() {
    // Animar elementos do hero
    const heroElements = [
      ".hero-badge",
      ".hero-title",
      ".hero-subtitle",
      ".hero-stats",
      ".hero-cta",
    ];

    heroElements.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) {
        setTimeout(() => {
          element.style.animation = `slideInUp 0.8s ease-out both`;
        }, index * 200);
      }
    });

    // Iniciar animação dos contadores
    this.startCounters();
  }

  // ========================================
  // SCROLL EFFECTS
  // ========================================
  setupScrollEffects() {
    let ticking = false;
    let lastScrollY = 0;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  handleScroll() {
    const scrollY = window.pageYOffset;
    const scrollDirection = scrollY > lastScrollY ? "down" : "up";
    lastScrollY = scrollY;

    // Parallax effect no hero
    this.updateParallax(scrollY);

    // Revelar elementos baseado no scroll
    this.revealOnScroll();
  }

  updateParallax(scrollY) {
    const heroParticles = document.querySelector(".hero-particles");
    const floatingElements = document.querySelectorAll(".floating-icon");

    if (heroParticles) {
      const speed = 0.3;
      heroParticles.style.transform = `translateY(${scrollY * speed}px)`;
    }

    floatingElements.forEach((element, index) => {
      const speed = 0.1 + index * 0.05;
      element.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }

  // ========================================
  // INTERSECTION OBSERVERS
  // ========================================
  setupIntersectionObservers() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    // Observer para seções
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          this.animateSectionElements(entry.target);
        }
      });
    }, observerOptions);

    // Observar seções principais
    const sections = document.querySelectorAll(
      ".problem-section, .services-section, .social-proof-section, .contact-section",
    );
    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

    this.observers.push(sectionObserver);
  }

  animateSectionElements(section) {
    const cards = section.querySelectorAll(
      ".problem-card, .result-card, .tab-panel",
    );

    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.animation = `slideInUp 0.6s ease-out both`;
      }, index * 150);
    });
  }

  revealOnScroll() {
    const elements = document.querySelectorAll("[data-reveal]");

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8;

      if (isVisible && !element.classList.contains("revealed")) {
        element.classList.add("revealed");
        element.style.animation = "slideInUp 0.8s ease-out both";
      }
    });
  }

  // ========================================
  // COUNTER ANIMATIONS
  // ========================================
  setupCounterAnimations() {
    const counterElements = document.querySelectorAll(
      "[data-target], [data-counter]",
    );

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !entry.target.classList.contains("counted")
          ) {
            this.animateCounter(entry.target);
            entry.target.classList.add("counted");
          }
        });
      },
      { threshold: 0.5 },
    );

    counterElements.forEach((element) => {
      counterObserver.observe(element);
    });

    this.observers.push(counterObserver);
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.target || element.dataset.counter);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        current = target;
        element.textContent = this.formatNumber(current);
        return;
      }

      element.textContent = this.formatNumber(Math.floor(current));
      requestAnimationFrame(updateCounter);
    };

    updateCounter();
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "k";
    }
    return num.toString();
  }

  startCounters() {
    // Iniciar contadores do hero imediatamente
    const heroCounters = document.querySelectorAll(".hero-stats [data-target]");
    heroCounters.forEach((counter) => {
      setTimeout(() => {
        this.animateCounter(counter);
        counter.classList.add("counted");
      }, 1000);
    });
  }

  // ========================================
  // TAB SYSTEM
  // ========================================
  setupTabSystem() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetTab = button.dataset.tab;

        // Remover classe active de todos os botões e painéis
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabPanels.forEach((panel) => panel.classList.remove("active"));

        // Adicionar classe active ao botão clicado
        button.classList.add("active");

        // Mostrar painel correspondente
        const targetPanel = document.getElementById(targetTab);
        if (targetPanel) {
          targetPanel.classList.add("active");

          // Animar contadores do painel ativo
          const counters = targetPanel.querySelectorAll("[data-counter]");
          counters.forEach((counter, index) => {
            setTimeout(() => {
              if (!counter.classList.contains("counted")) {
                this.animateCounter(counter);
                counter.classList.add("counted");
              }
            }, index * 200);
          });
        }

        // Analytics tracking
        this.trackTabInteraction(targetTab);
      });
    });
  }

  trackTabInteraction(tabName) {
    // Google Analytics tracking
    if (typeof gtag !== "undefined") {
      gtag("event", "tab_click", {
        tab_name: tabName,
        page_location: window.location.href,
      });
    }

    console.log(`📊 Tab interaction: ${tabName}`);
  }

  // ========================================
  // FORM SYSTEM
  // ========================================
  setupFormSystem() {
    const form = document.getElementById("lead-form");
    const nextBtn = document.querySelector(".btn-next");
    const prevBtn = document.querySelector(".btn-prev");
    const submitBtn = document.querySelector(".btn-submit");
    const progressFill = document.querySelector(".progress-fill");
    const currentStepSpan = document.querySelector(".current-step");

    if (!form) return;

    // Navegação do formulário
    nextBtn?.addEventListener("click", () => this.nextStep());
    prevBtn?.addEventListener("click", () => this.prevStep());

    // Submissão do formulário
    form.addEventListener("submit", (e) => this.handleFormSubmit(e));

    // Validação em tempo real
    this.setupFormValidation();

    // Auto-save dos dados
    this.setupFormAutoSave();
  }

  nextStep() {
    if (!this.validateCurrentStep()) return;

    if (this.currentStep < this.totalSteps) {
      // Esconder step atual
      const currentStepEl = document.querySelector(
        `.form-step[data-step="${this.currentStep}"]`,
      );
      currentStepEl?.classList.remove("active");

      this.currentStep++;

      // Mostrar próximo step
      const nextStepEl = document.querySelector(
        `.form-step[data-step="${this.currentStep}"]`,
      );
      nextStepEl?.classList.add("active");

      // Atualizar UI
      this.updateFormProgress();
      this.updateFormButtons();

      // Salvar dados do step
      this.saveStepData();

      // Analytics
      this.trackFormProgress();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      // Esconder step atual
      const currentStepEl = document.querySelector(
        `.form-step[data-step="${this.currentStep}"]`,
      );
      currentStepEl?.classList.remove("active");

      this.currentStep--;

      // Mostrar step anterior
      const prevStepEl = document.querySelector(
        `.form-step[data-step="${this.currentStep}"]`,
      );
      prevStepEl?.classList.add("active");

      // Atualizar UI
      this.updateFormProgress();
      this.updateFormButtons();
    }
  }

  updateFormProgress() {
    const progressFill = document.querySelector(".progress-fill");
    const currentStepSpan = document.querySelector(".current-step");

    const progressPercentage = (this.currentStep / this.totalSteps) * 100;

    if (progressFill) {
      progressFill.style.width = `${progressPercentage}%`;
    }

    if (currentStepSpan) {
      currentStepSpan.textContent = this.currentStep;
    }
  }

  updateFormButtons() {
    const nextBtn = document.querySelector(".btn-next");
    const prevBtn = document.querySelector(".btn-prev");
    const submitBtn = document.querySelector(".btn-submit");

    // Botão voltar
    if (prevBtn) {
      prevBtn.style.display = this.currentStep > 1 ? "inline-flex" : "none";
    }

    // Botões próximo/enviar
    if (this.currentStep === this.totalSteps) {
      if (nextBtn) nextBtn.style.display = "none";
      if (submitBtn) submitBtn.style.display = "inline-flex";
    } else {
      if (nextBtn) nextBtn.style.display = "inline-flex";
      if (submitBtn) submitBtn.style.display = "none";
    }
  }

  validateCurrentStep() {
    const currentStepEl = document.querySelector(
      `.form-step[data-step="${this.currentStep}"]`,
    );
    const requiredFields = currentStepEl?.querySelectorAll("[required]");

    let isValid = true;

    requiredFields?.forEach((field) => {
      if (!field.value.trim()) {
        this.showFieldError(field, "Este campo é obrigatório");
        isValid = false;
      } else {
        this.clearFieldError(field);
      }
    });

    return isValid;
  }

  showFieldError(field, message) {
    // Remover erro anterior
    this.clearFieldError(field);

    // Adicionar classe de erro
    field.style.borderColor = "#ef4444";
    field.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)";

    // Criar mensagem de erro
    const errorEl = document.createElement("div");
    errorEl.className = "field-error";
    errorEl.textContent = message;
    errorEl.style.cssText = `
      color: #ef4444;
      font-size: 0.85rem;
      margin-top: 0.5rem;
      animation: slideInUp 0.3s ease-out;
    `;

    field.parentNode.appendChild(errorEl);
  }

  clearFieldError(field) {
    field.style.borderColor = "";
    field.style.boxShadow = "";

    const errorEl = field.parentNode.querySelector(".field-error");
    if (errorEl) {
      errorEl.remove();
    }
  }

  setupFormValidation() {
    const form = document.getElementById("lead-form");
    if (!form) return;

    // Validação em tempo real
    const inputs = form.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          this.showFieldError(input, "Este campo é obrigatório");
        } else {
          this.clearFieldError(input);
        }
      });

      input.addEventListener("input", () => {
        if (input.classList.contains("error")) {
          this.clearFieldError(input);
        }
      });
    });

    // Validação de email
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput) {
      emailInput.addEventListener("blur", () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
          this.showFieldError(emailInput, "Digite um email válido");
        }
      });
    }

    // Validação de telefone
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput) {
      phoneInput.addEventListener("input", (e) => {
        // Máscara de telefone
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/(\d{2})(\d)/, "($1) $2");
        value = value.replace(/(\d{5})(\d)/, "$1-$2");
        e.target.value = value;
      });
    }
  }

  setupFormAutoSave() {
    const form = document.getElementById("lead-form");
    if (!form) return;

    const inputs = form.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        this.saveStepData();
      });
    });
  }

  saveStepData() {
    const currentStepEl = document.querySelector(
      `.form-step[data-step="${this.currentStep}"]`,
    );
    const inputs = currentStepEl?.querySelectorAll("input, select, textarea");

    inputs?.forEach((input) => {
      if (input.value) {
        this.formData[input.name] = input.value;
      }
    });

    // Salvar no localStorage
    localStorage.setItem("silvtech_form_data", JSON.stringify(this.formData));
  }

  loadSavedData() {
    const savedData = localStorage.getItem("silvtech_form_data");
    if (savedData) {
      this.formData = JSON.parse(savedData);

      // Preencher campos
      Object.keys(this.formData).forEach((key) => {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) {
          input.value = this.formData[key];
        }
      });
    }
  }

  async handleFormSubmit(e) {
    e.preventDefault();

    if (!this.validateCurrentStep()) return;

    // Salvar dados finais
    this.saveStepData();

    const submitBtn = document.querySelector(".btn-submit");
    const originalText = submitBtn?.innerHTML;

    try {
      // Mostrar loading
      if (submitBtn) {
        submitBtn.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
      }

      // Simular envio (substituir pela integração real)
      await this.submitForm(this.formData);

      // Sucesso
      this.showSuccessMessage();
      this.trackFormSubmission();

      // Limpar dados salvos
      localStorage.removeItem("silvtech_form_data");
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      this.showErrorMessage();
    } finally {
      // Restaurar botão
      if (submitBtn) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    }
  }

  async submitForm(data) {
    try {
      // Inicializar EmailJS
      emailjs.init("8WFy5YeQDUK8GYz1d");

      // Preparar dados para o template
      const templateParams = {
        company_name: data.company_name || "",
        segment: data.segment || "",
        revenue: data.revenue || "",
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        challenge: data.challenge || "",
        details: data.details || "",
        from_page: "Página de Serviços",
        timestamp: new Date().toLocaleString("pt-BR"),
      };

      console.log("📧 Enviando dados:", templateParams);

      // Enviar email via EmailJS
      const response = await emailjs.send(
        "service_8nyjhue",
        "template_yvhxhqj",
        templateParams,
      );

      console.log("✅ Email enviado com sucesso:", response);
      return response;
    } catch (error) {
      console.error("❌ Erro ao enviar email:", error);
      throw error;
    }
  }

  showSuccessMessage() {
    const contactSection = document.querySelector(".contact-section");

    const successHTML = `
      <div class="success-message" style="
        text-align: center;
        padding: 4rem 2rem;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 25px;
        animation: slideInUp 0.6s ease-out;
      ">
        <div style="
          width: 80px;
          height: 80px;
          background: var(--success-green);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          font-size: 2rem;
          color: white;
        ">
          <i class="fa-solid fa-check"></i>
        </div>
        <h3 style="font-size: 2rem; margin-bottom: 1rem; color: white;">
          Formulário Enviado com Sucesso!
        </h3>
        <p style="font-size: 1.2rem; color: rgba(255, 255, 255, 0.8); margin-bottom: 2rem;">
          Recebemos suas informações e entraremos em contato em até 2 horas.
        </p>
        <a href="https://wa.me/5543988738360" target="_blank" style="
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: var(--success-green);
          color: white;
          text-decoration: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          transition: var(--transition-smooth);
        ">
          <i class="fa-brands fa-whatsapp"></i>
          Falar no WhatsApp Agora
        </a>
      </div>
    `;

    contactSection.innerHTML = successHTML;
  }

  showErrorMessage() {
    // Implementar mensagem de erro
    alert(
      "Erro ao enviar formulário. Tente novamente ou entre em contato pelo WhatsApp.",
    );
  }

  trackFormProgress() {
    if (typeof gtag !== "undefined") {
      gtag("event", "form_progress", {
        step: this.currentStep,
        total_steps: this.totalSteps,
      });
    }
  }

  trackFormSubmission() {
    if (typeof gtag !== "undefined") {
      gtag("event", "form_submit", {
        form_name: "lead_form",
        page_location: window.location.href,
      });
    }

    // Facebook Pixel
    if (typeof fbq !== "undefined") {
      fbq("track", "Lead");
    }
  }

  // ========================================
  // MICRO INTERACTIONS
  // ========================================
  setupMicroInteractions() {
    this.setupHoverEffects();
    this.setupClickEffects();
    this.setupMagneticEffects();
  }

  setupHoverEffects() {
    // Botões com efeito de brilho
    const buttons = document.querySelectorAll(
      ".cta-primary, .cta-secondary, .btn-next, .btn-submit",
    );

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        this.createGlowEffect(button);
      });
    });
  }

  setupClickEffects() {
    // Efeito ripple nos botões
    const clickableElements = document.querySelectorAll(
      "button, .cta-primary, .cta-secondary, .tab-btn",
    );

    clickableElements.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.createRippleEffect(e, element);
      });
    });
  }

  setupMagneticEffects() {
    const magneticElements = document.querySelectorAll(
      ".cta-primary, .floating-icon",
    );

    magneticElements.forEach((element) => {
      element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const strength = 0.3;
        element.style.transform = `translate(${x * strength}px, ${
          y * strength
        }px)`;
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform = "";
      });
    });
  }

  createRippleEffect(e, element) {
    const ripple = document.createElement("div");
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 1000;
    `;

    element.style.position = "relative";
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  createGlowEffect(element) {
    element.style.boxShadow = "0 0 30px rgba(17, 73, 255, 0.5)";

    setTimeout(() => {
      element.style.boxShadow = "";
    }, 300);
  }

  // ========================================
  // PARTICLE EFFECTS
  // ========================================
  setupParticleEffects() {
    this.createFloatingParticles();
    this.setupInteractiveParticles();
  }

  createFloatingParticles() {
    const particleContainer = document.querySelector(".hero-particles");
    if (!particleContainer) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "floating-particle";

      const size = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 10 + 10;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: floatParticle ${duration}s linear infinite;
        pointer-events: none;
      `;

      particleContainer.appendChild(particle);
    }
  }

  setupInteractiveParticles() {
    document.addEventListener("mousemove", (e) => {
      if (Math.random() > 0.95) {
        // 5% de chance
        this.createMouseParticle(e.clientX, e.clientY);
      }
    });
  }

  createMouseParticle(x, y) {
    const particle = document.createElement("div");
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: var(--primary-blue);
      border-radius: 50%;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      z-index: 9999;
      animation: mouseParticle 1s ease-out forwards;
    `;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 1000);
  }

  // ========================================
  // GROWTH CHART
  // ========================================
  setupGrowthChart() {
    const canvas = document.getElementById("growth-animation");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    this.animateGrowthChart(ctx, canvas);
  }

  animateGrowthChart(ctx, canvas) {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Dados do gráfico
    const data = [10, 25, 45, 70, 120, 180, 250, 350, 480, 650];
    const maxValue = Math.max(...data);

    let animationProgress = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Configurar estilo
      ctx.strokeStyle = "#1149ff";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Desenhar linha
      ctx.beginPath();

      const pointsToShow = Math.floor(animationProgress * data.length);

      for (let i = 0; i <= pointsToShow; i++) {
        const x = (i / (data.length - 1)) * (width - 40) + 20;
        const y = height - 40 - (data[i] / maxValue) * (height - 80);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        // Desenhar pontos
        ctx.save();
        ctx.fillStyle = "#06b6d4";
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.stroke();

      // Continuar animação
      if (animationProgress < 1) {
        animationProgress += 0.02;
        requestAnimationFrame(animate);
      }
    };

    // Iniciar animação quando visível
    const chartObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate();
          chartObserver.unobserve(entry.target);
        }
      });
    });

    chartObserver.observe(canvas);
  }

  // ========================================
  // PERFORMANCE OPTIMIZATIONS
  // ========================================
  setupPerformanceOptimizations() {
    // Lazy loading para imagens
    this.setupLazyLoading();

    // Debounce para eventos de scroll
    this.setupScrollDebounce();

    // Preload de recursos críticos
    this.preloadCriticalResources();
  }

  setupLazyLoading() {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  setupScrollDebounce() {
    let scrollTimeout;

    window.addEventListener(
      "scroll",
      () => {
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(() => {
          this.handleScroll();
        }, 16); // ~60fps
      },
      { passive: true },
    );
  }

  preloadCriticalResources() {
    // Preload de fontes críticas
    const fontLinks = [
      "https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap",
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
    ];

    fontLinks.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "style";
      link.href = href;
      document.head.appendChild(link);
    });
  }

  // ========================================
  // UTILITY METHODS
  // ========================================
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // ========================================
  // CLEANUP
  // ========================================
  destroy() {
    // Limpar observers
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];

    // Limpar event listeners
    window.removeEventListener("scroll", this.handleScroll);

    console.log("🧹 Silvtech Services - Sistema limpo");
  }
}

// ========================================
// CSS ANIMATIONS (adicionadas via JS)
// ========================================
const additionalStyles = `
  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  @keyframes floatParticle {
    0% {
      transform: translateY(0px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
      opacity: 0;
    }
  }
  
  @keyframes mouseParticle {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0) translateY(-20px);
      opacity: 0;
    }
  }
  
  .floating-particle {
    will-change: transform, opacity;
  }
  
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;

const processSteps = document.querySelectorAll(".process-step");

let currentProcess = 0;

function animateProcess() {
  processSteps.forEach((step) => step.classList.remove("active"));

  processSteps[currentProcess].classList.add("active");

  currentProcess++;

  if (currentProcess >= processSteps.length) {
    currentProcess = 0;
  }
}

animateProcess();

setInterval(animateProcess, 1300);

function animateProcess() {
  if (!processSteps.length) return; // não existe essa seção nesta página, sai sem quebrar

  processSteps.forEach((step) => step.classList.remove("active"));
  processSteps[currentProcess].classList.add("active");

  currentProcess++;
  if (currentProcess >= processSteps.length) {
    currentProcess = 0;
  }
}

// Adicionar estilos ao documento
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  window.silvtechServices = new SilvtechServicesPage();
});

// Cleanup ao sair da página
window.addEventListener("beforeunload", () => {
  if (window.silvtechServices) {
    window.silvtechServices.destroy();
  }
});
