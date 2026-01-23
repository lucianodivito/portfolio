/**
 * Touch feedback for interactive elements
 */

export function initTouchFeedback() {
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

/**
 * Smooth scroll for content area
 */
export function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
