class PlayersManager {
    constructor() {
        this.players = [];
        this.filteredPlayers = [];
        this.currentStat = 'goals';
        this.currentFilters = {
            position: 'all',
            level: 'all',
            team: 'all',
            matches: '0',
            search: ''
        };
        this.init();
    }

    init() {
        this.loadPlayersData();
        this.setupEventListeners();
        this.updateOverviewStats();
    }

    async loadPlayersData() {
        this.showLoading();
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Sample players statistics data
        this.players = [
            {
                id: 1,
                name: 'David Johnson',
                position: 'Forward',
                level: '100L',
                team: '100 Level',
                image: 'images/players/david-johnson.jpg',
                stats: {
                    matches: 6,
                    goals: 8,
                    assists: 3,
                    saves: 0,
                    cleanSheets: 0,
                    goalsConceded: 0,
                    keyPasses: 12,
                    tackles: 4,
                    lastGoal: 'MD5 vs 300L',
                    rating: 8.7
                }
            },
            {
                id: 2,
                name: 'Sarah Mohammed',
                position: 'Midfielder',
                level: '200L',
                team: '200 Level',
                image: 'images/players/sarah-mohammed.jpg',
                stats: {
                    matches: 6,
                    goals: 4,
                    assists: 7,
                    saves: 0,
                    cleanSheets: 0,
                    goalsConceded: 0,
                    keyPasses: 18,
                    tackles: 8,
                    lastGoal: 'MD4 vs 400L',
                    rating: 8.9
                }
            },
            {
                id: 3,
                name: 'Mike Chen',
                position: 'Goalkeeper',
                level: '100L',
                team: '100 Level',
                image: 'images/players/mike-chen.jpg',
                stats: {
                    matches: 6,
                    goals: 0,
                    assists: 1,
                    saves: 24,
                    cleanSheets: 3,
                    goalsConceded: 5,
                    keyPasses: 3,
                    tackles: 2,
                    lastGoal: null,
                    rating: 8.5
                }
            },
            {
                id: 4,
                name: 'Grace Okafor',
                position: 'Forward',
                level: '400L',
                team: '400 Level',
                image: 'images/players/grace-okafor.jpg',
                stats: {
                    matches: 5,
                    goals: 6,
                    assists: 2,
                    saves: 0,
                    cleanSheets: 0,
                    goalsConceded: 0,
                    keyPasses: 8,
                    tackles: 3,
                    lastGoal: 'MD5 vs 200L',
                    rating: 8.3
                }
            },
            {
                id: 5,
                name: 'Michael Adekunle',
                position: 'Midfielder',
                level: '300L',
                team: '300 Level',
                image: 'images/players/michael-adekunle.jpg',
                stats: {
                    matches: 5,
                    goals: 2,
                    assists: 5,
                    saves: 0,
                    cleanSheets: 0,
                    goalsConceded: 0,
                    keyPasses: 15,
                    tackles: 6,
                    lastGoal: 'MD3 vs 100L',
                    rating: 8.1
                }
            },
            {
                id: 6,
                name: 'Emma Davis',
                position: 'Goalkeeper',
                level: '200L',
                team: '200 Level',
                image: 'images/players/emma-davis.jpg',
                stats: {
                    matches: 6,
                    goals: 0,
                    assists: 0,
                    saves: 19,
                    cleanSheets: 2,
                    goalsConceded: 8,
                    keyPasses: 2,
                    tackles: 1,
                    lastGoal: null,
                    rating: 7.8
                }
            },
            {
                id: 7,
                name: 'Chris Evans',
                position: 'Forward',
                level: '300L',
                team: '300 Level',
                image: 'images/players/chris-evans.jpg',
                stats: {
                    matches: 5,
                    goals: 5,
                    assists: 2,
                    saves: 0,
                    cleanSheets: 0,
                    goalsConceded: 0,
                    keyPasses: 7,
                    tackles: 2,
                    lastGoal: 'MD4 vs 400L',
                    rating: 7.9
                }
            },
            {
                id: 8,
                name: 'Daniel White',
                position: 'Defender',
                level: '400L',
                team: '400 Level',
                image: 'images/players/daniel-white.jpg',
                stats: {
                    matches: 5,
                    goals: 1,
                    assists: 3,
                    saves: 0,
                    cleanSheets: 0,
                    goalsConceded: 0,
                    keyPasses: 6,
                    tackles: 14,
                    lastGoal: 'MD2 vs 100L',
                    rating: 7.7
                }
            },
            {
                id: 9,
                name: 'Kevin Lee',
                position: 'Forward',
                level: '400L',
                team: '400 Level',
                image: 'images/players/kevin-lee.jpg',
                stats: {
                    matches: 5,
                    goals: 3,
                    assists: 4,
                    saves: 0,
                    cleanSheets: 0,
                    goalsConceded: 0,
                    keyPasses: 9,
                    tackles: 3,
                    lastGoal: 'MD3 vs 300L',
                    rating: 7.6
                }
            },
            {
                id: 10,
                name: 'Tom Harris',
                position: 'Goalkeeper',
                level: '400L',
                team: '400 Level',
                image: null,
                stats: {
                    matches: 5,
                    goals: 0,
                    assists: 0,
                    saves: 17,
                    cleanSheets: 2,
                    goalsConceded: 6,
                    keyPasses: 1,
                    tackles: 0,
                    lastGoal: null,
                    rating: 7.5
                }
            }
        ];

        this.filterPlayers();
        this.renderCurrentTable();
        this.renderSpotlight();
        this.updateSummaryStats();
        this.hideLoading();
    }

