# GitHub OAuth Setup

## 1. Create a GitHub OAuth App
1. Go to GitHub > Settings > Developer settings > [OAuth Apps](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - Application name: Your app name
   - Homepage URL: `http://localhost:5173`
   - Authorization callback URL: `http://localhost:5000/auth/github/callback`
4. Click "Register application"

## 2. Generate Client Secret
1. In your OAuth App's settings, click "Generate a new client secret"
2. Save both the Client ID and Client Secret for your application

## 3. Add Credentials to Environment
Add the following to your `.env` file:
```
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

## 4. Verify Configuration
1. Start your application
2. Test GitHub login button
3. You should be redirected to GitHub's authorization page 