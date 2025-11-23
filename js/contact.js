// Contact Form Functionality
class ContactManager {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Contact form submission
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // FAQ accordion
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => this.toggleFAQ(item));
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!this.validateForm(data)) {
            return;
        }

        // Simulate form submission
        this.showLoadingState();
        
        // In a real application, you would send this data to a server
        setTimeout(() => {
            this.showSuccessMessage();
            this.contactForm.reset();
        }, 2000);
    }

    validateForm(data) {
        const { name, email, subject, message } = data;
        
        if (!name.trim()) {
            this.showError('Please enter your full name');
            return false;
        }
        
        if (!email.trim() || !this.isValidEmail(email)) {
            this.showError('Please enter a valid email address');
            return false;
        }
        
        if (!subject) {
            this.showError('Please select a subject');
            return false;
        }
        
        if (!message.trim()) {
            this.showError('Please enter your message');
            return false;
        }
        
        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(message) {
        // Remove any existing error messages
        this.removeExistingMessages();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: #fee2e2;
            border: 1px solid #fecaca;
            color: #dc2626;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
        `;
        errorDiv.textContent = message;
        
        this.contactForm.insertBefore(errorDiv, this.contactForm.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    showLoadingState() {
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            Sending...
        `;
        submitBtn.disabled = true;
        
        // Store original state for reset
        submitBtn.dataset.originalText = originalText;
    }

    showSuccessMessage() {
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        
        // Restore button
        submitBtn.innerHTML = submitBtn.dataset.originalText;
        submitBtn.disabled = false;
        
        // Show success message
        this.removeExistingMessages();
        
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            background: #dcfce7;
            border: 1px solid #bbf7d0;
            color: #16a34a;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
        `;
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Message sent successfully! We'll get back to you soon.
        `;
        
        this.contactForm.insertBefore(successDiv, this.contactForm.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    removeExistingMessages() {
        const existingMessages = this.contactForm.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(msg => msg.remove());
    }

    toggleFAQ(item) {
        // Close all other FAQ items
        this.faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    }
}

// Initialize contact manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
});