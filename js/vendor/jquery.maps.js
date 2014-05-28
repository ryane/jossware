// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

// The latitude and longitude to center the map (always required)
var myLatlng = new google.maps.LatLng(40.6927206,-73.981238); // Brooklyn

function init() {

    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {

        // How zoomed in you want the map to start at (always required)
        zoom: 15,
        center: myLatlng,

        // How you would like to style the map.
        styles: [
            {
                stylers:[
                    {"hue": "#b8d30a"}
                ]
            },
            {
                featureType:"road",
                elementType:"labels",
                stylers:[
                    {"visibility": "on"}
                ]
            },
             {
                featureType:"road",
                elementType:"geometry",
                stylers:[
                    {"lightness": 0},
                    {"saturation": -55},
                    {"visibility": "on"}
                ]
            },
            {
                featureType:"water",
                elementType:"labels",
                stylers:[
                    {"visibility": "on"}
                ]
            },
            {
                featureType:"water",
                stylers:[
                    {"lightness": 0},
                    {"saturation": -70},
                    {"visibility": "on"}
                ]
            }
        ]
    };

// Get the HTML DOM element that will contain your map
// Using a div with id="map" seen below in the <body>
var mapElement = document.getElementById('map');

// Create the Google Map using out element and options defined above
var map = new google.maps.Map(mapElement, mapOptions);

// Create the Google Map marker
var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: 'http://s22.postimg.org/9aopl7pl9/marker.png'});
}
