// ==========================================
// PORTFOLIO - ORGANIC ANIMATIONS (GSAP & LENIS)
// ==========================================

// --- CONFIGURATION ---
const ANIM_DURATION = 1.5;
const ANIM_EASE = "expo.out";

// Initialize Lenis Smooth Scroll
let lenis;
if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo easing
        smoothWheel: true,
        wheelMultiplier: 1,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

// GSAP ScrollTrigger Integration
gsap.registerPlugin(ScrollTrigger);

// Update ScrollTrigger on Lenis scroll
if (lenis) lenis.on('scroll', ScrollTrigger.update);

// Sync GSAP ticker with Lenis
gsap.ticker.add((time) => {
    if (lenis) lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ==========================================
// READING PROGRESS BAR
// ==========================================
const progressBar = document.createElement('div');
progressBar.id = 'reading-progress';
progressBar.className = 'fixed top-0 left-0 h-1 bg-white z-[60] transition-all duration-300 pointer-events-none';
progressBar.style.width = '0%';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
});

// ==========================================
// DATE & TIME DISPLAY
// ==========================================
function updateDateTime() {
    const timeEl = document.getElementById('nav-time');
    const dateEl = document.getElementById('nav-date');
    if (!timeEl || !dateEl) return;

    const now = new Date();
    const lang = localStorage.getItem('portfolio_language') || 'fr';

    // Time
    timeEl.innerText = now.toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // Date
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    dateEl.innerText = now.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', options).toUpperCase();
}

setInterval(updateDateTime, 1000);
updateDateTime();

// ==========================================
// SECTION SIDEBAR & SCROLL TRACKING
// ==========================================
const sectionSidebar = document.getElementById('section-sidebar');
const sidebarProgress = document.getElementById('sidebar-progress');
const currentSectionLabel = document.getElementById('current-section-name');

function updateSectionSidebar() {
    const sections = ['hero', 'new-year', 'about', 'skills', 'projects', 'contact'];
    let current = 'hero';

    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
                current = id;
            }
        }
    });

    if (currentSectionLabel) {
        const lang = localStorage.getItem('portfolio_language') || 'fr';
        const translatedName = translations[lang][`sections.${current}`];
        currentSectionLabel.innerText = translatedName || current.replace('-', ' ').toUpperCase();
    }

    // Toggle sidebar visibility
    if (window.scrollY > 300) {
        if (sectionSidebar) sectionSidebar.classList.add('visible');
    } else {
        if (sectionSidebar) sectionSidebar.classList.remove('visible');
    }

    // Update sidebar progress bar
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (sidebarProgress) {
        sidebarProgress.style.height = `${scrollPercent}%`;
    }
}

window.addEventListener('scroll', updateSectionSidebar);
updateSectionSidebar();

// ==========================================
// PRELOADER - MINIMALIST
// ==========================================
const loader = document.getElementById('loader');
const loaderText = document.querySelector('.loader-text');
const loaderProgress = document.querySelector('.loader-progress');
const loaderPercentage = document.querySelector('.loader-percentage');

function initLoader() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;

        if (loaderProgress) gsap.to(loaderProgress, { width: `${progress}%`, duration: 0.2 });
        if (loaderPercentage) loaderPercentage.innerText = `${Math.floor(progress)}%`;

        if (progress === 100) {
            clearInterval(interval);
            finishLoader();
        }
    }, 150);
}

function finishLoader() {
    const tl = gsap.timeline({
        onComplete: () => {
            if (loader) loader.style.display = 'none';
            playHeroEntrance();
        }
    });

    tl.to(loaderText, {
        y: 0,
        duration: 1,
        ease: "expo.out"
    })
        .to(loaderText, {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: "expo.in",
            delay: 0.5
        })
        .to(loader, {
            y: '-100%',
            duration: 1.2,
            ease: "expo.inOut"
        }, "-=0.2");
}

// Start loader on page load
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initLoader();
} else {
    window.addEventListener('DOMContentLoaded', initLoader);
}

