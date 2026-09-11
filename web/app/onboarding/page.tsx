import { saveProfile } from "./action";

export default function OnboardingPage() {
  return (
    <div className="page-container flex items-center justify-center min-h-screen py-16">
      <div className="w-full max-w-lg">
        <h1 className="text-heading-1">Set up your player profile</h1>
        <p className="text-body-muted mt-2">
          This helps contextualize your metrics — it's never used for anything outside this app.
        </p>

        <form action={saveProfile} className="section-stack mt-8">
          <div>
            <label className="text-label block mb-2">Years playing</label>
            <input
              name="yearsPlaying"
              type="number"
              min={0}
              max={80}
              required
              className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent"
            />
          </div>

          <div>
            <label className="text-label block mb-2">Skill level</label>
            <select
              name="skillLevel"
              required
              className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="competitive">Competitive / Tournament</option>
            </select>
          </div>

          <div>
            <label className="text-label block mb-2">Play style</label>
            <select
              name="playStyle"
              required
              className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent"
            >
              <option value="singles">Singles</option>
              <option value="doubles">Doubles</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div>
            <label className="text-label block mb-2">Dominant hand</label>
            <select
              name="dominantHand"
              required
              className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent"
            >
              <option value="right">Right</option>
              <option value="left">Left</option>
            </select>
          </div>

          <div>
            <label className="text-label block mb-2">Racquet (optional)</label>
            <input
              name="racquet"
              type="text"
              placeholder="e.g. Yonex Astrox 100ZZ"
              className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent"
            />
          </div>

          <button type="submit" className="btn-primary glow-accent-sm w-full justify-center py-3 mt-2">
            Complete Setup
          </button>
        </form>
      </div>
    </div>
  );
}