(function () {
  const players = window.WorldCupPlayers || [];
  const scoring = window.WorldCupScoring;
  const api = window.WorldCupApiStarter;

  const matches = [];
  const leaderboardBody = document.getElementById('leaderboard-body');
  const form = document.getElementById('match-form');
  const loadApiButton = document.getElementById('load-api');
  const apiOutput = document.getElementById('api-output');

  function renderLeaderboard() {
    const leaderboard = scoring.calculateLeaderboard(players, matches);
    const formatGoalDifference = (goalDifference) => (goalDifference >= 0 ? `+${goalDifference}` : `${goalDifference}`);

    leaderboardBody.innerHTML = leaderboard
      .map(
        (row, index) =>
          `<tr><td>${index + 1}</td><td>${row.player}</td><td>${row.points} (${formatGoalDifference(row.goalDifference)})</td><td>${row.teams.join(' + ')}</td></tr>`
      )
      .join('');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const match = {
      stage: String(formData.get('stage')),
      homeTeam: String(formData.get('homeTeam')),
      awayTeam: String(formData.get('awayTeam')),
      homeGoals: Number(formData.get('homeGoals')),
      awayGoals: Number(formData.get('awayGoals')),
      progressedTeams: String(formData.get('progressedTeams') || '')
        .split(',')
        .map((team) => team.trim())
        .filter(Boolean)
    };

    matches.push(match);
    renderLeaderboard();
    form.reset();
  });

  loadApiButton.addEventListener('click', async () => {
    apiOutput.textContent = 'Loading from worldcup2026 starter API...';

    try {
      const data = await api.fetchWorldCup2026Json('matches');
      apiOutput.textContent = JSON.stringify(data, null, 2).slice(0, 2000);
    } catch (error) {
      apiOutput.textContent = `API starter call failed: ${error.message}`;
    }
  });

  renderLeaderboard();
})();
