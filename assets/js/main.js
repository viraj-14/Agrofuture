/* ============================================================
   AGROFUTURE - Smart Agriculture Platform
   Main JavaScript
   ============================================================ */

// ── Loader ──────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2200);
});

// ── Custom Cursor ────────────────────────────────────────────
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, follX = 0, follY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (cursor) { cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px'; }
});

function animateFollower() {
  follX += (mouseX - follX) * 0.12;
  follY += (mouseY - follY) * 0.12;
  if (follower) { follower.style.left = follX + 'px'; follower.style.top = follY + 'px'; }
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .nav-card, .crop-card, .content-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) { cursor.style.width = '20px'; cursor.style.height = '20px'; }
    if (follower) { follower.style.width = '56px'; follower.style.height = '56px'; follower.style.opacity = '0.3'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) { cursor.style.width = '12px'; cursor.style.height = '12px'; }
    if (follower) { follower.style.width = '36px'; follower.style.height = '36px'; follower.style.opacity = '0.6'; }
  });
});

// ── Scroll Progress ──────────────────────────────────────────
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = pct + '%';
});

// ── Sticky Navbar ────────────────────────────────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Back to Top ──────────────────────────────────────────────
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (backToTop) backToTop.classList.toggle('show', window.scrollY > 400);
});
if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Mobile Nav ───────────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileClose = document.querySelector('.mobile-nav-close');

if (hamburger) hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
if (mobileClose) mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
if (mobileNav) {
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

// ── Scroll Reveal ────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger').forEach(el => {
  revealObserver.observe(el);
});

// ── Animated Counters ────────────────────────────────────────
function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const duration = 2000;
  const step = 16;
  const steps = duration / step;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = prefix + (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
    if (current >= target) clearInterval(timer);
  }, step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ── FAQ Accordion ────────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = btn.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-question.open').forEach(b => {
      b.classList.remove('open');
      b.closest('.faq-item').classList.remove('open');
      b.closest('.faq-item').querySelector('.faq-answer').classList.remove('open');
    });

    if (!isOpen) {
      btn.classList.add('open');
      item.classList.add('open');
      answer.classList.add('open');
    }
  });
});

// ── Crop Filter ──────────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const cropCards = document.querySelectorAll('.crop-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    cropCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
        card.style.animation = 'scaleIn 0.4s ease';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ── Progress Bar Animation ───────────────────────────────────
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.progress-fill');
      if (fill) { const w = fill.getAttribute('data-width'); fill.style.width = w; }
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.progress-bar-wrapper').forEach(el => progressObserver.observe(el));

// ── Smooth scroll for anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Active nav link highlight ────────────────────────────────
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage || (currentPage === '' && a.getAttribute('href') === 'index.html')) {
    a.classList.add('active');
  }
});

// ── Parallax Hero ────────────────────────────────────────────
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
  });
}

// ── Typing animation ─────────────────────────────────────────
const typingEl = document.getElementById('typing-text');
if (typingEl) {
  const words = ['Smart Farming', 'Precision Agriculture', 'Sustainable Future', 'Digital Harvest'];
  let wordIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = words[wordIndex];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex--);
    } else {
      typingEl.textContent = current.substring(0, charIndex++);
    }

    let delay = isDeleting ? 60 : 110;
    if (!isDeleting && charIndex === current.length + 1) { delay = 2000; isDeleting = true; }
    if (isDeleting && charIndex === -1) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; charIndex = 0; delay = 400; }
    setTimeout(type, delay);
  }
  setTimeout(type, 1200);
}

// ── Weather auto-update (simulated) ─────────────────────────
function updateWeatherTime() {
  const el = document.getElementById('weather-time');
  if (el) {
    el.textContent = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }
}
updateWeatherTime();
setInterval(updateWeatherTime, 60000);

// ── Contact Form ─────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<span>✓ Message Sent!</span>';
    btn.style.background = 'linear-gradient(135deg, #2d8c55, #39ff8a)';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; contactForm.reset(); }, 3000);
  });
}

// ── Map embed placeholder ─────────────────────────────────────
const mapPlaceholder = document.getElementById('map-embed');
if (mapPlaceholder) {
  mapPlaceholder.innerHTML = `
    <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1rem;background:rgba(255,255,255,0.03);border-radius:16px;border:1px solid rgba(255,255,255,0.1);">
      <div style="font-size:3rem;">🗺️</div>
      <p style="color:rgba(255,255,255,0.5);font-size:0.9rem;">AgroFuture Research Campus<br>Pune, Maharashtra — 411007</p>
    </div>`;
}

console.log('%c🌱 AGROFUTURE', 'color:#39ff8a;font-size:2rem;font-weight:800;');
console.log('%cSmart Agriculture Platform | Powered by Future Technology', 'color:#4eca82;font-size:1rem;');
