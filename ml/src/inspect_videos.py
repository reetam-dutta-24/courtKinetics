from pathlib import Path
import cv2

RAW_DIR = Path("data/raw")

for path in sorted(RAW_DIR.glob("*.mp4")):
    cap = cv2.VideoCapture(str(path))

    if not cap.isOpened():
        print(f"{path.name}: CANNOT OPEN (likely corrupt/incomplete)")
        continue

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration_min = frames / fps / 60 if fps else 0
    size_gb = path.stat().st_size / 1e9

    ok, _ = cap.read()
    status = "OK" if ok and frames > 0 else "UNREADABLE FRAMES"

    print(f"{path.name}: {width}x{height} @ {fps:.1f}fps, {frames} frames, "
          f"{duration_min:.1f} min, {size_gb:.2f} GB -> {status}")

    cap.release()