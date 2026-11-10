#!/usr/bin/env python3
"""Branded Sam's Table recipe share cards (JSON-LD / og:image only).

Used when a recipe has no real dish photo. These are typographic cards made from
the site wordmark and colors — not food photos — and must not be inserted as
visible photos on the page.
"""
from __future__ import annotations

import json
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 900
BG = (250, 247, 242)       # --bg
INK = (43, 43, 43)         # --ink
OLIVE = (107, 127, 58)     # --olive
TERRA = (196, 104, 61)     # --terra
LINE = (230, 223, 211)     # --line
WHITE = (255, 255, 255)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT_DIR = "/usr/share/fonts/truetype/sand-box/google"
PLAYFAIR = FONT_DIR + "/Playfair Display/PlayfairDisplay-VariableFont_wght.ttf"
LATO_BOLD = FONT_DIR + "/Lato/Lato-Bold.ttf"
LATO_REG = FONT_DIR + "/Lato/Lato-Regular.ttf"
CARD_DIR = os.path.join(ROOT, "images", "recipe-cards")
MANIFEST = os.path.join(ROOT, "data", "recipe-cards.json")


def _playfair(size, weight=700):
    font = ImageFont.truetype(PLAYFAIR, size)
    try:
        font.set_variation_by_axes([weight])
    except Exception:
        pass
    return font


def _lato(size, bold=False):
    return ImageFont.truetype(LATO_BOLD if bold else LATO_REG, size)


def _wrap(draw, text, font, max_width):
    words = text.replace("\u2011", "-").split()
    if not words:
        return [""]
    lines, cur = [], words[0]
    for w in words[1:]:
        trial = cur + " " + w
        if draw.textbbox((0, 0), trial, font=font)[2] <= max_width:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    return lines


def _fit_title(draw, title, max_width, max_lines=4, max_size=86, min_size=42):
    for size in range(max_size, min_size - 1, -2):
        font = _playfair(size, 700)
        lines = _wrap(draw, title, font, max_width)
        if len(lines) <= max_lines:
            heights = [draw.textbbox((0, 0), ln, font=font)[3] for ln in lines]
            total = sum(heights) + int(size * 0.18) * (len(lines) - 1)
            if total <= 420:
                return font, lines, size
    font = _playfair(min_size, 700)
    return font, _wrap(draw, title, font, max_width)[:max_lines], min_size


def render_card(title: str) -> Image.Image:
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)

    # Inner card
    m = 64
    d.rounded_rectangle((m, m, W - m, H - m), radius=8, fill=WHITE, outline=LINE, width=2)
    # Olive bar along the top of the card (matches on-page recipe card)
    d.rectangle((m, m, W - m, m + 16), fill=OLIVE)

    cx = W // 2
    y = m + 88

    # Wordmark: Sam's Table
    mark = _playfair(72, 700)
    sam, table = "Sam's ", "Table"
    w_sam = d.textbbox((0, 0), sam, font=mark)[2]
    w_tab = d.textbbox((0, 0), table, font=mark)[2]
    x0 = cx - (w_sam + w_tab) // 2
    # Playfair sits a little low; use anchor
    d.text((x0, y), sam, font=mark, fill=INK, anchor="ls")
    d.text((x0 + w_sam, y), table, font=mark, fill=TERRA, anchor="ls")
    y += 36

    # Divider
    line_w = 220
    d.rectangle((cx - line_w // 2, y, cx + line_w // 2, y + 3), fill=OLIVE)
    y += 36

    kicker = _lato(22, bold=True)
    d.text((cx, y), "RECIPE", font=kicker, fill=TERRA, anchor="mt")
    y += 52

    max_w = W - m * 2 - 120
    font, lines, size = _fit_title(d, title, max_w)
    line_gap = int(size * 0.22)
    # measure block height to keep title visually centered in the remaining space
    bboxes = [d.textbbox((0, 0), ln, font=font) for ln in lines]
    heights = [b[3] - b[1] for b in bboxes]
    block_h = sum(heights) + line_gap * (len(lines) - 1)
    footer_y = H - m - 70
    # place title in the space between kicker and footer
    avail_top = y
    avail_bot = footer_y - 30
    ty = avail_top + max(0, (avail_bot - avail_top - block_h) // 2)
    for ln, h in zip(lines, heights):
        d.text((cx, ty), ln, font=font, fill=INK, anchor="mt")
        ty += h + line_gap

    foot = _lato(22, bold=True)
    d.text((cx, footer_y), "samstablekitchen.com", font=foot, fill=OLIVE, anchor="mt")
    return im


def card_path(slug: str) -> str:
    return os.path.join(CARD_DIR, slug + ".jpg")


def card_url(slug: str) -> str:
    return "https://samstablekitchen.com/images/recipe-cards/%s.jpg" % slug


def _load_manifest() -> dict:
    if os.path.exists(MANIFEST):
        with open(MANIFEST, encoding="utf-8") as f:
            return json.load(f)
    return {}


def _save_manifest(m: dict) -> None:
    os.makedirs(os.path.dirname(MANIFEST), exist_ok=True)
    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(m, f, indent=2, sort_keys=True, ensure_ascii=False)
        f.write("\n")


def ensure_card(slug: str, title: str) -> str:
    """Write images/recipe-cards/<slug>.jpg if missing or the title changed. Returns the public URL."""
    os.makedirs(CARD_DIR, exist_ok=True)
    path = card_path(slug)
    man = _load_manifest()
    if os.path.exists(path) and man.get(slug) == title:
        return card_url(slug)
    im = render_card(title)
    im.save(path, "JPEG", quality=90, optimize=True, subsampling=0)
    man[slug] = title
    _save_manifest(man)
    return card_url(slug)


if __name__ == "__main__":
    import sys
    title = sys.argv[1] if len(sys.argv) > 1 else "Potato Buns"
    slug = sys.argv[2] if len(sys.argv) > 2 else "preview"
    out = sys.argv[3] if len(sys.argv) > 3 else "/tmp/card-preview/%s.jpg" % slug
    os.makedirs(os.path.dirname(out), exist_ok=True)
    render_card(title).save(out, "JPEG", quality=90, optimize=True, subsampling=0)
    print(out)
