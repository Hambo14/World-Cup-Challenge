function normalizeTeamName(name) {
  return (name || '').trim().toLowerCase();
}

function getTeamName(team) {
  return typeof team === 'string' ? team : team?.name;
}

function isShitterTeam(team) {
  return typeof team === 'object' && team ? Boolean(team.isShitter) : false;
}

function createTeamToOwnerMap(players) {
  const map = new Map();

  (players || []).forEach((player) => {
    (player.teams || []).forEach((team) => {
      const teamName = getTeamName(team);
      if (!teamName) return;

      map.set(normalizeTeamName(teamName), {
        playerName: player.name,
        teamName,
        isShitter: isShitterTeam(team),
      });
    });
  });

  return map;
}

function pointsFromPoolMatch(goalsFor, goalsAgainst) {
  if (goalsFor > goalsAgainst) return 2;
  if (goalsFor === goalsAgainst) return 1;
  return 0;
}

function pointsFromKnockoutMatch(goalsFor, goalsAgainst) {
  return goalsFor > goalsAgainst ? 1 : 0;
}

export function calculateLeaderboard(players, matches) {
  const teamOwnership = createTeamToOwnerMap(players);
  const totals = new Map((players || []).map((player) => [player.name, 0]));

  (matches || []).forEach((match) => {
    const homeOwner = teamOwnership.get(normalizeTeamName(match.homeTeam));
    const awayOwner = teamOwnership.get(normalizeTeamName(match.awayTeam));
    const progressed = new Set((match.progressedTeams || []).map(normalizeTeamName));
    const isPoolMatch = match.stage === 'pool';

    if (homeOwner) {
      const basePoints = isPoolMatch
        ? pointsFromPoolMatch(match.homeGoals, match.awayGoals)
        : pointsFromKnockoutMatch(match.homeGoals, match.awayGoals);

      const bonus =
        !isPoolMatch &&
        homeOwner.isShitter &&
        progressed.has(normalizeTeamName(match.homeTeam))
          ? 1
          : 0;

      totals.set(homeOwner.playerName, (totals.get(homeOwner.playerName) || 0) + basePoints + bonus);
    }

    if (awayOwner) {
      const basePoints = isPoolMatch
        ? pointsFromPoolMatch(match.awayGoals, match.homeGoals)
        : pointsFromKnockoutMatch(match.awayGoals, match.homeGoals);

      const bonus =
        !isPoolMatch &&
        awayOwner.isShitter &&
        progressed.has(normalizeTeamName(match.awayTeam))
          ? 1
          : 0;

      totals.set(awayOwner.playerName, (totals.get(awayOwner.playerName) || 0) + basePoints + bonus);
    }
  });

  return (players || [])
    .map((player) => ({
      player: player.name,
      teams: (player.teams || []).map(getTeamName).filter(Boolean),
      points: totals.get(player.name) || 0,
    }))
    .sort((a, b) => b.points - a.points || a.player.localeCompare(b.player));
}
