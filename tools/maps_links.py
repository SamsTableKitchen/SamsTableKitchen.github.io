#!/usr/bin/env python3
"""Link restaurant names in photo captions to Google Maps (uses data/places.js).
Safe to re-run: python3 tools/maps_links.py"""
import re, os, html, urllib.parse
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
src = open("data/places.js", encoding="utf-8").read()
P = {}
for b in re.findall(r'\{\s*name:.*?\}', src, re.S):
    g = lambda k: (re.search(r'\b%s:\s*"((?:[^"\\]|\\.)*)"' % k, b) or [0, ""])[1]
    P[g("name")] = g("address")
def clean(n): return re.sub(r'\s+', ' ', re.sub(r'\([^)]*\)|\|', ' ', n)).strip()
def url(n): return "https://www.google.com/maps/search/?api=1&query=" + urllib.parse.quote(clean(n) + ", " + P[n])
def link(n, label=None):
    return ('<a class="maplink" href="%s" target="_blank" rel="noopener" aria-label="%s on Google Maps (opens in new tab)">%s</a>'
            % (html.escape(url(n)), html.escape(clean(n)), html.escape(label or n)))
# Food From My Travels gallery: image -> restaurant
IMG = {"r-thai-alaska":"Thai Alaska Kitchen","r-el-mezcal":"El Mezcal | Mexican Restaurant","r-pza":"PZA Pizzeria",
 "pina-colada":"La Segunda Bakery and Cafe","cream-puffs":"La Segunda Bakery and Cafe","cuban-sandwich":"La Segunda Bakery and Cafe",
 "r-seoul-casa":"Seoul Casa","r-oscars":"Oscar's Cafe","r-baitong":"Bai Tong Thai Street Cafe","r-mi-ranchito":"Mi Ranchito Mexican Restaurant",
 "r-uncle-joes":"Uncle Joe's Pizzeria","f-chowder":"Alaska Chopped and Chowdered","f-grindhouse":"Grindhouse Killer Burgers",
 "r-bonrue":"Bonrue Bakery (formerly Farmstead)"}
DISP = {"El Mezcal | Mexican Restaurant":"El Mezcal","Bonrue Bakery (formerly Farmstead)":"Bonrue Bakery"}
count = {}
def fig(m, page):
    f = m.group(0)
    if 'class="maplink"' in f: return f
    img = re.search(r'src="images/([a-z0-9-]+)\.webp"', f); cap = re.search(r'<figcaption>(.*?)</figcaption>', f)
    if not (img and cap): return f
    name = html.unescape(cap.group(1))
    if name in P:  # caption is the restaurant name
        new = '<figcaption class="mapcap">%s</figcaption>' % link(name)
    else:
        r = next((v for k, v in IMG.items() if img.group(1).startswith(k)), None)
        if not r or " · " not in name: return f
        dish, city = name.split(" · ", 1)
        new = '<figcaption class="mapcap">%s · %s<span class="mapcity">, %s</span></figcaption>' % (
            html.escape(dish), link(r, DISP.get(r, r)), html.escape(city))
    count[page] = count.get(page, 0) + 1
    return f.replace(cap.group(0), new)
for page in ["index.html", "food-guide.html", "travel.html"]:
    s = open(page, encoding="utf-8").read()
    s2 = re.sub(r'<figure class="m[ "][^>]*>.*?</figure>', lambda m: fig(m, page), s, flags=re.S)
    if s2 != s: open(page, "w", encoding="utf-8").write(s2)
print(count)
