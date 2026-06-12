export default function handler(req, res) {
  // Example API route for Vercel serverless functions
  // This can be replaced with your actual API logic

  if (req.method === 'GET') {
    return res.status(200).json({
      message: 'World Cup API endpoint',
      example: {
        match: {
          stage: 'pool',
          homeTeam: 'Canada',
          awayTeam: 'Belgium',
          homeGoals: 1,
          awayGoals: 2,
          progressedTeams: ['Belgium'],
        },
      },
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
