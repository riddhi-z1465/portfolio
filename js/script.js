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

  initThemeToggle();
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
        <div class="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-[rgba(6,182,212,0.14)] dark:border-slate-800/80 w-full shadow-sm hover:border-[#A5F3FC] dark:hover:border-cyan-400/40 hover:shadow-md transition-all space-y-2.5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xs font-mono text-[#0891B2] dark:text-[#22D3EE] font-bold uppercase tracking-wider">${item.tag}</span>
            ${item.period ? `<span class="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">${item.period}</span>` : ''}
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-[#111827] dark:text-[#F8FAFC] tracking-tight">${item.title}</h3>
          <p class="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] leading-relaxed">${item.description}</p>
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
        <span class="text-xs font-mono text-[#0891B2] dark:text-[#22D3EE] font-bold">${item.number}</span>
        <span class="text-xs font-mono text-[#64748B] dark:text-[#94A3B8] uppercase">${item.tools}</span>
      </div>

      <div class="space-y-2">
        <h3 class="text-2xl sm:text-3xl font-black text-[#111827] dark:text-[#F8FAFC] tracking-tight">${item.title}</h3>
        <p class="text-sm font-semibold text-[#0891B2] dark:text-[#22D3EE]">${item.tagline}</p>
      </div>

      <p class="text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
        ${item.description}
      </p>

      <div class="pt-4 border-t border-[#E2E8F0] dark:border-slate-800 space-y-2">
        <span class="text-xs uppercase font-mono tracking-wider text-[#64748B] dark:text-[#94A3B8] font-semibold block">Key Capabilities</span>
        <div class="flex flex-wrap gap-2">
          ${item.capabilities.map(cap => `
            <span class="text-xs px-3 py-1 rounded-full bg-white dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700/80 text-[#111827] dark:text-[#F8FAFC] font-medium hover:border-[#06B6D4] hover:text-[#0891B2] dark:hover:text-[#22D3EE] hover:bg-[#ECFEFF] dark:hover:bg-cyan-950/40 transition-all">
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
      return `<span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#ECFEFF] dark:bg-cyan-950/60 text-[#0891B2] dark:text-[#22D3EE] border border-[#A5F3FC] dark:border-cyan-800/60">AI &amp; RAG</span>`;
    case 'mobile-safety':
      return `<span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#ECFEFF] dark:bg-cyan-950/60 text-[#0891B2] dark:text-[#22D3EE] border border-[#A5F3FC] dark:border-cyan-800/60">MOBILE &amp; SAFETY</span>`;
    case 'ai-ml':
      return `<span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#ECFEFF] dark:bg-cyan-950/60 text-[#0891B2] dark:text-[#22D3EE] border border-[#A5F3FC] dark:border-cyan-800/60">AI / ML</span>`;
    case 'data':
      return `<span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#ECFEFF] dark:bg-cyan-950/60 text-[#0891B2] dark:text-[#22D3EE] border border-[#A5F3FC] dark:border-cyan-800/60">DATA SCIENCE</span>`;
    case 'web':
      return `<span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#ECFEFF] dark:bg-cyan-950/60 text-[#0891B2] dark:text-[#22D3EE] border border-[#A5F3FC] dark:border-cyan-800/60">WEB DEV</span>`;
    case 'iot':
      return `<span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#ECFEFF] dark:bg-cyan-950/60 text-[#0891B2] dark:text-[#22D3EE] border border-[#A5F3FC] dark:border-cyan-800/60">IOT &amp; CLOUD</span>`;
    default:
      return `<span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#ECFEFF] dark:bg-cyan-950/60 text-[#0891B2] dark:text-[#22D3EE] border border-[#A5F3FC] dark:border-cyan-800/60">${category.toUpperCase()}</span>`;
  }
}

function renderProjectsShowcase(filter = 'all') {
  const container = document.getElementById('projects-showcase-container');
  if (!container) return;

  const filteredProjects = filter === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.filterCategory === filter);

  container.innerHTML = filteredProjects.map(p => `
    <div class="apple-showcase-card project-showcase-item p-8 sm:p-12 lg:p-14 mb-10 last:mb-0" data-project-id="${p.id}" data-category="${p.filterCategory}">
      <div class="space-y-6">
        
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <span class="text-xs font-mono text-[#0891B2] dark:text-[#22D3EE] font-bold">PROJECT ${p.number}</span>
            ${getProjectCategoryBadge(p.filterCategory)}
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] dark:text-[#F8FAFC] tracking-tight group-hover:text-[#0891B2] dark:group-hover:text-[#22D3EE] transition-colors">${p.title}</h3>
          <p class="text-lg text-[#0891B2] dark:text-[#22D3EE] font-semibold leading-snug">${p.tagline}</p>
        </div>

        <p class="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] leading-relaxed max-w-4xl">
          ${p.description}
        </p>

        <div class="space-y-2 pt-2">
          <h4 class="text-xs uppercase font-mono tracking-wider text-[#64748B] dark:text-[#94A3B8] font-bold">Core Highlights</h4>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-sm text-[#111827] dark:text-[#F8FAFC]">
            ${p.features.map(f => `
              <li class="flex items-start gap-2.5">
                <i data-lucide="check" class="w-4 h-4 text-[#0891B2] dark:text-[#22D3EE] mt-0.5 shrink-0"></i>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="pt-2">
          <span class="text-xs font-mono text-[#64748B] dark:text-[#94A3B8] block mb-2 font-semibold">Technologies</span>
          <div class="flex flex-wrap gap-2">
            ${p.techStack.map(t => `<span class="text-xs font-mono px-3 py-1 rounded-full bg-white dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700/80 text-[#111827] dark:text-[#F8FAFC] font-medium hover:border-[#A5F3FC] hover:text-[#0891B2] dark:hover:text-[#22D3EE] transition-colors">${t}</span>`).join('')}
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4 pt-6 border-t border-[#E2E8F0] dark:border-slate-800">
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
    <div class="cert-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between group transition-all">
      <div>
        <!-- Prominent Certificate Thumbnail Frame -->
        <div class="cert-card-img-wrap aspect-[4/3] sm:aspect-[1.38/1] w-full mb-5 relative cursor-pointer flex items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800"
             data-cert-id="${cert.id}"
             role="button"
             tabindex="0"
             aria-label="View ${cert.title} certificate image">
          
          <!-- Top-Left Verified Pill -->
          <div class="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold shadow-xs pointer-events-none">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Verified</span>
          </div>

          <!-- Top-Right Full View Icon -->
          <div class="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center shadow-xs pointer-events-none">
            <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
          </div>

          <img src="${cert.image}"
               alt="${cert.title} Certificate"
               loading="lazy"
               class="cert-card-img w-full h-full object-cover object-center"
               onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.classList.remove('hidden');" />
          
          <!-- Fallback if image fails to load -->
          <div class="cert-card-fallback hidden flex flex-col items-center justify-center p-6 text-center w-full h-full bg-slate-50 dark:bg-slate-900 rounded-lg">
            <div class="w-10 h-10 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-2 border border-cyan-200 dark:border-cyan-800">
              <i data-lucide="award" class="w-5 h-5"></i>
            </div>
            <span class="text-xs font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">${cert.organization}</span>
            <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">Click to Preview</span>
          </div>

          <!-- Hover Overlay with Zoom Prompt -->
          <div class="absolute inset-0 bg-cyan-950/10 dark:bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3 pointer-events-none">
            <span class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-cyan-700 dark:text-cyan-300 text-[11px] font-mono font-bold px-3 py-1.5 rounded-full shadow-md border border-cyan-200 dark:border-cyan-800/80 flex items-center gap-1.5 transform translate-y-1.5 group-hover:translate-y-0 transition-transform">
              <i data-lucide="zoom-in" class="w-3.5 h-3.5 text-cyan-500"></i> Expand Certificate
            </span>
          </div>
        </div>

        <!-- Certificate Details -->
        <div class="space-y-2.5">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-200/70 dark:border-cyan-800/50">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
              ${cert.category || 'Certification'}
            </span>
            ${cert.issueDate ? `
              <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/70 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700/60 inline-flex items-center gap-1">
                <i data-lucide="calendar" class="w-3 h-3 text-slate-400"></i>
                ${cert.issueDate}
              </span>` : ''}
          </div>

          <h4 class="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug pt-0.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            ${cert.title}
          </h4>
          
          <div class="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <i data-lucide="building-2" class="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0"></i>
            <span class="truncate">Issuing Organization: <strong class="text-slate-900 dark:text-slate-200 font-semibold">${cert.organization}</strong></span>
          </div>
        </div>
      </div>

      <!-- Action Button Footer -->
      <div class="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <button type="button" class="btn-apple-primary px-3.5 py-1.5 text-xs font-semibold rounded-full view-cert-btn inline-flex items-center gap-1.5" data-cert-id="${cert.id}">
          <i data-lucide="eye" class="w-3.5 h-3.5"></i>
          <span>View Certificate</span>
        </button>
        <button type="button" class="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 view-cert-btn inline-flex items-center gap-1 transition-colors px-2 py-1" data-cert-id="${cert.id}">
          <span>Full View</span>
          <span class="link-arrow">↗</span>
        </button>
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
        showToast('SOS Dispatched! GPS: 19.0330° N, 73.0297° E | Alert pushed to 3 trusted contacts.', 'shield-alert');
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
        showToast('Web Speech API is not supported in this browser. Running automated simulation.', 'alert-triangle');
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
            showToast(`Safe word detected ("${transcript}"). Triggering emergency broadcast!`, 'shield-alert');
            if (simStatus) simStatus.innerHTML = '<span class="text-emerald-600 font-bold">Safe Word Matched & SOS Broadcasted</span>';
          } else {
            showToast(`Recognized "${transcript}". Say "Emergency" to trigger.`, 'mic');
            if (simStatus) simStatus.textContent = 'Status: Idle / Ready';
          }
        };

        recognition.onerror = () => {
          if (simStatus) simStatus.textContent = 'Status: Idle / Ready';
          showToast('Mic input ended.', 'mic-off');
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
      showToast(`Thank you, ${name}! Your message was sent successfully.`, 'check-circle-2');
      form.reset();
      submitBtn.innerHTML = '<span>Message Sent</span> <i data-lucide="check" class="w-4 h-4 inline ml-1"></i>';
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        if (window.lucide) window.lucide.createIcons();
      }, 3000);
    }, 700);
  });
}

