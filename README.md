# Portfolio - Luciano Di Vito

Interactive portfolio designed as an iPhone mockup. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **iPhone-style UI** - Realistic phone frame with notch, status bar, and home indicator
- **Tab Navigation** - Home, Projects, Skills, and Contact sections
- **Customization Panel** - Change accent color, frame color, background, and theme (light/dark)
- **Real-time Clock** - Status bar shows current time
- **Battery Simulation** - Battery drains over time (5 minutes to empty)
- **Responsive Design** - Adapts to different screen sizes

## Easter Eggs

This portfolio has hidden surprises. Try clicking around... 👀

## Project Structure

```
portfolio/
├── index.html
├── css/
│   ├── bundle.css          # Concatenated CSS (production)
│   ├── main.css             # CSS with @imports (development)
│   ├── base/
│   │   ├── variables.css
│   │   ├── reset.css
│   │   └── background.css
│   ├── layout/
│   │   ├── phone-frame.css
│   │   ├── status-bar.css
│   │   ├── header.css
│   │   └── tabs.css
│   ├── components/
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   └── badges.css
│   ├── sections/
│   │   ├── home.css
│   │   ├── skills.css
│   │   └── contact.css
│   ├── features/
│   │   ├── customization-panel.css
│   │   ├── notifications.css
│   │   └── dark-theme.css
│   └── easter-eggs/
│       └── easter-eggs.css
├── js/
│   ├── bundle.js            # Concatenated JS (production)
│   ├── main.js              # ES modules entry (development)
│   ├── core/
│   │   ├── tabs.js
│   │   ├── clock.js
│   │   ├── animations.js
│   │   └── touch.js
│   ├── features/
│   │   ├── customization.js
│   │   ├── notifications.js
│   │   └── battery.js
│   └── easter-eggs/
│       ├── power.js
│       ├── avatar.js
│       ├── wifi.js
│       ├── double-tap.js
│       ├── late-night.js
│       └── console.js
└── assets/
    └── (images, CV, etc.)
```

## Usage

Just open `index.html` in a browser. No server required.

For development with ES modules, use a local server:
```bash
# Python
python -m http.server 8000

# Node.js
npx serve
```

## Tech Stack

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)

## Sections

### Home
- Welcome card with time-based greeting
- Stats (years of experience, projects, technologies)
- Current focus areas
- Education background
- Certifications
- Languages

### Projects
- Featured mobile apps and projects
- Platform indicators (iOS/Android)
- Tech stack tags

### Skills
- Mobile Development
- Languages
- IDEs & Tools
- State Management & Backend
- Publishing
- Secret Skills (easter egg section)

### Contact
- Email, GitHub, LinkedIn, X (Twitter)
- Telepathy (coming soon...)
- Download CV button

## License

MIT
