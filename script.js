(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     Analytics stub
     Troque o console.log por uma chamada real (gtag, plausible,
     etc.) quando tiver uma ferramenta de analytics configurada.
     Todos os elementos com data-track="nome_do_evento" disparam
     este evento automaticamente ao serem clicados.
  ========================================================= */
  function trackEvent(name, detail) {
    console.log('[analytics]', name, detail || '');
    if (window.gtag) window.gtag('event', name, detail || {});
  }

  document.querySelectorAll('[data-track]').forEach((el) => {
    el.addEventListener('click', () => trackEvent(el.dataset.track));
  });

  /* =========================================================
     Menu mobile
  ========================================================= */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  }

  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* =========================================================
     Scroll progress bar
  ========================================================= */
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* =========================================================
     Navbar shadow on scroll
  ========================================================= */
  const navbar = document.getElementById('navbar');
  function onScroll() {
    if (navbar) navbar.style.boxShadow = window.scrollY > 8 ? '0 1px 0 rgba(0,0,0,0.3)' : 'none';
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* =========================================================
     Reveal animations (IntersectionObserver)
  ========================================================= */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  /* =========================================================
     Terminal typing animation ("Como uso IA")
  ========================================================= */
  const typedCodeEl = document.getElementById('typedCode');
  const codeSnippet =
`const draft = ai.prototype(idea);

// eu reviso, ajusto e decido
// a arquitetura antes de shippar
const product = review(draft);

deploy(product);`;

  function typeCode() {
    if (!typedCodeEl) return;

    if (prefersReducedMotion) {
      typedCodeEl.textContent = codeSnippet;
      return;
    }

    let i = 0;
    const speed = 16;

    function step() {
      if (i <= codeSnippet.length) {
        typedCodeEl.textContent = codeSnippet.slice(0, i);
        i++;
        setTimeout(step, speed);
      }
    }

    // só começa a digitar quando a seção entra na tela
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            step();
            obs.disconnect();
          }
        });
      }, { threshold: 0.4 });
      obs.observe(typedCodeEl.closest('.terminal'));
    } else {
      step();
    }
  }

  typeCode();

  /* =========================================================
     Filtro de projetos
  ========================================================= */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-card');
  const filterEmpty = document.getElementById('filterEmpty');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      caseCards.forEach((card) => {
        const categories = (card.dataset.category || '').split(' ');
        const show = filter === 'all' || categories.includes(filter);
        card.hidden = !show;
        if (show) visibleCount++;
      });

      if (filterEmpty) filterEmpty.hidden = visibleCount > 0;
      trackEvent('project_filter', { filter });
    });
  });

  /* =========================================================
     Contato — envio real via mailto (sem backend)
     NOTE: troque o e-mail abaixo pelo seu e-mail real antes de
     publicar. Para um envio "de verdade" sem abrir o cliente de
     e-mail do visitante, plugue Formspree, EmailJS ou Supabase
     aqui dentro (ver comentário no HTML, acima do <form>).
  ========================================================= */
  const CONTACT_EMAIL = 'SEU-EMAIL-AQUI@dominio.com';

  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  const validators = {
    name: (v) => v.trim().length >= 2 ? '' : 'Informe seu nome completo.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Informe um e-mail válido.',
    subject: (v) => v.trim().length >= 3 ? '' : 'Informe o assunto da mensagem.',
    message: (v) => v.trim().length >= 10 ? '' : 'Conte um pouco mais sobre o projeto (mín. 10 caracteres).'
  };

  function validateField(field) {
    const validator = validators[field.name];
    if (!validator) return true;

    const errorEl = document.getElementById(field.id + 'Error');
    const message = validator(field.value);

    field.closest('.form-row').classList.toggle('has-error', Boolean(message));
    if (errorEl) errorEl.textContent = message;
    field.setAttribute('aria-invalid', message ? 'true' : 'false');

    return !message;
  }

  if (form) {
    Object.keys(validators).forEach((name) => {
      const field = form.elements[name];
      if (field) field.addEventListener('blur', () => validateField(field));
    });

    form.addEventListener('submit', handleSubmit);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let isValid = true;
    Object.keys(validators).forEach((name) => {
      const field = form.elements[name];
      if (field && !validateField(field)) isValid = false;
    });

    if (!isValid) {
      formStatus.classList.add('is-error');
      formStatus.textContent = 'Verifique os campos destacados acima.';
      return;
    }

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const company = form.elements.company.value.trim();
    const subject = form.elements.subject.value.trim();
    const message = form.elements.message.value.trim();

    const bodyLines = [
      `Nome: ${name}`,
      `E-mail: ${email}`,
      company ? `Empresa: ${company}` : null,
      '',
      message
    ].filter(Boolean);

    const mailtoUrl =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    // Abre o cliente de e-mail do visitante com tudo preenchido.
    // Isso É um envio real de intenção — não uma simulação: se o
    // visitante não tiver cliente de e-mail configurado, nada é
    // enviado silenciosamente, e por isso mostramos a alternativa
    // do WhatsApp junto da mensagem de status.
    window.location.href = mailtoUrl;

    formStatus.classList.remove('is-error');
    formStatus.textContent = 'Abrindo seu aplicativo de e-mail com a mensagem preenchida. Se preferir, use o WhatsApp abaixo.';
    trackEvent('contact_form_submit', { subject });
  }

})();
