// Recipe list for the Recipes page search. Add one object per new recipe.
// category becomes a filter chip automatically. Optional "img" shows a photo on the card.
const RECIPES=[
 {
  "url": "posts/recipes/italian-meatball-soup.html",
  "title": "Easy 30 Minute Italian Meatball Soup",
  "category": "Mains",
  "tags": [
   "soup",
   "meatballs",
   "Italian",
   "pasta",
   "one pot",
   "weeknight",
   "comfort food",
   "spinach"
  ],
  "ingredients": [
   "mini meatballs",
   "marinara sauce",
   "chicken broth",
   "pasta",
   "onion",
   "carrots",
   "celery",
   "garlic",
   "spinach",
   "Parmesan",
   "heavy cream"
  ],
  "desc": "Mini meatballs and small pasta in a marinara broth with spinach and Parmesan, in about 30 minutes. Recipe by Carly's Cookbook on Chefadora."
 },
 {
  "url": "posts/recipes/grandmas-sweet-party-meatballs.html",
  "title": "Grandma's Sweet Party Meatballs",
  "category": "Appetizers",
  "tags": [
   "appetizer",
   "party food",
   "meatballs",
   "family recipe",
   "sweet and sour",
   "grape jelly",
   "chili sauce",
   "ground beef",
   "ground turkey",
   "Swedish meatballs"
  ],
  "ingredients": [
   "ground beef",
   "ground turkey",
   "Ritz crackers",
   "onion soup mix",
   "Heinz chili sauce",
   "grape jelly",
   "onions"
  ],
  "desc": "Party appetizer meatballs in a sweet grape jelly and chili sauce. A family recipe from my grandma."
 },
 {
  "url": "posts/recipes/fried-yardbird-chicken-shake.html",
  "title": "Fried Yardbird and Chicken Shake",
  "category": "Mains",
  "tags": [
   "fried chicken",
   "chicken thighs",
   "drumsticks",
   "buttermilk",
   "berbere",
   "spice blend",
   "southern",
   "Red Rooster",
   "dinner"
  ],
  "ingredients": [
   "chicken thighs",
   "chicken drumsticks",
   "buttermilk",
   "coconut milk",
   "garlic",
   "peanut oil",
   "flour",
   "semolina",
   "cornstarch",
   "white pepper",
   "berbere",
   "smoked paprika",
   "cumin",
   "celery salt",
   "kosher salt"
  ],
  "desc": "Brined, buttermilk-marinated fried chicken with a berbere spice blend. Recipe by Marcus Samuelsson from The Red Rooster Cookbook."
 },
 {
  "url": "posts/recipes/vegan-lentil-meatballs-swedish-sauce.html",
  "title": "Vegan Lentil Meatballs with Swedish Sauce",
  "category": "Mains",
  "tags": [
   "vegan",
   "vegetarian",
   "lentils",
   "meatballs",
   "meal prep",
   "dinner",
   "dairy free",
   "freezer friendly"
  ],
  "ingredients": [
   "lentils",
   "panko",
   "red onion",
   "parsley",
   "flax seed",
   "vegan butter",
   "mushroom broth",
   "coconut cream",
   "vegan Worcestershire",
   "Dijon mustard",
   "flour",
   "allspice",
   "nutmeg"
  ],
  "desc": "Lentil meatballs in a creamy Swedish-style gravy, all in one skillet. Recipe by Andrew Bernard at Make It Dairy Free."
 },
 {
  "url": "posts/recipes/adobo-chicken-tacos.html",
  "title": "Adobo Fire Chicken Tacos",
  "category": "Mains",
  "tags": [
   "tacos",
   "Mexican",
   "chicken",
   "grilled",
   "charcoal",
   "BBQ",
   "marinade"
  ],
  "ingredients": [
   "chicken thighs",
   "ancho chilies",
   "chipotles in adobo",
   "orange juice",
   "apple cider vinegar",
   "achiote",
   "tortillas",
   "salsa verde",
   "cotija",
   "pickled red onions"
  ],
  "desc": "Charcoal-grilled chicken thighs in an ancho-chipotle adobo marinade. Recipe by Meat Church."
 },
 {
  "url": "posts/recipes/quick-dumpling-laksa.html",
  "title": "Quick Dumpling Laksa",
  "category": "Mains",
  "tags": [
   "soup",
   "dumplings",
   "coconut curry",
   "quick",
   "one pot",
   "Asian",
   "weeknight"
  ],
  "ingredients": [
   "frozen dumplings",
   "red curry paste",
   "coconut milk",
   "chicken stock",
   "fish sauce",
   "bok choy",
   "bean sprouts",
   "lime",
   "cilantro"
  ],
  "desc": "Frozen dumplings in a coconut red curry broth with bok choy, in about 20 minutes. Recipe by Nicole at Simple Home Edit."
 },
 {
  "url": "posts/recipes/one-pan-dumpling-dinner.html",
  "title": "One Pan Dumpling Dinner",
  "category": "Mains",
  "tags": [
   "dumplings",
   "one pan",
   "baked",
   "coconut curry",
   "bok choy",
   "weeknight",
   "Asian"
  ],
  "ingredients": [
   "frozen dumplings",
   "coconut milk",
   "soy sauce",
   "red curry paste",
   "rice vinegar",
   "sesame oil",
   "bok choy",
   "green onion",
   "chili crunch"
  ],
  "desc": "Frozen dumplings baked over bok choy in a coconut red curry sauce. Recipe by Nicole McLaughlin at Allrecipes."
 },
 {
  "url": "posts/recipes/all-butter-pie-crust.html",
  "title": "All Butter Pie Crust",
  "category": "Baking",
  "tags": [
   "pie crust",
   "pie",
   "baking",
   "dessert",
   "make ahead",
   "freezer friendly",
   "vegetarian"
  ],
  "ingredients": [
   "flour",
   "sugar",
   "salt",
   "unsalted butter",
   "ice water"
  ],
  "desc": "Flaky, buttery pie dough with 5 ingredients. Makes 2 crusts. Recipe by Sally McKenney at Sally's Baking."
 },
 {
  "url": "posts/recipes/bevs-chocolate-pie.html",
  "title": "Bev's Chocolate Pie",
  "category": "Desserts",
  "tags": [
   "pie",
   "chocolate",
   "meringue",
   "dessert",
   "holiday",
   "vegetarian"
  ],
  "ingredients": [
   "sugar",
   "cocoa powder",
   "flour",
   "evaporated milk",
   "vanilla",
   "eggs",
   "butter",
   "pie crust"
  ],
  "desc": "Old-fashioned baked chocolate pie with a golden meringue. Recipe by Diana Barnes at Allrecipes."
 },
 {
  "url": "posts/recipes/copycat-style-waffles.html",
  "title": "Waffle House-Style Waffles (Copycat)",
  "category": "Breakfast",
  "tags": [
   "waffles",
   "breakfast",
   "brunch",
   "copycat",
   "buttermilk",
   "vegetarian"
  ],
  "ingredients": [
   "flour",
   "cornstarch",
   "baking soda",
   "baking powder",
   "egg",
   "sugar",
   "butter",
   "vanilla",
   "milk",
   "buttermilk"
  ],
  "desc": "Fluffy, crispy diner-style waffles with buttermilk. Recipe by Brendan Cunningham at I'm Hungry For That."
 },
 {
  "url": "posts/recipes/homemade-salsa.html",
  "title": "Homemade Salsa",
  "category": "Sauces",
  "tags": [
   "salsa",
   "dip",
   "Mexican",
   "no cook",
   "vegan",
   "vegetarian",
   "tacos",
   "make ahead"
  ],
  "ingredients": [
   "tomatoes",
   "onion",
   "green onion",
   "garlic",
   "jalapeño",
   "cilantro",
   "lime",
   "cumin"
  ],
  "desc": "Fresh tomato salsa made in the blender, chunky or smooth. Recipe by Monique Volz at Ambitious Kitchen."
 },
 {
  "url": "posts/recipes/candied-almonds.html",
  "title": "Candied Almonds",
  "category": "Snacks",
  "tags": [
   "snack",
   "almonds",
   "nuts",
   "air fryer",
   "cinnamon",
   "holiday",
   "gift",
   "vegetarian"
  ],
  "ingredients": [
   "almonds",
   "brown sugar",
   "sugar",
   "egg white",
   "cinnamon",
   "vanilla",
   "nutmeg"
  ],
  "desc": "Crunchy cinnamon-sugar almonds in the air fryer or oven. Recipe by Lisa MarcAurele at Little Bit Recipes."
 },
 {
  "url": "posts/recipes/bacon-jam.html",
  "title": "Bacon Jam with Onion, Balsamic, and Thyme",
  "category": "Sauces",
  "tags": [
   "bacon",
   "spread",
   "condiment",
   "appetizer",
   "burger topping",
   "make ahead",
   "holiday",
   "Southern"
  ],
  "ingredients": [
   "bacon",
   "sweet onions",
   "brown sugar",
   "balsamic vinegar",
   "thyme",
   "black pepper"
  ],
  "desc": "Sweet, smoky bacon and caramelized onion spread. Recipe by Kari at Southern Bytes."
 },
 {
  "url": "posts/recipes/instant-pot-tuscan-chicken.html",
  "title": "Instant Pot Tuscan Chicken",
  "category": "Mains",
  "tags": [
   "Instant Pot",
   "chicken",
   "creamy",
   "Italian",
   "weeknight",
   "pressure cooker"
  ],
  "ingredients": [
   "chicken breasts",
   "butter",
   "garlic",
   "chicken stock",
   "Italian seasoning",
   "sun-dried tomatoes",
   "heavy cream",
   "parmesan",
   "spinach"
  ],
  "desc": "Chicken in a garlic parmesan cream sauce with sun-dried tomatoes and spinach. Recipe by Diana at Little Sunny Kitchen."
 },
 {
  "url": "posts/recipes/bread-machine-thin-crust-pizza-dough.html",
  "title": "Bread Machine Thin Crust Pizza Dough",
  "category": "Baking",
  "tags": [
   "pizza",
   "dough",
   "bread machine",
   "vegan",
   "vegetarian",
   "pizza night"
  ],
  "ingredients": [
   "flour",
   "yeast",
   "salt",
   "sugar",
   "olive oil",
   "water"
  ],
  "desc": "Thin, crisp pizza crust made on the dough setting. Recipe by Healthy Boy at Allrecipes."
 },
 {
  "url": "posts/recipes/parmesan-zucchini-fritters.html",
  "title": "Crispy Parmesan Zucchini Fritters",
  "category": "Sides",
  "tags": [
   "zucchini",
   "fritters",
   "side",
   "snack",
   "vegetarian",
   "summer"
  ],
  "ingredients": [
   "zucchini",
   "carrots",
   "garlic",
   "flour",
   "parmesan",
   "eggs",
   "scallions",
   "olive oil",
   "sour cream",
   "Greek yogurt"
  ],
  "desc": "Pan-fried zucchini and carrot fritters with parmesan. Recipe by Christina Cherrier at Eatwell101."
 },
 {
  "url": "posts/recipes/tzatziki-potato-salad.html",
  "title": "Tzatziki Potato Salad",
  "category": "Sides",
  "tags": [
   "potato salad",
   "Greek",
   "yogurt",
   "side",
   "cookout",
   "vegetarian",
   "summer"
  ],
  "ingredients": [
   "potatoes",
   "cucumbers",
   "Greek yogurt",
   "olive oil",
   "lemon",
   "honey",
   "garlic",
   "olives",
   "dill",
   "mint"
  ],
  "desc": "Potatoes in a garlicky cucumber yogurt dressing with dill and mint. Recipe by Hetty Lui McKinnon at NYT Cooking."
 },
 {
  "url": "posts/recipes/portokalopita-greek-orange-cake.html",
  "title": "Portokalopita (Greek Orange Cake with Syrup)",
  "category": "Desserts",
  "tags": [
   "Greek",
   "cake",
   "orange",
   "phyllo",
   "dessert",
   "make ahead",
   "vegetarian"
  ],
  "ingredients": [
   "phyllo dough",
   "yogurt",
   "vegetable oil",
   "sugar",
   "orange juice",
   "orange zest",
   "eggs",
   "baking powder",
   "vanilla",
   "cinnamon"
  ],
  "desc": "Syrupy Greek orange cake made with torn phyllo and yogurt. Recipe by Eli K. Giannopoulos at My Greek Dish."
 },
 {
  "url": "posts/recipes/filipino-spaghetti.html",
  "title": "Filipino Sweet Spaghetti",
  "category": "Mains",
  "tags": [
   "Filipino",
   "pasta",
   "spaghetti",
   "pork",
   "party food",
   "kid friendly"
  ],
  "ingredients": [
   "ground pork",
   "hot dogs",
   "tomato sauce",
   "banana ketchup",
   "brown sugar",
   "fish sauce",
   "spaghetti",
   "onion",
   "garlic",
   "cheese"
  ],
  "desc": "Sweet banana ketchup sauce with ground pork and hot dogs over spaghetti. Recipe by MG Sanchez at Hungry Huy."
 },
 {
  "url": "posts/recipes/copycat-style-mac-and-cheese.html",
  "title": "Bob Evans-Style Mac and Cheese (Copycat)",
  "category": "Sides",
  "tags": [
   "mac and cheese",
   "pasta",
   "comfort food",
   "copycat",
   "side",
   "kid friendly",
   "vegetarian"
  ],
  "ingredients": [
   "elbow macaroni",
   "cheddar",
   "Velveeta",
   "milk",
   "paprika",
   "dry mustard"
  ],
  "desc": "Extra creamy stovetop mac and cheese with Velveeta and cheddar. Recipe by Audrey Wood at Two Pink Peonies."
 },
 {
  "url": "posts/recipes/cheesecake-factory-style-miso-salmon.html",
  "title": "Cheesecake Factory-Style Miso Salmon (Copycat)",
  "category": "Mains",
  "tags": [
   "salmon",
   "fish",
   "seafood",
   "miso",
   "copycat",
   "dinner",
   "favorite"
  ],
  "ingredients": [
   "salmon",
   "red miso",
   "brown sugar",
   "soy sauce",
   "rice vinegar",
   "snow peas",
   "sake",
   "shallot",
   "butter",
   "chives"
  ],
  "desc": "Sweet miso-glazed salmon with snow peas and sake butter. One of my favorites to make. Recipe by Brendan Cunningham at I'm Hungry For That."
 },
 {
  "url": "posts/recipes/easy-cheesy-crispy-vegan-black-bean-tacos.html",
  "title": "Easy Cheesy Crispy Vegan Black Bean Tacos",
  "category": "Mains",
  "tags": [
   "vegan",
   "vegetarian",
   "tacos",
   "Mexican",
   "black beans",
   "quick",
   "dinner",
   "dairy free"
  ],
  "ingredients": [
   "black beans",
   "salsa",
   "taco seasoning",
   "flour tortillas",
   "vegan cheese",
   "vegan butter",
   "oil"
  ],
  "desc": "Crispy pan-fried tacos with a black bean and salsa filling and melty vegan cheese. Recipe by Andrew Bernard at Make It Dairy Free."
 },
 {
  "url": "posts/recipes/pai-huang-gua-chinese-cucumber-salad.html",
  "title": "Pai Huang Gua (Chinese Cucumber Salad)",
  "category": "Sides",
  "tags": [
   "vegan",
   "vegetarian",
   "salad",
   "Chinese",
   "cucumber",
   "side",
   "no cook",
   "summer"
  ],
  "ingredients": [
   "cucumber",
   "rice vinegar",
   "black vinegar",
   "garlic",
   "soy sauce",
   "sesame oil",
   "sugar",
   "sesame seeds",
   "cilantro",
   "chili crisp"
  ],
  "desc": "Smashed cucumbers in a garlicky soy and vinegar dressing. Recipe by Kevin at Silk Road Recipes."
 },
 {
  "url": "posts/recipes/vegan-tofu-egg-salad.html",
  "title": "Vegan Tofu Egg Salad",
  "category": "Mains",
  "tags": [
   "vegan",
   "vegetarian",
   "tofu",
   "sandwich",
   "lunch",
   "high protein",
   "no cook",
   "meal prep",
   "egg free"
  ],
  "ingredients": [
   "tofu",
   "vegan mayo",
   "green onions",
   "dill",
   "celery",
   "Dijon mustard",
   "black salt",
   "kala namak",
   "turmeric",
   "lemon",
   "nutritional yeast"
  ],
  "desc": "Creamy, high-protein tofu salad for sandwiches. Recipe by Sarah Sullivan at Sarah's Vegan Kitchen."
 },
 {
  "url": "posts/recipes/vegan-mayonnaise.html",
  "title": "Vegan Mayonnaise",
  "category": "Sauces",
  "tags": [
   "vegan",
   "vegetarian",
   "egg free",
   "dairy free",
   "mayo",
   "condiment",
   "spread",
   "sandwich"
  ],
  "ingredients": [
   "soy milk",
   "vinegar",
   "Dijon mustard",
   "lemon juice",
   "neutral oil",
   "salt",
   "aquafaba"
  ],
  "desc": "Thick, creamy egg-free mayo made with soy milk. Recipe by Joanne Gallagher at Inspired Taste."
 },
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
  "desc": "Chicken thighs simmered in a sticky bourbon sauce. Adapted from a recipe shared on Reddit.",
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
   "Worcestershire sauce",
   "black pepper",
   "garlic powder",
   "Creole seasoning"
  ],
  "desc": "Tangy, peppery copycat-style dipping sauce for tenders and fries. Recipe by Kari at Southern Bytes."
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
