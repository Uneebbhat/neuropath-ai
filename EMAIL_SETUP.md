# 📧 Email Setup Guide - Nodemailer

This guide will help you configure email sending using Nodemailer for the password reset functionality.

## 🚀 Quick Setup

### Step 1: Environment Variables

Add these variables to your `.env` file:

```env
# SMTP Configuration (Required)
SMTP_HOST="smtp.gmail.com"          # Your SMTP host
SMTP_PORT="587"                      # Usually 587 (TLS) or 465 (SSL)
SMTP_USER="your-email@gmail.com"    # Your email address
SMTP_PASS="your-app-password"       # Your email password or app password

# Email From Address (Optional - defaults to SMTP_USER)
EMAIL_FROM="noreply@yourdomain.com"
```

### Step 2: Test Your Configuration

Run the test script to verify your email setup:

```bash
# Test your email configuration
npx tsx src/helper/testEmailConfig.ts
```

This will:
- ✅ Verify your SMTP connection
- ✅ Send a test email
- ✅ Display any errors for troubleshooting

If you don't have SMTP credentials, the script will create a **free Ethereal Email** test account for you!

## 📮 Popular Email Providers

### 1. Gmail (Recommended for Development)

**Settings:**
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

**Setup Steps:**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App Passwords**
4. Generate a new app password for "Mail"
5. Use the generated password in `SMTP_PASS`

**Note:** Don't use your actual Gmail password - use an App Password!

### 2. Outlook / Hotmail / Microsoft 365

**Settings:**
```env
SMTP_HOST="smtp-mail.outlook.com"
SMTP_PORT="587"
SMTP_USER="your-email@outlook.com"
SMTP_PASS="your-password"
```

**For Microsoft 365:**
```env
SMTP_HOST="smtp.office365.com"
SMTP_PORT="587"
```

### 3. Yahoo Mail

**Settings:**
```env
SMTP_HOST="smtp.mail.yahoo.com"
SMTP_PORT="587"
SMTP_USER="your-email@yahoo.com"
SMTP_PASS="your-app-password"
```

**Setup Steps:**
1. Go to Yahoo Account Security
2. Generate an app password
3. Use the app password in `SMTP_PASS`

### 4. Custom SMTP / cPanel / Hosting Provider

**Settings:**
```env
SMTP_HOST="mail.yourdomain.com"
SMTP_PORT="587"                    # or 465 for SSL
SMTP_USER="your-email@yourdomain.com"
SMTP_PASS="your-password"
```

Contact your hosting provider for exact SMTP settings.

### 5. SendGrid (Production Recommended)

**Settings:**
```env
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"                 # Literally "apikey"
SMTP_PASS="your-sendgrid-api-key"
```

**Setup Steps:**
1. Sign up at [SendGrid](https://sendgrid.com)
2. Create an API Key
3. Use "apikey" as username
4. Use your API key as password

**Free Tier:** 100 emails/day

### 6. Mailgun (Production Alternative)

**Settings:**
```env
SMTP_HOST="smtp.mailgun.org"
SMTP_PORT="587"
SMTP_USER="postmaster@yourdomain.mailgun.org"
SMTP_PASS="your-mailgun-password"
```

**Free Tier:** 5,000 emails/month

### 7. AWS SES (Scalable Production)

**Settings:**
```env
SMTP_HOST="email-smtp.us-east-1.amazonaws.com"  # Region-specific
SMTP_PORT="587"
SMTP_USER="your-aws-smtp-username"
SMTP_PASS="your-aws-smtp-password"
```

**Setup Steps:**
1. Set up AWS SES in your AWS Console
2. Verify your domain or email
3. Generate SMTP credentials
4. Request production access (starts in sandbox mode)

### 8. Ethereal Email (Development Testing)

**Automatic Setup:**
```bash
npx tsx src/helper/testEmailConfig.ts
```

This creates a **free temporary test account** automatically!

**Manual Setup:**
1. Go to [Ethereal Email](https://ethereal.email)
2. Create a test account
3. Use the provided SMTP credentials

**Note:** Emails are NOT actually sent - only stored for preview. Perfect for development!

## 🔧 Port Configuration

| Port | Protocol | When to Use |
|------|----------|-------------|
| 587  | TLS (STARTTLS) | **Recommended** - Most widely supported |
| 465  | SSL | Legacy SSL connections |
| 25   | Plain | Usually blocked by ISPs, avoid |
| 2525 | Alternative TLS | Some providers (e.g., Mailgun) |

## 🧪 Testing Your Setup

### Method 1: Use Test Script (Recommended)

```bash
npx tsx src/helper/testEmailConfig.ts
```

### Method 2: Test from Your App

1. Start your development server:
```bash
npm run dev
```

2. Go to `/forgot-password`
3. Enter your email
4. Check your inbox (or console logs)

### Method 3: Manual Node.js Test

Create `test-email.js`:
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password',
  },
});

