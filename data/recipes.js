// Recipe list for the Recipes page search. Add one object per new recipe.
// category becomes a filter chip automatically. Optional "img" shows a photo on the card.
const RECIPES=[
 {
  "url": "posts/recipes/bourbon-chicken.html",
  "title": "Bourbon Chicken",
  "category": "Mains",
  "tags": [
   "chicken",
   "sweet and savory",
   "dinner",
   "rice bowl",
   "Cajun-style"
  ],
  "ingredients": [
   "chicken thighs",
   "soy sauce",
   "brown sugar",
   "bourbon",
   "honey",
   "apple cider vinegar",
   "sesame oil",
   "garlic",
   "ginger",
   "white pepper",
   "MSG",
   "rice",
   "broccoli"
  ],
  "desc": "Charred chicken thighs in a sticky bourbon glaze. Adapted from a recipe shared on Reddit.",
  "img": "images/r-bourbon-chicken.webp"
 },
 {
  "url": "posts/recipes/vegan-lentil-burgers.html",
  "title": "Vegan Lentil Burgers",
  "category": "Mains",
  "tags": [
   "vegan",
   "vegetarian",
   "dairy free",
   "burger",
   "plant based",
   "cookout"
  ],
  "ingredients": [
   "red lentils",
   "onion",
   "carrot",
   "cilantro",
   "garlic",
   "tomato paste",
   "smoked paprika",
   "cumin"
  ],
  "desc": "Hearty red lentil patties you can pan-fry or bake. Recipe by Andrew Bernard at Make It Dairy Free."
 },
 {
  "url": "posts/recipes/tzatziki-sauce.html",
  "title": "Tzatziki Sauce",
  "category": "Sauces",
  "tags": [
   "Greek",
   "dip",
   "no cook",
   "vegetarian",
   "quick"
  ],
  "ingredients": [
   "cucumber",
   "Greek yogurt",
   "lemon",
   "olive oil",
   "garlic",
   "dill",
   "mint"
  ],
  "desc": "Cool, garlicky cucumber yogurt sauce in 5 minutes. Recipe by Jeanine Donofrio at Love and Lemons."
 },
 {
  "url": "posts/recipes/tinis-mac-and-cheese.html",
  "title": "Tini's Mac and Cheese",
  "category": "Sides",
  "tags": [
   "baked mac and cheese",
   "pasta",
   "comfort food",
   "TikTok",
   "copycat"
  ],
  "ingredients": [
   "corkscrew pasta",
   "mozzarella",
   "Colby jack",
   "cheddar",
   "evaporated milk",
   "heavy cream",
   "butter",
   "Dijon mustard",
   "smoked paprika"
  ],
  "desc": "The viral, extra-cheesy baked mac and cheese. Recipe by Brendan Cunningham at I'm Hungry For That."
 },
 {
  "url": "posts/recipes/cilantro-lime-crema.html",
  "title": "Cilantro Lime Crema",
  "category": "Sauces",
  "tags": [
   "Mexican",
   "taco topping",
   "no cook",
   "quick",
   "vegetarian"
  ],
  "ingredients": [
   "Greek yogurt",
   "sour cream",
   "mayonnaise",
   "lime",
   "garlic",
   "cilantro",
   "onion powder"
  ],
  "desc": "Creamy, zesty sauce for tacos, bowls, and more. Recipe by Jeanine Donofrio at Love and Lemons."
 },
 {
  "url": "posts/recipes/home-style-pork-carnitas.html",
  "title": "Home-Style Pork Carnitas",
  "category": "Mains",
  "tags": [
   "Mexican",
   "tacos",
   "pork",
   "oven",
   "make ahead"
  ],
  "ingredients": [
   "pork shoulder",
   "orange juice",
   "garlic",
   "bay leaves",
   "Mexican oregano",
   "black pepper",
   "guacamole",
   "salsa",
   "limes",
   "corn tortillas"
  ],
  "desc": "Oven-braised, then roasted until golden. Great for tacos. Recipe by Rick Bayless at RickBayless.com."
 },
 {
  "url": "posts/recipes/jiffy-cornbread.html",
  "title": "The Best Jiffy Cornbread",
  "category": "Baking",
  "tags": [
   "cornbread",
   "Southern",
   "easy",
   "side"
  ],
  "ingredients": [
   "sour cream",
   "milk",
   "eggs",
   "butter",
   "Jiffy corn muffin mix",
   "sugar"
  ],
  "desc": "Extra-moist cornbread from a box mix. Recipe by Christin Mahrlig at Spicy Southern Kitchen."
 },
 {
  "url": "posts/recipes/bread-machine-zucchini-bread.html",
  "title": "Bread Machine Zucchini Bread",
  "category": "Baking",
  "tags": [
   "bread machine",
   "quick bread",
   "breakfast",
   "snack"
  ],
  "ingredients": [
   "zucchini",
   "vegetable oil",
   "eggs",
   "vanilla",
   "brown sugar",
   "flour",
   "cinnamon",
   "walnuts",
   "chocolate chips"
  ],
  "desc": "Zucchini bread made start to finish in a bread machine. Recipe by Bread Dad."
 },
 {
  "url": "posts/recipes/hawaiian-macaroni-salad.html",
  "title": "Hawaiian Macaroni Salad",
  "category": "Sides",
  "tags": [
   "Hawaiian",
   "pasta salad",
   "BBQ",
   "cookout",
   "make ahead",
   "plate lunch"
  ],
  "ingredients": [
   "macaroni",
   "apple cider vinegar",
   "carrots",
   "onion",
   "mayonnaise",
   "milk",
   "sugar"
  ],
  "desc": "Creamy, no-frills island-style mac salad. Recipe by Erica Walker at Favorite Family Recipes."
 },
 {
  "url": "posts/recipes/strawberry-lemonade-cookies.html",
  "title": "Strawberry Lemonade Cookies",
  "category": "Desserts",
  "tags": [
   "cookies",
   "summer",
   "baking",
   "two tone"
  ],
  "ingredients": [
   "butter",
   "sugar",
   "egg",
   "vanilla",
   "flour",
   "freeze-dried strawberries",
   "lemonade mix",
   "lemon zest",
   "food color"
  ],
  "desc": "Two-tone chewy cookies, half strawberry and half lemon. Recipe by Tornadough Alli.",
  "img": "images/h-lemonade-cookies.webp"
 },
 {
  "url": "posts/recipes/huli-huli-chicken.html",
  "title": "Huli Huli Chicken",
  "category": "Mains",
  "tags": [
   "Hawaiian",
   "grilled",
   "chicken",
   "marinade",
   "BBQ"
  ],
  "ingredients": [
   "chicken thighs",
   "pineapple juice",
   "soy sauce",
   "ketchup",
   "brown sugar",
   "ginger",
   "garlic",
   "sesame seeds",
   "green onions"
  ],
  "desc": "Sweet pineapple-soy grilled chicken thighs. Recipe by Joe Duff at I'm Hungry For That."
 },
 {
  "url": "posts/recipes/greek-chicken.html",
  "title": "Greek Chicken",
  "category": "Mains",
  "tags": [
   "Greek",
   "grilled",
   "chicken",
   "marinade",
   "sauce"
  ],
  "ingredients": [
   "chicken breasts",
   "olive oil",
   "fish sauce",
   "soy sauce",
   "Dijon mustard",
   "garlic",
   "thyme",
   "rosemary",
   "lemon",
   "mayo",
   "Greek yogurt",
   "parsley"
  ],
  "desc": "Lemony grilled chicken with a quick garlic yogurt sauce. Recipe by Sam the Cooking Guy at The Cooking Guy."
 },
 {
  "url": "posts/recipes/korean-potato-salad.html",
  "title": "Korean Potato Salad (Gamja Salad)",
  "category": "Sides",
  "tags": [
   "Korean",
   "banchan",
   "potato salad",
   "make ahead"
  ],
  "ingredients": [
   "russet potatoes",
   "cucumber",
   "rice wine vinegar",
   "eggs",
   "carrot",
   "mayonnaise",
   "rice syrup",
   "honey"
  ],
  "desc": "Lightly sweet, chunky Korean-style potato salad. Recipe by Huy Vu at Hungry Huy."
 },
 {
  "url": "posts/recipes/childhood-honey-mustard.html",
  "title": "Childhood Honey Mustard",
  "category": "Sauces",
  "tags": [
   "dip",
   "dipping sauce",
   "no cook",
   "quick",
   "original"
  ],
  "ingredients": [
   "Miracle Whip",
   "honey",
   "yellow mustard",
   "Dijon mustard",
   "brown sugar",
   "lemon juice"
  ],
  "desc": "Sweet, tangy restaurant-style honey mustard. A Sam's Table original."
 },
 {
  "url": "posts/recipes/remoulade-sauce.html",
  "title": "Remoulade Sauce",
  "category": "Sauces",
  "tags": [
   "dip",
   "dipping sauce",
   "Cajun",
   "Creole",
   "seafood sauce",
   "no cook",
   "original"
  ],
  "ingredients": [
   "mayonnaise",
   "dill pickle relish",
   "lemon juice",
   "hot sauce",
   "capers",
   "paprika",
   "Creole mustard",
   "Dijon mustard",
   "Worcestershire",
   "garlic"
  ],
  "desc": "Tangy, creamy Cajun-style sauce for seafood and fries. A Sam's Table original."
 },
 {
  "url": "posts/recipes/raising-canes-copycat-sauce.html",
  "title": "Raising Cane's Copycat Sauce",
  "category": "Sauces",
  "tags": [
   "copycat",
   "dipping sauce",
   "chicken tenders",
   "Cane's sauce",
   "no cook",
   "make ahead"
  ],
  "ingredients": [
   "mayonnaise",
   "ketchup",
   "Worcestershire",
   "garlic powder",
   "black pepper",
   "creole seasoning",
   "Tony Chachere's",
   "paprika",
   "salt"
  ],
  "desc": "Tangy, peppery dipping sauce just like the chicken-finger chain's. Recipe from The Country Cook."
 },
 {
  "url": "posts/recipes/oven-roasted-corn-on-the-cob.html",
  "title": "The Best Way to Cook Corn on the Cob",
  "category": "Sides",
  "tags": [
   "corn",
   "oven",
   "easy",
   "summer",
   "cookout",
   "vegetarian",
   "no shucking"
  ],
  "ingredients": [
   "corn on the cob",
   "butter",
   "salt",
   "chili",
   "lime",
   "garlic",
   "parmesan",
   "mayo",
   "cotija",
   "chili powder"
  ],
  "desc": "Roast whole ears in the husk, then slide them out silk-free. A Sam's Table original."
 },
 {
  "url": "posts/recipes/pellet-grill-frozen-chicken-wings.html",
  "title": "Pellet Grill Frozen Chicken Wings (0 to 400 Method)",
  "category": "Mains",
  "tags": [
   "pellet grill",
   "smoker",
   "wings",
   "frozen",
   "game day",
   "BBQ",
   "chicken"
  ],
  "ingredients": [
   "frozen chicken wings",
   "oil",
   "seasoning",
   "rub",
   "wing sauce"
  ],
  "desc": "Frozen wings straight onto a cold pellet grill, then cranked to 400°F. A Sam's Table original."
 },
 {
  "url": "posts/recipes/pellet-grill-smoked-chicken-drumsticks.html",
  "title": "Pellet Grill Smoked Chicken Drumsticks",
  "category": "Mains",
  "tags": [
   "pellet grill",
   "smoker",
   "drumsticks",
   "BBQ",
   "chicken",
   "smoked"
  ],
  "ingredients": [
   "chicken drumsticks",
   "oil",
   "binder",
   "seasoning",
   "rub",
   "BBQ sauce"
  ],
  "desc": "Smoked at 250°F, then finished hot for crispy skin. A Sam's Table original.",
  "img": "images/h-drumsticks-smoker-1.webp"
 },
 {
  "url": "posts/recipes/slow-cooker-marinara-sauce.html",
  "title": "Slow Cooker Marinara Sauce",
  "category": "Sauces",
  "tags": [
   "slow cooker",
   "crockpot",
   "freezer friendly",
   "meal prep",
   "Italian",
   "vegetarian",
   "pasta sauce"
  ],
  "ingredients": [
   "crushed tomatoes",
   "fire roasted diced tomatoes",
   "garlic",
   "onion",
   "oregano",
   "basil",
   "red pepper flakes",
   "salt",
   "pepper",
   "bay leaves"
  ],
  "desc": "Freezer-friendly marinara that cooks itself. Recipe by Star Anastasia at The Skinnyish Dish."
 }
];
