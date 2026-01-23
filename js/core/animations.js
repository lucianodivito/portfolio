/**
 * Animations
 */

/**
 * Animate skill bars when visible
 */
export function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');

  skillBars.forEach((bar, index) => {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';

    setTimeout(() => {
      bar.style.width = targetWidth;
    }, index * 100);
  });
}

/**
 * Initialize scroll-triggered animations
 */
export function initAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and sections
  const animatableElements = document.querySelectorAll(
    '.project-card, .stat-card, .skills-category, .contact-method'
  );

  animatableElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
  });

  // Trigger initial animations
  setTimeout(() => {
    animatableElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 100);
}

/**
 * Handle phone tilt effect on desktop
 */
export function initTiltEffect() {
  const phoneFrame = document.querySelector('.phone-frame');

  if (window.matchMedia('(min-width: 768px)').matches) {
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xRotation = ((clientY - innerHeight / 2) / innerHeight) * 10;
      const yRotation = ((clientX - innerWidth / 2) / innerWidth) * -10;

      phoneFrame.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    });

    document.addEventListener('mouseleave', () => {
      phoneFrame.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }
}

/**
 * Handle project card interactions
 */
export function initProjectCardAnimations() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      // Add a subtle bounce animation
      card.style.animation = 'none';
      card.offsetHeight; // Trigger reflow
      card.style.animation = 'cardBounce 0.3s ease';
    });
  });

  // Add the bounce keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes cardBounce {
      0%, 100% { transform: translateX(5px); }
      50% { transform: translateX(10px); }
    }
  `;
  document.head.appendChild(style);
}
