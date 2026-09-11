"use client";

import { useActionState } from "react";
import { updateProfile } from "@/app/(app)/dashboard/settings/actions";

interface ProfileFormProps {
  name: string;
  yearsPlaying: number;
  skillLevel: string;
  playStyle: string;
  dominantHand: string;
  racquet: string;
}

const initialState = { error: undefined as string | undefined, success: false };

export function ProfileForm({ name, yearsPlaying, skillLevel, playStyle, dominantHand, racquet }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(async (_prev: typeof initialState, formData: FormData) => {
    const result = await updateProfile(formData);
    return { error: result.error, success: !!result.success };
  }, initialState);

  return (
    <form action={formAction} className="section-stack">
      <div>
        <label className="text-label block mb-2">Full name</label>
        <input name="name" defaultValue={name} required className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent" />
      </div>
      <div>
        <label className="text-label block mb-2">Years playing</label>
        <input name="yearsPlaying" type="number" min={0} max={80} defaultValue={yearsPlaying} required className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent" />
      </div>
      <div>
        <label className="text-label block mb-2">Skill level</label>
        <select name="skillLevel" defaultValue={skillLevel} className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="competitive">Competitive / Tournament</option>
        </select>
      </div>
      <div>
        <label className="text-label block mb-2">Play style</label>
        <select name="playStyle" defaultValue={playStyle} className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent">
          <option value="singles">Singles</option>
          <option value="doubles">Doubles</option>
          <option value="both">Both</option>
        </select>
      </div>
      <div>
        <label className="text-label block mb-2">Dominant hand</label>
        <select name="dominantHand" defaultValue={dominantHand} className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent">
          <option value="right">Right</option>
          <option value="left">Left</option>
        </select>
      </div>
      <div>
        <label className="text-label block mb-2">Racquet</label>
        <input name="racquet" defaultValue={racquet} className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent" />
      </div>

      {state.error && <p className="text-small text-red-400">{state.error}</p>}
      {state.success && <p className="text-small text-accent">Saved successfully.</p>}

      <button type="submit" disabled={pending} className="btn-primary glow-accent-sm">
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}