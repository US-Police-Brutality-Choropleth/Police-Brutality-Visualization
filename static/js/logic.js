function makeMyMap(idCSS) {
  var myMap = L.map(idCSS, {
    center: [39.83, -98.58],
    zoom: 4
  });
  return myMap
}

// Create map
var myMap1 = makeMyMap("map1");


// Adding tile layer to maps
var tileLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
})

tileLayer.addTo(myMap1)

// Grab stateCodes from GeoJson file
var geoData = 'static/data/gz_2010_us_040_00_500k.json';

d3.json(geoData, data => {
  var stateCodes = []
  data.features.forEach(feature => {
    stateCodes.push(parseInt(feature.properties.STATE))
  })
  // Function that loads data from flask for each race
  var races = ['White', 'Black', 'Hispanic', 'Asian',]
  var stateCodesAndKillings = {'White': [],'Black': [], 'Hispanic': [], 'Asian': []}
  races.forEach(race => {
    d3.json(`/killings/${race}`, raceData => {
      stateCodes.forEach(stateCode => {
        var stateCodeKillings = 0
        raceData.results.forEach(killing => {
          if(killing.State_Code === stateCode) {
            stateCodeKillings += 1
          }
        })
        stateCodesAndKillings[race].push(stateCodeKillings)
      })
  // Inject number of killings for each state as a key under features.properties in the GeoJson file
  data.features.forEach(feature => {
    for (i = 0; i < stateCodesAndKillings.Black.length; i++) {
      data.features[i].properties.killings = stateCodesAndKillings.Black[i]
      }
    })
  console.log(data.features[0])

  // Add outline of states from GeoJson data
  geojson = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "killings",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 5,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`<h1>${feature.properties.NAME}</h1>` + `<br><h6>Number Of Killings:${feature.properties.killings}</h6>`);
      }
    }).addTo(myMap1);
    })
  })
})


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
// reset the HTML
//d3.select("#map1").html("");