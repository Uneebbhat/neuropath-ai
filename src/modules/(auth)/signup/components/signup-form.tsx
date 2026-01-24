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
import { Eye, EyeOff } from "lucide-react"
import useTogglePassword from "@/hooks/useTogglePassword"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { showPassword, handleTogglePassword } = useTogglePassword()

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" type="text" placeholder="John Doe" name="name" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                />
              </Field>
              <Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="password" name="password" required />
                    {
                      showPassword ?
                        <EyeOff className="size-5 absolute right-3 cursor-pointer top-1/2 -translate-y-1/2" onClick={handleTogglePassword} /> :
                        <Eye className="size-5 absolute right-3 cursor-pointer top-1/2 -translate-y-1/2" onClick={handleTogglePassword} />
                    }
                  </div>
                </Field>
              </Field>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              <Field>
                <Button>Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
