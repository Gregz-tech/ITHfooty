class NewsManager {
    constructor() {
        this.articles = [];
        this.filteredArticles = [];
        this.currentCategory = 'all';
        this.currentSearch = '';
        this.currentPage = 1;
        this.articlesPerPage = 6;
        this.currentArticleId = null;
        this.init();
    }

    init() {
        this.loadNewsData();
        this.setupEventListeners();
        this.updateNewsStats();
        this.setupModalEvents();
    }

    async loadNewsData() {
        this.showLoading();
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Sample news data with full content
        this.articles = [
            {
    id: 1,
    title: '⚽ Official Tournament Rules & Regulations Released',
    excerpt: 'Complete guide to the 2025/2026 Intra-Departmental Football Tournament rules. All players and teams must read and adhere to these regulations.',
    content: `
                <div class="article-modal-header">
    <h1 class="article-modal-title">⚽ Tournament Rules & Regulations</h1>
    <div class="article-modal-meta">
        <span><i class="fas fa-calendar-alt"></i> Tournament Guidelines</span>
        <span><i class="fas fa-user"></i> Tournament Committee</span>
        <span><i class="fas fa-eye"></i> Official Document</span>
        <span><i class="fas fa-clock"></i> 5 min read</span>
    </div>
</div>
<div class="article-modal-body">
    <p class="rules-intro">Below are the official rules guiding the 2025/2026 Intra-Departmental Football Tournament. All players, teams and supporters are expected to adhere strictly.</p>

    <div class="rules-section">
        <h2>1. Eligibility & Team Requirements</h2>
        <ul>
            <li>Only registered students of the department are allowed to participate.</li>
            <li>A player can represent <strong>only one level</strong> throughout the tournament.</li>
            <li>Each team must submit:
                <ul>
                    <li>Full squad list</li>
                    <li>Pitch names</li>
                    <li>Jersey numbers</li>
                    <li>Playing positions</li>
                    <li>A passport/photo</li>
                </ul>
            </li>
            <li>Any team that fields an ineligible player automatically loses the match (3–0).</li>
        </ul>
    </div>

    <div class="rules-section">
        <h2>2. Match Duration</h2>
        <ul>
            <li><strong>Group Stage:</strong> 90 minutes (45 mins each half) + 15 mins halftime.</li>
            <li>No extra time in group stage.</li>
           
        </ul>
    </div>

    <div class="rules-section">
        <h2>3. Points System</h2>
        <ul>
            <li><strong>Win – 3 points</strong></li>
            <li><strong>Draw – 1 point</strong></li>
            <li><strong>Loss – 0 points</strong></li>
            <li>Table ranking is based on:
                <ol>
                    <li>Points</li>
                    <li>Goal Difference</li>
                    <li>Goals Scored</li>
                    <li>Head-to-head</li>
                    <li>Fair Play (fewest cards)</li>
                    
                </ol>
            </li>
        </ul>
    </div>

    <div class="rules-section">
        <h2>4. Substitutions</h2>
        <ul>
            <li>Maximum of <strong>5 substitutions</strong> per match.</li>
            <li>Substitution can only be made during a stoppage and with the referee's permission.</li>
            <li>A substituted player <strong>cannot</strong> return to the match.</li>
        </ul>
    </div>

    <div class="rules-section">
        <h2>5. Player Equipment</h2>
        <ul>
            <li>All players must wear:
                <ul>
                    <li>Matching jerseys</li>
                    <li>Shin guards (Not mandatory)</li>
                    <li>Proper football boots</li>
                </ul>
            </li>
            <li>No jewelry (chains, rings, wristwatches) allowed.</li>
            <li>Goalkeeper must wear a different color from both teams.</li>
        </ul>
    </div>

    <div class="rules-section">
        <h2>6. Kick-Off & Ball Rules</h2>
        <ul>
            <li>A coin toss determines the team that starts the match.</li>
            <li>Standard size 5 ball will be used.</li>
            <li>If the ball bursts, play restarts with a dropped ball.</li>
        </ul>
    </div>

    <div class="rules-section">
        <h2>7. Fouls & Misconduct</h2>
        
        <h3>Yellow Card Offences:</h3>
        <ul>
            <li>Reckless play</li>
            <li>Time wasting</li>
            <li>Removing shirt in celebration</li>
            <li>Arguing with officials</li>
            <li>Delaying restart</li>
        </ul>

        <h3>Red Card Offences:</h3>
        <ul>
            <li>Violent conduct</li>
            <li>Serious foul play</li>
            <li>Use of abusive language</li>
            <li>Second yellow card</li>
            <li>Deliberate handball to stop a clear goal-scoring chance</li>
        </ul>

        <p><strong>A red-carded player is suspended for the next match.</strong></p>
    </div>

    <div class="rules-section">
        <h2>8. Offside Rule</h2>
        <p>A player is offside if:</p>
        <ul>
            <li>They are beyond the last defender <strong>and</strong></li>
            <li>Actively involved in play (receiving the ball or interfering)</li>
        </ul>
        
        <p>No offside from:</p>
        <ul>
            <li>Goal kick</li>
            <li>Throw-in</li>
            <li>Corner kick</li>
        </ul>
    </div>

    <div class="rules-section">
        <h2>9. Free Kicks</h2>
        <ul>
            <li><strong>Direct Free Kick:</strong> Can be scored directly (for serious fouls).</li>
            <li><strong>Indirect Free Kick:</strong> Ball must touch another player before scoring.</li>
            <li>Opponents must stand <strong>7 steps</strong> away.</li>
        </ul>
    </div>

    <div class="rules-section">
        <h2>10. Penalty Kicks</h2>
        <ul>
            <li>Awarded inside the penalty box.</li>
            <li>Only the taker and goalkeeper are allowed inside the box until the kick is taken.</li>
        </ul>
    </div>

    <div class="rules-section">
        <h2>11. Throw-ins</h2>
        <ul>
            <li>Both feet on the ground</li>
            <li>Ball thrown from behind the head</li>
            <li>Opponent must be 2 meters away</li>
        </ul>
        <p>Incorrect throw → given to the opposing team.</p>
    </div>

    <div class="rules-section">
        <h2>12. Goal Kicks & Corner Kicks</h2>
        <ul>
            <li><strong>Goal Kick:</strong> If opponents last touched the ball before it crossed the goal line.</li>
            <li><strong>Corner Kick:</strong> If defenders last touched it before crossing their own goal line.</li>
        </ul>
    </div>

    <div class="rules-section">
        <h2>13. Discipline & Fair Play</h2>
        <p>Zero tolerance for:</p>
        <ul>
            <li>Fighting</li>
            <li>Threatening referees</li>
            <li>Racism or abusive speech</li>
            <li>Pitch invasion</li>
            <li>Unregistered players</li>
        </ul>
        
        <p>Any team guilty may face:</p>
        <ul>
            <li>Suspension</li>
            <li>Loss of match</li>
            <li>Disqualification</li>
        </ul>
    </div>

    <div class="rules-section">
        <h2>14. Referee Authority</h2>
        <ul>
            <li>The referee's decision is <strong>final and must be respected</strong>.</li>
            <li>Only the captain may approach the referee for clarification.</li>
        </ul>
    </div>

    <div class="rules-section">
        <h2>15. Supporters' Conduct</h2>
        <ul>
            <li>No insults, harassment, or violence.</li>
            <li>No encroaching onto the pitch.</li>
            <li>Supporters should encourage fair and peaceful support of their level.</li>
        </ul>
    </div>

    <div class="rules-section">
        <h2>16. Photography & Media</h2>
        <ul>
            <li>Official photographers may enter the pitch before and after the match.</li>
            <li>Players should cooperate for group photos and media coverage.</li>
        </ul>
    </div>

    <div class="rules-section">
        <h2>17. Match Forfeiture</h2>
        <p>A team forfeits a match if:</p>
        <ul>
            <li>They arrive <strong>more than 15 minutes late</strong></li>
            <li>They cannot provide at least <strong>7 players</strong></li>
            <li>They field an unregistered player</li>
        </ul>
        <p><strong>Forfeit score: 3–0 loss.</strong></p>
    </div>

     <div class="rules-section">
        <h2>18. Loan Player Participation</h2>
        <ul>
            <li>Players listed for loan but not successfully loaned can participate in the tournament.</li>
            <li>Such players are eligible to play for their original levels after completing their first match.</li>
            <li>Loan listing status must be verified by the Tournament Committee.</li>
            <li>Once a player participates for their level after the loan window closes, they cannot transfer to another level for the remainder of the tournament.</li>
        </ul>
    </div>


    <div class="rules-notice">
        <p><strong>Note:</strong> These rules are binding for all participants. Any disputes will be resolved by the Tournament Committee.</p>
    </div>
</div>`,
    category: 'announcements',
    image: 'images/news/rules.png',
    date: '2025-11-26',
    views: '',
    readTime: '5 min read',
    author: 'Tournament Committee',
    featured: true
},

           
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

    setupModalEvents() {
        // Share modal events
        document.getElementById('closeShareModal').addEventListener('click', () => {
            this.closeShareModal();
        });

        // Article modal events
        document.getElementById('closeArticleModal').addEventListener('click', () => {
            this.closeArticleModal();
        });

        document.getElementById('closeArticleBtn').addEventListener('click', () => {
            this.closeArticleModal();
        });

        document.getElementById('shareArticleBtn').addEventListener('click', () => {
            this.closeArticleModal();
            setTimeout(() => {
                this.openShareModal(this.currentArticleId);
            }, 300);
        });

        // Share options
        document.querySelectorAll('.share-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const platform = e.currentTarget.dataset.platform;
                this.shareToPlatform(platform, this.currentArticleId);
            });
        });

        // Copy link button
        document.getElementById('copyLinkBtn').addEventListener('click', () => {
            this.copyArticleLink(this.currentArticleId);
        });

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeShareModal();
                this.closeArticleModal();
            }
        });

        // Close modals with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeShareModal();
                this.closeArticleModal();
            }
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
                        <button class="btn btn-outline" onclick="newsManager.openShareModal(${featuredArticle.id})">
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
                        <button class="btn-read-more" onclick="newsManager.readArticle(${article.id})">
                            Read More
                            <i class="fas fa-arrow-right"></i>
                        </button>
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
            this.currentArticleId = articleId;
            
            // Update view count
            article.views++;
            this.updateNewsStats();

            // Show article in modal
            this.openArticleModal(article);
        }
    }

    openArticleModal(article) {
        document.getElementById('articleModalTitle').textContent = article.title;
        document.getElementById('articleModalContent').innerHTML = article.content;
        document.getElementById('articleModal').classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    closeArticleModal() {
        document.getElementById('articleModal').classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    openShareModal(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (article) {
            this.currentArticleId = articleId;
            
            // Generate shareable link
            const shareableLink = this.generateShareableLink(articleId);
            document.getElementById('shareableLink').value = shareableLink;
            
            document.getElementById('shareModal').classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    closeShareModal() {
        document.getElementById('shareModal').classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Reset copy button
        const copyBtn = document.getElementById('copyLinkBtn');
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
    }

    generateShareableLink(articleId) {
        const baseUrl = window.location.origin + window.location.pathname;
        return `${baseUrl}?article=${articleId}`;
    }

    shareToPlatform(platform, articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (!article) return;

        const shareUrl = this.generateShareableLink(articleId);
        const shareText = `Check out this article: ${article.title}`;

        const shareUrls = {
            whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' - ' + shareUrl)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
            instagram: `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`,
            tiktok: `https://www.tiktok.com/share?url=${encodeURIComponent(shareUrl)}`
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        } else {
            // Fallback for platforms without specific share URLs
            this.fallbackShare(article);
        }
    }

    copyArticleLink(articleId) {
        const shareableLink = this.generateShareableLink(articleId);
        
        navigator.clipboard.writeText(shareableLink).then(() => {
            const copyBtn = document.getElementById('copyLinkBtn');
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            const input = document.getElementById('shareableLink');
            input.select();
            document.execCommand('copy');
            
            const copyBtn = document.getElementById('copyLinkBtn');
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
        });
    }

    fallbackShare(article) {
        const shareUrl = this.generateShareableLink(article.id);
        const shareText = `Check out this article: ${article.title} - ${shareUrl}`;

        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.excerpt,
                url: shareUrl
            });
        } else {
            // Final fallback - copy to clipboard
            this.copyArticleLink(article.id);
            this.showNotification('Article link copied to clipboard!');
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

// Add CSS for toast animations and modal styles
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .hidden {
        display: none !important;
    }
    
    body.modal-open {
        overflow: hidden;
    }
`;
document.head.appendChild(additionalStyles);

// Initialize news manager when DOM is loaded
let newsManager;
document.addEventListener('DOMContentLoaded', () => {
    newsManager = new NewsManager();
});

// Handle URL parameters for direct article sharing
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('article');
    
    if (articleId && newsManager) {
        // Small delay to ensure newsManager is fully initialized
        setTimeout(() => {
            const article = newsManager.articles.find(a => a.id === parseInt(articleId));
            if (article) {
                newsManager.readArticle(parseInt(articleId));
            }
        }, 500);
    }
});