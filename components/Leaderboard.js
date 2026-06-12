export default function Leaderboard({ leaderboard }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Points</th>
          <th>Teams</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((row, index) => (
          <tr key={row.player}>
            <td>{index + 1}</td>
            <td>{row.player}</td>
            <td>{row.points}</td>
            <td>{row.teams.join(' + ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
