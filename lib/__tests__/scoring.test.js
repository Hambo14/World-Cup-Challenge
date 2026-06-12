import { calculateLeaderboard } from '@/lib/scoring';

const players = [
  { name: 'Sam', teams: [{ name: 'Canada', isShitter: true }, { name: 'Austria', isShitter: false }] },
  { name: 'Ryan P', teams: [{ name: 'Australia', isShitter: false }, { name: 'Norway', isShitter: true }] }
];

describe('Scoring', () => {
  test('awards pool-stage points correctly', () => {
    const board = calculateLeaderboard(players, [
      { stage: 'pool', homeTeam: 'Canada', awayTeam: 'Australia', homeGoals: 1, awayGoals: 1 }
    ]);

    expect(board.find((row) => row.player === 'Sam').points).toBe(1);
    expect(board.find((row) => row.player === 'Ryan P').points).toBe(1);
  });

  test('awards knockout win plus shitter progression bonus', () => {
    const board = calculateLeaderboard(players, [
      {
        stage: 'round-of-16',
        homeTeam: 'Canada',
        awayTeam: 'Australia',
        homeGoals: 2,
        awayGoals: 1,
        progressedTeams: ['Canada']
      }
    ]);

    expect(board.find((row) => row.player === 'Sam').points).toBe(2);
    expect(board.find((row) => row.player === 'Ryan P').points).toBe(0);
  });

  test('scores both teams if a player owns both sides of a match', () => {
    const board = calculateLeaderboard(
      [{ name: 'Dual', teams: [{ name: 'Canada', isShitter: false }, { name: 'Australia', isShitter: true }] }],
      [
        {
          stage: 'round-of-16',
          homeTeam: 'Canada',
          awayTeam: 'Australia',
          homeGoals: 1,
          awayGoals: 0,
          progressedTeams: ['Canada']
        }
      ]
    );

    expect(board[0].points).toBe(1);
  });
});
