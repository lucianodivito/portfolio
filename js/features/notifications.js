/**
 * Notifications
 */

export function initNotifications() {
  const notificationBtn = document.getElementById('notification-btn');
  const dropdown = document.getElementById('notification-dropdown');
  const badge = document.querySelector('.notification-badge');

  notificationBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');

    // Hide badge after viewing
    if (badge && dropdown.classList.contains('active')) {
      badge.style.display = 'none';
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
}

/**
 * Delayed notifications - every 45 seconds, accumulating
 */
export function initDelayedNotifications() {
  const funMessages = [
    { title: "Pro tip 💡", message: "Try clicking on my avatar a few times 👀" },
    { title: "Still here? 👀", message: "I appreciate your attention span!" },
    { title: "Fun fact 🎲", message: "This portfolio has more easter eggs than bugs. Hopefully." },
    { title: "Coffee break? ☕", message: "Debugging is 90% coffee, 10% code." },
    { title: "Did you know? 🤓", message: "I make mobile apps, but I made this in web just to flex." },
    { title: "Plot twist 🎬", message: "The real portfolio was the friends we made along the way." },
    { title: "Loading... ⏳", message: "Just kidding, everything's already loaded." },
    { title: "Achievement unlocked 🏆", message: "You've been here longer than my average user!" },
    { title: "Error 418 🫖", message: "I'm a teapot. No wait, I'm a developer." },
    { title: "Confession 🤫", message: "My code runs on caffeine and hope." },
    { title: "Breaking news 📰", message: "Local developer mass-produces code with caffeine." },
    { title: "Reminder 📌", message: "Drink water. Stretch. Then hire me." },
    { title: "Hot take 🔥", message: "Tabs > Spaces. Fight me." },
    { title: "Secret 🤐", message: "There's no secret. I just wanted your attention." },
    { title: "Motivational 💪", message: "You miss 100% of the devs you don't hire." },
    { title: "Warning ⚠️", message: "Prolonged exposure may cause sudden urge to collaborate." },
    { title: "Update available 🔄", message: "New version: Me with more coffee." },
    { title: "System alert 🚨", message: "High levels of mass-produced code detected." },
    { title: "Friendly reminder 😊", message: "The Contact section exists for a reason!" },
    { title: "Unpopular opinion 🙊", message: "Documentation is actually fun to write. Said no one ever." },
    { title: "Life hack 🧠", message: "If it works, don't touch it. If it doesn't, blame the previous dev." },
    { title: "Spoiler alert 🎬", message: "The bug was a feature all along." },
    { title: "Daily affirmation 🪞", message: "You are not your production bugs." },
    { title: "Tech support 🛠️", message: "Have you tried turning your brain off and on again?" },
    { title: "Honest moment 🤥", message: "I stand on the shoulders of Stack Overflow giants." },
    { title: "Debugging tip 🐛", message: "The error is always on line 1. Of a different file." },
    { title: "Career advice 💼", message: "Senior dev = junior dev but with imposter syndrome." },
    { title: "Breaking 📢", message: "Local dev mass-produces code faster than bugs reproduce." },
    { title: "Shower thought 🚿", message: "Is copy-paste considered recycling? Asking for the environment." },
  ];

  let unreadCount = 0;
  const notificationContainer = document.querySelector('.notification-dropdown');
  const emptyMessage = document.querySelector('.empty-notifications');

  // Add container for multiple notifications
  const notificationList = document.createElement('div');
  notificationList.className = 'notification-list';
  notificationContainer.appendChild(notificationList);

  setInterval(() => {
    // Pick a random message
    const randomIndex = Math.floor(Math.random() * funMessages.length);
    const { title, message } = funMessages[randomIndex];

    // Create new notification item
    const newNotification = document.createElement('div');
    newNotification.className = 'notification-item new';
    newNotification.innerHTML = `
      <div class="notification-content">
        <div class="notification-item-header">
          <span class="notification-item-title">${title}</span>
          <span class="notification-time">now</span>
        </div>
        <p class="notification-message">${message}</p>
      </div>
    `;

    // Hide empty message
    if (emptyMessage) {
      emptyMessage.style.display = 'none';
    }

    // Add to the top of the list
    notificationList.insertBefore(newNotification, notificationList.firstChild);

    // Update badge
    const badge = document.querySelector('.notification-badge');
    const dropdown = document.getElementById('notification-dropdown');

    if (!dropdown.classList.contains('active')) {
      unreadCount++;
      if (badge) {
        badge.style.display = 'flex';
        badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
      }
    }

    // Update "now" times to actual time passed
    updateNotificationTimes();

    // Limit to 10 notifications max
    const allNotifications = notificationList.querySelectorAll('.notification-item');
    if (allNotifications.length > 10) {
      allNotifications[allNotifications.length - 1].remove();
    }

  }, 45000);

  // Reset counter when opening notifications
  const notificationBtn = document.getElementById('notification-btn');
  notificationBtn.addEventListener('click', () => {
    unreadCount = 0;
  });
}

/**
 * Update notification times
 */
function updateNotificationTimes() {
  const times = document.querySelectorAll('.notification-time');
  times.forEach((time, index) => {
    if (index === 0) {
      time.textContent = 'now';
    } else if (index === 1) {
      time.textContent = '45s';
    } else {
      time.textContent = `${index * 45}s`;
    }
  });
}

/**
 * Show fun notification (for avatar easter egg)
 */
export function showFunNotification(message) {
  const badge = document.querySelector('.notification-badge');
  const dropdown = document.getElementById('notification-dropdown');
  const notificationMessage = dropdown.querySelector('.notification-message');
  const notificationTitle = dropdown.querySelector('.notification-item-title');

  if (notificationTitle) {
    notificationTitle.textContent = '🎮 Easter Egg!';
  }
  if (notificationMessage) {
    notificationMessage.textContent = message;
  }

  if (badge) {
    badge.style.display = 'flex';
    badge.textContent = '!';
  }
}
