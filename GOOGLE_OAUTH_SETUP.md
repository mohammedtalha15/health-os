# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for Health OS.

## Prerequisites

- A Google account
- Access to [Google Cloud Console](https://console.cloud.google.com/)

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter a project name (e.g., "Health OS")
5. Click "Create"

## Step 2: Enable Google+ API

1. In your project, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type
3. Click "Create"
4. Fill in the required fields:
   - App name: Health OS
   - User support email: Your email
   - Developer contact information: Your email
5. Click "Save and Continue"
6. Skip the "Scopes" section (click "Save and Continue")
7. Add test users if needed
8. Click "Save and Continue"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Configure the following:
   - Name: Health OS Web Client
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - Your production URL (when deploying)
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://your-domain.com/api/auth/callback/google` (for production)
5. Click "Create"
6. Copy the **Client ID** and **Client Secret**

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your credentials:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   GOOGLE_CLIENT_ID=your-client-id-from-step-4
   GOOGLE_CLIENT_SECRET=your-client-secret-from-step-4
   ```

3. Generate a secure `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and paste it as the value for `NEXTAUTH_SECRET`

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/signup` or `http://localhost:3000/login`

3. Click the "Google" button

4. You should be redirected to Google's login page

5. After successful authentication, you'll be redirected back to your dashboard

## Production Deployment

When deploying to production:

1. Update `NEXTAUTH_URL` in your environment variables to your production URL
2. Add your production domain to the authorized origins and redirect URIs in Google Cloud Console
3. Ensure your `NEXTAUTH_SECRET` is a strong, randomly generated value

## Troubleshooting

### "Redirect URI mismatch" error
- Make sure the redirect URI in Google Cloud Console exactly matches: `http://localhost:3000/api/auth/callback/google`
- Check that there are no trailing slashes

### "Access blocked" error
- Make sure you've added your email as a test user in the OAuth consent screen
- If the app is not verified, you'll need to add test users or go through the verification process

### Session not persisting
- Make sure `NEXTAUTH_SECRET` is set in your environment variables
- Clear your browser cookies and try again

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
