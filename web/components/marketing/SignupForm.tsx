"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { signupSchema } from "@/lib/validations/auth";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { AuthDivider } from "./AuthDivider";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const parsed = signupSchema.safeParse({ name, email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(data.error || "Something went wrong.");
      return;
    }

    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (result?.error) {
      setError("Account created — please sign in.");
      return;
    }

    router.push("/onboarding");
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="section-stack">
        <div>
          <label className="text-label block mb-2">Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent" />
        </div>
        <div>
          <label className="text-label block mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent" />
        </div>
        <div>
          <label className="text-label block mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent" />
        </div>
        <div>
          <label className="text-label block mb-2">Confirm password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent" />
        </div>
        {error && <p className="text-small text-red-400">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary glow-accent-sm w-full justify-center py-3">
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>
      <AuthDivider />
      <GoogleSignInButton />
    </div>
  );
}