/* Map of GeoJSON data from map.geojson */

//function to instantiate the Leaflet map
function createMap(){
    //create the map with center of 44, -115 and zoom of 3
    var map = L.map('map', {
        center: [44, -115],
        zoom: 3
    });

    //add tilelater.  openestreet map is used
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        //adds the basemap to the map
    }).addTo(map);

    //call getData function to get the data within the geojson
    getData(map);
};

//function for each feature to appear in a popup when the marker is cliked
function onEachFeature(feature, layer) {
    //no property named popupContent; instead, create html string with all properties
    var popupContent = "";
    //if there are poperties in the feature create a paragraph with the name and it's properties/attribures
    if (feature.properties) {
        //loop to add feature property names and values to html string
        for (var property in feature.properties){
          //combining the feature and it's properties
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
        }
        layer.bindPopup(popupContent);
    };
};

//function to retrieve the data and place it on the map
function getData(map){
    //load the data folder
    $.ajax("data/gas.geojson", {
      //the datetype of the file is geojson
        dataType: "json",
        //if the file opens correctly, function response is executed
        success: function(response){

            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response, {
                onEachFeature: onEachFeature
            }).addTo(map);
        }
    });
};
//when the map is ready, it's created and added to the webpage
$(document).ready(createMap);
