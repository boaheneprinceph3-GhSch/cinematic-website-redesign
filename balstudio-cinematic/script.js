// ═══════════════════════════════════════════════════════════
// BALSTUDIO CINEMATIC SITE — Main JavaScript
// ═══════════════════════════════════════════════════════════

(function() {
    'use strict';
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // ───────────────────────────────────────────────────────
    // 1. MUX VIDEO SETUP WITH HLS.JS
    // ───────────────────────────────────────────────────────
    
    const video = document.getElementById('hero-video');
    const hero = document.querySelector('.hero');
    const MUX_PLAYBACK_ID = 'L77fJqd4MVHPZexaitIAtdULZVBtm6mIrbwKb2kDTqks';
    const MUX_VIDEO_URL = `https://stream.mux.com/${MUX_PLAYBACK_ID}.m3u8`;
    
    if (video && hero) {
        // Check if HLS is supported natively (Safari)
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = MUX_VIDEO_URL;
            setupScrollScrubbing();
        }
        // Use HLS.js for other browsers
        else if (Hls.isSupported()) {
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: false,
                backBufferLength: 90
            });
            
            hls.loadSource(MUX_VIDEO_URL);
            hls.attachMedia(video);
            
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                console.log('✅ Mux video loaded successfully');
                setupScrollScrubbing();
            });
            
            hls.on(Hls.Events.ERROR, function(event, data) {
                if (data.fatal) {
                    console.error('❌ Mux video error:', data);
                }
            });
        }
        // Fallback for browsers that don't support HLS
        else {
            console.warn('⚠️ HLS not supported, video may not play');
            video.src = MUX_VIDEO_URL;
            setupScrollScrubbing();
        }
    }
    
    // ───────────────────────────────────────────────────────
    // 2. SCROLL-SCRUBBED VIDEO FUNCTION
    // ───────────────────────────────────────────────────────
    
    function setupScrollScrubbing() {
        video.addEventListener('loadedmetadata', function() {
            const scrollLength = () => hero.offsetHeight - window.innerHeight;
            
            window.addEventListener('scroll', function() {
                const rect = hero.getBoundingClientRect();
                const scrolled = Math.min(Math.max(-rect.top, 0), scrollLength());
                const progress = scrolled / scrollLength();
                
                if (!isNaN(video.duration)) {
                    video.currentTime = progress * video.duration;
                }
            }, { passive: true });
            
            console.log('✅ Scroll-scrubbing enabled (video duration:', video.duration.toFixed(2), 'seconds)');
        });
    }
    
    // ───────────────────────────────────────────────────────
    // 2. TEXT MASK REVEAL (GSAP ScrollTrigger)
    // ───────────────────────────────────────────────────────
    
    const maskReveal = document.querySelector('.hero-mask-reveal');
    
    if (maskReveal && hero) {
        gsap.to(maskReveal, {
            clipPath: 'inset(0% 0 0 0)',
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: '50% bottom',
                scrub: 0.3,
                pin: false
            }
        });
    }
    
    // ───────────────────────────────────────────────────────
    // 3. HERO OVERLAY FADE-IN (after text reveal)
    // ───────────────────────────────────────────────────────
    
    const heroTagline = document.querySelector('.hero-tagline');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-overlay .cta');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroMaskOverlay = document.querySelector('.hero-mask-overlay');
    const heroMaskReveal = document.querySelector('.hero-mask-reveal');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    if (hero) {
        // Fade IN tagline, subtitle, CTA
        gsap.to([heroTagline, heroSubtitle, heroCta, scrollIndicator], {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            scrollTrigger: {
                trigger: hero,
                start: '40% top',
                end: '60% top',
                scrub: true
            }
        });
        
        // Fade OUT text mask when tagline appears
        gsap.to([heroMaskOverlay, heroMaskReveal], {
            opacity: 0,
            scrollTrigger: {
                trigger: hero,
                start: '40% top',
                end: '60% top',
                scrub: true
            }
        });
        
        // Hide remaining hero elements when leaving hero section
        gsap.to([heroOverlay, scrollIndicator], {
            opacity: 0,
            scrollTrigger: {
                trigger: hero,
                start: '70% top',
                end: '95% top',
                scrub: true
            }
        });
    }
    
    // ───────────────────────────────────────────────────────
    // 4. FLIP CARDS — Mobile tap support
    // ───────────────────────────────────────────────────────
    
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(function(card) {
        // Fade in on scroll
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true
            }
        });
    });
    
    // ───────────────────────────────────────────────────────
    // 5. ACCORDION SLIDER — Click to lock panel
    // ───────────────────────────────────────────────────────
    
    const accordionPanels = document.querySelectorAll('.accordion-panel');
    
    accordionPanels.forEach(function(panel) {
        panel.addEventListener('click', function() {
            // Remove active from all siblings
            const siblings = panel.parentElement.children;
            for (let i = 0; i < siblings.length; i++) {
                siblings[i].classList.remove('active');
            }
            // Add active to clicked panel
            panel.classList.add('active');
        });
    });
    
    // ───────────────────────────────────────────────────────
    // 6. FADE-UP ANIMATIONS (Intersection Observer)
    // ───────────────────────────────────────────────────────
    
    const fadeUpElements = document.querySelectorAll('.section-header, .about-content, .testimonial-content, .contact-content, .stats');
    
    const fadeUpObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
                fadeUpObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    
    fadeUpElements.forEach(function(el) {
        gsap.set(el, { opacity: 0, y: 30 });
        fadeUpObserver.observe(el);
    });
    
    // ───────────────────────────────────────────────────────
    // 7. SMOOTH SCROLL FOR ANCHOR LINKS
    // ───────────────────────────────────────────────────────
    
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ───────────────────────────────────────────────────────
    // 8. FORM SUBMISSION (prevent default for demo)
    // ───────────────────────────────────────────────────────
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you within 24 hours.');
            contactForm.reset();
        });
    }
    
    // ───────────────────────────────────────────────────────
    // 9. MOBILE NAV TOGGLE (basic implementation)
    // ───────────────────────────────────────────────────────
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            
            // Toggle icon
            const icon = navToggle.querySelector('.material-symbols-outlined');
            icon.textContent = icon.textContent === 'menu' ? 'close' : 'menu';
        });
    }
    
    // ───────────────────────────────────────────────────────
    // 10. PERFORMANCE — Lazy load images below fold
    // ───────────────────────────────────────────────────────
    
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(function(img) {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // ───────────────────────────────────────────────────────
    // 11. STATS COUNTER ANIMATION
    // ───────────────────────────────────────────────────────
    
    const stats = document.querySelectorAll('.stat-num');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const num = parseInt(text.replace(/\D/g, ''));
                
                gsap.from(target, {
                    textContent: 0,
                    duration: 2,
                    ease: 'power1.out',
                    snap: { textContent: 1 },
                    onUpdate: function() {
                        const current = Math.ceil(target.textContent);
                        target.textContent = current + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                    }
                });
                
                statsObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    stats.forEach(function(stat) {
        statsObserver.observe(stat);
    });
    
    // ───────────────────────────────────────────────────────
    // 12. CONSOLE SIGNATURE
    // ───────────────────────────────────────────────────────
    
    console.log('%c✨ Balstudio Cinematic Site', 'font-size: 16px; font-weight: bold; color: #d4af37;');
    console.log('%cBuilt with vanilla JS, GSAP, and modern CSS', 'font-size: 12px; color: #8b7355;');
    console.log('%cVideo powered by Mux (adaptive streaming)', 'font-size: 12px; color: #5a5a5e;');
    
})();
