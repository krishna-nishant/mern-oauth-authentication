# LinkedIn OAuth Setup

## 1. Create a LinkedIn App
1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Click "Create app"
3. Fill in the required information:
   - App name
   - LinkedIn Page/Company
   - App logo
4. Click "Create app" to proceed

## 2. Configure Auth Settings
1. In your app dashboard, go to the "Auth" tab
2. Under "OAuth 2.0 settings", add redirect URL:
   - `http://localhost:5000/auth/linkedin/callback`
3. Request the following OAuth 2.0 scopes:
   - `r_liteprofile`
   - `r_emailaddress`

## 3. Get Credentials
1. Still in the "Auth" tab, find your Client ID and Client Secret
2. Save both values for your application

## 4. Add Credentials to Environment
Add the following to your `.env` file:
```
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
```

## 5. Verify Configuration
1. Start your application
2. Test LinkedIn login button
3. You should be redirected to LinkedIn's authorization page 