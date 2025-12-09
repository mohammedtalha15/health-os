# Health OS - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### 1. Clone & Install
```bash
git clone https://github.com/mohammedtalha15/health-os.git
cd health-os
npm install
```

### 2. Setup Environment Variables
```bash
# Copy example env file
cp .env.example .env

# Edit .env and add your values
# At minimum, set:
# - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)
# - NEXTAUTH_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. (Optional) Setup Google OAuth
See [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) for detailed instructions.

### 5. (Optional) Run Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## 📚 Key Features

- ✅ **Google OAuth** - Secure authentication
- ✅ **Emergency Snapshot** - QR code health cards
- ✅ **Timeline Visualization** - Interactive health history
- ✅ **LLM Explanations** - AI-powered insights
- ✅ **Family Profiles** - Multi-user support
- ✅ **Advanced Animations** - Framer Motion UI

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Google OAuth Errors
Make sure you've added the redirect URI in Google Cloud Console:
```
http://localhost:3000/api/auth/callback/google
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📖 Documentation

- [Environment Setup](./ENV_SETUP.md)
- [Google OAuth Setup](./GOOGLE_OAUTH_SETUP.md)
- [Implementation Progress](./IMPLEMENTATION_PROGRESS.md)
- [Final Build Summary](./FINAL_BUILD_SUMMARY.md)

## 🎯 Next Steps

1. Configure your environment variables
2. Set up Google OAuth (optional)
3. Start the backend server (optional)
4. Explore the dashboard at `/dashboard`
5. Try uploading a medical report

---

**Need help?** Check the documentation files or open an issue on GitHub.
