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

        gsap.to(loaderProgress, { width: `${progress}%`, duration: 0.2 });
        loaderPercentage.innerText = `${Math.floor(progress)}%`;

        if (progress === 100) {
            clearInterval(interval);
            finishLoader();
        }
    }, 150);
}

function finishLoader() {
    const tl = gsap.timeline({
        onComplete: () => {
            loader.style.display = 'none';
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
// CURSOR FOLLOWER - ORGANIC & SOFT
// ==========================================
const cursorFollower = document.getElementById('cursor-follower');

if (window.innerWidth > 1024 && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    gsap.to({}, {
        duration: 0.016,
        repeat: -1,
        onRepeat: () => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            gsap.set(cursorFollower, {
                x: cursorX,
                y: cursorY
            });
        }
    });

    // Magnetic and Growing effects
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card, .group/field');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorFollower, {
                scale: 2.5,
                backgroundColor: 'rgba(255,255,255,0.1)',
                duration: 0.6,
                ease: 'power3.out'
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursorFollower, {
                scale: 1,
                backgroundColor: 'transparent',
                duration: 0.6,
                ease: 'power3.out'
            });
        });
    });
}

// ==========================================
// HERO SECTION - SOFT ENTRANCE
// ==========================================
function playHeroEntrance() {
    const heroTl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.8 }
    });

    heroTl
        .from('.hero-content h1 span', {
            y: 100,
            opacity: 0,
            filter: 'blur(20px)',
            scale: 1.1,
            stagger: 0.2,
        })
        .from('.hero-content p', {
            y: 40,
            opacity: 0,
            filter: 'blur(10px)',
        }, "-=1.4")
        .from('.hero-content .flex span', {
            y: 20,
            opacity: 0,
            filter: 'blur(5px)',
            stagger: 0.1,
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

// Background Parallax - Extremely subtle & organic
gsap.to('#hero .bg-white\\/5', {
    y: (i) => (i + 1) * 60,
    x: (i) => Math.sin(i * 1.5) * 40,
    rotate: (i) => i * 15,
    duration: 10,
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
    }
});

// ==========================================
// REVEAL ANIMATIONS FOR SECTIONS
// ==========================================
const sections = document.querySelectorAll('section');

sections.forEach(section => {
    // Section Headers
    const header = section.querySelector('h2');
    if (header) {
        gsap.from(header, {
            y: 60,
            opacity: 0,
            filter: 'blur(15px)',
            scrollTrigger: {
                trigger: header,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // Horizontal Rule/Line animations if any
    const lines = section.querySelectorAll('.border-b, .border-t');
    lines.forEach(line => {
        gsap.from(line, {
            scaleX: 0,
            opacity: 0,
            transformOrigin: "left center",
            duration: 1.5,
            scrollTrigger: {
                trigger: line,
                start: "top 95%",
                toggleActions: "play none none reverse"
            }
        });
    });
});

// ==========================================
// NEW YEAR SECTION - REVEAL
// ==========================================
gsap.from('#new-year .text-7xl', {
    scale: 0.8,
    opacity: 0,
    filter: 'blur(20px)',
    duration: 2,
    scrollTrigger: {
        trigger: '#new-year',
        start: 'top 80%',
    }
});

gsap.from('#new-year p', {
    y: 30,
    opacity: 0,
    filter: 'blur(10px)',
    duration: 1.5,
    delay: 0.5,
    scrollTrigger: {
        trigger: '#new-year',
        start: 'top 80%',
    }
});

// ==========================================
// ABOUT - IMAGE & CONTENT SOFT SLIDE
// ==========================================
gsap.from('.about-image', {
    x: -80,
    opacity: 1,
    filter: 'blur(10px)',
    rotate: -3,
    duration: 1.5,
    scrollTrigger: {
        trigger: '#about',
        start: "top 75%",
    }
});

gsap.from('.about-content p, .about-content a', {
    y: 30,
    opacity: 0,
    filter: 'blur(10px)',
    stagger: 0.15,
    duration: 1.2,
    scrollTrigger: {
        trigger: '.about-content',
        start: "top 80%",
    }
});

// ==========================================
// SKILLS - STAGGERED ORGANIC FLOAT
// ==========================================
gsap.from('.skill-card', {
    y: 60,
    opacity: 0,
    filter: 'blur(10px)',
    scale: 0.9,
    stagger: {
        amount: 0.8,
        from: "center"
    },
    duration: 1.4,
    ease: "power3.out",
    scrollTrigger: {
        trigger: '#skills',
        start: "top 70%",
    }
});

// ==========================================
// PROJECTS - SMOOTH REVEAL & PERSPECTIVE
// ==========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, i) => {
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

    // Image depth effect inside card
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

// ==========================================
// CONTACT - FORM ENTRANCE
// ==========================================
gsap.from('#contact form > div, #contact button', {
    y: 40,
    opacity: 0,
    filter: 'blur(10px)',
    stagger: 0.1,
    duration: 1.2,
    scrollTrigger: {
        trigger: '#contact',
        start: "top 75%",
    }
});

// ==========================================
// SMOOTH SCROLL FOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
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

// Navbar scroll hide/show logic
let lastScroll = 0;
const nav = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll <= 0) {
        nav.classList.remove('nav-hidden');
        return;
    }
    if (currentScroll > lastScroll && !nav.classList.contains('nav-hidden') && currentScroll > 200) {
        nav.classList.add('nav-hidden');
    } else if (currentScroll < lastScroll && nav.classList.contains('nav-hidden')) {
        nav.classList.remove('nav-hidden');
    }
    lastScroll = currentScroll;
});

// ==========================================
// MAGNETIC LINKS & BUTTONS
// ==========================================
const magneticElements = document.querySelectorAll('.magnetic, a.rounded-full, button.rounded-full');

magneticElements.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.4;

        gsap.to(item, {
            x: x,
            y: y,
            duration: 0.4,
            ease: "power2.out"
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileMenuBtn && mobileMenu) {
    const toggleMobileMenu = (open) => {
        if (open) {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
            gsap.fromTo(mobileLinks,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "expo.out", delay: 0.3 }
            );
        } else {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        }
    };

    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', () => toggleMobileMenu(false));

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });
}

// ==========================================
// REFRESH ON LOAD
// ==========================================
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
    console.log("%cMinimalist Portfolio Active", "color: #fff; background: #000; padding: 5px 10px; border-radius: 5px;");
});
