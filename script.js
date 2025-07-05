(function(){
  const seg = window.location.pathname.split('/')[1];
  if (seg === 'anime-tinder') {
    window.location.replace(`/${seg}/#`);
  }

  if(seg === 'sfb') {
    window.location.replace(`/${seg}/index.html`);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // ===== PAGE LOADER =====
  const pageLoader = document.getElementById('page-loader');
  
  const hidePageLoader = () => {
    if (pageLoader) {
      pageLoader.classList.add('hidden');
      setTimeout(() => {
        pageLoader.style.display = 'none';
      }, 500);
    }
  };

  // Hide loader when page is fully loaded
  window.addEventListener('load', hidePageLoader);
  
  // Fallback: hide loader after 3 seconds if load event doesn't fire
  setTimeout(hidePageLoader, 3000);

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  };

  const getInitialTheme = () => {
    return localStorage.getItem('theme') || 'dark';
  };
  
  setTheme(getInitialTheme());

  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  // ===== TYPING ANIMATION =====
  const typingText = document.getElementById('typing-text');
  const textToType = "hi, i'm Vatsla.";
  let charIndex = 0;
  
  function type() {
    if (charIndex < textToType.length) {
      typingText.textContent += textToType.charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      typingText.classList.add('typing-done'); 
    }
  }
  
  type();

  // ===== PARTICLE ANIMATION =====
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId = null;

  const setupCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = canvas.parentElement.clientHeight;
  };

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.size > 0.2) this.size -= 0.01;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent');
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const initParticles = () => {
    particles = [];
    const numberOfParticles = Math.min((canvas.width * canvas.height) / 9000, 100);
    for (let i = 0; i < numberOfParticles; i++) {
      particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
  };

  const connectParticles = () => {
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent');
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 0.2;
    
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (const particle of particles) {
      particle.update();
      particle.draw();
    }
    
    connectParticles();
    animationId = requestAnimationFrame(animate);
  };
  
  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && canvas) {
    setupCanvas();
    initParticles();
    animate();
    
    const handleResize = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      setupCanvas();
      initParticles();
      animate();
    };
    
    window.addEventListener('resize', handleResize);
  }

  // ===== SCROLL ANIMATIONS =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '-50px 0px',
    threshold: 0.1
  });

  // Only animate content sections, not header/banner/footer
  const sectionsToAnimate = document.querySelectorAll('.fade-in-section');
  sectionsToAnimate.forEach(section => {
    observer.observe(section);
  });

  // ===== EXPERIENCE TABS =====
  const tabs = document.querySelector('.tab-list');
  const panels = document.querySelectorAll('.tab-panel');

  if (tabs) {
    tabs.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const panelId = e.target.getAttribute('aria-controls');
        const targetPanel = document.querySelector(`#${panelId}`);

        // Deactivate all tabs and panels
        document.querySelectorAll('.tab-button').forEach(tab => {
          tab.classList.remove('active');
          tab.setAttribute('aria-selected', 'false');
        });
        panels.forEach(panel => {
          panel.classList.remove('active');
        });

        // Activate clicked tab and panel
        e.target.classList.add('active');
        e.target.setAttribute('aria-selected', 'true');
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      }
    });
  }

  // ===== GO TO TOP BUTTON =====
  const goToTopButton = document.getElementById('go-to-top');
  
  if (goToTopButton) {
    // Show button when scrolled past header + banner
    const showButtonThreshold = 400; // Adjust based on header + banner height
    
    const toggleGoToTopButton = () => {
      if (window.scrollY > showButtonThreshold) {
        goToTopButton.classList.add('visible');
      } else {
        goToTopButton.classList.remove('visible');
      }
    };

    // Smooth scroll to top
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    // Event listeners
    window.addEventListener('scroll', toggleGoToTopButton);
    goToTopButton.addEventListener('click', scrollToTop);
    
    // Keyboard support
    goToTopButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToTop();
      }
    });
  }

  // 404 page letter grid
  const letters = [
    'l','o','s','t','i','n','m','e','t','a','x','l',
    '4','0','4',
    'y','y','w','v','b','o','t','d','y','p','a',
    'p','a','g','e',
    'v','j','a','n','o','t','s','c','e','w','v','x','e','p',
    'c','f','h','q','e',
    'f','o','u','n','d',
    's','w','q','v','g','o','b','a','c','k'
  ];

  const grid = document.getElementById('letter-grid');
  letters.forEach((char, idx) => {
    const li = document.createElement('li');
    li.textContent = char;
    const is404   = idx >= 12 && idx <= 14;
    const isNot   = idx >= 33 && idx <= 35;
    const isFound = idx >= 49 && idx <= 53;
    if (is404 || isNot || isFound) {
      li.classList.add('highlight');
    } else {
      li.classList.add('default');
    }
    grid.appendChild(li);
  });
}); 
