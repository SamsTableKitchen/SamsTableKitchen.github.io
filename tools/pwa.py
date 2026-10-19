#!/usr/bin/env python3
"""Keep the app (PWA) wiring on every page. build_site.py runs this, so new pages get it automatically.
- iOS/Android home-screen meta tags + app icon
- /js/app.js (service worker + install prompt)
- "Get the app" footer link
- sw.js cache VERSION = the CSS ?v= version, so a CSS bump always refreshes the app's caches."""
import re, glob, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
META = ('<!--pwa--><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes">'
        '<meta name="apple-mobile-web-app-status-bar-style" content="default"><meta name="apple-mobile-web-app-title" content="Sam\'s Table">'
        '<meta name="application-name" content="Sam\'s Table"><!--/pwa-->')
APP = '<script src="/js/app.js" defer></script>'
changed = 0
for f in glob.glob('**/*.html', recursive=True):
    s = o = open(f, encoding='utf-8').read()
    if '</head>' not in s: continue
    s = re.sub(r'<!--pwa-->.*?<!--/pwa-->', '', s, flags=re.S)
    s = s.replace('<link rel="apple-touch-icon" href="/apple-touch-icon.png">', '<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">')
    if 'rel="apple-touch-icon"' not in s: s = s.replace('</head>', '<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></head>', 1)
    if 'rel="manifest"' not in s: s = s.replace('</head>', '<link rel="manifest" href="/site.webmanifest"></head>', 1)
    if 'name="theme-color"' not in s: s = s.replace('</head>', '<meta name="theme-color" content="#6B7F3A"></head>', 1)
    s = s.replace('<link rel="manifest" href="/site.webmanifest">', '<link rel="manifest" href="/site.webmanifest">' + META, 1)
    if APP not in s:
        s = s.replace('<script src="/js/search.js"', APP + '<script src="/js/search.js"', 1) if '<script src="/js/search.js"' in s else s.replace('</body>', APP + '</body>', 1)
    if '<footer>' in s and 'Get the app</a>' not in s:
        s = re.sub(r'(<footer>.*?<a href="[^"]*contact\.html">Contact</a>)', r'\1<a href="/about.html#app">Get the app</a>', s, count=1, flags=re.S)
    if s != o:
        open(f, 'w', encoding='utf-8').write(s); changed += 1
m = re.search(r'style\.css\?v=([\w.-]+)', open('index.html', encoding='utf-8').read())
if m:
    sw = open('sw.js', encoding='utf-8').read()
    sw2 = re.sub(r"const VERSION = '[^']*';", "const VERSION = '%s';" % m.group(1), sw)
    if sw2 != sw: open('sw.js', 'w', encoding='utf-8').write(sw2)
print('pwa: updated', changed, 'pages; sw version', m.group(1) if m else '?')
