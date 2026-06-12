# World Cup 2026 API Setup - Quick Reference

## 🎉 Great News! NO Registration Required

The World Cup 2026 API is **FREE and PUBLIC** - no authentication needed!

## ⚡ 1-Minute Setup

### 1️⃣ Copy Environment Template

```bash
cp .env.example .env.local
```

That's it! No credentials needed.

### 2️⃣ Start Your App

```bash
npm run dev
```

### 3️⃣ Test It

```bash
# Check setup
curl http://localhost:3000/api/worldcup-setup

# Get match data
curl http://localhost:3000/api/worldcup-matches
```

---

## 📁 Files Updated

```
Updated Files:
├── .env.example                    ← Simplified (no auth needed)
├── app/api/worldcup-matches/route.js ← Connects to public API
└── app/api/worldcup-setup/route.js ← Simplified instructions
```

---

## 🔗 Public API Endpoints

All endpoints are **FREE and open**:

| Endpoint        | Returns                      |
| --------------- | ---------------------------- |
| `/get/games`    | All 104 World Cup matches    |
| `/get/teams`    | All 48 teams                 |
| `/get/groups`   | All 12 groups with standings |
| `/get/stadiums` | All 16 stadiums              |

**Example:**

```bash
curl https://worldcup26.ir/get/games
```

---

## 🎯 Next Steps

1. ✅ Run `npm run dev`
2. ✅ Visit `http://localhost:3000`
3. ✅ The page will automatically fetch match data from `/api/worldcup-matches`
4. ✅ See real World Cup 2026 data!

---

## ✨ Key Features

✅ **100% FREE** - No payment or registration  
✅ **No Authentication** - Public API  
✅ **Real Data** - Live World Cup 2026 match information  
✅ **Auto-Caching** - 1 hour cache (configurable)  
✅ **Zero Configuration** - Just works!

---

## 📊 Data Available Now

- 🏆 **104 Matches** with scores and dates
- 👥 **48 Teams** across all groups
- 📈 **Group Standings** updated in real-time
- 🏟️ **16 Stadiums** across US, Mexico, Canada

---

## 🚨 Troubleshooting

| Issue                | Solution                                                                    |
| -------------------- | --------------------------------------------------------------------------- |
| "Connection refused" | Check internet connection                                                   |
| "No data"            | API might be temporarily down - try: `curl https://worldcup26.ir/get/games` |
| "Empty response"     | Tournament data becomes available closer to June 11, 2026                   |

---

## 📖 Resources

- **API Status:** https://worldcup26.ir
- **API Docs:** https://worldcup26.ir/api-docs/
- **GitHub:** https://github.com/rezarahiminia/worldcup2026

---

**Setup Complete!** 🎉 Your app is ready to pull real World Cup 2026 data.
