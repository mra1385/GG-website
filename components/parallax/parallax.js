export class Parallax {
    static init() {
        // Add smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'smooth';

        // Handle parallax effect
        const backgroundContainer = document.querySelector('.background-container');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3; // Slower rate for smoother effect
            backgroundContainer.style.transform = `translateY(${rate}px)`;
        });

        // Optimize performance by using requestAnimationFrame
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * 0.3; // Slower rate for smoother effect
                    backgroundContainer.style.transform = `translateY(${rate}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Handle mobile devices
        if (window.innerWidth <= 768) {
            backgroundContainer.style.backgroundAttachment = 'scroll';
            backgroundContainer.style.transform = 'none';
        }

        // Update on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                backgroundContainer.style.backgroundAttachment = 'scroll';
                backgroundContainer.style.transform = 'none';
            } else {
                backgroundContainer.style.backgroundAttachment = 'fixed';
            }
        });
    }
} 