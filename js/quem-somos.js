document.addEventListener("DOMContentLoaded", function () {
  // Inicializar todas as funcionalidades
  initScrollAnimations();
  initCounterAnimations();
  initParallaxEffect();
  initSmoothScrolling();

  console.log("Quem Somos page loaded successfully!");
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
        entry.target.classList.add("fade-in-up");

        // Animação especial para cards MVV
        if (entry.target.classList.contains("mvv-card")) {
          const delay =
            Array.from(entry.target.parentNode.children).indexOf(entry.target) *
            200;
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, delay);
        }

        // Animação especial para steps da metodologia
        if (entry.target.classList.contains("step")) {
          const delay =
            Array.from(entry.target.parentNode.children).indexOf(entry.target) *
            300;
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
          }, delay);
        }
      }
    });
  }, observerOptions);

  // Observar elementos para animação
  const elementsToAnimate = document.querySelectorAll(
    ".about-text, .mvv-card, .step, .cta-content"
  );
  elementsToAnimate.forEach((el) => {
    // Preparar elementos para animação
    if (el.classList.contains("mvv-card")) {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease";
    }

    if (el.classList.contains("step")) {
      el.style.opacity = "0";
      el.style.transform = "translateX(-30px)";
      el.style.transition = "all 0.6s ease";
    }

    observer.observe(el);
  });
}

// ========================================
// COUNTER ANIMATIONS
// ========================================
function initCounterAnimations() {
  const counters = document.querySelectorAll(".counter");

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
// PARALLAX EFFECT
// ========================================
function initParallaxEffect() {
  const heroSection = document.querySelector(".hero-section");

  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      heroSection.style.transform = `translateY(${rate}px)`;
    });
  }
}

// ========================================
// SMOOTH SCROLLING
// ========================================
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Compensar header fixo

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// ========================================
// INTERACTIVE CARDS
// ========================================
function initInteractiveCards() {
  const cards = document.querySelectorAll(".mvv-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)";
      this.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.2)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-10px) scale(1)";
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
    });
  });
}

// ========================================
// TYPING EFFECT
// ========================================
function initTypingEffect() {
  const typingElements = document.querySelectorAll(".typing-effect");

  typingElements.forEach((element) => {
    const text = element.textContent;
    element.textContent = "";
    element.style.borderRight = "2px solid #3b82f6";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Remover cursor após terminar
        setTimeout(() => {
          element.style.borderRight = "none";
        }, 1000);
      }
    };

    // Iniciar quando elemento estiver visível
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(typeWriter, 500);
          observer.unobserve(element);
        }
      });
    });

    observer.observe(element);
  });
}

// ========================================
// PROGRESS BARS
// ========================================
function initProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");

  progressBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress");
    const fill = bar.querySelector(".progress-fill");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            fill.style.width = progress + "%";
          }, 300);
          observer.unobserve(bar);
        }
      });
    });

    observer.observe(bar);
  });
}

// ========================================
// SCROLL TO TOP
// ========================================
function initScrollToTop() {
  // Criar botão de scroll to top
  const scrollButton = document.createElement("button");
  scrollButton.innerHTML = "↑";
  scrollButton.className = "scroll-to-top";
  scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6, #06b6d4);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;

  document.body.appendChild(scrollButton);

  // Mostrar/esconder botão baseado no scroll
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollButton.style.opacity = "1";
      scrollButton.style.visibility = "visible";
    } else {
      scrollButton.style.opacity = "0";
      scrollButton.style.visibility = "hidden";
    }
  });

  // Scroll to top ao clicar
  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Hover effect
  scrollButton.addEventListener("mouseenter", () => {
    scrollButton.style.transform = "scale(1.1)";
  });

  scrollButton.addEventListener("mouseleave", () => {
    scrollButton.style.transform = "scale(1)";
  });
}

// ========================================
// LOADING ANIMATION
// ========================================
function initLoadingAnimation() {
  // Adicionar classe de loading ao body
  document.body.classList.add("loading");

  // Remover loading após página carregar
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.body.classList.remove("loading");
      document.body.classList.add("loaded");
    }, 500);
  });
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
function initPerformanceOptimization() {
  // Lazy loading para imagens
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Throttle scroll events
  let ticking = false;

  function updateScrollEffects() {
    // Atualizar efeitos de scroll aqui
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  });
}

// Inicializar funcionalidades adicionais
document.addEventListener("DOMContentLoaded", function () {
  initInteractiveCards();
  initScrollToTop();
  initLoadingAnimation();
  initPerformanceOptimization();
});

console.log("Quem Somos JavaScript loaded successfully!");
