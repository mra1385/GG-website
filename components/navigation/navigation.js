// Navigation Module
export const Navigation = {
    init() {
        console.log('Navigation init called');
        // Mobile menu now handled by inline handler - removing JS initialization
        this.initializeScrollSpy();
        this.initializeSmoothScroll();
        this.initializeScrollIndicators();
    },

    // Removed mobile menu initialization to prevent conflicts with inline handler

    // Keep these for compatibility
    loadNavigationComponent() {
        // Mobile menu now handled by inline handler
        console.log('Navigation component loaded - mobile menu handled by inline HTML');
    },

    initializeScrollSpy() {
        let navTicking = false;
        window.addEventListener('scroll', () => {
            if (!navTicking) {
                requestAnimationFrame(() => {
                    const navbar = document.querySelector('.navbar');
                    if (window.scrollY > 50) {
                        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                    } else {
                        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }
                    this.updateActiveNavLink();
                    navTicking = false;
                });
                navTicking = true;
            }
        }, { passive: true });
    },

    updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    },

    initializeSmoothScroll() {
        document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    },

    initializeScrollIndicators() {
        const scrollIndicators = document.querySelectorAll('.scroll-indicator');
        scrollIndicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const currentSection = indicator.closest('.section');
                const nextSection = currentSection.nextElementSibling;
                if (nextSection && nextSection.classList.contains('section')) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}; 