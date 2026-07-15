class MetodologiaScale {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupPhaseInteractions();
    this.setupScrollIndicator();
    this.setupSmoothScrolling();
    this.setupCounterAnimations();
    this.setupParallaxEffects();
    this.setupHeroAnimations();
    this.setupPhaseVisuals();
    this.setupKeyboardNavigation();
    this.setupPerformanceOptimizations();
  }

  // ========================================
  // SCROLL ANIMATIONS
  // ========================================
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Trigger specific animations based on element
          if (entry.target.classList.contains("phase-container")) {
            this.animatePhaseEntry(entry.target);
          }

          if (entry.target.classList.contains("result-card")) {
            this.animateResultCard(entry.target);
          }

          if (entry.target.classList.contains("segment-card")) {
            this.animateSegmentCard(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(`
      .phase-container,
      .result-card,
      .segment-card,
      .comparison-card,
      .hero-visual
    `);

    animatedElements.forEach((el) => observer.observe(el));
  }

  animatePhaseEntry(phaseElement) {
    const visual = phaseElement.querySelector(".visual-container");
    const features = phaseElement.querySelectorAll(".feature-item");
    const results = phaseElement.querySelectorAll(".phase-results li");

    // Animate visual first
    if (visual) {
      visual.style.animation = "slideInRight 0.8s ease-out";
    }

    // Stagger animate features
    features.forEach((feature, index) => {
      setTimeout(() => {
        feature.style.opacity = "0";
        feature.style.transform = "translateX(-20px)";
        feature.style.transition = "all 0.4s ease-out";

        setTimeout(() => {
          feature.style.opacity = "1";
          feature.style.transform = "translateX(0)";
        }, 50);
      }, index * 100);
    });

    // Stagger animate results
    results.forEach((result, index) => {
      setTimeout(
        () => {
          result.style.opacity = "0";
          result.style.transform = "translateX(-20px)";
          result.style.transition = "all 0.4s ease-out";

          setTimeout(() => {
            result.style.opacity = "1";
            result.style.transform = "translateX(0)";
          }, 50);
        },
        features.length * 100 + index * 80,
      );
    });
  }

  animateResultCard(card) {
    const number = card.querySelector(".result-number");
    const icon = card.querySelector(".result-icon");

    // Animate icon
    if (icon) {
      icon.style.animation = "pulse 0.6s ease-out";
    }

    // Animate number counting
    if (number && number.textContent !== "∞") {
      this.animateCounter(number);
    }
  }

  animateSegmentCard(card) {
    const phases = card.querySelectorAll(".mini-phase");

    phases.forEach((phase, index) => {
      setTimeout(() => {
        phase.style.opacity = "0";
        phase.style.transform = "translateY(20px)";
        phase.style.transition = "all 0.4s ease-out";

        setTimeout(() => {
          phase.style.opacity = "1";
          phase.style.transform = "translateY(0)";
        }, 50);
      }, index * 150);
    });
  }

  // ========================================
  // PHASE INTERACTIONS
  // ========================================
  setupPhaseInteractions() {
    const phasePreview = document.querySelectorAll(".phase-preview");
    const phaseContainers = document.querySelectorAll(".phase-container");

    phasePreview.forEach((preview, index) => {
      preview.addEventListener("click", () => {
        const targetPhase = phaseContainers[index];
        if (targetPhase) {
          targetPhase.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          // Add highlight effect
          this.highlightPhase(targetPhase);
        }
      });

      // Hover effects
      preview.addEventListener("mouseenter", () => {
        preview.style.transform = "scale(1.15) translateZ(0)";
        preview.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.4)";
      });

      preview.addEventListener("mouseleave", () => {
        preview.style.transform = "scale(1) translateZ(0)";
        preview.style.boxShadow = "none";
      });
    });
  }

  highlightPhase(phaseElement) {
    // Remove previous highlights
    document.querySelectorAll(".phase-container").forEach((phase) => {
      phase.classList.remove("highlighted");
    });

    // Add highlight
    phaseElement.classList.add("highlighted");

    // Add CSS for highlight effect
    if (!document.getElementById("phase-highlight-style")) {
      const style = document.createElement("style");
      style.id = "phase-highlight-style";
      style.textContent = `
        .phase-container.highlighted {
          background: rgba(17, 73, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          margin: 2rem 0;
          border: 1px solid rgba(17, 73, 255, 0.3);
          transition: all 0.6s ease-out;
        }
      `;
      document.head.appendChild(style);
    }

    // Remove highlight after 3 seconds
    setTimeout(() => {
      phaseElement.classList.remove("highlighted");
    }, 3000);
  }

  // ========================================
  // SCROLL INDICATOR
  // ========================================
  setupScrollIndicator() {
    const scrollIndicator = document.querySelector(".scroll-indicator");

    if (scrollIndicator) {
      scrollIndicator.addEventListener("click", () => {
        this.scrollToMethodology();
      });

      // Hide indicator after scroll
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const viewportHeight = window.innerHeight;

        if (scrolled > viewportHeight * 0.3) {
          scrollIndicator.style.opacity = "0";
          scrollIndicator.style.pointerEvents = "none";
        } else {
          scrollIndicator.style.opacity = "1";
          scrollIndicator.style.pointerEvents = "auto";
        }
      });
    }
  }

  scrollToMethodology() {
    const methodologySection = document.getElementById("methodology");
    if (methodologySection) {
      methodologySection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  // ========================================
  // SMOOTH SCROLLING
  // ========================================
  setupSmoothScrolling() {
    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
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
  // COUNTER ANIMATIONS
  // ========================================
  animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ""));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      // Format number based on original content
      if (element.textContent.includes("%")) {
        element.textContent = Math.floor(current) + "%";
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  setupCounterAnimations() {
    const statNumbers = document.querySelectorAll(".stat-number");

    // Animate hero stats on load
    setTimeout(() => {
      statNumbers.forEach((stat, index) => {
        setTimeout(() => {
          this.animateCounter(stat);
        }, index * 200);
      });
    }, 1000);
  }

  // ========================================
  // PARALLAX EFFECTS
  // ========================================
  setupParallaxEffects() {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      const heroSection = document.querySelector(".hero-section");

      if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
      }

      // Parallax for phase visuals
      const visuals = document.querySelectorAll(".visual-container");
      visuals.forEach((visual, index) => {
        const rect = visual.getBoundingClientRect();
        const speed = 0.1 + index * 0.05;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const yPos = -(scrolled * speed);
        }
      });

      ticking = false;
    };

    const requestParallax = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestParallax);
  }

  // ========================================
  // HERO ANIMATIONS
  // ========================================
  setupHeroAnimations() {
    // Typewriter effect for subtitle
    const subtitle = document.querySelector(".subtitle");
    if (subtitle) {
      const text = subtitle.textContent;
      subtitle.textContent = "";

      setTimeout(() => {
        this.typeWriter(subtitle, text, 50);
      }, 1500);
    }

    // Animate hero stats
    const heroStats = document.querySelectorAll(".stat-item");
    heroStats.forEach((stat, index) => {
      stat.style.opacity = "0";
      stat.style.transform = "translateY(20px)";

      setTimeout(
        () => {
          stat.style.transition = "all 0.6s ease-out";
          stat.style.opacity = "1";
          stat.style.transform = "translateY(0)";
        },
        2000 + index * 200,
      );
    });

    // Animate CTA buttons
    const ctaButtons = document.querySelectorAll(
      ".hero-cta a, .hero-cta button",
    );
    ctaButtons.forEach((button, index) => {
      button.style.opacity = "0";
      button.style.transform = "translateY(20px)";

      setTimeout(
        () => {
          button.style.transition = "all 0.6s ease-out";
          button.style.opacity = "1";
          button.style.transform = "translateY(0)";
        },
        2800 + index * 200,
      );
    });
  }

  typeWriter(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }

  // ========================================
  // PHASE VISUALS
  // ========================================
  setupPhaseVisuals() {
    // SCAN visual interactions
    const scanVisual = document.querySelector(".scan-visual");
    if (scanVisual) {
      setInterval(() => {
        const dataPoints = scanVisual.querySelectorAll(".data-point");
        dataPoints.forEach((point, index) => {
          setTimeout(() => {
            point.style.animation = "scanPulse 1s ease-in-out";
            setTimeout(() => {
              point.style.animation = "";
            }, 1000);
          }, index * 200);
        });
      }, 5000);
    }

    // CREATE visual interactions
    const createVisual = document.querySelector(".create-visual");
    if (createVisual) {
      setInterval(() => {
        const tubes = createVisual.querySelectorAll(".tube");
        tubes.forEach((tube) => {
          const randomHeight = Math.floor(Math.random() * 60) + 30;
          tube.style.setProperty("--height", randomHeight + "%");
        });
      }, 3000);
    }

    // AMPLIFY visual interactions
    const amplifyVisual = document.querySelector(".amplify-visual");
    if (amplifyVisual) {
      setInterval(() => {
        const bars = amplifyVisual.querySelectorAll(".chart-bar");
        bars.forEach((bar) => {
          const randomHeight = Math.floor(Math.random() * 70) + 20;
          bar.style.setProperty("--height", randomHeight + "%");
        });
      }, 4000);
    }
  }

  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================
  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowDown":
          if (e.ctrlKey) {
            e.preventDefault();
            this.scrollToNextSection();
          }
          break;
        case "ArrowUp":
          if (e.ctrlKey) {
            e.preventDefault();
            this.scrollToPrevSection();
          }
          break;
        case "Home":
          if (e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          break;
        case "End":
          if (e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }
          break;
      }
    });
  }

  scrollToNextSection() {
    const sections = document.querySelectorAll("section");
    const currentScroll = window.pageYOffset;

    for (let section of sections) {
      if (section.offsetTop > currentScroll + 100) {
        section.scrollIntoView({ behavior: "smooth" });
        break;
      }
    }
  }

  scrollToPrevSection() {
    const sections = Array.from(document.querySelectorAll("section")).reverse();
    const currentScroll = window.pageYOffset;

    for (let section of sections) {
      if (section.offsetTop < currentScroll - 100) {
        section.scrollIntoView({ behavior: "smooth" });
        break;
      }
    }
  }

  // ========================================
  // PERFORMANCE OPTIMIZATIONS
  // ========================================
  setupPerformanceOptimizations() {
    // Throttle scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;

    window.onscroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        if (originalScrollHandler) {
          originalScrollHandler();
        }
      }, 16); // ~60fps
    };

    // Lazy load images
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

    // Preload critical resources
    this.preloadCriticalResources();
  }

  preloadCriticalResources() {
    // Preload fonts
    const fontPreloads = [
      "https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap",
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
    ];

    fontPreloads.forEach((font) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "style";
      link.href = font;
      document.head.appendChild(link);
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

  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}

// ========================================
// GLOBAL FUNCTIONS
// ========================================
function scrollToMethodology() {
  const methodology = document.getElementById("methodology");
  if (methodology) {
    methodology.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize methodology interactions
  new MetodologiaScale();

  // Add loading animation
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease-in";
    document.body.style.opacity = "1";
  }, 100);

  // Add custom cursor for desktop
  if (window.innerWidth > 1024) {
    document.body.style.cursor = "none";

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.innerHTML = `
      <div class="cursor-dot"></div>
      <div class="cursor-ring"></div>
    `;
    document.body.appendChild(cursor);

    // Add cursor styles
    const cursorStyle = document.createElement("style");
    cursorStyle.textContent = `
      .custom-cursor {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 9999;
      }
      
      .cursor-dot {
        width: 6px;
        height: 6px;
        background: #1149ff;
        border-radius: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
      }
      
      .cursor-ring {
        width: 30px;
        height: 30px;
        border: 2px solid rgba(17, 73, 255, 0.3);
        border-radius: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
      }
      
      .custom-cursor.hover .cursor-ring {
        width: 50px;
        height: 50px;
        border-color: rgba(17, 73, 255, 0.6);
      }
    `;
    document.head.appendChild(cursorStyle);

    // Update cursor position
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    // Cursor hover effects
    document.querySelectorAll("a, button, .phase-preview").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
      });

      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
      });
    });
  }

  // Add scroll progress indicator
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.innerHTML = '<div class="progress-fill"></div>';
  document.body.appendChild(progressBar);

  const progressStyle = document.createElement("style");
  progressStyle.textContent = `
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: rgba(255, 255, 255, 0.1);
      z-index: 9998;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #1149ff, #06b6d4);
      width: 0%;
      transition: width 0.3s ease;
    }
  `;
  document.head.appendChild(progressStyle);

  // Update scroll progress
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxScroll) * 100;

    document.querySelector(".progress-fill").style.width = progress + "%";
  });

  console.log("🚀 Metodologia SCALE carregada com sucesso!");
});

// ========================================
// EXPORT FOR MODULES
// ========================================
if (typeof module !== "undefined" && module.exports) {
  module.exports = MetodologiaScale;
}
