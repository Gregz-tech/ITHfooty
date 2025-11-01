class FixturesManager {
    constructor() {
        this.fixtures = [];
        this.standings = {};
        this.currentFilters = {
            matchDay: 'all',
            status: 'all',
            team: 'all'
        };
        this.init();
    }

    init() {
        this.loadFixturesData();
        this.setupEventListeners();
        this.updateLastUpdated();
    }

    async loadFixturesData() {
        this.showLoading();
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Sample fixtures data
        this.fixtures = [
            {
                id: 1,
                matchDay: 1,
                date: '2025-11-26',
                time: '03:00',
                teamA: { name: '200 Level', level: 'ASH', score: null },
                teamB: { name: '400 Level', level: 'BLUE', score: null },
                venue: 'College Field',
                status: 'upcoming',
                group: 'A'
            },
            {
               id: 1,
                matchDay: 1,
                date: '2025-11-28',
                time: '03:00',
                teamA: { name: '100 Level', level: '---', score: null },
                teamB: { name: '300 Level', level: 'BLACK', score: null },
                venue: 'College Field',
                status: 'upcoming',
                group: 'A'
            },
            {
                id: 2,
                matchDay: 2,
                date: '2025-12-03',
                time: '3:00',
                teamA: { name: '300 Level', level: 'BLACK', score: null },
                teamB: { name: '200 Level', level: 'ASH', score: null },
                venue: 'College Field',
                status: 'upcoming',
                group: 'A'
            },
             {
                id: 2,
                matchDay: 2,
                date: '2025-12-05',
                time: '10:00',
                teamA: { name: '400 Level', level: 'BLUE', score: null },
                teamB: { name: '100 Level', level: '---', score: null },
                venue: 'College Field',
                status: 'upcoming',
                group: 'A'
            },
            {
                id: 3,
                matchDay: 3,
                date: '2025-12-10',
                time: '11:00',
                teamA: { name: '300 Level', level: 'BLACK', score: null },
                teamB: { name: '400 Level', level: 'BLUE', score: null },
                venue: 'College Field',
                status: 'upcoming',
                group: 'A'
            },
             {
                id: 3,
                matchDay: 3,
                date: '2025-12-12',
                time: '11:00',
                teamA: { name: '100 Level', level: '---', score: null },
                teamB: { name: '200 Level', level: 'ASH', score: null },
                venue: 'College Field',
                status: 'upcoming',
                group: 'A'
            },
         
         
        ];

        // Sample standings data
        this.standings = {
            A: [
                { position: 1, team: '100 Level', level: '---', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: ['W'] },
                { position: 2, team: '200 Level', level: 'ASH', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: ['L'] },
                { position: 3, team: '300 Level', level: 'BLACK', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: [] },
                { position: 4, team: '400 Level', level: 'BLUE', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: [] }
            ],
            // B: [
            //     { position: 1, team: '300 Level', level: '300L', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: [] },
            //     { position: 2, team: '400 Level', level: '400L', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: [] },
            //     { position: 3, team: '100 Level', level: '100L', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: [] },
            //     { position: 4, team: '200 Level', level: '200L', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: [] }
            // ],
            // C: [
            //     { position: 1, team: '100 Level', level: '100L', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: [] },
            //     { position: 2, team: '200 Level', level: '200L', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: [] },
            //     { position: 3, team: '300 Level', level: '300L', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: [] },
            //     { position: 4, team: '400 Level', level: '400L', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: [] }
            // ],
            // D: [
            //     { position: 1, team: '100 Level', level: '100L', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: [] },
            //     { position: 2, team: '200 Level', level: '200L', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: [] },
            //     { position: 3, team: '300 Level', level: '300L', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: [] },
            //     { position: 4, team: '400 Level', level: '400L', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, form: [] }
            // ]
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

        return `
            <div class="match-card ${fixture.status}">
                <div class="match-header">
                    <div class="match-meta">
                        <span class="match-day">Match Day ${fixture.matchDay}</span>
                        <span class="match-date">${formattedDate}</span>
                        <span class="match-status status-${fixture.status}">
                            ${fixture.status.charAt(0).toUpperCase() + fixture.status.slice(1)}
                        </span>
                    </div>
                </div>
                
                <div class="match-content">
                    <div class="team">
                        <div class="team-logo">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="team-name">${fixture.teamA.name}</div>
                        <div class="team-level">${fixture.teamA.level}</div>
                    </div>
                    
                    <div class="match-score">
                        <span class="score-team-a">${fixture.teamA.score !== null ? fixture.teamA.score : '-'}</span>
                        <span class="score-divider">:</span>
                        <span class="score-team-b">${fixture.teamB.score !== null ? fixture.teamB.score : '-'}</span>
                        <div class="match-time">${fixture.time}</div>
                    </div>
                    
                    <div class="team">
                        <div class="team-logo">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="team-name">${fixture.teamB.name}</div>
                        <div class="team-level">${fixture.teamB.level}</div>
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
                </div>
            </div>
        `;
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
                                                <div class="team-level">${team.level}</div>
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

    showLoading() {
        document.getElementById('loadingSpinner').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingSpinner').classList.add('hidden');
    }
}

// Initialize fixtures manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FixturesManager();
});