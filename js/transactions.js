class TransactionsManager {
    constructor() {
        this.players = [];
        this.filteredPlayers = [];
        this.currentFilters = {
            position: 'all',
            level: 'all',
            status: 'all',
            price: 'all',
            search: ''
        };
        this.whatsappNumber = '2348012345678'; // Replace with actual PRO number
        this.init();
    }

    init() {
        this.loadPlayersData();
        this.setupEventListeners();
        this.updateMarketStats();
    }

    async loadPlayersData() {
        this.showLoading();
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Sample players data for market
        this.players = [
            {
                id: 1,
                name: 'David Johnson',
                number: 7,
                position: 'Forward',
                level: '100L',
                image: 'images/players/david-johnson.jpg',
                stats: { goals: 3, assists: 2, matches: 5, rating: 4.5 },
                skills: ['Speed', 'Dribbling', 'Finishing'],
                transferValue: 15000,
                status: 'available',
                agent: { name: 'Mike Agent', phone: '2348012345678' },
                isHot: true
            },
            {
                id: 2,
                name: 'Mike Chen',
                number: 1,
                position: 'Goalkeeper',
                level: '100L',
                image: 'images/players/mike-chen.jpg',
                stats: { saves: 12, cleanSheets: 2, matches: 5, rating: 4.2 },
                skills: ['Reflexes', 'Positioning', 'Leadership'],
                transferValue: 12000,
                status: 'available',
                agent: { name: 'Sarah Rep', phone: '2348012345679' }
            },
            {
                id: 3,
                name: 'James Wilson',
                number: 4,
                position: 'Defender',
                level: '100L',
                image: null,
                stats: { tackles: 8, interceptions: 6, matches: 5, rating: 4.0 },
                skills: ['Tackling', 'Strength', 'Aerial'],
                transferValue: 10000,
                status: 'sold',
                agent: { name: 'John Manager', phone: '2348012345680' }
            },
            {
                id: 4,
                name: 'Alex Rodriguez',
                number: 10,
                position: 'Midfielder',
                level: '100L',
                image: 'images/players/alex-rodriguez.jpg',
                stats: { passes: 45, assists: 4, matches: 5, rating: 4.7 },
                skills: ['Passing', 'Vision', 'Creativity'],
                transferValue: 18000,
                status: 'negotiating',
                agent: { name: 'Emma Agent', phone: '2348012345681' },
                isHot: true
            },
            {
                id: 5,
                name: 'Ben Thompson',
                number: 9,
                position: 'Forward',
                level: '100L',
                image: null,
                stats: { goals: 2, assists: 1, matches: 5, rating: 3.8 },
                skills: ['Shooting', 'Movement', 'Strength'],
                transferValue: 11000,
                status: 'available',
                agent: { name: 'David Rep', phone: '2348012345682' }
            },
            {
                id: 6,
                name: 'Sarah Mohammed',
                number: 10,
                position: 'Midfielder',
                level: '200L',
                image: 'images/players/sarah-mohammed.jpg',
                stats: { goals: 4, assists: 3, matches: 5, rating: 4.6 },
                skills: ['Technique', 'Passing', 'Leadership'],
                transferValue: 20000,
                status: 'available',
                agent: { name: 'Michael Agent', phone: '2348012345683' },
                isHot: true
            },
            {
                id: 7,
                name: 'Emma Davis',
                number: 1,
                position: 'Goalkeeper',
                level: '200L',
                image: 'images/players/emma-davis.jpg',
                stats: { saves: 15, cleanSheets: 3, matches: 5, rating: 4.4 },
                skills: ['Reflexes', 'Command', 'Distribution'],
                transferValue: 14000,
                status: 'available',
                agent: { name: 'Lisa Rep', phone: '2348012345684' }
            },
            {
                id: 8,
                name: 'Lisa Brown',
                number: 5,
                position: 'Defender',
                level: '200L',
                image: null,
                stats: { tackles: 10, interceptions: 8, matches: 5, rating: 4.1 },
                skills: ['Tackling', 'Positioning', 'Recovery'],
                transferValue: 13000,
                status: 'available',
                agent: { name: 'Chris Manager', phone: '2348012345685' }
            },
            {
                id: 9,
                name: 'Michael Adekunle',
                number: 8,
                position: 'Midfielder',
                level: '300L',
                image: 'images/players/michael-adekunle.jpg',
                stats: { goals: 2, assists: 5, matches: 5, rating: 4.8 },
                skills: ['Vision', 'Passing', 'Work Rate'],
                transferValue: 16000,
                status: 'available',
                agent: { name: 'Grace Agent', phone: '2348012345686' },
                isHot: true
            },
            {
                id: 10,
                name: 'Chris Evans',
                number: 11,
                position: 'Forward',
                level: '300L',
                image: 'images/players/chris-evans.jpg',
                stats: { goals: 5, assists: 2, matches: 5, rating: 4.3 },
                skills: ['Pace', 'Dribbling', 'Finishing'],
                transferValue: 17000,
                status: 'sold',
                agent: { name: 'Daniel Rep', phone: '2348012345687' }
            },
            {
                id: 11,
                name: 'Ryan Miller',
                number: 6,
                position: 'Defender',
                level: '300L',
                image: null,
                stats: { tackles: 9, interceptions: 7, matches: 5, rating: 4.0 },
                skills: ['Strength', 'Heading', 'Tackling'],
                transferValue: 12000,
                status: 'available',
                agent: { name: 'Kevin Manager', phone: '2348012345688' }
            },
            {
                id: 12,
                name: 'Grace Okafor',
                number: 9,
                position: 'Forward',
                level: '400L',
                image: 'images/players/grace-okafor.jpg',
                stats: { goals: 6, assists: 1, matches: 5, rating: 4.9 },
                skills: ['Finishing', 'Movement', 'Composure'],
                transferValue: 22000,
                status: 'available',
                agent: { name: 'Tom Agent', phone: '2348012345689' },
                isHot: true
            }
        ];

        this.filterPlayers();
        this.renderMarket();
        this.hideLoading();
    }

    setupEventListeners() {
        // Filter event listeners
        document.getElementById('positionFilter').addEventListener('change', (e) => {
            this.currentFilters.position = e.target.value;
            this.filterPlayers();
            this.renderMarket();
        });

        document.getElementById('levelFilter').addEventListener('change', (e) => {
            this.currentFilters.level = e.target.value;
            this.filterPlayers();
            this.renderMarket();
        });

        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.currentFilters.status = e.target.value;
            this.filterPlayers();
            this.renderMarket();
        });

        document.getElementById('priceFilter').addEventListener('change', (e) => {
            this.currentFilters.price = e.target.value;
            this.filterPlayers();
            this.renderMarket();
        });

        // Search input
        document.getElementById('marketSearch').addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value.toLowerCase();
            this.filterPlayers();
            this.renderMarket();
        });

        // Clear search
        document.getElementById('clearMarketSearch').addEventListener('click', () => {
            document.getElementById('marketSearch').value = '';
            this.currentFilters.search = '';
            this.filterPlayers();
            this.renderMarket();
        });

        // Reset filters
        document.getElementById('resetFilters').addEventListener('click', () => {
            this.resetFilters();
        });
    }

    resetFilters() {
        // Reset filter values
        document.getElementById('positionFilter').value = 'all';
        document.getElementById('levelFilter').value = 'all';
        document.getElementById('statusFilter').value = 'all';
        document.getElementById('priceFilter').value = 'all';
        document.getElementById('marketSearch').value = '';

        // Reset filter state
        this.currentFilters = {
            position: 'all',
            level: 'all',
            status: 'all',
            price: 'all',
            search: ''
        };

        this.filterPlayers();
        this.renderMarket();
    }

    filterPlayers() {
        this.filteredPlayers = this.players.filter(player => {
            // Filter by position
            if (this.currentFilters.position !== 'all' && player.position !== this.currentFilters.position) {
                return false;
            }

            // Filter by level
            if (this.currentFilters.level !== 'all' && player.level !== this.currentFilters.level) {
                return false;
            }

            // Filter by status
            if (this.currentFilters.status !== 'all' && player.status !== this.currentFilters.status) {
                return false;
            }

            // Filter by price
            if (this.currentFilters.price !== 'all') {
                const price = player.transferValue;
                switch (this.currentFilters.price) {
                    case '0-10000':
                        if (price > 10000) return false;
                        break;
                    case '10000-15000':
                        if (price < 10000 || price > 15000) return false;
                        break;
                    case '15000-20000':
                        if (price < 15000 || price > 20000) return false;
                        break;
                    case '20000+':
                        if (price < 20000) return false;
                        break;
                }
            }

            // Filter by search query
            if (this.currentFilters.search) {
                const searchTerm = this.currentFilters.search;
                return (
                    player.name.toLowerCase().includes(searchTerm) ||
                    player.position.toLowerCase().includes(searchTerm) ||
                    player.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
                    player.agent.name.toLowerCase().includes(searchTerm)
                );
            }

            return true;
        });
    }

    renderMarket() {
        const container = document.getElementById('marketContainer');
        
        if (this.filteredPlayers.length === 0) {
            container.innerHTML = `
                <div class="no-players-market">
                    <i class="fas fa-search"></i>
                    <h3>No players found</h3>
                    <p>Try adjusting your filters or search terms to find available players.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredPlayers.map(player => this.createPlayerCard(player)).join('');
        this.updateMarketStats();
    }

    createPlayerCard(player) {
        const stats = player.stats || {};
        const formattedPrice = this.formatCurrency(player.transferValue);
        
        // Determine avatar content
        const avatarContent = player.image 
            ? `<img src="${player.image}" alt="${player.name}" onerror="this.style.display='none'; this.parentElement.classList.remove('has-image');">`
            : `<i class="fas fa-user"></i>`;
        
        const avatarClass = player.image ? 'player-market-avatar has-image' : 'player-market-avatar';
        const cardClass = `player-market-card ${player.status}`;

        return `
            <div class="${cardClass}">
                <div class="player-card-header">
                    <div class="player-transfer-value">${formattedPrice}</div>
                    ${player.isHot ? `<div class="player-hot-tag">Hot</div>` : ''}
                </div>
                
                <div class="player-card-content">
                    <div class="${avatarClass}">
                        ${avatarContent}
                    </div>
                    
                    <div class="player-market-info">
                        <div class="player-market-name">${player.name}</div>
                        <div class="player-market-meta">
                            <div class="player-market-position">${player.position}</div>
                            <div class="player-market-level">${player.level}</div>
                        </div>
                        <div class="player-rating">
                            ${this.generateStarRating(stats.rating || 0)}
                        </div>
                    </div>
                </div>
                
                <div class="player-market-stats">
                    <div class="market-stat-item">
                        <span class="market-stat-value">${stats.goals || 0}</span>
                        <span class="market-stat-label">Goals</span>
                    </div>
                    <div class="market-stat-item">
                        <span class="market-stat-value">${stats.assists || 0}</span>
                        <span class="market-stat-label">Assists</span>
                    </div>
                    <div class="market-stat-item">
                        <span class="market-stat-value">${stats.matches || 0}</span>
                        <span class="market-stat-label">Matches</span>
                    </div>
                </div>
                
                <div class="player-market-skills">
                    ${player.skills.map(skill => `<span class="skill-tag-market">${skill}</span>`).join('')}
                </div>
                
                <div class="player-agent-info">
                    <div class="agent-name">${player.agent.name}</div>
                    <div class="agent-contact">
                        <i class="fas fa-user-tie"></i>
                        Player Agent
                    </div>
                </div>
                
                <div class="player-market-actions">
                    <button class="btn-whatsapp" onclick="transactionsManager.contactAgent('${player.name}', '${player.agent.phone}')" ${player.status !== 'available' ? 'disabled' : ''}>
                        <i class="fab fa-whatsapp"></i>
                        ${player.status === 'available' ? 'Contact Agent' : player.status === 'sold' ? 'Sold Out' : 'Negotiating'}
                    </button>
                    <button class="btn-details" onclick="transactionsManager.viewPlayerDetails(${player.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `;
    }

    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let stars = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star" style="color: #f59e0b;"></i>';
        }
        
        // Half star
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt" style="color: #f59e0b;"></i>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star" style="color: #f59e0b;"></i>';
        }
        
        return `<div style="display: flex; gap: 2px; font-size: 0.8rem;">${stars}</div>`;
    }

    contactAgent(playerName, agentPhone) {
        const message = `Hi, I'm interested in player ${playerName}. Can you provide more details about the transfer?`;
        const whatsappUrl = `https://wa.me/${agentPhone}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        
        // Track the click (you can add analytics here)
        console.log(`Contacted agent for ${playerName}`);
    }

    viewPlayerDetails(playerId) {
        // In a real app, this would navigate to a player details page
        const player = this.players.find(p => p.id === playerId);
        if (player) {
            alert(`Player Details:\n\nName: ${player.name}\nPosition: ${player.position}\nLevel: ${player.level}\nPrice: ${this.formatCurrency(player.transferValue)}\nStatus: ${player.status}\n\nFull details page coming soon!`);
        }
    }

    formatCurrency(amount) {
        return '₦' + amount.toLocaleString('en-NG');
    }

    updateMarketStats() {
        const availablePlayers = this.players.filter(p => p.status === 'available').length;
        const soldPlayers = this.players.filter(p => p.status === 'sold').length;

        document.getElementById('availablePlayers').textContent = availablePlayers;
        document.getElementById('soldPlayers').textContent = soldPlayers;
    }

    showLoading() {
        document.getElementById('loadingSpinner').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingSpinner').classList.add('hidden');
    }
}

// Initialize transactions manager when DOM is loaded
let transactionsManager;
document.addEventListener('DOMContentLoaded', () => {
    transactionsManager = new TransactionsManager();
});