'use client';

import { useState } from 'react';
import MatchForm from '@/components/MatchForm';
import Leaderboard from '@/components/Leaderboard';
import { calculateLeaderboard } from '@/lib/scoring';

const INITIAL_PLAYERS = [
  { name: 'Player 1', teams: [] },
  { name: 'Player 2', teams: [] },
  { name: 'Player 3', teams: [] },
];

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [players] = useState(INITIAL_PLAYERS);
  const [apiOutput, setApiOutput] = useState('No API data loaded yet.');

  const handleAddMatch = (match) => {
    setMatches([...matches, match]);
  };

  const handleLoadApi = async () => {
    setApiOutput('Loading from worldcup2026 starter API...');
    try {
      // Example API call - replace with actual endpoint
      const response = await fetch('/api/worldcup-matches');
      const data = await response.json();
      setApiOutput(JSON.stringify(data, null, 2).slice(0, 2000));
    } catch (error) {
      setApiOutput(`Error loading API: ${error.message}`);
    }
  };

  const leaderboard = calculateLeaderboard(players, matches);

  return (
    <main>
      <h1>World Cup Challenge Leaderboard</h1>
      <p>Track points based on pool-stage and knockout-stage results.</p>

      <section>
        <h2>Add Match Result</h2>
        <MatchForm onAddMatch={handleAddMatch} />
      </section>

      <section>
        <h2>Leaderboard</h2>
        <Leaderboard leaderboard={leaderboard} />
      </section>

      <section>
        <h2>WorldCup2026 API Starter</h2>
        <button onClick={handleLoadApi}>Try Loading Matches</button>
        <pre>{apiOutput}</pre>
      </section>
    </main>
  );
}
