/**
 * Tab Navigation System
 */

import { animateSkillBars } from './animations.js';

export function initTabNavigation() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.getElementById(targetTab).classList.add('active');

      // Scroll content area to top
      const contentArea = document.querySelector('.content-area');
      contentArea.scrollTo({ top: 0, behavior: 'smooth' });

      // Trigger animations for skill bars when skills tab is shown
      if (targetTab === 'skills') {
        animateSkillBars();
      }
    });
  });
}

/**
 * Quick Action Links
 */
export function initQuickActions() {
  const actionButtons = document.querySelectorAll('.action-btn[data-goto]');

  actionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = button.dataset.goto;

      // Find and click the corresponding tab button
      const tabButton = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
      if (tabButton) {
        tabButton.click();
      }
    });
  });
}
