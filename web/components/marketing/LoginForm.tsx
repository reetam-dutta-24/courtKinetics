"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { loginSchema } from "@/lib/validations/auth";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { AuthDivider } from "./AuthDivider";
import { Spinner } from "../ui/Spinner";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="section-stack">
        <div>
          <label className="text-label block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent"
          />
        </div>
        <div>
          <label className="text-label block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent"
          />
        </div>
        {error && <p className="text-small text-red-400">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary glow-accent-sm w-full justify-center py-3">
  {loading ? (<><Spinner size={16} /> Signing in…</>) : "Sign In"}
</button>
      </form>
      <AuthDivider />
      <GoogleSignInButton />
    </div>
  );
}