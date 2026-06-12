import { formatTeamsWithFlags } from '@/lib/countryFlags';

export default function Leaderboard({ leaderboard }) {
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
            <td>{row.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
