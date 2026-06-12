(function (global) {
  const API_BASE_URL = 'https://raw.githubusercontent.com/rezarahiminia/worldcup2026/main';

  async function fetchWorldCup2026Json(path) {
    const response = await fetch(`${API_BASE_URL}/${path}.json`);

    if (!response.ok) {
      throw new Error(`worldcup2026 request failed: ${response.status}`);
    }

    return response.json();
  }

  const api = {
    API_BASE_URL,
    fetchWorldCup2026Json
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.WorldCupApiStarter = api;
})(typeof window !== 'undefined' ? window : globalThis);
