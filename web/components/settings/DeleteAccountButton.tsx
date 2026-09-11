"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { AlertTriangle } from "lucide-react";
import { deleteAccount } from "@/app/(app)/dashboard/settings/actions";

export function DeleteAccountButton() {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    await deleteAccount();
    await signOut({ callbackUrl: "/" });
  }

  if (!confirming) {
    return (
      <button onClick={() => setConfirming(true)} className="btn-secondary border-red-500/40 text-red-400 hover:border-red-500">
        Delete account
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-red-500/40 bg-red-500/5 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
        <div>
          <p className="text-body">This permanently deletes your account, profile, and all sessions. This cannot be undone.</p>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="btn bg-red-500 text-white hover:bg-red-600"
            >
              {deleting ? "Deleting…" : "Yes, delete everything"}
            </button>
            <button onClick={() => setConfirming(false)} className="btn-ghost">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}