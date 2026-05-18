/* ============================================================
   STRATEGY MP — main.js
   Funcionalidad global: navbar, animaciones, newsletter, año
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Año actual en footer ---------- */
  const anio = document.getElementById('anioActual');
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---------- Navbar sticky con efecto al scroll ---------- */
  const navbar = document.getElementById('smpNavbar');
  if (navbar && !navbar.classList.contains('smp-navbar-solid')) {
    const onScroll = () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Cerrar menú móvil al hacer click en un link ---------- */
  document.querySelectorAll('.navbar-collapse .nav-link, .navbar-collapse .btn').forEach(el => {
    el.addEventListener('click', () => {
      const collapse = document.querySelector('.navbar-collapse.show');
      if (collapse) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapse) || new bootstrap.Collapse(collapse, { toggle: false });
        bsCollapse.hide();
      }
    });
  });

  /* ---------- AOS-like reveal on scroll ---------- */
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('smp-aos-visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => io.observe(el));
  } else {
    // Fallback
    document.querySelectorAll('[data-aos]').forEach(el => el.classList.add('smp-aos-visible'));
  }

  /* ---------- Newsletter (footer) ---------- */
  const newsletter = document.getElementById('formNewsletter');
  if (newsletter) {
    newsletter.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletter.querySelector('input[type="email"]');
      if (!input || !input.value) return;
      // Acá conectarías con tu servicio (Mailchimp, Brevo, Beehiiv...).
      input.value = '';
      showToast('¡Gracias por suscribirte! Te enviaremos contenido pronto.');
    });
  }

  /* ---------- Smooth scroll para enlaces internos ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = this.getAttribute('href');
      if (target.length > 1) {
        const el = document.querySelector(target);
        if (el) {
          e.preventDefault();
          const top = el.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- Helper: Toast simple ---------- */
  window.showToast = function (msg, type = 'success') {
    let toast = document.getElementById('smpToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'smpToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 22px;
        z-index: 2000;
        background: #fff;
        color: #1B1F3B;
        padding: 1rem 1.25rem;
        border-radius: 12px;
        box-shadow: 0 12px 30px rgba(18, 25, 80, .2);
        border-left: 4px solid #3046E0;
        transform: translateY(20px);
        opacity: 0;
        transition: all .35s ease;
        max-width: 320px;
        font-size: .92rem;
      `;
      document.body.appendChild(toast);
    }
    if (type === 'error') toast.style.borderLeftColor = '#dc3545';
    else toast.style.borderLeftColor = '#3046E0';
    toast.textContent = msg;
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
    }, 3500);
  };

})();
