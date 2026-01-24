import { GalleryVerticalEnd } from "lucide-react"

import { ForgotPasswordForm } from "@/modules/(auth)/forgot-password/components/forgot-password-form"
import Link from "next/link"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | NeuroPath AI",
  description: "Forgot your password? Enter your email to reset your password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          NeuroPath AI
        </Link>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
