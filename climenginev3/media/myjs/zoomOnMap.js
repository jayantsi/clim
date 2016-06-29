

 $(function() {
        $('#geocoder-search-box').click(function(e){
                e.preventDefault();
        });

});
<!------------------------------------>
<!-- Script for zooming to state level-->
<!-- from view-source:http://geocodezip.com/v3_zoom2stateselectlist.html -->
<!------------------------------------>
var geocoder = null;
function findAddress(address) {
  var addressStr=document.getElementById("state").value;
  if (!address && (addressStr != ''))
     address = "State of "+addressStr;
  else
     address = addressStr;
  if ((address != '') && geocoder) {
   geocoder.geocode( { 'address': address}, function(results, status) {
   if (status == google.maps.GeocoderStatus.OK) {
     if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
       if (results && results[0]
	   && results[0].geometry && results[0].geometry.viewport)
	 map.fitBounds(results[0].geometry.viewport);
     } else {
       alert("No results found");
     }
   } else {
    alert("Geocode was not successful for the following reason: " + status);
   }
   });
  }
}



function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      //map.setZoom('7');

      //alert(results[0].geometry.location);
      //var marker = new google.maps.Marker({
      //    map: map,
      //    position: results[0].geometry.location
      //});

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}




