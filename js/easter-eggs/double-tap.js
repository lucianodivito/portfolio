/**
 * Double tap heart - Instagram style
 */

export function initDoubleTapHeart() {
  const contentArea = document.querySelector('.content-area');
  let lastTap = 0;

  contentArea.addEventListener('click', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
      // Double tap detected
      showHeart(e.clientX, e.clientY);
    }
    lastTap = currentTime;
  });

  // Also support touch
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

  // Remove after animation
  setTimeout(() => {
    heart.remove();
  }, 1000);
}
