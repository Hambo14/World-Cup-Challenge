/**
 * Transform World Cup API match data to app match format
 * 
 * Input format (from World Cup 2026 API):
 * {
 *   home_team_name_en: "Mexico",
 *   away_team_name_en: "South Africa", 
 *   home_score: "2",
 *   away_score: "0",
 *   finished: "TRUE",
 *   type: "group",
 *   group: "A"
 * }
 */
export async function transformAPIMatches(apiMatches) {
  if (!apiMatches || !Array.isArray(apiMatches)) {
    return [];
  }

  return apiMatches
    .filter(match => match.finished === 'TRUE' || match.finished === true)
    .map(match => {
      const homeTeam = match.home_team_name_en || '';
      const awayTeam = match.away_team_name_en || '';
      const homeScore = parseInt(match.home_score || 0, 10);
      const awayScore = parseInt(match.away_score || 0, 10);

      return {
        homeTeam,
        awayTeam,
        homeGoals: homeScore,
        awayGoals: awayScore,
        stage: match.type === 'group' ? 'pool' : 'knockout',
        type: match.type,
        progressedTeams: determineProgressedTeams(
          homeTeam,
          awayTeam,
          homeScore,
          awayScore,
          match.type
        ),
        matchId: match._id || match.id,
        group: match.group,
        matchday: match.matchday,
      };
    });
}

/**
 * Determine which teams advanced from this match
 * Pool stage: no progression tracking (handled at group end)
 * Knockout: winner advances
 */
function determineProgressedTeams(homeTeam, awayTeam, homeScore, awayScore, matchType) {
  // In pool matches, no progression
  if (matchType === 'group') {
    return [];
  }

  // In knockout matches, only winner advances
  if (homeScore > awayScore) {
    return [homeTeam];
  }
  if (awayScore > homeScore) {
    return [awayTeam];
  }

  // For draws in knockout (penalty shootout outcome not in API)
  return [];
}
