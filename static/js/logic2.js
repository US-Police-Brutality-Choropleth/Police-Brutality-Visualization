// Create two maps
var myMap1 = L.map("map1", {
  center: [39.83, -98.58],
  zoom: 4
});

var myMap2 = L.map("map2", {
  center: [39.83, -98.58],
  zoom: 13
});

// Adding tile layer to maps
var tileLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
})

tileLayer.addTo(myMap1)
tileLayer.addTo(myMap2)

// Grab stateCodes from GeoJson file
var geoData = 'static/data/gz_2010_us_040_00_500k.json'
var stateCodes = []
d3.json(geoData, data => {
  // Add stateCodes from GeoJson data
  data.features.forEach(feature => {
    stateCodes.push(parseInt(feature.properties.STATE))
  })
})

// Function that loads data from flask for each race
var races = ['White', 'Black', 'Hispanic', 'Asian',]
var stateCodesAndKillings = {'White': [],'Black': [], 'Hispanic': [], 'Asian': []}
races.forEach(race => {
  d3.json(`/killings/${race}`, data => {
    for (var i=0;i<data.length;i++){
        var location =data(i).results;
        var lat=location.latitude;
        var long=location.longitude;
        L.marker([lat,long]).addTo(myMap2)
    }

})
//       stateCodesAndKillings[race].push(stateCodeKillings)
//     })
//   })
// })
  
// d3.json(geoData, data => {
//   // Inject number of killings for each state as a key under features.properties in the GeoJson file
//   data.features.forEach(feature => {
//     for (i = 0; i < stateCodesAndKillings.Black.length; i++) {
//       data.features[i].properties.killings = stateCodesAndKillings.Black[i]
//       }
//     })
//   console.log(data.features[0])

//   // Add outline of states from GeoJson data
//   geojson = L.choropleth(data, {

//     // Define what  property in the features to use
//     valueProperty: "killings",

//     // Set color scale
//     scale: ["#ffffb2", "#b10026"],

//     // Number of breaks in step range
//     steps: 5,

//     // q for quartile, e for equidistant, k for k-means
//     mode: "q",
//     style: {
//       // Border color
//       color: "#fff",
//       weight: 1,
//       fillOpacity: 0.8
//     },

//     // Binding a pop-up to each layer
//     onEachFeature: function (feature, layer) {
//       layer.bindPopup(`<h1>${feature.properties.NAME}</h1>` + `<br><h6>Number Of Killings:${feature.properties.killings}</h6>`);
//     }
//   }).addTo(myMap2);
// })

// Grab data with d3
// d3.json(geoData, function(data) {

//   // Create a new choropleth layer
  // geojson = L.choropleth(data, {

  //   // Define what  property in the features to use
  //   valueProperty: "MHI2016",

  //   // Set color scale
  //   scale: ["#ffffb2", "#b10026"],

  //   // Number of breaks in step range
  //   steps: 10,

  //   // q for quartile, e for equidistant, k for k-means
  //   mode: "q",
  //   style: {
  //     // Border color
  //     color: "#fff",
  //     weight: 1,
  //     fillOpacity: 0.8
  //   },

  //   // Binding a pop-up to each layer
  //   onEachFeature: function(feature, layer) {
  //     layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Median Household Income:<br>" +
  //       "$" + feature.properties.MHI2016);
  //   }
  // }).addTo(myMap);

//   // Set up the legend
//   var legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend");
//     var limits = geojson.options.limits;
//     var colors = geojson.options.colors;
//     var labels = [];

//     // Add min & max
//     var legendInfo = "<h1>Median Income</h1>" +
//       "<div class=\"labels\">" +
//         "<div class=\"min\">" + limits[0] + "</div>" +
//         "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//       "</div>";

//     div.innerHTML = legendInfo;

//     limits.forEach(function(limit, index) {
//       labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
//   };

//   // Adding legend to the map
//   legend.addTo(myMap);

// });

