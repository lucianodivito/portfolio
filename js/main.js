/**
 * Portfolio - Main JavaScript
 * This file imports and initializes all modules
 */

// Core modules
import { initTabNavigation, initQuickActions } from './core/tabs.js';
import { initClock } from './core/clock.js';
import { initAnimations, initTiltEffect, initProjectCardAnimations } from './core/animations.js';
import { initTouchFeedback } from './core/touch.js';

// Feature modules
import { initCustomization, initPanelToggle } from './features/customization.js';
import { initNotifications, initDelayedNotifications } from './features/notifications.js';
import { animateBattery, initBatteryEasterEgg } from './features/battery.js';

// Easter egg modules
import { initPowerButton } from './easter-eggs/power.js';
import { initAvatarEasterEgg } from './easter-eggs/avatar.js';
import { initWifiEasterEgg } from './easter-eggs/wifi.js';
import { initDoubleTapHeart } from './easter-eggs/double-tap.js';
import { initLateNightMessage } from './easter-eggs/late-night.js';
import { initConsoleEasterEggs } from './easter-eggs/console.js';

/**
 * Initialize all modules when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  // Core functionality
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

  // Cosmetic battery animation
  animateBattery();
});
