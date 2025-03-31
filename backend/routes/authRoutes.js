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

router.get('/github/callback', (req, res, next) => {
  passport.authenticate('github', (err, user, info) => {
    if (err) {
      console.error('GitHub authentication error:', err);
      return res.redirect(`${process.env.CLIENT_URL}?authError=github`);
    }
    
    if (!user) {
      console.error('GitHub authentication failed:', info);
      return res.redirect(`${process.env.CLIENT_URL}?authError=github`);
    }
    
    req.login(user, (loginErr) => {
      if (loginErr) {
        console.error('GitHub login error:', loginErr);
        return res.redirect(`${process.env.CLIENT_URL}?authError=github`);
      }
      return res.redirect(process.env.CLIENT_URL);
    });
  })(req, res, next);
});

// LinkedIn auth routes
router.get('/linkedin', 
  passport.authenticate('linkedin')
);

router.get('/linkedin/callback', (req, res, next) => {
  passport.authenticate('linkedin', (err, user, info) => {
    if (err) {
      console.error('LinkedIn authentication error:', err);
      return res.redirect(`${process.env.CLIENT_URL}?authError=linkedin`);
    }
    
    if (!user) {
      console.error('LinkedIn authentication failed:', info);
      return res.redirect(`${process.env.CLIENT_URL}?authError=linkedin`);
    }
    
    req.login(user, (loginErr) => {
      if (loginErr) {
        console.error('LinkedIn login error:', loginErr);
        return res.redirect(`${process.env.CLIENT_URL}?authError=linkedin`);
      }
      return res.redirect(process.env.CLIENT_URL);
    });
  })(req, res, next);
});

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