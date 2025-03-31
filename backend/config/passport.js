const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
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
} else {
    console.warn('Google OAuth credentials not found in environment variables.');
    console.warn('Google authentication will not be available.');
}

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

// Set up LinkedIn OAuth Strategy
if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
    passport.use(new LinkedInStrategy({
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: '/auth/linkedin/callback',
        scope: ['openid', 'profile', 'email'],
        state: true
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("LinkedIn profile received:", profile.displayName);

                // Check if user already exists in database
                let user = await User.findOne({ linkedinId: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Get email from profile
                let email = null;
                if (profile.emails && profile.emails.length > 0) {
                    email = profile.emails[0].value;
                } else {
                    // Use a placeholder if email not available
                    email = `linkedin-user-${profile.id}@example.com`;
                }

                // Get profile photo if available
                const pictureUrl = profile.photos && profile.photos.length > 0
                    ? profile.photos[0].value
                    : null;

                // Create a new user
                user = new User({
                    linkedinId: profile.id,
                    displayName: profile.displayName || 'LinkedIn User',
                    email: email,
                    picture: pictureUrl,
                    provider: 'linkedin'
                });

                await user.save();
                return done(null, user);
            } catch (error) {
                console.error('LinkedIn auth error:', error);
                return done(error, null);
            }
        }
    ));
} else {
    console.warn('LinkedIn OAuth credentials not found in environment variables.');
    console.warn('LinkedIn authentication will not be available.');
}

// Set up Twitter OAuth Strategy
if (process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_CONSUMER_SECRET) {
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: '/auth/twitter/callback',
        includeEmail: true
    },
        async (token, tokenSecret, profile, done) => {
            try {
                console.log("Twitter profile received:", profile.username);

                // Check if user already exists in database
                let user = await User.findOne({ twitterId: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Get profile data
                const displayName = profile.displayName || profile.username || 'Twitter User';

                // Handle email - Twitter may hide emails
                let email = null;
                if (profile.emails && profile.emails.length > 0) {
                    email = profile.emails[0].value;
                } else {
                    // Use a placeholder if email not accessible
                    email = `${profile.username || 'user'}@twitter.example.com`;
                }

                // Get profile photo if available
                const pictureUrl = profile.photos && profile.photos.length > 0
                    ? profile.photos[0].value.replace('_normal', '') // Get larger image
                    : null;

                // Create a new user
                user = new User({
                    twitterId: profile.id,
                    displayName: displayName,
                    email: email,
                    picture: pictureUrl,
                    provider: 'twitter'
                });

                await user.save();
                return done(null, user);
            } catch (error) {
                console.error('Twitter auth error:', error);
                return done(error, null);
            }
        }));
} else {
    console.warn('Twitter OAuth credentials not found in environment variables.');
    console.warn('Twitter authentication will not be available.');
}

// Set up Facebook OAuth Strategy
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("Facebook profile received:", profile.displayName);
            
            // Check if user already exists in database
            let user = await User.findOne({ facebookId: profile.id });
            
            if (user) {
                return done(null, user);
            }
            
            // Get email from profile
            let email = null;
            if (profile.emails && profile.emails.length > 0) {
                email = profile.emails[0].value;
            } else {
                // Use a placeholder if email not accessible
                email = `facebook-user-${profile.id}@example.com`;
            }
            
            // Get profile photo if available
            const pictureUrl = profile.photos && profile.photos.length > 0 
                ? profile.photos[0].value
                : null;
            
            // Create a new user
            user = new User({
                facebookId: profile.id,
                displayName: profile.displayName || 'Facebook User',
                email: email,
                picture: pictureUrl,
                provider: 'facebook'
            });
            
            await user.save();
            return done(null, user);
        } catch (error) {
            console.error('Facebook auth error:', error);
            return done(error, null);
        }
    }));
} else {
    console.warn('Facebook OAuth credentials not found in environment variables.');
    console.warn('Facebook authentication will not be available.');
}

module.exports = passport; 