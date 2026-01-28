-- CreateTable
CREATE TABLE "OnboardingPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "learningPreference" TEXT NOT NULL,
    "constraints" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnboardingPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingPreference_userId_key" ON "OnboardingPreference"("userId");

-- CreateIndex
CREATE INDEX "OnboardingPreference_userId_idx" ON "OnboardingPreference"("userId");

-- AddForeignKey
ALTER TABLE "OnboardingPreference" ADD CONSTRAINT "OnboardingPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
