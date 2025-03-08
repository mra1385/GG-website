// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll event listener for active nav highlighting
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Intersection Observer for subtle fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize Latest News button
function initializeNewsButton() {
    const newsBtn = document.querySelector('.news-toggle-btn');
    const newsPanel = document.querySelector('.news-panel');
    const siteWrapper = document.querySelector('.site-wrapper');
    
    if (newsBtn && newsPanel) {
        newsBtn.addEventListener('click', () => {
            newsPanel.classList.toggle('active');
            siteWrapper.classList.toggle('news-active');
        });
        
        // Close button in news panel
        const closeBtn = newsPanel.querySelector('.close-news-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                newsPanel.classList.remove('active');
                siteWrapper.classList.remove('news-active');
            });
        }
        
        // Close on click outside for mobile
        if (window.innerWidth <= 768) {
            document.addEventListener('click', (e) => {
                if (siteWrapper.classList.contains('news-active') && 
                    !newsPanel.contains(e.target) && 
                    !newsBtn.contains(e.target)) {
                    newsPanel.classList.remove('active');
                    siteWrapper.classList.remove('news-active');
                }
            });
        }
    }
}

// Mobile menu toggle
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const newsBtn = document.querySelector('.news-toggle-btn');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                
                // Hide the news button when menu is open on mobile
                if (window.innerWidth <= 768 && newsBtn) {
                    newsBtn.style.opacity = '0';
                    newsBtn.style.visibility = 'hidden';
                }
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                
                // Show the news button when menu is closed
                if (newsBtn) {
                    newsBtn.style.opacity = '1';
                    newsBtn.style.visibility = 'visible';
                }
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                
                // Show the news button when menu is closed
                if (newsBtn) {
                    newsBtn.style.opacity = '1';
                    newsBtn.style.visibility = 'visible';
                }
            });
        });
    }
}

// Initialize everything on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation and section visibility
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const newsToggleBtn = document.querySelector('.news-toggle-btn');
    const closeNewsBtn = document.querySelector('.close-news-btn');
    const siteWrapper = document.querySelector('.site-wrapper');
    const newsPanel = document.querySelector('.news-panel');
    const scrollIndicators = document.querySelectorAll('.scroll-indicator');
    
    // Initialize the map
    initMap();
    
    // Add index to team members for staggered animation
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.setProperty('--card-index', index);
    });
    
    // Show the first section by default
    if (sections.length > 0) {
        sections[0].classList.add('visible');
    }
    
    // Handle section visibility on scroll with enhanced parallax effect
    let visibilityTicking = false;

    function handleScroll() {
        if (!visibilityTicking) {
            requestAnimationFrame(() => {
                const sections = document.querySelectorAll('.section');
                const scrollPosition = window.pageYOffset;
                
                sections.forEach(section => {
                    if (isElementInViewport(section)) {
                        const sectionTop = section.offsetTop;
                        section.classList.add('visible');
                    } else if (!isElementPartiallyInViewport(section)) {
                        section.classList.remove('visible');
                    }
                });
                
                // Update active navigation link
                updateActiveNavLink();
                visibilityTicking = false;
            });
            visibilityTicking = true;
        }
    }
    
    // Add initial background position data attributes
    sections.forEach(section => {
        if (section.id === 'home') {
            section.dataset.bgPosition = '20%';
        } else if (section.id === 'about') {
            section.dataset.bgPosition = '30%';
        } else if (section.id === 'team') {
            section.dataset.bgPosition = '40%';
        } else {
            section.dataset.bgPosition = 'center';
        }
    });
    
    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                handleScroll();
                scrollTimeout = null;
            }, 10);
        }
    });
    
    // Handle scroll indicators click
    scrollIndicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const parent = this.closest('.section');
            const nextSection = parent.nextElementSibling;
            
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Add special animation class
                targetSection.classList.add('scroll-target');
                
                // Scroll to the section
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Close mobile menu if open
                navLinksContainer.classList.remove('active');
                
                // Remove animation class after transition
                setTimeout(() => {
                    targetSection.classList.remove('scroll-target');
                }, 1000);
            }
        });
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
        });
    }
    
    // News panel toggle
    if (newsToggleBtn) {
        newsToggleBtn.addEventListener('click', function() {
            siteWrapper.classList.add('news-active');
            newsPanel.classList.add('active');
        });
    }
    
    if (closeNewsBtn) {
        closeNewsBtn.addEventListener('click', function() {
            siteWrapper.classList.remove('news-active');
            newsPanel.classList.remove('active');
        });
    }
    
    // Initialize with the current scroll position
    handleScroll();
    
    // Utility functions
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5;
    }
    
    function isElementPartiallyInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top < windowHeight && rect.bottom > 0;
    }
});

// Map initialization
function initMap() {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;

    // Add loading state
    mapContainer.classList.add('loading');

    // Load the map content from the external HTML file
    fetch('map_embedded_v2.html')
        .then(response => response.text())
        .then(html => {
            // Create iframe for the map
            const mapFrame = document.createElement('iframe');
            mapFrame.style.width = '100%';
            mapFrame.style.height = '100%';
            mapFrame.style.border = 'none';
            mapFrame.onload = () => {
                // Remove loading state once map is loaded
                mapContainer.classList.remove('loading');
            };
            
            // Set the HTML content
            mapFrame.srcdoc = html;
            
            // Clear existing content and add the iframe
            mapContainer.innerHTML = '';
            mapContainer.appendChild(mapFrame);
        })
        .catch(error => {
            console.error('Error loading map:', error);
            mapContainer.innerHTML = '<div style="padding: 2rem; text-align: center; color: #666;">Error loading map. Please try again later.</div>';
            mapContainer.classList.remove('loading');
        });
}

// Very subtle parallax effect
let ticking = false;
let lastScrollY = window.scrollY;

function updateParallax() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.15; // Slightly increased for smoother effect
            const yPos = -(lastScrollY * speed);
            section.style.backgroundPosition = `center ${yPos}px`;
            section.style.transform = 'translate3d(0,0,0)'; // Force GPU acceleration
        }
    });
    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

// Optimize scroll event for navbar
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
            navTicking = false;
        });
        navTicking = true;
    }
}, { passive: true });

// Form submission handling
function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    // Show submission feedback
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual AJAX)
    setTimeout(() => {
        form.reset();
        submitButton.textContent = 'Message Sent!';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 3000);
    }, 1500);
}

// Handle mobile overlay clicks
if (window.innerWidth <= 768) {
    siteWrapper.addEventListener('click', (e) => {
        if (siteWrapper.classList.contains('news-active')) {
            newsPanel.classList.remove('active');
            siteWrapper.classList.remove('news-active');
        }
    });
}

// Handle window resize for news panel
window.addEventListener('resize', () => {
    const newsPanel = document.querySelector('.news-panel');
    const siteWrapper = document.querySelector('.site-wrapper');
    
    if (window.innerWidth <= 768 && newsPanel.classList.contains('active')) {
        siteWrapper.style.overflow = 'hidden';
    } else {
        siteWrapper.style.overflow = '';
    }
});

// Optimize active nav link updates
let navUpdateTicking = false;
function updateActiveNavLink() {
    if (!navUpdateTicking) {
        requestAnimationFrame(() => {
            const sections = document.querySelectorAll('.section');
            const navLinks = document.querySelectorAll('.nav-links a');
            let currentSectionId = '';
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
                    currentSectionId = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
            navUpdateTicking = false;
        });
        navUpdateTicking = true;
    }
}

// Add optimized scroll listener
window.addEventListener('scroll', handleScroll, { passive: true }); 