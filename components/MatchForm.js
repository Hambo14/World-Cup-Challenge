'use client';

import { useState } from 'react';

const STAGES = [
  { value: 'pool', label: 'Pool Stage' },
  { value: 'round-of-32', label: 'Round of 32' },
  { value: 'round-of-16', label: 'Round of 16' },
  { value: 'quarter-final', label: 'Quarter Final' },
  { value: 'semi-final', label: 'Semi Final' },
  { value: 'final', label: 'Final' },
];

export default function MatchForm({ onAddMatch }) {
  const [formData, setFormData] = useState({
    stage: 'pool',
    homeTeam: '',
    awayTeam: '',
    homeGoals: 0,
    awayGoals: 0,
    progressedTeams: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('Goals') ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const match = {
      stage: formData.stage,
      homeTeam: formData.homeTeam,
      awayTeam: formData.awayTeam,
      homeGoals: formData.homeGoals,
      awayGoals: formData.awayGoals,
      progressedTeams: formData.progressedTeams
        .split(',')
        .map((team) => team.trim())
        .filter(Boolean),
    };

    onAddMatch(match);

    setFormData({
      stage: 'pool',
      homeTeam: '',
      awayTeam: '',
      homeGoals: 0,
      awayGoals: 0,
      progressedTeams: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Stage
        <select name="stage" value={formData.stage} onChange={handleChange} required>
          {STAGES.map((stage) => (
            <option key={stage.value} value={stage.value}>
              {stage.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Home Team
        <input
          type="text"
          name="homeTeam"
          value={formData.homeTeam}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Away Team
        <input
          type="text"
          name="awayTeam"
          value={formData.awayTeam}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Home Goals
        <input
          type="number"
          name="homeGoals"
          value={formData.homeGoals}
          onChange={handleChange}
          min="0"
          required
        />
      </label>
      <label>
        Away Goals
        <input
          type="number"
          name="awayGoals"
          value={formData.awayGoals}
          onChange={handleChange}
          min="0"
          required
        />
      </label>
      <label>
        Progressed Teams (comma-separated)
        <input
          type="text"
          name="progressedTeams"
          value={formData.progressedTeams}
          onChange={handleChange}
          placeholder="Canada, Brazil"
        />
      </label>
      <button type="submit">Add Result</button>
    </form>
  );
}
