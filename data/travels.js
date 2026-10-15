/*
  Sam's Table: Travel data (places only, no dates)
  HOW TO ADD A PLACE:
  1. Copy one line below and paste it anywhere in the list.
  2. Fill in: group (one of the region groups below, or a new one), place, region (state or country), country, lat, lng.
     Get lat/lng in Google Maps: right-click the spot and click the numbers to copy them.
  Groups: "U.S. Southwest", "U.S. Elsewhere", "Alaska", "Canada", "Mexico", "Northern Europe", "Mediterranean"
  The public page shows place names only, so keep personal details out of this file.
*/
const TRIPS = [
 {group:"U.S. Elsewhere",place:"Fort Worth",region:"Texas",country:"USA",lat:32.7555,lng:-97.3308},
 {group:"U.S. Southwest",place:"Grand Canyon",region:"Arizona",country:"USA",lat:36.0544,lng:-112.1401},
 {group:"U.S. Elsewhere",place:"Nashville",region:"Tennessee",country:"USA",lat:36.1627,lng:-86.7816},
 {group:"U.S. Elsewhere",place:"Asheville",region:"North Carolina",country:"USA",lat:35.5951,lng:-82.5515},
 {group:"U.S. Southwest",place:"Las Vegas",region:"Nevada",country:"USA",lat:36.1699,lng:-115.1398},
 {group:"U.S. Southwest",place:"Lake Havasu City",region:"Arizona",country:"USA",lat:34.4839,lng:-114.3225},
 {group:"U.S. Southwest",place:"Valley of Fire",region:"Nevada",country:"USA",lat:36.4300,lng:-114.5130},
 {group:"U.S. Southwest",place:"San Diego",region:"California",country:"USA",lat:32.7157,lng:-117.1611},
 {group:"U.S. Southwest",place:"Imperial Beach",region:"California",country:"USA",lat:32.5839,lng:-117.1131},
 {group:"U.S. Elsewhere",place:"Baltimore",region:"Maryland",country:"USA",lat:39.2904,lng:-76.6122},
 {group:"U.S. Elsewhere",place:"Washington",region:"D.C.",country:"USA",lat:38.9072,lng:-77.0369},
 {group:"Northern Europe",place:"Stockholm",region:"Sweden",country:"Sweden",lat:59.3293,lng:18.0686},
 {group:"Northern Europe",place:"Visby",region:"Sweden",country:"Sweden",lat:57.6348,lng:18.2948},
 {group:"Northern Europe",place:"Helsinki",region:"Finland",country:"Finland",lat:60.1699,lng:24.9384},
 {group:"Northern Europe",place:"Kotka",region:"Finland",country:"Finland",lat:60.4664,lng:26.9458},
 {group:"Northern Europe",place:"Hamina",region:"Finland",country:"Finland",lat:60.5697,lng:27.1981},
 {group:"Northern Europe",place:"Tallinn",region:"Estonia",country:"Estonia",lat:59.4370,lng:24.7536},
 {group:"Northern Europe",place:"Riga",region:"Latvia",country:"Latvia",lat:56.9496,lng:24.1052},
 {group:"Northern Europe",place:"Klaipeda",region:"Lithuania",country:"Lithuania",lat:55.7033,lng:21.1443},
 {group:"Northern Europe",place:"Gdynia",region:"Poland",country:"Poland",lat:54.5189,lng:18.5305},
 {group:"Northern Europe",place:"Copenhagen",region:"Denmark",country:"Denmark",lat:55.6761,lng:12.5683},
 {group:"Northern Europe",place:"Berlin",region:"Germany",country:"Germany",lat:52.5200,lng:13.4050},
 {group:"Northern Europe",place:"Hamburg",region:"Germany",country:"Germany",lat:53.5511,lng:9.9937},
 {group:"Mediterranean",place:"Zadar & Nadin",region:"Croatia",country:"Croatia",lat:44.1194,lng:15.2314},
 {group:"Mediterranean",place:"Dubrovnik",region:"Croatia",country:"Croatia",lat:42.6507,lng:18.0944},
 {group:"Mediterranean",place:"Corfu",region:"Greece",country:"Greece",lat:39.6243,lng:19.9217},
 {group:"Mediterranean",place:"Santorini",region:"Greece",country:"Greece",lat:36.3932,lng:25.4615},
 {group:"Mediterranean",place:"Mykonos & Delos",region:"Greece",country:"Greece",lat:37.4467,lng:25.3289},
 {group:"Mediterranean",place:"Istanbul",region:"Turkey",country:"Turkey",lat:41.0082,lng:28.9784},
 {group:"Mediterranean",place:"Trieste",region:"Italy",country:"Italy",lat:45.6495,lng:13.7768},
 {group:"Mediterranean",place:"Athens",region:"Greece",country:"Greece",lat:37.9838,lng:23.7275},
 {group:"Canada",place:"Vancouver",region:"British Columbia",country:"Canada",lat:49.2827,lng:-123.1207},
 {group:"Alaska",place:"Glacier Bay",region:"Alaska",country:"USA",lat:58.6658,lng:-136.9002},
 {group:"Alaska",place:"Anchorage",region:"Alaska",country:"USA",lat:61.2181,lng:-149.9003},
 {group:"U.S. Elsewhere",place:"Atlanta",region:"Georgia",country:"USA",lat:33.7490,lng:-84.3880},
 {group:"Mexico",place:"Cabo San Lucas",region:"Baja California Sur",country:"Mexico",lat:22.8905,lng:-109.9167},
 {group:"Mexico",place:"Ensenada",region:"Baja California",country:"Mexico",lat:31.8667,lng:-116.5964},
 {group:"U.S. Southwest",place:"Daggett",region:"California",country:"USA",lat:34.8633,lng:-116.8875},
 {group:"U.S. Southwest",place:"Dolan Springs",region:"Arizona",country:"USA",lat:35.5911,lng:-114.2722},
 {group:"U.S. Elsewhere",place:"Seattle",region:"Washington",country:"USA",lat:47.6062,lng:-122.3321},
 {group:"Alaska",place:"Hubbard Glacier",region:"Alaska",country:"USA",lat:60.0167,lng:-139.4833},
 {group:"Canada",place:"Victoria",region:"British Columbia",country:"Canada",lat:48.4284,lng:-123.3656},
 {group:"U.S. Southwest",place:"Mesquite",region:"Nevada",country:"USA",lat:36.8055,lng:-114.0672},
 {group:"U.S. Elsewhere",place:"Hanover (Utz factory)",region:"Pennsylvania",country:"USA",lat:39.8007,lng:-76.9830},
 {group:"Alaska",place:"Sitka",region:"Alaska",country:"USA",lat:57.0531,lng:-135.3300},
 {group:"Alaska",place:"Haines",region:"Alaska",country:"USA",lat:59.2358,lng:-135.4453},
 {group:"Alaska",place:"Skagway",region:"Alaska",country:"USA",lat:59.4583,lng:-135.3139},
 {group:"Alaska",place:"Juneau",region:"Alaska",country:"USA",lat:58.3019,lng:-134.4197},
 {group:"U.S. Southwest",place:"Parowan",region:"Utah",country:"USA",lat:37.8422,lng:-112.8277},
 {group:"U.S. Southwest",place:"Cedar City",region:"Utah",country:"USA",lat:37.6775,lng:-113.0619},
 {group:"U.S. Southwest",place:"Brian Head",region:"Utah",country:"USA",lat:37.6922,lng:-112.8496},
 {group:"U.S. Elsewhere",place:"Corpus Christi",region:"Texas",country:"USA",lat:27.8006,lng:-97.3964},
 {group:"U.S. Southwest",place:"Hurricane",region:"Utah",country:"USA",lat:37.1753,lng:-113.2899},
 {group:"U.S. Southwest",place:"St. George",region:"Utah",country:"USA",lat:37.0965,lng:-113.5684},
 {group:"U.S. Southwest",place:"Cedar Breaks",region:"Utah",country:"USA",lat:37.6214,lng:-112.8378},
 {group:"U.S. Southwest",place:"Bryce Canyon",region:"Utah",country:"USA",lat:37.5930,lng:-112.1871},
 {group:"U.S. Southwest",place:"Colorado City",region:"Arizona",country:"USA",lat:36.9903,lng:-112.9758},
 {group:"U.S. Elsewhere",place:"Tampa",region:"Florida",country:"USA",lat:27.9506,lng:-82.4572},
 {group:"U.S. Elsewhere",place:"Crystal River",region:"Florida",country:"USA",lat:28.9025,lng:-82.5926},
 {group:"Alaska",place:"Revillagigedo Island (Ketchikan)",region:"Alaska",country:"USA",lat:55.3422,lng:-131.6461}
];

/* Photos linked to places (optional). Key = place name above, value = list of image paths. */
const TRAVEL_PHOTOS = {
 "Cabo San Lucas": [
  "images/t-mexico.webp"
 ],
 "Gdynia": [
  "images/t-gdansk.webp"
 ],
 "Valley of Fire": [
  "images/t-valley-of-fire.webp",
  "images/t-valley-of-fire-2.webp"
 ],
 "Tallinn": [
  "images/t-tallinn.webp"
 ],
 "Riga": [
  "images/t-riga.webp"
 ],
 "Revillagigedo Island (Ketchikan)": [
  "images/t-alaska-river.webp"
 ],
 "Hubbard Glacier": [
  "images/t-alaska-glacier.webp"
 ],
 "Dubrovnik": [
  "images/t-croatia.webp"
 ],
 "Kotka": [
  "images/t-kotka.webp"
 ]
};
/* Captions for photos whose exact stop is known only roughly */
const PHOTO_NOTES = {"Gdynia":"Gdańsk, near the Gdynia port stop"};
