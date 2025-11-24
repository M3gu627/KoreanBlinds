/* ==========================================
   LEI-LO - Premium Korean Blinds Website
   Main JavaScript File - FULLY FIXED & CLEAN
   ========================================== */

function createSakuraPetals() {
    const container = document.getElementById('petals');
    if (!container) return;

    const petalCount = 30;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';

        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 15 + 10) + 's';
        petal.style.animationDelay = Math.random() * 10 + 's';

        container.appendChild(petal);
    }
}

// ==========================================
// Hero Carousel Class - Already Perfect
// ==========================================
class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.carousel-arrow.prev');
        this.nextBtn = document.querySelector('.carousel-arrow.next');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;
        this.isTransitioning = false;

        if (!this.slides.length || !this.dots.length || !this.prevBtn || !this.nextBtn) {
            console.error('Carousel elements not found');
            return;
        }

        this.init();
    }

    init() {
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.previousSlide();
        });

        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.nextSlide();
        });

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSlide(index);
            });
        });

        const carousel = document.querySelector('.hero-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        this.initTouchSupport();
        this.startAutoPlay();
    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex || index < 0 || index >= this.slides.length) return;

        this.isTransitioning = true;

        this.slides[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');

        this.currentIndex = index;

        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');

        setTimeout(() => { this.isTransitioning = false; }, 500);
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.pauseAutoPlay();
        this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    initTouchSupport() {
        const carousel = document.querySelector('.hero-carousel');
        if (!carousel) return;

        let touchStartX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) this.nextSlide();
                else this.previousSlide();
            }
        }, { passive: true });
    }
}

// ==========================================
// Navigation Functions - FIXED MOBILE MENU
// ==========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navLinksContainer = document.getElementById('navLinks');

    if (!navbar || !navLinks.length || !mobileToggle || !navLinksContainer) return;

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 100);
    });

    // Smooth scrolling + active state
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Close mobile menu
            navLinksContainer.classList.remove('mobile-active');
            mobileToggle.classList.remove('active');

            // Smooth scroll
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle with X animation
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav25LinksContainer.classList.toggle('mobile-active');
        mobileToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navLinksContainer.classList.remove('mobile-active');
            mobileToggle.classList.remove('active');
        }
    });
}

// ==========================================
// Scroll Animations & Section Observer (unchanged & perfect)
// ==========================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
}

function initSectionObserver() {
    const sections = document.querySelectorAll('.section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
}

// ==========================================
// Initialize Everything
// ==========================================
let carouselInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('LEI-LO Website Loading...');

    createSakuraPetals();
    carouselInstance = new HeroCarousel();
    initNavigation();
    initScrollAnimations();
    initSectionObserver();

    console.log('LEI-LO Website Initialized Successfully');
});

window.addEventListener('beforeunload', () => {
    if (carouselInstance) carouselInstance.pauseAutoPlay();
});