#!/usr/bin/env python3
"""Regenerate search-index.json and sitemap.xml.
Run from the site folder after adding or editing pages:  python3 tools/build_site.py"""
import re, json, glob, html, os, datetime, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
# Refresh the recipe picker data and the app (PWA) wiring on every page first.
subprocess.run(["python3", "tools/build_picker.py"], check=True)
subprocess.run(["python3", "tools/pwa.py"], check=True)
SITE = "https://samstablekitchen.com"
SKIP = {"404.html", "search.html", "offline.html"}

def meta(s, name):
    m = re.search(r'<meta name="%s" content="(.*?)"' % name, s)
    return html.unescape(m.group(1)) if m else ""

def text(s):
    m = re.search(r'<main[^>]*>(.*?)</main>', s, re.S)
    t = re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', m.group(1) if m else '', flags=re.S)
    t = html.unescape(re.sub(r'<[^>]+>', ' ', t))
    return re.sub(r'\s+', ' ', t).strip()

pages = sorted(f for f in glob.glob("**/*.html", recursive=True) if f not in SKIP and not f.startswith("play/"))   # play/: unlisted previews, never indexed
items = []
for f in pages:
    s = open(f, encoding="utf-8").read()
    title = html.unescape(re.search(r'<title>(.*?)</title>', s, re.S).group(1))
    title = re.sub(r"\s*\|\s*Sam's Table$", "", title).replace(" Review", "") or "Home"
    title = title.replace(" (Meal Prep)", "")
    if f == "index.html": title = "Home"
    cat = "Recipe" if f.startswith("posts/recipes/") else "Meal Prep Plan" if f.startswith("posts/meal-prep/plans/") else "Meal Prep" if f.startswith("posts/meal-prep/") else "Review" if f.startswith("posts/") else "Page"
    items.append({"t": title, "u": "/" + ("" if f == "index.html" else f), "s": meta(s, "description"),
                  "c": cat, "k": text(s)[:600] if cat != "Page" else ""})

# Food Guide places from data/places.js
src = open("data/places.js", encoding="utf-8").read()
for block in re.findall(r'\{\s*name:.*?\}', src, re.S):
    g = lambda k: (re.search(r'\b%s:\s*"((?:[^"\\]|\\.)*)"' % k, block) or [None, ""])[1]
    if g("review"): continue  # the full review is already indexed
    note = g("note"); about = g("about")
    summ = note if note and "coming soon" not in note.lower() else (about or g("cuisine"))
    items.append({"t": g("name"), "u": "/" + g("review") if g("review") else "/food-guide.html",
                  "s": summ if len(summ) <= 160 else summ[:157].rsplit(" ", 1)[0] + "...", "c": "Food Guide",
                  "k": " ".join([g("city"), g("region"), g("cuisine"), g("mustOrder"), about])})

json.dump(items, open("search-index.json", "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))

def lastmod(f):
    try:
        d = subprocess.run(["git", "log", "-1", "--format=%cs", "--", f], capture_output=True, text=True).stdout.strip()
    except Exception: d = ""
    return d or datetime.date.today().isoformat()
urls = "\n".join('  <url><loc>%s/%s</loc><lastmod>%s</lastmod></url>' % (SITE, "" if f == "index.html" else f, lastmod(f)) for f in pages)
open("sitemap.xml", "w").write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n%s\n</urlset>\n' % urls)
print(len(items), "search entries,", len(pages), "sitemap urls")
