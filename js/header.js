window.SilvtechHeader = window.SilvtechHeader || {};

// ========================================
// LAZY LOADING OTIMIZADO
// ========================================
(function () {
  "use strict";

  class SilvtechLazyLoading {
    constructor() {
      this.config = {
        rootMargin: "50px 0px",
        threshold: 0.01,
        lazyClass: "lazy-image",
        loadedClass: "loaded",
        errorClass: "error",
      };

      this.imageObserver = null;
      this.isObserverSupported = "IntersectionObserver" in window;

      this.init();
    }

    init() {
      if (!this.isObserverSupported) {
        this.loadAllImages();
        return;
      }

      this.setupObserver();
      this.initLazyLoading();
      this.addStyles();
    }

    setupObserver() {
      this.imageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              this.loadImage(img);
              observer.unobserve(img);
            }
          });
        },
        {
          rootMargin: this.config.rootMargin,
          threshold: this.config.threshold,
        }
      );
    }

    loadImage(img) {
      img.classList.add("loading");

      const imageLoader = new Image();

      imageLoader.onload = () => {
        img.src = imageLoader.src;
        img.classList.remove("loading", this.config.lazyClass);
        img.classList.add(this.config.loadedClass);

        requestAnimationFrame(() => {
          img.style.opacity = "1";
        });
      };

      imageLoader.onerror = () => {
        img.classList.remove("loading", this.config.lazyClass);
        img.classList.add(this.config.errorClass);
      };

      imageLoader.src = img.dataset.src;

      if (img.dataset.srcset) {
        imageLoader.srcset = img.dataset.srcset;
        img.srcset = img.dataset.srcset;
      }
    }

    initLazyLoading() {
      const lazyImages = document.querySelectorAll(`.${this.config.lazyClass}`);

      lazyImages.forEach((img) => {
        if (!img.src || img.src === "") {
          img.src =
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+";
        }

        img.style.transition = "opacity 0.3s ease-in-out";
        img.style.opacity = "0.7";

        if (this.imageObserver) {
          this.imageObserver.observe(img);
        }
      });

      this.loadCriticalImages();
    }

    loadCriticalImages() {
      const criticalImages = document.querySelectorAll(
        `.${this.config.lazyClass}[data-critical="true"]`
      );

      criticalImages.forEach((img) => {
        this.loadImage(img);
        if (this.imageObserver) {
          this.imageObserver.unobserve(img);
        }
      });
    }

    loadAllImages() {
      const lazyImages = document.querySelectorAll(`.${this.config.lazyClass}`);
      lazyImages.forEach((img) => this.loadImage(img));
    }

    addStyles() {
      const style = document.createElement("style");
      style.textContent = `
        .lazy-image {
          transition: opacity 0.3s ease-in-out;
          background: #f0f0f0;
        }
        
        .lazy-image.loading {
          opacity: 0.5;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        
        .lazy-image.loaded {
          opacity: 1;
        }
        
        .lazy-image.error {
          opacity: 0.3;
          background: #ffebee;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `;

      document.head.appendChild(style);
    }
  }

  // ========================================
  // HEADER MODERNO OTIMIZADO
  // ========================================
  class ModernMobileHeader {
    constructor() {
      this.header = document.querySelector(".header");
      this.mobileMenuBtn = document.querySelector(".mobile-menu-btn");
      this.mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
      this.mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");
      this.isMenuOpen = false;
      this.lastScrollY = window.scrollY;
      this.scrollTimeout = null;

      this.init();
    }

    init() {
      this.createMobileMenu();
      this.bindEvents();
      this.handleScroll();
      this.setActiveLink();
      console.log("Modern Mobile Header initialized!");
    }

    // ========================================
    // CRIAR ESTRUTURA DO MENU MOBILE
    // ========================================
    createMobileMenu() {
      if (document.querySelector(".mobile-menu-overlay")) return;

      const overlay = document.createElement("div");
      overlay.className = "mobile-menu-overlay";

      overlay.innerHTML = `
        <div class="mobile-menu-content">
          <ul class="mobile-nav-links">
            <li><a href="/index.html" data-page="home">Home</a></li>
            <li><a href="/quemsomos.html" data-page="about">Quem Somos</a></li>
            <li><a href="/blog/index.html" data-page="blog">Blog</a></li>
            <li><a href="/fale-conosco.html" data-page="contact">Contato</a></li>
            <li><a href="/metodologia.html" data-page="metodologia">Metodologia silvtech</a></li>
            <li><a href="/servicos.html" data-page="servicos">Servicos</a></li>
          </ul>
          
          <div class="mobile-cta">
            <a href="/fale-conosco.html" class="mobile-cta-button">
              🚀 Solicitar Consultoria
            </a>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);
      this.mobileMenuOverlay = overlay;
      this.mobileNavLinks = overlay.querySelectorAll(".mobile-nav-links a");

      if (!document.querySelector(".mobile-menu-btn")) {
        this.createMobileButton();
      }
    }

    createMobileButton() {
      const button = document.createElement("div");
      button.className = "mobile-menu-btn";
      button.innerHTML = `
        <div class="menu-icon">
          <div class="menu-line"></div>
          <div class="menu-line"></div>
          <div class="menu-line"></div>
        </div>
      `;

      const navContainer = document.querySelector(".nav-container");
      if (navContainer) {
        navContainer.appendChild(button);
        this.mobileMenuBtn = button;
      }
    }

    // ========================================
    // EVENTOS OTIMIZADOS
    // ========================================
    bindEvents() {
      if (this.mobileMenuBtn) {
        this.mobileMenuBtn.addEventListener("click", () =>
          this.toggleMobileMenu()
        );
      }

      this.mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.closeMobileMenu();
          this.highlightActiveLink(link);
        });
      });

      this.mobileMenuOverlay.addEventListener("click", (e) => {
        if (e.target === this.mobileMenuOverlay) {
          this.closeMobileMenu();
        }
      });

      // Scroll otimizado com throttle
      window.addEventListener(
        "scroll",
        this.throttle(() => this.handleScroll(), 16),
        { passive: true }
      );

      window.addEventListener(
        "resize",
        this.throttle(() => this.handleResize(), 100)
      );

      document.addEventListener("keydown", (e) => this.handleKeyboard(e));

      this.handleTouchEvents();

      // Navegação desktop
      this.bindDesktopNavigation();
    }

    bindDesktopNavigation() {
      const homeLink = document.getElementById("home");
      const quemSomosLink = document.getElementById("quemsomos");
      const blogLink = document.getElementById("blog");
      const contatoLink = document.getElementById("fale-conosco");
      const metodologia = document.getElementById("metodologia");
      const servicos = document.getElementById("servicos");

      if (homeLink) {
        homeLink.addEventListener("click", () => {
          window.location.href = "/index.html";
        });
      }

      if (quemSomosLink) {
        quemSomosLink.addEventListener("click", () => {
          window.location.href = "/quemsomos.html";
        });
      }

      if (blogLink) {
        blogLink.addEventListener("click", () => {
          window.location.href = "/blog/index.html";
        });
      }

      if (contatoLink) {
        contatoLink.addEventListener("click", () => {
          window.location.href = "/fale-conosco.html";
        });
      }
      if (metodologia) {
        metodologia.addEventListener("click", () => {
          window.location.href = "/metodologia.html";
        });
      }
      if (servicos) {
        servicos.addEventListener("click", () => {
          window.location.href = "/servicos.html";
        });
      }
    }

    // ========================================
    // TOGGLE MENU MOBILE
    // ========================================
    toggleMobileMenu() {
      if (this.isMenuOpen) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    }

    openMobileMenu() {
      this.isMenuOpen = true;
      this.mobileMenuBtn.classList.add("active");
      this.mobileMenuOverlay.classList.add("active");
      document.body.style.overflow = "hidden";

      if (navigator.vibrate) {
        navigator.vibrate(50);
      }

      this.animateMenuLinks();
    }

    closeMobileMenu() {
      this.isMenuOpen = false;
      this.mobileMenuBtn.classList.remove("active");
      this.mobileMenuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }

    // ========================================
    // ANIMAÇÕES OTIMIZADAS
    // ========================================
    animateMenuLinks() {
      const links = this.mobileMenuOverlay.querySelectorAll(
        ".mobile-nav-links li"
      );

      links.forEach((link, index) => {
        setTimeout(() => {
          link.style.transform = "translateY(0) scale(1)";
          link.style.opacity = "1";
          link.style.animation = "bounceIn 0.6s ease-out";
        }, index * 100);
      });
    }

    // ========================================
    // SCROLL HANDLING OTIMIZADO
    // ========================================
    handleScroll() {
      const currentScrollY = window.scrollY;

      // Header transparente/opaco baseado no scroll
      if (currentScrollY > 50) {
        this.header.classList.add("scrolled");
      } else {
        this.header.classList.remove("scrolled");
      }

      // Auto-hide header no scroll down (opcional)
      if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
        this.header.style.transform = "translateY(-100%)";
      } else {
        this.header.style.transform = "translateY(0)";
      }

      this.lastScrollY = currentScrollY;
    }

    // ========================================
    // LINK ATIVO
    // ========================================
    setActiveLink() {
      const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

      // Desktop links
      const desktopLinks = document.querySelectorAll(".nav-links a");
      desktopLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Mobile links
      this.mobileNavLinks.forEach((link) => {
        link.classList.remove("active");
        const linkPage = link.getAttribute("href").split("/").pop();

        if (
          linkPage === currentPage ||
          (currentPage === "" && linkPage === "index.html")
        ) {
          link.classList.add("active");
        }
      });
    }

    highlightActiveLink(clickedLink) {
      this.mobileNavLinks.forEach((link) => {
        link.classList.remove("active");
      });
      clickedLink.classList.add("active");
    }

    // ========================================
    // EVENTOS DE TOQUE OTIMIZADOS
    // ========================================
    handleTouchEvents() {
      let startY = 0;
      let startX = 0;

      this.mobileMenuOverlay.addEventListener(
        "touchstart",
        (e) => {
          startY = e.touches[0].clientY;
          startX = e.touches[0].clientX;
        },
        { passive: true }
      );

      this.mobileMenuOverlay.addEventListener(
        "touchmove",
        (e) => {
          if (!this.isMenuOpen) return;

          const currentY = e.touches[0].clientY;
          const currentX = e.touches[0].clientX;
          const diffY = startY - currentY;
          const diffX = startX - currentX;

          if (diffY > 100 && Math.abs(diffX) < 100) {
            this.closeMobileMenu();
          }

          if (diffX < -100 && Math.abs(diffY) < 100) {
            this.closeMobileMenu();
          }
        },
        { passive: true }
      );
    }

    // ========================================
    // KEYBOARD EVENTS
    // ========================================
    handleKeyboard(e) {
      if (e.key === "Escape" && this.isMenuOpen) {
        this.closeMobileMenu();
      }

      if (this.isMenuOpen) {
        const focusableElements =
          this.mobileMenuOverlay.querySelectorAll("a, button");
        const currentIndex = Array.from(focusableElements).indexOf(
          document.activeElement
        );

        if (e.key === "ArrowDown") {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % focusableElements.length;
          focusableElements[nextIndex].focus();
        }

        if (e.key === "ArrowUp") {
          e.preventDefault();
          const prevIndex =
            currentIndex === 0
              ? focusableElements.length - 1
              : currentIndex - 1;
          focusableElements[prevIndex].focus();
        }
      }
    }

    // ========================================
    // RESIZE HANDLING
    // ========================================
    handleResize() {
      if (window.innerWidth > 1024 && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    }

    // ========================================
    // PERFORMANCE OPTIMIZATION
    // ========================================
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
  }

  // ========================================
  // CSS ADICIONAL PARA ANIMAÇÕES
  // ========================================
  const additionalStyles = `
    @keyframes bounceIn {
      0% { transform: scale(0.3) translateY(50px); opacity: 0; }
      50% { transform: scale(1.05) translateY(-10px); }
      70% { transform: scale(0.9) translateY(0); }
      100% { transform: scale(1) translateY(0); opacity: 1; }
    }
    
    .mobile-nav-links li {
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .header {
      transition: transform 0.3s ease, background 0.3s ease;
    }
    
    /* Otimizações de performance */
    .header * {
      will-change: auto;
    }
    
    .header:hover * {
      will-change: transform;
    }
  `;

  // Adicionar estilos ao documento
  const styleSheet = document.createElement("style");
  styleSheet.textContent = additionalStyles;
  document.head.appendChild(styleSheet);

  // ========================================
  // INICIALIZAÇÃO CONTROLADA
  // ========================================
  function initHeaderComponents() {
    // Inicializar lazy loading primeiro (mais crítico)
    const lazyLoading = new SilvtechLazyLoading();

    // Inicializar header com delay para evitar conflitos
    setTimeout(() => {
      const header = new ModernMobileHeader();

      // Armazenar no namespace global
      window.SilvtechHeader = {
        lazyLoading,
        header,
        ModernMobileHeader,
        SilvtechLazyLoading,
      };

      console.log("Silvtech Header initialized!");
    }, 100);
  }

  // ========================================
  // INICIALIZAÇÃO GLOBAL SEM CONFLITOS
  // ========================================
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeaderComponents);
  } else {
    initHeaderComponents();
  }

  // Fallback para garantir inicialização
  window.addEventListener("load", () => {
    if (!window.SilvtechHeader || !window.SilvtechHeader.header) {
      initHeaderComponents();
    }
  });
})();

console.log(
  "Silvtech Header + Lazy Loading JavaScript loaded without conflicts!"
);
