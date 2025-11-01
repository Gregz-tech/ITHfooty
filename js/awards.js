class AwardsManager {
    constructor() {
        this.awards = [];
        this.filteredAwards = [];
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        this.loadAwardsData();
        this.setupEventListeners();
        this.updateAwardsStats();
    }

    async loadAwardsData() {
        this.showLoading();
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Sample awards data
        this.awards = [
            {
                id: 1,
                name: 'Best Player of the Tournament',
                category: 'performance',
                winner: {
                    name: 'To Be Decided',
                    team: 'TBD',
                    level: 'TBD',
                    image: null,
                    stats: { goals: 0, assists: 0, matches: 0 }
                },
                description: 'Awarded to the most outstanding player throughout the entire tournament',
                prize: 'Certificate',
                stats: { goals: 0, assists: 0 }
            },
            {
                id: 2,
                name: 'Golden Boot',
                category: 'performance',
                winner: {
                    name: 'To Be Decided',
                    team: 'TBD',
                    level: 'TBD',
                    image: null,
                    stats: { goals: 0, assists: 0, matches: 0 }
                },
                description: 'Awarded to the player who scores the most goals in the tournament',
                prize: 'Certificate',
                stats: { goals: 0, assists: 0 }
            },
            {
                id: 3,
                name: 'Best Goalkeeper',
                category: 'performance',
                winner: {
                    name: 'To Be Decided',
                    team: 'TBD',
                    level: 'TBD',
                    image: null,
                    stats: { saves: 0, cleanSheets: 0 }
                },
                description: 'Awarded to the goalkeeper with the most clean sheets and outstanding performances',
                prize: 'Certificate',
                stats: { saves: 0, cleanSheets: 0 }
            },
            {
                id: 4,
                name: 'Best Defender',
                category: 'performance',
                winner: {
                    name: 'To Be Decided',
                    team: 'TBD',
                    level: 'TBD',
                    image: null,
                    stats: { tackles: 0, interceptions: 0 }
                },
                description: 'Awarded to the defender with the most consistent and impactful performances',
                prize: 'Defender of the Tournament certificate',
                stats: { tackles: 0, interceptions: 0 }
            }, 
            {
                id: 5,
                name: 'Emerging Talent',
                category: 'special',
                winner: {
                    name: 'To Be Decided',
                    team: 'TBD',
                    level: 'TBD',
                    image: null
                },
                description: 'Awarded to the most promising young player in the tournament',
                prize: 'Young Player of the Tournament certificate',
                stats: {}
            },
            {
                id: 6,
                name: 'Coach of the Tournament',
                category: 'special',
                winner: {
                    name: 'To Be Decided',
                    team: 'TBD',
                    level: 'TBD',
                    image: null
                },
                description: 'Awarded to the coach with the best tactical decisions and team management',
                prize: 'Best Coach certificate',
                stats: {}
            },
            {
                id: 7,
                name: 'Fan Favorite Player',
                category: 'special',
                winner: {
                    name: 'To Be Decided',
                    team: 'TBD',
                    level: 'TBD',
                    image: null
                },
                description: 'Awarded to the player who receives the most votes from fans and supporters',
                prize: "People's Choice Award",
                stats: {}
            },
               {
                id: 8,
                name: 'Female Team of the Tournament',
                category: 'performance',
                winner: {
                    name: 'To Be Decided',
                    team: 'TBD',
                    level: 'TBD',
                    image: null
                },
                description: 'Awarded to the outstanding female team in the tournament',
                prize: "Certificate",
                stats: {}
            }
        ];

        this.filterAwards();
        this.renderAwards();
        this.hideLoading();
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target.dataset.category);
            });
        });
    }

    setActiveFilter(category) {
        this.currentCategory = category;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        this.filterAwards();
        this.renderAwards();
    }

    filterAwards() {
        if (this.currentCategory === 'all') {
            this.filteredAwards = this.awards;
        } else {
            this.filteredAwards = this.awards.filter(award => 
                award.category === this.currentCategory
            );
        }
    }

    renderAwards() {
        const container = document.getElementById('awardsGrid');
        
        if (this.filteredAwards.length === 0) {
            container.innerHTML = `
                <div class="no-awards">
                    <i class="fas fa-trophy"></i>
                    <h3>No awards found</h3>
                    <p>Try selecting a different category.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredAwards.map(award => this.createAwardCard(award)).join('');
    }

    createAwardCard(award) {
        const winner = award.winner;
        const stats = award.stats || {};
        
        // Determine avatar content
        const avatarContent = winner.image 
            ? `<img src="${winner.image}" alt="${winner.name}" onerror="this.style.display='none'; this.parentElement.classList.remove('has-image');">`
            : `<i class="fas fa-user"></i>`;
        
        const avatarClass = winner.image ? 'award-winner-avatar has-image' : 'award-winner-avatar';

        // Generate stats HTML based on award type
        const statsHTML = Object.keys(stats).length > 0 ? `
            <div class="award-stats">
                ${Object.entries(stats).map(([key, value]) => `
                    <div class="award-stat-item">
                        <span class="award-stat-value">${value}</span>
                        <span class="award-stat-label">${this.formatStatLabel(key)}</span>
                    </div>
                `).join('')}
            </div>
        ` : '';

        return `
            <div class="award-card">
                <div class="award-header">
                    <div class="award-category ${award.category}">${this.formatCategory(award.category)}</div>
                    <div class="award-prize">${award.prize}</div>
                </div>
                
                <h3 class="award-name">${award.name}</h3>
                
                <div class="award-winner">
                    <div class="${avatarClass}">
                        ${avatarContent}
                    </div>
                    <div class="award-winner-info">
                        <div class="award-winner-name">${winner.name}</div>
                        <div class="award-winner-details">
                            ${winner.team} • ${winner.level}
                        </div>
                    </div>
                </div>
                
                <p class="award-description">${award.description}</p>
                
                ${statsHTML}
            </div>
        `;
    }

    formatCategory(category) {
        const categories = {
            'performance': 'Performance',
            'sportsmanship': 'Sportsmanship',
            'special': 'Special Award'
        };
        return categories[category] || category;
    }

    formatStatLabel(stat) {
        const labels = {
            'goals': 'Goals',
            'assists': 'Assists',
            'matches': 'Matches',
            'saves': 'Saves',
            'cleanSheets': 'Clean Sheets',
            'tackles': 'Tackles',
            'interceptions': 'Interceptions',
            'passes': 'Passes'
        };
        return labels[stat] || stat;
    }

    updateAwardsStats() {
        // These would be calculated from actual data
        document.getElementById('totalAwards').textContent = this.awards.length;
        document.getElementById('totalWinners').textContent = new Set(this.awards.map(a => a.winner.name)).size;
        document.getElementById('categories').textContent = new Set(this.awards.map(a => a.category)).size;
    }

    showLoading() {
        document.getElementById('loadingSpinner').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingSpinner').classList.add('hidden');
    }

    // Method to update winners after the tournament
    updateWinners(winnerData) {
        winnerData.forEach(update => {
            const award = this.awards.find(a => a.id === update.awardId);
            if (award) {
                award.winner = { ...award.winner, ...update.winner };
                if (update.stats) {
                    award.stats = { ...award.stats, ...update.stats };
                }
            }
        });
        
        this.filterAwards();
        this.renderAwards();
        this.updateAwardsStats();
    }
}

// Initialize awards manager when DOM is loaded
let awardsManager;
document.addEventListener('DOMContentLoaded', () => {
    awardsManager = new AwardsManager();
});

// Example of how to update winners after the tournament:
/*
const winnerUpdates = [
    {
        awardId: 1,
        winner: {
            name: 'David Johnson',
            team: '100 Level',
            level: '100L',
            image: 'images/players/david-johnson.jpg'
        },
        stats: { goals: 8, assists: 5, matches: 7 }
    },
    // ... more updates
];
awardsManager.updateWinners(winnerUpdates);
*/