transporter.sendMail({
  from: 'your-email@gmail.com',
  to: 'recipient@example.com',
  subject: 'Test Email',
  text: 'This is a test email!',
}).then(info => {
  console.log('Email sent:', info.messageId);
}).catch(err => {
  console.error('Error:', err);
});
```

Run: `node test-email.js`

## 🐛 Troubleshooting

### Issue: "Invalid login" or "Authentication failed"

**Solutions:**
- ✅ Verify credentials are correct
- ✅ For Gmail: Use App Password, not your account password
- ✅ Check if 2FA is enabled and required
- ✅ Verify account is not locked or suspended

### Issue: "Connection timeout" or "ETIMEDOUT"

**Solutions:**
- ✅ Check firewall/antivirus settings
- ✅ Try port 465 instead of 587
- ✅ Verify SMTP_HOST is correct
- ✅ Check if ISP blocks SMTP ports

### Issue: "Self-signed certificate" error

**Solution:**
```typescript
// In createTransporter(), add:
tls: {
  rejectUnauthorized: false  // Only for development!
}
```

### Issue: Emails going to spam

**Solutions:**
- ✅ Set up SPF, DKIM, and DMARC records (production)
- ✅ Use a professional "From" address
- ✅ Avoid spam trigger words
- ✅ Use a reputable email service (SendGrid, Mailgun)
- ✅ Warm up your domain (gradually increase send volume)

### Issue: "Too many connections" or rate limiting

**Solutions:**
- ✅ Use connection pooling (add to transporter):
  ```typescript
  pool: true,
  maxConnections: 5,
  ```
- ✅ Implement email queue (Bull, BullMQ)
- ✅ Upgrade to paid tier with higher limits

## 🔒 Security Best Practices

### 1. Never Commit Credentials
```bash
# Always use .env files
# Add .env to .gitignore
echo ".env" >> .gitignore
```

### 2. Use App Passwords
- ✅ Never use your main account password
- ✅ Generate app-specific passwords
- ✅ Rotate passwords regularly

### 3. Environment-Specific Configs
```typescript
// Different settings per environment
const smtpConfig = {
  development: {
    // Use Ethereal or test account
  },
  production: {
    // Use production SMTP service
  }
}
```

### 4. Rate Limiting
```typescript
// Implement rate limiting on forgot-password endpoint
// e.g., max 3 requests per hour per email
```

### 5. Monitor Email Delivery
- ✅ Log all email attempts
- ✅ Monitor bounce rates
- ✅ Track delivery success/failure
- ✅ Set up alerts for failures

## 📊 Production Recommendations

### For Small Apps (< 1000 emails/month)
- ✅ Gmail with App Password (free)
- ✅ Outlook (free)
- ✅ cPanel SMTP (usually included with hosting)

### For Medium Apps (< 10,000 emails/month)
- ✅ SendGrid (free tier: 100/day)
- ✅ Mailgun (free tier: 5,000/month)
- ✅ AWS SES (paid, but very affordable)

### For Large Apps (> 10,000 emails/month)
- ✅ AWS SES (most cost-effective)
- ✅ SendGrid (paid plans)
- ✅ Mailgun (paid plans)
- ✅ Postmark (transactional emails)

## 📚 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail SMTP Settings](https://support.google.com/mail/answer/7126229)
- [SendGrid SMTP Guide](https://docs.sendgrid.com/for-developers/sending-email/integrating-with-the-smtp-api)
- [AWS SES Guide](https://docs.aws.amazon.com/ses/)

## ✅ Quick Checklist

- [ ] Environment variables added to `.env`
- [ ] SMTP credentials verified
- [ ] Test script run successfully (`npx tsx src/helper/testEmailConfig.ts`)
- [ ] Test email received in inbox
- [ ] Forgot password flow tested
- [ ] Reset password email received
- [ ] Production SMTP service chosen (for deployment)
- [ ] Email monitoring set up (optional)

---

**Need help?** Check the troubleshooting section or open an issue!

