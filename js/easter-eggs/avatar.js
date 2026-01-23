/**
 * Avatar Easter Egg - Click multiple times
 */

import { showFunNotification } from '../features/notifications.js';

export function initAvatarEasterEgg() {
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

      // Show a fun notification
      showFunNotification(messages[randomIndex]);

      clickCount = 0;
    }

    resetTimeout = setTimeout(() => {
      initials.textContent = originalText;
      clickCount = 0;
    }, 2000);
  });
}
