# Facebook OAuth Setup

## 1. Create a Facebook App
1. Go to [Facebook Developer Portal](https://developers.facebook.com/)
2. Click "My Apps" > "Create App"
3. Select app type "Consumer" 
4. Fill in app name and contact email
5. Click "Create App"

## 2. Set Up Facebook Login
1. On your app dashboard, click "Add Product"
2. Select "Facebook Login" > "Web"
3. Skip the quick start
4. In Facebook Login settings:
   - Add Valid OAuth Redirect URI: `http://localhost:5000/auth/facebook/callback`
   - Save changes

## 3. Configure Basic Settings
1. Go to "Settings" > "Basic"
2. Complete required fields (Privacy Policy URL, App Icon, etc.)
3. Copy the App ID and App Secret

## 4. Add Credentials to Environment
Add the following to your `.env` file:
```
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
```

## 5. Verify Configuration
1. Start your application
2. Test Facebook login button
3. You should be redirected to Facebook's authorization dialog

## Note
For development, you can use the app in development mode. For production use, you'll need to go through App Review. 