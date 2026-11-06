document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    function toggleMenu(forceState) {
      const willOpen = typeof forceState === "boolean" 
        ? forceState 
        : !navLinks.classList.contains("open");

      navLinks.classList.toggle("open", willOpen);
      menuBtn.setAttribute("aria-expanded", String(willOpen));
      menuBtn.setAttribute("aria-label", willOpen ? "Close menu" : "Open menu");
      menuBtn.textContent = willOpen ? "✕" : "☰";
    }

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 900) toggleMenu(false);
      });
    });

    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(e.target) &&
        e.target !== menuBtn
      ) {
        toggleMenu(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        toggleMenu(false);
      }
    });
  }

  // Active section scroll indicator
  const sections = document.querySelectorAll("main section[id]");
  const navAnchorElements = document.querySelectorAll(".nav-links a");

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    let currentId = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute("id");
      }
    });

    navAnchorElements.forEach(anchor => {
      const href = anchor.getAttribute("href");
      if (href === `#${currentId}`) {
        anchor.classList.add("active");
      } else {
        anchor.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll, { passive: true });
  highlightNavOnScroll();
});
