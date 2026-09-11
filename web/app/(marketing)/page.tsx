import Link from "next/link";
import { Zap, AlertTriangle, Users, Target, GitBranch } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Testimonials } from "@/components/marketing/Testimonials";
import { Footer } from "@/components/marketing/Footer";
import { auth } from "@/auth";
const heroVideo = "/videos/hero-image.mp4";

const FEATURES = [
  { icon: <Zap size={20} />, title: "Anticipation Timing", description: "Measures split-step timing and reaction lag relative to your opponent's contact frame — the difference between reading the game and reacting to it." },
  { icon: <AlertTriangle size={20} />, title: "Unforced-Error Detection", description: "Cross-references error timing against pose data to find the pre-conditions behind unforced errors — late contact, poor recovery, rushed swings." },
  { icon: <Users size={20} />, title: "Doubles Positioning", description: "Tracks court coverage and symmetry between partners to test whether positioning breakdown predicts rally loss better than individual mistakes." },
  { icon: <Target size={20} />, title: "Chance Conversion", description: "Flags killable opponent shots and measures how often they're actually converted into attacking shots versus played safe." },
];

const STEPS = [
  { n: "01", title: "Record", description: "Film a session with a stable phone camera, side-on angle." },
  { n: "02", title: "Extract", description: "MediaPipe pose estimation turns raw video into structured keypoint data." },
  { n: "03", title: "Analyze", description: "Trained models test each hypothesis against your own match data." },
  { n: "04", title: "Improve", description: "Track whether the feedback measurably changes your game over weeks." },
];

export default async function LandingPage() {
  const session = await auth();
   const isLoggedIn = !!session?.user;
  return (
    <div className="relative overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
  autoPlay
  loop
  muted
  playsInline
  poster="/videos/hero-poster.jpg"
  className="absolute top-20 left-0 w-full h-[calc(100vh-5rem)] object-cover motion-reduce:hidden"
  style={{ filter: "brightness(0.72) saturate(1)" }}
>
  <source src={heroVideo} type="video/mp4" />
</video>

<div
  className="absolute top-20 left-0 w-full h-[calc(100vh-5rem)] pointer-events-none"
  style={{
    background: `
      radial-gradient(ellipse 68% 58% at 50% 38%, transparent 0%, rgba(0,0,0,0.4) 68%, rgba(0,0,0,0.7) 100%),
      linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.4) 100%)
    `,
  }}
/>

        <div className="absolute top-20 inset-x-0 h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center page-container">
          <h1 className="text-display max-w-3xl text-white">
            Measure what actually
            <span className="text-gradient-accent block">wins the point.</span>
          </h1>
          <p className="text-body max-w-xl mt-6 text-white/80">
            A pose-estimation system that measures anticipation timing, detects unforced-error
            patterns, and evaluates court positioning from a single phone camera. Built as a
            hypothesis-driven research project, not just a demo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link href={isLoggedIn ? "/dashboard" : "/signup"} className="btn-primary glow-accent-sm px-6 py-3 text-base">
  {isLoggedIn ? "Go to Dashboard" : "Get Started"}
</Link>
            <a href="#how-it-works" className="btn-secondary backdrop-blur-sm px-6 py-3 text-base">See How It Works</a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 page-container py-24 section-stack">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-heading-1">Four hypotheses, one court.</h2>
          <p className="text-body-muted mt-4">Each module tests a specific, falsifiable claim about what determines point outcomes — not a generic stats dashboard.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card-interactive">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-accent/15 text-accent">{f.icon}</span>
                <h3 className="text-heading-3">{f.title}</h3>
              </div>
              <p className="text-body-muted mt-3">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 page-container py-24 section-stack">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-heading-1">How CourtKinetics works.</h2>
          <p className="text-body-muted mt-4">From raw footage to a tested hypothesis, in four stages.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s) => (
            <div key={s.n} className="card-glass">
              <span className="text-stat text-accent">{s.n}</span>
              <h3 className="text-heading-3 mt-2">{s.title}</h3>
              <p className="text-body-muted mt-2">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="scroll-mt-20 page-container py-24 section-stack">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-heading-1">What players are saying.</h2>
        </div>
        <Testimonials />
      </section>

      {/* Closing CTA */}
      <section className="page-container pb-24">
        <div className="card-glass glow-accent text-center py-16 px-8">
          <h2 className="text-heading-1">See what your data says.</h2>
          <p className="text-body-muted mt-4 max-w-xl mx-auto">Sign in, record a session, and start testing the hypotheses on your own game.</p>
          <Link href="/api/auth/signin" className="btn-primary glow-accent-sm px-6 py-3 text-base inline-block mt-8">Get Started</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-surface border-t border-border">
        <Footer />
      </footer>
    </div>
  );
}