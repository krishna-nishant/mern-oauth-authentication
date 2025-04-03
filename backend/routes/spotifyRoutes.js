const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const router = express.Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated() && req.user.provider === 'spotify') {
        return next();
    }
    res.status(401).json({ error: 'Authentication required. Please login with Spotify.' });
};

// Middleware to initialize Spotify API with user tokens
const initSpotifyApi = (req, res, next) => {
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: '/auth/spotify/callback'
    });

    // Set access token
    if (req.user && req.user.spotifyAccessToken) {
        spotifyApi.setAccessToken(req.user.spotifyAccessToken);

        // Check if token is expired and refresh if needed
        const now = new Date();
        if (req.user.spotifyTokenExpires && now > req.user.spotifyTokenExpires) {
            // Token is expired, refresh it
            spotifyApi.setRefreshToken(req.user.spotifyRefreshToken);
            spotifyApi.refreshAccessToken()
                .then(data => {
                    // Save the new token to the user
                    req.user.spotifyAccessToken = data.body.access_token;
                    req.user.spotifyTokenExpires = new Date(Date.now() + data.body.expires_in * 1000);
                    req.user.save();

                    // Set the new access token
                    spotifyApi.setAccessToken(data.body.access_token);
                    req.spotifyApi = spotifyApi;
                    next();
                })
                .catch(err => {
                    console.error('Error refreshing Spotify token:', err);
                    res.status(401).json({ error: 'Failed to refresh Spotify token. Please login again.' });
                });
        } else {
            // Token is still valid
            req.spotifyApi = spotifyApi;
            next();
        }
    } else {
        res.status(401).json({ error: 'No Spotify token available. Please login with Spotify.' });
    }
};

// Get user's saved/liked tracks from Spotify
router.get('/liked-songs', isAuthenticated, initSpotifyApi, async (req, res) => {
    try {
        const data = await req.spotifyApi.getMySavedTracks({ limit: 50 });

        // Format the response
        const tracks = data.body.items.map(item => ({
            id: item.track.id,
            name: item.track.name,
            artist: item.track.artists.map(artist => artist.name).join(', '),
            album: item.track.album.name,
            albumArt: item.track.album.images[0]?.url,
            duration: item.track.duration_ms,
            uri: item.track.uri,
            previewUrl: item.track.preview_url
        }));

        res.json({ tracks });
    } catch (error) {
        console.error('Error getting liked songs:', error);
        res.status(500).json({ error: 'Failed to fetch liked songs from Spotify' });
    }
});

module.exports = router; 