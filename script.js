// 🍔 Menu responsive mobile (animation burger)
const burger = document.querySelector('.burger-label');
const burgerToggle = document.getElementById('burger-toggle');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
});

// Animation croix sur les spans
const burgerSpans = burger.querySelectorAll('span');
burgerToggle.addEventListener('change', () => {
  burger.classList.toggle('open', burgerToggle.checked);
});

// 🌈 Défilement fluide pour tous les liens d'ancre
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Ferme le menu sur mobile après clic
      if (window.innerWidth < 769) {
        burgerToggle.checked = false;
        burger.classList.remove('open');
      }
    }
  });
});

// 🎯 Apparition des sections .fade-in avec IntersectionObserver
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
fadeEls.forEach(el => fadeObs.observe(el));

// 🧨 Effet particules au clic sur les liens de navigation
function createParticle(x, y, color) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particle.style.background = color;
  document.body.appendChild(particle);

  const angle = Math.random() * 2 * Math.PI;
  const distance = 60 + Math.random() * 90;
  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance;

  particle.animate([
    { transform: 'translate(0,0)', opacity: 1 },
    { transform: `translate(${dx}px,${dy}px)`, opacity: 0 }
  ], {
    duration: 800 + Math.random() * 400,
    easing: 'cubic-bezier(.61,-0.01,.41,1.01)'
  });

  setTimeout(() => particle.remove(), 1200);
}

const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const rect = link.getBoundingClientRect();
    const x = rect.left + rect.width / 2 + window.scrollX;
    const y = rect.top + rect.height / 2 + window.scrollY;
    for (let i = 0; i < 20; i++) {
      const color = `hsl(${Math.random()*360}, 80%, 60%)`;
      createParticle(x, y, color);
    }
  });
});

// 📊 Barre de progression de scroll en haut de page
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress-bar';
document.body.appendChild(progressBar);

function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = percent + '%';
}
window.addEventListener('scroll', updateProgressBar);
window.addEventListener('resize', updateProgressBar);
updateProgressBar();

// --- Styles dynamiques pour particules et barre de progression ---
const style = document.createElement('style');
style.textContent = `
#scroll-progress-bar {
  position: fixed;
  top: 0; left: 0;
  height: 4px;
  background: linear-gradient(90deg, #00ffff, #ff00ff, #ffff00);
  z-index: 9999;
  transition: width 0.2s;
  width: 0;
}
.particle {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.8;
  will-change: transform, opacity;
}
.burger-label.open span:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
}
.burger-label.open span:nth-child(2) {
  opacity: 0;
}
.burger-label.open span:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}
.error-message {
  color: #ff0055;
  font-size: 0.95em;
  margin-top: 0.2em;
}
.success-message {
  color: #00ff99;
  font-size: 1em;
  margin-top: 0.5em;
  text-align: center;
}
`;
document.head.appendChild(style);