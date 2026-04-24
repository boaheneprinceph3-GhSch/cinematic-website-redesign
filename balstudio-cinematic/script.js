// ═══════════════════════════════════════════════════════════
// BALSTUDIO CINEMATIC SITE — Enhanced 2026 Edition
// ═══════════════════════════════════════════════════════════

(function() {
    'use strict';
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Register ScrollSmoother if available (premium plugin)
    if (typeof ScrollSmoother !== 'undefined') {
        gsap.registerPlugin(ScrollSmoother);
    }
    
    // ───────────────────────────────────────────────────────
    // 0. SMOOTH SCROLLING (2026 Enhancement - ScrollSmoother)
    // ───────────────────────────────────────────────────────
    
    let smoother;
    
    // Check if ScrollSmoother is available (premium GSAP plugin)
    if (typeof ScrollSmoother !== 'undefined') {
        try {
            smoother = ScrollSmoother.create({
                wrapper: '#smooth-wrapper',
                content: '#smooth-content',
                smooth: 1.5,
                effects: true,
                smoothTouch: 0.1,
                normalizeScroll: true
            });
            console.log('✅ ScrollSmoother enabled');
        } catch (e) {
            console.log('ℹ️ ScrollSmoother not available (premium plugin)');
        }
    } else {
        console.log('ℹ️ ScrollSmoother not available - using native scroll');
    }
    
    // ───────────────────────────────────────────────────────
    // 1. CUSTOM CURSOR (2026 Enhancement)
    // ───────────────────────────────────────────────────────
    
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursor && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let outlineX = 0, outlineY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor follow
        function animateCursor() {
            // Dot follows immediately
            cursorX += (mouseX - cursorX) * 0.3;
            cursorY += (mouseY - cursorY) * 0.3;
            
            // Outline follows with delay
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            
            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .flip-card, .accordion-panel');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
    
    // ───────────────────────────────────────────────────────
    // 2. MAGNETIC BUTTONS (2026 Enhancement)
    // ───────────────────────────────────────────────────────
    
    const magneticElements = document.querySelectorAll('.cta, .nav-cta');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
    
    // ───────────────────────────────────────────────────────
    // 3. TEXT SCRAMBLE EFFECT (2026 Enhancement)
    // ───────────────────────────────────────────────────────
    
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="dud">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    // Apply scramble to section headers on scroll
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    sectionHeaders.forEach(header => {
        const originalText = header.textContent;
        const scrambler = new TextScramble(header);
        
        ScrollTrigger.create({
            trigger: header,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                scrambler.setText(originalText);
            }
        });
    });
    
    // ───────────────────────────────────────────────────────
    // 4. SCROLL-SCRUBBED VIDEO (Enhanced)
    // ───────────────────────────────────────────────────────
    
    const video = document.getElementById('hero-video');
    const hero = document.querySelector('.hero');
    const videoLoading = document.getElementById('video-loading');
    
    if (video && hero) {
        let previousVideoTime = 0;
        let isReady = false;
        
        video.addEventListener('loadedmetadata', function() {
            isReady = true;
            
            if (videoLoading) {
                gsap.to(videoLoading, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        videoLoading.classList.add('hidden');
                    }
                });
            }
            
            console.log('✅ Video ready for scroll-scrubbing (duration:', video.duration.toFixed(2), 'seconds)');
        });
        
        // Optimized scroll-scrubbing
        function animate() {
            if (isReady && video.duration) {
                const rect = hero.getBoundingClientRect();
                const scrollLength = hero.offsetHeight - window.innerHeight;
                const scrolled = Math.min(Math.max(-rect.top, 0), scrollLength);
                const scrollPercent = scrolled / scrollLength;
                
                const currentVideoTime = scrollPercent * video.duration;
                
                if (Math.abs(currentVideoTime - previousVideoTime) > 0.04) {
                    previousVideoTime = currentVideoTime;
                    video.currentTime = currentVideoTime;
                }
                
                // Hide video when past hero section with smooth transition
                if (rect.bottom < 0) {
                    video.style.opacity = '0';
                    video.style.pointerEvents = 'none';
                } else if (rect.bottom < window.innerHeight) {
                    // Fade out as hero section exits viewport
                    const fadeProgress = rect.bottom / window.innerHeight;
                    video.style.opacity = fadeProgress.toString();
                    video.style.transform = `scale(${1 + (1 - fadeProgress) * 0.1})`;
                    video.style.filter = `blur(${(1 - fadeProgress) * 10}px)`;
                } else {
                    video.style.opacity = '1';
                    video.style.transform = 'scale(1)';
                    video.style.filter = 'blur(0px)';
                    video.style.pointerEvents = 'auto';
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        requestAnimationFrame(animate);
    }
    
    // ───────────────────────────────────────────────────────
    // 5. TEXT MASK REVEAL (Enhanced with parallax)
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
        
        // Parallax effect on mask text
        gsap.to('.hero-mask-text, .hero-mask-text-filled', {
            y: 100,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    }
    
    // ───────────────────────────────────────────────────────
    // 6. HERO OVERLAY ANIMATIONS (Enhanced)
    // ───────────────────────────────────────────────────────
    
    const heroTagline = document.querySelector('.hero-tagline');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-overlay .cta');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroMaskOverlay = document.querySelector('.hero-mask-overlay');
    const heroMaskReveal = document.querySelector('.hero-mask-reveal');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    if (hero) {
        // Fade IN with stagger
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
        
        // Fade OUT text mask
        gsap.to([heroMaskOverlay, heroMaskReveal], {
            opacity: 0,
            scrollTrigger: {
                trigger: hero,
                start: '40% top',
                end: '60% top',
                scrub: true
            }
        });
        
        // Hide remaining elements
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
    // 6.5 HERO TO SERVICES TRANSITION (2026 Enhancement)
    // ───────────────────────────────────────────────────────
    
    const servicesSection = document.querySelector('.services');
    
    if (servicesSection && hero) {
        ScrollTrigger.create({
            trigger: hero,
            start: 'bottom bottom',
            end: 'bottom top',
            onEnter: () => {
                servicesSection.classList.add('visible');
            },
            onLeaveBack: () => {
                servicesSection.classList.remove('visible');
            }
        });
    }
    
    // ───────────────────────────────────────────────────────
    // 7. FLIP CARDS (Enhanced with 3D tilt)
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
        
        // 3D tilt effect on hover
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: 'power2.out',
                transformPerspective: 1000
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
    
    // ───────────────────────────────────────────────────────
    // 8. ACCORDION SLIDER (Enhanced transitions)
    // ───────────────────────────────────────────────────────
    
    const accordionPanels = document.querySelectorAll('.accordion-panel');
    
    accordionPanels.forEach(function(panel) {
        panel.addEventListener('click', function() {
            const siblings = panel.parentElement.children;
            for (let i = 0; i < siblings.length; i++) {
                siblings[i].classList.remove('active');
            }
            panel.classList.add('active');
            
            // Animate panel expansion
            gsap.to(panel, {
                flex: 5,
                duration: 0.6,
                ease: 'power2.inOut'
            });
        });
        
        // Parallax on panel background
        gsap.to(panel.querySelector('.panel-bg'), {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
    
    // ───────────────────────────────────────────────────────
    // 9. FADE-UP ANIMATIONS (Enhanced with GSAP)
    // ───────────────────────────────────────────────────────
    
    const fadeUpElements = document.querySelectorAll('.section-header, .about-content, .testimonial-content, .contact-content, .stats');
    
    fadeUpElements.forEach(function(el) {
        gsap.from(el, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true
            }
        });
    });
    
    // ───────────────────────────────────────────────────────
    // 10. STATS COUNTER (Enhanced odometer effect)
    // ───────────────────────────────────────────────────────
    
    const stats = document.querySelectorAll('.stat-num');
    
    stats.forEach(function(stat) {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const num = parseInt(text.replace(/\D/g, ''));
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.from(stat, {
                    textContent: 0,
                    duration: 2.5,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    onUpdate: function() {
                        const current = Math.ceil(stat.textContent);
                        stat.textContent = current + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                    }
                });
                
                // Scale animation
                gsap.from(stat, {
                    scale: 0.5,
                    duration: 1,
                    ease: 'back.out(1.7)'
                });
            }
        });
    });
    
    // ───────────────────────────────────────────────────────
    // 11. PARTICLE BURST EFFECT (2026 Enhancement)
    // ───────────────────────────────────────────────────────
    
    function createParticleBurst(x, y, count = 20) {
        const container = document.createElement('div');
        container.className = 'particle-container';
        document.body.appendChild(container);
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            container.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / count;
            const velocity = 100 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            gsap.to(particle, {
                x: tx,
                y: ty,
                opacity: 0,
                scale: 0,
                duration: 1 + Math.random() * 0.5,
                ease: 'power2.out',
                onComplete: () => particle.remove()
            });
        }
        
        setTimeout(() => container.remove(), 2000);
    }
    
    // ───────────────────────────────────────────────────────
    // 12. SMOOTH SCROLL FOR ANCHOR LINKS
    // ───────────────────────────────────────────────────────
    
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                if (smoother) {
                    smoother.scrollTo(target, true, 'top 80px');
                } else {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ───────────────────────────────────────────────────────
    // 13. FORM SUBMISSION (Enhanced with particle burst)
    // ───────────────────────────────────────────────────────
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const rect = submitBtn.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            // Particle burst
            createParticleBurst(x, y, 30);
            
            // Success animation
            gsap.to(submitBtn, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    alert('Thank you for your message! We will get back to you within 24 hours.');
                    contactForm.reset();
                }
            });
        });
    }
    
    // ───────────────────────────────────────────────────────
    // 14. MOBILE NAV TOGGLE
    // ───────────────────────────────────────────────────────
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.style.display === 'flex';
            
            if (isOpen) {
                gsap.to(navMenu, {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    onComplete: () => {
                        navMenu.style.display = 'none';
                    }
                });
            } else {
                navMenu.style.display = 'flex';
                gsap.from(navMenu, {
                    opacity: 0,
                    y: -20,
                    duration: 0.3
                });
            }
            
            const icon = navToggle.querySelector('.material-symbols-outlined');
            icon.textContent = icon.textContent === 'menu' ? 'close' : 'menu';
        });
    }
    
    // ───────────────────────────────────────────────────────
    // 15. PERFORMANCE — Lazy load images
    // ───────────────────────────────────────────────────────
    
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(function(img) {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
    
    // ───────────────────────────────────────────────────────
    // 16. PARALLAX SECTIONS (2026 Enhancement)
    // ───────────────────────────────────────────────────────
    
    const parallaxSections = document.querySelectorAll('.services, .about, .contact');
    
    parallaxSections.forEach(section => {
        gsap.to(section, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
    
    // ───────────────────────────────────────────────────────
    // 17. CONSOLE SIGNATURE
    // ───────────────────────────────────────────────────────
    
    console.log('%c✨ Balstudio Cinematic Site — 2026 Enhanced Edition', 'font-size: 16px; font-weight: bold; color: #d4af37;');
    console.log('%cBuilt with vanilla JS, GSAP ScrollTrigger, ScrollSmoother, and modern CSS', 'font-size: 12px; color: #8b7355;');
    console.log('%cEnhancements: Custom cursor, magnetic buttons, text scramble, particle effects, smooth scrolling', 'font-size: 11px; color: #666;');
    
})();
