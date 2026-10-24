from pathlib import Path
import cv2
import numpy as np

files = sorted(Path("data/processed/overlays").glob("overlay_*.jpg"))
CELL_W, CELL_H = 480, 216  # half-size frames are 1200x540, so this keeps the shape

cells = []
for f in files:
    img = cv2.imread(str(f))
    cells.append(cv2.resize(img, (CELL_W, CELL_H)))
    cv2.putText(cells[-1], f.stem[-5:], (8, 22), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

while len(cells) % 4:
    cells.append(np.zeros((CELL_H, CELL_W, 3), dtype=np.uint8))

sheet = np.vstack([np.hstack(cells[i:i + 4]) for i in range(0, len(cells), 4)])
cv2.imwrite("data/processed/overlay_sheet.jpg", sheet, [cv2.IMWRITE_JPEG_QUALITY, 70])
print("saved", sheet.shape)