# Password Reset Setup Guide

This guide will help you set up the forgot-password and reset-password functionality in your application.

## 📋 Features

- ✅ Secure token-based password reset
- ✅ Email notifications with reset links
- ✅ Token expiration (1 hour by default)
- ✅ Prevention of token reuse
- ✅ Email enumeration attack prevention
- ✅ Database transaction support
- ✅ Beautiful email templates
- ✅ Production-ready validation schemas

## 🗄️ Database Setup

### 1. Update Prisma Schema

The `prisma/schema.prisma` file has been updated with a new `PasswordReset` model:

```prisma
model PasswordReset {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  token     String   @unique
  expiresAt DateTime
  used      Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([token])
  @@index([userId])
}
```

### 2. Run Migrations

Execute the following commands to update your database:

```bash
# Generate Prisma client
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name add_password_reset

# Or if in production
npx prisma migrate deploy
```

## 🔐 Environment Variables

Add the following environment variables to your `.env` file:

```env
# Application URL (used for generating reset links)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# JWT Secret (already exists)
JWT_SECRET=your-secret-key-here

# Email Service Configuration (Optional - for production)
# Uncomment and configure based on your email provider

# For Resend
# RESEND_API_KEY=re_xxxxxxxxxxxxx
# EMAIL_FROM=noreply@yourdomain.com

# For SendGrid
# SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
# EMAIL_FROM=noreply@yourdomain.com

# For AWS SES
# AWS_ACCESS_KEY_ID=xxxxxxxxxxxxx
# AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxx
# AWS_REGION=us-east-1
# EMAIL_FROM=noreply@yourdomain.com
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── (auth)/
│   │       ├── forgot-password/
│   │       │   └── route.ts          # Forgot password API endpoint
│   │       └── reset-password/
│   │           └── route.ts          # Reset password API endpoint
│   └── (auth)/
│       └── reset-password/
│           └── [token]/
│               └── page.tsx          # Reset password page
├── modules/
│   └── (auth)/
│       ├── forgot-password/
│       │   ├── components/
│       │   │   └── forgot-password-form.tsx
│       │   └── hooks/
│       │       └── useForgotPassword.tsx
│       └── reset-password/
│           ├── components/
│           │   └── reset-password-form.tsx
│           └── hooks/
│               └── useResetPassword.tsx
├── schema/
│   ├── ForgotPasswordSchema.schema.ts    # Zod validation schema
│   └── ResetPasswordSchema.schema.ts     # Zod validation schema
└── helper/
    ├── generateResetToken.ts              # Token generation utility
    └── sendEmail.ts                       # Email service helper
```

## 🚀 API Endpoints

### 1. Forgot Password

**Endpoint:** `POST /api/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "message": "If an account exists with this email, you will receive a password reset link shortly.",
  "status": 200
}
```

**Security Features:**
- Returns same response whether email exists or not (prevents email enumeration)
- Invalidates previous unused tokens
- Generates cryptographically secure tokens
- Sets token expiration

### 2. Reset Password

**Endpoint:** `POST /api/reset-password`

**Request Body:**
```json
{
  "token": "abc123...",
  "password": "newPassword123!",
  "confirmPassword": "newPassword123!"
}
```

**Response (200 OK):**
```json
{
  "message": "Password has been reset successfully. You can now log in with your new password.",
  "status": 200
}
```

**Error Responses:**
- Invalid/expired token: 400
- Token already used: 400
- Validation errors: 400

## 📧 Email Service Integration (Nodemailer)

The application uses **Nodemailer** with SMTP for sending emails.

### Quick Setup

1. **Add SMTP configuration to `.env`:**

```env
SMTP_HOST="smtp.gmail.com"          # Your SMTP host
SMTP_PORT="587"                      # Usually 587 (TLS) or 465 (SSL)
SMTP_USER="your-email@gmail.com"    # Your email address
SMTP_PASS="your-app-password"       # Your email password or app password
EMAIL_FROM="noreply@yourdomain.com" # Optional, defaults to SMTP_USER
```

2. **Test your email configuration:**

```bash
npx tsx src/helper/testEmailConfig.ts
```

This will:
- ✅ Verify your SMTP connection
- ✅ Send a test email
- ✅ Create a free Ethereal test account if no SMTP is configured

### Popular SMTP Providers

