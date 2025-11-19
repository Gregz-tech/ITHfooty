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
        this.teams = [
            {
                level: '100L',
                name: '100 Level',
                color: '#f90303ff',
                logo: 'images/teams/100l-logo.jpg', // Add team logos later
                players: [
                    // {
                    //    id: 1,
                    //     name: 'MUHAMMED',
                    //     number: 1,
                    //     position: 'Goalkeeper',
                    //     level: '100L',
                    //     image: 'images/players/muhammed.jpg',
                    //     stats: { saves: 0, cleanSheets: 0, matches: 0},
                    //     // skills: ['Reflexes', 'Save', 'Leadership'],
                    //     available: true,
                    //     // transferValue: '₦2,000',
                    //     isCaptain: false
                    // },
                    //  {
                    //     id: 18,
                    //     name: 'DAMNEX',
                    //     number: 19,
                    //     position: 'STRIKER',
                    //     level: '100L',
                    //     image: null, // No image available
                    //     stats: { goals: 0, assists: 0, matches: 0 },
                    //     // skills: ['Shooting', 'Movement', 'Strength'],
                    //     available: true,
                    //     // transferValue: '₦1,000',
                    //     isCaptain: false
                    // }
                ]
            },
            {

                level: '200L',
                name: '200 Level',
                color: '#807a7aff',
                logo: 'images/teams/200l -logo.jpg', // Add team logos later
                players: [
                    {
                       id: 1,
                        name: 'MUHAMMED',
                        number: 1,
                        position: 'Goalkeeper',
                        level: '200L',
                        image: 'images/players/muhammed.jpg',
                        stats: { saves: 0, cleanSheets: 0, matches: 0},
                        // skills: ['Reflexes', 'Save', 'Leadership'],
                        available: true,
                        // transferValue: '₦2,000',
                        isCaptain: false
                    },
                    {
                        id: 2,
                        name: 'GREATNESS',
                        number: 2,
                        position: 'Defender',
                        level: '200L',
                        image: 'images/players/greatness.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Speed', 'Dribbling', 'Finishing'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: false
                    },
                    {
                        id: 3,
                        name: 'AYODEJI',
                        number: 3,
                        position: 'Defender',
                        level: '200L',
                        image:  'images/players/ayodeji.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Tackling', 'Strength', 'Aerial'],
                        available: true,
                        // transferValue: '₦10,000',
                        isCaptain: false
                    },
                    {
                        id: 4,
                        name: 'JAMAL',
                        number: 4,
                        position: 'Denfender',
                        level: '200L',
                        image: 'images/players/jamal.jpg',
                        stats: { passes: 0, assists: 0, matches: 0 },
                        // skills: ['Passing', 'Vision', 'Creativity'],
                        available: true,
                        // transferValue: '₦2,000',
                        isCaptain: false
                    },
                    {
                        id: 5,
                        name: 'CYB TRIPLE A',
                        number: 5,
                        position: 'Defender',
                        level: '200L',
                        image:  'images/players/tripleA.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 6,
                        name: 'JOSHUA',
                        number: 14,
                        position: 'Defender',
                        level: '200L',
                        image: 'images/players/joshua.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 7,
                        name: 'DELSQUARE ',
                        number: 18,
                        position: 'Defender',
                        level: '200L',
                        image:  'images/players/delsquare.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 8,
                        name: 'ADDMORE',
                        number: 29,
                        position: 'Defender',
                        level: '200L',
                        image:  'images/players/addmore.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 9,
                        name: 'ABU',
                        number: 26,
                        position: 'Defender',
                        level: '200L',
                        image:  'images/players/abu.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: true
                    },
                     {
                        id: 10,
                        name: 'BEN',
                        number: 6,
                        position: 'Midfielder',
                        level: '200L',
                        image:  'images/players/ben.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 11,
                        name: 'JAVA',
                        number: 8,
                        position: 'Midfielder',
                        level: '200L',
                        image:  'images/players/java.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 12,
                        name: 'TIMI',
                        number: 10,
                        position: 'Midfielder',
                        level: '200L',
                        image:  'images/players/timi.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 13,
                        name: 'ADEWALE ',
                        number: 30,
                        position: 'Midfielder',
                        level: '200L',
                        image:  'images/players/adewale.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 14,
                        name: 'FAHD',
                        number: 27,
                        position: 'Midfielder',
                        level: '200L',
                        image:  'images/players/fahd.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 15,
                        name: 'AYOMIPOSI',
                        number: 7,
                        position: 'STRIKER',
                        level: '200L',
                        image: 'images/players/posi.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 16,
                        name: 'OPE',
                        number: 9,
                        position: 'STRIKER',
                        level: '200L',
                        image: 'images/players/ope.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 17,
                        name: 'PAIN TENDO ',
                        number: 17,
                        position: 'STRIKER',
                        level: '200L',
                        image:  'images/players/tendo.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: false,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 18,
                        name: 'DAMNEX',
                        number: 19,
                        position: 'STRIKER',
                        level: '200L',
                        image:  'images/players/damnex.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: false,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    }
                ]
            },
            
             {

                level: '300L',
                name: '300 Level',
                color: '#000',
                logo: 'images/300Lplayers/logo.jpg', 
                players: [
                    {
                       id: 1,
                        name: 'AYOMIDE',
                        number: 1,
                        position: 'Goalkeeper',
                        level: '300L',
                        image: 'images/300Lplayers/ayomide.jpg',
                        stats: { saves: 0, cleanSheets: 0, matches: 0},
                        // skills: ['Reflexes', 'Save', 'Leadership'],
                        available: true,
                        // transferValue: '₦2,000',
                        isCaptain: false
                    },
                    {
                        id: 2,
                        name: 'TESLIM',
                        number: 6,
                        position: 'Defender',
                        level: '300L',
                        image: '/images/300Lplayers/teslim.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Speed', 'Dribbling', 'Finishing'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: false
                    },
                    {
                        id: 3,
                        name: 'RIDWAN',
                        number: 2,
                        position: 'Defender',
                        level: '300L',
                        image: '/images/300Lplayers/ridwan.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Tackling', 'Strength', 'Aerial'],
                        available: true,
                        // transferValue: '₦10,000',
                        isCaptain: false
                    },
                    {
                        id: 4,
                        name: 'FAVOUR',
                        number: 3,
                        position: 'Denfender',
                        level: '300L',
                        image: 'images/300Lplayers/favour.jpg',
                        stats: { passes: 0, assists: 0, matches: 0 },
                        // skills: ['Passing', 'Vision', 'Creativity'],
                        available: true,
                        // transferValue: '₦2,000',
                        isCaptain: false
                    },
                    {
                        id: 5,
                        name: 'TOMZY',
                        number: 5,
                        position: 'Defender',
                        level: '300L',
                        image: '/images/300Lplayers/tomzy.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 6,
                        name: 'AJAKAYE',
                        number: 14,
                        position: 'Defender',
                        level: '300L',
                        image: '/images/300Lplayers/ajakaye.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     
                     {
                        id: 7,
                        name: 'M17',
                        number: 4,
                        position: 'Midfielder',
                        level: '300L',
                        image: '/images/300Lplayers/m17.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 8,
                        name: 'AYOBAMI',
                        number: 10,
                        position: 'Midfielder',
                        level: '300L',
                         image: '/images/300Lplayers/ayobami.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: true
                    },
                     {
                        id: 9,
                        name: 'KAYODE',
                        number: 8,
                        position: 'Midfielder',
                        level: '300L',
                         image: '/images/300Lplayers/kayode.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                    {
                        id: 10,
                        name: 'KAMALDEEN',
                        number: 17,
                        position: 'Midfielder',
                        level: '300L',
                         image: '/images/300Lplayers/kamaldeen.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                    
                     {
                        id: 11,
                        name: 'VICTOR',
                        number: 9,
                        position: 'STRIKER',
                        level: '300L',
                         image: '/images/300Lplayers/victor.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 12,
                        name: 'ABIODUN',
                        number: 19,
                        position: 'STRIKER',
                        level: '300L',
                        image: '/images/300Lplayers/abiodun.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 13,
                        name: 'GREG',
                        number: 11,
                        position: 'STRIKER',
                        level: '300L',
                       image: '/images/300Lplayers/greg.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    },
                     {
                        id: 14,
                        name: 'THAOBAN',
                        number: 7,
                        position: 'STRIKER',
                        level: '300L',
                        image: '/images/300Lplayers/thaoban.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Shooting', 'Movement', 'Strength'],
                        available: true,
                        // transferValue: '₦1,000',
                        isCaptain: false
                    }
                ]
            },
            
    
            {
                level: '400L',
                name: '400 Level',
                color: '#00ff',
                logo: 'images/teams/400l-logo.jpg',
                players: [
                    {
                        id: 1,
                        name: 'ADU',
                        number: 1,
                        position: 'Goalkeeper',
                        level: '400L',
                        image: 'images/400Lplayers/adu.jpg',
                        stats: { goals: 0, assists: 0, matches: 0 },
                        // skills: ['Finishing', 'Movement', 'Composure'],
                        available: true,
                        // transferValue: '₦22,000',
                        isCaptain: false
                    },
                    {
                        id: 2,
                        name: 'PEEPEE',
                        number: 2,
                        position: 'Defender',
                        level: '400L',
                        image: 'images/400Lplayers/peepee.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Leadership', 'Tackling', 'Positioning'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: false
                    },
                      {
                        id: 3,
                        name: 'QUANTUM',
                        number: 3,
                        position: 'Defender',
                        level: '400L',
                        image: 'images/400Lplayers/quantum.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Leadership', 'Tackling', 'Positioning'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: false
                    },
                        {
                        id: 4,
                        name: 'OSHA',
                        number: 4,
                        position: 'Defender',
                        level: '400L',
                        image: 'images/400Lplayers/osha.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Leadership', 'Tackling', 'Positioning'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: false
                    },
                        {
                        id: 5,
                        name: 'ARAB',
                        number: 5,
                        position: 'Defender',
                        level: '400L',
                        image: 'images/400Lplayers/arab.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Leadership', 'Tackling', 'Positioning'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: false
                    },
                        {
                        id: 6,
                        name: 'FERANMI',
                        number: 14,
                        position: 'Defender',
                        level: '400L',
                        image: 'images/400Lplayers/feranmi.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Leadership', 'Tackling', 'Positioning'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: false
                    },
                        {
                        id: 7,
                        name: 'MARVEL',
                        number: 18,
                        position: 'Defender',
                        level: '400L',
                        image: 'images/400Lplayers/marvel.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Leadership', 'Tackling', 'Positioning'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: false
                    },
                        {
                        id: 8,
                        name: 'LEKKY SAM',
                        number: 90,
                        position: 'Defender',
                        level: '400L',
                        image: 'images/400Lplayers/lekky-sam.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Leadership', 'Tackling', 'Positioning'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: false
                    },
                        {
                        id: 9,
                        name: 'JAMIKE',
                        number: 6,
                        position: 'Midfielder',
                        level: '400L',
                        image: 'images/400Lplayers/jamike.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Leadership', 'Tackling', 'Positioning'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: true
                    },
                    {
                        id: 10,
                        name: 'KAYODE',
                        number: 8,
                        position: 'Midfielder',
                        level: '400L',
                        image: 'images/400Lplayers/kayode.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Leadership', 'Tackling', 'Positioning'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: false
                    },
                    {
                        id: 11,
                        name: 'YASEER',
                        number: 10,
                        position: 'Midfielder',
                        level: '400L',
                        image: 'images/400Lplayers/yaseer.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Leadership', 'Tackling', 'Positioning'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: false
                    },
                    {
                        id: 12,
                        name: 'JOBA',
                        number: 30,
                        position: 'Midfielder',
                        level: '400L',
                        image: 'images/400Lplayers/joba.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Leadership', 'Tackling', 'Positioning'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: false
                    },
                     {
                        id: 13,
                        name: 'VINCENT',
                        number: 7,
                        position: 'STRIKER',
                        level: '400L',
                        image: 'images/400Lplayers/striker.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Leadership', 'Tackling', 'Positioning'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: false
                    },
                     {
                        id: 14,
                        name: 'IFE',
                        number: 11,
                        position: 'STRIKER',
                        level: '400L',
                        image: 'images/400Lplayers/ife.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Leadership', 'Tackling', 'Positioning'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: false
                    },
                    {
                        id: 15,
                        name: 'ELOYCE',
                        number: 9,
                        position: 'STRIKER',
                        level: '400L',
                        image: 'images/400Lplayers/eloyce.jpg',
                        stats: { tackles: 0, interceptions: 0, matches: 0 },
                        // skills: ['Leadership', 'Tackling', 'Positioning'],
                        available: true,
                        // transferValue: '₦15,000',
                        isCaptain: false
                    },
                ]
            }
        ];

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