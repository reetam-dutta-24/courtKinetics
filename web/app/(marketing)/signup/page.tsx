import { AuthCard } from "@/components/marketing/AuthCard";
import { SignupForm } from "@/components/marketing/SignupForm";

export default function SignupPage() {
  return (
    <AuthCard title="Create your account" subtitle="Start measuring what actually wins the point." footerText="Already have an account?" footerLinkText="Log in" footerLinkHref="/login">
      <SignupForm />
    </AuthCard>
  );
}