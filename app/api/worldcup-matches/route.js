export async function GET(request) {
  // Example API route for fetching World Cup match data
  // This can be enhanced with real data from the World Cup 2026 API

  try {
    return Response.json({
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
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch match data' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  // Example route for posting new match results
  // You can enhance this with database operations

  try {
    const body = await request.json();

    // Validate the match data
    if (!body.stage || !body.homeTeam || !body.awayTeam) {
      return Response.json(
        { error: 'Missing required fields: stage, homeTeam, awayTeam' },
        { status: 400 }
      );
    }

    // Here you would typically save to a database
    return Response.json(
      {
        message: 'Match result recorded',
        match: body,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Failed to process match result' },
      { status: 500 }
    );
  }
}

// Optional: Handle unsupported methods
export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Allow': 'GET, POST, OPTIONS',
    },
  });
}
