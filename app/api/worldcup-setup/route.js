import { getAPIStatus } from '@/lib/worldcupAPI';

/**
 * GET /api/worldcup-setup
 * Setup and debug endpoint for World Cup API configuration
 * The World Cup 2026 API is PUBLIC and requires NO authentication
 */
export async function GET(request) {
  try {
    const status = await getAPIStatus();

    return Response.json({
      configured: status.status === 'healthy',
      status: status.status,
      message: 'World Cup 2026 API is PUBLIC and FREE - no authentication needed!',
      setupInstructions: getSetupInstructions(),
      environment: {
        apiUrl: process.env.WORLDCUP_API_URL || 'https://worldcup26.ir',
        cacheDuration: process.env.WORLDCUP_CACHE_DURATION || '3600',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      {
        configured: false,
        status: 'error',
        error: error.message,
        setupInstructions: getSetupInstructions(),
      },
      { status: 503 }
    );
  }
}

/**
 * Get setup instructions
 */
function getSetupInstructions() {
  return {
    title: 'World Cup 2026 API Setup',
    
    step1: 'Verify API is accessible',
    step1_command: 'curl https://worldcup26.ir/get/games',
    step1_note: 'Should return World Cup 2026 match data (no authentication needed)',
    
    step2: 'Copy environment template',
    step2_command: 'cp .env.example .env.local',
    step2_note: 'No credentials needed - API is public!',
    
    step3: 'Start development server',
    step3_command: 'npm run dev',
    step3_note: 'App will automatically fetch data from the public API',
    
    step4: 'Test the connection',
    step4_url: 'http://localhost:3000/api/worldcup-matches',
    step4_command: 'curl http://localhost:3000/api/worldcup-matches',
    step4_note: 'Should see real World Cup 2026 match data',
    
    publicEndpoints: {
      games: 'https://worldcup26.ir/get/games - All 104 matches',
      teams: 'https://worldcup26.ir/get/teams - All 48 teams',
      groups: 'https://worldcup26.ir/get/groups - All 12 groups with standings',
      stadiums: 'https://worldcup26.ir/get/stadiums - All 16 stadiums',
    },
    
    apiDocumentation: 'https://worldcup26.ir/api-docs/',
    githubRepo: 'https://github.com/rezarahiminia/worldcup2026',
    
    note: '✅ This API is FREE, PUBLIC, and requires NO authentication!',
  };
}
