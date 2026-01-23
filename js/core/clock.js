/**
 * Real-time Clock
 */

export function initClock() {
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
