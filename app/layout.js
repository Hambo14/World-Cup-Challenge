import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'World Cup Challenge Leaderboard',
  description: 'Track points based on World Cup pool-stage and knockout-stage results',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
