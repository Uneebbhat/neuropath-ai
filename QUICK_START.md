# 🚀 Quick Start - Password Reset Feature

## What Was Created

### ✅ Database Schema
- Added `PasswordReset` model to `prisma/schema.prisma`
- Includes token, expiration, user relation, and usage tracking

### ✅ API Endpoints
1. **`POST /api/forgot-password`** - Request password reset
2. **`POST /api/reset-password`** - Reset password with token

### ✅ Frontend Components
1. **Updated Forgot Password Form** - Fully functional with API integration
2. **New Reset Password Page** - `/reset-password/[token]`
3. **Custom Hooks** - `useForgotPassword` and `useResetPassword`

### ✅ Validation Schemas
- `ForgotPasswordSchema.schema.ts` - Email validation
- `ResetPasswordSchema.schema.ts` - Password + confirmation validation

### ✅ Helper Functions
- `generateResetToken.ts` - Secure token generation
- `sendEmail.ts` - Email service with HTML templates

### ✅ Documentation
- `PASSWORD_RESET_SETUP.md` - Complete setup guide
- `setup-password-reset.bat` - Windows setup script
- `setup-password-reset.sh` - Unix/Mac setup script

## 🏃‍♂️ Quick Setup (3 Steps)

### Step 1: Add Environment Variables

Create or update your `.env` file with:

```env
# Required
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional (for production email)
# RESEND_API_KEY="your-api-key"
# EMAIL_FROM="noreply@yourdomain.com"
```

### Step 2: Run Database Migration

**Windows:**
```bash
setup-password-reset.bat
```

**Mac/Linux:**
```bash
chmod +x setup-password-reset.sh
./setup-password-reset.sh
```

**Or manually:**
```bash
npx prisma generate
npx prisma migrate dev --name add_password_reset
```

### Step 3: Test It Out

1. Go to `http://localhost:3000/forgot-password`
2. Enter your email
3. Check the console for the reset link (development mode)
4. Click the link or visit `/reset-password/[token]`
5. Enter and confirm your new password
6. Log in with the new password!

## 📧 Email Configuration (Nodemailer)

The app uses **Nodemailer** for sending emails via SMTP.

### Quick Setup

1. **Add SMTP credentials to `.env`:**

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
EMAIL_FROM="noreply@yourdomain.com"
```

2. **Test your configuration:**

```bash
npx tsx src/helper/testEmailConfig.ts
```

This will verify your SMTP connection and send a test email!

### Popular Providers

- **Gmail** - Use App Password (see `EMAIL_SETUP.md`)
- **Outlook** - `smtp-mail.outlook.com`
- **SendGrid** - `smtp.sendgrid.net` (100 emails/day free)
- **Mailgun** - `smtp.mailgun.org` (5,000 emails/month free)
- **AWS SES** - Cost-effective for high volume
- **Ethereal Email** - Auto-generated test account (development only)

**📖 Full Guide:** See `EMAIL_SETUP.md` for detailed setup instructions for all providers.

## 🧪 Testing Checklist

- [ ] Forgot password form accepts email
- [ ] Email/console shows reset link with token
- [ ] Reset password page loads with token
- [ ] New password can be set
- [ ] Can log in with new password
- [ ] Old token doesn't work after reset
- [ ] Expired token shows error (wait 1 hour or modify expiry)
- [ ] Invalid token shows error

## 🔧 File Structure

```
├── prisma/
│   └── schema.prisma (UPDATED)
├── src/
│   ├── app/
│   │   ├── api/(auth)/
│   │   │   ├── forgot-password/route.ts (NEW)
│   │   │   └── reset-password/route.ts (NEW)
│   │   └── (auth)/
│   │       └── reset-password/[token]/page.tsx (NEW)
│   ├── modules/(auth)/
│   │   ├── forgot-password/
│   │   │   ├── components/forgot-password-form.tsx (UPDATED)
│   │   │   └── hooks/useForgotPassword.tsx (NEW)
│   │   └── reset-password/
│   │       ├── components/reset-password-form.tsx (NEW)
│   │       └── hooks/useResetPassword.tsx (NEW)
│   ├── schema/
│   │   ├── ForgotPasswordSchema.schema.ts (NEW)
│   │   └── ResetPasswordSchema.schema.ts (NEW)
│   └── helper/
│       ├── generateResetToken.ts (NEW)
│       └── sendEmail.ts (NEW)
├── PASSWORD_RESET_SETUP.md (NEW)
├── QUICK_START.md (NEW)
├── setup-password-reset.bat (NEW)
└── setup-password-reset.sh (NEW)
```

## 🔒 Security Features

✅ Cryptographically secure tokens (32 bytes)  
✅ Token expiration (1 hour)  
✅ One-time use tokens  
✅ Email enumeration prevention  
✅ Automatic token invalidation  
✅ Database transactions  
✅ Password hashing with bcrypt  

## 🎨 Customization

### Change Token Expiry

Edit `src/helper/generateResetToken.ts`:
```typescript
export const getResetTokenExpiry = (hours: number = 2): Date => {
  // Changed from 1 to 2 hours
```

### Customize Email Template

Edit `generatePasswordResetEmailHTML()` in `src/helper/sendEmail.ts`

### Update Validation Rules

Edit `src/schema/ResetPasswordSchema.schema.ts`

## 💡 Tips

- In development, check your terminal console for "email" output
- Reset links expire in 1 hour by default
- Tokens are single-use only
- All previous tokens are invalidated after successful reset
- Use strong passwords (8+ characters)

## 🐛 Common Issues

**Issue:** Database error  
**Fix:** Run `npx prisma generate && npx prisma migrate dev`

**Issue:** Token not found  
**Fix:** Check token in URL matches the one in email/console

**Issue:** Token expired  
**Fix:** Request a new password reset link

## 📚 Need More Info?

Check `PASSWORD_RESET_SETUP.md` for comprehensive documentation including:
- Detailed API documentation
- Email service integration guides
- Security best practices
- Troubleshooting guide
- Production deployment checklist

---

**Need help?** Open an issue or check the detailed documentation in `PASSWORD_RESET_SETUP.md`

