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

  test('tracks goal difference for wins and losses', () => {
    const board = calculateLeaderboard(players, [
      { stage: 'pool', homeTeam: 'Canada', awayTeam: 'Australia', homeGoals: 3, awayGoals: 1 },
    ]);

    expect(board.find((row) => row.player === 'Sam').goalDifference).toBe(2);
    expect(board.find((row) => row.player === 'Ryan P').goalDifference).toBe(-2);
  });

  test('breaks points ties by goal difference', () => {
    const tiedPlayers = [
      { name: 'Alpha', teams: [{ name: 'Canada', isShitter: false }] },
      { name: 'Beta', teams: [{ name: 'Australia', isShitter: false }] },
    ];

    const board = calculateLeaderboard(tiedPlayers, [
      { stage: 'pool', homeTeam: 'Canada', awayTeam: 'Spain', homeGoals: 3, awayGoals: 1 },
      { stage: 'pool', homeTeam: 'Australia', awayTeam: 'France', homeGoals: 2, awayGoals: 1 },
    ]);

    expect(board[0].player).toBe('Alpha');
    expect(board[0].points).toBe(2);
    expect(board[0].goalDifference).toBe(2);
    expect(board[1].player).toBe('Beta');
    expect(board[1].points).toBe(2);
    expect(board[1].goalDifference).toBe(1);
  });
});
