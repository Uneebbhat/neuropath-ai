import { ResetPasswordForm } from "@/modules/(auth)/reset-password/components/reset-password-form";
// import RequireNoAuth from "@/components/RequireNoAuth";

interface ResetPasswordPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function ResetPasswordPage({
  params,
}: ResetPasswordPageProps) {
  const { token } = await params;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      {/* <RequireNoAuth /> */}
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your new password below
          </p>
        </div>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
