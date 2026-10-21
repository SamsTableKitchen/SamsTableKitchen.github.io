#!/usr/bin/env python3
"""Make right-sized copies of big photos for srcset: images/thumbs/<name>-480.webp and -960.webp.
Full-size files stay for the lightbox and og:image. build_site.py runs this; it only makes missing files."""
import glob, os
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
os.makedirs("images/thumbs", exist_ok=True)
SIZES = (480, 960)
made = 0
for src in sorted(glob.glob("images/*.webp")):
    base = os.path.basename(src)[:-5]
    im = None
    for w in SIZES:
        out = f"images/thumbs/{base}-{w}.webp"
        if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(src): continue
        im = im or Image.open(src)
        if im.width <= w * 1.15: continue          # already small enough
        r = im.copy(); r.thumbnail((w, 100000), Image.LANCZOS)
        r.save(out, "WEBP", quality=74, method=6); made += 1
for t in glob.glob("images/thumbs/*.webp"):          # drop thumbs whose original is gone
    if not os.path.exists("images/" + t.split("/")[-1].rsplit("-", 1)[0] + ".webp"): os.remove(t)
print("thumbs: made", made)
