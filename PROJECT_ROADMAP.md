# CourtKinetics — Master Project Roadmap

**Purpose of this document:** single source of truth for scope, requirements, architecture, and phased progress. Update the status markers as work completes — this file should always reflect reality, not aspiration.

Status legend: ✅ Done · 🟡 In progress · ⬜ Not started · ⏸️ Blocked

---

## 1. Project Summary

Pose-estimation performance analysis for badminton — anticipation timing, unforced-error detection, and doubles positioning, measured from real match footage. Built as a hypothesis-driven research project: four falsifiable claims tested against real data, findings reported honestly regardless of outcome, not a generic stats dashboard.

**The four hypotheses:**
- **H1 — Anticipation:** does reaction/split-step timing predict point outcomes better than shot accuracy alone?
- **H2 — Mistakes:** do unforced errors have measurable, coachable pre-conditions (late contact, poor recovery) rather than being random?
- **H3 — Doubles positioning:** does court-coverage symmetry between partners predict rally loss better than individual error rate?
- **H4 — Missed chances:** how consistently are "killable" opponent shots actually converted into attacking shots?

---

## 2. Functional Requirements

### 2.1 Authentication & Account Management
- ✅ Google OAuth sign-in
- ✅ Email/password sign-up and login (Zod-validated, bcrypt-hashed)
- ✅ JWT session strategy
- ✅ Middleware-based route protection (`/dashboard/*`, `/onboarding`)
- ✅ Auto-redirect authenticated users away from `/login`, `/signup`
- ✅ Session-aware landing page/nav (no hard redirect on `/`, CTA swaps contextually)
- ✅ Sign-out (user menu in sidebar)
- ⬜ Password reset flow
- ⬜ Email verification

### 2.2 Onboarding / Player Profile
- ✅ `PlayerProfile` model (years playing, skill level, play style, dominant hand, racquet)
- ✅ 3-step onboarding wizard with progress indicator, animated transitions, theme selection
- ✅ Gating: incomplete profile → redirected to onboarding before dashboard access
- ✅ Profile editing post-onboarding (Settings page)
- ✅ Account deletion (confirm-step UI, cascading Prisma delete)

### 2.3 Dashboard Section
- ✅ **Home** (`/dashboard`) — welcome header, real KPI cards (anticipation lag, error rate, win rate, session count), player profile summary, recent sessions
- ✅ **Analytics** (`/dashboard/analytics`) — Recharts: anticipation trend (line), error breakdown (pie), module distribution (bar); honest empty states
- ✅ **Sessions** (`/dashboard/sessions`) — list with module filter (URL search params), session cards; **detail page** (`/dashboard/sessions/[id]`) with rally-by-rally table, CSV export
- ✅ **Settings** (`/dashboard/settings`) — profile form (`useActionState`), theme switcher, account deletion
- ⬜ **Upload** (`/dashboard/upload`) — deferred until ML pipeline exists to consume uploaded video (see Section 5, decision log)

### 2.4 ML/CV Pipeline (Phase 1 — in progress)
- ✅ Real, consented footage obtained (local club/friends, casual play; 8 clips verified readable in `ml/data/raw/`, ~3.7 GB; confirm 8 vs 9 with friend)
- ✅ Clips transferred (LocalSend) and verified decodable (`inspect_videos.py`, `save_previews.py`, `make_contact_sheet.py`)
- ✅ `pose_extractor.py` — MediaPipe single-person baseline (~97% detection), `inspect_keypoints.py` validation, `overlay_check.py` / `make_overlay_sheet.py` QA overlays
- ✅ Finding: MediaPipe tracks only ONE person → insufficient for 2/4-player analysis and per-player report cards
- ✅ Ultralytics YOLO-Pose + torch/torchvision installed (pretrained, inference only; AGPL-3.0 noted)
- 🟡 `multi_pose_extract.py` — YOLO-Pose + ByteTrack, COCO-17 keypoints, persistent track IDs; 20 s test on video1 pending (check unique track IDs, per-ID frames, median person height, runtime)
- ⬜ Verify mediapipe 0.10.14 still imports alongside ultralytics (else separate venv); add `ultralytics` to `requirements.txt`, `*.pt` to `.gitignore`
- ⬜ Compute budget: extrapolate runtime for ~500k frames (frame skipping / tagged-segments-only / GPU)
- ⬜ Court calibration (homography, click 4 corners) + court-region filter (drop spectators/other courts)
- ⬜ Track-ID → player mapping (user clicks which box is them; measure ID-swap rate)
- ⬜ `preprocessing.py` — interpolation, Savitzky-Golay smoothing, normalization (scale x/y by width/height separately)
- ⬜ Run extraction on all clips
- ⬜ Rally-tagging tool in web app (rally start/end, outcome, error type, shot type) — replaces manual spreadsheet tagging
- ⬜ Per-player report cards (each tracked player gets own metrics + sample sizes)

