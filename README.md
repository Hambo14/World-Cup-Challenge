# World Cup Challenge - React + Next.js + Vercel

A World Cup Challenge leaderboard dashboard built with React and Next.js, ready for deployment on Vercel.

## Features

- 🏆 Interactive leaderboard for tracking World Cup Challenge scores
- ⚽ Add match results and track team progression
- 📊 Real-time score calculation and rankings
- 🚀 Optimized for Vercel deployment
- 📱 Fully responsive design
- 🧪 Built-in testing support

## Tech Stack

- **Frontend:** React 18 + Next.js 14
- **Styling:** CSS3 with responsive design
- **Testing:** Jest + React Testing Library
- **Deployment:** Vercel
- **Package Manager:** npm

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Hambo14/World-Cup-Challenge.git
   cd World-Cup-Challenge
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file (copy from `.env.example`):
   ```bash
   cp .env.example .env.local
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

Build for production:

```bash
npm run build
npm start
```

### Testing

Run tests:

```bash
npm test
```

## Project Structure

```
world-cup-challenge/
├── app/                     # Next.js app directory
│   ├── layout.js           # Root layout
│   ├── page.js             # Home page
│   ├── globals.css         # Global styles
│   └── api/                # API routes (serverless functions)
├── components/             # React components
│   ├── MatchForm.js        # Add match form
│   └── Leaderboard.js      # Leaderboard table
├── lib/                    # Utility functions
│   └── scoring.js          # Scoring logic
├── public/                 # Static files
├── package.json
├── next.config.js
├── jsconfig.json
├── .eslintrc.json
├── vercel.json            # Vercel deployment config
├── .env.example           # Environment variables template
└── README.md
```

## Scoring Rules

The scoring system calculates points based on the game rules:

- **Pool stage:** win = 2, draw = 1, loss = 0
- **Knockout stage:** win = 1, loss = 0
- **Shitter bonus:** +1 in knockout matches when the shitter team progresses

See `lib/scoring.js` for implementation details.

## Deployment on Vercel

This project is configured for seamless deployment on Vercel.

### Quick Deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your repository
4. Vercel will automatically detect it's a Next.js project
5. Click "Deploy"

### Environment Variables

Add environment variables in Vercel dashboard:

- Settings → Environment Variables
- Add any variables from `.env.example`

### Custom Domain

1. Go to project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## Worldcup2026 API Integration

The app includes starter integration for the worldcup2026 data source:

- Base source: `https://github.com/rezarahiminia/worldcup2026`
- API endpoint: `/api/worldcup-matches`

Use the **Try Loading Matches** button in the UI to test loading starter data.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm test`
4. Submit a pull request

## License

ISC

## Support

For issues or questions, please open an issue on GitHub.