#### Gmail (Recommended for Development)
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"  # Generate in Google Account Security
```

#### SendGrid (100 emails/day free)
```env
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
```

#### Mailgun (5,000 emails/month free)
```env
SMTP_HOST="smtp.mailgun.org"
SMTP_PORT="587"
SMTP_USER="postmaster@yourdomain.mailgun.org"
SMTP_PASS="your-mailgun-password"
```

#### AWS SES (Cost-effective)
```env
SMTP_HOST="email-smtp.us-east-1.amazonaws.com"
SMTP_PORT="587"
SMTP_USER="your-aws-smtp-username"
SMTP_PASS="your-aws-smtp-password"
```

#### Ethereal Email (Development Testing)
Run the test script to auto-generate credentials:
```bash
npx tsx src/helper/testEmailConfig.ts
```

**📖 Full Setup Guide:** See `EMAIL_SETUP.md` for detailed configuration for all providers

## 🧪 Testing

### Test Forgot Password Flow

1. Navigate to `/forgot-password`
2. Enter a valid email address
3. Check console logs (development) or email inbox (production)
4. Copy the reset token from the link

### Test Reset Password Flow

1. Use the reset link: `/reset-password/[token]`
2. Enter a new password
3. Confirm the password
4. Submit the form
5. Verify you can log in with the new password

### Test Edge Cases

- ✅ Expired token (wait 1 hour or modify expiry in code)
- ✅ Already used token (try using the same token twice)
- ✅ Invalid token (use a random string)
- ✅ Password validation (try weak passwords)
- ✅ Password mismatch (different password and confirmPassword)

## 🔒 Security Features

1. **Cryptographically Secure Tokens**: Using Node.js `crypto.randomBytes()`
2. **Token Expiration**: Tokens expire after 1 hour
3. **One-Time Use**: Tokens are marked as used after successful reset
4. **Email Enumeration Prevention**: Same response for existing/non-existing emails
5. **Token Invalidation**: Previous tokens are invalidated when a new one is requested
6. **Database Transactions**: Ensures atomic operations
7. **Password Hashing**: Passwords are hashed using bcrypt

## 🎨 Customization

### Change Token Expiry Time

In `src/helper/generateResetToken.ts`:

```typescript
export const getResetTokenExpiry = (hours: number = 2): Date => {
  // Change default from 1 to 2 hours
  const expiry = new Date()
  expiry.setHours(expiry.getHours() + hours)
  return expiry
}
```

### Customize Email Template

Edit the `generatePasswordResetEmailHTML` function in `src/helper/sendEmail.ts` to match your brand:

```typescript
export const generatePasswordResetEmailHTML = (
  resetUrl: string,
  userName: string
): string => {
  return `
    <!-- Your custom HTML template here -->
  `
}
```

### Update Password Validation Rules

Modify `src/schema/ResetPasswordSchema.schema.ts` to add custom password requirements.

## 📝 Usage in Frontend

### Link to Forgot Password Page

```tsx
<Link href="/forgot-password">Forgot Password?</Link>
```

### Using the Hooks

```tsx
// In forgot-password form
import { useForgotPassword } from "@/modules/(auth)/forgot-password/hooks/useForgotPassword"

const { loading, success, error, formData, handleOnChange, handleOnSubmit } = 
  useForgotPassword()

// In reset-password form
import { useResetPassword } from "@/modules/(auth)/reset-password/hooks/useResetPassword"

const { loading, success, error, formData, handleOnChange, handleOnSubmit } = 
  useResetPassword(token)
```

## 🐛 Troubleshooting

### Issue: "Invalid or expired reset token"

- Check if token has expired (1 hour limit)
- Verify token hasn't been used already
- Ensure token is correctly passed in URL

### Issue: Emails not being sent

- Check console logs in development mode
- Verify email service credentials in production
- Check spam/junk folder
- Verify `NEXT_PUBLIC_APP_URL` is set correctly

### Issue: Database errors

- Run `npx prisma generate` after schema changes
- Verify database connection
- Check if migrations are applied

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Zod Validation](https://zod.dev/)
- [Resend Documentation](https://resend.com/docs)

## ✅ Checklist

- [ ] Database migration completed
- [ ] Environment variables configured
- [ ] Email service set up (production)
- [ ] Tested forgot-password flow
- [ ] Tested reset-password flow
- [ ] Tested error scenarios
- [ ] Customized email templates (optional)
- [ ] Updated password validation rules (optional)

## 🎉 You're All Set!

Your password reset functionality is now ready to use. Users can securely reset their passwords through the email verification flow.

