pointValue = jQuery('#pointValue').val();
pointLat = jQuery('#pointLat').val();
pointLong = jQuery('#pointLong').val();
window.infowindow = new google.maps.InfoWindow({});
window.infomarker = new google.maps.Marker({
		position: new google.maps.LatLng(pointLat,pointLong),
		map: map,
		draggable:true
});

update_infomarker_beforeValue(pointLat,pointLong);

window.infomarker.setMap(null); //removes the infomarker

google.maps.event.addListener(window.infomarker, 'dragend', function(event){
    var pointLat= event.latLng.lat().toFixed(4);
    var pointLong = event.latLng.lng().toFixed(4);
    jQuery('#pointLat').val(pointLat);
    jQuery('#pointLong').val(pointLong);
    update_infomarker_beforeValue(pointLat,pointLong);
    jQuery('#pointValue').val('');
});

google.maps.event.addListener(window.infowindow,'domready',function(){
    $('#pointLatInfo,#pointLongInfo').on('mouseout blur autocompletefocus', function(){
        if( $(this).val() ) {
            pointLat = $('#pointLatInfo').val();
            pointLong = $('#pointLongInfo').val();
            $('#pointLat').val(pointLat);
            $('#pointLong').val(pointLong);
            jQuery('#pointValue').val('');
            if(window.infomarker){
                window.infomarker.setPosition(new google.maps.LatLng(parseFloat(pointLat),parseFloat(pointLong)));
                update_infomarker_beforeValue(pointLat,pointLong);
            }
         }
    });

 });

toolAction = $('#toolAction').val();
if(toolAction=='showSingleValueOnMap'){
	pointValue = jQuery('#pointValue').val();
	pointLat = jQuery('#pointLat').val();
	pointLong = jQuery('#pointLong').val();
	units=jQuery('#varUnits').val();
	update_infomarker_afterValue(pointLat,pointLong,pointValue,units);
};

