"use client";

import { useState } from "react";
import { Clock, Trophy, Users, Hand, Target } from "lucide-react";
import { saveProfile } from "@/app/onboarding/action";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

const STEPS = ["experience", "style", "equipment"] as const;

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [yearsPlaying, setYearsPlaying] = useState(1);
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [playStyle, setPlayStyle] = useState("singles");
  const [dominantHand, setDominantHand] = useState("right");
  const [racquet, setRacquet] = useState("");

  const isLast = step === STEPS.length - 1;

  function next() {
    if (!isLast) setStep((s) => s + 1);
  }
  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  return (
    <div className="w-full max-w-md">
      <span className="text-heading-3 text-gradient-accent lg:hidden block mb-6">CourtKinetics</span>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= step ? "bg-accent" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <div className="card-glass p-8">
        <form
          action={saveProfile}
          onSubmit={() => setSubmitting(true)}
          className="section-stack"
        >
          {/* Hidden inputs carry every field's current value regardless of visible step */}
          <input type="hidden" name="yearsPlaying" value={yearsPlaying} />
          <input type="hidden" name="skillLevel" value={skillLevel} />
          <input type="hidden" name="playStyle" value={playStyle} />
          <input type="hidden" name="dominantHand" value={dominantHand} />
          <input type="hidden" name="racquet" value={racquet} />

          {/* Step 0 — Experience */}
          <div key="experience" className={step === 0 ? "block animate-in" : "hidden"}>
            <div className="flex items-center gap-2 mb-6">
              <span className="p-2 rounded-lg bg-accent/15 text-accent"><Clock size={18} /></span>
              <h2 className="text-heading-3">Your experience</h2>
            </div>

            <label className="text-label block mb-2">Years playing</label>
            <input
              type="range" min={0} max={20} value={yearsPlaying}
              onChange={(e) => setYearsPlaying(Number(e.target.value))}
              className="w-full accent-accent"
            />
            <p className="text-stat text-accent mt-2">{yearsPlaying}<span className="text-body-muted text-lg"> yrs</span></p>

            <label className="text-label block mb-2 mt-6">Skill level</label>
            <div className="grid grid-cols-2 gap-2">
              {["beginner", "intermediate", "advanced", "competitive"].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSkillLevel(lvl)}
                  className={`rounded-xl border px-3 py-2.5 text-small capitalize transition-colors ${
                    skillLevel === lvl ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-accent/40"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Step 1 — Style */}
          <div key="style" className={step === 1 ? "block animate-in" : "hidden"}>
            <div className="flex items-center gap-2 mb-6">
              <span className="p-2 rounded-lg bg-accent/15 text-accent"><Users size={18} /></span>
              <h2 className="text-heading-3">Play style</h2>
            </div>

            <label className="text-label block mb-2">You mostly play</label>
            <div className="grid grid-cols-3 gap-2">
              {["singles", "doubles", "both"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPlayStyle(s)}
                  className={`rounded-xl border px-3 py-2.5 text-small capitalize transition-colors ${
                    playStyle === s ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-accent/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <label className="text-label block mb-2 mt-6 flex items-center gap-2">
              <Hand size={14} /> Dominant hand
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["right", "left"].map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setDominantHand(h)}
                  className={`rounded-xl border px-3 py-2.5 text-small capitalize transition-colors ${
                    dominantHand === h ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-accent/40"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 — Equipment + theme */}
          <div key="equipment" className={step === 2 ? "block animate-in" : "hidden"}>
            <div className="flex items-center gap-2 mb-6">
              <span className="p-2 rounded-lg bg-accent/15 text-accent"><Target size={18} /></span>
              <h2 className="text-heading-3">Almost done</h2>
            </div>

            <label className="text-label block mb-2">Racquet (optional)</label>
            <input
              type="text"
              value={racquet}
              onChange={(e) => setRacquet(e.target.value)}
              placeholder="e.g. Yonex Astrox 100ZZ"
              className="w-full rounded-xl bg-muted border border-border px-4 py-2.5 text-body focus-visible:border-accent"
            />

            <label className="text-label block mb-3 mt-6">Pick your theme</label>
            <ThemeSwitcher />
          </div>

          {/* Nav buttons */}
          <div className="flex gap-3 pt-4">
            {step > 0 && (
              <button type="button" onClick={back} className="btn-secondary flex-1 justify-center">
                Back
              </button>
            )}
            {!isLast ? (
              <button type="button" onClick={next} className="btn-primary glow-accent-sm flex-1 justify-center">
                Continue
              </button>
            ) : (
              <button type="submit" disabled={submitting} className="btn-primary glow-accent-sm flex-1 justify-center">
                {submitting ? "Saving…" : "Complete Setup"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}