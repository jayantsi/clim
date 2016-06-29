/*********************************
*      RECTANGLE                    *
*********************************/
function showNewRect(event) {
    var ne = window.rectangle.getBounds().getNorthEast();
    var sw = window.rectangle.getBounds().getSouthWest();
    document.getElementById('NELat').value = ne.lat().toFixed(4);
    document.getElementById('NELong').value = ne.lng().toFixed(4);
    document.getElementById('SWLat').value = sw.lat().toFixed(4);
    document.getElementById('SWLong').value = sw.lng().toFixed(4);
}
var SWLat = $('#SWLat').val();
var SWLong = $('#SWLong').val();
var NELat = $('#NELat').val();
var NELong = $('#NELong').val();
bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(SWLat,SWLong),  //SW corner
      new google.maps.LatLng(NELat,NELong)    //NE corner
);
    // Define the rectangle and set its editable property to true.
    window.rectangle = new google.maps.Rectangle({
    bounds: bounds,
    editable: true,
    draggable: true,
  });

  // Add an event listener on the rectangle.
  google.maps.event.addListener(window.rectangle, 'bounds_changed', showNewRect);

  var toolAction = $('#toolAction').val();
  if(toolAction == 'downloadRectangleSubset'){
	window.rectangle.setMap(window.map);
   }else{
	window.rectangle.setMap(null);
  };

