const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

// Passport serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Set up Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists in database
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
                return done(null, user);
            }

            // If not, create a new user
            user = new User({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                picture: profile.photos[0].value,
                provider: 'google'
            });

            await user.save();
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
));


// Set up GitHub OAuth Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("GitHub profile received:", profile.username);
                
                // Check if user already exists in database
                let user = await User.findOne({ githubId: profile.id });
                
                if (user) {
                    return done(null, user);
                }
                
                // Get profile data - handle missing values gracefully
                const displayName = profile.displayName || profile.username || 'GitHub User';
                let email = null;
                
                // Handle email - GitHub may hide emails
                if (profile.emails && profile.emails.length > 0) {
                    email = profile.emails[0].value;
                } else {
                    // Use a placeholder with GitHub username if email not accessible
                    email = `${profile.username || 'user'}@github.example.com`;
                }
                
                // Get profile photo if available
                const pictureUrl = profile.photos && profile.photos.length > 0 
                    ? profile.photos[0].value 
                    : null;
                
                // Create a new user
                user = new User({
                    githubId: profile.id,
                    displayName: displayName,
                    email: email,
                    picture: pictureUrl,
                    provider: 'github'
                });
                
                await user.save();
                return done(null, user);
            } catch (error) {
                console.error('GitHub auth error:', error);
                return done(error, null);
            }
        }
    ));
} else {
    console.warn('GitHub OAuth credentials not found in environment variables.');
    console.warn('GitHub authentication will not be available.');
}

module.exports = passport; 