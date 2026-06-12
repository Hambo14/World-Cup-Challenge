(function (global) {
  const players = [
    { name: 'Finn D', teams: [{ name: 'Belgium', group: 'G', isShitter: false }, { name: 'Saudi Arabia', group: 'H', isShitter: true }] },
    { name: 'Finn S', teams: [{ name: 'England', group: 'L', isShitter: false }, { name: 'TBD (Group G)', group: 'G', isShitter: true }] },
    { name: 'Ellen', teams: [{ name: 'Germany', group: 'E', isShitter: false }, { name: 'Iraq', group: 'I', isShitter: true }] },
    { name: 'Keaton', teams: [{ name: 'Iran', group: 'G', isShitter: false }, { name: 'Ivory Coast', group: 'E', isShitter: true }] },
    { name: 'Gus', teams: [{ name: 'Japan', group: 'F', isShitter: false }, { name: 'Czech', group: 'A', isShitter: true }] },
    { name: 'Caleb', teams: [{ name: 'Turkey', group: 'D', isShitter: false }, { name: 'Egypt', group: 'G', isShitter: true }] },
    { name: 'Nathos', teams: [{ name: 'Colombia', group: 'K', isShitter: false }, { name: 'South Africa', group: 'A', isShitter: true }] },
    { name: 'Mitch', teams: [{ name: 'Brazil', group: 'C', isShitter: false }, { name: 'Cape Verde', group: 'H', isShitter: true }] },
    { name: 'Clayton', teams: [{ name: 'Croatia', group: 'L', isShitter: false }, { name: 'Jordan', group: 'J', isShitter: true }] },
    { name: 'Jory', teams: [{ name: 'Korea', group: 'A', isShitter: false }, { name: 'Algeria', group: 'J', isShitter: true }] },
    { name: 'Riley', teams: [{ name: 'Uruguay', group: 'H', isShitter: false }, { name: 'Scotland', group: 'C', isShitter: true }] },
    { name: 'Codd', teams: [{ name: 'Mexico', group: 'A', isShitter: false }, { name: 'Tunisia', group: 'F', isShitter: true }] },
    { name: 'Jacob', teams: [{ name: 'Argentina', group: 'J', isShitter: false }, { name: 'Ghana', group: 'L', isShitter: true }] },
    { name: 'Griff', teams: [{ name: 'Ecuador', group: 'E', isShitter: false }, { name: 'Panama', group: 'L', isShitter: true }] },
    { name: 'Luke', teams: [{ name: 'Switzerland', group: 'B', isShitter: false }, { name: 'Sweden', group: 'F', isShitter: true }] },
    { name: 'Jarred', teams: [{ name: 'Senegal', group: 'I', isShitter: false }, { name: 'Paraguay', group: 'D', isShitter: true }] },
    { name: 'Talan', teams: [{ name: 'Spain', group: 'H', isShitter: false }, { name: 'Bosnia and Herzegovina', group: 'B', isShitter: true }] },
    { name: 'Oren', teams: [{ name: 'France', group: 'I', isShitter: false }, { name: 'Curucao', group: 'E', isShitter: true }] },
    { name: 'Sam', teams: [{ name: 'Austria', group: 'J', isShitter: false }, { name: 'Canada', group: 'B', isShitter: true }] },
    { name: 'Dylan', teams: [{ name: 'Morocco', group: 'C', isShitter: false }, { name: 'Uzbekistan', group: 'K', isShitter: true }] },
    { name: 'Ryan P', teams: [{ name: 'Australia', group: 'D', isShitter: false }, { name: 'Norway', group: 'I', isShitter: true }] },
    { name: 'Jesse', teams: [{ name: 'USA', group: 'D', isShitter: false }, { name: 'Congo DR', group: 'K', isShitter: true }] },
    { name: 'Zane', teams: [{ name: 'Portugal', group: 'K', isShitter: false }, { name: 'Haiti', group: 'C', isShitter: true }] },
    { name: 'Ryan', teams: [{ name: 'Netherlands', group: 'F', isShitter: false }, { name: 'Qatar', group: 'B', isShitter: true }] }
  ];

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { players };
  }

  global.WorldCupPlayers = players;
})(typeof window !== 'undefined' ? window : globalThis);
