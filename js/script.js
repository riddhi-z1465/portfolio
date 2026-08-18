/**
 * Apple-Inspired Light-Theme Portfolio Engine
 * Riddhi Zunjarrao | Pure Vanilla JS & GSAP Suite (ScrollTrigger, ScrollTo, Text)
 * Pure Cyan Color System Edition
 */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP Plugins
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);
  }

  initAICanvas();
  initCustomCursor();
  initIntroLoader();
  initNavigation();
  initMagneticButtons();
  initRenderContent();
  initHeroParallaxAndNodes();
  initProjectFiltering();
  initCaseStudyModal();
  initCertificateModal();
  initScrollAnimations();
  init3DCardPhysics();
  initContactForm();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/* ==========================================================================
   1. INTERACTIVE AI NODE CANVAS (Harmonious Pure Cyan Particles)
   ========================================================================== */
function initAICanvas() {
  const canvas = document.getElementById('ai-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 22000), 55);

  const colors = [
    { r: 6, g: 182, b: 212 },   // Primary Cyan (#06B6D4)
    { r: 8, g: 145, b: 178 },   // Deep Ocean Cyan (#0891B2)
    { r: 34, g: 211, b: 238 },  // Light Electric Cyan (#22D3EE)
    { r: 14, g: 116, b: 144 }   // Dark Cyan (#0E7490)
  ];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.radius = Math.random() * 1.6 + 1.1;
      this.alpha = Math.random() * 0.2 + 0.12;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= Math.cos(angle) * force * 1.2;
          this.y -= Math.sin(angle) * force * 1.2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 115) {
          const alpha = (1 - dist / 115) * 0.09;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   2. HIGH-PERFORMANCE CUSTOM CURSOR & AMBIENT GLOW (gsap.quickTo)
   ========================================================================== */
function initCustomCursor() {
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cursorDot = document.getElementById('custom-cursor');
  const cursorFollower = document.getElementById('custom-cursor-follower');
  if (!cursorDot || !cursorFollower) return;

  // Set initial position offscreen and show
  gsap.set([cursorDot, cursorFollower], { xPercent: -50, yPercent: -50, opacity: 0 });

  // High performance quickTo setters
  const setCursorX = gsap.quickTo(cursorDot, 'x', { duration: 0.08, ease: 'power2.out' });
  const setCursorY = gsap.quickTo(cursorDot, 'y', { duration: 0.08, ease: 'power2.out' });
  const setFollowerX = gsap.quickTo(cursorFollower, 'x', { duration: 0.28, ease: 'power3.out' });
  const setFollowerY = gsap.quickTo(cursorFollower, 'y', { duration: 0.28, ease: 'power3.out' });

  let isCursorVisible = false;

  window.addEventListener('mousemove', (e) => {
    if (!isCursorVisible) {
      gsap.to([cursorDot, cursorFollower], { opacity: 1, duration: 0.25 });
      isCursorVisible = true;
    }
    setCursorX(e.clientX);
    setCursorY(e.clientY);
    setFollowerX(e.clientX);
    setFollowerY(e.clientY);
  });

  document.addEventListener('mouseleave', () => {
    gsap.to([cursorDot, cursorFollower], { opacity: 0, duration: 0.25 });
    isCursorVisible = false;
  });

  document.addEventListener('mouseenter', () => {
    gsap.to([cursorDot, cursorFollower], { opacity: 1, duration: 0.25 });
    isCursorVisible = true;
  });

  // Dynamic Contextual Hover States
  document.addEventListener('mouseover', (e) => {
    const target = e.target;

    // Interactive Buttons, Links & Badges
    if (target.closest('a, button, .magnetic-btn, .filter-btn, .view-cert-btn, .open-case-study-btn')) {
      cursorFollower.classList.add('is-hover-button');
      gsap.to(cursorDot, { scale: 0.7, duration: 0.15 });
    }
    // Cards & Visual containers
    else if (target.closest('.tilt-card-3d, .apple-showcase-card, .what-i-build-card, .journey-card, .cert-card-img-wrap')) {
      cursorFollower.classList.add('is-hover-card');
      gsap.to(cursorDot, { scale: 0.8, duration: 0.15 });
    }
    // Input & Textarea
    else if (target.closest('input, textarea')) {
      cursorFollower.classList.add('is-hover-text');
      gsap.to(cursorDot, { scale: 0.6, duration: 0.15 });
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target;
    if (target.closest('a, button, .magnetic-btn, .filter-btn, .view-cert-btn, .open-case-study-btn, .tilt-card-3d, .apple-showcase-card, .what-i-build-card, .journey-card, .cert-card-img-wrap, input, textarea')) {
      cursorFollower.className = 'pointer-events-none fixed z-[9999998] -translate-x-1/2 -translate-y-1/2';
      gsap.to(cursorDot, { scale: 1, duration: 0.15 });
    }
  });
}

/* ==========================================================================
   3. MAGNETIC BUTTONS ENGINE (GSAP ELASTIC RETURN)
   ========================================================================== */
function initMagneticButtons() {
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const magneticElements = document.querySelectorAll('.magnetic-btn');
  magneticElements.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.32,
        y: y * 0.32,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.35)'
      });
    });
  });
}

/* ==========================================================================
   4. MULTILINGUAL OPENING CINEMATIC (GSAP Timeline)
   ========================================================================== */
