/**
 * Portfolio - Bundled JavaScript
 * All modules combined for direct file:// usage
 */

(function() {
  'use strict';

  // ============================================
  // GLOBAL STATE
  // ============================================
  let isPhoneOn = true;

  // ============================================
  // CORE: TABS
  // ============================================
  function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;

        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');

        const contentArea = document.querySelector('.content-area');
        contentArea.scrollTo({ top: 0, behavior: 'smooth' });

        if (targetTab === 'skills') {
          animateSkillBars();
        }
      });
    });
  }

  function initQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn[data-goto]');

    actionButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTab = button.dataset.goto;
        const tabButton = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
        if (tabButton) {
          tabButton.click();
        }
      });
    });
  }

  // ============================================
  // CORE: CLOCK
  // ============================================
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

  // ============================================
  // CORE: ANIMATIONS
  // ============================================
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

  function initAnimations() {
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

    const animatableElements = document.querySelectorAll(
      '.project-card, .stat-card, .skills-category, .contact-method'
    );

    animatableElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
    });

    setTimeout(() => {
      animatableElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }, 100);
  }

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

  function initProjectCardAnimations() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'cardBounce 0.3s ease';
      });
    });

    const style = document.createElement('style');
    style.textContent = `
      @keyframes cardBounce {
        0%, 100% { transform: translateX(5px); }
        50% { transform: translateX(10px); }
      }
    `;
    document.head.appendChild(style);
  }

  // ============================================
  // CORE: TOUCH
  // ============================================
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

  // ============================================
  // FEATURES: CUSTOMIZATION
  // ============================================
  function initCustomization() {
    const colorThemes = {
      purple: { start: '#667eea', end: '#764ba2' },
      blue: { start: '#4facfe', end: '#00f2fe' },
      green: { start: '#11998e', end: '#38ef7d' },
      orange: { start: '#f093fb', end: '#f5576c' },
      red: { start: '#FF416C', end: '#FF4B2B' }
    };

    const frameColors = {
      dark: '#1C1C1E',
      light: '#F5F5F7',
      gold: '#C9A962'
    };

    const backgrounds = {
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      dark: '#0a0a0a',
      light: '#e0e0e0'
    };

    document.querySelectorAll('.color-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const color = btn.dataset.color;
        const theme = colorThemes[color];

        document.documentElement.style.setProperty('--gradient-start', theme.start);
        document.documentElement.style.setProperty('--gradient-end', theme.end);

        const header = document.querySelector('.app-header');
        const welcomeCard = document.querySelector('.welcome-card');
        const statusBar = document.querySelector('.status-bar');

        if (header) header.style.background = `linear-gradient(135deg, ${theme.start} 0%, ${theme.end} 100%)`;
        if (welcomeCard) welcomeCard.style.background = `linear-gradient(135deg, ${theme.start} 0%, ${theme.end} 100%)`;
        if (statusBar) statusBar.style.background = `linear-gradient(135deg, ${theme.start} 0%, ${theme.end} 100%)`;

        document.documentElement.style.setProperty('--primary-color', theme.start);
      });
    });

    document.querySelectorAll('.frame-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.frame-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const frame = btn.dataset.frame;
        const phoneFrame = document.querySelector('.phone-frame');
        const notch = document.querySelector('.phone-notch');

        if (phoneFrame) {
          phoneFrame.style.background = frameColors[frame];
          const statusBar = document.querySelector('.status-bar');
          if (statusBar) statusBar.style.color = frame === 'light' ? '#1C1C1E' : 'white';
        }
        if (notch) notch.style.background = frameColors[frame];
      });
    });

    document.querySelectorAll('.bg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const bg = btn.dataset.bg;
        const bgElement = document.querySelector('.background-gradient');

        if (bgElement) {
          bgElement.style.background = backgrounds[bg];
          if (bg === 'gradient') {
            bgElement.classList.remove('solid-bg');
          } else {
            bgElement.classList.add('solid-bg');
          }
        }
      });
    });

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

  function initPanelToggle() {
    const panel = document.querySelector('.customization-panel');
    const toggleBtn = document.getElementById('panel-toggle');

    toggleBtn.addEventListener('click', () => {
      panel.classList.toggle('collapsed');
    });
  }

  // ============================================
  // FEATURES: NOTIFICATIONS
  // ============================================
  function initNotifications() {
    const notificationBtn = document.getElementById('notification-btn');
    const dropdown = document.getElementById('notification-dropdown');
    const badge = document.querySelector('.notification-badge');

    notificationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('active');

      if (badge && dropdown.classList.contains('active')) {
        badge.style.display = 'none';
      }
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  }

  function showFunNotification(message) {
    const badge = document.querySelector('.notification-badge');
    const dropdown = document.getElementById('notification-dropdown');
    const notificationMessage = dropdown.querySelector('.notification-message');
    const notificationTitle = dropdown.querySelector('.notification-item-title');

    if (notificationTitle) notificationTitle.textContent = '🎮 Easter Egg!';
    if (notificationMessage) notificationMessage.textContent = message;

    if (badge) {
      badge.style.display = 'flex';
      badge.textContent = '!';
    }
  }

  function initDelayedNotifications() {
    const funMessages = [
      { title: "Pro tip 💡", message: "Try clicking on my avatar a few times 👀" },
      { title: "Still here? 👀", message: "I appreciate your attention span!" },
      { title: "Fun fact 🎲", message: "This portfolio has more easter eggs than bugs. Hopefully." },
      { title: "Coffee break? ☕", message: "Debugging is 90% coffee, 10% code." },
      { title: "Did you know? 🤓", message: "I make mobile apps, but I made this in web just to flex." },
      { title: "Plot twist 🎬", message: "The real portfolio was the friends we made along the way." },
      { title: "Loading... ⏳", message: "Just kidding, everything's already loaded." },
      { title: "Achievement unlocked 🏆", message: "You've been here longer than my average user!" },
      { title: "Error 418 🫖", message: "I'm a teapot. No wait, I'm a developer." },
      { title: "Confession 🤫", message: "My code runs on caffeine and hope." },
      { title: "Breaking news 📰", message: "Local developer mass-produces code with caffeine." },
      { title: "Reminder 📌", message: "Drink water. Stretch. Then hire me." },
      { title: "Hot take 🔥", message: "Tabs > Spaces. Fight me." },
      { title: "Secret 🤐", message: "There's no secret. I just wanted your attention." },
      { title: "Motivational 💪", message: "You miss 100% of the devs you don't hire." },
      { title: "Warning ⚠️", message: "Prolonged exposure may cause sudden urge to collaborate." },
      { title: "Update available 🔄", message: "New version: Me with more coffee." },
      { title: "System alert 🚨", message: "High levels of creativity detected." },
      { title: "Friendly reminder 😊", message: "The Contact section exists for a reason!" },
      { title: "Unpopular opinion 🙊", message: "Documentation is actually fun to write. Said no one ever." },
      { title: "Life hack 🧠", message: "If it works, don't touch it. If it doesn't, blame the previous dev." },
      { title: "Spoiler alert 🎬", message: "The bug was a feature all along." },
      { title: "Daily affirmation 🪞", message: "You are not your production bugs." },
      { title: "Tech support 🛠️", message: "Have you tried turning your brain off and on again?" },
      { title: "Honest moment 🤥", message: "I stand on the shoulders of Stack Overflow giants." },
      { title: "Debugging tip 🐛", message: "The error is always on line 1. Of a different file." },
      { title: "Career advice 💼", message: "Senior dev = junior dev but with mass-produced imposter syndrome." },
      { title: "Breaking 📢", message: "Local dev mass-produces code faster than bugs reproduce." },
      { title: "Shower thought 🚿", message: "Is copy-paste considered recycling? Asking for the environment." },
    ];

    let unreadCount = 0;
    const notificationContainer = document.querySelector('.notification-dropdown');
    const emptyMessage = document.querySelector('.empty-notifications');

    const notificationList = document.createElement('div');
    notificationList.className = 'notification-list';
    notificationContainer.appendChild(notificationList);

    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * funMessages.length);
      const { title, message } = funMessages[randomIndex];

      const newNotification = document.createElement('div');
      newNotification.className = 'notification-item new';
      newNotification.innerHTML = `
        <div class="notification-content">
          <div class="notification-item-header">
            <span class="notification-item-title">${title}</span>
            <span class="notification-time">now</span>
          </div>
          <p class="notification-message">${message}</p>
        </div>
      `;

      if (emptyMessage) emptyMessage.style.display = 'none';

      notificationList.insertBefore(newNotification, notificationList.firstChild);

      const badge = document.querySelector('.notification-badge');
      const dropdown = document.getElementById('notification-dropdown');

      if (!dropdown.classList.contains('active')) {
        unreadCount++;
        if (badge) {
          badge.style.display = 'flex';
          badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
        }
      }

      updateNotificationTimes();

      const allNotifications = notificationList.querySelectorAll('.notification-item');
      if (allNotifications.length > 10) {
        allNotifications[allNotifications.length - 1].remove();
      }

    }, 45000);

    const notificationBtn = document.getElementById('notification-btn');
    notificationBtn.addEventListener('click', () => {
      unreadCount = 0;
    });
  }

  function updateNotificationTimes() {
    const times = document.querySelectorAll('.notification-time');
    times.forEach((time, index) => {
      if (index === 0) time.textContent = 'now';
      else if (index === 1) time.textContent = '45s';
      else time.textContent = `${index * 45}s`;
    });
  }

  // ============================================
  // FEATURES: BATTERY
  // ============================================
  function animateBattery() {
    const batteryLevel = document.querySelector('.battery-level');
    let level = 100;

    setInterval(() => {
      if (level > 20) {
        level -= 1;
        batteryLevel.style.width = `${level}%`;
        if (level <= 20) batteryLevel.style.background = '#FF3B30';
      } else {
        level = 100;
        batteryLevel.style.width = '100%';
        batteryLevel.style.background = '#34C759';
      }
    }, 60000);
  }

  function initBatteryEasterEgg() {
    const batteryLevel = document.querySelector('.battery-level');
    const phoneScreen = document.querySelector('.phone-screen');
    let level = 100;
    let isDead = false;

    const deadOverlay = document.createElement('div');
    deadOverlay.className = 'battery-dead-overlay';
    deadOverlay.innerHTML = `
      <div class="dead-battery-content">
        <div class="dead-battery-icon">
          <svg viewBox="0 0 50 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="42" height="22" rx="4" stroke="#3A3A3A" stroke-width="2"/>
            <rect x="44" y="7" width="4" height="10" rx="1" fill="#3A3A3A"/>
            <rect x="4" y="4" width="8" height="16" rx="2" fill="#FF3B30"/>
          </svg>
        </div>
        <div class="charging-icon">
          <svg viewBox="0 0 24 24" fill="#FF3B30" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
          </svg>
        </div>
        <button class="recharge-btn">Tap to recharge</button>
      </div>
    `;
    deadOverlay.style.display = 'none';
    phoneScreen.appendChild(deadOverlay);

    deadOverlay.querySelector('.recharge-btn').addEventListener('click', () => {
      level = 100;
      batteryLevel.style.width = '100%';
      batteryLevel.style.background = '#34C759';
      deadOverlay.style.display = 'none';
      isDead = false;
    });

    setInterval(() => {
      if (isDead || !isPhoneOn) return;

      if (level > 0) {
        level -= 5;
        batteryLevel.style.width = `${level}%`;

        if (level <= 20 && level > 0) batteryLevel.style.background = '#FF3B30';

        if (level <= 0) {
          isDead = true;
          deadOverlay.style.display = 'flex';
        }
      }
    }, 15000);
  }

  // ============================================
  // EASTER EGGS: POWER
  // ============================================
  function initPowerButton() {
    const powerButton = document.getElementById('power-button');
    const phoneScreen = document.querySelector('.phone-screen');

    const screenOffOverlay = document.createElement('div');
    screenOffOverlay.className = 'screen-off-overlay';
    screenOffOverlay.style.display = 'none';
    phoneScreen.appendChild(screenOffOverlay);

    powerButton.addEventListener('click', () => {
      if (isPhoneOn) {
        isPhoneOn = false;
        screenOffOverlay.style.display = 'block';
      } else {
        isPhoneOn = true;
        screenOffOverlay.style.display = 'none';
      }
    });

    screenOffOverlay.addEventListener('click', () => {
      isPhoneOn = true;
      screenOffOverlay.style.display = 'none';
    });
  }

  // ============================================
  // EASTER EGGS: AVATAR
  // ============================================
  function initAvatarEasterEgg() {
    const avatar = document.querySelector('.profile-avatar');
    const initials = document.querySelector('.avatar-initials');
    const originalText = initials.textContent;
    let clickCount = 0;
    let resetTimeout;

    const reactions = ['😅', '🤯', '🚀', '💻', '☕', '🔥', '👨‍💻', '🎉'];
    const messages = [
      "Hey, that tickles!",
      "Stop poking me!",
      "I'm trying to work here!",
      "Coffee break?",
      "You found me!",
      "Error 418: I'm a teapot",
      "sudo hire me",
      "while(true) { code(); }"
    ];

    avatar.style.cursor = 'pointer';
    avatar.addEventListener('click', () => {
      clickCount++;
      clearTimeout(resetTimeout);

      if (clickCount >= 3) {
        const randomIndex = Math.floor(Math.random() * reactions.length);
        initials.textContent = reactions[randomIndex];
        showFunNotification(messages[randomIndex]);
        clickCount = 0;
      }

      resetTimeout = setTimeout(() => {
        initials.textContent = originalText;
        clickCount = 0;
      }, 2000);
    });
  }

  // ============================================
  // EASTER EGGS: WIFI
  // ============================================
  function initWifiEasterEgg() {
    const wifiIcon = document.querySelector('.wifi-icon');
    const phoneScreen = document.querySelector('.phone-screen');

    const noConnectionOverlay = document.createElement('div');
    noConnectionOverlay.className = 'no-connection-overlay';
    noConnectionOverlay.innerHTML = `
      <div class="no-connection-content">
        <div class="no-connection-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
            <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
            <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
            <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <line x1="12" y1="20" x2="12.01" y2="20"></line>
          </svg>
        </div>
        <p class="no-connection-title">No connection</p>
        <p class="no-connection-subtitle">You turned off my WiFi!</p>
        <button class="reconnect-btn">Reconnect</button>
      </div>
    `;
    noConnectionOverlay.style.display = 'none';
    phoneScreen.appendChild(noConnectionOverlay);

    let isConnected = true;

    wifiIcon.style.cursor = 'pointer';
    wifiIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isConnected) {
        isConnected = false;
        noConnectionOverlay.style.display = 'flex';
        wifiIcon.style.opacity = '0.3';
      }
    });

    noConnectionOverlay.querySelector('.reconnect-btn').addEventListener('click', () => {
      isConnected = true;
      noConnectionOverlay.style.display = 'none';
      wifiIcon.style.opacity = '1';
    });
  }

  // ============================================
  // EASTER EGGS: DOUBLE TAP HEART
  // ============================================
  function initDoubleTapHeart() {
    const contentArea = document.querySelector('.content-area');
    let lastTap = 0;

    function showHeart(x, y) {
      const heart = document.createElement('div');
      heart.className = 'double-tap-heart';
      heart.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      `;
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }

    contentArea.addEventListener('click', (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 300 && tapLength > 0) showHeart(e.clientX, e.clientY);
      lastTap = currentTime;
    });

    contentArea.addEventListener('touchend', (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 300 && tapLength > 0) {
        const touch = e.changedTouches[0];
        showHeart(touch.clientX, touch.clientY);
      }
      lastTap = currentTime;
    });
  }

  // ============================================
  // EASTER EGGS: LATE NIGHT
  // ============================================
  function initLateNightMessage() {
    const hour = new Date().getHours();
    const welcomeCard = document.querySelector('.welcome-card h2');

    if (hour >= 0 && hour < 6) {
      welcomeCard.textContent = "Hello, night owl! 🦉";
      const p = document.querySelector('.welcome-card p');
      const originalText = p.textContent;
      p.textContent = "You're up late! " + originalText + " Also, go to sleep. 😴";
    } else if (hour >= 6 && hour < 12) {
      welcomeCard.textContent = "Good morning! ☀️";
    } else if (hour >= 12 && hour < 18) {
      welcomeCard.textContent = "Good afternoon! 👋";
    } else {
      welcomeCard.textContent = "Good evening! 🌙";
    }
  }

  // ============================================
  // EASTER EGGS: CONSOLE
  // ============================================
  function initConsoleEasterEggs() {
    console.log('%c Welcome to Luciano Di Vito\'s portfolio! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Mobile Developer ', 'color: #667eea; font-size: 12px;');
    console.log('%c Feel free to reach out! ', 'color: #764ba2; font-size: 12px;');
    console.log('');
    console.log('%c 🔍 Oh, a curious developer! ', 'font-size: 14px; font-weight: bold;');
    console.log('%c Since you\'re already here... ', 'color: #888;');
    console.log('%c Try clicking my avatar multiple times 😉 ', 'color: #667eea;');
    console.log('%c Or wait a bit for surprise notifications! ', 'color: #764ba2;');
    console.log('');
    console.log('%c PS: No console.errors here, I promise! (hopefully) ', 'color: #34C759; font-style: italic;');
  }

  // ============================================
  // INITIALIZE ALL
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    // Core
    initTabNavigation();
    initClock();
    initQuickActions();
    initAnimations();
    initTouchFeedback();
    initTiltEffect();
    initProjectCardAnimations();

    // Features
    initCustomization();
    initNotifications();
    initPanelToggle();

    // Easter eggs
    initPowerButton();
    initAvatarEasterEgg();
    initBatteryEasterEgg();
    initDelayedNotifications();
    initLateNightMessage();
    initWifiEasterEgg();
    initDoubleTapHeart();
    initConsoleEasterEggs();

    // Cosmetic
    animateBattery();
  });

})();