### 2.5 Hypothesis Modules (Phase 2+)
- ⬜ **H1:** anticipation/reaction-lag feature engineering + trained model (temporal train/test split)
- ⬜ **H2:** error-type classifier + SHAP explainability
- ⬜ **H3 (stretch):** dual-player tracking, court calibration, coverage/symmetry model
- ⬜ **H4 (stretch):** "chance" frame detection, conversion-rate model

### 2.5b Metric Modules (per-player report card)
Each module outputs per-player, per-session metrics with sample size (n) and an "insufficient data" flag.

| # | Module | Notes |
|---|---|---|
| 1 | Doubles formation | Upload → review → re-upload improvement loop; compares sessions under comparable conditions |
| 2 | Footwork | Split-step, recovery to base, movement efficiency |
| 3 | Smash | Technique + frequency/conversion |
| 4 | Anticipation / reaction | = H1 |
| 5 | Forced errors | Distinguish from unforced (H2) |
| 6 | Missed chances | = H4 |
| 7 | Backhand | Technique + error rate |
| 8 | Drop shot | Technique + outcome |
| 9 | Overall singles reviewer | Aggregates relevant modules |
| 10 | Overall technique reviewer | Aggregates technique modules |

**Shot taxonomy:** serve, clear, lift, drop, smash, drive, net shot, block/return — each forehand/backhand.

**Adopted additions:**
- Shot taxonomy (above) as the shared label set
- Rally-tagging tool in the web app
- Attack/defense phase labeling per rally segment
- Error zone map (where on court errors occur)
- Match-level (not frame-level) train/test splitting + sample-size flags on every metric

**Improvement loop design:** per-session per-player metric vectors; user selects which tracked box is them; only comparable conditions compared; anonymize other players.

**Later / deferred:** serve checker, movement heatmap, shot predictability (see Backlog).

### 2.6 Self-Experiment (Phase 9)
- ⬜ Baseline tracking period (no feedback shown)
- ⬜ Feedback-phase tracking
- ⬜ Paired statistical comparison, honest reporting regardless of result

---

## 3. Non-Functional Requirements

| NFR | Status | Notes |
|---|---|---|
| SEO (metadata, OG/Twitter cards, robots.ts, sitemap.ts) | ✅ | Private routes excluded from indexing |
| Static rendering where applicable | ✅ | Verified via build route table (`○` vs `ƒ`) |
| Accessibility (focus-visible, reduced-motion, semantic HTML) | ✅ | Applied throughout dashboard pages |
| Responsive design | ✅ | Mobile sidebar drawer still a gap (nav hidden below `md`, no fallback) |
| CI (lint, type-check, build on push) | ✅ | GitHub Actions, `.github/workflows/ci.yml` |
| Security: least-privilege secrets, defense-in-depth auth checks | ✅ | `service_role` key server-only; middleware + page + query-scoping layers |
| Caching strategy | 🟡 | Static caching confirmed for public pages; no dynamic-data caching needed yet (no real data volume) |
| Rate limiting (API routes) | ⬜ | |
| Docker (ML service) | ⬜ | |
| CD / Deployment (Vercel + Render/Railway/Fly.io) | ⬜ | |
| `global-error.tsx` (root-layout crash boundary) | ⬜ | |
| Web Vitals reporting | ⬜ | |
| Mobile sidebar drawer | ⬜ | |

---

## 4. Tech Stack

**Frontend/Backend:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, next-themes, Recharts, lucide-react
**Backend patterns:** Server Components + Server Actions (primary), Route Handlers where genuinely needed (auth, registration)
**Validation/Security:** Zod, bcryptjs
**Auth:** Auth.js (NextAuth v5) — Google OAuth + Credentials, JWT sessions, middleware
**Database:** PostgreSQL (Supabase), Prisma ORM
**ML/CV:** Python, MediaPipe 0.10.14 (pinned — bundles model for offline use), OpenCV, Pandas/NumPy/SciPy, FastAPI (planned)
**DevOps:** Git/GitHub, GitHub Actions CI, tsx (dev scripts)

---

## 5. Architecture & Key Decisions Log

Keeping a short "why" record for non-obvious choices, so reasoning isn't lost:

