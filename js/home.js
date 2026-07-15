class SilvtechHomePage {
  constructor() {
    this.isLoaded = false;
    this.scrollPosition = 0;
    this.animations = new Map();
    this.observers = [];

    this.init();
  }

  init() {
    this.setupLoadingAnimation();
    this.setupScrollEffects();
    this.setupIntersectionObservers();
    this.setupParallaxEffects();
    this.setupMicroInteractions();
    this.setupFormEnhancements();
    this.setupVideoReveal();
    this.setupTypewriterEffect();
    this.setupCounterAnimations();
    this.setupCursorEffects();
    this.setupPerformanceOptimizations();

    console.log("🚀 Silvtech Home Page - Sistema Revolucionário Ativado!");
  }

  // ========================================
  // LOADING ANIMATION
  // ========================================
  setupLoadingAnimation() {
    window.addEventListener("load", () => {
      this.isLoaded = true;
      document.body.classList.add("loaded");

      // Animação sequencial de entrada
      this.animatePageEntrance();
    });
  }

  animatePageEntrance() {
    const elements = [
      ".chamariz h1",
      ".chamariz p",
      ".chamariz .cta",
      ".clientes p",
      ".logos",
    ];

    elements.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) {
        setTimeout(() => {
          element.style.animation = `slideInUp 0.8s ease-out ${
            index * 0.2
          }s both`;
        }, 100);
      }
    });
  }

  // ========================================
  // SCROLL EFFECTS AVANÇADOS
  // ========================================
  setupScrollEffects() {
    let ticking = false;

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
    const scrollDirection = scrollY > this.scrollPosition ? "down" : "up";
    this.scrollPosition = scrollY;

    // Parallax no hero
    this.updateParallax(scrollY);

    // Efeito de blur no scroll
    this.updateScrollBlur(scrollY);

    // Animação da navbar (se existir)
    this.updateNavbar(scrollY);

    // Revelar elementos baseado no scroll
    this.revealOnScroll(scrollY);
  }

  updateParallax(scrollY) {
    const hero = document.querySelector(".container1");
    if (hero) {
      const speed = 0.5;
      hero.style.transform = `translateY(${scrollY * speed}px)`;
    }

    // Parallax nas partículas
    const particles = document.querySelector(".container1::after");
    if (particles) {
      const speed = 0.3;
      document.documentElement.style.setProperty(
        "--particle-offset",
        `${scrollY * speed}px`
      );
    }
  }

  updateScrollBlur(scrollY) {
    const blurElements = document.querySelectorAll(".scroll-blur");
    const maxBlur = 10;
    const blurAmount = Math.min((scrollY / 500) * maxBlur, maxBlur);

    blurElements.forEach((element) => {
      element.style.filter = `blur(${blurAmount}px)`;
    });
  }

  updateNavbar(scrollY) {
    const navbar = document.querySelector(".header");
    if (navbar) {
      if (scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  }

  revealOnScroll(scrollY) {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    revealElements.forEach((element) => {
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;

      if (scrollY + windowHeight > elementTop + elementHeight / 4) {
        element.classList.add("revealed");
      }
    });
  }

  // ========================================
  // INTERSECTION OBSERVERS
  // ========================================
  setupIntersectionObservers() {
    // Observer para animações de entrada
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.triggerElementAnimation(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observer para lazy loading
    const lazyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.lazyLoadElement(entry.target);
            lazyObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    // Observar elementos
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      animationObserver.observe(el);
    });

    document.querySelectorAll("[data-lazy]").forEach((el) => {
      lazyObserver.observe(el);
    });

    this.observers.push(animationObserver, lazyObserver);
  }

  triggerElementAnimation(element) {
    const animationType = element.dataset.animation || "fadeInUp";
    const delay = element.dataset.delay || 0;

    setTimeout(() => {
      element.classList.add("animated", animationType);
    }, delay);
  }

  lazyLoadElement(element) {
    if (element.dataset.lazy) {
      element.src = element.dataset.lazy;
      element.classList.add("loaded");
    }
  }

  // ========================================
  // MICRO-INTERAÇÕES
  // ========================================
  setupMicroInteractions() {
    // Hover effects nos cards
    this.setupCardHoverEffects();

    // Ripple effect nos botões
    this.setupRippleEffects();

    // Magnetic effect nos CTAs
    this.setupMagneticEffects();

    // Tilt effect nas imagens
    this.setupTiltEffects();

    // Glow effect no hover
    this.setupGlowEffects();
  }

  setupCardHoverEffects() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", (e) => {
        this.animateCardHover(e.target, true);
      });

      card.addEventListener("mouseleave", (e) => {
        this.animateCardHover(e.target, false);
      });

      card.addEventListener("mousemove", (e) => {
        this.updateCardTilt(e);
      });
    });
  }

  animateCardHover(card, isHovering) {
    const icon = card.querySelector("i");
    const content = card.querySelector("p");

    if (isHovering) {
      card.style.transform = "translateY(-15px) scale(1.02)";
      if (icon) icon.style.transform = "scale(1.2) rotate(10deg)";
      if (content) content.style.transform = "translateY(-5px)";
    } else {
      card.style.transform = "";
      if (icon) icon.style.transform = "";
      if (content) content.style.transform = "";
    }
  }

  updateCardTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `translateY(-15px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  setupRippleEffects() {
    const buttons = document.querySelectorAll(".cta, .cta1, button");

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.createRipple(e);
      });
    });
  }

  createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1000;
        `;

    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  setupMagneticEffects() {
    const magneticElements = document.querySelectorAll(".cta, .cta1");

    magneticElements.forEach((element) => {
      element.addEventListener("mousemove", (e) => {
        this.updateMagneticEffect(e);
      });

      element.addEventListener("mouseleave", (e) => {
        this.resetMagneticEffect(e.target);
      });
    });
  }

  updateMagneticEffect(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const strength = 0.3;
    element.style.transform = `translate(${x * strength}px, ${
      y * strength
    }px) scale(1.05)`;
  }

  resetMagneticEffect(element) {
    element.style.transform = "";
  }

  setupTiltEffects() {
    const tiltElements = document.querySelectorAll(
      ".marketing, .prova_social img, .maps img"
    );

    tiltElements.forEach((element) => {
      element.addEventListener("mousemove", (e) => {
        this.updateTiltEffect(e);
      });

      element.addEventListener("mouseleave", (e) => {
        this.resetTiltEffect(e.target);
      });
    });
  }

  updateTiltEffect(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }

  resetTiltEffect(element) {
    element.style.transform = "";
  }

  setupGlowEffects() {
    const glowElements = document.querySelectorAll(".card, .case, .conteudo");

    glowElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        element.style.boxShadow = "0 0 30px rgba(17, 73, 255, 0.3)";
      });

      element.addEventListener("mouseleave", () => {
        element.style.boxShadow = "";
      });
    });
  }

  // ========================================
  // FORMULÁRIO INTELIGENTE
  // ========================================
  setupFormEnhancements() {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
      this.enhanceForm(form);
    });
  }

  enhanceForm(form) {
    const inputs = form.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      // Animação de foco
      input.addEventListener("focus", () => {
        this.animateInputFocus(input);
      });

      input.addEventListener("blur", () => {
        this.animateInputBlur(input);
      });

      // Validação em tempo real
      input.addEventListener("input", () => {
        this.validateInput(input);
      });

      // Efeito de digitação
      if (input.type === "text" || input.type === "email") {
        input.addEventListener("input", () => {
          this.addTypingEffect(input);
        });
      }
    });

    // Progress bar do formulário
    this.addFormProgress(form);
  }

  animateInputFocus(input) {
    input.style.transform = "translateY(-2px) scale(1.02)";
    input.style.boxShadow = "0 10px 25px rgba(17, 73, 255, 0.2)";

    // Efeito de onda
    this.createInputWave(input);
  }

  animateInputBlur(input) {
    input.style.transform = "";
    input.style.boxShadow = "";
  }

  createInputWave(input) {
    const wave = document.createElement("div");
    wave.className = "input-wave";
    wave.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, #1149ff, #06b6d4);
            transform: scaleX(0);
            animation: waveExpand 0.3s ease-out forwards;
        `;

    input.parentNode.style.position = "relative";
    input.parentNode.appendChild(wave);

    setTimeout(() => wave.remove(), 300);
  }

  validateInput(input) {
    const value = input.value.trim();
    let isValid = true;

    // Validações específicas
    if (input.type === "email") {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (input.required) {
      isValid = value.length > 0;
    }

    // Feedback visual
    if (isValid && value.length > 0) {
      input.style.borderColor = "#10b981";
      this.showInputFeedback(input, "✓", "#10b981");
    } else if (!isValid && value.length > 0) {
      input.style.borderColor = "#ef4444";
      this.showInputFeedback(input, "✗", "#ef4444");
    } else {
      input.style.borderColor = "";
      this.hideInputFeedback(input);
    }
  }

  showInputFeedback(input, icon, color) {
    let feedback = input.parentNode.querySelector(".input-feedback");
    if (!feedback) {
      feedback = document.createElement("span");
      feedback.className = "input-feedback";
      feedback.style.cssText = `
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                color: ${color};
                font-weight: bold;
                font-size: 1.2rem;
            `;
      input.parentNode.appendChild(feedback);
    }

    feedback.textContent = icon;
    feedback.style.color = color;
  }

  hideInputFeedback(input) {
    const feedback = input.parentNode.querySelector(".input-feedback");
    if (feedback) {
      feedback.remove();
    }
  }

  addTypingEffect(input) {
    input.style.animation = "typing 0.1s ease-out";
    setTimeout(() => {
      input.style.animation = "";
    }, 100);
  }

  addFormProgress(form) {
    const requiredInputs = form.querySelectorAll("[required]");
    if (requiredInputs.length === 0) return;

    const progressContainer = document.createElement("div");
    progressContainer.className = "form-progress";
    progressContainer.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <span class="progress-text">0% completo</span>
        `;

    form.insertBefore(progressContainer, form.firstChild);

    const updateProgress = () => {
      let filledInputs = 0;
      requiredInputs.forEach((input) => {
        if (input.value.trim()) filledInputs++;
      });

      const percentage = Math.round(
        (filledInputs / requiredInputs.length) * 100
      );
      const progressFill = progressContainer.querySelector(".progress-fill");
      const progressText = progressContainer.querySelector(".progress-text");

      progressFill.style.width = percentage + "%";
      progressText.textContent = percentage + "% completo";

      // Cor baseada no progresso
      if (percentage < 30) {
        progressFill.style.background = "#ef4444";
      } else if (percentage < 70) {
        progressFill.style.background = "#f59e0b";
      } else {
        progressFill.style.background = "#10b981";
      }
    };

    requiredInputs.forEach((input) => {
      input.addEventListener("input", updateProgress);
    });
  }

  // ========================================
  // VIDEO REVEAL EFFECT
  // ========================================
  setupVideoReveal() {
    const videoContainer = document.querySelector(
      ".video-background-container"
    );
    const formSection = document.querySelector(".container-secundario");
    const video = document.querySelector(".video-background");

    if (!videoContainer || !formSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const scrollPercent = Math.min(
            1,
            Math.max(0, 1 - entry.boundingClientRect.top / window.innerHeight)
          );

          if (entry.boundingClientRect.top < window.innerHeight) {
            const smoothReveal = this.easeOutCubic(scrollPercent);
            videoContainer.style.clipPath = `inset(${
              (1 - smoothReveal) * 100
            }% 0 0 0)`;

            // Efeito de zoom no vídeo
            if (video) {
              video.style.transform = `scale(${1 + smoothReveal * 0.1})`;
            }
          }
        });
      },
      {
        threshold: Array.from({ length: 100 }, (_, i) => i * 0.01),
      }
    );

    observer.observe(formSection);

    // Controle inteligente do vídeo
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video?.play();
          } else {
            video?.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (video) videoObserver.observe(videoContainer);

    this.observers.push(observer, videoObserver);
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // ========================================
  // TYPEWRITER EFFECT AVANÇADO
  // ========================================
  setupTypewriterEffect() {
    const typewriterElements = document.querySelectorAll(".typewriter-float");

    typewriterElements.forEach((element) => {
      this.createAdvancedTypewriter(element);
    });
  }

  createAdvancedTypewriter(element) {
    const text = element.textContent;
    const words = text.split(" ");
    element.textContent = "";

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const type = () => {
      const currentWord = words[wordIndex];

      if (!isDeleting) {
        element.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
          setTimeout(() => {
            isDeleting = true;
            type();
          }, pauseTime);
          return;
        }
      } else {
        element.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    };

    // Iniciar quando o elemento estiver visível
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(type, 500);
          observer.unobserve(element);
        }
      });
    });

    observer.observe(element);
  }

  // ========================================
  // COUNTER ANIMATIONS AVANÇADAS
  // ========================================
  setupCounterAnimations() {
    const counters = document.querySelectorAll(".percent");
    const bars = document.querySelectorAll(".bar-fill");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounters();
            this.animateBars();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observar a seção de cases
    const casesSection = document.querySelector(".container7");
    if (casesSection) {
      observer.observe(casesSection);
    }
  }

  animateCounters() {
    const counters = document.querySelectorAll(".percent");

    counters.forEach((counter, index) => {
      const target = parseFloat(counter.dataset.target);
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easedProgress = this.easeOutQuart(progress);
        const current = target * easedProgress;

        counter.textContent = current.toFixed(1) + "%";

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Efeito de "bounce" no final
          counter.style.animation = "bounce 0.5s ease-out";
        }
      };

      // Delay baseado no índice
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, index * 200);
    });
  }

  animateBars() {
    const bars = document.querySelectorAll(".bar-fill");

    bars.forEach((bar, index) => {
      const target = parseFloat(bar.dataset.fill);

      setTimeout(() => {
        bar.style.width = `${target}%`;
        bar.style.transition = "width 2s cubic-bezier(0.4, 0, 0.2, 1)";

        // Efeito de brilho durante a animação
        bar.style.boxShadow = "0 0 10px rgba(17, 73, 255, 0.5)";
        setTimeout(() => {
          bar.style.boxShadow = "";
        }, 2000);
      }, index * 200);
    });
  }

  easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  // ========================================
  // CURSOR EFFECTS
  // ========================================
  setupCursorEffects() {
    // Criar cursor customizado
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #1149ff, #06b6d4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;

    document.body.appendChild(cursor);

    // Seguir o mouse
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX - 10 + "px";
      cursor.style.top = e.clientY - 10 + "px";
    });

    // Efeitos em elementos interativos
    const interactiveElements = document.querySelectorAll(
      "a, button, .card, .cta, .cta1"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(2)";
        cursor.style.background = "radial-gradient(circle, #06b6d4, #1149ff)";
      });

      element.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)";
        cursor.style.background = "radial-gradient(circle, #1149ff, #06b6d4)";
      });
    });
  }

  // ========================================
  // PERFORMANCE OPTIMIZATIONS
  // ========================================
  setupPerformanceOptimizations() {
    // Throttle scroll events
    this.throttle = (func, limit) => {
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
    };

    // Debounce resize events
    this.debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    // Lazy load images
    this.setupLazyLoading();

    // Preload critical resources
    this.preloadCriticalResources();

    // Cleanup on page unload
    window.addEventListener("beforeunload", () => {
      this.cleanup();
    });
  }

  setupLazyLoading() {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  preloadCriticalResources() {
    const criticalImages = [
      "/assets/silvtech_marketing.png",
      "/assets/marketing_digital.png",
    ];

    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }

  cleanup() {
    // Limpar observers
    this.observers.forEach((observer) => {
      observer.disconnect();
    });

    // Limpar event listeners
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);

    // Limpar animações
    this.animations.clear();
  }

  // ========================================
  // UTILITY METHODS
  // ========================================
  addCustomStyles() {
    const styles = `
            @keyframes slideInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes waveExpand {
                from { transform: scaleX(0); }
                to { transform: scaleX(1); }
            }
            
            @keyframes typing {
                0% { transform: scale(1); }
                50% { transform: scale(1.02); }
                100% { transform: scale(1); }
            }
            
            @keyframes bounce {
                0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
                40%, 43% { transform: translate3d(0,-10px,0); }
                70% { transform: translate3d(0,-5px,0); }
                90% { transform: translate3d(0,-2px,0); }
            }
            
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
            
            .form-progress {
                margin-bottom: 2rem;
                text-align: center;
            }
            
            .progress-bar {
                width: 100%;
                height: 6px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 3px;
                overflow: hidden;
                margin-bottom: 0.5rem;
            }
            
            .progress-fill {
                height: 100%;
                background: #ef4444;
                transition: all 0.3s ease;
                width: 0%;
            }
            
            .progress-text {
                font-size: 0.9rem;
                color: rgba(255, 255, 255, 0.8);
                font-weight: 500;
            }
            
            .custom-cursor {
                display: none;
            }
            
            @media (min-width: 1024px) {
                .custom-cursor {
                    display: block;
                }
                
                * {
                    cursor: none !important;
                }
            }
        `;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
}

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  // Aguardar um pouco para garantir que tudo está carregado
  setTimeout(() => {
    window.silvtechHome = new SilvtechHomePage();
    window.silvtechHome.addCustomStyles();
  }, 100);
});

// Reinicializar se necessário
window.addEventListener("load", () => {
  if (!window.silvtechHome) {
    window.silvtechHome = new SilvtechHomePage();
    window.silvtechHome.addCustomStyles();
  }
});

console.log("🚀 Silvtech Home JavaScript - Sistema Revolucionário Carregado!");
