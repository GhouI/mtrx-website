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
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  async function onSubmit() {
    const data = await authClient.signIn.social({provider: "google"}, {
      onSuccess: () => {
        router.push("/dashboard")
      },
      onError: (context) => {
        toast.error(context.error.message)
      }
    })
  }
  const handleSignUp = () => {
    router.push("/signup")
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Button type="submit" variant="outline">
              Login with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
