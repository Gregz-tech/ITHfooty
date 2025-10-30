class FinaleManager {
    constructor() {
        this.finaleDate = new Date('2025-11-26T15:00:00').getTime();
        this.galleryItems = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateFinaleCountdown();
        setInterval(() => this.updateFinaleCountdown(), 1000);
        
        // Load gallery items (in real app, this would be from an API)
        this.loadGalleryItems();
    }

    setupEventListeners() {
        // Set reminder button
        document.getElementById('remindMe').addEventListener('click', () => {
            this.setReminder();
        });

        // Share event button
        document.getElementById('shareFinal').addEventListener('click', () => {
            this.shareEvent();
        });

        // Refresh gallery button
        document.getElementById('refreshGallery').addEventListener('click', () => {
            this.refreshGallery();
        });
    }

    updateFinaleCountdown() {
        const now = new Date().getTime();
        const distance = this.finaleDate - now;

        if (distance < 0) {
            this.handleCountdownEnd();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.updateCountdownDisplay(days, hours, minutes, seconds);
    }

    updateCountdownDisplay(days, hours, minutes, seconds) {
        document.getElementById('finaleDays').textContent = this.formatTime(days);
        document.getElementById('finaleHours').textContent = this.formatTime(hours);
        document.getElementById('finaleMinutes').textContent = this.formatTime(minutes);
        document.getElementById('finaleSeconds').textContent = this.formatTime(seconds);
    }

    formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    handleCountdownEnd() {
        const countdownElement = document.getElementById('finaleCountdown');
        if (countdownElement) {
            countdownElement.innerHTML = `
                <div class="countdown-ended">
                    <h3>🎉 The Finale is Here! 🎉</h3>
                    <p>Join us at College Field for the grand finale!</p>
                </div>
            `;
        }
    }

    setReminder() {
        if ('Notification' in window && Notification.permission === 'granted') {
            // Schedule notification for the finale
            this.scheduleNotification();
        } else if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.scheduleNotification();
                }
            });
        }

        // Fallback: Add to calendar
        this.addToCalendar();
        
        // Show confirmation
        this.showNotification('Reminder set! You\'ll be notified before the finale.');
    }

    scheduleNotification() {
        const notificationTime = new Date(this.finaleDate - (60 * 60 * 1000)); // 1 hour before
        
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            // In a real app, you would schedule a push notification here
            console.log('Notification scheduled for:', notificationTime);
        }
    }

    addToCalendar() {
        const eventDetails = {
            title: 'FUHSIITHISA Football Tournament Finale',
            description: 'Grand finale match and awards ceremony',
            location: 'College Field',
            start: new Date('2025-11-26T15:00:00'),
            end: new Date('2025-11-26T18:00:00')
        };

        // Create .ics file for download
        this.createCalendarFile(eventDetails);
    }

    createCalendarFile(event) {
        const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
DTSTART:${this.formatDateForICS(event.start)}
DTEND:${this.formatDateForICS(event.end)}
END:VEVENT
END:VCALENDAR
        `.trim();

        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'FUHSIITHISA-Finale.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    formatDateForICS(date) {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    shareEvent() {
        const shareData = {
            title: 'FUHSIITHISA Football Tournament Finale',
            text: 'Join us for the grand finale of the inter-departmental football tournament!',
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Event shared successfully'))
                .catch(error => console.log('Error sharing:', error));
        } else {
            // Fallback: Copy to clipboard
            this.copyToClipboard(window.location.href);
            this.showNotification('Event link copied to clipboard!');
        }
    }

    copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    loadGalleryItems() {
        // In a real app, this would fetch from an API
        // For now, we'll simulate loading with sample data
        setTimeout(() => {
            this.galleryItems = [
                // Sample gallery items would go here
                // In production, these would be actual images from the event
            ];
            this.renderGallery();
        }, 2000);
    }

    renderGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        
        if (this.galleryItems.length === 0) {
            // Keep the placeholder if no images
            return;
        }

        // In production, this would render actual gallery items
        galleryGrid.innerHTML = this.galleryItems.map(item => `
            <div class="gallery-item">
                <img src="${item.image}" alt="${item.caption}" loading="lazy">
            </div>
        `).join('');
    }

    refreshGallery() {
        this.showNotification('Refreshing gallery...');
        
        // Simulate API call
        setTimeout(() => {
            this.loadGalleryItems();
            this.showNotification('Gallery updated!');
        }, 1500);
    }

    showNotification(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--accent-primary);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Add CSS for toast animations
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(toastStyles);

// Initialize finale manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FinaleManager();
});