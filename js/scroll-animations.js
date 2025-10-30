class ScrollAnimations {
    constructor() {
        this.sections = document.querySelectorAll('.section-hidden');
        this.init();
    }

    init() {
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe each section
        this.sections.forEach(section => {
            observer.observe(section);
        });

        // Add scroll event for additional effects
        this.handleScroll();
    }

    handleScroll() {
        let lastScrollY = window.scrollY;
        
        const updateScroll = () => {
            const scrollY = window.scrollY;
            
            // Add parallax effect to hero section
            const hero = document.querySelector('.hero');
            if (hero) {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }

            // Add navbar background on scroll
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (scrollY > 100) {
                    navbar.style.background = 'var(--bg-primary)';
                    navbar.style.backdropFilter = 'blur(10px)';
                } else {
                    navbar.style.background = 'var(--bg-primary)';
                    navbar.style.backdropFilter = 'none';
                }
            }

            lastScrollY = scrollY;
            requestAnimationFrame(updateScroll);
        };

        updateScroll();
    }
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});