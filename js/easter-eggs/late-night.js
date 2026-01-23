/**
 * Late night message
 */

export function initLateNightMessage() {
  const hour = new Date().getHours();
  const welcomeCard = document.querySelector('.welcome-card h2');

  if (hour >= 0 && hour < 6) {
    welcomeCard.textContent = "Hello, night owl! 🦉";

    // Add a subtle message
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
