# Health OS 🏥

> **Your Personal Health Clarity Engine**

A next-generation AI-powered health interpretation platform that transforms complex medical reports into clear, actionable insights. Built with stunning fluid motion design and premium aesthetics.

![Health OS Landing Page](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

- 🔐 **Google OAuth** - Secure authentication with Google Sign-In
- 🎨 **Fluid Motion Design** - Animated gradients, glassmorphism, and smooth micro-interactions
- 📤 **Smart Upload** - Drag-and-drop any medical file (PDF, images, documents)
- 🤖 **AI-Powered Insights** - Clear explanations in plain language, not medical jargon
- 📊 **Health Dashboard** - Track metrics, alerts, and trends in one place
- 📅 **Timeline View** - Visualize your complete health history chronologically
- 🔔 **Critical Alerts** - Instant notifications for values needing attention
- 📱 **Fully Responsive** - Beautiful on desktop, tablet, and mobile
- 🛠️ **Rich Utilities** - Comprehensive utility functions for strings, arrays, objects, URLs, and more
- 🎣 **Custom Hooks** - Reusable React hooks for common patterns
- ⚡ **Performance Monitoring** - Built-in performance tracking and optimization
- 🔄 **Retry Logic** - Automatic retry with exponential backoff for failed operations
- 💾 **Safe Storage** - Error-handled localStorage and sessionStorage wrappers

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/mohammedtalha15/health-os.git
cd health-os

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env` file (copy from `.env.example`):

\`\`\`env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# API Configuration (optional)
NEXT_PUBLIC_API_URL=
\`\`\`

**Important**: 
- Generate `NEXTAUTH_SECRET` with: `openssl rand -base64 32`
- See [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) for detailed Google OAuth setup instructions

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: Vanilla CSS with CSS Modules
- **HTTP Client**: Axios
- **Animations**: Framer Motion + CSS
- **Fonts**: Inter (Google Fonts)

## 📁 Project Structure

\`\`\`
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── login/                # Login page
│   ├── signup/               # Signup page
│   ├── dashboard/            # Health dashboard
│   ├── upload/               # File upload page
│   ├── timeline/             # Health timeline
│   └── api/
│       └── auth/
│           └── [...nextauth]/ # NextAuth API routes
├── components/
│   ├── Header.tsx            # Navigation with auth
│   ├── HeroSection.tsx       # Landing hero
│   └── SessionProvider.tsx   # Auth session provider
├── hooks/
│   └── useAuth.ts            # Authentication hook
├── lib/
│   ├── auth.config.ts        # NextAuth configuration
│   └── api/
│       ├── client.ts         # API client
│       ├── reports.ts        # Reports API
│       └── auth.ts           # Authentication
└── types/
    └── next-auth.d.ts        # NextAuth type definitions
\`\`\`

## 🎨 Design System

### Color Palette

- **Primary**: #2563eb (Medical Blue)
- **Secondary**: #f59e0b (Warm Accent)
- **Success**: #10b981
- **Warning**: #f59e0b
- **Danger**: #ef4444

### Key Design Elements

- Fluid gradient backgrounds with 15s animation loops
- Glassmorphism cards with backdrop blur
- Micro-animations on hover and interaction
- 8px spacing grid system
- Responsive breakpoints: 640px, 1024px, 1280px

## 📸 Screenshots

### Landing Page
Beautiful fluid gradient hero with animated floating orbs

### Dashboard
Health metrics, alerts, and recent reports at a glance

### Upload
Drag-and-drop interface with file preview

### Timeline
Chronological health history visualization

## 🔌 API Integration

The frontend is ready for backend integration with a complete API layer:

### Reports API
- \`uploadReport(file)\` - Upload medical files
- \`getReport(id)\` - Fetch report details
- \`getReportSummary(id, style)\` - Get AI summary
- \`getUserReports()\` - List all reports

### Auth API
- \`login(credentials)\` - User authentication
- \`signup(data)\` - User registration
- \`logout()\` - Clear session

## 🛠️ Development

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

### Linting

\`\`\`bash
npm run lint
\`\`\`

## 🎯 Architecture Principles

1. **Safety First** - No diagnosis, no speculation, only factual insights
2. **Transparency** - Always show data sources
3. **Medical Accuracy** - Rule-based validation before AI interpretation
4. **User Privacy** - Secure data handling and storage
5. **Premium UX** - Beautiful, intuitive, and accessible

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

Mohammed Talha - [@mohammedtalha15](https://github.com/mohammedtalha15)

---

**Built with ❤️ using Next.js and modern web technologies**
