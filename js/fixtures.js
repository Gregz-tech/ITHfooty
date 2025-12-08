class FixturesManager {
    constructor() {
        this.fixtures = [];
        this.standings = {};
        this.currentFilters = {
            matchDay: 'all',
            status: 'all',
            team: 'all'
        };
        this.isInitialized = false;
    }

    async init() {
        try {
            await this.loadFixturesData();
            this.setupEventListeners();
            this.setupModal();
            this.updateLastUpdated();
            this.isInitialized = true;
            
            setTimeout(() => {
                this.revealSections();
            }, 100);
            
        } catch (error) {
            console.error('Failed to initialize fixtures manager:', error);
            this.showError('Failed to load fixtures data');
        }
    }

    revealSections() {
        document.querySelectorAll('.section-hidden').forEach(section => {
            section.classList.remove('section-hidden');
            section.classList.add('section-visible');
        });
    }

    async loadFixturesData() {
        this.showLoading();
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Enhanced fixtures data with statistics
        this.fixtures = [
            {
                id: 1,
                matchDay: 1,
                date: '2025-11-26',
                time: 'FT',
                teamA: { 
                    name: '200 Level', 
                    level: 'ASH', 
                    score: 2,
                    shortName: '200L',
                    logo: null,
                    stats: { possession: 60, shots: 12, shotsOnTarget: 6, fouls: 2, corners: 5 }
                },
                teamB: { 
                    name: '400 Level', 
                    level: 'BLUE', 
                    score: 2,
                    shortName: '400L',
                    logo: null,
                    stats: { possession: 40, shots: 7, shotsOnTarget: 4, fouls: 1, corners: 3 }
                },
                venue: 'Bisi Akande',
                status: 'completed',
                group: 'A',
                referee: 'FINISHER (BMB)',
                statistics: {
                    attendance: 317,
                    temperature: '',
                    condition: ''
                }
            },
            {
                id: 2,
                matchDay: 2,
                date: '2025-11-28',
                time: 'FT',
                teamA: { 
                    name: '100 Level', 
                    level: 'RED', 
                    score: 1,
                    shortName: '100L',
                    logo: null,
                    stats: { possession: 45, shots: 0, shotsOnTarget: 0, fouls: 0, corners: 0 }
                },
                teamB: { 
                    name: '300 Level', 
                    level: 'BLACK', 
                    score: 3,
                    shortName: '300L',
                    logo: null,
                    stats: { possession: 55, shots: 0, shotsOnTarget: 0, fouls: 0, corners: 0 }
                },
               venue: 'Bisi Akande',
                status: 'completed',
                group: 'A',
                referee: 'BEN (NUR)',
                statistics: {
                    attendance: '219',
                    temperature: '',
                    condition: ''
                }
            },
            {
                id: 3,
                matchDay: 3,
                date: '2025-12-03',
                time: 'FT',
                teamA: { 
                    name: '300 Level', 
                    level: 'BLACK', 
                    score: 2,
                    shortName: '300L',
                    logo: null,
                    stats: { possession: 0, shots: 0, shotsOnTarget: 0, fouls: 0, corners: 0 }
                },
                teamB: { 
                    name: '200 Level', 
                    level: 'ASH', 
                    score: 5,
                    shortName: '200L',
                    logo: null,
                    stats: { possession: 0, shots: 0, shotsOnTarget: 0, fouls: 0, corners: 0 }
                },
                venue: 'Bisi Akande',
                status: 'completed',
                group: 'A',
                referee: 'FABRIZIO (MBBS)',
                statistics: {
                    attendance: 37,
                    temperature: '',
                    condition: ''
                }
            },
            {
                id: 4,
                matchDay: 4,
                date: '2025-12-05',
                time: 'FT',
                teamA: { 
                    name: '400 Level', 
                    level: 'BLUE', 
                    score: 1,
                    shortName: '400L',
                    logo: null,
                    stats: { possession: 0, shots: 0, shotsOnTarget: 0, fouls: 0, corners: 0 }
                },
                teamB: { 
                    name: '100 Level', 
                    level: 'RED', 
                    score: 1,
                    shortName: '100L',
                    logo: null,
                    stats: { possession: 0, shots: 0, shotsOnTarget: 0, fouls: 0, corners: 0 }
                },
                venue: 'Bisi Akande',
                status: 'completed',
                group: 'A',
                referee: 'FINISHER',
                statistics: {
                    attendance: 0,
                    temperature: '',
                    condition: ''
                }
            },
          
            {
                id: 5,
                matchDay: 5,
                date: '2025-12-10',
                time: '1:30',
                teamA: { 
                    name: '100 Level', 
                    level: 'RED', 
                    score: null,
                    shortName: '100L',
                    logo: null,
                    stats: { possession: 0, shots: 0, shotsOnTarget: 0, fouls: 0, corners: 0 }
                },
                teamB: { 
                    name: '200 Level', 
                    level: 'ASH', 
                    score: null,
                    shortName: '200L',
                    logo: null,
                    stats: { possession: 0, shots: 0, shotsOnTarget: 0, fouls: 0, corners: 0 }
                },
                venue: 'Bisi Akande',
                status: 'upcoming',
                group: 'A',
                referee: 'FINISHER (BMB)',
                statistics: {
                    attendance: 0,
                    temperature: '',
                    condition: ''
                }
            },

              {
                id: 6,
                matchDay: 5,
                date: '2025-12-10',
                time: '3:30',
                teamA: { 
                    name: '300 Level', 
                    level: 'BLACK', 
                    score: null,
                    shortName: '300L',
                    logo: null,
                    stats: { possession: 0, shots: 0, shotsOnTarget: 0, fouls: 0, corners: 0 }
                },
                teamB: { 
                    name: '400 Level', 
                    level: 'BLUE', 
                    score: null,
                    shortName: '400L',
                    logo: null,
                    stats: { possession: 0, shots: 0, shotsOnTarget: 0, fouls: 0, corners: 0 }
                },
                venue: 'Bisi Akande',
                status: 'upcoming',
                group: 'A',
                referee: 'BEN (NUR)',
                statistics: {
                    attendance: 0,
                    temperature: '',
                    condition: ''
                }
            }
        ];

        // Standings data
        this.standings = {
            A: [
                { position: 1, team: '200 Level', level: 'ASH', played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 4, goalDifference: 3, points: 4, form: ['D','W'] },
                { position: 2, team: '300 Level', level: 'BLACK', played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 6, goalDifference: -1, points: 3, form: ['W', 'L'] },
                { position: 3, team: '400 Level', level: 'BLUE', played: 2, won: 0, drawn: 2, lost: 0, goalsFor: 3, goalsAgainst: 3, goalDifference: 0, points: 2, form: ['D', 'D'] },
                { position: 4, team: '100 Level', level: 'RED', played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 4, goalDifference: -2, points: 1, form: ['L', 'D'] }
                
            ],
        };
        
        this.renderFixtures();
        this.renderStandings();
        this.hideLoading();
    }

    setupEventListeners() {
        // Filter event listeners
        document.getElementById('matchDayFilter').addEventListener('change', (e) => {
            this.currentFilters.matchDay = e.target.value;
            this.renderFixtures();
        });

        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.currentFilters.status = e.target.value;
            this.renderFixtures();
        });

        document.getElementById('teamFilter').addEventListener('change', (e) => {
            this.currentFilters.team = e.target.value;
            this.renderFixtures();
        });

        // Refresh button
        document.getElementById('refreshFixtures').addEventListener('click', () => {
            this.loadFixturesData();
            this.updateLastUpdated();
        });

        // Group tabs
        document.querySelectorAll('.group-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchGroupTab(e.target.dataset.group);
            });
        });

        window.addEventListener('resize', () => {
            this.debounce(() => {
                this.renderFixtures();
            }, 250)();
        });
    }

    setupModal() {
        const modal = document.getElementById('matchModal');
        const closeBtn = document.getElementById('closeModal');

        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    renderFixtures() {
        const container = document.getElementById('fixturesContainer');
        const filteredFixtures = this.filterFixtures();

        if (filteredFixtures.length === 0) {
            container.innerHTML = `
                <div class="no-matches">
                    <i class="fas fa-calendar-times"></i>
                    <h3>No matches found</h3>
                    <p>Try adjusting your filters to see more matches.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredFixtures.map(fixture => this.createMatchCard(fixture)).join('');
        
        // Add click listeners to match cards
        container.querySelectorAll('.match-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.showMatchStatistics(filteredFixtures[index]);
            });
        });
    }

    filterFixtures() {
        return this.fixtures.filter(fixture => {
            const matchDayMatch = this.currentFilters.matchDay === 'all' || 
                                fixture.matchDay.toString() === this.currentFilters.matchDay;
            
            const statusMatch = this.currentFilters.status === 'all' || 
                              fixture.status === this.currentFilters.status;
            
            const teamMatch = this.currentFilters.team === 'all' || 
                            fixture.teamA.level === this.currentFilters.team || 
                            fixture.teamB.level === this.currentFilters.team;

            return matchDayMatch && statusMatch && teamMatch;
        });
    }

    createMatchCard(fixture) {
        const matchDate = new Date(fixture.date);
        const formattedDate = matchDate.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });

        const isMobile = window.innerWidth <= 768;
        const teamNameClass = isMobile ? 'team-name mobile' : 'team-name';
        const matchDayText = isMobile ? `MD${fixture.matchDay}` : `Match Day ${fixture.matchDay}`;

        // Team logo or placeholder
        const teamALogo = this.getTeamLogo(fixture.teamA);
        const teamBLogo = this.getTeamLogo(fixture.teamB);

        return `
            <div class="match-card ${fixture.status}" data-match-id="${fixture.id}">
                <div class="match-header">
                    <div class="match-meta">
                        <span class="match-day">${matchDayText}</span>
                        <span class="match-date">${formattedDate}</span>
                        <span class="match-status status-${fixture.status}">
                            ${this.getStatusText(fixture.status)}
                        </span>
                    </div>
                </div>
                
                <div class="match-content">
                    <div class="team">
                        <div class="team-logo">
                            ${teamALogo}
                        </div>
                        <div class="${teamNameClass}">${fixture.teamA.name}</div>
                        <div class="team-level ${fixture.teamA.level.toLowerCase()}">${fixture.teamA.level}</div>
                    </div>
                    
                    <div class="match-score">
                        <span class="score-team-a">${fixture.teamA.score !== null ? fixture.teamA.score : '-'}</span>
                        <span class="score-divider">:</span>
                        <span class="score-team-b">${fixture.teamB.score !== null ? fixture.teamB.score : '-'}</span>
                        <div class="match-time">${fixture.time}</div>
                    </div>
                    
                    <div class="team">
                        <div class="team-logo">
                            ${teamBLogo}
                        </div>
                        <div class="${teamNameClass}">${fixture.teamB.name}</div>
                        <div class="team-level ${fixture.teamB.level.toLowerCase()}">${fixture.teamB.level}</div>
                    </div>
                </div>
                
                <div class="match-info">
                    <div class="match-venue">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${fixture.venue}</span>
                    </div>
                    <div class="match-group">
                        <i class="fas fa-layer-group"></i>
                        <span>Group ${fixture.group}</span>
                    </div>
                    <div class="match-referee">
                        <i class="material-icons">sports</i>
                        <span>${fixture.referee || 'TBA'}</span>
                    </div>
                </div>
            </div>
        `;
    }

    getTeamLogo(team) {
        // If you have actual logo images, use this:
        // if (team.logo) {
        //     return `<img src="${team.logo}" alt="${team.name}" class="team-logo-img">`;
        // }
        
        // Otherwise use colored placeholder with initials
        const initials = team.shortName || team.name.split(' ').map(word => word[0]).join('');
        const colorClass = team.level.toLowerCase();
        return `<div class="team-logo-placeholder ${colorClass}">${initials}</div>`;
    }

    showMatchStatistics(fixture) {
        const modal = document.getElementById('matchModal');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');

        title.textContent = `${fixture.teamA.name} vs ${fixture.teamB.name}`;
        
        body.innerHTML = `
            <div class="stats-overview">
                <div class="match-score-large">
                    <span class="score">${fixture.teamA.score !== null ? fixture.teamA.score : '-'}</span>
                    <span class="divider">-</span>
                    <span class="score">${fixture.teamB.score !== null ? fixture.teamB.score : '-'}</span>
                </div>
                <div class="match-status-badge status-${fixture.status}">
                    ${this.getStatusText(fixture.status)}
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">${fixture.teamA.stats.possession}%</div>
                    <div class="stat-label">Possession</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${fixture.teamB.stats.possession}%</div>
                    <div class="stat-label">Possession</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${fixture.teamA.stats.shots}</div>
                    <div class="stat-label">Shots</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${fixture.teamB.stats.shots}</div>
                    <div class="stat-label">Shots</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${fixture.teamA.stats.shotsOnTarget}</div>
                    <div class="stat-label">Shots on Target</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${fixture.teamB.stats.shotsOnTarget}</div>
                    <div class="stat-label">Shots on Target</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${fixture.teamA.stats.fouls}</div>
                    <div class="stat-label">Fouls</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${fixture.teamB.stats.fouls}</div>
                    <div class="stat-label">Fouls</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${fixture.teamA.stats.corners}</div>
                    <div class="stat-label">Corners</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${fixture.teamB.stats.corners}</div>
                    <div class="stat-label">Corners</div>
                </div>
            </div>

            <div class="match-details">
                <div class="detail-item">
                    <strong>Venue:</strong> ${fixture.venue}
                </div>
                <div class="detail-item">
                    <strong>Referee:</strong> ${fixture.referee}
                </div>
                <div class="detail-item">
                    <strong>Attendance:</strong> ${fixture.statistics.attendance}
                </div>
                <div class="detail-item">
                    <strong>Weather:</strong> ${fixture.statistics.temperature}, ${fixture.statistics.condition}
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('matchModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    renderStandings() {
        Object.keys(this.standings).forEach(group => {
            const container = document.getElementById(`group${group}Standings`);
            const groupData = this.standings[group];

            container.innerHTML = `
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Team</th>
                                <th>P</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>GF</th>
                                <th>GA</th>
                                <th>GD</th>
                                <th>Pts</th>
                                <th>Form</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${groupData.map(team => `
                                <tr>
                                    <td class="stats-cell">${team.position}</td>
                                    <td>
                                        <div class="team-cell">
                                            <span class="team-position">${team.position}</span>
                                            <div class="team-badge">
                                                <i class="fas fa-users"></i>
                                            </div>
                                            <div>
                                                <div class="team-name">${team.team}</div>
                                                <div class="team-level" data-level="${team.level}">${team.level}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="stats-cell">${team.played}</td>
                                    <td class="stats-cell">${team.won}</td>
                                    <td class="stats-cell">${team.drawn}</td>
                                    <td class="stats-cell">${team.lost}</td>
                                    <td class="stats-cell">${team.goalsFor}</td>
                                    <td class="stats-cell">${team.goalsAgainst}</td>
                                    <td class="stats-cell">${team.goalDifference > 0 ? '+' : ''}${team.goalDifference}</td>
                                    <td class="stats-cell" style="font-weight: 700; color: var(--accent-primary);">${team.points}</td>
                                    <td>
                                        <div class="form-cell">
                                            ${team.form.map(result => `
                                                <div class="form-indicator form-${result.toLowerCase()}"></div>
                                            `).join('')}
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        });
    }

    switchGroupTab(group) {
        // Update active tab
        document.querySelectorAll('.group-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-group="${group}"]`).classList.add('active');

        // Show corresponding standings
        document.querySelectorAll('.standings-table').forEach(table => {
            table.classList.add('hidden');
        });
        document.getElementById(`group${group}Standings`).classList.remove('hidden');
    }

    updateLastUpdated() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        document.getElementById('lastUpdatedTime').textContent = timeString;
        document.getElementById('lastUpdateDate').textContent = dateString;
    }

    showError(message) {
        const container = document.getElementById('fixturesContainer');
        container.innerHTML = `
            <div class="no-matches">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error Loading Data</h3>
                <p>${message}</p>
                <button class="btn btn-outline" onclick="location.reload()">
                    <i class="fas fa-redo"></i>
                    Try Again
                </button>
            </div>
        `;
    }

    showLoading() {
        document.getElementById('loadingSpinner').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingSpinner').classList.add('hidden');
    }

    getStatusText(status) {
        const statusMap = {
            'upcoming': 'UPCOMING',
            'live': 'LIVE',
            'completed': 'FT',
            'postponed': 'PPD'
        };
        return statusMap[status] || status.toUpperCase();
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize fixtures manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const fixturesManager = new FixturesManager();
    fixturesManager.init();
});