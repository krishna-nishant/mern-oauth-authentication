# Spotify OAuth Setup

## 1. Create a Spotify Developer Application

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Log in with your Spotify account
3. Click "Create an App"
4. Enter app name and description
5. Accept the terms of service
6. Click "Create"

## 2. Configure Your Application

1. Click "Edit Settings" on your newly created app
2. Add redirect URIs:
   - `http://localhost:5000/auth/spotify/callback`
3. Save your changes

## 3. Get Credentials

1. On your app's dashboard, note your:
   - Client ID (shown directly)
   - Client Secret (click "Show Client Secret")

## 4. Add Credentials to Environment

Add the following to your `.env` file:

```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

## 5. Verify Configuration

1. Start your application
2. Test Spotify login button
3. You should be redirected to Spotify's consent screen
4. After successful login, you'll be able to view your liked songs

## 6. Features

The Spotify integration provides:

- Authentication using your Spotify account
- Displaying your 50 most recent liked songs
- Each song shows album artwork, title, artist, and duration

Note: This integration only displays your liked songs and doesn't include playback functionality.
