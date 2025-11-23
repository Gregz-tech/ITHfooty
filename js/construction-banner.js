class ConstructionBanner {
    constructor() {
        this.banner = document.getElementById('constructionBanner');
        this.closeButton = document.getElementById('bannerClose');
        this.contactButton = document.getElementById('contactDevelopers');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showBanner();
    }

    setupEventListeners() {
        // Close banner - redirect to index.html
        this.closeButton.addEventListener('click', () => {
            this.redirectToHome();
        });

        // Contact developers
        this.contactButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.contactDevelopers();
        });

        // Close on escape key - redirect to home
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.redirectToHome();
            }
        });

        // Prevent clicks on banner from closing it
        this.banner.addEventListener('click', (e) => {
            if (e.target === this.banner) {
                e.stopPropagation();
            }
        });
    }

    showBanner() {
        this.banner.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        setTimeout(() => {
            this.banner.style.opacity = '1';
        }, 10);
    }

    redirectToHome() {
        // Add fade out animation before redirecting
        this.banner.style.opacity = '0';
        
        setTimeout(() => {
            // Redirect to index.html
            window.location.href = 'index.html';
        }, 300);
    }

    contactDevelopers() {
        // You can customize this to open a contact form, email, or redirect
        const email = 'developers@fuhsiithisa.com';
        const subject = 'Page Construction Inquiry - FUHSIITHISA Finale';
        const body = `Hello Developers,\n\nI noticed the Finale page is under construction. I'd like to know more about:\n\n1. When will this page be available?\n2. Can I get updates about the finale?\n3. Other questions...\n\nThank you!`;
        
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Try to open email client
        window.open(mailtoLink, '_blank');
        
        // Show notification
        this.showNotification('Opening email client... Please check your default email application.');
    }

    showNotification(message) {
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: rgba(255, 165, 0, 0.9);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 25px rgba(255, 165, 0, 0.4);
            font-weight: 500;
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 4000);
    }
}

// Initialize the banner when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ConstructionBanner();
});