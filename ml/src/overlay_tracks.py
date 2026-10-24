"""Draw track IDs + keypoint bounding boxes on evenly spaced frames from a multi-person CSV."""
import argparse
from pathlib import Path

import cv2
import pandas as pd


def main(video, csv_path, out_dir, n):
    df = pd.read_csv(csv_path)
    Path(out_dir).mkdir(parents=True, exist_ok=True)
    frames = sorted(df.frame_idx.unique())
    picks = [frames[int(i * (len(frames) - 1) / (n - 1))] for i in range(n)]

    cap = cv2.VideoCapture(str(video))
    for fi in picks:
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(fi))
        ok, img = cap.read()
        if not ok:
            continue
        for tid, g in df[df.frame_idx == fi].groupby("track_id"):
            g = g[g.conf > 0.3]
            if g.empty:
                continue
            x1, y1, x2, y2 = int(g.x_px.min()), int(g.y_px.min()), int(g.x_px.max()), int(g.y_px.max())
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 3)
            cv2.putText(img, f"ID {tid}", (x1, max(y1 - 10, 30)),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.6, (0, 0, 255), 4)
        cv2.imwrite(str(Path(out_dir) / f"tracks_f{int(fi):05d}.jpg"), img,
                    [cv2.IMWRITE_JPEG_QUALITY, 70])
        print("saved frame", int(fi))
    cap.release()


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--video", required=True)
    p.add_argument("--csv", required=True)
    p.add_argument("--out", default="data/processed/track_overlays")
    p.add_argument("--n", type=int, default=4)
    a = p.parse_args()
    main(a.video, a.csv, a.out, a.n)