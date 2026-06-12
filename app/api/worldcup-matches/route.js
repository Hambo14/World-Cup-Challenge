import { getMatches } from '@/lib/worldcupAPI';

/**
 * GET /api/worldcup-matches
 * Fetch raw matches from the public World Cup 2026 API
 * No authentication required - this is a free public API
 */
export async function GET(request) {
  try {
    // Fetch raw data from public World Cup 2026 API
    const matches = await getMatches();

    if (!matches || matches.length === 0) {
      return Response.json({
        success: true,
        message: 'No matches found',
        data: {
          matches: [],
          totalMatches: 0,
          lastUpdated: new Date().toISOString(),
        },
      });
    }

    return Response.json({
      success: true,
      message: 'World Cup 2026 matches data',
      source: 'https://worldcup26.ir (FREE PUBLIC API)',
      data: {
        matches: matches,
        totalMatches: matches.length,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching World Cup matches:', error);

    return Response.json(
      {
        error: 'Failed to fetch World Cup data',
        message: error.message,
        note: 'The World Cup 2026 API may be temporarily unavailable. Check https://worldcup26.ir/get/games',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/worldcup-matches
 * Not used - matches are read-only from World Cup API
 */
export async function POST(request) {
  return Response.json(
    {
      error: 'Method not allowed',
      message: 'Match data is read-only from World Cup 2026 API. POST is not supported.',
    },
    { status: 405 }
  );
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
