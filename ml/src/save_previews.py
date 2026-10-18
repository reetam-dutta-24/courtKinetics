from pathlib import Path
import cv2

RAW_DIR = Path("data/raw")
OUT_DIR = Path("data/processed/frame_previews")
OUT_DIR.mkdir(parents=True, exist_ok=True)

for path in sorted(RAW_DIR.glob("*.mp4")):
    cap = cv2.VideoCapture(str(path))
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    for pct in (0.1, 0.5, 0.9):
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(total * pct))
        ok, frame = cap.read()
        if ok:
            out = OUT_DIR / f"{path.stem}_{int(pct * 100)}pct.jpg"
            cv2.imwrite(str(out), frame)
            print(f"saved {out.name}")

    cap.release()