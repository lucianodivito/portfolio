/**
 * Power Button Easter Egg
 */

// Global state for power
let phoneOn = true;

export function isPhoneOn() {
  return phoneOn;
}

export function initPowerButton() {
  const powerButton = document.getElementById('power-button');
  const phoneScreen = document.querySelector('.phone-screen');

  // Create screen off overlay
  const screenOffOverlay = document.createElement('div');
  screenOffOverlay.className = 'screen-off-overlay';
  screenOffOverlay.style.display = 'none';
  phoneScreen.appendChild(screenOffOverlay);

  powerButton.addEventListener('click', () => {
    if (phoneOn) {
      // Turn off
      phoneOn = false;
      screenOffOverlay.style.display = 'block';
    } else {
      // Turn on
      phoneOn = true;
      screenOffOverlay.style.display = 'none';
    }
  });

  // Tap screen to turn on
  screenOffOverlay.addEventListener('click', () => {
    phoneOn = true;
    screenOffOverlay.style.display = 'none';
  });
}
