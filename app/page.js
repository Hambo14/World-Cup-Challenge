'use client';

import { useState, useEffect } from 'react';
import Leaderboard from '@/components/Leaderboard';
import { calculateLeaderboard } from '@/lib/scoring';
import { PLAYERS } from '@/lib/players';
import { transformAPIMatches } from '@/lib/matchTransformer';

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Fetch API data automatically on component mount
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/worldcup-matches');
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && data.data && data.data.matches) {
          const transformedMatches = await transformAPIMatches(data.data.matches);
          setMatches(transformedMatches);
          setLastUpdate(new Date().toLocaleTimeString());
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (err) {
        setError(`Failed to load matches: ${err.message}`);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();

    // Refresh data every 30 seconds (only while the tab is visible)
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') fetchMatches();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const leaderboard = calculateLeaderboard(PLAYERS, matches);

  return (
    <main>
      <h1>World Cup Challenge Leaderboard 🏆</h1>
      <p>Live scoring from World Cup 2026 matches.</p>

      {loading && <p className="status">Loading matches...</p>}
      {error && <p className="error">{error}</p>}
      {lastUpdate && !loading && <p className="status">Last updated: {lastUpdate}</p>}

      <section>
        <h2>Leaderboard</h2>
        {matches.length > 0 ? (
          <>
            <p className="match-count">
              {matches.length} matches completed • {PLAYERS.length} players
            </p>
            <Leaderboard leaderboard={leaderboard} />
          </>
        ) : (
          <p>Waiting for World Cup matches to be played...</p>
        )}
      </section>
    </main>
  );
}
