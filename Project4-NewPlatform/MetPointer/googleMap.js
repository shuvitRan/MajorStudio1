var map;

var mykey = config.MY_KEY;
// console.log(mykey)


let geoCoding = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY"

  function haversine_distance(mk1, mk2) {
      // var R = 3958.8; // Radius of the Earth in miles
      var R = 6371.0710;
      var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
      var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
      var difflat = rlat2-rlat1; // Radian difference (latitudes)
      var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      return d;
    }






function fetchMuseumData(){




}

// fetchGeoLocation();

function fetchGeoLocation(){
  let location = "United Kingdom";
  console.log(encodeURI(location));
  let myGeoUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="+encodeURI(location)+"&key="+mykey;
   fetch(myGeoUrl)
    .then(data=>data.json())
    .then(data=>{
      console.log(data.results[0].geometry.location.lat);
      let destLat = data.results[0].geometry.location.lat;
      let destLng = data.results[0].geometry.location.lng;

      // console.log(data.geometry.location.lat +","+ data.geometry.location.lng);
      initMap(destLat,destLng);
   })



}


function initMap(Lat,Lng) {

  // The map, centered on Central Park
  const center = {lat: 40.7795212, lng: -73.9635027};
  const options = {zoom: 17, scaleControl: true, center: center};
  map = new google.maps.Map(
      document.getElementById('map'), options);
  // Locations of landmarks
  const metGeo = {lat: 40.7795212, lng: -73.9635027};
    // const dakota ="Hong Kong";
  const destination = {lat: Lat, lng: Lng};
  // The markers for The Dakota and The Frick Collection
  var mk1 = new google.maps.Marker({position: metGeo, map: map});
  var mk2 = new google.maps.Marker({position: destination, map: map});

  // Calculate and display the distance between markers
    var distance = haversine_distance(mk1, mk2);
    document.getElementById('msg').innerHTML = "Distance between Met and this Art work's culture of origin: " + distance.toFixed(2) + " km.";
    // Draw a line showing the straight distance between the markers
      var line = new google.maps.Polyline({path: [metGeo, destination], map: map});
}




// loadMapScript();
function loadMapScript(){

  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.async= true;
  script.defer= true;
  script.src="https://maps.googleapis.com/maps/api/js?key="+mykey+"&callback=fetchGeoLocation";
  document.body.appendChild(script);

}
window.onload = loadMapScript;
