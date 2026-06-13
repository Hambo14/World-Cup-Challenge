import { formatTeamsWithFlags } from '@/lib/countryFlags';

export default function Leaderboard({ leaderboard }) {
  const formatGoalDifference = (goalDifference) => (goalDifference >= 0 ? `+${goalDifference}` : `${goalDifference}`);

  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Teams</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((row, index) => (
          <tr key={row.player}>
            <td>{index + 1}</td>
            <td>{row.player}</td>
            <td>{formatTeamsWithFlags(row.teams)}</td>
            <td>
              {row.points} ({formatGoalDifference(row.goalDifference || 0)})
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
