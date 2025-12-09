# Health OS - Environment Variables

This file contains all environment variables needed for the Health OS application.

## Frontend (.env)

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl-rand-base64-32

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Backend (backend/.env)

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/healthos

# JWT Secret
SECRET_KEY=your-secret-key-here

# AWS S3
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
S3_BUCKET_NAME=healthos-reports

# Google Cloud Vision
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Anthropic
ANTHROPIC_API_KEY=your-anthropic-api-key

# Redis (for Celery)
REDIS_URL=redis://localhost:6379/0

# Sentry (optional)
SENTRY_DSN=your-sentry-dsn
```

## Setup Instructions

1. Copy this file to `.env` in the root directory
2. Fill in your actual values
3. Never commit `.env` to git (it's in `.gitignore`)
4. For production, use environment variables in your hosting platform

## Generating Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate SECRET_KEY
openssl rand -hex 32
```