function initIntroLoader() {
  const loader = document.getElementById('intro-loader');
  const greetingContainer = document.getElementById('greeting-container');
  const progressBar = document.getElementById('loader-progress-bar');
  const counterEl = document.getElementById('loader-counter');
  const skipBtn = document.getElementById('skip-intro-btn');
  if (!loader || !greetingContainer) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loader.style.display = 'none';
    revealHeroAndNav();
    return;
  }

  document.body.style.overflow = 'hidden';

  const greetings = PORTFOLIO_DATA.greetings;
  const tl = gsap.timeline({
    onComplete: finishLoader,
    onUpdate: () => {
      const prog = tl.progress();
      if (progressBar) {
        progressBar.style.width = `${prog * 100}%`;
      }
      if (counterEl) {
        const count = Math.min(Math.floor(prog * 99) + 1, 100);
        counterEl.textContent = count < 10 ? `0${count}` : `${count}`;
      }
    }
  });

  // Multilingual Greetings with 3D perspective feel
  greetings.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'greeting-text';
    el.textContent = item.text;
    greetingContainer.appendChild(el);

    tl.to(el, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.28,
      ease: 'power3.out'
    })
      .to(el, {
        opacity: 0,
        y: -16,
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.in',
        delay: 0.12
      });
  });

  // Welcome sequence
  const welcomeEl = document.createElement('div');
  welcomeEl.className = 'greeting-text welcome-final';
  welcomeEl.textContent = 'WELCOME.';
  greetingContainer.appendChild(welcomeEl);

  tl.to(welcomeEl, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.45,
    ease: 'power3.out'
  })
    .to(welcomeEl, {
      opacity: 0,
      y: -16,
      duration: 0.25,
      ease: 'power2.in',
      delay: 0.3
    });

  // I'm Riddhi Zunjarrao sequence
  const nameEl = document.createElement('div');
  nameEl.className = 'greeting-text welcome-final';
  nameEl.textContent = "I'M RIDDHI ZUNJARRAO.";
  greetingContainer.appendChild(nameEl);

  tl.to(nameEl, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.55,
    ease: 'power3.out'
  })
    .to(nameEl, {
      opacity: 0,
      scale: 1.08,
      duration: 0.3,
      ease: 'power2.in',
      delay: 0.4
    });

  // Fade out loader
  tl.to(loader, {
    opacity: 0,
    duration: 0.5,
    ease: 'power3.inOut'
  });

  function finishLoader() {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.out',
      onComplete: () => {
        loader.style.display = 'none';
        document.body.style.overflow = 'auto';
        revealHeroAndNav();
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      }
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      tl.kill();
      finishLoader();
    });
  }
}

function revealHeroAndNav() {
  const tl = gsap.timeline();

  tl.from('#navbar', {
    y: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
    .from('.hero-reveal-item', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power4.out'
    }, '-=0.5');
}

/* ==========================================================================
   5. NAVIGATION & SMOOTH ANCHOR SCROLLING (ScrollToPlugin)
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');
  const navLinks = document.querySelectorAll('.nav-link-item');
  const backToTopBtn = document.getElementById('back-to-top');

  const sections = ['home', 'brand-statement-section', 'journey', 'what-i-build', 'skills', 'projects', 'experience', 'contact'];

  // Smooth anchor clicks across all in-page links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        gsap.to(window, {
          scrollTo: { y: targetEl, offsetY: 70 },
          duration: 1.1,
          ease: 'power3.inOut'
        });
      }
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('apple-light-nav');
    } else {
      navbar.classList.remove('apple-light-nav');
    }

    if (backToTopBtn) {
      if (window.scrollY > 500) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    }

    // Update active nav link
    let currentSection = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(secId => {
      const el = document.getElementById(secId);
      if (el && el.offsetTop <= scrollPos) {
        currentSection = secId;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      if (href === currentSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      gsap.to(window, { scrollTo: { y: 0 }, duration: 1.0, ease: 'power3.inOut' });
    });
  }

  let isOpen = false;
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      isOpen = !isOpen;
      if (isOpen) {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        gsap.fromTo(mobileMenu,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power2.out' }
        );
        gsap.fromTo('.mobile-menu-link',
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: 'power3.out', delay: 0.1 }
        );
        menuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
      } else {
        closeMobileMenu();
      }
      if (window.lucide) window.lucide.createIcons();
    });

    function closeMobileMenu() {
      isOpen = false;
      document.body.style.overflow = 'auto';
      gsap.to(mobileMenu, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          mobileMenu.classList.add('hidden');
        }
      });
      menuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
      if (window.lucide) window.lucide.createIcons();
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }
}

/* ==========================================================================
   6. HERO PARALLAX & CONTINUOUS ORBITAL NODE ANIMATIONS
   ========================================================================== */
function initHeroParallaxAndNodes() {
  const heroCard = document.getElementById('hero-tech-visual');
  const heroSvg = document.getElementById('hero-interactive-svg');
  if (!heroCard || !heroSvg) return;

  // 3D Parallax tilt on mousemove
  const setCardRotX = gsap.quickTo(heroCard, 'rotationX', { duration: 0.4, ease: 'power2.out' });
  const setCardRotY = gsap.quickTo(heroCard, 'rotationY', { duration: 0.4, ease: 'power2.out' });

  window.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const isOver = (
      e.clientX >= rect.left - 100 &&
      e.clientX <= rect.right + 100 &&
      e.clientY >= rect.top - 100 &&
      e.clientY <= rect.bottom + 100
    );

    if (isOver) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (rect.width / 2);
      const dy = (e.clientY - centerY) / (rect.height / 2);

      setCardRotX(-dy * 12);
      setCardRotY(dx * 12);
    } else {
      setCardRotX(0);
      setCardRotY(0);
    }
  });

  // Continuous subtle organic floating loops for SVG nodes
  const nodes = heroSvg.querySelectorAll('.interactive-node');
  nodes.forEach((node, index) => {
    gsap.to(node, {
      y: (index % 2 === 0 ? '-=6' : '+=6'),
      x: (index % 3 === 0 ? '+=4' : '-=4'),
      duration: 2.8 + index * 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.2
    });
  });
}

/* ==========================================================================
   7. 3D CARD PERSPECTIVE TILT & SPOTLIGHT GLARE ENGINE
   ========================================================================== */
function init3DCardPhysics() {
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targetCards = document.querySelectorAll(
    '.tilt-card-3d, .apple-showcase-card, .what-i-build-card, .journey-card, .cert-card, .github-repo-card, #about .group'
  );

  targetCards.forEach(card => {
    // Add glare element if missing
    if (!card.querySelector('.card-glare')) {
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    card.classList.add('tilt-card-3d');

    const setRotX = gsap.quickTo(card, 'rotationX', { duration: 0.35, ease: 'power2.out' });
    const setRotY = gsap.quickTo(card, 'rotationY', { duration: 0.35, ease: 'power2.out' });
    const setScale = gsap.quickTo(card, 'scale', { duration: 0.35, ease: 'power2.out' });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normalizedX = (x / rect.width) * 2 - 1;
      const normalizedY = (y / rect.height) * 2 - 1;

      setRotX(-normalizedY * 7.5);
      setRotY(normalizedX * 7.5);
      setScale(1.015);

      card.style.setProperty('--glare-x', `${x}px`);
      card.style.setProperty('--glare-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      setRotX(0);
      setRotY(0);
      setScale(1);
    });
  });
}

/* ==========================================================================
   8. DYNAMIC CONTENT RENDERING (PURE CYAN THEME)
   ========================================================================== */
