const mongoose = require('mongoose');

// Define User model
const userSchema = new mongoose.Schema({
  googleId: String,
  githubId: String,
  linkedinId: String,
  twitterId: String,
  facebookId: String,
  displayName: String,
  email: String,
  picture: String,
  provider: {
    type: String,
    enum: ['google', 'github', 'linkedin', 'twitter', 'facebook']
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 