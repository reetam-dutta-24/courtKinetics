from pathlib import Path
import cv2
import pandas as pd
import mediapipe as mp

mp_pose = mp.solutions.pose
NAMES = [lm.name.lower() for lm in mp_pose.PoseLandmark]
CONNECTIONS = [(int(a), int(b)) for a, b in mp_pose.POSE_CONNECTIONS]

VIDEO = "data/raw/video1.mp4"
CSV = "data/processed/video1_test.csv"
OUT_DIR = Path("data/processed/overlays")
OUT_DIR.mkdir(parents=True, exist_ok=True)

df = pd.read_csv(CSV)
detected = sorted(df.frame_idx.unique())
step = max(1, len(detected) // 6)
targets = {int(detected[i]) for i in range(0, len(detected), step)}
by_frame = {k: g.set_index("landmark") for k, g in df[df.frame_idx.isin(targets)].groupby("frame_idx")}

cap = cv2.VideoCapture(VIDEO)
idx = 0
while idx <= max(targets):
    ok, frame = cap.read()
    if not ok:
        break
    if idx in targets:
        h, w = frame.shape[:2]
        g = by_frame[idx]
        pts = {}
        for i, name in enumerate(NAMES):
            r = g.loc[name]
            pts[i] = (int(r.x * w), int(r.y * h))  # normalized -> pixels
        for a, b in CONNECTIONS:
            cv2.line(frame, pts[a], pts[b], (0, 255, 0), 3)
        for p in pts.values():
            cv2.circle(frame, p, 6, (0, 0, 255), -1)
        small = cv2.resize(frame, (w // 2, h // 2))
        cv2.imwrite(str(OUT_DIR / f"overlay_{idx:05d}.jpg"), small, [cv2.IMWRITE_JPEG_QUALITY, 80])
        print("saved frame", idx)
    idx += 1
cap.release()