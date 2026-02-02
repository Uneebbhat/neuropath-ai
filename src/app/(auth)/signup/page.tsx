import { GalleryVerticalEnd } from "lucide-react";

import { SignupForm } from "@/modules/(auth)/signup/components/signup-form";
import Link from "next/link";
import { Metadata } from "next";
// import RequireNoAuth from "@/components/RequireNoAuth";

export const metadata: Metadata = {
  title: "Sign up | NeuroPath AI",
  description: "Create an account to get started with NeuroPath AI",
};

export default async function SignupPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      {/* <RequireNoAuth /> */}
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          NeuroPath AI
        </Link>
        <SignupForm />
      </div>
    </div>
  );
}
