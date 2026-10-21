#!/usr/bin/env python3
"""Site-wide fixes and checks, run by build_site.py on every build (idempotent).
- non-blocking Google Fonts; self-hosted Leaflet loaded right before the map script
- links to the home page use "/" (matches the canonical)
- default og:image (real photo) + og/twitter image alt on pages without a photo
- noindex on search/404/offline
- meta descriptions <= 155 chars, review titles with the city
- Review / Recipe / BreadcrumbList / WebSite JSON-LD (datePublished = real first-commit date, never shown on the page)
- a11y: share button, star rating text, hidden h2 on card lists, no duplicate attrs
- srcset for photos that have thumbnails in images/thumbs (made by make_thumbs.py)
- lazy-load the comments widget
- guards: one about-place section per review, no generic "Food photo" alt text
Page dates live in data/page-dates.json (published + last content change), filled from git history."""
import re, glob, os, json, html, hashlib, subprocess, sys
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
SITE = "https://samstablekitchen.com"
FONT = "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@400;700&display=swap"
FONT_OLD = '<link href="%s" rel="stylesheet">' % FONT
FONT_NEW = ('<link rel="preload" as="style" href="{0}"><link rel="stylesheet" href="{0}" media="print" onload="this.media=\'all\'">'
            '<noscript><link rel="stylesheet" href="{0}"></noscript>').format(FONT)
OG_DEFAULT = SITE + "/images/og-default.jpg"
OG_ALT_DEFAULT = "Sam's Table: recipes, reviews and travel food finds"
PERSON = {"@type": "Person", "@id": SITE + "/#sam", "name": "Sam", "url": SITE + "/about.html"}
PUBLISHER = {"@type": "Organization", "name": "Sam's Table", "url": SITE + "/"}
errors = []

def git(*a):
    return subprocess.run(["git", *a], capture_output=True, text=True).stdout

def main_text(s):
    m = re.search(r'<main[^>]*>(.*?)</main>', s, re.S)
    t = re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', m.group(1) if m else s, flags=re.S)
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', t)).strip()

# ---------- page dates (real, from git) ----------
DATES_F = "data/page-dates.json"
dates = json.load(open(DATES_F)) if os.path.exists(DATES_F) else {}
def page_dates(f, s):
    h = chash(s)
    d = dates.get(f)
    if d is None:
        log = [l.split() for l in git("log", "--follow", "--format=%H %cs", "--", f).splitlines() if l.strip()]
        pub = log[-1][1] if log else git("log", "-1", "--format=%cs").strip()
        last = pub; prev = None
        for sha, day in reversed(log):          # oldest -> newest; last date the main content changed
            old = git("show", "%s:%s" % (sha, f))
            hh = chash(old) if old else None
            if hh and hh != prev: last = day; prev = hh
        d = {"published": pub, "modified": last, "h": h}
    elif d["h"] != h:
        import datetime; d = dict(d, modified=datetime.date.today().isoformat(), h=h)
    dates[f] = d
    return d

def chash(s):
    """Hash of the visible main content (ignores markup-only and screen-reader-only changes)."""
    s = re.sub(r'<span class="sr">.*?</span>', '', s)
    return hashlib.sha1(main_text(s).encode()).hexdigest()[:16]

def esc(x): return html.escape(x, quote=True)

def set_meta(s, attr, key, val):
    pat = r'<meta %s="%s" content="[^"]*">' % (attr, re.escape(key))
    tag = '<meta %s="%s" content="%s">' % (attr, key, esc(val))
    if re.search(pat, s): return re.sub(pat, lambda m: tag, s, count=1)
    return s.replace('</head>', tag + '</head>', 1)

def trim_desc(d):
    """Keep meta descriptions <= 155 chars: drop a trailing 'with storage...' clause, else end at a sentence."""
    if len(d) <= 155: return d
    d = re.sub(r',? with (storage|make-ahead|reheating)[^.]*\.', '.', d)
    if len(d) <= 155: return d
    cut = d[:156]
    for p in ('. ', '! ', '? '):
        i = cut.rfind(p)
        if i >= 60: return cut[:i + 1]
    return cut[:152].rsplit(' ', 1)[0].rstrip(',;:') + '...'

