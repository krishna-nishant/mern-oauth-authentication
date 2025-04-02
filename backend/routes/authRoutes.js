const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google auth routes
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login-failed',
        successRedirect: process.env.CLIENT_URL
    })
);

// GitHub auth routes
router.get('/github',
    passport.authenticate('github')
);

router.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/login-failed',
        successRedirect: process.env.CLIENT_URL
    })
);

// LinkedIn auth routes
router.get('/linkedin',
    passport.authenticate('linkedin')
);

router.get('/linkedin/callback',
    passport.authenticate('linkedin', {
        failureRedirect: '/login-failed',
        successRedirect: process.env.CLIENT_URL
    })
);

// Twitter auth routes
router.get('/twitter',
    passport.authenticate('twitter')
);

router.get('/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/login-failed',
        successRedirect: process.env.CLIENT_URL
    })
);

// Facebook auth routes
router.get('/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login-failed',
        successRedirect: process.env.CLIENT_URL
    })
);

// Get current user route
router.get('/current_user', (req, res) => {
    if (req.user) {
        res.json({ isLoggedIn: true, user: req.user });
    } else {
        res.json({ isLoggedIn: false });
    }
});

// Logout route
router.all('/logout', (req, res) => {
    // Destroy the session completely
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout' });
        }
        // Clear the cookie
        res.clearCookie('connect.sid');
        // Always return JSON response and let client handle redirection
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Login failed route
router.get('/login-failed', (req, res) => {
    res.status(401).json({ success: false, message: 'Login failed' });
});

module.exports = router; 