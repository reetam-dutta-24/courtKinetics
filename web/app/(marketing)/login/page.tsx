import { AuthCard } from "@/components/marketing/AuthCard";
import { LoginForm } from "@/components/marketing/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard title="Welcome back" subtitle="Sign in to continue tracking your game." footerText="Don't have an account?" footerLinkText="Sign up" footerLinkHref="/signup">
      <LoginForm />
    </AuthCard>
  );
}