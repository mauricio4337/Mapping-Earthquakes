// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// setView --> Center:[lat,lng], zoomLevel
//let map = L.map('mapid').setView([30, 30], 2);

// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport).addTo(map);

// Grabbing our GeoJSON data.
// L.geoJson(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.name + " ("+feature.properties.faa+")</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country+"</h3>");
//   }

// }).addTo(map);


// L.geoJson(sanFranAirport, {
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h2>" + feature.properties.name + " ("+feature.properties.faa+")</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country+"</h3>");
//    }
// }).addTo(map);

// //  Add a marker to the map for Los Angeles, California.
// // [lat, lng]
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// Add a circle whose radius is given meters.  Circle size
// scales with the map scale
// L.circle([34.0522, -118.2437], {
//     radius: 1000,
//     color: 'red'
//  }).addTo(map);

// Add a circle whose radius is in pixels.  Circle size stays fixed
// as map scale changes
// L.circleMarker([34.0522, -118.2437], {
//     radius: 100,
//     color: 'red',
//     fillColor: 'blue'
// }).addTo(map);

// Coordinates for each point to be used in the line.
// Coordinates for each point to be used in the polyline.

// // Get data from cities.js
// let cityData = cities;

//   // Loop through the cities array and create one marker for each city.
//   // Add pop up marker for city with bindPopup() method
// cityData.forEach(function(city) {
//     console.log(city)
//     L.circleMarker(city.location,{
//         radius: city.population/200000,
//         color: "yellow",
//         weight: 2
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(map);
//    });


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Light: light
};


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [44, -80],
	zoom: 2,
	layers: [light]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// //Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/mauricio4337/Mapping-Earthquakes/master/majorAirports.json";
// //Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

//Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/mauricio4337/Mapping-Earthquakes/master/torontoRoutes.json";
streets.addTo(map);

// // Grabbing our GeoJSON data.
// d3.json(airportData).then(function(data) {
//   console.log(data);
// // Creating a GeoJSON layer with the retrieved data.
// L.geoJson(data).addTo(map);
// });


// d3.json(airportData).then(function(data) {

// L.geoJson(data, {
//   onEachFeature: function(feature, layer) {
//     console.log(feature);
//     layer.bindPopup("<h2>" + feature.properties.name + " ("+feature.properties.faa+")</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country+"</h3>");
//    }
// }).addTo(map);
// });

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data,{
  color: 'yellow',
  weight: 1,
  onEachFeature: function(feature, layer) {
         layer.bindPopup("<h3>" + feature.properties.airline + "</h3><hr><h3> Destination: " + feature.properties.dst +"</h3>");
        }
}).addTo(map);
});