- **`web/` and `ml/` are separate services**, not a monolith — no mature JS equivalent to MediaPipe/Python ML ecosystem exists.
- **Route groups** `(marketing)` / `(app)` split fixed-theme public pages from user-themed authenticated pages — each with its own `layout.tsx` explicitly setting `bg-background`/`text-foreground`, since CSS variables only cascade downward (a real bug we hit and fixed).
- **JWT over database sessions** — required once Credentials auth was added (Auth.js constraint); tradeoff is no instant server-side revocation, mitigated by calling `signOut()` explicitly after account deletion.
- **Server Components/Actions over blanket REST APIs** — more current idiomatic Next.js pattern; real Route Handlers reserved for cases that genuinely need them (auth callback, registration).
- **Upload page deferred** until the ML pipeline exists — building the upload→storage flow with nothing downstream to consume it was judged premature; Sessions/Analytics/Home built and tested against seeded dummy data instead.
- **Manual rally-boundary tagging (V1)**, not automatic detection — deliberately deferred as its own hard CV problem, consistent with original pipeline scoping.
- **Pretrained MediaPipe, not a custom-trained pose model** — training a pose estimator from scratch is a solved problem; original engineering effort goes into the analysis layer instead.
- **Footage provenance:** all training footage is real, consented recreational/club-level play (not broadcast/tournament content), obtained directly from the people who filmed and appear in it. This is a deliberate, non-negotiable constraint on the project, not an implementation detail — stated here so it's never quietly relaxed later.

---

## 6. Phased Roadmap

This is the original, fixed phase structure — numbering does not change as new work streams (e.g. the web layer) get added; new work slots in as sub-items under the phase it belongs to.

| Phase | Description | Status |
|---|---|---|
| **0** | Setup, recording protocol, environments | ✅ |
| **1** | Pose extraction pipeline (MediaPipe baseline done → YOLO-Pose multi-person + tracking) | 🟡 **current phase** — baseline done; multi-person test pending |
| **2** | H1: Anticipation timing model | ⬜ |
| **3** | H2: Mistake/error-pattern classifier | ⬜ |
| **4** | Backend + async pipeline | 🟡 — sub-items: |
| | ↳ Auth, DB schema, Prisma migrations | ✅ |
| | ↳ Upload flow (video → Supabase Storage → `TrainingSession`) | ⬜ (deferred until Phase 1 pipeline exists to consume it) |
| **5** | Dashboard | 🟡 — sub-items: |
| | ↳ Home, Analytics, Sessions, Settings (shell + real Prisma wiring) | ✅ |
| | ↳ Populated with real (non-seeded) ML output | ⬜ (blocked on Phases 1–3) |
| **6** | Scope decision: full 4-hypothesis vs. focused 2-hypothesis build | ⬜ |
| **7** | H3: Doubles positioning (stretch) | ⬜ |
| **8** | H4: Missed-chance conversion (stretch) | ⬜ |
| **9** | Improvement loop: does feedback measurably change performance (upload → review → re-upload; per-player, comparable conditions; originally n=1 self-experiment, now generalized to any consenting player) | ⬜ |
| **10** | Writeup, demo video, final polish | ⬜ |

### Backlog / Stretch Feature Modules
Natural extensions of the same pipeline once core phases are stable — not required for the core hypotheses, explicitly part of the plan, not forgotten:

- **Serve quality & legality checker** — short-serve height/consistency, currently untouched by H1–H4
- **Court coverage & movement efficiency heatmap** — total distance covered vs. estimated optimal path per rally; complements H1 (bad anticipation shows up as inefficient movement)
- **Shot predictability analyzer** — the inverse of H1: is the player's own shot selection too patterned, making them easy to anticipate

---

## 7. Current Open Items (living checklist)

- [ ] Save this file as `docs/roadmap.md` in the repo and commit
- [ ] Verify install: `python -c "import torch, ultralytics"` and `import mediapipe` still OK
- [ ] Add `*.pt` to root `.gitignore`; add `ultralytics` to `ml/requirements.txt`
- [ ] Run 20 s multi-person test on video1; paste summary + runtime
- [ ] Commit `overlay_check.py` and `make_overlay_sheet.py` if not yet committed
- [ ] Overlay with boxes + track IDs; court calibration; track→player mapping
- [ ] Confirm 8 vs 9 clips with friend
- [ ] Deferred: fix CI lint errors; middleware→proxy codemod; Phase 6 scope decision

---

## 8. How to Use This Document

At the start of each work session: read Section 7 (open items) and the current phase in Section 6 to re-establish context fast. At the end of a work session: update status markers in Sections 2, 3, and 6, and refresh Section 7. Add new entries to Section 5's decision log whenever a non-obvious architectural choice is made, so the "why" survives even if the conversation that produced it doesn't.