@echo off
echo 🚀 Setting up Password Reset Functionality
echo ==========================================
echo.

REM Check if .env file exists
if not exist ".env" (
    echo ⚠️  No .env file found!
    echo 📝 Please create a .env file with the following variables:
    echo.
    echo DATABASE_URL="postgresql://user:password@localhost:5432/neuropath_ai"
    echo JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
    echo NEXT_PUBLIC_APP_URL="http://localhost:3000"
    echo.
    echo For production, also add email service credentials (see PASSWORD_RESET_SETUP.md)
    echo.
    pause
    exit /b 1
)

echo ✅ Environment file found
echo.

echo 📦 Installing dependencies (if needed)...
call npm install
echo.

echo 🔄 Generating Prisma Client...
call npx prisma generate
echo.

echo 🗄️  Creating database migration...
call npx prisma migrate dev --name add_password_reset
echo.

echo ✅ Setup complete!
echo.
echo 📖 Next steps:
echo    1. Check PASSWORD_RESET_SETUP.md for detailed documentation
echo    2. Configure email service for production (currently in development mode)
echo    3. Test the forgot-password flow at /forgot-password
echo    4. Test the reset-password flow with the token from email
echo.
echo 🎉 You're all set!
echo.
pause

