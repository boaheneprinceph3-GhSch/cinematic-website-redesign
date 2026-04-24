# Cinematic Website Redesigns

A collection of scroll-driven, cinematic websites built with vanilla JavaScript, GSAP, and modern CSS. Each project transforms traditional websites into immersive, scroll-animated experiences.

## 🎬 Live Projects

| Project | Industry | Description | Live Site | Code |
|---------|----------|-------------|-----------|------|
| **Balstudio** | Architecture | Award-winning architecture firm with scroll-scrubbed video, text mask reveals, and interactive waves background | [View Site](https://balstudio-cinematic-78o5x47bm-boaheneprinceph4-7854s-projects.vercel.app) | [Code](./balstudio-cinematic) |

*More projects coming soon...*

## ✨ Features Across Projects

- **Scroll-scrubbed video** — Video playback tied to scroll position
- **Text mask reveals** — Headlines fill with color as you scroll
- **Interactive backgrounds** — Perlin noise animated waves with cursor interaction
- **3D flip cards** — Interactive service/product showcases
- **Accordion sliders** — Hover-to-expand project galleries
- **Cinematic animations** — GSAP-powered scroll effects
- **Fully responsive** — Mobile-first design
- **Accessibility** — Respects `prefers-reduced-motion`, semantic HTML

## 🧩 Component Library

This repo includes a library of **30+ reusable cinematic components** adapted from [RoboNuggets](https://github.com/robonuggets/cinematic-site-components):

### Scroll-Driven Effects (9)
- Text Mask Reveal, Sticky Stack, Zoom Parallax, Horizontal Scroll, Sticky Cards, SVG Draw, Curtain Reveal, Split Scroll, Color Shift

### Cursor & Hover Effects (8)
- Cursor-Reactive, Accordion Slider, Cursor Reveal, Image Trail, Flip Cards, Magnetic Grid, Spotlight Border, Drag Pan

### Click & Tap Effects (6)
- View Transitions, Particle Button, Odometer, Coverflow, Dynamic Island, Dock Nav

### Ambient & Auto Effects (7)
- Text Scramble, Kinetic Marquee, Mesh Gradient, Circular Text, Glitch Effect, Typewriter, Gradient Stroke

📁 [Browse Components](./cinematic-site-components)

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, scroll-driven animations
- **Vanilla JavaScript** — No frameworks, maximum portability
- **GSAP 3.12** — ScrollTrigger for cinematic effects
- **Canvas API** — Interactive backgrounds with Perlin noise
- **Google Fonts** — Typography pairings
- **Material Symbols** — Icon system

## 🚀 Quick Start

Each project can be previewed locally:

```bash
# Navigate to any project
cd balstudio-cinematic

# Option 1: Using npx serve
npx serve .

# Option 2: Using Python
python3 -m http.server 8000

# Option 3: Using PHP
php -S localhost:8000
```

## 📦 Project Structure

```
cinematic-website-redesign/
├── README.md                          # This file
├── .gitignore                         # Git ignore rules
├── cinematic-site-components/         # Shared component library
│   ├── README.md
│   └── [30 component files]
└── balstudio-cinematic/               # Project 1
    ├── index.html
    ├── styles.css
    ├── script.js
    ├── waves-background.js
    ├── assets/
    ├── vercel.json
    └── README.md
```

## 🎨 Design Philosophy

Each project follows the **Cinematic Sites Pipeline**:

1. **Brand Analysis** — Extract colors, typography, voice
2. **Scene Concepts** — Design scroll-driven hero experiences
3. **Latest Techniques** — Research cutting-edge web trends
4. **Website Build** — Implement with vanilla JS + GSAP
5. **Deploy** — Vercel static hosting

### Design Principles
- **Generous whitespace** — Let content breathe
- **Scroll-driven storytelling** — Reveal content progressively
- **Micro-interactions** — Delight users with subtle animations
- **Performance-first** — Optimize for Core Web Vitals
- **Accessibility** — WCAG 2.2 compliant

## ⚡ Performance

Target metrics (Lighthouse):
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

Optimizations applied:
- Video compression (< 8MB)
- Canvas animations at 60fps
- Lazy loading for images
- Minimal JavaScript bundle
- CSS custom properties for theming
- `prefers-reduced-motion` support

## 🌐 Browser Support

- Chrome 115+ (full support including native scroll-driven animations)
- Safari 26+ (full support)
- Firefox (GSAP fallback for scroll animations)
- Edge 115+ (full support)

## 📄 License

Individual projects: © 2026 respective clients. All rights reserved.

Cinematic components: MIT License (RoboNuggets)

## 🙏 Credits

- **Cinematic Components:** [RoboNuggets](https://robonuggets.com)
- **Pipeline:** Cinematic Sites Skill
- **Fonts:** Google Fonts
- **Icons:** Google Material Symbols

## 📬 Contact

Built by boaheneprinceph3

- GitHub: [@boaheneprinceph3-GhSch](https://github.com/boaheneprinceph3-GhSch)
- Email: boaheneprinceph3@gmail.com

---

**Built with the Cinematic Sites Pipeline** — transforming websites into scroll-driven experiences.
