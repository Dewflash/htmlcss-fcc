// ── Star background ──
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.3 + 0.05,
      drift: (Math.random() - 0.5) * 0.2
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(122, 179, 224, ${s.alpha})`;
    ctx.fill();
    s.y -= s.speed;
    s.x += s.drift;
    if (s.y < -2) { s.y = canvas.height + 2; s.x = Math.random() * canvas.width; }
    if (s.x < -2) s.x = canvas.width + 2;
    if (s.x > canvas.width + 2) s.x = -2;
  }
  requestAnimationFrame(drawStars);
}

resize();
createStars(180);
drawStars();
window.addEventListener('resize', () => { resize(); createStars(180); });


// ── Typing animation ──
const phrases = [
  'Web Developer',
  'Creative Builder',
  'Lifelong Learner',
  'Travel Enthusiast'
];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}

setTimeout(type, 1200);


// ── Scroll reveal ──
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));
