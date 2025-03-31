# Twitter OAuth Setup

## 1. Create a Twitter Developer Account
1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Sign up for a developer account if you don't have one

## 2. Create a Project & App
1. In the Developer Portal, create a new Project
2. Create an App within that Project
3. Set up User authentication settings:
   - Select "Web App" as App type
   - Enable OAuth 2.0
   - Set App permissions to "Read"
   - Enter Callback URL: `http://localhost:5000/auth/twitter/callback`
   - Enter Website URL: `http://localhost:5173`

## 3. Get API Keys
1. Go to the "Keys and tokens" tab
2. Copy the API Key (Consumer Key) and API Key Secret (Consumer Secret)

## 4. Add Credentials to Environment
Add the following to your `.env` file:
```
TWITTER_CONSUMER_KEY=your_api_key
TWITTER_CONSUMER_SECRET=your_api_key_secret
```

## 5. Verify Configuration
1. Start your application
2. Test Twitter login button
3. You should be redirected to Twitter's authorization page 