function initRenderContent() {
  renderJourney();
  renderWhatIBuild();
  renderSkills();
  renderProjectsShowcase('all');
  renderExperience();
  renderEducation();
  renderCertifications();
  renderGithubSection();
  renderCaseStudyModal();
}

function renderJourney() {
  const container = document.getElementById('journey-container');
  if (!container) return;

  container.innerHTML = `
    <div class="journey-node-stem" id="journey-stem-line"></div>
    ${PORTFOLIO_DATA.journey.map(item => `
      <div class="journey-card relative flex items-start gap-6 group" data-step="${item.step}">
        <div class="journey-step-badge flex items-center justify-center font-mono font-bold text-xs shrink-0 z-10">
          ${item.step}
        </div>
        <div class="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-[rgba(6,182,212,0.14)] w-full shadow-sm hover:border-[#A5F3FC] hover:shadow-md transition-all space-y-2">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xs font-mono text-[#0891B2] font-bold uppercase tracking-wider">${item.tag}</span>
            <span class="text-xs font-mono text-[#64748B]">${item.period}</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">${item.title}</h3>
          <p class="text-sm sm:text-base text-[#64748B] leading-relaxed">${item.description}</p>
        </div>
      </div>
    `).join('')}
  `;
}

function renderWhatIBuild() {
  const container = document.getElementById('what-i-build-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.whatIBuild.map(item => `
    <div class="what-i-build-card space-y-6">
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono text-[#0891B2] font-bold">${item.number}</span>
        <span class="text-xs font-mono text-[#64748B] uppercase">${item.tools}</span>
      </div>

      <div class="space-y-2">
        <h3 class="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">${item.title}</h3>
        <p class="text-sm font-semibold text-[#0891B2]">${item.tagline}</p>
      </div>

      <p class="text-sm text-[#64748B] leading-relaxed">
        ${item.description}
      </p>

      <div class="pt-4 border-t border-[#E2E8F0] space-y-2">
        <span class="text-xs uppercase font-mono tracking-wider text-[#64748B] font-semibold block">Key Capabilities</span>
        <div class="flex flex-wrap gap-2">
          ${item.capabilities.map(cap => `
            <span class="text-xs px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#111827] font-medium hover:border-[#06B6D4] hover:text-[#0891B2] hover:bg-[#ECFEFF] transition-all">
              ${cap}
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.skills.map(cat => `
    <div class="skills-category-block border-t border-[#E2E8F0] pt-8 pb-10 space-y-4">
      <div class="flex items-baseline gap-3">
        <span class="text-xs font-mono text-[#0891B2] font-bold">${cat.number}</span>
        <h3 class="text-xs uppercase font-mono tracking-widest text-[#64748B] font-bold">${cat.category}</h3>
      </div>
      <div class="flex flex-wrap gap-x-8 gap-y-3">
        ${cat.items.map(item => `
          <span class="skill-item-pill text-lg md:text-2xl font-bold text-[#111827] cursor-default tracking-tight">
            ${item}
          </span>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function getProjectCategoryBadge(category) {
  switch (category) {
    case 'ai-rag':
      return `<span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC]">AI &amp; RAG</span>`;
    case 'mobile-safety':
      return `<span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC]">MOBILE &amp; SAFETY</span>`;
    case 'ai-ml':
      return `<span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC]">AI / ML</span>`;
    case 'data':
      return `<span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC]">DATA SCIENCE</span>`;
    case 'web':
      return `<span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC]">WEB DEV</span>`;
    case 'iot':
      return `<span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC]">IOT &amp; CLOUD</span>`;
    default:
      return `<span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC]">${category.toUpperCase()}</span>`;
  }
}

function getProjectSvgVisual(project) {
  switch (project.id) {
    case 'recall-lite':
      return `
        <svg viewBox="0 0 500 300" class="w-full h-full bg-[#F8FAFC]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rag-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0891B2"/>
              <stop offset="50%" stop-color="#06B6D4"/>
              <stop offset="100%" stop-color="#22D3EE"/>
            </linearGradient>
            <radialGradient id="rag-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>
          </defs>
          
          <!-- Background Glow & Grid Lines -->
          <circle cx="250" cy="150" r="130" fill="url(#rag-glow)"/>
          <line x1="50" y1="150" x2="450" y2="150" stroke="#E2E8F0" stroke-width="1.5" stroke-dasharray="4 4"/>
          
          <!-- Connectors with Flow Arrows -->
          <path d="M120,150 C170,95 190,95 240,95" fill="none" stroke="url(#rag-cyan-grad)" stroke-width="2.5"/>
          <path d="M120,150 C170,205 190,205 240,205" fill="none" stroke="url(#rag-cyan-grad)" stroke-width="2.5"/>
          <path d="M260,95 C310,95 330,150 380,150" fill="none" stroke="url(#rag-cyan-grad)" stroke-width="2.5"/>
          <path d="M260,205 C310,205 330,150 380,150" fill="none" stroke="url(#rag-cyan-grad)" stroke-width="2.5"/>
          <line x1="120" y1="150" x2="380" y2="150" stroke="#0891B2" stroke-width="1.5" stroke-dasharray="2 4"/>

          <!-- Node 1: Input Query / Docs (500+) -->
          <rect x="55" y="125" width="105" height="50" rx="10" fill="#FFFFFF" stroke="#0891B2" stroke-width="2"/>
          <text x="107" y="146" fill="#0891B2" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" text-anchor="middle">500+ DOCS</text>
          <text x="107" y="161" fill="#64748B" font-family="'JetBrains Mono', monospace" font-size="8.5" text-anchor="middle">Query &amp; Chunks</text>

          <!-- Node 2: pgvector Embedding Search (Top) -->
          <rect x="195" y="70" width="110" height="50" rx="10" fill="#FFFFFF" stroke="#06B6D4" stroke-width="2"/>
          <text x="250" y="91" fill="#0891B2" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" text-anchor="middle">PGVECTOR</text>
          <text x="250" y="106" fill="#64748B" font-family="'JetBrains Mono', monospace" font-size="8.5" text-anchor="middle">Vector Match</text>

          <!-- Node 3: Supabase Auth & RLS (Bottom) -->
          <rect x="195" y="180" width="110" height="50" rx="10" fill="#FFFFFF" stroke="#06B6D4" stroke-width="2"/>
          <text x="250" y="201" fill="#0891B2" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" text-anchor="middle">SUPABASE</text>
          <text x="250" y="216" fill="#64748B" font-family="'JetBrains Mono', monospace" font-size="8.5" text-anchor="middle">RLS Security</text>

          <!-- Node 4: Groq Llama 3.3 70B (Output) -->
          <rect x="335" y="125" width="110" height="50" rx="10" fill="url(#rag-cyan-grad)" stroke="#0891B2" stroke-width="1.5"/>
          <text x="390" y="146" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="800" text-anchor="middle">GROQ 70B</text>
          <text x="390" y="161" fill="#ECFEFF" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" text-anchor="middle">Grounded Ans</text>

          <!-- Title text -->
          <text x="250" y="38" fill="#0891B2" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" text-anchor="middle" letter-spacing="1.5">RETRIEVAL-AUGMENTED GENERATION (RAG)</text>
          <text x="250" y="270" fill="#64748B" font-family="'JetBrains Mono', monospace" font-size="9.5" text-anchor="middle">SUB-SECOND SIMILARITY SEARCH • CONVERSATIONAL AI</text>
        </svg>
      `;
    case 'wesafe':
      return `
        <svg viewBox="0 0 500 300" class="w-full h-full bg-[#F8FAFC]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="wesafe-cyan-pulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.25"/>
              <stop offset="70%" stop-color="#0891B2" stop-opacity="0.08"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="wesafe-wave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#0891B2"/>
              <stop offset="50%" stop-color="#06B6D4"/>
              <stop offset="100%" stop-color="#22D3EE"/>
            </linearGradient>
          </defs>
          <circle cx="250" cy="150" r="125" fill="url(#wesafe-cyan-pulse)"/>
          <circle cx="250" cy="150" r="95" stroke="rgba(6, 182, 212, 0.35)" stroke-width="1.5" stroke-dasharray="6 6" fill="none"/>
          <circle cx="250" cy="150" r="60" stroke="#0891B2" stroke-width="1.5" fill="none"/>
          <circle cx="250" cy="150" r="14" fill="#06B6D4"/>
          <path d="M60,150 Q150,85 250,150 T440,150" fill="none" stroke="url(#wesafe-wave)" stroke-width="2.5"/>
          <circle cx="150" cy="115" r="6" fill="#0891B2" stroke="#FFFFFF" stroke-width="1.5"/>
          <circle cx="350" cy="185" r="6" fill="#06B6D4" stroke="#FFFFFF" stroke-width="1.5"/>
          <text x="250" y="45" fill="#0891B2" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" text-anchor="middle" letter-spacing="2">VOICE AI & GEOSPATIAL SOS ACTIVE</text>
          <text x="250" y="270" fill="#64748B" font-family="'JetBrains Mono', monospace" font-size="10" text-anchor="middle">SPEECH RECOGNITION • EMERGENCY DISPATCH</text>
        </svg>
      `;
    case 'salary-prediction':
      return `
        <svg viewBox="0 0 500 300" class="w-full h-full bg-[#F8FAFC]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bar-cyan" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#0891B2"/>
              <stop offset="100%" stop-color="#22D3EE"/>
            </linearGradient>
            <linearGradient id="line-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#0891B2"/>
              <stop offset="100%" stop-color="#06B6D4"/>
            </linearGradient>
          </defs>
          <line x1="60" y1="240" x2="440" y2="240" stroke="#E2E8F0" stroke-width="1.5"/>
          <rect x="90" y="160" width="36" height="80" rx="4" fill="rgba(6, 182, 212, 0.25)"/>
          <rect x="150" y="120" width="36" height="120" rx="4" fill="rgba(6, 182, 212, 0.45)"/>
          <rect x="210" y="90" width="36" height="150" rx="4" fill="url(#bar-cyan)"/>
          <rect x="270" y="65" width="36" height="175" rx="4" fill="#0891B2"/>
          <rect x="330" y="105" width="36" height="135" rx="4" fill="rgba(6, 182, 212, 0.45)"/>
          <path d="M80,205 C180,180 250,55 420,45" fill="none" stroke="url(#line-cyan)" stroke-width="3"/>
          <circle cx="288" cy="65" r="6" fill="#ffffff" stroke="#0891B2" stroke-width="2.5"/>
          <text x="60" y="40" fill="#0891B2" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700">COMPENSATION REGRESSION PIPELINE</text>
          <text x="440" y="40" fill="#0891B2" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" text-anchor="end">R²: 0.942</text>
        </svg>
      `;
    case 'house-price':
      return `
        <svg viewBox="0 0 500 300" class="w-full h-full bg-[#F8FAFC]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="house-cyan-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#0891B2"/>
              <stop offset="100%" stop-color="#22D3EE"/>
            </linearGradient>
          </defs>
          <line x1="60" y1="240" x2="440" y2="240" stroke="#E2E8F0" stroke-width="1.5"/>
          <line x1="60" y1="50" x2="60" y2="240" stroke="#E2E8F0" stroke-width="1.5"/>
          <circle cx="100" cy="200" r="5.5" fill="#64748B" opacity="0.6"/>
          <circle cx="150" cy="180" r="6" fill="#06B6D4" opacity="0.75"/>
          <circle cx="210" cy="150" r="6.5" fill="#0891B2" opacity="0.85"/>
          <circle cx="280" cy="115" r="7" fill="#06B6D4"/>
          <circle cx="360" cy="80" r="7" fill="#0891B2"/>
          <circle cx="410" cy="60" r="8" fill="#ffffff" stroke="#0891B2" stroke-width="2.5"/>
          <line x1="60" y1="230" x2="440" y2="50" stroke="url(#house-cyan-grad)" stroke-width="2.5"/>
          <text x="60" y="38" fill="#0891B2" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700">GEOSPATIAL REAL ESTATE VALUATION</text>
        </svg>
      `;
    case 'availo':
      return `
        <svg viewBox="0 0 500 300" class="w-full h-full bg-[#F8FAFC]" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="50" width="400" height="200" rx="16" fill="#FFFFFF" stroke="rgba(6,182,212,0.2)" stroke-width="1.5"/>
          <circle cx="120" cy="150" r="8" fill="#0891B2"/>
          <circle cx="250" cy="110" r="12" fill="rgba(6, 182, 212, 0.15)" stroke="#06B6D4" stroke-width="2"/>
          <circle cx="250" cy="110" r="4.5" fill="#0891B2"/>
          <circle cx="380" cy="180" r="8" fill="#22D3EE"/>
          <path d="M120,150 Q250,90 380,180" fill="none" stroke="#06B6D4" stroke-width="2" stroke-dasharray="6 4"/>
          <text x="250" y="225" fill="#0891B2" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" text-anchor="middle">URBAN MOBILITY & FLEET ENGINE</text>
        </svg>
      `;
    case 'smart-kitchen':
      return `
        <svg viewBox="0 0 500 300" class="w-full h-full bg-[#F8FAFC]" xmlns="http://www.w3.org/2000/svg">
          <rect x="180" y="90" width="140" height="110" rx="10" fill="#FFFFFF" stroke="#06B6D4" stroke-width="2"/>
          <text x="250" y="145" fill="#111127" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" text-anchor="middle">ESP32 MCU</text>
          <text x="250" y="168" fill="#0891B2" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" text-anchor="middle">WOKWI + BLYNK</text>
          <path d="M60,145 H180 M320,145 H440" stroke="#06B6D4" stroke-width="2" stroke-dasharray="4 4"/>
          <circle cx="90" cy="145" r="6" fill="#06B6D4"/>
          <circle cx="410" cy="145" r="6" fill="#0891B2"/>
          <text x="250" y="45" fill="#0891B2" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" text-anchor="middle">CLOUD TELEMETRY & CUTOFF CONTROL</text>
        </svg>
      `;
    case 'society-management':
      return `
        <svg viewBox="0 0 500 300" class="w-full h-full bg-[#F8FAFC]" xmlns="http://www.w3.org/2000/svg">
          <rect x="60" y="70" width="110" height="160" rx="10" fill="#FFFFFF" stroke="rgba(6,182,212,0.25)" stroke-width="1.5"/>
          <rect x="195" y="70" width="110" height="160" rx="10" fill="#FFFFFF" stroke="rgba(6,182,212,0.35)" stroke-width="1.5"/>
          <rect x="330" y="70" width="110" height="160" rx="10" fill="#FFFFFF" stroke="rgba(6,182,212,0.25)" stroke-width="1.5"/>
          <text x="115" y="110" fill="#0891B2" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" text-anchor="middle">RESIDENTS</text>
          <text x="250" y="110" fill="#06B6D4" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" text-anchor="middle">NOTICES</text>
          <text x="385" y="110" fill="#0E7490" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" text-anchor="middle">BILLING</text>
          <text x="250" y="42" fill="#111127" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" text-anchor="middle">RESIDENTIAL COMMUNITY ARCHITECTURE</text>
        </svg>
      `;
    default:
      return '';
  }
}

function renderProjectsShowcase(filter = 'all') {
  const container = document.getElementById('projects-showcase-container');
  if (!container) return;

  const filteredProjects = filter === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.filterCategory === filter);

  container.innerHTML = filteredProjects.map(p => `
    <div class="apple-showcase-card project-showcase-item p-8 sm:p-12 lg:p-14 mb-12 last:mb-0" data-project-id="${p.id}" data-category="${p.filterCategory}">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        <!-- Text details -->
        <div class="lg:col-span-6 space-y-6 order-2 lg:order-1">
          <div class="space-y-2">
            <div class="flex items-center gap-3">
              <span class="text-xs font-mono text-[#0891B2] font-bold">PROJECT ${p.number}</span>
              ${getProjectCategoryBadge(p.filterCategory)}
            </div>
            <h3 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight group-hover:text-[#0891B2] transition-colors">${p.title}</h3>
            <p class="text-lg text-[#0891B2] font-semibold leading-snug">${p.tagline}</p>
          </div>

          <p class="text-sm sm:text-base text-[#64748B] leading-relaxed">
            ${p.description}
          </p>

          <div class="space-y-2 pt-2">
            <h4 class="text-xs uppercase font-mono tracking-wider text-[#64748B] font-bold">Core Highlights</h4>
            <ul class="space-y-2 text-sm text-[#111827]">
              ${p.features.map(f => `
                <li class="flex items-start gap-2.5">
                  <i data-lucide="check" class="w-4 h-4 text-[#0891B2] mt-0.5 shrink-0"></i>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="pt-2">
            <span class="text-xs font-mono text-[#64748B] block mb-2 font-semibold">Technologies</span>
            <div class="flex flex-wrap gap-2">
              ${p.techStack.map(t => `<span class="text-xs font-mono px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#111827] font-medium hover:border-[#A5F3FC] hover:text-[#0891B2] transition-colors">${t}</span>`).join('')}
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E2E8F0]">
            ${p.hasCaseStudy ? `
              <button class="open-case-study-btn magnetic-btn btn-apple-primary px-6 py-3 text-xs font-bold shadow-md">
                Explore Case Study <span class="btn-arrow">→</span>
              </button>
            ` : `
              <a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="magnetic-btn btn-apple-primary px-6 py-3 text-xs font-bold">
                View Project <span class="btn-arrow">→</span>
              </a>
            `}
            <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="magnetic-btn btn-apple-white px-6 py-3 text-xs font-bold">
              GitHub Repo ↗
            </a>
          </div>
        </div>

        <!-- Visual vector frame -->
        <div class="lg:col-span-6 order-1 lg:order-2">
          <div class="aspect-video w-full rounded-2xl overflow-hidden border border-[rgba(6,182,212,0.2)] bg-[#F8FAFC] shadow-sm hover:shadow-md transition-shadow">
            ${getProjectSvgVisual(p)}
          </div>
        </div>

      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
  initMagneticButtons();
  init3DCardPhysics();
}

function initProjectFiltering() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // GSAP smooth exit and entrance
      gsap.to('.project-showcase-item', {
        opacity: 0,
        y: -15,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          renderProjectsShowcase(filterValue);
          gsap.fromTo('.project-showcase-item',
            { opacity: 0, y: 30, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
          );
        }
      });
    });
  });
}

