# Balstudio — Cinematic Architecture Site

Award-winning architecture firm website featuring scroll-driven animations, text mask reveals, interactive waves background, and cinematic components.

## 🎬 Features

- **Scroll-scrubbed hero video** — Video playback tied to scroll position
- **Text mask reveal** — Headline fills with gradient as you scroll
- **3D flip card services** — Interactive cards that flip to reveal details
- **Interactive waves background** — Perlin noise-based animated waves with cursor interaction
- **Accordion project slider** — Hover-to-expand project gallery
- **Modern CSS animations** — Native scroll-driven animations with GSAP fallback
- **Fully responsive** — Mobile-first design, works on all devices
- **Accessibility** — Respects `prefers-reduced-motion`, semantic HTML, keyboard navigation

## 🚀 Quick Start

### Local Preview

```bash
# Option 1: Using npx serve
npx serve .

# Option 2: Using Python
python3 -m http.server 8000

# Option 3: Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Deploy to Vercel

```bash
# Install Vercel CLI (one-time)
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Promote to production
vercel --prod
```

**Alternative:** Drag the `balstudio-cinematic` folder onto https://vercel.com/new

## 📁 Project Structure

```
balstudio-cinematic/
├── index.html              # Main HTML file
├── styles.css              # All styles (brand colors, components, responsive)
├── script.js               # Scroll animations, interactions, GSAP
├── waves-background.js     # Interactive waves background (Perlin noise)
├── assets/
│   ├── hero.mp4            # Hero video (from Kling generation)
│   └── README.md           # Assets folder instructions
├── brand-card.html         # Brand analysis preview
├── vercel.json             # Vercel deployment config
└── README.md               # This file
```

## 🎨 Brand Colors

```css
--primary: #1a1a1a       /* Deep charcoal */
--secondary: #f5f5f5     /* Soft white */
--accent-gold: #d4af37   /* Sophisticated gold */
--accent-warm: #8b7355   /* Warm brown */
```

## 🔧 Technologies Used

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, scroll-driven animations
- **Vanilla JavaScript** — No frameworks
- **GSAP 3.12** — ScrollTrigger for cinematic effects
- **Canvas API** — Interactive waves background with Perlin noise
- **Google Fonts** — Cormorant Garamond (display) + Inter (body)
- **Material Symbols** — Icon system

## 📦 Cinematic Components Used

1. **Text Mask Reveal** — Hero headline fills on scroll
2. **3D Flip Cards** — Services section with hover-to-flip interaction
3. **Interactive Waves Background** — Perlin noise animated waves on white sections
4. **Accordion Slider** — Projects gallery with hover-to-expand
5. **Scroll-scrubbed Video** — Hero video tied to scroll position

Components adapted from:
- [RoboNuggets Cinematic Pack](https://github.com/robonuggets/cinematic-site-components)
- Interactive Waves Background (converted from React to vanilla JS)

## ⚡ Performance Optimizations

- Video `preload="metadata"` for faster initial load
- Intersection Observer for scroll reveals (better than scroll listeners)
- `passive: true` on scroll events
- CSS `will-change` on animated elements
- Canvas-based animations using `requestAnimationFrame` (60fps)
- Lazy loading for below-fold images
- `prefers-reduced-motion` support

## 🎯 Browser Support

- Chrome 115+ (full support including native scroll-driven animations)
- Safari 26+ (full support)
- Firefox (GSAP fallback for scroll animations)
- Edge 115+ (full support)

## 📝 Customization

### Change Brand Colors

Edit `:root` variables in `styles.css`:

```css
:root {
    --primary: #your-color;
    --accent-gold: #your-accent;
}
```

### Customize Waves Background

Edit configuration in `waves-background.js`:

```javascript
new WavesBackground(section, {
    lineColor: 'rgba(139, 115, 85, 0.12)',  // Line color
    waveSpeedX: 0.015,                       // Horizontal wave speed
    waveSpeedY: 0.008,                       // Vertical wave speed
    waveAmpX: 28,                            // Horizontal amplitude
    waveAmpY: 14,                            // Vertical amplitude
    xGap: 14,                                // Horizontal line spacing
    yGap: 38,                                // Vertical point spacing
    friction: 0.925,                         // Cursor interaction friction
    tension: 0.005,                          // Return force tension
    maxCursorMove: 100                       // Max cursor displacement
});
```

### Add Waves to New Sections

Simply add the `.waves-bg` class to any section:

```html
<section class="my-section waves-bg">
    <!-- Your content -->
