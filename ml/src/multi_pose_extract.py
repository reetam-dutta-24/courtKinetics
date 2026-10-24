"""Multi-person pose extraction: YOLO-Pose + ByteTrack -> long-format CSV."""
import argparse
import csv
import time
from collections import defaultdict
from pathlib import Path

import cv2
import numpy as np
from ultralytics import YOLO

# COCO 17 keypoints, in the order YOLO-Pose outputs them
KP_NAMES = [
    "nose", "left_eye", "right_eye", "left_ear", "right_ear",
    "left_shoulder", "right_shoulder", "left_elbow", "right_elbow",
    "left_wrist", "right_wrist", "left_hip", "right_hip",
    "left_knee", "right_knee", "left_ankle", "right_ankle",
]


def extract(video_path, out_csv, weights, max_seconds, imgsz, stride=1):
    model = YOLO(weights)
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        raise SystemExit(f"Cannot open {video_path}")

    Path(out_csv).parent.mkdir(parents=True, exist_ok=True)
    frame_idx = 0
    # per track id: [frame_count, first_ms, last_ms, list of box heights]
    stats = defaultdict(lambda: [0, None, None, []])
    t0 = time.time()

    with open(out_csv, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["frame_idx", "timestamp_ms", "track_id", "box_h_px",
                    "landmark", "x_px", "y_px", "conf"])

        while True:
            ok, frame = cap.read()
            if not ok:
                break
            ts = cap.get(cv2.CAP_PROP_POS_MSEC)
            if max_seconds is not None and ts > max_seconds * 1000:
                break
            if frame_idx % stride != 0:
                frame_idx += 1
                continue
            res = model.track(frame, persist=True, tracker="bytetrack.yaml",
                              imgsz=imgsz, conf=0.25, verbose=False)[0]

            if res.boxes is not None and res.boxes.id is not None and res.keypoints is not None:
                ids = res.boxes.id.int().cpu().numpy()
                boxes = res.boxes.xyxy.cpu().numpy()
                kxy = res.keypoints.xy.cpu().numpy()      # (n, 17, 2) pixels
                kcf = res.keypoints.conf.cpu().numpy()    # (n, 17)

                for i, tid in enumerate(ids):
                    box_h = float(boxes[i][3] - boxes[i][1])
                    s = stats[int(tid)]
                    s[0] += 1
                    s[1] = ts if s[1] is None else s[1]
                    s[2] = ts
                    s[3].append(box_h)
                    for k, name in enumerate(KP_NAMES):
                        w.writerow([frame_idx, round(ts, 1), int(tid), round(box_h, 1),
                                    name, round(float(kxy[i][k][0]), 1),
                                    round(float(kxy[i][k][1]), 1),
                                    round(float(kcf[i][k]), 3)])
            frame_idx += 1
            if frame_idx % 50 == 0:
                print(f"  {frame_idx} frames, {time.time() - t0:.0f}s elapsed", flush=True)

    cap.release()
    elapsed = time.time() - t0
    print(f"\nFrames processed: {frame_idx}")
    print(f"Elapsed: {elapsed:.1f}s ({elapsed / max(frame_idx, 1):.3f} s/frame)")
    print(f"Unique track IDs: {len(stats)}")
    for tid, (n, first, last, hs) in sorted(stats.items()):
        print(f"  ID {tid:>3}: {n:>5} frames, {first/1000:6.1f}s -> {last/1000:6.1f}s, "
              f"median height {np.median(hs):.0f} px")


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--video", required=True)
    p.add_argument("--out", required=True)
    p.add_argument("--weights", default="yolo11m-pose.pt")
    p.add_argument("--max-seconds", type=float, default=None)
    p.add_argument("--imgsz", type=int, default=1280)
    a = p.parse_args()
    extract(a.video, a.out, a.weights, a.max_seconds, a.imgsz)
    p.add_argument("--stride", type=int, default=1)
    a = p.parse_args()
    extract(a.video, a.out, a.weights, a.max_seconds, a.imgsz, a.stride)