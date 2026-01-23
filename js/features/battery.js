/**
 * Battery Features
 */

import { isPhoneOn } from '../easter-eggs/power.js';

/**
 * Battery level animation (cosmetic)
 */
export function animateBattery() {
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
  }, 60000);
}

/**
 * Battery Death Easter Egg
 */
export function initBatteryEasterEgg() {
  const batteryLevel = document.querySelector('.battery-level');
  const phoneScreen = document.querySelector('.phone-screen');
  let level = 100;
  let isDead = false;

  // Create dead battery overlay (iOS style)
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

  // Recharge button
  deadOverlay.querySelector('.recharge-btn').addEventListener('click', () => {
    level = 100;
    batteryLevel.style.width = '100%';
    batteryLevel.style.background = '#34C759';
    deadOverlay.style.display = 'none';
    isDead = false;
  });

  // Drain battery (every 15 seconds = ~5 minutes to empty)
  setInterval(() => {
    if (isDead || !isPhoneOn()) return;

    if (level > 0) {
      level -= 5;
      batteryLevel.style.width = `${level}%`;

      if (level <= 20 && level > 0) {
        batteryLevel.style.background = '#FF3B30';
      }

      if (level <= 0) {
        isDead = true;
        deadOverlay.style.display = 'flex';
      }
    }
  }, 15000);
}
