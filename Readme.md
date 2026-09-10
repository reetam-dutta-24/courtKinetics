# CourtKinetics

Computer vision system that analyzes badminton performance from a single phone camera — pose estimation (MediaPipe) to measure anticipation/reaction timing, detect unforced-error patterns, and evaluate doubles court positioning.

Built as a hypothesis-driven research project, not just a demo. See `docs/pitch.md` and `docs/roadmap.md` *(to be added)* for the full rationale, hypotheses, and phased plan.

## Architecture

- **`web/`** — Next.js 16 dashboard (TypeScript). Handles the UI, video upload, and API routes that talk to the ML service.
- **`ml/`** — Python service for pose estimation and analysis. MediaPipe for pose extraction, OpenCV for video I/O, Pandas/NumPy/SciPy for preprocessing and feature engineering.

These are two separate services, not one monolith — there's no mature JavaScript equivalent to MediaPipe or the Python ML ecosystem, so the web layer and the ML layer are deliberately split and communicate over an internal API.

## Status

**Phase 0 — Setup: Complete**
- Monorepo skeleton (`web/`, `ml/`)
- Next.js 16 app scaffolded
- Python virtual environment with core CV/ML dependencies (see `ml/requirements.txt`)
- Recording protocol established: phone camera, 60fps, side-on angle, stable mount

**Phase 1 — Pose Extraction Pipeline: In progress**

## Setup

### ML service (`ml/`)
```bash
cd ml
python -m venv .venv
.venv\Scripts\Activate.ps1   # Windows
pip install -r requirements.txt
```

**Note:** pins `mediapipe==0.10.14` specifically. Newer MediaPipe versions removed the legacy `solutions.pose` API in favor of a Tasks API that downloads a model file from Google at runtime. `0.10.14` bundles the model in the pip package itself, so it works fully offline.

### Web app (`web/`)
```bash
cd web
npm install
npm run dev
```

## Roadmap

This project is built in phases, each with a specific falsifiable hypothesis it's testing. Full details in `docs/roadmap.md` *(coming soon)*. Short version:

1. Pose extraction pipeline (raw video → clean keypoint data)
2. Anticipation/reaction timing analysis
3. Unforced-error pattern detection
4. Backend + dashboard
5. Doubles positioning analysis (stretch)
6. Missed-chance conversion analysis (stretch)
7. Multi-week self-experiment: does the feedback change measured performance?