def ld_blocks(s):
    return list(re.finditer(r'<script type="application/ld\+json">(.*?)</script>', s, re.S))

def put_ld(s, key, obj):
    """Insert or replace our own JSON-LD block marked with data-k."""
    tag = '<script type="application/ld+json" data-k="%s">%s</script>' % (key, json.dumps(obj, ensure_ascii=False))
    pat = r'<script type="application/ld\+json" data-k="%s">.*?</script>' % key
    if re.search(pat, s, re.S): return re.sub(pat, lambda m: tag, s, count=1, flags=re.S)
    return s.replace('</head>', tag + '</head>', 1)

def img_size(path):
    try:
        with Image.open(path) as im: return im.size
    except Exception: return None

def srcset(s, f):
    pre = "../" * f.count("/")
    def fix(m):
        tag = m.group(0)
        if 'srcset=' in tag or 'loading="lazy"' not in tag: return tag
        sm = re.search(r'src="((?:\.\./)*)images/([\w.-]+)\.webp"', tag)
        if not sm: return tag
        base = sm.group(2); real = img_size("images/%s.webp" % base)
        if not real: return tag
        parts = ["%simages/thumbs/%s-%d.webp %dw" % (sm.group(1), base, w, w) for w in (480, 960) if os.path.exists("images/thumbs/%s-%d.webp" % (base, w))]
        if not parts: return tag
        parts.append("%simages/%s.webp %dw" % (sm.group(1), base, real[0]))
        wm = re.search(r'width="(\d+)" height="(\d+)"', tag)
        if wm and abs(int(wm.group(1)) / int(wm.group(2)) - real[0] / real[1]) < 0.02 and (int(wm.group(1)), int(wm.group(2))) != real:
            tag = tag.replace(wm.group(0), 'width="%d" height="%d"' % real)   # declared size = real file size
        return tag[:-1].rstrip('/').rstrip() + ' srcset="%s" sizes="%s">' % (", ".join(parts), m.group("sizes"))
    return fix

def apply_srcset(s, f):
    out = []
    # mosaic / travel strip tiles ~270px; big tiles ~540px; everything else (galleries, cards) ~360px
    def fig(m):
        cls = m.group(1); body = m.group(2)
        size = "(max-width:720px) 100vw, 540px" if " big" in cls else "(max-width:720px) 50vw, 270px"
        return m.group(0).replace(body, re.sub(r'<img [^>]*>', lambda x: srcset(None, f)(_M(x.group(0), size)), body))
    s = re.sub(r'<figure class="(m[^"]*)">(.*?)</figure>', fig, s, flags=re.S)
    s = re.sub(r'<img [^>]*>', lambda x: srcset(None, f)(_M(x.group(0), "(max-width:720px) 100vw, 360px")), s)
    return s
class _M:
    def __init__(self, t, sz): self.t, self.sz = t, sz
    def group(self, k=0): return self.sz if k == "sizes" else self.t

COMMENTS_OLD = '<script src="https://cdn.echothread.io/widget.js" async></script>'
COMMENTS_NEW = ('<script>(function(){var c=document.getElementById("comments"),d=false;function go(){if(d)return;d=true;var s=document.createElement("script");'
                's.src="https://cdn.echothread.io/widget.js";s.async=true;document.body.appendChild(s)}'
                'if(!c||!("IntersectionObserver" in window)){go();return}new IntersectionObserver(function(e,o){if(e.some(function(x){return x.isIntersecting})){o.disconnect();go()}},{rootMargin:"600px"}).observe(c)})();</script>')
SHARE_RE = re.compile(r'<a href="#" onclick="navigator\.share\?[^"]*">Copy / share link</a>')
SHARE_NEW = ('<button type="button" class="linklike" id="shareBtn">Copy / share link</button><script>document.getElementById("shareBtn").addEventListener("click",function(){var b=this;'
             'if(navigator.share){navigator.share({title:document.title,url:location.href}).catch(function(){})}'
             'else navigator.clipboard.writeText(location.href).then(function(){b.textContent="Link copied"})});</script>')

