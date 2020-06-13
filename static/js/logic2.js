function makeMyMap(idCSS) {
  var myMap = L.map(idCSS, {
    center: [39.83, -98.58],
    zoom: 4
  });
  return myMap
}

// Create map
var myMap2 = makeMyMap("map2");

// Adding tile layer to maps
var tileLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
})

tileLayer.addTo(myMap2)

// Function that loads data from flask for each race
var races = ['White', 'Black', 'Hispanic', 'Asian',]
races.forEach(race => {
  d3.json(`/killings/${race}`, data => {
    myResults = data.results 

    for (var i=0;i<myResults.length;i++){
      var location = myResults[i];
      var lat=location.latitude;
      var long=location.longitude;
      L.marker([lat,long]).addTo(myMap2)
      }
  })
});