/*
  Warnings:

  - Added the required column `updatedAt` to the `PasswordReset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PasswordReset" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