pages = sorted(glob.glob("**/*.html", recursive=True))
changed = 0
for f in pages:
    if f.startswith(("play/", "vendor/", "tools/")): continue
    s = o = open(f, encoding="utf-8").read()
    if '</head>' not in s: continue
    pre = "../" * f.count("/")
    # fonts
    s = s.replace(FONT_OLD, FONT_NEW)
    # leaflet: self-hosted, script right before first inline use of L.
    if 'leaflet' in s:
        s = s.replace('<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">', '<link rel="stylesheet" href="/vendor/leaflet/leaflet.css">')
        s = s.replace('<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>', '')
        LS = '<script src="/vendor/leaflet/leaflet.js"></script>'
        if LS not in s:
            i = s.find('L.map(')
            j = s.rfind('<script', 0, i)
            s = s[:j] + LS + s[j:]
    # home links -> "/"
    s = re.sub(r'href="(?:\.\./)*index\.html"', 'href="/"', s)
    # robots
    if f in ("search.html", "404.html", "offline.html") and 'name="robots"' not in s:
        s = s.replace('</head>', '<meta name="robots" content="noindex,follow"></head>', 1)
    # duplicate decoding attr / second banner landmark
    s = re.sub(r'(decoding="async"[^>]*?)\s+decoding="async"', r'\1', s)
    s = s.replace('<div class="scrap" role="banner">', '<div class="scrap">')
    # titles & descriptions
    is_review = f.startswith("posts/") and f.count("/") == 1
    ld_review = None
    for b in ld_blocks(s):
        try: d = json.loads(b.group(1))
        except Exception: continue
        if isinstance(d, dict) and d.get("@type") == "Review": ld_review = (b, d)
    if f == "index.html":
        s = re.sub(r'<title>[^<]*</title>', "<title>Sam's Table | Henderson &amp; Las Vegas Restaurant Reviews and Easy Home Recipes</title>", s, count=1)
    if ld_review:
        b, d = ld_review
        name = d["itemReviewed"]["name"]; a = d["itemReviewed"].get("address", {})
        city, st = a.get("addressLocality"), a.get("addressRegion")
        if city and st:
            t = "%s Review: %s, %s | Sam's Table" % (name, city, st)
            if len(t) > 60: t = "%s Review: %s, %s" % (name, city, st)
            s = re.sub(r'<title>[^<]*</title>', lambda m: "<title>%s</title>" % esc(t).replace("&#x27;", "'"), s, count=1)
            s = set_meta(s, "property", "og:title", t)
    m = re.search(r'<meta name="description" content="([^"]*)">', s)
    if m:
        dsc = trim_desc(html.unescape(m.group(1)))
        if dsc != html.unescape(m.group(1)):
            s = set_meta(s, "name", "description", dsc)
            if 'property="og:description"' in s: s = set_meta(s, "property", "og:description", dsc)
    # og image fallback + alts
    if 'property="og:image"' not in s:
        s = s.replace('</head>', '<meta property="og:image" content="%s"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"></head>' % OG_DEFAULT, 1)
    ogimg = re.search(r'<meta property="og:image" content="([^"]*)"', s).group(1)
    if 'property="og:image:alt"' not in s:
        alt = OG_ALT_DEFAULT
        if ogimg != OG_DEFAULT:
            base = ogimg.rsplit("/", 1)[-1].rsplit(".", 1)[0]
            am = re.search(r'<img [^>]*src="[^"]*/%s\.webp"[^>]*alt="([^"]+)"' % re.escape(base), s) or re.search(r'<img [^>]*alt="([^"]+)"[^>]*src="[^"]*/%s\.webp"' % re.escape(base), s)
            alt = html.unescape(am.group(1)) if am else re.sub(r"\s*\|.*$", "", html.unescape(re.search(r'<title>([^<]*)</title>', s).group(1)))
        s = s.replace('</head>', '<meta property="og:image:alt" content="%s"></head>' % esc(alt), 1)
    if 'name="twitter:image:alt"' not in s:
        ia = re.search(r'<meta property="og:image:alt" content="([^"]*)">', s).group(1)
        s = s.replace('</head>', '<meta name="twitter:image:alt" content="%s"></head>' % ia, 1)
    # structured data
    title_plain = re.sub(r"\s*\|\s*Sam's Table$", "", html.unescape(re.search(r'<title>([^<]*)</title>', s).group(1)))
    pd = page_dates(f, s)
    if f.startswith("posts/"):
        h1 = html.unescape(re.sub(r'<[^>]+>', '', re.search(r'<h1[^>]*>(.*?)</h1>', s, re.S).group(1))).strip()
        sec = ("Reviews", "reviews.html") if is_review else ("Meal Prep", "meal-prep.html") if f.startswith("posts/meal-prep/") else ("Recipes", "recipes.html")
        s = put_ld(s, "crumbs", {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": sec[0], "item": SITE + "/" + sec[1]},
            {"@type": "ListItem", "position": 3, "name": h1}]})
        if ld_review:
            b, d = ld_review
            d = dict(d); d.pop("author", None)
            lead = re.search(r'<p class="lead">(.*?)</p>', s, re.S)
            new = {"@context": "https://schema.org", "@type": "Review", "name": "%s Review" % d["itemReviewed"]["name"],
                   "datePublished": pd["published"], "author": PERSON, "publisher": PUBLISHER}
            if lead: new["reviewBody"] = html.unescape(re.sub(r'<[^>]+>', '', lead.group(1))).strip()
            d["reviewRating"] = dict(d["reviewRating"], worstRating=1)      # rating value itself untouched
            it = dict(d["itemReviewed"])
            if ogimg != OG_DEFAULT: it["image"] = ogimg
            if "address" in it: it["address"] = dict(it["address"], addressCountry=it["address"].get("addressCountry", "US"))
            d["itemReviewed"] = it
            for k in ("@context", "@type", "name", "datePublished"): d.pop(k, None)
            new.update(d)
            s = s[:b.start()] + s[b.start():b.end()].replace(b.group(1), json.dumps(new, ensure_ascii=False)) + s[b.end():]
        for b in ld_blocks(s):
            try: d = json.loads(b.group(1))
            except Exception: continue
            if isinstance(d, dict) and d.get("@type") == "Recipe" and "datePublished" not in d:
                d["datePublished"] = pd["published"]
                s = s[:b.start()] + s[b.start():b.end()].replace(b.group(1), json.dumps(d, ensure_ascii=False)) + s[b.end():]
                break
    if f == "index.html":
        s = put_ld(s, "site", {"@context": "https://schema.org", "@graph": [
            {"@type": "WebSite", "@id": SITE + "/#site", "name": "Sam's Table", "url": SITE + "/",
             "potentialAction": {"@type": "SearchAction", "target": SITE + "/search.html?q={q}", "query-input": "required name=q"}},
            dict(PERSON, description="Culinary student in Las Vegas sharing home recipes and honest restaurant reviews."), PUBLISHER]})
    # a11y
    s = SHARE_RE.sub(SHARE_NEW, s)
    s = re.sub(r'<div class="stars" aria-label="(\d) out of 5 stars">(★+)</div>',
               r'<div class="stars"><span aria-hidden="true">\2</span><span class="sr">Rated \1 out of 5</span></div>', s)
    if f in ("reviews.html", "best-of.html") and '<h2 class="sr">' not in s:
        s = re.sub(r'(</h1>.*?)(<div class="grid)', lambda m: m.group(1) + '<h2 class="sr">%s</h2>' % ("All reviews" if f == "reviews.html" else "All lists") + m.group(2), s, count=1, flags=re.S)
    s = s.replace(COMMENTS_OLD, COMMENTS_NEW)
    # images
    s = apply_srcset(s, f)
    # guards
    if is_review and s.count('class="about-place"') > 1: errors.append("%s: more than one about-place section" % f)
    if 'alt="Food photo"' in s or 'alt="Scenic travel photo"' in s: errors.append("%s: generic alt text" % f)
    if s != o:
        open(f, "w", encoding="utf-8").write(s); changed += 1
json.dump(dates, open(DATES_F, "w"), indent=0, sort_keys=True)
print("site_fixes: updated", changed, "pages")
if errors:
    print("\n".join("ERROR " + e for e in errors)); sys.exit(1)
