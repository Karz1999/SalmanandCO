const loader = document.querySelector('.loading');
if (loader) {
  window.addEventListener('load', () => {
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
}

const progressBar = document.querySelector('.scroll-progress');
const backTop = document.querySelector('.back-top');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));
}

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = height > 0 ? scrollTop / height : 0;
  if (progressBar) progressBar.style.transform = `scaleX(${ratio})`;
  if (backTop) backTop.classList.toggle('show', scrollTop > 600);
});

if (backTop) {
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Counter animation
const counters = document.querySelectorAll('[data-count]');
const animateCounters = () => {
  counters.forEach(counter => {
    const target = Number(counter.dataset.count || 0);
    const suffix = counter.dataset.suffix || '';
    const prefix = counter.dataset.prefix || '';
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();
    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const val = Math.floor(progress * target);
      counter.textContent = `${prefix}${val}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.disconnect();
    }
  });
}, { threshold: 0.4 });

const statSection = document.querySelector('.hero-stats');
if (statSection) observer.observe(statSection);

// FAQ accordion
const faqCards = document.querySelectorAll('.faq-card');
faqCards.forEach(card => {
  const button = card.querySelector('.faq-question');
  if (button) {
    button.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      faqCards.forEach(item => item.classList.remove('open'));
      if (!isOpen) card.classList.add('open');
    });
  }
});

// Testimonial slider
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.testimonial-card');
if (track && slides.length) {
  track.style.transform = 'translateX(0)';
}

// Modal
const modal = document.querySelector('.modal');
const modalOpen = document.querySelectorAll('[data-open-modal]');
const modalClose = document.querySelector('.modal-close');
modalOpen.forEach(btn => btn.addEventListener('click', () => modal?.classList.add('open')));
modalClose?.addEventListener('click', () => modal?.classList.remove('open'));
modal?.addEventListener('click', (event) => {
  if (event.target === modal) modal.classList.remove('open');
});

// Active nav link
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-links a');
const setActiveLink = () => {
  const scrollPosition = window.scrollY + 140;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPosition >= top && scrollPosition < bottom) {
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
      });
    }
  });
};
window.addEventListener('scroll', setActiveLink);
setActiveLink();
