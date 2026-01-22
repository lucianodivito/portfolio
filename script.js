/**
 * Mobile Developer Portfolio - Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabNavigation();
  initClock();
  initQuickActions();
  initAnimations();
  initTouchFeedback();
  initCustomization();
  initNotifications();
  initPanelToggle();
});

/**
 * Tab Navigation System
 */
function initTabNavigation() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.getElementById(targetTab).classList.add('active');

      // Scroll content area to top
      const contentArea = document.querySelector('.content-area');
      contentArea.scrollTo({ top: 0, behavior: 'smooth' });

      // Trigger animations for skill bars when skills tab is shown
      if (targetTab === 'skills') {
        animateSkillBars();
      }
    });
  });
}

/**
 * Real-time Clock
 */
function initClock() {
  const timeElement = document.getElementById('current-time');

  function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/**
 * Quick Action Links
 */
function initQuickActions() {
  const actionButtons = document.querySelectorAll('.action-btn[data-goto]');

  actionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = button.dataset.goto;

      // Find and click the corresponding tab button
      const tabButton = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
      if (tabButton) {
        tabButton.click();
      }
    });
  });
}

/**
 * Animate skill bars when visible
 */
function animateSkillBars() {
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
function initAnimations() {
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
 * Touch feedback for interactive elements
 */
function initTouchFeedback() {
  const interactiveElements = document.querySelectorAll(
    '.tab-btn, .action-btn, .project-card, .contact-method, .cv-button, .tool-badge'
  );

  interactiveElements.forEach(element => {
    element.addEventListener('touchstart', () => {
      element.style.transform = 'scale(0.97)';
    }, { passive: true });

    element.addEventListener('touchend', () => {
      element.style.transform = '';
    }, { passive: true });
  });
}

/**
 * Smooth scroll for content area
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Battery level animation (cosmetic)
 */
function animateBattery() {
  const batteryLevel = document.querySelector('.battery-level');
  let level = 100;

  // Slowly decrease battery level for realism (resets every 10 minutes)
  setInterval(() => {
    if (level > 20) {
      level -= 1;
      batteryLevel.style.width = `${level}%`;

      // Change color when low
      if (level <= 20) {
        batteryLevel.style.background = '#FF3B30';
      }
    } else {
      // Reset
      level = 100;
      batteryLevel.style.width = '100%';
      batteryLevel.style.background = '#34C759';
    }
  }, 60000); // Every minute
}

// Initialize battery animation
animateBattery();

/**
 * Handle phone tilt effect on desktop
 */
function initTiltEffect() {
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

// Initialize tilt effect
initTiltEffect();

/**
 * Handle project card interactions
 */
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

/**
 * Customization Panel
 */
function initCustomization() {
  // Color theme options
  const colorThemes = {
    purple: {
      start: '#667eea',
      end: '#764ba2'
    },
    blue: {
      start: '#4facfe',
      end: '#00f2fe'
    },
    green: {
      start: '#11998e',
      end: '#38ef7d'
    },
    orange: {
      start: '#f093fb',
      end: '#f5576c'
    },
    red: {
      start: '#FF416C',
      end: '#FF4B2B'
    }
  };

  // Frame colors
  const frameColors = {
    dark: '#1C1C1E',
    light: '#F5F5F7',
    gold: '#C9A962'
  };

  // Background options
  const backgrounds = {
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    dark: '#0a0a0a',
    light: '#e0e0e0'
  };

  // Color buttons
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const color = btn.dataset.color;
      const theme = colorThemes[color];

      document.documentElement.style.setProperty('--gradient-start', theme.start);
      document.documentElement.style.setProperty('--gradient-end', theme.end);

      // Update elements with gradient
      const header = document.querySelector('.app-header');
      const welcomeCard = document.querySelector('.welcome-card');
      const statusBar = document.querySelector('.status-bar');

      if (header) {
        header.style.background = `linear-gradient(135deg, ${theme.start} 0%, ${theme.end} 100%)`;
      }
      if (welcomeCard) {
        welcomeCard.style.background = `linear-gradient(135deg, ${theme.start} 0%, ${theme.end} 100%)`;
      }
      if (statusBar) {
        statusBar.style.background = `linear-gradient(135deg, ${theme.start} 0%, ${theme.end} 100%)`;
      }

      // Update tab active color
      document.documentElement.style.setProperty('--primary-color', theme.start);
    });
  });

  // Frame buttons
  document.querySelectorAll('.frame-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.frame-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const frame = btn.dataset.frame;
      const phoneFrame = document.querySelector('.phone-frame');
      const notch = document.querySelector('.phone-notch');

      if (phoneFrame) {
        phoneFrame.style.background = frameColors[frame];

        // Adjust text colors for light frame
        const statusBar = document.querySelector('.status-bar');
        if (statusBar) {
          statusBar.style.color = frame === 'light' ? '#1C1C1E' : 'white';
        }
      }
      if (notch) {
        notch.style.background = frameColors[frame];
      }
    });
  });

  // Background buttons
  document.querySelectorAll('.bg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const bg = btn.dataset.bg;
      const bgElement = document.querySelector('.background-gradient');

      if (bgElement) {
        bgElement.style.background = backgrounds[bg];

        // Hide/show the animated pseudo-element effect
        if (bg === 'gradient') {
          bgElement.classList.remove('solid-bg');
        } else {
          bgElement.classList.add('solid-bg');
        }
      }
    });
  });

  // App Theme buttons
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const theme = btn.dataset.theme;
      const phoneScreen = document.querySelector('.phone-screen');

      if (phoneScreen) {
        if (theme === 'dark') {
          phoneScreen.classList.add('dark-theme');
        } else {
          phoneScreen.classList.remove('dark-theme');
        }
      }
    });
  });
}

/**
 * Notifications
 */
function initNotifications() {
  const notificationBtn = document.getElementById('notification-btn');
  const dropdown = document.getElementById('notification-dropdown');
  const badge = document.querySelector('.notification-badge');

  notificationBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');

    // Hide badge after viewing
    if (badge && dropdown.classList.contains('active')) {
      badge.style.display = 'none';
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
}

/**
 * Panel Toggle
 */
function initPanelToggle() {
  const panel = document.querySelector('.customization-panel');
  const toggleBtn = document.getElementById('panel-toggle');

  toggleBtn.addEventListener('click', () => {
    panel.classList.toggle('collapsed');
  });
}

/**
 * Console Easter Egg
 */
console.log('%c Welcome to Luciano Di Vito\'s portfolio! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px;');
console.log('%c Mobile Developer ', 'color: #667eea; font-size: 12px;');
console.log('%c Feel free to reach out! ', 'color: #764ba2; font-size: 12px;');
