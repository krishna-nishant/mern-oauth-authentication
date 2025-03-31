# Google OAuth Setup

## 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to APIs & Services > OAuth consent screen
4. Set user type (External) and add required info (app name, email)
5. Add scopes: `./auth/userinfo.email`, `./auth/userinfo.profile`

## 2. Create OAuth Credentials
1. Go to APIs & Services > Credentials
2. Click "Create Credentials" > "OAuth client ID"
3. Application type: Web application
4. Add a name for your client
5. Add JavaScript origins:
   - `http://localhost:5000`
   - `http://localhost:5173`
6. Add redirect URI:
   - `http://localhost:5000/auth/google/callback`
7. Click "Create"

## 3. Add Credentials to Environment
Add the following to your `.env` file:
```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

## 4. Verify Configuration
1. Start your application
2. Test Google login button
3. You should be redirected to Google's consent screen 