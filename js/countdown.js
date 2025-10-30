class CountdownTimer {
    constructor() {
        this.finaleDate = new Date('2025-11-26T10:00:00').getTime();
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        this.init();
    }

    init() {
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
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

        this.updateDisplay(days, hours, minutes, seconds);
    }

    updateDisplay(days, hours, minutes, seconds) {
        if (this.elements.days) this.elements.days.textContent = this.formatTime(days);
        if (this.elements.hours) this.elements.hours.textContent = this.formatTime(hours);
        if (this.elements.minutes) this.elements.minutes.textContent = this.formatTime(minutes);
        if (this.elements.seconds) this.elements.seconds.textContent = this.formatTime(seconds);
    }

    formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    handleCountdownEnd() {
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = `
                <div class="countdown-ended">
                    <h3>🎉 The Tournament Has Started! 🎉</h3>
                    <p>Follow the action live!</p>
                    <a href="fixtures.html" class="btn btn-primary">View Live Scores</a>
                </div>
            `;
        }
    }
}

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer();
});