    setupEventListeners() {
        // Stat tabs
        document.querySelectorAll('.stat-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchStatTab(e.target.dataset.stat);
            });
        });

        // Filter event listeners
        document.getElementById('positionFilter').addEventListener('change', (e) => {
            this.currentFilters.position = e.target.value;
            this.filterPlayers();
            this.renderCurrentTable();
        });

        document.getElementById('levelFilter').addEventListener('change', (e) => {
            this.currentFilters.level = e.target.value;
            this.filterPlayers();
            this.renderCurrentTable();
        });

        document.getElementById('teamFilter').addEventListener('change', (e) => {
            this.currentFilters.team = e.target.value;
            this.filterPlayers();
            this.renderCurrentTable();
        });

        document.getElementById('matchesFilter').addEventListener('change', (e) => {
            this.currentFilters.matches = e.target.value;
            this.filterPlayers();
            this.renderCurrentTable();
        });

        // Search input
        document.getElementById('playerStatsSearch').addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value.toLowerCase();
            this.filterPlayers();
            this.renderCurrentTable();
        });

        // Clear search
        document.getElementById('clearStatsSearch').addEventListener('click', () => {
            document.getElementById('playerStatsSearch').value = '';
            this.currentFilters.search = '';
            this.filterPlayers();
            this.renderCurrentTable();
        });
    }

    switchStatTab(stat) {
        this.currentStat = stat;
        
        // Update active tab
        document.querySelectorAll('.stat-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-stat="${stat}"]`).classList.add('active');

        // Show corresponding table
        document.querySelectorAll('.stats-table').forEach(table => {
            table.classList.remove('active');
        });
        document.getElementById(`${stat}Table`).classList.add('active');

        this.renderCurrentTable();
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

            // Filter by team
            if (this.currentFilters.team !== 'all' && player.team !== this.currentFilters.team) {
                return false;
            }

            // Filter by minimum matches
            if (parseInt(this.currentFilters.matches) > 0 && player.stats.matches < parseInt(this.currentFilters.matches)) {
                return false;
            }

            // Filter by search query
            if (this.currentFilters.search && !player.name.toLowerCase().includes(this.currentFilters.search)) {
                return false;
            }

            return true;
        });

        // Sort based on current stat
        this.sortPlayersByStat();
    }

    sortPlayersByStat() {
        switch (this.currentStat) {
            case 'goals':
                this.filteredPlayers.sort((a, b) => b.stats.goals - a.stats.goals);
                break;
            case 'assists':
                this.filteredPlayers.sort((a, b) => b.stats.assists - a.stats.assists);
                break;
            case 'saves':
                this.filteredPlayers.sort((a, b) => b.stats.saves - a.stats.saves);
                break;
            case 'overall':
                this.filteredPlayers.sort((a, b) => b.stats.rating - a.stats.rating);
                break;
        }
    }

    renderCurrentTable() {
        const tableBody = document.getElementById(`${this.currentStat}TableBody`);
        
        if (this.filteredPlayers.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                        <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; display: block; opacity: 0.5;"></i>
                        <h3>No players found</h3>
                        <p>Try adjusting your filters or search terms.</p>
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = this.filteredPlayers.map((player, index) => 
            this.createTableRow(player, index + 1)
        ).join('');
    }

    createTableRow(player, rank) {
        const stats = player.stats;
        const rankClass = rank <= 3 ? 'top-3' : '';
        
        // Determine avatar content
        const avatarContent = player.image 
            ? `<img src="${player.image}" alt="${player.name}" onerror="this.style.display='none'; this.parentElement.classList.remove('has-image');">`
            : `<i class="fas fa-user"></i>`;
        
        const avatarClass = player.image ? 'player-avatar-small has-image' : 'player-avatar-small';

        switch (this.currentStat) {
            case 'goals':
                return `
                    <tr class="player-row">
                        <td class="stat-cell">
                            <div class="player-rank ${rankClass}">${rank}</div>
                        </td>
                        <td>
                            <div class="player-cell">
                                <div class="${avatarClass}">
                                    ${avatarContent}
                                </div>
                                <div class="player-info-small">
                                    <div class="player-name-small">${player.name}</div>
                                    <div class="player-details-small">
                                        <span class="player-position-badge">${player.position}</span>
                                        <span class="team-badge-small">${player.level}</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>${player.team}</td>
                        <td class="stat-cell high">${stats.goals}</td>
                        <td class="stat-cell">${stats.assists}</td>
                        <td class="stat-cell">${stats.matches}</td>
                        <td class="stat-cell">${(stats.goals / stats.matches).toFixed(2)}</td>
                        <td>${stats.lastGoal || '-'}</td>
                    </tr>
                `;
            
            case 'assists':
                return `
                    <tr class="player-row">
                        <td class="stat-cell">
                            <div class="player-rank ${rankClass}">${rank}</div>
                        </td>
                        <td>
                            <div class="player-cell">
                                <div class="${avatarClass}">
                                    ${avatarContent}
                                </div>
                                <div class="player-info-small">
                                    <div class="player-name-small">${player.name}</div>
                                    <div class="player-details-small">
                                        <span class="player-position-badge">${player.position}</span>
                                        <span class="team-badge-small">${player.level}</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>${player.team}</td>
                        <td class="stat-cell high">${stats.assists}</td>
                        <td class="stat-cell">${stats.goals}</td>
                        <td class="stat-cell">${stats.matches}</td>
                        <td class="stat-cell">${(stats.assists / stats.matches).toFixed(2)}</td>
                        <td class="stat-cell">${stats.keyPasses}</td>
                    </tr>
                `;
            
            case 'saves':
                if (player.position !== 'Goalkeeper') return '';
                const savePercentage = stats.saves > 0 ? ((stats.saves / (stats.saves + stats.goalsConceded)) * 100).toFixed(1) : 0;
                
                return `
                    <tr class="player-row">
                        <td class="stat-cell">
                            <div class="player-rank ${rankClass}">${rank}</div>
                        </td>
                        <td>
                            <div class="player-cell">
                                <div class="${avatarClass}">
                                    ${avatarContent}
                                </div>
                                <div class="player-info-small">
                                    <div class="player-name-small">${player.name}</div>
                                    <div class="player-details-small">
                                        <span class="player-position-badge">${player.position}</span>
                                        <span class="team-badge-small">${player.level}</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>${player.team}</td>
                        <td class="stat-cell high">${stats.saves}</td>
                        <td class="stat-cell">${stats.cleanSheets}</td>
                        <td class="stat-cell">${stats.matches}</td>
                        <td class="stat-cell">${(stats.saves / stats.matches).toFixed(1)}</td>
                        <td class="stat-cell">${stats.goalsConceded}</td>
                    </tr>
                `;
            
            case 'overall':
                const points = this.calculatePlayerPoints(player);
                
                return `
                    <tr class="player-row">
                        <td class="stat-cell">
                            <div class="player-rank ${rankClass}">${rank}</div>
                        </td>
                        <td>
                            <div class="player-cell">
                                <div class="${avatarClass}">
                                    ${avatarContent}
                                </div>
                                <div class="player-info-small">
                                    <div class="player-name-small">${player.name}</div>
                                    <div class="player-details-small">
                                        <span class="player-position-badge">${player.position}</span>
                                        <span class="team-badge-small">${player.level}</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>${player.team}</td>
                        <td class="stat-cell high">${stats.rating.toFixed(1)}</td>
                        <td class="stat-cell">${stats.goals}</td>
                        <td class="stat-cell">${stats.assists}</td>
                        <td class="stat-cell">${stats.saves}</td>
                        <td class="stat-cell">${stats.matches}</td>
                        <td class="stat-cell high">${points}</td>
                    </tr>
                `;
        }
    }

    calculatePlayerPoints(player) {
        const stats = player.stats;
        let points = 0;
        
        // Goals: 5 points each
        points += stats.goals * 5;
        
        // Assists: 3 points each
        points += stats.assists * 3;
        
        // Saves: 0.5 points each (for goalkeepers)
        points += stats.saves * 0.5;
        
        // Clean sheets: 5 points each (for goalkeepers and defenders)
        if (player.position === 'Goalkeeper' || player.position === 'Defender') {
            points += stats.cleanSheets * 5;
        }
        
        // Matches played: 2 points each
        points += stats.matches * 2;
        
        return Math.round(points);
    }

    renderSpotlight() {
        const container = document.getElementById('spotlightGrid');
        
        // Get top 3 players for spotlight
        const topPlayers = [...this.players]
            .sort((a, b) => this.calculatePlayerPoints(b) - this.calculatePlayerPoints(a))
            .slice(0, 3);

        container.innerHTML = topPlayers.map((player, index) => {
            const stats = player.stats;
            const points = this.calculatePlayerPoints(player);
            const badges = ['🥇 Top Performer', '🥈 Rising Star', '🥉 Key Player'];
            
            // Determine avatar content
            const avatarContent = player.image 
                ? `<img src="${player.image}" alt="${player.name}" onerror="this.style.display='none'; this.parentElement.classList.remove('has-image');">`
                : `<i class="fas fa-user"></i>`;
            
            const avatarClass = player.image ? 'spotlight-avatar has-image' : 'spotlight-avatar';

            return `
                <div class="spotlight-card">
                    <div class="spotlight-header">
                        <div class="spotlight-badge">${badges[index]}</div>
                    </div>
                    
                    <div class="${avatarClass}">
                        ${avatarContent}
                    </div>
                    
                    <div class="spotlight-name">${player.name}</div>
                    <div class="spotlight-details">
                        ${player.position} • ${player.team} • ${player.level}
                    </div>
                    
                    <div class="spotlight-stats">
                        <div class="spotlight-stat">
                            <span class="spotlight-stat-value">${stats.goals}</span>
                            <span class="spotlight-stat-label">Goals</span>
                        </div>
                        <div class="spotlight-stat">
                            <span class="spotlight-stat-value">${stats.assists}</span>
                            <span class="spotlight-stat-label">Assists</span>
                        </div>
                        <div class="spotlight-stat">
                            <span class="spotlight-stat-value">${points}</span>
                            <span class="spotlight-stat-label">Points</span>
                        </div>
                    </div>
                    
                    <div class="spotlight-highlight">
                        ${this.generateHighlightText(player)}
                    </div>
                </div>
            `;
        }).join('');
    }

    generateHighlightText(player) {
        const stats = player.stats;
        
        if (player.position === 'Goalkeeper') {
            return `Outstanding with ${stats.cleanSheets} clean sheets and ${stats.saves} total saves`;
        } else if (player.position === 'Forward') {
            return `Clinical finisher with ${stats.goals} goals in ${stats.matches} matches`;
        } else if (player.position === 'Midfielder') {
            return `Creative playmaker with ${stats.assists} assists and ${stats.keyPasses} key passes`;
        } else {
            return `Solid defender with excellent positioning and tackling`;
        }
    }

    updateOverviewStats() {
        const totalGoals = this.players.reduce((sum, player) => sum + player.stats.goals, 0);
        const totalAssists = this.players.reduce((sum, player) => sum + player.stats.assists, 0);
        const totalSaves = this.players.reduce((sum, player) => sum + player.stats.saves, 0);

        document.getElementById('totalGoals').textContent = totalGoals;
        document.getElementById('totalAssists').textContent = totalAssists;
        document.getElementById('totalSaves').textContent = totalSaves;
        document.getElementById('totalPlayers').textContent = this.players.length;
    }

    updateSummaryStats() {
        const totalMatches = this.players.reduce((sum, player) => sum + player.stats.matches, 0);
        const totalGoals = this.players.reduce((sum, player) => sum + player.stats.goals, 0);
        const totalAssists = this.players.reduce((sum, player) => sum + player.stats.assists, 0);
        const totalSaves = this.players.reduce((sum, player) => sum + player.stats.saves, 0);
        const totalCleanSheets = this.players.reduce((sum, player) => sum + player.stats.cleanSheets, 0);
        const totalGoalsConceded = this.players.reduce((sum, player) => sum + player.stats.goalsConceded, 0);

        const topScorer = Math.max(...this.players.map(p => p.stats.goals));
        const topAssister = Math.max(...this.players.map(p => p.stats.assists));

        document.getElementById('avgGoals').textContent = (totalGoals / totalMatches).toFixed(2);
        document.getElementById('topScorerGoals').textContent = topScorer;
        document.getElementById('hatTricks').textContent = this.players.filter(p => p.stats.goals >= 3).length;

        document.getElementById('avgAssists').textContent = (totalAssists / totalMatches).toFixed(2);
        document.getElementById('topAssister').textContent = topAssister;
        document.getElementById('goalContributions').textContent = totalGoals + totalAssists;

        document.getElementById('avgSaves').textContent = (totalSaves / totalMatches).toFixed(1);
        document.getElementById('cleanSheets').textContent = totalCleanSheets;
        document.getElementById('savePercentage').textContent = totalSaves > 0 ? 
            Math.round((totalSaves / (totalSaves + totalGoalsConceded)) * 100) + '%' : '0%';
    }

    exportStats(type) {
        // In a real app, this would generate and download a CSV file
        const data = this.filteredPlayers.map(player => ({
            Name: player.name,
            Team: player.team,
            Position: player.position,
            ...player.stats
        }));

        console.log(`Exporting ${type} data:`, data);
        alert(`Exporting ${type} statistics data...`);
        
        // Here you would typically:
        // 1. Convert data to CSV
        // 2. Create download link
        // 3. Trigger download
    }

    showLoading() {
        document.getElementById('loadingSpinner').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingSpinner').classList.add('hidden');
    }

    // Method to update player stats (for live updates)
    updatePlayerStats(playerId, newStats) {
        const player = this.players.find(p => p.id === playerId);
        if (player) {
            player.stats = { ...player.stats, ...newStats };
            this.filterPlayers();
            this.renderCurrentTable();
            this.renderSpotlight();
            this.updateOverviewStats();
            this.updateSummaryStats();
        }
    }
}

// Initialize players manager when DOM is loaded
let playersManager;
document.addEventListener('DOMContentLoaded', () => {
    playersManager = new PlayersManager();
});

// Example of how to update stats live:
/*
playersManager.updatePlayerStats(1, {
    goals: 9,
    assists: 4,
    matches: 7
});
*/