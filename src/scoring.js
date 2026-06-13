(function (global) {
  function normalizeTeamName(name) {
    return (name || '').trim().toLowerCase();
  }

  function createTeamToOwnerMap(players) {
    const map = new Map();

    players.forEach((player) => {
      player.teams.forEach((team) => {
        map.set(normalizeTeamName(team.name), {
          playerName: player.name,
          teamName: team.name,
          isShitter: Boolean(team.isShitter)
        });
      });
    });

    return map;
  }

  function pointsFromPoolMatch(goalsFor, goalsAgainst) {
    if (goalsFor > goalsAgainst) {
      return 2;
    }
    if (goalsFor === goalsAgainst) {
      return 1;
    }
    return 0;
  }

  function pointsFromKnockoutMatch(goalsFor, goalsAgainst) {
    return goalsFor > goalsAgainst ? 1 : 0;
  }

  function calculateLeaderboard(players, matches) {
    const teamOwnership = createTeamToOwnerMap(players);
    const totals = new Map(players.map((player) => [player.name, 0]));
    const goalDifferences = new Map(players.map((player) => [player.name, 0]));

    matches.forEach((match) => {
      const homeOwner = teamOwnership.get(normalizeTeamName(match.homeTeam));
      const awayOwner = teamOwnership.get(normalizeTeamName(match.awayTeam));
      const progressed = new Set((match.progressedTeams || []).map(normalizeTeamName));
      const isPoolMatch = match.stage === 'pool';

      if (homeOwner) {
        const basePoints = isPoolMatch
          ? pointsFromPoolMatch(match.homeGoals, match.awayGoals)
          : pointsFromKnockoutMatch(match.homeGoals, match.awayGoals);
        const goalDifference = match.homeGoals - match.awayGoals;

        const bonus = !isPoolMatch && homeOwner.isShitter && progressed.has(normalizeTeamName(match.homeTeam)) ? 1 : 0;
        totals.set(homeOwner.playerName, (totals.get(homeOwner.playerName) || 0) + basePoints + bonus);
        goalDifferences.set(homeOwner.playerName, (goalDifferences.get(homeOwner.playerName) || 0) + goalDifference);
      }

      if (awayOwner) {
        const basePoints = isPoolMatch
          ? pointsFromPoolMatch(match.awayGoals, match.homeGoals)
          : pointsFromKnockoutMatch(match.awayGoals, match.homeGoals);
        const goalDifference = match.awayGoals - match.homeGoals;

        const bonus = !isPoolMatch && awayOwner.isShitter && progressed.has(normalizeTeamName(match.awayTeam)) ? 1 : 0;
        totals.set(awayOwner.playerName, (totals.get(awayOwner.playerName) || 0) + basePoints + bonus);
        goalDifferences.set(awayOwner.playerName, (goalDifferences.get(awayOwner.playerName) || 0) + goalDifference);
      }
    });

    return players
      .map((player) => ({
        player: player.name,
        teams: player.teams.map((team) => team.name),
        points: totals.get(player.name) || 0,
        goalDifference: goalDifferences.get(player.name) || 0
      }))
      .sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference || a.player.localeCompare(b.player));
  }

  const api = {
    normalizeTeamName,
    createTeamToOwnerMap,
    pointsFromPoolMatch,
    pointsFromKnockoutMatch,
    calculateLeaderboard
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.WorldCupScoring = api;
})(typeof window !== 'undefined' ? window : globalThis);
