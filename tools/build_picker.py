#!/usr/bin/env python3
"""Build data/picker.js for the "What should I make?" picker from every recipe and meal-prep page.
Run from the site folder: python3 tools/build_picker.py (build_site.py runs it too)."""
import re, json, glob, html, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

def iso_min(v):
    m = re.fullmatch(r'P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?', v or '')
    if not m: return None
    d, h, mi = (int(x or 0) for x in m.groups())
    return d * 1440 + h * 60 + mi or None

def recipe_ld(s):
    for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S):
        try: d = json.loads(b)
        except Exception: continue
        for x in (d if isinstance(d, list) else d.get('@graph', [d])):
            if isinstance(x, dict) and x.get('@type') == 'Recipe': return x
    return {}

src = open('data/recipes.js', encoding='utf-8').read()
RECIPES = json.loads(src[src.index('['):src.rindex(']') + 1])
veg = open('vegetarian.html', encoding='utf-8').read()
def hub(section):
    m = re.search(r'<h2>%s</h2>.*?</section>' % section, veg, re.S)
    return set(re.findall(r'posts/recipes/([\w-]+)\.html', m.group(0))) if m else set()
VEGAN, VEGGIE = hub('Vegan picks'), hub('More vegetarian recipes')
mp = open('meal-prep.html', encoding='utf-8').read()
MP = {u: (meal, tags.split('|') if tags else []) for u, meal, tags in
      re.findall(r'href="(posts/meal-prep/[^"]+)" data-meal="([^"]+)" data-tags="([^"]*)"', mp)}

MEAT = r'\b(chicken|beef|pork|turkey|bacon|sausage|ham|prosciutto|pepperoni|salmon|tuna|shrimp|fish|anchov|crab|lobster|lamb|gelatin|worcestershire|chorizo|steak|meatball)'
ANIMAL = r'\b(egg|eggs|milk|butter|cheese|cheddar|parmesan|feta|cotija|mozzarella|yogurt|cream|honey|mayo|mayonnaise|ghee|buttermilk)\b'
HAVE = {'Chicken': r'\bchicken\b(?! (broth|stock|bouillon))', 'Beef': r'\b(ground beef|beef|steak)\b', 'Pork': r'\b(pork|bacon|ham|sausage)\b',
        'Turkey': r'\bturkey\b', 'Seafood': r'\b(salmon|shrimp|fish(?! sauce)|tuna|crab|lobster)\b', 'Pasta': r'\b(pasta|spaghetti|macaroni|noodles?|penne|orzo)\b',
        'Rice': r'\brice\b(?! vinegar| wine)', 'Tofu': r'\btofu\b', 'Beans & lentils': r'\b(beans?|lentils?|chickpeas?)\b',
        'Eggs': r'\beggs?\b', 'Potatoes': r'\b(potato|potatoes)\b'}
EST = re.compile(r'times? (?:are|is) (?:an )?estimates?', re.I)
MEATY = {'Chicken', 'Beef', 'Pork', 'Turkey', 'Seafood'}
MEAL = {'Mains': ['Main'], 'Sides': ['Side'], 'Sauces': ['Sauce'], 'Desserts': ['Dessert'], 'Breakfast': ['Breakfast'],
        'Snacks': ['Snack'], 'Appetizers': ['Appetizer'], 'Baking': ['Side']}
OVERRIDE = {'all-butter-pie-crust': ['Dessert'], 'bread-machine-thin-crust-pizza-dough': ['Main'], 'jiffy-cornbread': ['Side'],
            'bread-machine-zucchini-bread': ['Breakfast', 'Snack'], 'parmesan-zucchini-fritters': ['Side', 'Snack'],
            'bacon-jam': ['Sauce', 'Appetizer'], 'candied-almonds': ['Snack'], 'homemade-salsa': ['Sauce', 'Appetizer']}

def page_info(path):
    s = open(path, encoding='utf-8').read()
    ld = recipe_ld(s)
    card = s[s.find('id="recipe-card"'):]
    m = re.search(r'</h2>(?:\s*<[^>]+>)*?\s*<p>(.*?)</p>', card[:3000], re.S)
    credit = html.unescape(re.sub(r'<[^>]+>', '', m.group(1))).strip() if m else ''
    img = re.search(r'<img class="recipe-photo[^"]*" src="\.\./\.\./([^"]+)"', s)
    if not img:
        img = re.search(r'<img class="recipe-photo[^"]*" src="\.\./\.\./([^"]+)"', s)
    ing = ' '.join(ld.get('recipeIngredient', [])).lower()
    return s, ld, credit, img.group(1) if img else None, ing

def short(c):
    # Keep just the credit sentence (e.g. "A family recipe from my grandma.")
    return re.split(r'(?<=\.)\s+(?=From )', c)[0]

out = []
for r in RECIPES:
    slug = r['url'].rsplit('/', 1)[1][:-5]
    s, ld, credit, img, ing = page_info(r['url'])
    tags = [t.lower() for t in r.get('tags', [])]
    diet = 'vegan' if slug in VEGAN else 'vegetarian' if slug in VEGGIE else ''
    out.append(dict(t=r['title'], u='/' + r['url'], c=r['category'], m=OVERRIDE.get(slug, MEAL.get(r['category'], ['Main'])),
        min=iso_min(ld.get('totalTime')), est=bool(EST.search(s)), d=diet,
        mp=any(k in ' '.join(tags) for k in ('meal prep', 'make ahead', 'freezer')),
        h=[k for k, rx in HAVE.items() if re.search(rx, ing)], img=img or (r.get('img') or None), by=short(credit), x=r.get('desc', '')))
for path in sorted(glob.glob('posts/meal-prep/*.html')):
    s, ld, credit, img, ing = page_info(path)
    u = path
    meal, mtags = MP.get(u, (ld.get('recipeCategory', 'Dinner'), []))
    if re.search(MEAT, ing): diet = ''
    elif re.search(ANIMAL, ing.replace('vegan mayo', '')): diet = 'vegetarian'
    else: diet = 'vegan'
    if diet and re.search(r'\b(chicken|beef) (broth|stock)', ing): diet = ''
    title = html.unescape(re.sub(r"\s*\(Meal Prep\)|\s*\|\s*Sam's Table", '', re.search(r'<title>(.*?)</title>', s).group(1))).strip()
    desc = html.unescape((re.search(r'<meta name="description" content="([^"]*)"', s) or [0, ''])[1])
    out.append(dict(t=title, u='/' + u, c='Meal Prep · ' + meal, m=['Breakfast'] if meal == 'Breakfast' else ['Main'],
        min=iso_min(ld.get('totalTime')), est=bool(EST.search(s)), d=diet, mp=True,
        h=[k for k, rx in HAVE.items() if re.search(rx, ing)], img=img, by=short(credit), x=desc, tg=mtags))
CREDIT = re.compile(r"\s*(Recipe by|Meal prep recipe by|Adapted from|A family recipe|A Sam's Table original|From The)\b[^.]*(\.[^.]*?)?\.$")
for o in out:
    x = CREDIT.sub('', o['x']).strip()
    if x: o['x'] = x
    if o['d']: o['h'] = [k for k in o['h'] if k not in MEATY]
open('data/picker.js', 'w', encoding='utf-8').write('/* Built by tools/build_picker.py. Do not edit by hand. */\nconst PICKS=' +
    json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n')
print(len(out), 'picker recipes')
