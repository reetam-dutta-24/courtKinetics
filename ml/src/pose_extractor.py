import argparse
import csv
from pathlib import Path

import cv2
import mediapipe as mp

mp_pose = mp.solutions.pose
LANDMARK_NAMES = [lm.name.lower() for lm in mp_pose.PoseLandmark]


def extract(video_path, out_csv, max_seconds=None):
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        raise RuntimeError(f"Could not open {video_path}")

    Path(out_csv).parent.mkdir(parents=True, exist_ok=True)
    frames_processed = 0
    frames_detected = 0

    with mp_pose.Pose(
        static_image_mode=False,
        model_complexity=1,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5,
    ) as pose, open(out_csv, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["frame_idx", "timestamp_ms", "landmark", "x", "y", "z", "visibility"])

        while True:
            ok, frame = cap.read()
            if not ok:
                break

            ts_ms = cap.get(cv2.CAP_PROP_POS_MSEC)
            if max_seconds is not None and ts_ms / 1000 > max_seconds:
                break

            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = pose.process(rgb)

            if results.pose_landmarks:
                frames_detected += 1
                for name, lm in zip(LANDMARK_NAMES, results.pose_landmarks.landmark):
                    writer.writerow(
                        [frames_processed, round(ts_ms, 1), name, lm.x, lm.y, lm.z, lm.visibility]
                    )

            frames_processed += 1

    cap.release()
    rate = frames_detected / frames_processed if frames_processed else 0.0
    print(f"frames processed: {frames_processed}")
    print(f"frames with a detection: {frames_detected} ({rate:.1%})")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--video", required=True)
    parser.add_argument("--out", required=True)
    parser.add_argument("--max-seconds", type=float, default=None)
    args = parser.parse_args()
    extract(args.video, args.out, args.max_seconds)