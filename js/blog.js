class BlogRevolucionario {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollReveal();
    this.setupTypewriter();
    this.setupParallaxEffects();
    this.setupSmoothScrolling();
    this.setupImageLazyLoading();
    this.setupReadingProgress();
    this.setupShareButtons();
    this.setupSearchFunctionality();
    this.setupDarkModeToggle();
    this.setupPostAnimations();
    this.setupCopyToClipboard();
    this.setupBackToTop();
    this.setupKeyboardNavigation();
  }

  // ========================================
  // SCROLL REVEAL AVANÇADO
  // ========================================
  setupScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");

          // Animação sequencial para posts
          if (entry.target.classList.contains("post")) {
            this.animatePostContent(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observar elementos
    document.querySelectorAll(".post, section, .blogs").forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }

  animatePostContent(post) {
    const img = post.querySelector("img");
    const title = post.querySelector("h2");
    const text = post.querySelector("p");

    if (img) {
      setTimeout(() => {
        img.style.transform = "scale(1) rotate(0deg)";
        img.style.opacity = "1";
      }, 200);
    }

    if (title) {
      setTimeout(() => {
        title.style.transform = "translateY(0)";
        title.style.opacity = "1";
      }, 400);
    }

    if (text) {
      setTimeout(() => {
        text.style.transform = "translateY(0)";
        text.style.opacity = "1";
      }, 600);
    }
  }

  // ========================================
  // EFEITO TYPEWRITER NO TÍTULO
  // ========================================
  setupTypewriter() {
    const titleElement = document.getElementById("titulo");
    if (!titleElement) return;

    const titles = [
      "Estratégias que Transformam Negócios",
      "Growth Hacking para Empresas",
      "Marketing de Performance Avançado",
      "Vendas e Conversão Otimizada",
    ];

    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeWriter = () => {
      const currentTitle = titles[currentIndex];

      if (isDeleting) {
        titleElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
      } else {
        titleElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % titles.length;
        typeSpeed = 500;
      }

      setTimeout(typeWriter, typeSpeed);
    };

    typeWriter();
  }

  // ========================================
  // EFEITOS PARALLAX
  // ========================================
  setupParallaxEffects() {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll(".blogs");

      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.1;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestTick);
  }

  // ========================================
  // SMOOTH SCROLLING
  // ========================================
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  // ========================================
  // LAZY LOADING DE IMAGENS
  // ========================================
  setupImageLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // ========================================
  // BARRA DE PROGRESSO DE LEITURA
  // ========================================
  setupReadingProgress() {
    // Criar barra de progresso
    const progressBar = document.createElement("div");
    progressBar.className = "reading-progress";
    progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
    document.body.appendChild(progressBar);

    // Adicionar CSS
    const style = document.createElement("style");
    style.textContent = `
            .reading-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(255, 255, 255, 0.2);
                z-index: 9999;
                backdrop-filter: blur(10px);
            }
            .reading-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #1149ff, #06b6d4);
                width: 0%;
                transition: width 0.3s ease;
                box-shadow: 0 0 10px rgba(17, 73, 255, 0.5);
            }
        `;
    document.head.appendChild(style);

    // Atualizar progresso
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      const fill = document.querySelector(".reading-progress-fill");
      if (fill) {
        fill.style.width = Math.min(scrollPercent, 100) + "%";
      }
    };

    window.addEventListener("scroll", this.throttle(updateProgress, 10));
  }

  // ========================================
  // BOTÕES DE COMPARTILHAMENTO
  // ========================================
  setupShareButtons() {
    const shareSection = document.createElement("div");
    shareSection.className = "share-section";
    shareSection.innerHTML = `
            <h3>Compartilhe este conteúdo</h3>
            <div class="share-buttons">
                <a href="#" class="share-btn facebook" data-platform="facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="share-btn twitter" data-platform="twitter">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="share-btn linkedin" data-platform="linkedin">
                    <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#" class="share-btn whatsapp" data-platform="whatsapp">
                    <i class="fab fa-whatsapp"></i>
                </a>
                <a href="#" class="share-btn copy" data-platform="copy">
                    <i class="fas fa-link"></i>
                </a>
            </div>
        `;

    // Adicionar após o primeiro section (se existir)
    const firstSection = document.querySelector("section");
    if (firstSection) {
      firstSection.parentNode.insertBefore(
        shareSection,
        firstSection.nextSibling
      );
    }

    // Event listeners para compartilhamento
    document.querySelectorAll(".share-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.shareContent(btn.dataset.platform);
      });
    });
  }

  shareContent(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const text = encodeURIComponent(
      document.querySelector('meta[name="description"]')?.content || ""
    );

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`,
      copy: () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          this.showNotification("Link copiado para a área de transferência!");
        });
      },
    };

    if (platform === "copy") {
      shareUrls.copy();
    } else {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  }

  // ========================================
  // FUNCIONALIDADE DE BUSCA
  // ========================================
  setupSearchFunctionality() {
    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";
    searchContainer.innerHTML = `
            <div class="search-box">
                <input type="text" placeholder="Buscar posts..." id="searchInput">
                <i class="fas fa-search"></i>
            </div>
            <div class="search-results" id="searchResults"></div>
        `;

    // Adicionar CSS
    const style = document.createElement("style");
    style.textContent = `
            .search-container {
                position: relative;
                max-width: 400px;
                margin: 2rem auto;
            }
            .search-box {
                position: relative;
                display: flex;
                align-items: center;
            }
            .search-box input {
                width: 100%;
                padding: 1rem 3rem 1rem 1rem;
                border: 2px solid #e2e8f0;
                border-radius: 25px;
                font-size: 1rem;
                transition: all 0.3s ease;
                background: white;
            }
            .search-box input:focus {
                outline: none;
                border-color: #1149ff;
                box-shadow: 0 0 0 3px rgba(17, 73, 255, 0.1);
            }
            .search-box i {
                position: absolute;
                right: 1rem;
                color: #64748b;
            }
            .search-results {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                max-height: 300px;
                overflow-y: auto;
                z-index: 1000;
                display: none;
            }
            .search-result-item {
                padding: 1rem;
                border-bottom: 1px solid #f1f5f9;
                cursor: pointer;
                transition: background 0.2s ease;
            }
            .search-result-item:hover {
                background: #f8fafc;
            }
            .search-result-item:last-child {
                border-bottom: none;
            }
        `;
    document.head.appendChild(style);

    // Adicionar ao blog container
    const blogContainer = document.querySelector(".blog-container");
    if (blogContainer) {
      blogContainer.appendChild(searchContainer);
    }

    // Implementar busca
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    if (searchInput) {
      searchInput.addEventListener(
        "input",
        this.debounce((e) => {
          this.performSearch(e.target.value, searchResults);
        }, 300)
      );
    }
  }

  performSearch(query, resultsContainer) {
    if (query.length < 2) {
      resultsContainer.style.display = "none";
      return;
    }

    const posts = document.querySelectorAll(".post");
    const results = [];

    posts.forEach((post) => {
      const title = post.querySelector("h2")?.textContent || "";
      const content = post.querySelector("p")?.textContent || "";

      if (
        title.toLowerCase().includes(query.toLowerCase()) ||
        content.toLowerCase().includes(query.toLowerCase())
      ) {
        results.push({
          title,
          content: content.substring(0, 100) + "...",
          link: post.querySelector("a")?.href || "#",
        });
      }
    });

    this.displaySearchResults(results, resultsContainer);
  }

  displaySearchResults(results, container) {
    if (results.length === 0) {
      container.innerHTML =
        '<div class="search-result-item">Nenhum resultado encontrado</div>';
    } else {
      container.innerHTML = results
        .map(
          (result) => `
                <div class="search-result-item" onclick="window.location.href='${result.link}'">
                    <strong>${result.title}</strong>
                    <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #64748b;">${result.content}</p>
                </div>
            `
        )
        .join("");
    }

    container.style.display = "block";
  }

  // ========================================
  // DARK MODE TOGGLE
  // ========================================
  setupDarkModeToggle() {
    const toggle = document.createElement("button");
    toggle.className = "dark-mode-toggle";
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(toggle);

    // CSS para o toggle
    const style = document.createElement("style");
    style.textContent = `
            .dark-mode-toggle {
                position: fixed;
                top: 100px;
                right: 2rem;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: none;
                background: linear-gradient(135deg, #1149ff, #06b6d4);
                color: white;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
                z-index: 1000;
            }
            .dark-mode-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
            }
            body.dark-mode {
                filter: invert(1) hue-rotate(180deg);
            }
            body.dark-mode img {
                filter: invert(1) hue-rotate(180deg);
            }
        `;
    document.head.appendChild(style);

    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      toggle.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
      localStorage.setItem("darkMode", isDark);
    });

    // Carregar preferência salva
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
      toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  // ========================================
  // ANIMAÇÕES DOS POSTS
  // ========================================
  setupPostAnimations() {
    document.querySelectorAll(".post").forEach((post, index) => {
      post.style.animationDelay = `${index * 0.2}s`;

      post.addEventListener("mouseenter", () => {
        post.style.transform = "translateY(-10px) scale(1.02)";
      });

      post.addEventListener("mouseleave", () => {
        post.style.transform = "translateY(0) scale(1)";
      });
    });
  }

  // ========================================
  // COPY TO CLIPBOARD
  // ========================================
  setupCopyToClipboard() {
    document.querySelectorAll("code, pre").forEach((codeBlock) => {
      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-code-btn";
      copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
      copyBtn.title = "Copiar código";

      codeBlock.style.position = "relative";
      codeBlock.appendChild(copyBtn);

      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(codeBlock.textContent).then(() => {
          copyBtn.innerHTML = '<i class="fas fa-check"></i>';
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
          }, 2000);
        });
      });
    });
  }

  // ========================================
  // BACK TO TOP
  // ========================================
  setupBackToTop() {
    const backToTop = document.createElement("button");
    backToTop.className = "back-to-top";
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    const style = document.createElement("style");
    style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: none;
                background: linear-gradient(135deg, #1149ff, #06b6d4);
                color: white;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1000;
            }
            .back-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            .back-to-top:hover {
                transform: translateY(-5px) scale(1.1);
            }
        `;
    document.head.appendChild(style);

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ========================================
  // NAVEGAÇÃO POR TECLADO
  // ========================================
  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      // ESC para fechar search results
      if (e.key === "Escape") {
        const searchResults = document.getElementById("searchResults");
        if (searchResults) {
          searchResults.style.display = "none";
        }
      }

      // Ctrl/Cmd + K para focar na busca
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
          searchInput.focus();
        }
      }
    });
  }

  // ========================================
  // UTILITY FUNCTIONS
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

  showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;

    const style = document.createElement("style");
    style.textContent = `
            .notification {
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: linear-gradient(135deg, #1149ff, #06b6d4);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
    document.head.appendChild(style);
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  new BlogRevolucionario();
});

// ========================================
// PERFORMANCE MONITORING
// ========================================
window.addEventListener("load", () => {
  // Lazy load de imagens que não foram carregadas
  const lazyImages = document.querySelectorAll("img:not([src])");
  lazyImages.forEach((img) => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  });

  // Preload de links importantes
  const importantLinks = document.querySelectorAll(
    'a[href^="/"], a[href^="./"]'
  );
  importantLinks.forEach((link) => {
    const prefetchLink = document.createElement("link");
    prefetchLink.rel = "prefetch";
    prefetchLink.href = link.href;
    document.head.appendChild(prefetchLink);
  });
});
