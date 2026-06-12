/**
 * World Cup 2026 API Service
 * Handles data fetching from the World Cup 2026 API
 * API is PUBLIC and does NOT require authentication
 * API Documentation: https://worldcup26.ir/api-docs/
 */

const BASE_URL = process.env.WORLDCUP_API_URL || 'https://worldcup26.ir';

// In-memory cache for data
let dataCache = {};

/**
 * Make request to World Cup API (no authentication needed)
 * @param {string} endpoint - API endpoint (e.g., '/get/games')
 * @returns {Promise<any>} Response data
 */
async function fetchFromWorldCupAPI(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `World Cup API error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch from World Cup API (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Get all matches from World Cup 2026 API
 * @returns {Promise<Array>} Array of matches
 */
export async function getMatches() {
  const cacheKey = 'matches';
  const cacheDuration = parseInt(process.env.WORLDCUP_CACHE_DURATION || '3600') * 1000;

  // Check cache
  if (dataCache[cacheKey] && Date.now() - dataCache[cacheKey].timestamp < cacheDuration) {
    return dataCache[cacheKey].data;
  }

  const data = await fetchFromWorldCupAPI('/get/games');
  const matches = Array.isArray(data.games) ? data.games : data;

  dataCache[cacheKey] = {
    data: matches,
    timestamp: Date.now(),
  };

  return matches;
}

/**
 * Get all teams from World Cup 2026 API
 * @returns {Promise<Array>} Array of teams
 */
export async function getTeams() {
  const cacheKey = 'teams';
  const cacheDuration = parseInt(process.env.WORLDCUP_CACHE_DURATION || '3600') * 1000;

  if (dataCache[cacheKey] && Date.now() - dataCache[cacheKey].timestamp < cacheDuration) {
    return dataCache[cacheKey].data;
  }

  const data = await fetchFromWorldCupAPI('/get/teams');
  const teams = Array.isArray(data) ? data : data.teams || [];

  dataCache[cacheKey] = {
    data: teams,
    timestamp: Date.now(),
  };

  return teams;
}

/**
 * Get all groups from World Cup 2026 API
 * @returns {Promise<Array>} Array of groups
 */
export async function getGroups() {
  const cacheKey = 'groups';
  const cacheDuration = parseInt(process.env.WORLDCUP_CACHE_DURATION || '3600') * 1000;

  if (dataCache[cacheKey] && Date.now() - dataCache[cacheKey].timestamp < cacheDuration) {
    return dataCache[cacheKey].data;
  }

  const data = await fetchFromWorldCupAPI('/get/groups');
  const groups = Array.isArray(data) ? data : data.groups || [];

  dataCache[cacheKey] = {
    data: groups,
    timestamp: Date.now(),
  };

  return groups;
}

/**
 * Get all stadiums from World Cup 2026 API
 * @returns {Promise<Array>} Array of stadiums
 */
export async function getStadiums() {
  const cacheKey = 'stadiums';
  const cacheDuration = parseInt(process.env.WORLDCUP_CACHE_DURATION || '3600') * 1000;

  if (dataCache[cacheKey] && Date.now() - dataCache[cacheKey].timestamp < cacheDuration) {
    return dataCache[cacheKey].data;
  }

  const data = await fetchFromWorldCupAPI('/get/stadiums');
  const stadiums = Array.isArray(data) ? data : data.stadiums || [];

  dataCache[cacheKey] = {
    data: stadiums,
    timestamp: Date.now(),
  };

  return stadiums;
}

/**
 * Clear all cached data
 */
export function clearCache() {
  dataCache = {};
}

/**
 * Get health status of World Cup API
 */
export async function getAPIStatus() {
  try {
    const token = await getAuthToken();
    await fetchFromWorldCupAPI('/get/teams');
    return { status: 'healthy', timestamp: new Date() };
  } catch (error) {
    return { status: 'unhealthy', error: error.message, timestamp: new Date() };
  }
}
