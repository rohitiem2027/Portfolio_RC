/* =============================================
   RAGHUNATH CHATTERJEE — Portfolio JavaScript
   ============================================= */

/* ── NAVBAR: scroll shadow + active link ── */
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Scrolled class for shadow
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Active nav highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── SCROLL REVEAL (Intersection Observer) ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // Only animate once
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

// Observe all reveal-able elements
document.querySelectorAll(
  '.reveal, .timeline-item, .exp-card, .skill-card, .cert-card'
).forEach(el => revealObserver.observe(el));

/* ── STAGGERED ANIMATION for grids ── */
document.querySelectorAll('.exp-grid, .skills-grid, .cert-grid').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.1}s`;
  });
});

/* ── PARTICLE / FLOATING DOTS (canvas background) ── */
(function () {
  const canvas  = document.createElement('canvas');
  canvas.id     = 'particle-canvas';
  Object.assign(canvas.style, {
    position: 'fixed', top: '0', left: '0',
    width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '0', opacity: '0.35'
  });
  document.body.prepend(canvas);

  const ctx    = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(rand = false) {
      this.x    = Math.random() * W;
      this.y    = rand ? Math.random() * H : H + 10;
      this.r    = Math.random() * 1.5 + 0.5;
      this.vy   = -(Math.random() * 0.4 + 0.15);
      this.vx   = (Math.random() - 0.5) * 0.2;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.y  += this.vy;
      this.x  += this.vx;
      this.alpha -= 0.0008;
      if (this.y < -10 || this.alpha <= 0) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,180,216,${this.alpha})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 80 }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  init();
  loop();
})();

/* ── CONTACT FORM ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn  = document.getElementById('contactSubmitBtn');
    const name = document.getElementById('name').value.trim();

    btn.textContent    = '✅ Message Sent!';
    btn.style.opacity  = '0.75';
    btn.disabled       = true;

    setTimeout(() => {
      btn.textContent   = '🚀 Send Message';
      btn.style.opacity = '1';
      btn.disabled      = false;
      contactForm.reset();
    }, 3200);
  });
}

/* ── CURSOR GLOW (desktop only) ── */
if (window.matchMedia('(pointer: fine)').matches) {
  const glow    = document.createElement('div');
  Object.assign(glow.style, {
    position: 'fixed', width: '340px', height: '340px',
    borderRadius: '50%', pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(0,180,216,0.06) 0%, transparent 70%)',
    transform: 'translate(-50%, -50%)',
    transition: 'left 0.1s, top 0.1s',
    zIndex: '0'
  });
  document.body.appendChild(glow);

  window.addEventListener('mousemove', ({ clientX, clientY }) => {
    glow.style.left = `${clientX}px`;
    glow.style.top  = `${clientY}px`;
  });
}