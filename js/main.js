/* ============================================================
   TRION SCALE — Main JavaScript
   ============================================================ */

'use strict';

// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initRevealAnimations();
  initTestimonialsAutoplay();
  initScrollTop();
  initMobileMenu();
  initCounters();
  initSmoothScroll();
});

// ============================================================
// HEADER — Sticky with scroll effect
// ============================================================
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ============================================================
// MOBILE MENU
// ============================================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on nav link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && nav.classList.contains('open')) {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ============================================================
// REVEAL ON SCROLL — Intersection Observer
// ============================================================
function initRevealAnimations() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animations for grouped elements
          const parent = entry.target.closest('.personas-grid, .cases-grid, .resources-grid');
          const delay = parent ? getStaggerDelay(entry.target, parent) : 0;

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
}

function getStaggerDelay(element, parent) {
  const siblings = Array.from(parent.querySelectorAll('.reveal'));
  const index = siblings.indexOf(element);
  return index * 120;
}

// ============================================================
// TESTIMONIALS SLIDER
// ============================================================
let currentTestimonial = 0;
let testimonialInterval = null;

function initTestimonialsAutoplay() {
  testimonialInterval = setInterval(() => {
    changeTestimonial(1);
  }, 5000);

  // Pause on hover
  const slider = document.querySelector('.testimonials');
  if (slider) {
    slider.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    slider.addEventListener('mouseleave', () => {
      testimonialInterval = setInterval(() => changeTestimonial(1), 5000);
    });
  }
}

function changeTestimonial(direction) {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.t-dot');
  if (!slides.length) return;

  slides[currentTestimonial].classList.remove('active');
  dots[currentTestimonial].classList.remove('active');

  currentTestimonial = (currentTestimonial + direction + slides.length) % slides.length;

  slides[currentTestimonial].classList.add('active');
  dots[currentTestimonial].classList.add('active');
}

function goToTestimonial(index) {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.t-dot');
  if (!slides.length) return;

  slides[currentTestimonial].classList.remove('active');
  dots[currentTestimonial].classList.remove('active');

  currentTestimonial = index;

  slides[currentTestimonial].classList.add('active');
  dots[currentTestimonial].classList.add('active');
}

// ============================================================
// ANIMATED COUNTERS
// ============================================================
function initCounters() {
  const counters = document.querySelectorAll('.result-num, .ticker-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const originalText = element.textContent;
  const numMatch = originalText.match(/[\d.]+/);
  if (!numMatch) return;

  const target = parseFloat(numMatch[0]);
  const prefix = originalText.match(/^[^0-9]*/)[0];
  const suffix = originalText.match(/[^0-9.]*$/)[0];
  const duration = 1500;
  const start = performance.now();

  const update = (timestamp) => {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    const current = Math.round(eased * target * 10) / 10;

    element.textContent = prefix + (Number.isInteger(target) ? Math.round(current) : current) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = originalText;
    }
  };

  requestAnimationFrame(update);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// ============================================================
// SCROLL TO TOP BUTTON
// ============================================================
function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// SMOOTH SCROLL — Anchor links
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.getElementById('header')?.offsetHeight || 72;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
}

// ============================================================
// MODAL — Contact Form
// ============================================================
function openModal() {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Reset form state
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (form) {
    form.style.display = 'block';
    form.reset();
  }
  if (success) success.classList.remove('visible');

  // Focus first input
  setTimeout(() => {
    const firstInput = overlay.querySelector('input');
    if (firstInput) firstInput.focus();
  }, 300);
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;

  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function closeModalIfOutside(event) {
  if (event.target === document.getElementById('modalOverlay')) {
    closeModal();
  }
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ============================================================
// FORM SUBMISSION
// ============================================================
async function submitForm(event) {
  event.preventDefault();

  const form = document.getElementById('contactForm');
  const submitBtn = form.querySelector('button[type="submit"]');
  const formSuccess = document.getElementById('formSuccess');

  if (!form || !submitBtn) return;

  // Validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // UI: loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> A enviar...';

  try {
    // Save lead to table
    await createLead(data);

    // Show success state
    form.style.display = 'none';
    if (formSuccess) formSuccess.classList.add('visible');

    // Track event (analytics placeholder)
    trackEvent('lead_form_submit', {
      cargo: data.cargo,
      interesse: data.interesse
    });

  } catch (error) {
    console.error('Form submission error:', error);
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Enviar Pedido <i class="fas fa-arrow-right"></i>';

    // Show user-friendly error
    showFormError('Ocorreu um erro ao enviar. Por favor, tente novamente.');
  }
}

async function createLead(data) {
  // Endpoint do Formspree configurado
  const FORMSPREE_URL = 'https://formspree.io/f/xykbzqjg';

  const payload = {
    nome: data.nome || '',
    email: data.email || '',
    empresa: data.empresa || '',
    cargo: data.cargo || '',
    interesse: data.interesse || '',
    descricao: data.descricao || '',
    origem: 'website_formulario',
    data_submissao: new Date().toISOString()
  };

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      console.log('✅ Lead enviado com sucesso para o Formspree');
    } else {
      console.warn('⚠️ Erro ao enviar lead:', response.statusText);
      throw new Error('Falha na resposta do servidor'); // Lança erro para o submitForm apanhar
    }
  } catch (error) {
    console.warn('Erro de rede ao submeter lead:', error.message);
    throw error; // Repassa o erro para que a UI mostre a mensagem vermelha
  }
}

function showFormError(message) {
  const form = document.getElementById('contactForm');
  let errorEl = form.querySelector('.form-error-msg');

  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'form-error-msg';
    errorEl.style.cssText = `
      background: #fee2e2;
      border: 1px solid #fca5a5;
      color: #dc2626;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    `;
    form.appendChild(errorEl);
  }

  errorEl.textContent = message;

  setTimeout(() => errorEl.remove(), 5000);
}

// ============================================================
// ANALYTICS TRACKING (placeholder)
// ============================================================
function trackEvent(eventName, params = {}) {
  // Google Analytics 4 placeholder
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, params);
  }

  // Console log for development
  console.log('[Analytics]', eventName, params);
}

// Track CTA clicks
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-track]');
  if (btn) {
    trackEvent('cta_click', { label: btn.dataset.track });
  }
});

// ============================================================
// ACTIVE NAV LINK — Highlight current section
// ============================================================
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: `-${document.getElementById('header')?.offsetHeight || 72}px 0px -60% 0px`
    }
  );

  sections.forEach(section => observer.observe(section));
}

window.addEventListener('load', initActiveNav);

// ============================================================
// PROCESS STEPS — Progressive reveal
// ============================================================
function initProcessSteps() {
  const steps = document.querySelectorAll('.process-step');
  if (!steps.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stepNum = parseInt(entry.target.dataset.step || 1);
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
          }, (stepNum - 1) * 150);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  steps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-20px)';
    step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(step);
  });
}

window.addEventListener('load', initProcessSteps);

// ============================================================
// TICKER PAUSE ON HOVER (additional touch)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const ticker = document.querySelector('.ticker-track');
  if (ticker) {
    ticker.addEventListener('mouseenter', () => {
      ticker.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('mouseleave', () => {
      ticker.style.animationPlayState = 'running';
    });
  }
});

// ============================================================
// EXPOSE GLOBAL FUNCTIONS (called from HTML)
// ============================================================
window.openModal = openModal;
window.closeModal = closeModal;
window.closeModalIfOutside = closeModalIfOutside;
window.submitForm = submitForm;
window.changeTestimonial = changeTestimonial;
window.goToTestimonial = goToTestimonial;
window.scrollToTop = scrollToTop;
