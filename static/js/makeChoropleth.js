function makeMyMap(idCSS) {
  var myMap = L.map(idCSS, {
    center: [39.83, -98.58],
    zoom: 4
  });
  return myMap
}

// Create map
var myMap1 = makeMyMap("map1");

var geoData = 'static/data/gz_2010_us_040_00_500k.json';


// function to add tile layer to maps
function createTile(map) {
  var tileLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  })

  tileLayer.addTo(map)
}

// Function to loop through GeoJson and grab state full names and push values to list
function getStateNames(data) {
  var stateNames = []
    data.features.forEach(feature => {
      stateNames.push(feature.properties.NAME)
    })
    
  return stateNames
}

// Function which will make choropleth map
function createChoropleth(race) {

  d3.json(geoData, data => {
    //Clear current map html
    d3.select('map1').html('')
    //Add tile layer to empty map
    createTile(myMap1)
    //Get StateCodes from GeoJson and save to variable
    var stateNames = getStateNames(data)
    //Create empty list which will store the number of killings for each state
    var stateNamesAndKillings = []
    
    //Call flask endpoint of specific race to get data
    d3.json(`/AllKillings/${race}`, raceData => {
      //Loop over GeoJson state codes and count the number of killings for each state and push to list 'stateNamesAndKillings'
      stateNames.forEach(stateName => {
        var stateNameAndKillings = 0
        raceData.results.forEach(killing => {
          if(killing.full_state === stateName) {
            stateNameAndKillings += 1
          }
        })
        stateNamesAndKillings.push(stateNameAndKillings)
      })
    // Inject number of killings for each state as a key under features.properties in the GeoJson data
    data.features.forEach(feature => {
      for (i = 0; i < stateNamesAndKillings.length; i++) {
        data.features[i].properties.killings = stateNamesAndKillings[i]
        }
      })

    // Add outline of states from GeoJson data
    geojson = L.choropleth(data, {

      // Define what  property in the features to use
      valueProperty: "killings",

      // Set color scale
      scale: ["#F6803B","#733E1F"],

      // Number of breaks in step range
      steps: 10,

      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1.5,
        fillOpacity: 0.7
      },

      // Binding a pop-up to each layer
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`<h1>${feature.properties.NAME}</h1>` + `<br><h6>Number Of Killings:${feature.properties.killings}</h6>`);
        }
      }).addTo(myMap1);
    })   
  })
}

createChoropleth('Black')