class NewsManager {
    constructor() {
        this.articles = [];
        this.filteredArticles = [];
        this.currentCategory = 'all';
        this.currentSearch = '';
        this.currentPage = 1;
        this.articlesPerPage = 6;
        this.init();
    }

    init() {
        this.loadNewsData();
        this.setupEventListeners();
        this.updateNewsStats();
    }

    async loadNewsData() {
        this.showLoading();
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Sample news data
        this.articles = [
            {
                id: 1,
                title: 'Tournament Kickoff: Exciting Matches Ahead',
                excerpt: 'The FUHSIITHISA Football Tournament officially begins with thrilling opening matches that set the tone for an exciting competition.',
                content: 'Full article content would go here...',
                category: 'announcements',
                image: 'images/news/tournament-kickoff.jpg',
                date: '2025-11-20',
                views: 245,
                readTime: '3 min read',
                author: 'Tournament Committee',
                featured: true
            },
            {
                id: 2,
                title: '100 Level Stuns 200 Level in Opening Match',
                excerpt: 'David Johnson scores twice as 100 Level secures a surprising 2-1 victory over favorites 200 Level.',
                content: 'Full match report content would go here...',
                category: 'matches',
                image: 'images/news/100l-vs-200l.jpg',
                date: '2025-11-21',
                views: 189,
                readTime: '4 min read',
                author: 'Sports Reporter',
                featured: false
            },
            {
                id: 3,
                title: 'Sarah Mohammed Completes Transfer to 300 Level',
                excerpt: 'Star midfielder Sarah Mohammed makes shock move to 300 Level in record-breaking transfer deal.',
                content: 'Full transfer news content would go here...',
                category: 'transfers',
                image: 'images/news/sarah-transfer.jpg',
                date: '2025-11-22',
                views: 312,
                readTime: '2 min read',
                author: 'Transfer Analyst',
                featured: false
            },
            {
                id: 4,
                title: 'Week 1 Highlights: Top Goals and Saves',
                excerpt: 'Relive the best moments from the first week of matches, including spectacular goals and incredible saves.',
                content: 'Full highlights content would go here...',
                category: 'highlights',
                image: 'images/news/week1-highlights.jpg',
                date: '2025-11-23',
                views: 167,
                readTime: '5 min read',
                author: 'Highlights Team',
                featured: false
            },
            {
                id: 5,
                title: 'New Rule Changes for Quarter-Finals',
                excerpt: 'Important updates to tournament rules and regulations ahead of the knockout stages.',
                content: 'Full rules content would go here...',
                category: 'announcements',
                image: 'images/news/rule-changes.jpg',
                date: '2025-11-24',
                views: 98,
                readTime: '2 min read',
                author: 'Tournament Committee',
                featured: false
            },
            {
                id: 6,
                title: 'Mike Chen Sets New Save Record',
                excerpt: '100 Level goalkeeper Mike Chen makes 8 incredible saves in single match, setting new tournament record.',
                content: 'Full record content would go here...',
                category: 'highlights',
                image: 'images/news/save-record.jpg',
                date: '2025-11-25',
                views: 201,
                readTime: '3 min read',
                author: 'Sports Analyst',
                featured: false
            },
            {
                id: 7,
                title: 'Semi-Final Draw Results Announced',
                excerpt: 'The matchups for the semi-final round have been determined. See who faces who in the next stage.',
                content: 'Full draw content would go here...',
                category: 'announcements',
                image: 'images/news/semi-final-draw.jpg',
                date: '2025-11-26',
                views: 156,
                readTime: '2 min read',
                author: 'Tournament Committee',
                featured: false
            },
            {
                id: 8,
                title: 'Player of the Week: Grace Okafor',
                excerpt: '400 Level forward Grace Okafor wins Player of the Week after scoring hat-trick in crucial match.',
                content: 'Full player feature content would go here...',
                category: 'highlights',
                image: 'images/news/player-of-week.jpg',
                date: '2025-11-27',
                views: 178,
                readTime: '4 min read',
                author: 'Player Features',
                featured: false
            }
        ];

        this.filterArticles();
        this.renderFeaturedArticle();
        this.renderNewsGrid();
        this.hideLoading();
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.news-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target.dataset.category);
            });
        });

        // Search input
        document.getElementById('newsSearch').addEventListener('input', (e) => {
            this.currentSearch = e.target.value.toLowerCase();
            this.filterArticles();
            this.renderNewsGrid();
        });

        // Clear search
        document.getElementById('clearNewsSearch').addEventListener('click', () => {
            document.getElementById('newsSearch').value = '';
            this.currentSearch = '';
            this.filterArticles();
            this.renderNewsGrid();
        });

        // Refresh news
        document.getElementById('refreshNews').addEventListener('click', () => {
            this.refreshNews();
        });

        // Subscribe to newsletter
        document.getElementById('subscribeNews').addEventListener('click', () => {
            this.showSubscriptionModal();
        });

        // Load more articles
        document.getElementById('loadMoreNews').addEventListener('click', () => {
            this.loadMoreArticles();
        });

        // Newsletter form
        document.getElementById('newsletterForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSubscription();
        });
    }

    setActiveFilter(category) {
        this.currentCategory = category;
        this.currentPage = 1;
        
        // Update active button
        document.querySelectorAll('.news-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        this.filterArticles();
        this.renderNewsGrid();
    }

    filterArticles() {
        let filtered = this.articles;

        // Filter by category
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(article => article.category === this.currentCategory);
        }

        // Filter by search query
        if (this.currentSearch) {
            filtered = filtered.filter(article => 
                article.title.toLowerCase().includes(this.currentSearch) ||
                article.excerpt.toLowerCase().includes(this.currentSearch) ||
                article.author.toLowerCase().includes(this.currentSearch)
            );
        }

        this.filteredArticles = filtered;
    }

    renderFeaturedArticle() {
        const featuredArticle = this.articles.find(article => article.featured) || this.articles[0];
        const container = document.getElementById('featuredArticle');

        if (!featuredArticle) return;

        const articleDate = new Date(featuredArticle.date);
        const formattedDate = articleDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        container.innerHTML = `
            <div class="featured-article">
                <div class="featured-article-image">
                    ${featuredArticle.image ? 
                        `<img src="${featuredArticle.image}" alt="${featuredArticle.title}">` :
                        `<div class="placeholder">
                            <i class="fas fa-newspaper"></i>
                        </div>`
                    }
                    <div class="featured-article-badge">Featured</div>
                </div>
                <div class="featured-article-content">
                    <div class="featured-article-meta">
                        <div class="article-date">
                            <i class="fas fa-calendar-alt"></i>
                            ${formattedDate}
                        </div>
                        <div class="article-category">${this.formatCategory(featuredArticle.category)}</div>
                        <div class="article-views">
                            <i class="fas fa-eye"></i>
                            ${featuredArticle.views} views
                        </div>
                    </div>
                    <h1 class="featured-article-title">${featuredArticle.title}</h1>
                    <p class="featured-article-excerpt">${featuredArticle.excerpt}</p>
                    <div class="featured-article-actions">
                        <button class="btn btn-primary" onclick="newsManager.readArticle(${featuredArticle.id})">
                            <i class="fas fa-book-open"></i>
                            Read Full Article
                        </button>
                        <button class="btn btn-outline" onclick="newsManager.shareArticle(${featuredArticle.id})">
                            <i class="fas fa-share-alt"></i>
                            Share
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderNewsGrid() {
        const container = document.getElementById('newsGrid');
        const startIndex = (this.currentPage - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const articlesToShow = this.filteredArticles.slice(0, endIndex);

        if (articlesToShow.length === 0) {
            container.innerHTML = `
                <div class="no-articles">
                    <i class="fas fa-newspaper"></i>
                    <h3>No articles found</h3>
                    <p>Try adjusting your filters or search terms.</p>
                </div>
            `;
            document.getElementById('loadMoreNews').style.display = 'none';
            return;
        }

        container.innerHTML = articlesToShow
            .filter(article => !article.featured) // Exclude featured article from grid
            .map(article => this.createArticleCard(article))
            .join('');

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('loadMoreNews');
        if (endIndex >= this.filteredArticles.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    createArticleCard(article) {
        const articleDate = new Date(article.date);
        const formattedDate = articleDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        return `
            <div class="news-article-card">
                <div class="article-image">
                    ${article.image ? 
                        `<img src="${article.image}" alt="${article.title}">` :
                        `<div class="placeholder">
                            <i class="fas fa-newspaper"></i>
                        </div>`
                    }
                    <div class="article-category-badge">${this.formatCategory(article.category)}</div>
                </div>
                <div class="article-content">
                    <div class="article-meta">
                        <div class="article-date-small">
                            <i class="fas fa-calendar-alt"></i>
                            ${formattedDate}
                        </div>
                        <div class="article-views-small">
                            <i class="fas fa-eye"></i>
                            ${article.views}
                        </div>
                    </div>
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-actions">
                        <div class="article-read-time">${article.readTime}</div>
                        <a href="#" class="btn-read-more" onclick="newsManager.readArticle(${article.id})">
                            Read More
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    formatCategory(category) {
        const categories = {
            'matches': 'Match Report',
            'announcements': 'Announcement',
            'transfers': 'Transfer News',
            'highlights': 'Highlights'
        };
        return categories[category] || category;
    }

    loadMoreArticles() {
        this.currentPage++;
        this.renderNewsGrid();
    }

    readArticle(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (article) {
            // In a real app, this would navigate to article page or show modal
            alert(`Reading: ${article.title}\n\n${article.content || 'Full article content would be displayed here.'}`);
            
            // Simulate view count increase
            article.views++;
            this.updateNewsStats();
        }
    }

    shareArticle(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (article) {
            const shareUrl = window.location.href;
            const shareText = `Check out this article: ${article.title}`;

            if (navigator.share) {
                navigator.share({
                    title: article.title,
                    text: article.excerpt,
                    url: shareUrl
                });
            } else {
                // Fallback: Copy to clipboard
                navigator.clipboard.writeText(`${shareText} - ${shareUrl}`);
                this.showNotification('Article link copied to clipboard!');
            }
        }
    }

    refreshNews() {
        this.showNotification('Refreshing news...');
        this.showLoading();
        
        // Simulate API call
        setTimeout(() => {
            this.loadNewsData();
            this.showNotification('News updated!');
        }, 1500);
    }

    showSubscriptionModal() {
        const email = prompt('Enter your email to subscribe to news updates:');
        if (email && this.validateEmail(email)) {
            this.subscribeToNewsletter(email);
        } else if (email) {
            alert('Please enter a valid email address.');
        }
    }

    handleNewsletterSubscription() {
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value.trim();

        if (this.validateEmail(email)) {
            this.subscribeToNewsletter(email);
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    subscribeToNewsletter(email) {
        // In a real app, this would send to backend
        console.log('Subscribing email:', email);
        this.showNotification('Successfully subscribed to newsletter!');
    }

    setReminder(eventType) {
        if ('Notification' in window && Notification.permission === 'granted') {
            this.scheduleEventReminder(eventType);
        } else if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.scheduleEventReminder(eventType);
                }
            });
        }

        this.showNotification('Reminder set for the event!');
    }

    scheduleEventReminder(eventType) {
        // In a real app, this would schedule actual notifications
        console.log('Reminder scheduled for:', eventType);
    }

    updateNewsStats() {
        const totalArticles = this.articles.length;
        const totalViews = this.articles.reduce((sum, article) => sum + article.views, 0);
        const tournamentStart = new Date('2025-11-20');
        const today = new Date();
        const daysActive = Math.ceil((today - tournamentStart) / (1000 * 60 * 60 * 24));

        document.getElementById('totalArticles').textContent = totalArticles;
        document.getElementById('totalViews').textContent = totalViews;
        document.getElementById('daysActive').textContent = Math.max(0, daysActive);
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

    showLoading() {
        document.getElementById('loadingSpinner').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingSpinner').classList.add('hidden');
    }

    // Method to add new article (for admin)
    addArticle(newArticle) {
        this.articles.unshift({
            id: Math.max(...this.articles.map(a => a.id)) + 1,
            date: new Date().toISOString().split('T')[0],
            views: 0,
            ...newArticle
        });
        
        this.filterArticles();
        this.renderFeaturedArticle();
        this.renderNewsGrid();
        this.updateNewsStats();
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

// Initialize news manager when DOM is loaded
let newsManager;
document.addEventListener('DOMContentLoaded', () => {
    newsManager = new NewsManager();
});

// Example of how to add new article:
/*
newsManager.addArticle({
    title: 'Breaking: New Tournament Sponsor',
    excerpt: 'Exciting announcement about new tournament sponsorship deal.',
    category: 'announcements',
    featured: true
});
*/