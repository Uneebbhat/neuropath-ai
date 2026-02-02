# 🧠 NeuroPath AI

**NeuroPath AI** is an AI-powered personalized learning engine that dynamically adapts educational content based on learner behavior, performance, and engagement signals. Built with Next.js 16, it provides an intelligent, adaptive learning experience that evolves with every user interaction.

## ✨ Features

- **🤖 AI-Powered Chat**: Real-time AI assistance using Google Gemini and xAI models
- **👤 User Authentication**: Complete auth system with JWT tokens
  - Sign up / Login
  - Password reset via email
  - Secure password hashing with bcrypt
- **🎯 Personalized Onboarding**: Capture learning preferences and goals
- **💬 Interactive Chat Interface**: Stream AI responses in real-time
- **🔒 Protected Routes**: Secure authentication guards for protected pages
- **📧 Email Integration**: Nodemailer for password reset emails
- **🎨 Modern UI**: Beautiful, responsive design with Tailwind CSS and shadcn/ui
- **🌓 Dark Mode Support**: Seamless theme switching

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.4** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - UI component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icons
- **React Markdown** - Markdown rendering

### Backend & Database
- **Prisma 7.3.0** - ORM for database management
- **PostgreSQL** - Primary database
- **Node.js** - Runtime environment

### AI & APIs
- **Vercel AI SDK** - AI integration framework
- **@ai-sdk/google** - Google Gemini integration

### State Management & Utilities
- **Zustand** - Lightweight state management
- **Zod** - Schema validation
- **Axios** - HTTP client
- **JWT** - Token-based authentication
- **Nodemailer** - Email service

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** or **yarn** or **pnpm** or **bun**
- **PostgreSQL** database
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Uneebbhat/neuropath-ai.git
cd neuropath-ai
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/neuropath_ai"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-here"

# Email Configuration (for password reset)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-specific-password"
EMAIL_FROM="NeuroPath AI <your-email@gmail.com>"

# AI API Keys
GOOGLE_GENERATIVE_AI_API_KEY="your-google-gemini-api-key"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup

#### Generate Prisma Client

```bash
npx prisma generate
```

#### Run Database Migrations

```bash
npx prisma migrate dev
```

This will create all necessary tables in your PostgreSQL database:
- `User` - User accounts
- `PasswordReset` - Password reset tokens
- `OnboardingPreference` - User learning preferences
- `Chat` - Chat conversations
- `Message` - Individual chat messages

#### (Optional) Open Prisma Studio

To view and edit your database with a GUI:

