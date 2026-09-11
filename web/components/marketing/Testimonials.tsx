"use client";

import { useEffect, useState } from "react";
import { Star, User } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

// PLACEHOLDER testimonials — no real users yet. Replace with genuine
// feedback once the app has actual usage; do not present these as real.
const TESTIMONIALS: Testimonial[] = [
  { name: "Sample User", role: "Club-level player", quote: "Seeing my anticipation lag graphed out changed how I train. (Placeholder testimonial.)", rating: 5 },
  { name: "Sample User", role: "Badminton coach", quote: "The error-pattern breakdown gave my student something concrete to fix. (Placeholder testimonial.)", rating: 5 },
  { name: "Sample User", role: "Doubles player", quote: "Finally a way to see positioning gaps instead of guessing. (Placeholder testimonial.)", rating: 4 },
  { name: "Sample User", role: "Weekend player", quote: "The skeleton-overlay review is genuinely satisfying to watch back. (Placeholder testimonial.)", rating: 5 },
];

const ROTATE_MS = 4000;
const N = TESTIMONIALS.length;

function relativePosition(i: number, active: number) {
  let raw = i - active;
  if (raw > N / 2) raw -= N;
  if (raw < -N / 2) raw += N;
  return raw;
}

export function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setActive((a) => (a + 1) % N), ROTATE_MS);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className="relative h-[340px] sm:h-[300px] max-w-4xl mx-auto overflow-hidden">
      {TESTIMONIALS.map((t, i) => {
        const raw = relativePosition(i, active);
        const isActive = raw === 0;
        const visible = Math.abs(raw) <= 1;

        return (
          <div
            key={t.name + i}
            className="absolute top-1/2 left-1/2 w-[280px] sm:w-[360px] transition-all duration-700 ease-out"
            style={{
              transform: `translate(-50%, -50%) translateX(${raw * 92}%) scale(${isActive ? 1 : 0.82})`,
              opacity: visible ? (isActive ? 1 : 0.35) : 0,
              zIndex: 10 - Math.abs(raw),
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <div
              className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl"
              style={{
                background: "color-mix(in srgb, var(--card) 55%, transparent)",
                borderColor: isActive ? "rgba(var(--glow), 0.4)" : "var(--border)",
                boxShadow: isActive ? "0 0 40px -8px rgba(var(--glow), 0.35)" : "none",
              }}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={16}
                    className={s < t.rating ? "text-accent fill-accent" : "text-muted-foreground"}
                  />
                ))}
              </div>

              <p className="text-body mt-4 italic">&ldquo;{t.quote}&rdquo;</p>

              <div className="flex items-center gap-3 mt-6">
                <span className="h-10 w-10 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0">
                  <User size={18} />
                </span>
                <div>
                  <span className="text-body font-semibold block">{t.name}</span>
                  <span className="text-small">{t.role}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-accent" : "w-2 bg-muted"}`}
          />
        ))}
      </div>
    </div>
  );
}