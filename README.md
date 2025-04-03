# Multi-Provider Authentication System

Simple authentication system supporting multiple OAuth providers including Google, GitHub, LinkedIn, Twitter, Facebook, and Spotify.

## Features
- Multi-provider OAuth authentication
- User profile management
- Admin dashboard
- Responsive design
- View Spotify liked songs (when logged in via Spotify)

## Tech Stack
- **Backend**: Node.js, Express, Passport.js, MongoDB
- **Frontend**: React, Tailwind CSS

## Quick Start
1. Clone repository
2. Install dependencies:
   ```
   cd backend && npm install
   cd frontend && npm install
   ```
3. Set up `.env` file (copy from `.env.example`)
4. Start servers:
   ```
   # Backend
   cd backend && npm run dev
   
   # Frontend
   cd frontend && npm run dev
   ```

## OAuth Setup Guides
Quick guides for setting up each provider:

- [Google OAuth Setup](docs/google.md)
- [GitHub OAuth Setup](docs/github.md)
- [LinkedIn OAuth Setup](docs/linkedin.md)
- [Twitter OAuth Setup](docs/twitter.md)
- [Facebook OAuth Setup](docs/facebook.md)
- [Spotify OAuth Setup](docs/spotify.md)

