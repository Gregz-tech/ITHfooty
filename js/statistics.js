class PlayersManager {
    constructor() {
        this.topScorers = [];
        this.topAssists = [];
        this.allPlayers = [];
        this.filteredPlayers = [];
        this.currentStat = 'all';
        this.currentFilters = {
            position: 'all',
            level: 'all',
            team: 'all',
            matches: '0',
            search: ''
        };
        this.init();
    }

    async init() {
        await this.loadPlayersData(); // Wait for data to load first
        this.setupEventListeners();
        this.updateOverviewStats(); // Now call this AFTER data is loaded
    }

    async loadPlayersData() {
        this.showLoading();
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Top scorer statistics data
        this.topScorers = [
            {   
                id: 1,
                name: 'OPE',
                position: 'Forward',
                level: '200L',
                team: '200 Level',
                image: 'images/players/ope.jpg',
                stats: {
                    matches: 1,
                    goals: 2,
                    assists: 0,
                    lastGoal: 'MD1 vs 400L',
                    rating: 8.7
                }
            },
            {
                id: 2,
                name: 'IFE',
                position: 'Forward',
                level: '400L',
                team: '400 Level',
                image: 'images/400Lplayers/ife.jpg',
                stats: {
                    matches: 1,
                    goals: 1,
                    assists: 1,
                    lastGoal: 'MD1 vs 200L',
                    rating: 8.5
                }  
            },
            {
                id: 3,
                name: 'VINCENT',
                position: 'Forward',
                level: '400L',
                team: '400 Level',
                image: 'images/400Lplayers/vincent.jpg',
                stats: {
                    matches: 1,
                    goals: 1,
                    assists: 0,
                    lastGoal: 'MD1 vs 200L',
                    rating: 7.5
                }
            }
        ];

        // Top assists statistics data
        this.topAssists = [
            {   
                id: 1,
                name: 'Eloyce',
                position: 'Forward',
                level: '400L',
                team: '400 Level',
                image: 'images/players/eloyce.jpg',
                stats: {
                    matches: 1,
                    goals: 0,
                    assists: 1,
                    ga: 1,
                    rating: 6.2
                }
            },
            {   
                id: 2,
                name: 'IFE',
                position: 'Forward',
                level: '400L',
                team: '400 Level',
                image: 'images/400Lplayers/ife.jpg',
                stats: {
                    matches: 1,
                    goals: 1,
                    assists: 1,
                    ga: 2,
                    rating: 8.5
                }
            }
        ];

        // Combine all players for overall stats
        this.allPlayers = [...this.topScorers, ...this.topAssists];

        this.renderAllTables();
        this.renderSpotlight();
        this.updateSummaryStats();
        this.hideLoading();
        
        // Return the data to ensure the async operation completes
        return this.allPlayers;
    }

    setupEventListeners() {
        // Stat tabs
        document.querySelectorAll('.stat-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchStatTab(e.target.closest('.stat-tab').dataset.stat);
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

        if (stat === 'all') {
            this.renderAllTables();
        } else {
            this.renderCurrentTable();
        }
    }

    filterPlayers() {
        let sourceArray = [];
        
        switch (this.currentStat) {
            case 'goals':
                sourceArray = this.topScorers;
                break;
            case 'assists':
                sourceArray = this.topAssists;
                break;
            case 'all':
                // For all view, we need to handle both scorers and assists separately
                return; // We'll handle filtering in renderAllTables
            default:
                sourceArray = this.allPlayers;
        }

        this.filteredPlayers = sourceArray.filter(player => {
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

    renderAllTables() {
        // Filter top scorers for the goals table
        const filteredScorers = this.applyFiltersToArray(this.topScorers);
        
        // Render top scorers with requested format: RANK, PLAYER, TEAM, GOALS, ASSIST, G&A
        document.getElementById('goalsTableBody').innerHTML = filteredScorers.map((player, index) => 
            this.createTableRow(player, index + 1, 'goals')
        ).join('');

        // Filter top assists for the assists table
        const filteredAssists = this.applyFiltersToArray(this.topAssists);
        
        // Render top assists with requested format: RANK, PLAYER, TEAM, ASSIST, GOALS
        document.getElementById('assistsTableBody').innerHTML = filteredAssists.map((player, index) => 
            this.createTableRow(player, index + 1, 'assists')
        ).join('');
    }

    applyFiltersToArray(array) {
        return array.filter(player => {
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
    }

    renderCurrentTable() {
        if (this.currentStat === 'all') {
            this.renderAllTables();
            return;
        }

        const tableBodyId = this.currentStat === 'goals' ? 'goalsTableBodySingle' : 
                           this.currentStat === 'assists' ? 'assistsTableBodySingle' : 
                           `${this.currentStat}TableBody`;
        
        const tableBody = document.getElementById(tableBodyId);
        
        if (this.filteredPlayers.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                        <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; display: block; opacity: 0.5;"></i>
                        <h3>No players found</h3>
                        <p>Try adjusting your filters or search terms.</p>
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = this.filteredPlayers.map((player, index) => 
            this.createTableRow(player, index + 1, this.currentStat)
        ).join('');
    }

    createTableRow(player, rank, statType) {
        const stats = player.stats;
        const rankClass = rank <= 3 ? 'top-3' : '';
        
        // Determine avatar content
        const avatarContent = player.image 
            ? `<img src="${player.image}" alt="${player.name}" onerror="this.style.display='none'; this.parentElement.classList.remove('has-image');">`
            : `<i class="fas fa-user"></i>`;
        
        const avatarClass = player.image ? 'player-avatar-small has-image' : 'player-avatar-small';

        switch (statType) {
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
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>${player.team}</td>
                        <td class="stat-cell high">${stats.goals}</td>
                        <td class="stat-cell">${stats.assists}</td>
                        <td class="stat-cell">${stats.goals + stats.assists}</td>
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
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>${player.team}</td>
                        <td class="stat-cell high">${stats.assists}</td>
                        <td class="stat-cell">${stats.goals}</td>
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
        
        // Get top 3 players for spotlight from all players
        const topPlayers = [...this.allPlayers]
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
        console.log('Updating overview stats with:', this.allPlayers.length, 'players');
        
        const totalGoals = this.allPlayers.reduce((sum, player) => sum + player.stats.goals, 0);
        const totalAssists = this.allPlayers.reduce((sum, player) => sum + player.stats.assists, 0);
        const totalSaves = this.allPlayers.reduce((sum, player) => sum + (player.stats.saves || 0), 0);

        console.log('Calculated stats:', { totalGoals, totalAssists, totalSaves });

        document.getElementById('totalGoals').textContent = totalGoals;
        document.getElementById('totalAssists').textContent = totalAssists;
        document.getElementById('totalSaves').textContent = totalSaves;
        document.getElementById('totalPlayers').textContent = this.allPlayers.length;
    }

    updateSummaryStats() {
        const totalMatches = this.allPlayers.reduce((sum, player) => sum + player.stats.matches, 0);
        const totalGoals = this.allPlayers.reduce((sum, player) => sum + player.stats.goals, 0);
        const totalAssists = this.allPlayers.reduce((sum, player) => sum + player.stats.assists, 0);
        const totalSaves = this.allPlayers.reduce((sum, player) => sum + (player.stats.saves || 0), 0);
        const totalCleanSheets = this.allPlayers.reduce((sum, player) => sum + (player.stats.cleanSheets || 0), 0);
        const totalGoalsConceded = this.allPlayers.reduce((sum, player) => sum + (player.stats.goalsConceded || 0), 0);

        // Add safety checks to prevent division by zero
        const avgGoals = totalMatches > 0 ? (totalGoals / totalMatches).toFixed(2) : '0.0';
        const avgAssists = totalMatches > 0 ? (totalAssists / totalMatches).toFixed(2) : '0.0';
        const avgSaves = totalMatches > 0 ? (totalSaves / totalMatches).toFixed(1) : '0.0';

        const topScorer = Math.max(...this.allPlayers.map(p => p.stats.goals));
        const topAssister = Math.max(...this.allPlayers.map(p => p.stats.assists));

        // Calculate save percentage safely
        let savePercentage = '0%';
        if (totalSaves > 0 && (totalSaves + totalGoalsConceded) > 0) {
            savePercentage = Math.round((totalSaves / (totalSaves + totalGoalsConceded)) * 100) + '%';
        }

        document.getElementById('avgGoals').textContent = avgGoals;
        document.getElementById('topScorerGoals').textContent = topScorer;
        document.getElementById('hatTricks').textContent = this.allPlayers.filter(p => p.stats.goals >= 3).length;

        document.getElementById('avgAssists').textContent = avgAssists;
        document.getElementById('topAssister').textContent = topAssister;
        document.getElementById('goalContributions').textContent = totalGoals + totalAssists;

        document.getElementById('avgSaves').textContent = avgSaves;
        document.getElementById('cleanSheets').textContent = totalCleanSheets;
        document.getElementById('savePercentage').textContent = savePercentage;
    }

    exportStats(type) {
        let data = [];
        let filename = '';
        let headers = [];

        switch (type) {
            case 'goals':
                data = this.topScorers
                    .sort((a, b) => b.stats.goals - a.stats.goals)
                    .map((player, index) => ({
                        Rank: index + 1,
                        Name: player.name,
                        Team: player.team,
                        Goals: player.stats.goals,
                        Assist: player.stats.assists,
                        'G&A': player.stats.goals + player.stats.assists
                    }));
                filename = 'top_scorers.csv';
                headers = ['Rank', 'Name', 'Team', 'Goals', 'Assist', 'G&A'];
                break;

            case 'assists':
                data = this.topAssists
                    .sort((a, b) => b.stats.assists - a.stats.assists)
                    .map((player, index) => ({
                        Rank: index + 1,
                        Name: player.name,
                        Team: player.team,
                        Assist: player.stats.assists,
                        Goals: player.stats.goals
                    }));
                filename = 'top_assists.csv';
                headers = ['Rank', 'Name', 'Team', 'Assist', 'Goals'];
                break;

            case 'saves':
                data = this.allPlayers
                    .filter(p => p.position === 'Goalkeeper')
                    .sort((a, b) => (b.stats.saves || 0) - (a.stats.saves || 0))
                    .map((player, index) => ({
                        Rank: index + 1,
                        Name: player.name,
                        Team: player.team,
                        Saves: player.stats.saves || 0,
                        CleanSheets: player.stats.cleanSheets || 0,
                        Matches: player.stats.matches,
                        SavesPerMatch: ((player.stats.saves || 0) / player.stats.matches).toFixed(1),
                        GoalsConceded: player.stats.goalsConceded || 0,
                        SavePercentage: (player.stats.saves || 0) > 0 ? 
                            (((player.stats.saves || 0) / ((player.stats.saves || 0) + (player.stats.goalsConceded || 0))) * 100).toFixed(1) + '%' : '0%'
                    }));
                filename = 'top_saves.csv';
                headers = ['Rank', 'Name', 'Team', 'Saves', 'Clean Sheets', 'Matches', 'Saves/Match', 'Goals Conceded', 'Save Percentage'];
                break;

            case 'overall':
                data = this.allPlayers
                    .sort((a, b) => b.stats.rating - a.stats.rating)
                    .map((player, index) => ({
                        Rank: index + 1,
                        Name: player.name,
                        Team: player.team,
                        Position: player.position,
                        Rating: player.stats.rating.toFixed(1),
                        Goals: player.stats.goals,
                        Assists: player.stats.assists,
                        Saves: player.stats.saves || 0,
                        Matches: player.stats.matches,
                        Points: this.calculatePlayerPoints(player)
                    }));
                filename = 'overall_ranking.csv';
                headers = ['Rank', 'Name', 'Team', 'Position', 'Rating', 'Goals', 'Assists', 'Saves', 'Matches', 'Points'];
                break;
        }

        this.downloadCSV(data, headers, filename);
    }

    downloadCSV(data, headers, filename) {
        if (data.length === 0) {
            alert('No data available to export.');
            return;
        }

        // Create CSV content
        let csvContent = headers.join(',') + '\n';
        
        data.forEach(row => {
            const rowData = headers.map(header => {
                const value = row[header];
                // Handle values that might contain commas or quotes
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            });
            csvContent += rowData.join(',') + '\n';
        });

        // Create and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        this.showExportSuccess(filename);
    }

    showExportSuccess(filename) {
        // Create a temporary success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--pitch-green);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;
        
        successMsg.innerHTML = `
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            ${filename} downloaded successfully!
        `;
        
        document.body.appendChild(successMsg);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successMsg.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(successMsg);
            }, 300);
        }, 3000);
    }

    showLoading() {
        document.getElementById('loadingSpinner').style.display = 'flex';
    }

    hideLoading() {
        document.getElementById('loadingSpinner').style.display = 'none';
    }
}

// Initialize players manager when DOM is loaded
let playersManager;
document.addEventListener('DOMContentLoaded', () => {
    playersManager = new PlayersManager();
});

// Add CSS animations for export success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);