function showToast(message, iconName = 'check-circle-2') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-4 h-4 text-[#0891B2] shrink-0"></i>
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

/* ==========================================================================
   12. THEME TOGGLE SYSTEM (Default: Light Mode, Persistent, Dynamic)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  function updateThemeUI(theme) {
    const isDark = theme === 'dark';

    if (isDark) {
      document.documentElement.classList.add('dark');
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#0B0F17');
    } else {
      document.documentElement.classList.remove('dark');
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#F8FAFC');
    }

    toggleBtns.forEach(btn => {
      const sunIcon = btn.querySelector('.theme-icon-sun');
      const moonIcon = btn.querySelector('.theme-icon-moon');
      const labelText = btn.querySelector('.theme-toggle-text');

      if (sunIcon && moonIcon) {
        if (isDark) {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }

      if (labelText) {
        labelText.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      }

      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Retrieve saved theme or default to 'light'
  let currentTheme = localStorage.getItem('portfolio-theme') || 'light';
  updateThemeUI(currentTheme);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('portfolio-theme', currentTheme);

      if (window.gsap) {
        gsap.fromTo(btn,
          { rotate: -40, scale: 0.82 },
          { rotate: 0, scale: 1, duration: 0.35, ease: 'back.out(2)' }
        );
      }

      updateThemeUI(currentTheme);
      showToast(currentTheme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled', currentTheme === 'dark' ? 'moon' : 'sun');
    });
  });
}


