/*
  Sam's Table: Food Guide data
  HOW TO ADD A PLACE:
  1. Copy one { ... } block below and paste it at the end of the list (keep the comma between blocks).
  2. Fill in name, city, region, cuisine and a one-line note.
  3. Get lat/lng: in Google Maps, right-click the spot and click the numbers at the top to copy them.
  4. Optional: photo ("images/your-photo.jpg"), mustOrder (a dish you'd recommend) and review (link to a full post, e.g. "posts/my-review.html").
  The map, city buttons and cards update automatically.
*/
const PLACES = [
  { name: "La Segunda Bakery and Cafe", city: "Tampa", region: "Florida, USA", cuisine: "Cuban bakery & cafe", photo: "images/cuban-sandwich.jpg",
    note: "Baking Cuban bread daily since 1915, with a seriously stacked pastry case.", mustOrder: "Cuban sandwich",
    address: "2512 N 15th St, Tampa, FL 33605", lat: 27.96579, lng: -82.44330, review: "posts/la-segunda-tampa.html" },
  { name: "El Mezcal | Mexican Restaurant", city: "Homosassa", region: "Florida, USA", cuisine: "Mexican",
    note: "Great service and super flavorful food with a smoky chipotle kick.", mustOrder: "Chipotle Shrimp, Shrimp Chimichangas",
    address: "4522 S Suncoast Blvd, Homosassa, FL 34446", lat: 28.79595, lng: -82.57635, review: "posts/el-mezcal-homosassa.html" },
  { name: "Guyer's Ice Cream & Doughnuts", city: "Crystal River", region: "Florida, USA", cuisine: "Ice cream & doughnuts",
    note: "Notes coming soon.", address: "116 NE 5th St, Crystal River, FL 34429", lat: 28.89839, lng: -82.59160 },
  { name: "Kaizen Fusion Roll & Sushi", city: "Las Vegas area", region: "Nevada, USA", cuisine: "Sushi & Japanese", photo: "images/f-kaizen-2.jpg",
    note: "Notes coming soon.", address: "10271 S Eastern Ave #109, Henderson, NV 89052", lat: 36.00318, lng: -115.11107 },
  { name: "Sumo Henderson", city: "Las Vegas area", region: "Nevada, USA", cuisine: "Sushi & Japanese", photo: "images/f-sumo-2.jpg",
    note: "Notes coming soon.", address: "790 Coronado Center Dr, Henderson, NV 89052", lat: 36.00263, lng: -115.10865 },
  { name: "LucKi Thai Bistro", city: "Las Vegas area", region: "Nevada, USA", cuisine: "Thai", photo: "images/f-lucki-1.jpg",
    note: "Notes coming soon.", address: "7835 S Rainbow Blvd #1, Las Vegas, NV 89139", lat: 36.04507, lng: -115.24409 },
  { name: "Fireside Restaurant & Tavern", city: "Las Vegas area", region: "Nevada, USA", cuisine: "American tavern", photo: "images/f-fireside.jpg",
    note: "Notes coming soon.", address: "1785 E Cactus Ave, Las Vegas, NV 89183", lat: 35.99953, lng: -115.12791 },
  { name: "Express Hibachi", city: "Las Vegas area", region: "Nevada, USA", cuisine: "Hibachi & Chinese", photo: "images/f-hibachi.jpg",
    note: "Notes coming soon.", address: "4001 S Decatur Blvd #28, Las Vegas, NV 89103", lat: 36.11807, lng: -115.20942 },
  { name: "Alaska Chopped and Chowdered", city: "Anchorage", region: "Alaska, USA", cuisine: "Chowder & seafood", photo: "images/f-chowder.jpg",
    note: "Notes coming soon.", address: "Spenard Rd, Anchorage, AK 99517", lat: 61.18060, lng: -149.93622 }
];
