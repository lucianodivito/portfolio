/**
 * Customization Panel
 */

export function initCustomization() {
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
 * Panel Toggle
 */
export function initPanelToggle() {
  const panel = document.querySelector('.customization-panel');
  const toggleBtn = document.getElementById('panel-toggle');

  toggleBtn.addEventListener('click', () => {
    panel.classList.toggle('collapsed');
  });
}
