// Adding tile layer to maps
var tileLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
})

// Initialize all of the LayerGroups we'll be using
var layers = {
  White: new L.LayerGroup(),
  Black: new L.LayerGroup(),
  Asian: new L.LayerGroup(),
  Hispanic: new L.LayerGroup()
};

//Create Map
var myMap = L.map('map1', {
  center: [39.83, -98.58],
  zoom: 4,
  layers: [
    layers.White,
    layers.Black,
    layers.Asian,
    layers.Hispanic
  ]
});

tileLayer.addTo(myMap)

// Create an overlays object to add to the layer control
var overlays = {
  "White": layers.White,
  "Black": layers.Black,
  "Asian": layers.Asian,
  "Hispanic": layers.Hispanic
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(myMap);

var icons = {
  White: L.icon({
    iconUrl:'static/Images/trump.png',
    iconSize: [40,40]
  }),
  Black: L.icon({
    iconUrl:'static/Images/dave.png',
    iconSize: [80,80]
  }),
  Asian: L.icon({
    iconUrl:'static/Images/jackie.png',
    iconSize: [100,100]
  }),
  Hispanic: L.icon({
    iconUrl:'static/Images/j_lo.png',
    iconSize: [110,60]
  })
}

//Function that adds markers to layer
function createMarkers(layerGroup, raceIcon) {
  for (var i=0;i<myResults.length;i++){
    var location = myResults[i];
    var lat=location.latitude;
    var long=location.longitude;
    var state=location.state;
    var race= location.race;
    var markers = L.marker([lat,long],{icon:raceIcon})
    markers.addTo(layers[layerGroup])

    markers.bindPopup(`<h1>State=${state}</h1>`+
    `<h2>Race=${race}</h2>`)
  }
}

// Function that loads data from flask for each race
var races = ['White', 'Black', 'Hispanic', 'Asian']
races.forEach(race => {
  d3.json(`/2015killings/${race}`, data => {
    myResults = data.results 
    var layerGroup;
    var raceIcon;
    if(race === 'White') {
      layerGroup = 'White';
      raceIcon = icons.White;
      createMarkers(layerGroup, raceIcon)
    }
    else if(race === 'Black') {
      layerGroup = 'Black';
      raceIcon = icons.Black;
      createMarkers(layerGroup, raceIcon)
    }
    else if(race === 'Asian') {
      layerGroup = 'Asian';
      raceIcon = icons.Asian;
      createMarkers(layerGroup, raceIcon)
    }
    else {
      layerGroup = 'Hispanic';
      raceIcon = icons.Hispanic;
      createMarkers(layerGroup, raceIcon)
    }
  })
});