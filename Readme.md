# CourtKinetics

Pose-estimation performance analysis for badminton — anticipation timing, unforced-error detection, and doubles positioning, measured from a single phone camera. Built as a hypothesis-driven research project, not just a demo.

## The idea

Amateur and club-level badminton players have almost no objective performance feedback. CourtKinetics uses computer vision (MediaPipe pose estimation) to extract structured data from match footage, then tests four specific, falsifiable hypotheses against it:

- **H1 — Anticipation:** does reaction/split-step timing predict point outcomes better than shot accuracy alone?
- **H2 — Mistakes:** do unforced errors have measurable, coachable pre-conditions (late contact, poor recovery) rather than being random?
- **H3 — Doubles positioning:** does court-coverage symmetry between partners predict rally loss better than individual error rate?
- **H4 — Missed chances:** how consistently are "killable" opponent shots actually converted into attacking shots?

Full rationale in `docs/pitch.md` and the phased build plan in `docs/roadmap.md`.

## Current status

**Built and working:**
- Full authentication system — Google OAuth + email/password (Zod-validated, bcrypt-hashed), JWT sessions, middleware-protected routes
- Player onboarding flow (3-step wizard, writes to `PlayerProfile`)
- 6-theme design system (Court Cyan, Match Point, China Masters, Nightshade, Stealth, Daylight) with a full custom component library — cards, buttons, badges, nav, glow/glassmorphism effects
- Public landing page — video hero, feature grid, testimonials carousel, detailed footer, session-aware CTAs
- App shell with sidebar navigation, dashboard route (dynamic, real Prisma queries)
- Database schema live on Supabase Postgres, migrated via Prisma

**Not yet built:**
- The actual ML/CV pipeline (Phase 1 of the roadmap) — pose extraction, MediaPipe integration, and all four hypotheses (H1–H4) have not been started. The web layer was deliberately built first; this is the next major phase of work.

## Architecture

Two independent services:

- **`web/`** — Next.js 16 (App Router, TypeScript), the full user-facing app and API layer.
- **`ml/`** — Python service for pose estimation and analysis (MediaPipe, OpenCV, Pandas/NumPy/SciPy). Not yet implemented beyond environment setup.

There's no mature JavaScript equivalent to MediaPipe or the Python ML ecosystem, so these are deliberately separate services rather than one monolith — a standard pattern for AI-feature web apps.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend/Backend | Next.js 16, TypeScript, Tailwind CSS v4 |
| Database | PostgreSQL, hosted on Supabase |
| ORM | Prisma |
| Auth | Auth.js (NextAuth v5) — Google OAuth + Credentials, JWT sessions |
| Validation | Zod |
| Password hashing | bcryptjs |
| ML/CV (planned) | Python, MediaPipe, OpenCV, FastAPI |
| Theming | Custom CSS-variable system + `next-themes` |

## Setup

### Web app (`web/`)
```bash
cd web
npm install
```
Create `.env` (see `.env.example` for required variables — Supabase connection strings, Google OAuth credentials, `AUTH_SECRET`). Never commit `.env`.

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

### ML service (`ml/`)
```bash
cd ml
python -m venv .venv
.venv\Scripts\Activate.ps1   # Windows
pip install -r requirements.txt
```
Note: pins `mediapipe==0.10.14` — newer versions require downloading model files from Google at runtime; this version bundles the model in the pip package for fully offline use.

## Project structure
web/
app/
(marketing)/ # Public: landing, /login, /signup — fixed theme
(app)/ # Authenticated: /dashboard, /sessions, /upload — user's theme
api/ # Auth handler, registration endpoint
onboarding/ # Player profile setup (server action + wizard)
components/
ui/ # Design system primitives (Button, Card, StatCard, etc.)
marketing/ # Landing/auth-specific components
onboarding/ # Onboarding wizard
prisma/
schema.prisma # Full data model
middleware.ts # Route protection, auth redirects

ml/
src/ # Pose extraction pipeline (not yet implemented)
requirements.txt


## Roadmap

1. ~~Setup & recording protocol~~ ✅
2. Pose extraction pipeline (MediaPipe → structured keypoint data) — **next**
3. H1: Anticipation timing model
4. H2: Mistake/error-pattern classifier
5. Backend + dashboard wiring to real data ✅ (shell), pipeline output ⏳
6. Scope decision: full 4-hypothesis vs. focused build
7–8. H3 (doubles), H4 (miss chances) — optional stretch
9. Multi-week self-experiment: does the feedback measurably change performance?
10. Writeup, demo, final polish

## License

Personal research/portfolio project. Not licensed for commercial use.