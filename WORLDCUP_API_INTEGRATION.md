# World Cup 2026 API Integration Guide

This guide walks you through setting up the World Cup 2026 API integration for your World Cup Challenge leaderboard app.

## 📌 Overview

The World Cup Challenge app uses the **World Cup 2026 Free PUBLIC REST API** from [rezarahiminia/worldcup2026](https://github.com/rezarahiminia/worldcup2026) to fetch:

- ⚽ **104 Matches** with live scores
- 👥 **48 Teams** across all groups
- 📊 **12 Groups** (A-L) with standings
- 🏟️ **16 Stadiums** across US, Mexico, and Canada

## 🚀 Quick Setup (1 Minute)

**Good news:** This is a PUBLIC API - **no registration or authentication required!**

### Step 1: Copy Environment Template

```bash
cp .env.example .env.local
```

That's it! No credentials needed.

### Step 2: Start Your App

```bash
npm run dev
```

### Step 3: Test the Connection

```bash
curl http://localhost:3000/api/worldcup-matches
```

You should see real World Cup 2026 data!

---

## 📚 API Endpoints

### Your Application Endpoints

| Endpoint                    | Purpose                          |
| --------------------------- | -------------------------------- |
| `GET /api/worldcup-matches` | Fetch all World Cup 2026 matches |
| `GET /api/worldcup-setup`   | Check API configuration status   |

### Fetch Examples

#### JavaScript/TypeScript

```javascript
// Get matches
const response = await fetch('/api/worldcup-matches');
const data = await response.json();
console.log(data.data.matches);

// Check setup
const setupResponse = await fetch('/api/worldcup-setup');
const setupData = await setupResponse.json();
console.log(setupData.configured);
```

#### cURL

```bash
# Get matches
curl http://localhost:3000/api/worldcup-matches

# Check configuration
curl http://localhost:3000/api/worldcup-setup
```

---

## 🔄 Data Format

### Match Object

The API returns matches in this format:

```javascript
{
  "id": "1",
  "stage": "pool",                           // Stage of tournament
  "homeTeam": "1",                           // Team ID
  "awayTeam": "2",                           // Team ID
  "homeGoals": 1,
  "awayGoals": 0,
  "progressedTeams": ["1"],                  // Teams that advanced
  "date": "06/11/2026 13:00",
  "group": "A",                              // Group letter (A-L)
  "matchday": "1",
  "stadiumId": "1",
  "finished": false
}
```

### Team Object

```javascript
{
  "id": "1",
  "name_en": "United States",
  "name_fa": "ایالات متحده",
  "fifa_code": "USA",
  "groups": "C",
  "flag": "https://..."
}
```

### Group Object

```javascript
{
  "group": "A",
  "teams": [
    { "team_id": "1", "pts": "3", "gf": "1", "ga": "0" },
    { "team_id": "2", "pts": "0", "gf": "0", "ga": "1" }
  ]
}
```

---

## ⚙️ Advanced Configuration

### Environment Variables

Edit `.env.local` for these options:

    # World Cup API URL (default: https://worldcup26.ir)
    WORLDCUP_API_URL=https://worldcup26.ir

    # Cache duration in seconds (default: 3600 = 1 hour)
    WORLDCUP_CACHE_DURATION=3600

    # Enable debug logging (default: false)
    WORLDCUP_API_DEBUG=false

### Caching

Data is cached for **1 hour by default**. To change:

```env
# Cache for 5 minutes
WORLDCUP_CACHE_DURATION=300

# Cache for 24 hours
WORLDCUP_CACHE_DURATION=86400
```

### Debug Logging

Enable to see API requests:

```env
WORLDCUP_API_DEBUG=true
```

---

## 🔐 Security Notes

Since this is a **public API** with no authentication:

✅ **No credentials to protect** - API doesn't require tokens or passwords  
✅ **No `.env.local` secrets needed** - Configuration is minimal  
✅ **Rate limiting handled by API** - Server-side caching helps  
✅ **Read-only access** - Data fetching only, no write operations

---

## 🧪 Testing

### Test the Setup Endpoint

```bash
curl http://localhost:3000/api/worldcup-setup | jq
```

Response indicates:

- ✅ `"configured": true` - API is ready
- ❌ `"configured": false` - Missing credentials

### Test the Matches Endpoint

```bash
curl http://localhost:3000/api/worldcup-matches | jq '.data'
```

Should return array of matches with real World Cup 2026 data.

### Verify in App

1. Go to http://localhost:3000
2. Click "Try Loading Matches"
3. Should display real World Cup 2026 match data

---

## 🐛 Troubleshooting

### Error: "Connection refused"

**Solution:** Check internet connection and API status:

```bash
# Test if API is accessible
curl https://worldcup26.ir/get/games

# If that fails, the API might be temporarily down
# Try again in a few minutes
```

### Error: "Failed to fetch match data"

**Solution:** Verify your setup:

```bash
# Check API status via your app
curl http://localhost:3000/api/worldcup-setup

# Check public API directly
curl https://worldcup26.ir/get/games
```

Common causes:

- API temporarily unavailable
- Network connectivity issue
- Rate limit exceeded (wait a few minutes)

### No data showing in leaderboard

**Solution:** Ensure:

1. API is returning matches: `curl http://localhost:3000/api/worldcup-matches`
2. Player team mappings are correct in your app
3. Teams match names from World Cup API (English names)

---

## 📖 API Documentation

- **Official Docs:** https://worldcup26.ir/api-docs/
- **GitHub Repo:** https://github.com/rezarahiminia/worldcup2026
- **API Status:** https://worldcup26.ir

---

## 🔄 Using Real Match Data in Your App

### Update `/app/page.js` to Use Real Data

```javascript
const handleLoadApi = async () => {
  setApiOutput('Loading World Cup 2026 matches...');
  try {
    const response = await fetch('/api/worldcup-matches');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    setApiOutput(
      `Loaded ${data.data.totalMatches} matches\n\n` +
        JSON.stringify(data.data.matches.slice(0, 3), null, 2)
    );
  } catch (error) {
    setApiOutput(`Error: ${error.message}`);
  }
};
```

---

## 📊 Next Steps

After setup:

1. ✅ **Verify API connection** - Check `/api/worldcup-setup`
2. ✅ **Load real data** - Click "Try Loading Matches" in app
3. ✅ **Map teams to players** - Create player-to-team associations
4. ✅ **Calculate scores** - Use scoring logic with real match data
5. ✅ **Deploy to Vercel** - Set environment variables in Vercel dashboard

---

## 💡 Tips

- World Cup 2026 starts **June 11, 2026** — Data becomes available closer to the date
- Matches update in **real-time** during tournament
- Cache duration can be adjusted per your needs
- Consider storing matches in a database for historical tracking

---

**Need help?** Check the [World Cup 2026 API docs](https://worldcup26.ir/api-docs/) or GitHub repo for more information.
