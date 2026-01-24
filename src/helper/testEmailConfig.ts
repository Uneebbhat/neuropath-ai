/**
 * Test Email Configuration Script
 * Use this to test your email setup with Ethereal Email (fake SMTP service)
 * Run: npx tsx src/helper/testEmailConfig.ts
 */

import nodemailer from "nodemailer"

async function testEmailConfiguration() {
  console.log("🧪 Testing Email Configuration...")
  console.log("================================\n")

  try {
    // Option 1: Use your actual SMTP credentials
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      console.log("📧 Using configured SMTP settings:")
      console.log("Host:", process.env.SMTP_HOST)
      console.log("Port:", process.env.SMTP_PORT)
      console.log("User:", process.env.SMTP_USER)
      console.log("")

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: parseInt(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      // Verify connection
      await transporter.verify()
      console.log("✅ SMTP connection verified successfully!")

      // Send test email
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: process.env.SMTP_USER, // Send to yourself for testing
        subject: "Test Email - NeuroPath AI",
        text: "This is a test email from NeuroPath AI. If you receive this, your email configuration is working correctly!",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #333;">✅ Email Configuration Test</h2>
            <p>This is a test email from <strong>NeuroPath AI</strong>.</p>
            <p>If you receive this, your email configuration is working correctly!</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              Sent at: ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      })

      console.log("\n✅ Test email sent successfully!")
      console.log("Message ID:", info.messageId)
      console.log("\n🎉 Your email configuration is working!\n")
    } else {
      // Option 2: Create test account with Ethereal Email
      console.log("⚠️  No SMTP configuration found in environment variables")
      console.log("📧 Creating test account with Ethereal Email...\n")

      const testAccount = await nodemailer.createTestAccount()

      console.log("✅ Test account created!")
      console.log("\n📋 Add these to your .env file:\n")
      console.log(`SMTP_HOST="${testAccount.smtp.host}"`)
      console.log(`SMTP_PORT="${testAccount.smtp.port}"`)
      console.log(`SMTP_USER="${testAccount.user}"`)
      console.log(`SMTP_PASS="${testAccount.pass}"`)
      console.log(`EMAIL_FROM="${testAccount.user}"`)
      console.log("")

      // Send test email with Ethereal
      const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      })

      const info = await transporter.sendMail({
        from: testAccount.user,
        to: "test@example.com",
        subject: "Test Email - NeuroPath AI (Ethereal)",
        text: "This is a test email using Ethereal Email service.",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #333;">✅ Email Configuration Test (Ethereal)</h2>
            <p>This is a test email using <strong>Ethereal Email</strong> service.</p>
            <p>This is a fake SMTP service for development testing.</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              Sent at: ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      })

      console.log("✅ Test email sent!")
      console.log("\n📧 Preview your email at:")
      console.log(nodemailer.getTestMessageUrl(info))
      console.log("\n💡 Note: Ethereal Email is for testing only. Use a real SMTP service in production.")
      console.log("")
    }
  } catch (error) {
    console.error("\n❌ Error testing email configuration:")
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    console.log("\n📖 Please check your SMTP credentials and try again.\n")
    process.exit(1)
  }
}

// Run the test
testEmailConfiguration()
  .then(() => {
    console.log("✅ Test completed successfully!\n")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Test failed:", error)
    process.exit(1)
  })

