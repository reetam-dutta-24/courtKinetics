import pandas as pd

df = pd.read_csv("data/processed/video1_test.csv")

print("total rows:", len(df))
print("frames with a detection:", df.frame_idx.nunique())
print("rows per frame (should be 33):", df.groupby("frame_idx").size().unique())
print("time span (s):", round(df.timestamp_ms.min() / 1000, 1), "to", round(df.timestamp_ms.max() / 1000, 1))

key = ["left_shoulder", "right_shoulder", "left_hip", "right_hip",
       "left_knee", "right_knee", "left_ankle", "right_ankle"]
print("\nmean visibility of key joints:")
print(df[df.landmark.isin(key)].groupby("landmark").visibility.mean().round(2))

hips = df[df.landmark.isin(["left_hip", "right_hip"])].groupby("frame_idx")[["x", "y"]].mean()
step = hips.diff().abs()
jumps = ((step.x > 0.15) | (step.y > 0.15)).sum()
print("\nhip x range:", round(hips.x.min(), 2), "to", round(hips.x.max(), 2))
print("big frame-to-frame jumps in hip position:", int(jumps))

