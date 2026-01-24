"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import useTogglePassword from "@/hooks/useTogglePassword"

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { showPassword, handleTogglePassword } = useTogglePassword()
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">New Password</FieldLabel>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="password" name="password" required />
                  {
                    showPassword ?
                      <EyeOff className="size-5 absolute right-3 cursor-pointer top-1/2 -translate-y-1/2" onClick={handleTogglePassword} /> :
                      <Eye className="size-5 absolute right-3 cursor-pointer top-1/2 -translate-y-1/2" onClick={handleTogglePassword} />
                  }
                </div>
              </Field>
              <Field>
                <Button>Reset Password</Button>
                <FieldDescription className="text-center">
                  <Link href="/login">Back to login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
