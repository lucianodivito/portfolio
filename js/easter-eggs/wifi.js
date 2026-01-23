/**
 * WiFi Easter Egg - Lose connection
 */

export function initWifiEasterEgg() {
  const wifiIcon = document.querySelector('.wifi-icon');
  const phoneScreen = document.querySelector('.phone-screen');

  // Create no connection overlay
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

  // Reconnect button
  noConnectionOverlay.querySelector('.reconnect-btn').addEventListener('click', () => {
    isConnected = true;
    noConnectionOverlay.style.display = 'none';
    wifiIcon.style.opacity = '1';
  });
}
