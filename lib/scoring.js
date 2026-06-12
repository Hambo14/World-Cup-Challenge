// Create a lib directory with utility functions
export function calculateLeaderboard(players, matches) {
  return players.map((player) => ({
    player: player.name,
    points: calculatePlayerPoints(player, matches),
    teams: player.teams || [],
  }));
}

function calculatePlayerPoints(player, matches) {
  // Basic implementation - can be enhanced based on your scoring logic
  let points = 0;
  
  matches.forEach((match) => {
    // Example: award points for team progression
    if (match.progressedTeams && match.progressedTeams.includes(player.name)) {
      points += 10;
    }
  });

  return points;
}
