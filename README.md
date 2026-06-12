# World-Cup-Challenge

Front-end dashboard and score tracker for the World Cup Challenge.

## Starter app

This repository now includes a simple starter web app that:

- Tracks all 24 players and their two assigned teams.
- Calculates points using the game rules:
  - Pool stage: win = 2, draw = 1, loss = 0
  - Knockout stage: win = 1, loss = 0
  - Shitter bonus: +1 in knockout matches when the shitter team progresses
- Handles matches where both teams are owned by the same player by scoring both teams normally.
- Renders a live leaderboard from entered match results.

## Worldcup2026 API starter integration

`src/api.js` contains starter integration code for the worldcup2026 data source:

- Base source: `https://github.com/rezarahiminia/worldcup2026`
- Fetch helper: `fetchWorldCup2026Json(path)`

Use the **Try Loading Matches** button in the UI to test loading starter data (if the expected JSON path exists).

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## Tests

```bash
npm test
```
