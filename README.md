# GTCC Cyber Campus - Upgrade Project

This project is a modern, responsive redesign of the GTCC Cyber Campus website, focusing on improved UX, accessibility, and a clean code architecture using Tailwind CSS.

## 🚀 Tech Stack

- **Core:** HTML5, Vanilla JavaScript (ES6+)
- **Styling:** Tailwind CSS (via CDN for development), CSS Variables for theming
- **Icons:** SVG (Heroicons style)
- **Fonts:** Pretendard (Primary), Noto Sans KR (Fallback)

## 📂 Project Structure

```
yjisc_cyber_upgrade/
├── assets/
│   ├── css/
│   │   ├── modules/            # Modular CSS files
│   │   │   ├── theme.css       # CSS Variables (Color palettes)
│   │   │   └── ...             # (Other modules deprecated/emptied in favor of Tailwind)
│   │   ├── styles.css          # Core legacy styles & complex component styles (Cards, Map)
│   │   └── theme-overrides.css # Bundle entry point
│   ├── js/
│   │   ├── includes.js         # Handles HTML partials (header/footer) & Tailwind config
│   │   └── main.js             # Main UI logic (Sliders, Tabs)
│   ├── partials/
│   │   ├── header.html         # Global Header (Navigation, Mega Menu)
│   │   └── footer.html         # Global Footer
│   └── ... (images/icons)
├── index.html                  # Main Landing Page
├── greeting.html               # Example Subpage
└── README.md                   # Project Documentation
```

## 🔑 Key Features & Implementation Details

### 1. Theming (Light Mode)
- **Implementation:** Uses a clean, high-contrast light theme built with Tailwind CSS and Slate-based color palettes.
- **Colors:** Defined in `assets/css/modules/theme.css` and the Tailwind config in `assets/js/includes.js`.

### 2. Component System
- **Header/Footer:** Loaded dynamically via `assets/js/includes.js` from `assets/partials/`.
- **Hero Slider:** Located in `index.html`, styled with Tailwind. Logic in `main.js`.
- **Video Slider:** Located in `index.html`, fully responsive with Tailwind styling.
- **Bento Grids & Cards:** Modern card layouts using Glassmorphism effects, styled in `styles.css` (`.bento-card`, `.profile-card`) and Tailwind.

### 3. CSS Refactoring Status
- **Tailwind Migration:** Most component styles (Header, Footer, Hero, About Slider) have been migrated from external CSS files to utility classes in HTML.
- **Cleanup:** `header.css`, `hero-slider.css`, `about-slider.css`, etc. have been cleaned up to remove redundant `!important` rules.
- **Legacy Support:** `styles.css` is preserved to support subpages that haven't been fully migrated to Tailwind yet.

## 🛠️ How to Run & Edit

### Running Locally
You can serve the project using `npx serve` or any static file server.

```bash
cd yjisc_cyber_upgrade
npx serve .
```

### Editing Content
- **Header/Nav:** Edit `assets/partials/header.html`.
- **Footer:** Edit `assets/partials/footer.html`.
- **Homepage:** Edit `index.html`.
- **Styles:** 
  - Use Tailwind classes directly in HTML for new features.
  - Modify `assets/css/styles.css` for global component updates.
  - Modify `assets/css/modules/theme.css` for color variable updates.

### JavaScript Logic
- **Global Injections:** `assets/js/includes.js` (Tailwind setup, HTML includes).
- **UI Interactions:** `assets/js/main.js` (Sliders, Tabs).

## ⚠️ Important Notes
- **Deferred Loading:** Scripts are loaded with `defer`. `includes.js` must run successfully to trigger `main.js` initialization via the `includes:ready` event.
- **Tailwind Config:** The Tailwind configuration is injected at runtime in `includes.js`. Any custom colors or fonts should be added there.
