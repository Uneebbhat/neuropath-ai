import { GalleryVerticalEnd } from "lucide-react";

import { OnboardForm } from "@/modules/onboard/components/onboard-form";
import Link from "next/link";
import { Metadata } from "next";
// import RequireAuth from "@/components/RequireAuth";

export const metadata: Metadata = {
  title: "Onboarding - NeuroPath AI",
  description: "Set up your learning preferences with NeuroPath AI",
};

export default function OnboardPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      {/* <RequireAuth /> */}
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
        <OnboardForm />
      </div>
    </div>
  );
}
