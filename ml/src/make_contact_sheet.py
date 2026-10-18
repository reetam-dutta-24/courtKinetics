from pathlib import Path
import cv2
import numpy as np

PREVIEW_DIR = Path("data/processed/frame_previews")
CELL_W, CELL_H = 480, 270  # each thumbnail fits inside this box

files = sorted(PREVIEW_DIR.glob("*_50pct.jpg"))
cells = []

for f in files:
    img = cv2.imread(str(f))
    h, w = img.shape[:2]

    # Shrink while preserving aspect ratio (so portrait video7 isn't squashed)
    scale = min(CELL_W / w, CELL_H / h)
    resized = cv2.resize(img, (int(w * scale), int(h * scale)))

    # Center it on a black canvas of fixed size, so every cell is the same shape
    canvas = np.zeros((CELL_H, CELL_W, 3), dtype=np.uint8)
    y = (CELL_H - resized.shape[0]) // 2
    x = (CELL_W - resized.shape[1]) // 2
    canvas[y:y + resized.shape[0], x:x + resized.shape[1]] = resized

    label = f.stem.split("_")[0]  # e.g. "video1"
    cv2.putText(canvas, label, (10, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
    cells.append(canvas)

# Pad to a multiple of 4 so the grid is complete
while len(cells) % 4:
    cells.append(np.zeros((CELL_H, CELL_W, 3), dtype=np.uint8))

rows = [np.hstack(cells[i:i + 4]) for i in range(0, len(cells), 4)]
sheet = np.vstack(rows)

cv2.imwrite("data/processed/contact_sheet.jpg", sheet, [cv2.IMWRITE_JPEG_QUALITY, 70])
print("saved data/processed/contact_sheet.jpg", sheet.shape)