</section>
```

### Replace Hero Video

1. Place your video in `assets/hero.mp4`
2. Recommended specs:
   - Duration: 5-8 seconds
   - Resolution: 1920x1080 (1080p)
   - Format: H.264 codec, MP4 container
   - Size: < 8MB (compress with `ffmpeg -crf 28`)

### Add More Projects

In `index.html`, duplicate an `.accordion-panel` block and update:
- `.panel-bg` background image URL
- `.panel-num` number
- `.panel-h3` project name
- `.panel-desc` description

### Add More Service Cards

In `index.html`, duplicate a `.flip-card` block and update:
- Service icon (Material Symbol name)
- Service number
- Service title and tagline (front)
- Service description (back)

## 🐛 Troubleshooting

**Video not playing on scroll:**
- Check that `hero.mp4` exists in `assets/` folder
- Ensure video has `muted` and `playsinline` attributes
- Try a different browser (some block autoplay)

**Animations not working:**
- Check browser console for GSAP errors
- Ensure GSAP CDN is loading (check Network tab)
- Try disabling browser extensions

**Waves background not showing:**
- Check that `waves-background.js` is loaded
- Ensure section has `.waves-bg` class
- Check browser console for JavaScript errors

**Waves only showing in center:**
- Section needs `width: 100%` to fill viewport
- Content inside should have `max-width` constraint
- Check CSS for proper layout structure

**Icons showing as text (arrow_forward, expand_more):**
- Material Symbols font may not be loading
- Check Network tab for font loading errors
- Ensure using full Material Symbols CDN (not subset)
- Try refreshing the page

**Mobile menu not working:**
- JavaScript may not be loading
- Check `script.js` is linked correctly in HTML

## 🎨 Sections Overview

### Hero Section
- Scroll-scrubbed video background
- Text mask reveal animation ("WHERE VISION MEETS PRECISION")
- Tagline and CTA that fade in after text reveal
- Scroll indicator with bounce animation
- Text mask fades out when tagline appears

### Services Section (with waves background)
- 4 flip cards (Residential, Commercial, Interior, Sustainable)
- Hover to flip and reveal full description
- Interactive waves background responds to cursor
- Material Icons for each service (home, apartment, chair, eco)
- Full-width waves background with centered content

### Projects Section
- 5-panel accordion slider
- Hover to expand project details
- High-quality project images from Unsplash
- Dark background for contrast
- Click to lock panel on mobile

### About Section (with waves background)
- Company overview
- Animated stats counter (12+ years, 150+ projects, etc.)
- Interactive waves background
- Fade-in animation on scroll

### Testimonial Section
- Client quote
- Dark background for emphasis
- Centered layout

### Contact Section (with waves background)
- Contact form with validation
- Contact details with Material Icons
- Interactive waves background
- Grid layout (info + form)
- Responsive mobile layout

### Footer
- Company info and links
- Social media links
- Copyright notice
- Dark background

## 🌊 Interactive Waves Background

The waves background uses Perlin noise to create organic, flowing animations:

**How it works:**
- Vertical lines arranged across the section
- Each line animates using Perlin noise for smooth, natural movement
- Cursor interaction creates ripple effects
- Physics simulation (friction + tension) for fluid feel
- Optimized for 60fps using `requestAnimationFrame`

**Sections with waves:**
- Services (white background)
- About (white background)
- Contact (white background)

**Performance:**
- Canvas-based rendering
- Efficient point calculation
- Smooth cursor tracking with interpolation
- Automatic cleanup on section removal

## 📄 License

This project uses components from RoboNuggets (MIT License).
Brand content © 2026 Balstudio. All rights reserved.

## 🙏 Credits

- **Cinematic Components:** [RoboNuggets](https://robonuggets.com)
- **Interactive Waves:** Converted from React component
- **Images:** Unsplash (royalty-free)
- **Fonts:** Google Fonts
- **Icons:** Google Material Symbols
- **Pipeline:** Cinematic Sites Skill
- **Perlin Noise Implementation:** Based on Ken Perlin's algorithm

## 🚀 Performance Metrics

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
- Responsive images with proper sizing
- Text shadows for better readability on video backgrounds
- Gradient overlays for text contrast

## 🎯 Key Improvements Made

1. **Text Visibility** - Added text shadows and gradient overlays for better readability
2. **Hero Timing** - Text mask fades out when tagline appears (cleaner transition)
3. **Service Cards** - Replaced sticky cards with 3D flip cards (more interactive)
4. **Waves Background** - Added Perlin noise animated waves to white sections
5. **Full-Width Sections** - Fixed waves to fill entire viewport width
6. **Material Icons** - Fixed icon loading (using full font instead of subset)
7. **Responsive Design** - Mobile-optimized flip cards and accordion

---

Built with the **Cinematic Sites Pipeline** — transforming websites into scroll-driven experiences.
