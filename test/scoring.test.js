const test = require('node:test');
const assert = require('node:assert/strict');

const { calculateLeaderboard } = require('../src/scoring');

const players = [
  { name: 'Sam', teams: [{ name: 'Canada', isShitter: true }, { name: 'Austria', isShitter: false }] },
  { name: 'Ryan P', teams: [{ name: 'Australia', isShitter: false }, { name: 'Norway', isShitter: true }] }
];

test('awards pool-stage points correctly', () => {
  const board = calculateLeaderboard(players, [
    { stage: 'pool', homeTeam: 'Canada', awayTeam: 'Australia', homeGoals: 1, awayGoals: 1 }
  ]);

  assert.equal(board.find((row) => row.player === 'Sam').points, 1);
  assert.equal(board.find((row) => row.player === 'Ryan P').points, 1);
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

  assert.equal(board.find((row) => row.player === 'Sam').points, 2);
  assert.equal(board.find((row) => row.player === 'Ryan P').points, 0);
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

  assert.equal(board[0].points, 1);
});