```bash
npx prisma studio
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

```
neuropath-ai/
├── prisma/
│   ├── migrations/              # Database migration files
│   │   ├── 20260124160641_user_model_created/
│   │   ├── 20260124181504_reset_password_model_created/
│   │   ├── 20260124181858_password_model_updated/
│   │   ├── 20260127100640_onboarding_preference_model_created/
│   │   └── 20260128115519_chat_model_created/
│   └── schema.prisma            # Prisma schema definition
│
├── public/                      # Static assets
│   ├── logo.png                 # App logo
│   └── *.svg                    # Icon files
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/              # Auth route group
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx     # Forgot password page
│   │   │   ├── login/
│   │   │   │   └── page.tsx     # Login page
│   │   │   ├── reset-password/
│   │   │   │   └── [token]/
│   │   │   │       └── page.tsx # Reset password page
│   │   │   ├── signup/
│   │   │   │   └── page.tsx     # Signup page
│   │   │   ├── privacy-policy/
│   │   │   │   └── page.tsx     # Privacy policy page
│   │   │   ├── terms-of-service/
│   │   │   │   └── page.tsx     # Terms of service page
│   │   │   └── loading.tsx      # Auth loading state
│   │   │
│   │   ├── api/                 # API routes
│   │   │   ├── (auth)/
│   │   │   │   ├── forgot-password/
│   │   │   │   │   └── route.ts # Forgot password API
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts # Login API
│   │   │   │   ├── reset-password/
│   │   │   │   │   └── route.ts # Reset password API
│   │   │   │   └── signup/
│   │   │   │       └── route.ts # Signup API
│   │   │   ├── chat/
│   │   │   │   └── route.ts     # AI chat streaming API
│   │   │   └── onboard/
│   │   │       └── route.ts     # Onboarding API
│   │   │
│   │   ├── chat/                # Chat feature
│   │   │   ├── layout.tsx       # Chat layout
│   │   │   ├── page.tsx         # Chat page (protected)
│   │   │   └── loading.tsx      # Chat loading state
│   │   │
│   │   ├── onboard/             # Onboarding flow
│   │   │   ├── page.tsx         # Onboarding page (protected)
│   │   │   └── loading.tsx      # Onboarding loading state
│   │   │
│   │   ├── generated/           # Prisma generated files
│   │   │   └── prisma/          # Auto-generated Prisma client
│   │   │
│   │   ├── page.tsx             # Landing page (public)
│   │   ├── layout.tsx           # Root layout
│   │   ├── globals.css          # Global styles
│   │   └── favicon.ico          # Favicon
│   │
│   ├── components/              # Reusable components
│   │   ├── RequireAuth.tsx      # Protected route guard (redirects to /login)
│   │   ├── RequireNoAuth.tsx    # Auth route guard (redirects to /chat)
│   │   └── ui/                  # shadcn/ui components
│   │       ├── avatar.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── field.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── prompt-input.tsx
│   │       ├── radio-group.tsx
│   │       ├── separator.tsx
│   │       ├── sonner.tsx       # Toast notifications
│   │       ├── spinner.tsx
│   │       ├── textarea.tsx
│   │       └── tooltip.tsx
│   │
│   ├── modules/                 # Feature modules
│   │   ├── (auth)/              # Authentication module
│   │   │   ├── api/
│   │   │   │   ├── loginUser.ts
│   │   │   │   └── signupUser.ts
│   │   │   ├── forgot-password/
│   │   │   │   ├── components/
│   │   │   │   │   └── forgot-password-form.tsx
│   │   │   │   └── hooks/
│   │   │   │       └── useForgotPassword.tsx
│   │   │   ├── login/
│   │   │   │   ├── components/
│   │   │   │   │   └── login-form.tsx
│   │   │   │   └── hooks/
│   │   │   │       └── useLogin.tsx
│   │   │   ├── reset-password/
│   │   │   │   ├── components/
│   │   │   │   │   └── reset-password-form.tsx
│   │   │   │   └── hooks/
│   │   │   │       └── useResetPassword.tsx
│   │   │   ├── signup/
│   │   │   │   ├── components/
│   │   │   │   │   └── signup-form.tsx
│   │   │   │   └── hooks/
│   │   │   │       └── useSignup.tsx
│   │   │   └── types/
│   │   │       └── types.ts
│   │   │
│   │   ├── chat/                # Chat module
│   │   │   ├── components/
│   │   │   │   ├── chat-form.tsx
│   │   │   │   └── chat-response.tsx
│   │   │   └── hooks/
│   │   │       └── useChat.tsx  # Chat logic & streaming
│   │   │
│   │   └── onboard/             # Onboarding module
│   │       ├── components/
│   │       │   ├── navigation-buttons.tsx
│   │       │   ├── onboard-form.tsx
│   │       │   └── radio-option.tsx
│   │       ├── data/
│   │       │   └── data.ts      # Onboarding questions
│   │       ├── hooks/
│   │       │   └── useOnboard.tsx
│   │       └── types/
│   │           └── types.ts
│   │
│   ├── schema/                  # Zod validation schemas
│   │   ├── ForgotPasswordSchema.schema.ts
│   │   ├── ResetPasswordSchema.schema.ts
│   │   ├── UserLoginSchema.schema.ts
│   │   └── UserSignupSchema.schema.ts
│   │
│   ├── store/                   # State management
│   │   └── useUserStore.ts      # User authentication store (Zustand)
│   │
│   ├── helper/                  # Utility helpers
│   │   ├── generateResetToken.ts
│   │   ├── generateToken.ts     # JWT token generation
│   │   ├── passwordHashing.ts   # Bcrypt utilities
│   │   ├── sendEmail.ts         # Email sending logic
│   │   └── testEmailConfig.ts
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useFormHandler.tsx
│   │   └── useTogglePassword.tsx
│   │
│   ├── dto/                     # Data Transfer Objects
│   │   └── userDTO.dto.ts
│   │
│   ├── interfaces/              # TypeScript interfaces
│   │   └── interfaces.ts
│   │
│   ├── layout/                  # Layout components
│   │   └── ChatLayout.tsx
│   │
│   ├── lib/                     # Library configurations
│   │   ├── prisma.ts            # Prisma client instance
│   │   └── utils.ts             # Utility functions
│   │
│   └── types/                   # TypeScript types
│       └── FormTypes.ts
│
├── .env                         # Environment variables (create this)
├── .gitignore                   # Git ignore rules
├── components.json              # shadcn/ui config
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies & scripts
├── postcss.config.mjs           # PostCSS configuration
├── prisma.config.ts             # Prisma configuration
├── README.md                    # This file
├── tailwind.config.ts           # Tailwind CSS configuration (if exists)
└── tsconfig.json                # TypeScript configuration
```

## 🔐 Authentication Flow

1. **Sign Up**: Users create an account with name, email, and password
2. **Email Verification**: (Optional) Verify email address
3. **Onboarding**: Users complete personalized onboarding questionnaire
4. **Login**: Users authenticate with email and password
5. **JWT Token**: Stored in Zustand with persistence
6. **Protected Routes**: Chat and onboard pages require authentication
7. **Password Reset**: Email-based password recovery system

## 🎯 Key Features Explained

### Protected Routes
- **RequireAuth**: Redirects unauthenticated users to `/login`
- **RequireNoAuth**: Redirects authenticated users to `/chat`

### AI Chat System
- Real-time streaming responses using Vercel AI SDK
- Supports Google Gemini
- Markdown rendering for formatted responses

### State Management
- **Zustand** for lightweight, persistent state
- User authentication state persisted in localStorage
- Automatic rehydration on page load

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Database
npx prisma generate  # Generate Prisma client
npx prisma migrate dev # Run migrations
npx prisma studio    # Open database GUI

# Linting
npm run lint         # Run ESLint
```

## 🌐 Deployment

### Deploy on Vercel

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Database Setup for Production

1. Use a hosted PostgreSQL service (e.g., Supabase, Railway, Neon)
2. Update `DATABASE_URL` in production environment variables
3. Run migrations: `npx prisma migrate deploy`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👤 Author

**Uneeb**

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [Vercel AI SDK](https://sdk.vercel.ai/)
- Icons from [Lucide](https://lucide.dev/)

---

**NeuroPath AI** - Intelligence That Learns How You Learn 🧠✨