function renderExperience() {
  const container = document.getElementById('experience-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.experience.map(exp => `
    <div class="experience-card grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
      <div class="md:col-span-4">
        <span class="text-2xl md:text-3xl font-bold text-[#111827] tracking-tight">${exp.period}</span>
        <p class="text-sm font-mono text-[#64748B] mt-1">${exp.location}</p>
      </div>
      <div class="md:col-span-8 space-y-4">
        <div>
          <h3 class="text-2xl font-black text-[#111827] tracking-tight">${exp.role}</h3>
          <p class="text-base text-[#0891B2] font-bold">${exp.company}</p>
        </div>
        <ul class="space-y-3 text-[#64748B] text-base leading-relaxed">
          ${exp.highlights.map(h => `
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 rounded-full bg-[#0891B2] mt-2 shrink-0"></span>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
        <div class="flex flex-wrap gap-2 pt-2">
          ${exp.tags.map(t => `<span class="text-xs px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#64748B] font-medium">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderEducation() {
  const container = document.getElementById('education-container');
  if (!container) return;

  const edu = PORTFOLIO_DATA.education;
  container.innerHTML = `
    <div class="education-card grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
      <div class="md:col-span-4">
        <span class="text-2xl md:text-3xl font-bold text-[#111827] tracking-tight">${edu.period}</span>
        <p class="text-sm font-mono text-[#64748B] mt-1">${edu.location}</p>
      </div>
      <div class="md:col-span-8 space-y-6">
        <div>
          <h3 class="text-2xl md:text-3xl font-black text-[#111827] tracking-tight">${edu.degree}</h3>
          <p class="text-base text-[#0891B2] font-bold mt-1">${edu.institution}</p>
          <p class="text-xs font-mono text-[#64748B] mt-0.5">${edu.location}</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${edu.highlights.map(h => `
            <div class="p-6 rounded-2xl bg-white border border-[rgba(6,182,212,0.16)] flex items-center justify-between shadow-sm">
              <span class="text-sm text-[#64748B] font-semibold">${h.label}</span>
              <span class="text-2xl font-mono font-black text-[#111827] stat-counter-val" data-target="${h.value}">${h.value}</span>
            </div>
          `).join('')}
        </div>

        <p class="text-sm text-[#64748B] leading-relaxed">${edu.details}</p>
      </div>
    </div>
  `;
}

function renderCertifications() {
  const container = document.getElementById('certifications-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.certifications.map(cert => {
    const hasCredId = Boolean(cert.credentialId);

    return `
    <div class="cert-card p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-[#E2E8F0] hover:border-[#A5F3FC] hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        <!-- Prominent Certificate Thumbnail Frame -->
        <div class="cert-card-img-wrap aspect-[16/11] sm:aspect-[16/10] w-full mb-4 relative cursor-pointer flex items-center justify-center bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-xs"
             data-cert-id="${cert.id}"
             role="button"
             tabindex="0"
             aria-label="View ${cert.title} certificate image">
          
          <img src="${cert.image}"
               alt="${cert.title} Certificate"
               loading="lazy"
               class="cert-card-img w-full h-full object-contain p-2 transition-transform duration-300"
               onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.classList.remove('hidden');" />
          
          <!-- Fallback if image fails to load -->
          <div class="cert-card-fallback hidden flex flex-col items-center justify-center p-6 text-center w-full h-full bg-[#F8FAFC]">
            <div class="w-10 h-10 rounded-full bg-[#ECFEFF] text-[#0891B2] flex items-center justify-center mb-2">
              <i data-lucide="award" class="w-5 h-5"></i>
            </div>
            <span class="text-xs font-semibold text-[#111827] line-clamp-1">${cert.organization}</span>
            <span class="text-[11px] font-mono text-[#64748B] mt-0.5">Click to Preview</span>
          </div>

          <!-- Subtle Hover Overlay -->
          <div class="absolute inset-0 bg-[#0891B2]/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span class="bg-white/95 backdrop-blur-sm text-[#0891B2] text-[11px] font-mono font-bold px-3 py-1.5 rounded-full shadow-sm border border-[#A5F3FC] flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
              <i data-lucide="zoom-in" class="w-3.5 h-3.5"></i> Expand Certificate
            </span>
          </div>
        </div>

        <!-- Certificate Details Below Image -->
        <div class="space-y-2">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="text-xs font-mono text-[#0891B2] font-bold tracking-tight">${cert.category || 'Certification'}</span>
            ${cert.issueDate ? `<span class="text-[11px] font-mono text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded border border-[#E2E8F0]">${cert.issueDate}</span>` : ''}
          </div>

          <h4 class="text-base sm:text-lg font-bold text-[#111827] tracking-tight leading-snug pt-0.5">${cert.title}</h4>
          
          <p class="text-xs text-[#64748B] font-medium leading-relaxed">
            Issuing Organization: <span class="text-[#111827] font-semibold">${cert.organization}</span>
          </p>

          ${hasCredId ? `
            <div class="pt-1">
              <div class="text-[11px] font-mono text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md inline-flex items-center gap-1.5 border border-[#E2E8F0] max-w-full">
                <span class="text-[#0891B2] font-semibold shrink-0">Credential ID:</span>
                <span class="select-all truncate font-mono text-[#111827]">${cert.credentialId}</span>
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Action Button -->
      <div class="pt-4 mt-5 border-t border-[#E2E8F0] flex items-center justify-between">
        <button type="button" class="btn-apple-link text-xs font-bold view-cert-btn inline-flex items-center gap-1.5" data-cert-id="${cert.id}">
          <span>View Certificate</span>
          <span class="link-arrow">→</span>
        </button>
        <span class="text-[11px] font-mono text-[#94A3B8]">Full View ↗</span>
      </div>
    </div>
    `;
  }).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function initCertificateModal() {
  const modal = document.getElementById('certificate-modal');
  if (!modal) return;

  const backdrop = document.getElementById('cert-modal-backdrop');
  const dialog = modal.querySelector('.cert-modal-dialog');
  const closeBtn = document.getElementById('close-cert-modal-btn');
  const bottomCloseBtn = document.getElementById('bottom-close-cert-modal-btn');

  const modalTitle = document.getElementById('cert-modal-title');
  const modalOrg = document.getElementById('cert-modal-org');
  const modalDate = document.getElementById('cert-modal-date');
  const modalBadge = document.getElementById('cert-modal-badge');
  const modalImg = document.getElementById('cert-modal-img');
  const modalFallback = document.getElementById('cert-modal-fallback');
  const modalFallbackTitle = document.getElementById('cert-modal-fallback-title');
  const modalFallbackOrg = document.getElementById('cert-modal-fallback-org');
  const modalIdWrapper = document.getElementById('cert-modal-id-wrapper');
  const modalId = document.getElementById('cert-modal-id');
  const modalViewFull = document.getElementById('cert-modal-view-full');

  function openModal(cert) {
    if (!cert) return;

    modalTitle.textContent = cert.title;
    modalOrg.textContent = `Issued by ${cert.organization}`;
    modalDate.textContent = cert.issueDate || '';
    modalBadge.textContent = cert.issueDate ? 'Issued' : 'Credential';

    if (cert.credentialId) {
      modalId.textContent = cert.credentialId;
      modalIdWrapper.classList.remove('hidden');
    } else {
      modalIdWrapper.classList.add('hidden');
    }

    modalImg.style.display = 'block';
    modalFallback.classList.add('hidden');
    modalFallbackTitle.textContent = cert.title;
    modalFallbackOrg.textContent = `Issuing Organization: ${cert.organization}${cert.issueDate ? ' • Issued ' + cert.issueDate : ''}`;

    modalImg.src = cert.image;
    modalImg.alt = `${cert.title} Certificate`;

    modalImg.onerror = () => {
      modalImg.style.display = 'none';
      modalFallback.classList.remove('hidden');
      modalViewFull.classList.add('hidden');
      if (window.lucide) window.lucide.createIcons();
    };

    modalImg.onload = () => {
      modalImg.style.display = 'block';
      modalFallback.classList.add('hidden');
      modalViewFull.href = cert.image;
      modalViewFull.classList.remove('hidden');
    };

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // GSAP Spring Scale In
    gsap.fromTo(dialog,
      { scale: 0.9, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    );

    if (window.lucide) window.lucide.createIcons();
  }

  function closeModal() {
    gsap.to(dialog, {
      scale: 0.94,
      opacity: 0,
      y: 15,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  const container = document.getElementById('certifications-container');
  if (container) {
    container.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-cert-id]');
      if (!trigger) return;

      const certId = trigger.getAttribute('data-cert-id');
      const cert = PORTFOLIO_DATA.certifications.find(c => c.id === certId);
      if (cert) openModal(cert);
    });

    container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const trigger = e.target.closest('[data-cert-id]');
        if (trigger) {
          e.preventDefault();
          const certId = trigger.getAttribute('data-cert-id');
          const cert = PORTFOLIO_DATA.certifications.find(c => c.id === certId);
          if (cert) openModal(cert);
        }
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (bottomCloseBtn) bottomCloseBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function renderGithubSection() {
  const container = document.getElementById('github-repos-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.githubRepos.map(repo => `
    <div class="github-repo-card p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-[#E2E8F0] hover:border-[#A5F3FC] hover:shadow-md transition-all flex flex-col justify-between group">
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <i data-lucide="folder-git-2" class="w-4 h-4 text-[#0891B2]"></i>
          <h4 class="text-base font-bold text-[#111827] tracking-tight group-hover:text-[#0891B2] transition-colors">${repo.name}</h4>
        </div>
        <p class="text-xs text-[#64748B] leading-relaxed">${repo.description}</p>
      </div>
      <div class="pt-6 mt-4 border-t border-[#E2E8F0] flex items-center justify-between">
        <span class="text-[11px] font-mono text-[#64748B]">${repo.techStack}</span>
        <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="btn-apple-link text-xs font-bold">
          <span>Code</span>
          <span class="link-arrow">→</span>
        </a>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   9. FULLSCREEN WESAFE CASE STUDY MODAL & SIMULATOR
   ========================================================================== */
function initCaseStudyModal() {
  const modal = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('close-case-study-btn');
  const bottomCloseBtn = document.getElementById('bottom-close-case-study-btn');

  document.addEventListener('click', (e) => {
    if (e.target.closest('.open-case-study-btn')) {
      openModal();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (bottomCloseBtn) bottomCloseBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    gsap.fromTo(modal.querySelector('.max-w-5xl'),
      { y: 40, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
    );
  }

  function closeModal() {
    gsap.to(modal.querySelector('.max-w-5xl'), {
      y: 20,
      opacity: 0,
      scale: 0.98,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Voice Simulator logic inside modal
  const simVoiceBtn = document.getElementById('trigger-sim-voice-btn');
  const liveMicBtn = document.getElementById('trigger-live-mic-btn');
  const simStatus = document.getElementById('voice-sim-status');
  const simRadar = document.getElementById('sim-radar-core');
  const simLog = document.getElementById('sim-log-text');

  if (simVoiceBtn) {
    simVoiceBtn.addEventListener('click', () => {
      if (simStatus) simStatus.innerHTML = '<span class="text-[#0891B2] font-bold">Processing Voice Audio...</span>';
      if (simRadar) {
        simRadar.style.backgroundColor = '#0891B2';
        simRadar.textContent = 'ALERT';
        gsap.fromTo(simRadar, { scale: 1 }, { scale: 1.25, repeat: 3, yoyo: true, duration: 0.2 });
      }
      if (simLog) simLog.textContent = 'Detected phrase: "EMERGENCY" (Confidence: 99.4%)';

      setTimeout(() => {
        showToast('🚨 SOS Dispatched! GPS: 19.0330° N, 73.0297° E | Alert pushed to 3 trusted contacts.');
        if (simStatus) simStatus.innerHTML = '<span class="text-emerald-600 font-bold">SOS Dispatched Successfully</span>';
        if (simRadar) {
          simRadar.style.backgroundColor = '#111127';
          simRadar.textContent = 'ACTIVE';
        }
      }, 1000);
    });
  }

  if (liveMicBtn) {
    liveMicBtn.addEventListener('click', () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        showToast('Web Speech API is not supported in this browser. Running automated simulation.');
        simVoiceBtn.click();
        return;
      }

      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';

        if (simStatus) simStatus.innerHTML = '<span class="text-[#0891B2] font-bold">Listening... Say "Emergency" or "Help"</span>';
        recognition.start();

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          if (simLog) simLog.textContent = `Heard: "${transcript}"`;

          if (transcript.includes('emergency') || transcript.includes('help') || transcript.includes('safe')) {
            showToast(`🚨 Safe word detected ("${transcript}"). Triggering emergency broadcast!`);
            if (simStatus) simStatus.innerHTML = '<span class="text-emerald-600 font-bold">Safe Word Matched & SOS Broadcasted</span>';
          } else {
            showToast(`Recognized "${transcript}". Say "Emergency" to trigger.`);
            if (simStatus) simStatus.textContent = 'Status: Idle / Ready';
          }
        };

        recognition.onerror = () => {
          if (simStatus) simStatus.textContent = 'Status: Idle / Ready';
          showToast('Mic input ended.');
        };
      } catch (err) {
        simVoiceBtn.click();
      }
    });
  }
}

function renderCaseStudyModal() {
  const container = document.getElementById('case-study-sections-container');
  if (!container) return;

  const cs = PORTFOLIO_DATA.wesafeCaseStudy;
  container.innerHTML = cs.sections.map(sec => `
    <div class="border-t border-[#E2E8F0] pt-10 space-y-4">
      <span class="text-xs font-mono uppercase tracking-widest text-[#0891B2] font-bold">${sec.title}</span>
      <h3 class="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">${sec.headline}</h3>
      
      ${sec.content ? `<p class="text-base text-[#64748B] leading-relaxed max-w-3xl">${sec.content}</p>` : ''}

      ${sec.steps ? `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          ${sec.steps.map(st => `
            <div class="p-6 rounded-2xl bg-white border border-[rgba(6,182,212,0.16)] space-y-2 shadow-sm">
              <span class="text-xs font-mono font-bold text-[#0891B2]">${st.step}</span>
              <h4 class="text-base font-bold text-[#111827]">${st.name}</h4>
              <p class="text-xs text-[#64748B] leading-relaxed">${st.desc}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${sec.stack ? `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
          ${sec.stack.map(st => `
            <div class="p-4 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between">
              <span class="text-sm font-bold text-[#111827]">${st.name}</span>
              <span class="text-xs text-[#64748B]">${st.role}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${sec.highlights ? `
        <ul class="space-y-2 text-sm text-[#111827] pt-2">
          ${sec.highlights.map(h => `
            <li class="flex items-start gap-2.5">
              <i data-lucide="check" class="w-4 h-4 text-[#0891B2] mt-0.5 shrink-0"></i>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
      ` : ''}
    </div>
  `).join('');
}

/* ==========================================================================
   10. ADVANCED SCROLL ANIMATIONS (GSAP ScrollTrigger Suite)
   ========================================================================== */
function initScrollAnimations() {
  if (!window.ScrollTrigger) return;

  // Top reading progress bar sync
  ScrollTrigger.create({
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const bar = document.getElementById('scroll-progress');
      if (bar) bar.style.width = `${self.progress * 100}%`;
    }
  });

  // 1. SCROLL-DRIVEN SCROLLYTELLING: Brand Statement Text Reveal
  const statementSec = document.getElementById('brand-statement-section');
  if (statementSec) {
    const philosophyH2 = statementSec.querySelector('h2');
    if (philosophyH2) {
      // Split text into individual scrub words
      const rawText = philosophyH2.textContent.trim().split(/\s+/);
      philosophyH2.innerHTML = rawText.map(word => `<span class="scrub-word">${word}&nbsp;</span>`).join('');

      const words = philosophyH2.querySelectorAll('.scrub-word');

      gsap.fromTo(words,
        { opacity: 0.15, y: 6 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: statementSec,
            start: 'top 75%',
            end: 'center 45%',
            scrub: 0.8
          }
        }
      );
    }
  }

  // 2. Editorial 4 Words 3D Perspective Reveal
  const brandWords = document.querySelectorAll('.editorial-word');
  if (brandWords.length > 0) {
    gsap.fromTo(brandWords,
      { y: 35, opacity: 0, rotationX: -25 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#brand-words-block',
          start: 'top 80%'
        }
      }
    );
  }

  // 3. Dynamic Journey Timeline Stem (Scrubbed drawing down)
  const journeySection = document.getElementById('journey');
  const journeyStem = document.getElementById('journey-stem-line');
  if (journeySection && journeyStem) {
    gsap.fromTo(journeyStem,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: journeySection,
          start: 'top 70%',
          end: 'bottom 85%',
          scrub: 0.5
        }
      }
    );

    // Light up each journey step badge as it enters
    document.querySelectorAll('.journey-card').forEach((card) => {
      const badge = card.querySelector('.journey-step-badge');
      ScrollTrigger.create({
        trigger: card,
        start: 'top 75%',
        onEnter: () => {
          if (badge) badge.classList.add('badge-active');
        },
        onLeaveBack: () => {
          if (badge) badge.classList.remove('badge-active');
        }
      });
    });
  }

  // 4. Section Headers & Main Blocks Entrance
  const sectionHeadings = document.querySelectorAll('section > div > div.mb-16, section > div > div.space-y-3');
  sectionHeadings.forEach((heading) => {
    gsap.fromTo(heading.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: heading,
          start: 'top 90%',
          once: true
        }
      }
    );
  });

  // 5. Staggered Skill Item Pills Wave
  const skillsBlocks = document.querySelectorAll('.skills-category-block');
  skillsBlocks.forEach((block) => {
    const pills = block.querySelectorAll('.skill-item-pill');
    gsap.fromTo(pills,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: block,
          start: 'top 92%',
          once: true
        }
      }
    );
  });

  // Refresh ScrollTrigger after initial setup
  ScrollTrigger.refresh();

  // 6. Staggered Numerical Stat Counter Animation
  const statNumbers = document.querySelectorAll('.stat-counter-val');
  statNumbers.forEach((statEl) => {
    const rawVal = statEl.getAttribute('data-target') || statEl.textContent;
    const numMatch = rawVal.match(/[\d.]+/);
    if (numMatch) {
      const targetNum = parseFloat(numMatch[0]);
      const prefix = rawVal.slice(0, numMatch.index);
      const suffix = rawVal.slice(numMatch.index + numMatch[0].length);
      const isFloat = rawVal.includes('.');

      const counterObj = { val: 0 };
      ScrollTrigger.create({
        trigger: statEl,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(counterObj, {
            val: targetNum,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              const current = isFloat ? counterObj.val.toFixed(2) : Math.floor(counterObj.val);
              statEl.textContent = `${prefix}${current}${suffix}`;
            }
          });
        }
      });
    }
  });

  // 7. Closing Mantra Words Parallax Reveal
  const closingWords = document.querySelectorAll('.closing-word');
  if (closingWords.length > 0) {
    gsap.fromTo(closingWords,
      { y: 40, opacity: 0, rotationX: -15 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '#closing-mantra-section',
          start: 'top 75%'
        }
      }
    );
  }
}

/* ==========================================================================
   11. CONTACT FORM & TOAST FEEDBACK
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();
    const submitBtn = document.getElementById('form-submit-btn');

    if (!name || !email || !message) {
      showToast('Please complete all required fields.');
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast(`Thank you, ${name}! Your message was sent successfully.`);
      form.reset();
      submitBtn.innerHTML = 'Message Sent ✓';

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }, 700);
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.innerHTML = `
    <i data-lucide="check-circle-2" class="w-4 h-4 text-[#0891B2] shrink-0"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

