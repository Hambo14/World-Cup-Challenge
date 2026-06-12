/**
 * World Cup API Data Mapper
 * Transforms World Cup 2026 API data to match application format
 */

/**
 * Map World Cup API team data to application format
 * @param {Array} teams - Teams from World Cup API
 * @param {Array} playerTeamMap - Mapping of players to their teams
 * @returns {Array} Formatted player data with teams
 */
export function mapTeamsToPlayers(teams, playerTeamMap) {
  // playerTeamMap format: { playerName: ['Team 1', 'Team 2', ...] }
  
  const players = [];
  
  Object.entries(playerTeamMap).forEach(([playerName, assignedTeams]) => {
    const playerTeams = assignedTeams.map(teamName => {
      const team = teams.find(
        t => t.name_en?.toLowerCase() === teamName.toLowerCase() ||
             t.name_fa === teamName
      );
      
      return {
        name: teamName,
        id: team?.id,
        isShitter: false, // Marked by the app, not from API
      };
    });
    
    players.push({
      name: playerName,
      teams: playerTeams,
    });
  });
  
  return players;
}

/**
 * Map World Cup API match data to application format
 * @param {Array} matches - Matches from World Cup API
 * @returns {Array} Formatted match data
 */
export function mapAPIMatches(matches) {
  return (matches || [])
    .filter(match => match.finished !== 'FALSE' || match.home_score > 0 || match.away_score > 0)
    .map((match) => {
      const homeGoals = parseInt(match.home_score, 10) || 0;
      const awayGoals = parseInt(match.away_score, 10) || 0;

      return {
        id: match.id,
        stage: getStageFromGroup(match.group),
        homeTeam: match.home_team_id,
        awayTeam: match.away_team_id,
        homeGoals,
        awayGoals,
        progressedTeams:
          homeGoals > awayGoals
            ? [match.home_team_id]
            : awayGoals > homeGoals
              ? [match.away_team_id]
              : [],
        date: match.local_date,
        group: match.group,
        matchday: match.matchday,
        stadiumId: match.stadium_id,
        finished: match.finished === 'TRUE',
      };
    });
}

/**
 * Convert World Cup API team ID to team name
 * @param {string} teamId - Team ID from API
 * @param {Array} teams - Teams data from API
 * @returns {string} Team name
 */
export function getTeamNameById(teamId, teams) {
  const team = teams.find(t => t.id === teamId || t.id === parseInt(teamId));
  return team?.name_en || teamId;
}

/**
 * Determine tournament stage from group designation
 * @param {string} group - Group letter (A-L) or knockout identifier
 * @returns {string} Stage name (pool, round-of-16, etc.)
 */
export function getStageFromGroup(group) {
  if (!group) return 'unknown';
  
  // Group stage (A-L)
  if (/^[A-L]$/.test(group)) {
    return 'pool';
  }
  
  // Knockout stages
  const stageMap = {
    'Round of 32': 'round-of-32',
    'Round of 16': 'round-of-16',
    'Quarter-finals': 'quarter-final',
    'Semifinals': 'semi-final',
    'Third Place': 'third-place',
    'Final': 'final',
  };
  
  return stageMap[group] || group.toLowerCase();
}

/**
 * Get group from tournament stage
 * @param {string} stage - Tournament stage
 * @returns {string} Group letter or stage name
 */
export function getGroupFromStage(stage) {
  const groupMap = {
    'pool': 'A',
    'round-of-32': 'Round of 32',
    'round-of-16': 'Round of 16',
    'quarter-final': 'Quarter-finals',
    'semi-final': 'Semifinals',
    'third-place': 'Third Place',
    'final': 'Final',
  };
  
  return groupMap[stage] || stage;
}

/**
 * Create a team lookup map for quick access
 * @param {Array} teams - Teams from API
 * @returns {Map} Map of team ID to team object
 */
export function createTeamLookupMap(teams) {
  const map = new Map();
  
  teams.forEach(team => {
    map.set(team.id, team);
    map.set(team.name_en, team);
    map.set(team.fifa_code, team);
  });
  
  return map;
}

/**
 * Format match score display
 * @param {Object} match - Match object
 * @param {Array} teams - Teams lookup
 * @returns {string} Formatted score string
 */
export function formatMatchScore(match, teams) {
  const homeTeam = getTeamNameById(match.homeTeam, teams);
  const awayTeam = getTeamNameById(match.awayTeam, teams);
  
  if (!match.finished) {
    return `${homeTeam} vs ${awayTeam}`;
  }
  
  return `${homeTeam} ${match.homeGoals} - ${match.awayGoals} ${awayTeam}`;
}