// ==========================================
// TEXT REVEAL & SPLITTING ANIMATIONS
// ==========================================
window.initTextAnimations = function (target = null) {
    const splitTargets = target ? [target] : document.querySelectorAll('.reveal-text');

    splitTargets.forEach(el => {
        // Stop any existing animation on these spans if re-called
        const existingSpans = el.querySelectorAll('.char');
        if (existingSpans.length > 0) {
            gsap.killTweensOf(existingSpans);
        }

        const text = el.innerText;
        el.innerHTML = text.split('').map(char =>
            `<span class="char inline-block translate-y-[110%] opacity-0 transition-transform duration-100">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');

        gsap.to(el.querySelectorAll('.char'), {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// ==========================================
// CONTINUOUS FLOATING ANIMATIONS
// ==========================================
function initFloatingAnimations() {
    if (window.innerWidth < 1024) return; // Disable on mobile
    const floaters = document.querySelectorAll('.skill-card');

    floaters.forEach((el, i) => {
        gsap.to(el, {
            y: "random(-5, 5)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2
        });
    });
}

// ==========================================
// HERO SECTION - SOFT ENTRANCE
// ==========================================
function playHeroEntrance() {
    if (window.initTextAnimations) window.initTextAnimations();
    initFloatingAnimations();

    const heroTl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.8 }
    });

    heroTl
        .from('.hero-content p', {
            y: 40,
            opacity: 0,
            filter: 'blur(10px)',
            scale: 0.9
        }, "-=1.4")
        .from('.hero-content .flex span', {
            y: 20,
            opacity: 0,
            filter: 'blur(5px)',
            stagger: {
                amount: 0.5,
                from: "random"
            },
            duration: 1.2
        }, "-=1.2")
        .from('.hero-content .flex a', {
            y: 30,
            opacity: 0,
            filter: 'blur(10px)',
            stagger: 0.15,
            duration: 1.4
        }, "-=1")
        .from('#navbar > div', {
            y: -50,
            opacity: 0,
            filter: 'blur(10px)',
            duration: 1.5,
            ease: "expo.out"
        }, "-=1.5");
}

// ==========================================
// SCROLL & ENTRANCE ANIMATIONS
// ==========================================
let mm = gsap.matchMedia();

// DESKTOP ANIMATIONS (Complex & 3D)
mm.add("(min-width: 1024px)", () => {
    // Parallax background blobs
    gsap.to('#hero .bg-white\\/5, section .bg-white\\/5', {
        y: -100,
        x: 50,
        scrollTrigger: {
            trigger: "section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
        }
    });

    // About image parallax
    gsap.from('.about-image', {
        x: -80,
        opacity: 0,
        filter: 'blur(10px)',
        rotate: -3,
        duration: 1.5,
        scrollTrigger: {
            trigger: '#about',
            start: "top 75%",
        }
    });

    // 3D Reveal for Project Cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
        gsap.from(card, {
            y: 100,
            opacity: 0,
            filter: 'blur(20px)',
            scale: 0.95,
            rotateX: -10,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        const img = card.querySelector('img');
        if (img) {
            gsap.to(img, {
                y: -50,
                scale: 1.1,
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });
        }
    });

    // Skill cards stagger
    gsap.from('.skill-card', {
        y: 60,
        opacity: 0,
        filter: 'blur(10px)',
        scale: 0.9,
        stagger: 0.1,
        duration: 1.2,
        scrollTrigger: {
            trigger: '#skills',
            start: "top 70%",
        }
    });
});

// MOBILE ANIMATIONS (Light & Simple)
mm.add("(max-width: 1023px)", () => {
    // Skill cards simple fade
    gsap.from('.skill-card', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.05,
        scrollTrigger: {
            trigger: '#skills',
            start: "top 85%",
        }
    });

    // Project cards simple fade per card
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 1,
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
            }
        });
    });

    // About content simple fade
    gsap.from('.about-content', {
        opacity: 0,
        y: 20,
        duration: 1,
        scrollTrigger: {
            trigger: '#about',
            start: "top 85%",
        }
    });
});

// Smooth Scroll for links (excluding project modals)
document.querySelectorAll('a[href^="#"]:not(.project-discover)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            if (lenis) {
                lenis.scrollTo(target, {
                    offset: 0,
                    duration: 2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
            } else {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Navbar hide/show
let lastScroll = 0;
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (nav) {
        if (currentScroll <= 0) {
            nav.classList.remove('nav-hidden');
            return;
        }
        if (currentScroll > lastScroll && !nav.classList.contains('nav-hidden') && currentScroll > 200) {
            nav.classList.add('nav-hidden');
        } else if (currentScroll < lastScroll && nav.classList.contains('nav-hidden')) {
            nav.classList.remove('nav-hidden');
        }
    }
    lastScroll = currentScroll;
});

// Magnetic Elements
const magneticElements = document.querySelectorAll('.magnetic, a.rounded-full, button.rounded-full');
magneticElements.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
        gsap.to(item, { x: x, y: y, duration: 0.4, ease: "power2.out" });
    });
    item.addEventListener('mouseleave', () => {
        gsap.to(item, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
    });
});

// 3D Tilt
const skillCards = document.querySelectorAll('.skill-card');
const projectCards_tilt = document.querySelectorAll('.project-card');

const applyTilt = (elements, intensity, scale) => {
    if (window.innerWidth < 1024) return; // Disable on mobile
    elements.forEach(el => {

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / intensity;
            const rotateY = (centerX - x) / intensity;

            gsap.to(el, {
                rotateX,
                rotateY,
                scale: scale,
                duration: 0.6,
                ease: "power2.out",
                transformPerspective: 1000
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    });
};

applyTilt(skillCards, 20, 1.05);  // More reactive for small cards
applyTilt(projectCards_tilt, 40, 1.02); // More subtle for large project cards

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileMenuBtn && mobileMenu) {
    const toggleMobileMenu = (open) => {
        if (open) {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
            gsap.fromTo(mobileLinks, { x: 50, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "expo.out", delay: 0.3 });
        } else {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        }
    };
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', () => toggleMobileMenu(false));
    mobileLinks.forEach(link => link.addEventListener('click', () => toggleMobileMenu(false)));
}

// ==========================================
// PROJECT MODAL LOGIC
// ==========================================
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');
    const backdrop = modal?.querySelector('.modal-backdrop');

    if (!modal) return;

    const openModal = (projectId, cardData) => {
        const lang = localStorage.getItem('portfolio_language') || 'fr';
        const t = translations[lang];

        if (!t) return;

        // Inject Content
        try {
            const titleEl = document.getElementById('modal-title');
            const taglineEl = document.getElementById('modal-tagline');
            const descEl = document.getElementById('modal-desc');
            const durationEl = document.getElementById('modal-duration');
            const imgEl = document.getElementById('modal-img');
            const techContainer = document.getElementById('modal-tech');

            if (titleEl) titleEl.innerText = t[`projects.${projectId}.title`] || '';
            if (taglineEl) taglineEl.innerText = t[`projects.${projectId}.tagline`] || '';
            if (descEl) descEl.innerHTML = t[`projects.details.${projectId}`] || '';
            if (durationEl) durationEl.innerText = t[`projects.duration.${projectId}`] || '';
            if (imgEl) imgEl.src = cardData.img;

            if (techContainer) {
                const getTechClass = (name) => {
                    const tech = name.toLowerCase();
                    if (tech.includes('react')) return 'tag-react';
                    if (tech.includes('next')) return 'tag-next';
                    if (tech.includes('spring')) return 'tag-spring';
                    if (tech.includes('airflow')) return 'tag-airflow';
                    if (tech.includes('docker')) return 'tag-docker';
                    if (tech.includes('python')) return 'tag-python';
                    if (tech.includes('java')) return 'tag-java';
                    if (tech.includes('typescript')) return 'tag-ts';
                    if (tech.includes('javascript')) return 'tag-js';
                    return '';
                };

                techContainer.innerHTML = cardData.techs.map(t =>
                    `<span class="tech-tag tech-tag-sm ${getTechClass(t)}">${t}</span>`
                ).join('');
            }

            // Show Modal
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            if (lenis) lenis.stop();

            // Animate elements inside
            gsap.from('.modal-container > div > *', {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "expo.out",
                delay: 0.3
            });
        } catch (err) {
            console.error("Modal Content Injection Error:", err);
        }
    };

    const closeModal = () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
    };

    // Use Event Delegation for discover buttons (Highly reliable)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.project-discover');
        if (!btn) return;

        console.log("Discover button clicked through delegation");

        const card = btn.closest('.project-card');
        if (card) {
            const projectId = card.getAttribute('data-project');
            if (!projectId) return;

            const cardData = {
                img: card.querySelector('img') ? card.querySelector('img').src : '',
                techs: Array.from(card.querySelectorAll('.flex.flex-wrap span')).map(s => s.innerText)
            };
            openModal(projectId, cardData);
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Initialize when ready
if (document.readyState === 'complete') {
    initProjectModal();
} else {
    window.addEventListener('load', initProjectModal);
}

window.addEventListener('load', () => {
    ScrollTrigger.refresh();
    console.log("%cMinimalist Portfolio Active", "color: #fff; background: #000; padding: 5px 10px; border-radius: 5px;");
});
