/*--------------------------------------------*/
/*      MAP CENTER LONG LAT UPDATE           */
/*--------------------------------------------*/
jQuery('#mapCenterLongLat').keyup( function(){
    var mapCenterLongLat = $(this).val();
    var mapCenterLong = parseFloat(mapCenterLongLat.split(',')[0]).toFixed(4);
    var mapCenterLat = parseFloat(mapCenterLongLat.split(',')[1]).toFixed(4);
    window.map.setCenter(new google.maps.LatLng(mapCenterLat,mapCenterLong));
	$('#pointLat').val(mapCenterLat);
	$('#pointLong').val(mapCenterLong);
});

/*--------------------------------------------*/
/*         LAYERS LISTENER                    */
/*--------------------------------------------*/
// this is now application specific i the CLIMATENEINGINE_EXPERT/scripts/formListener_maplayers.js 
/*
jQuery('.layer').on('change','input[type=checkbox]', function(){
    set_theMapLayer();
    set_mapLayers();
});


jQuery('#kmlurl, #kmlurl2').on('change paste keyup autocompletefocus', function(){
    set_mapLayers();
});
  */
