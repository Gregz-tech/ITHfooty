class TeamsManager {
    constructor() {
        this.teams = [];
        this.filteredTeams = [];
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.init();
    }

    init() {
        this.loadTeamsData();
        this.setupEventListeners();
        this.updateStats();
    }

    async loadTeamsData() {
        this.showLoading();
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Sample teams data with image support
        // this.teams = [
        //     {
        //         level: '100L',
        //         name: '100 Level',
        //         color: '#1e40af',
        //         logo: 'images/teams/100l-logo.jpg', // Add team logos later
        //         players: [
        //             {
        //                 id: 1,
        //                 name: 'David Johnson',
        //                 number: 7,
        //                 position: 'Forward',
        //                 level: '100L',
        //                 image: 'images/players/david-johnson.jpg',
        //                 stats: { goals: 3, assists: 2, matches: 5 },
        //                 skills: ['Speed', 'Dribbling', 'Finishing'],
        //                 available: true,
        //                 transferValue: '₦15,000',
        //                 isCaptain: true
        //             },
        //             {
        //                 id: 2,
        //                 name: 'Mike Chen',
        //                 number: 1,
        //                 position: 'Goalkeeper',
        //                 level: '100L',
        //                 image: 'images/players/mike-chen.jpg',
        //                 stats: { saves: 12, cleanSheets: 2, matches: 5 },
        //                 skills: ['Reflexes', 'Positioning', 'Leadership'],
        //                 available: true,
        //                 transferValue: '₦12,000',
        //                 isCaptain: false
        //             },
        //             {
        //                 id: 3,
        //                 name: 'James Wilson',
        //                 number: 4,
        //                 position: 'Defender',
        //                 level: '100L',
        //                 image: null, // No image available
        //                 stats: { tackles: 8, interceptions: 6, matches: 5 },
        //                 skills: ['Tackling', 'Strength', 'Aerial'],
        //                 available: true,
        //                 transferValue: '₦10,000',
        //                 isCaptain: false
        //             },
        //             {
        //                 id: 4,
        //                 name: 'Alex Rodriguez',
        //                 number: 10,
        //                 position: 'Midfielder',
        //                 level: '100L',
        //                 image: 'images/players/alex-rodriguez.jpg',
        //                 stats: { passes: 45, assists: 4, matches: 5 },
        //                 skills: ['Passing', 'Vision', 'Creativity'],
        //                 available: false,
        //                 transferValue: '₦18,000',
        //                 isCaptain: false
        //             },
        //             {
        //                 id: 5,
        //                 name: 'Ben Thompson',
        //                 number: 9,
        //                 position: 'Forward',
        //                 level: '100L',
        //                 image: null, // No image available
        //                 stats: { goals: 2, assists: 1, matches: 5 },
        //                 skills: ['Shooting', 'Movement', 'Strength'],
        //                 available: true,
        //                 transferValue: '₦11,000',
        //                 isCaptain: false
        //             }
        //         ]
        //     },
        //     {
        //         level: '200L',
        //         name: '200 Level',
        //         color: '#dc2626',
        //         logo: 'images/teams/200l-logo.jpg',
        //         players: [
        //             {
        //                 id: 6,
        //                 name: 'Sarah Mohammed',
        //                 number: 10,
        //                 position: 'Midfielder',
        //                 level: '200L',
        //                 image: 'images/players/sarah-mohammed.jpg',
        //                 stats: { goals: 4, assists: 3, matches: 5 },
        //                 skills: ['Technique', 'Passing', 'Leadership'],
        //                 available: true,
        //                 transferValue: '₦20,000',
        //                 isCaptain: true
        //             },
        //             {
        //                 id: 7,
        //                 name: 'Emma Davis',
        //                 number: 1,
        //                 position: 'Goalkeeper',
        //                 level: '200L',
        //                 image: 'images/players/emma-davis.jpg',
        //                 stats: { saves: 15, cleanSheets: 3, matches: 5 },
        //                 skills: ['Reflexes', 'Command', 'Distribution'],
        //                 available: true,
        //                 transferValue: '₦14,000',
        //                 isCaptain: false
        //             },
        //             {
        //                 id: 8,
        //                 name: 'Lisa Brown',
        //                 number: 5,
        //                 position: 'Defender',
        //                 level: '200L',
        //                 image: null, // No image available
        //                 stats: { tackles: 10, interceptions: 8, matches: 5 },
        //                 skills: ['Tackling', 'Positioning', 'Recovery'],
        //                 available: true,
        //                 transferValue: '₦13,000',
        //                 isCaptain: false
        //             }
        //         ]
        //     },
        //     {
        //         level: '300L',
        //         name: '300 Level',
        //         color: '#000',
        //         logo: 'images/teams/300l-logo.jpg',
        //         players: [
        //             {
        //                 id: 9,
        //                 name: 'Gregorian',
        //                 number: 11,
        //                 position: 'LW RW AMF',
        //                 level: '300L',
        //                 image: '/images/greg.jpg',
        //                 stats: { goals: 2, assists: 5, matches: 5 },
        //                 skills: ['Pace', 'Passing', 'Work Rate'],
        //                 available: false,
        //                 // transferValue: '₦16,000',
        //                 isCaptain: false
        //             },
        //             {
        //                 id: 10,
        //                 name: 'Ayobami',
        //                 number: 10,
        //                 position: 'AMF LW',
        //                 level: '300L',
        //                 image: 'images/players/chris-evans.jpg',
        //                 stats: { goals: 5, assists: 2, matches: 5 },
        //                 skills: ['Vision', 'Dribbling', 'Finishing'],
        //                 available: true,
        //                 // transferValue: '₦17,000',
        //                 isCaptain: false
        //             },
        //             {
        //                 id: 11,
        //                 name: 'M17',
        //                 number: 4,
        //                 position: 'Defender',
        //                 level: '300L',
        //                 image: null, // No image available
        //                 stats: { tackles: 9, interceptions: 7, matches: 5 },
        //                 skills: ['Strength', 'Heading', 'Tackling'],
        //                 available: true,
        //                 transferValue: '₦2,000',
        //                 isCaptain: false
        //             }
        //         ]
        //     },
        //     {
        //         level: '400L',
        //         name: '400 Level',
        //         color: '#f59e0b',
        //         logo: 'images/teams/400l-logo.jpg',
        //         players: [
        //             {
        //                 id: 12,
        //                 name: 'Grace Okafor',
        //                 number: 9,
        //                 position: 'Forward',
        //                 level: '400L',
        //                 image: 'images/players/grace-okafor.jpg',
        //                 stats: { goals: 6, assists: 1, matches: 5 },
        //                 skills: ['Finishing', 'Movement', 'Composure'],
        //                 available: true,
        //                 transferValue: '₦22,000',
        //                 isCaptain: true
        //             },
        //             {
        //                 id: 13,
        //                 name: 'Daniel White',
        //                 number: 4,
        //                 position: 'Defender',
        //                 level: '400L',
        //                 image: 'images/players/daniel-white.jpg',
        //                 stats: { tackles: 11, interceptions: 9, matches: 5 },
        //                 skills: ['Leadership', 'Tackling', 'Positioning'],
        //                 available: true,
        //                 transferValue: '₦15,000',
        //                 isCaptain: false
        //             },
        //             {
        //                 id: 14,
        //                 name: 'Kevin Lee',
        //                 number: 7,
        //                 position: 'Forward',
        //                 level: '400L',
        //                 image: 'images/players/kevin-lee.jpg',
        //                 stats: { goals: 3, assists: 4, matches: 5 },
        //                 skills: ['Speed', 'Crossing', 'Dribbling'],
        //                 available: true,
        //                 transferValue: '₦16,000',
        //                 isCaptain: false
        //             },
        //             {
        //                 id: 15,
        //                 name: 'Tom Harris',
        //                 number: 1,
        //                 position: 'Goalkeeper',
        //                 level: '400L',
        //                 image: null, // No image available
        //                 stats: { saves: 18, cleanSheets: 4, matches: 5 },
        //                 skills: ['Reflexes', 'Positioning', 'Distribution'],
        //                 available: true,
        //                 transferValue: '₦19,000',
        //                 isCaptain: false
        //             }
        //         ]
        //     }
        // ];

        this.filterTeams();
        this.renderTeams();
        this.hideLoading();
    }

    createPlayerCard(player) {
        const stats = player.stats || {};
        
        // Determine avatar content based on image availability
        const avatarContent = player.image 
            ? `<img src="${player.image}" alt="${player.name}" onerror="this.style.display='none'; this.parentElement.classList.remove('has-image');">`
            : `<i class="fas fa-user"></i>`;
        
        const avatarClass = player.image ? 'player-avatar has-image' : 'player-avatar';
        const captainClass = player.isCaptain ? 'captain' : '';

        return `
            <div class="player-card">
                <div class="player-header">
                    <div class="player-number">${player.number}</div>
                    <div class="player-position">${player.position}</div>
                </div>
                
                <div class="${avatarClass} ${captainClass}">
                    ${avatarContent}
                </div>
                
                <div class="player-info">
                    <div class="player-name">${player.name}</div>
                    <div class="player-level">${player.level}</div>
                </div>
                
                <div class="player-stats">
                    <div class="player-stat">
                        <span class="player-stat-value">${stats.goals || 0}</span>
                        <span class="player-stat-label">Goals</span>
                    </div>
                    <div class="player-stat">
                        <span class="player-stat-value">${stats.assists || 0}</span>
                        <span class="player-stat-label">Assists</span>
                    </div>
                    <div class="player-stat">
                        <span class="player-stat-value">${stats.matches || 0}</span>
                        <span class="player-stat-label">Matches</span>
                    </div>
                </div>
                
                ${player.skills && player.skills.length > 0 ? `
                    <div class="player-skills">
                        ${player.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                ` : ''}
                
                <div class="player-status">
                    <div class="${player.available ? 'status-available' : 'status-unavailable'}">
                        <i class="fas ${player.available ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                        ${player.available ? 'Available' : 'Unavailable'}
                    </div>
                    ${player.transferValue ? `
                        <div class="transfer-value">${player.transferValue}</div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    createTeamSection(team) {
        const teamLogo = team.logo 
            ? `<img src="${team.logo}" alt="${team.name} Logo" onerror="this.style.display='none';">`
            : `<i class="fas fa-users"></i>`;

        return `
            <div class="team-section" data-level="${team.level}">
                <div class="team-header">
                    <div class="team-title">
                        <div class="team-icon">
                            ${teamLogo}
                        </div>
                        <div>
                            <div class="team-name">${team.name}</div>
                            <div style="opacity: 0.8; font-size: 0.9rem;">${team.players.length} Players</div>
                        </div>
                    </div>
                    <div class="team-stats-header">
                        <div class="team-stat">
                            <span class="team-stat-number">${this.getTeamGoals(team)}</span>
                            <span class="team-stat-label">Goals</span>
                        </div>
                        <div class="team-stat">
                            <span class="team-stat-number">${this.getTeamAssists(team)}</span>
                            <span class="team-stat-label">Assists</span>
                        </div>
                        <div class="team-stat">
                            <span class="team-stat-number">${this.getAvailablePlayers(team)}</span>
                            <span class="team-stat-label">Available</span>
                        </div>
                    </div>
                </div>
                <div class="players-grid">
                    ${team.players.map(player => this.createPlayerCard(player)).join('')}
                </div>
            </div>
        `;
    }

    // ... rest of the methods remain the same
    setupEventListeners() {
        // Team filter buttons
        document.querySelectorAll('.team-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target.dataset.level);
            });
        });

        // Search input
        document.getElementById('playerSearch').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.filterTeams();
            this.renderTeams();
        });

        // Clear search
        document.getElementById('clearSearch').addEventListener('click', () => {
            document.getElementById('playerSearch').value = '';
            this.searchQuery = '';
            this.filterTeams();
            this.renderTeams();
        });
    }

    setActiveFilter(level) {
        this.currentFilter = level;
        
        // Update active button
        document.querySelectorAll('.team-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-level="${level}"]`).classList.add('active');

        this.filterTeams();
        this.renderTeams();
    }

    filterTeams() {
        if (this.currentFilter === 'all' && !this.searchQuery) {
            this.filteredTeams = this.teams;
            return;
        }

        this.filteredTeams = this.teams.filter(team => {
            // Filter by level
            if (this.currentFilter !== 'all' && team.level !== this.currentFilter) {
                return false;
            }

            // Filter by search query
            if (this.searchQuery) {
                const matchingPlayers = team.players.filter(player => 
                    player.name.toLowerCase().includes(this.searchQuery) ||
                    player.position.toLowerCase().includes(this.searchQuery)
                );
                return matchingPlayers.length > 0;
            }

            return true;
        }).map(team => {
            // Filter players within team if search query exists
            if (this.searchQuery) {
                return {
                    ...team,
                    players: team.players.filter(player =>
                        player.name.toLowerCase().includes(this.searchQuery) ||
                        player.position.toLowerCase().includes(this.searchQuery)
                    )
                };
            }
            return team;
        });
    }

    renderTeams() {
        const container = document.getElementById('teamsContainer');
        
        if (this.filteredTeams.length === 0) {
            container.innerHTML = `
                <div class="no-teams">
                    <i class="fas fa-users-slash"></i>
                    <h3>No teams found</h3>
                    <p>Try adjusting your filters or search terms.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredTeams.map(team => this.createTeamSection(team)).join('');
        this.updateStats();
    }

    getTeamGoals(team) {
        return team.players.reduce((total, player) => total + (player.stats?.goals || 0), 0);
    }

    getTeamAssists(team) {
        return team.players.reduce((total, player) => total + (player.stats?.assists || 0), 0);
    }

    getAvailablePlayers(team) {
        return team.players.filter(player => player.available).length;
    }

    updateStats() {
        const totalPlayers = this.teams.reduce((total, team) => total + team.players.length, 0);
        document.getElementById('totalPlayers').textContent = totalPlayers;
        document.getElementById('activeTeams').textContent = this.teams.length;
    }

    showLoading() {
        document.getElementById('loadingSpinner').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingSpinner').classList.add('hidden');
    }
}

// Initialize teams manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TeamsManager();
});