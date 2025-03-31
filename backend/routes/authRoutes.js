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

// Get current user route
router.get('/current_user', (req, res) => {
  if (req.user) {
    res.json({ isLoggedIn: true, user: req.user });
  } else {
    res.json({ isLoggedIn: false });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

// Login failed route
router.get('/login-failed', (req, res) => {
  res.status(401).json({ success: false, message: 'Login failed' });
});

module.exports = router; 