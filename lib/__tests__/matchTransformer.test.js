import { transformAPIMatches } from '@/lib/matchTransformer';

describe('Match Transformer', () => {
  describe('finished filtering', () => {
    test('only includes matches with finished = "TRUE"', async () => {
      const apiMatches = [
        {
          home_team_name_en: 'Mexico',
          away_team_name_en: 'South Africa',
          home_score: '2',
          away_score: '0',
          finished: 'TRUE',
          type: 'group',
          group: 'A',
          matchday: '1',
        },
        {
          home_team_name_en: 'Brazil',
          away_team_name_en: 'Spain',
          home_score: '0',
          away_score: '0',
          finished: 'FALSE',
          type: 'group',
          group: 'C',
          matchday: '1',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed).toHaveLength(1);
      expect(transformed[0].homeTeam).toBe('Mexico');
    });

    test('includes matches with finished = true (boolean)', async () => {
      const apiMatches = [
        {
          home_team_name_en: 'Argentina',
          away_team_name_en: 'Portugal',
          home_score: '1',
          away_score: '1',
          finished: true,
          type: 'group',
          group: 'J',
          matchday: '2',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed).toHaveLength(1);
      expect(transformed[0].homeGoals).toBe(1);
      expect(transformed[0].awayGoals).toBe(1);
    });

    test('handles empty array', async () => {
      const transformed = await transformAPIMatches([]);
      expect(transformed).toEqual([]);
    });

    test('handles null or undefined input', async () => {
      const transformed1 = await transformAPIMatches(null);
      const transformed2 = await transformAPIMatches(undefined);
      expect(transformed1).toEqual([]);
      expect(transformed2).toEqual([]);
    });
  });

  describe('score parsing', () => {
    test('parses string scores as integers', async () => {
      const apiMatches = [
        {
          home_team_name_en: 'France',
          away_team_name_en: 'Germany',
          home_score: '3',
          away_score: '2',
          finished: 'TRUE',
          type: 'group',
          group: 'E',
          matchday: '1',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed[0].homeGoals).toBe(3);
      expect(transformed[0].awayGoals).toBe(2);
      expect(typeof transformed[0].homeGoals).toBe('number');
      expect(typeof transformed[0].awayGoals).toBe('number');
    });

    test('handles missing scores by treating as 0', async () => {
      const apiMatches = [
        {
          home_team_name_en: 'Italy',
          away_team_name_en: 'Greece',
          home_score: null,
          away_score: undefined,
          finished: 'TRUE',
          type: 'group',
          group: 'F',
          matchday: '1',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed[0].homeGoals).toBe(0);
      expect(transformed[0].awayGoals).toBe(0);
    });

    test('handles large scores', async () => {
      const apiMatches = [
        {
          home_team_name_en: 'Japan',
          away_team_name_en: 'Vietnam',
          home_score: '10',
          away_score: '0',
          finished: 'TRUE',
          type: 'group',
          group: 'F',
          matchday: '1',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed[0].homeGoals).toBe(10);
      expect(transformed[0].awayGoals).toBe(0);
    });
  });

  describe('stage mapping', () => {
    test('maps group stage type to "pool" stage', async () => {
      const apiMatches = [
        {
          home_team_name_en: 'England',
          away_team_name_en: 'USA',
          home_score: '1',
          away_score: '0',
          finished: 'TRUE',
          type: 'group',
          group: 'L',
          matchday: '1',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed[0].stage).toBe('pool');
      expect(transformed[0].type).toBe('group');
    });

    test('maps knockout type to "knockout" stage', async () => {
      const apiMatches = [
        {
          home_team_name_en: 'Argentina',
          away_team_name_en: 'Netherlands',
          home_score: '3',
          away_score: '2',
          finished: 'TRUE',
          type: 'final',
          group: null,
          matchday: '1',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed[0].stage).toBe('knockout');
      expect(transformed[0].type).toBe('final');
    });
  });

  describe('knockout progression', () => {
    test('marks home team as progressed when home team wins', async () => {
      const apiMatches = [
        {
          home_team_name_en: 'Brazil',
          away_team_name_en: 'Mexico',
          home_score: '2',
          away_score: '0',
          finished: 'TRUE',
          type: 'round-of-16',
          group: null,
          matchday: '1',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed[0].progressedTeams).toEqual(['Brazil']);
    });

    test('marks away team as progressed when away team wins', async () => {
      const apiMatches = [
        {
          home_team_name_en: 'France',
          away_team_name_en: 'Italy',
          home_score: '1',
          away_score: '3',
          finished: 'TRUE',
          type: 'semi-final',
          group: null,
          matchday: '1',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed[0].progressedTeams).toEqual(['Italy']);
    });

    test('marks no progression for knockout draws (TBD in API)', async () => {
      const apiMatches = [
        {
          home_team_name_en: 'Spain',
          away_team_name_en: 'Portugal',
          home_score: '1',
          away_score: '1',
          finished: 'TRUE',
          type: 'quarter-final',
          group: null,
          matchday: '1',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed[0].progressedTeams).toEqual([]);
    });

    test('does not mark progression in pool stage matches', async () => {
      const apiMatches = [
        {
          home_team_name_en: 'Germany',
          away_team_name_en: 'Belgium',
          home_score: '3',
          away_score: '1',
          finished: 'TRUE',
          type: 'group',
          group: 'E',
          matchday: '1',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed[0].progressedTeams).toEqual([]);
    });
  });

  describe('full transformation', () => {
    test('transforms complete match object with all fields', async () => {
      const apiMatches = [
        {
          _id: '679c9c8a5749c4077500e001',
          id: '1',
          home_team_name_en: 'Mexico',
          away_team_name_en: 'South Africa',
          home_score: '2',
          away_score: '0',
          finished: 'TRUE',
          type: 'group',
          group: 'A',
          matchday: '1',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed[0]).toEqual({
        homeTeam: 'Mexico',
        awayTeam: 'South Africa',
        homeGoals: 2,
        awayGoals: 0,
        stage: 'pool',
        type: 'group',
        progressedTeams: [],
        matchId: '679c9c8a5749c4077500e001',
        group: 'A',
        matchday: '1',
      });
    });

    test('transforms multiple matches correctly', async () => {
      const apiMatches = [
        {
          home_team_name_en: 'Mexico',
          away_team_name_en: 'South Africa',
          home_score: '2',
          away_score: '0',
          finished: 'TRUE',
          type: 'group',
          group: 'A',
          matchday: '1',
        },
        {
          home_team_name_en: 'Brazil',
          away_team_name_en: 'France',
          home_score: '3',
          away_score: '1',
          finished: 'TRUE',
          type: 'final',
          group: null,
          matchday: '1',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed).toHaveLength(2);
      expect(transformed[0].homeTeam).toBe('Mexico');
      expect(transformed[0].stage).toBe('pool');
      expect(transformed[1].homeTeam).toBe('Brazil');
      expect(transformed[1].stage).toBe('knockout');
      expect(transformed[1].progressedTeams).toEqual(['Brazil']);
    });
  });

  describe('edge cases', () => {
    test('preserves empty team names', async () => {
      const apiMatches = [
        {
          home_team_name_en: '',
          away_team_name_en: 'South Africa',
          home_score: '0',
          away_score: '1',
          finished: 'TRUE',
          type: 'group',
          group: 'A',
          matchday: '1',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed[0].homeTeam).toBe('');
      expect(transformed[0].awayTeam).toBe('South Africa');
    });

    test('uses _id as matchId when id is not available', async () => {
      const apiMatches = [
        {
          _id: 'mongo-id-123',
          home_team_name_en: 'Germany',
          away_team_name_en: 'Belgium',
          home_score: '1',
          away_score: '1',
          finished: 'TRUE',
          type: 'group',
          group: 'E',
          matchday: '1',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed[0].matchId).toBe('mongo-id-123');
    });

    test('uses id as matchId when _id is not available', async () => {
      const apiMatches = [
        {
          id: '5',
          home_team_name_en: 'Turkey',
          away_team_name_en: 'Austria',
          home_score: '0',
          away_score: '2',
          finished: 'TRUE',
          type: 'group',
          group: 'D',
          matchday: '1',
        },
      ];

      const transformed = await transformAPIMatches(apiMatches);

      expect(transformed[0].matchId).toBe('5');
    });
  });
});
