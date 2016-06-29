var markers=[];

function initialize_pointDisplay(){
                var bounds = new google.maps.LatLngBounds();
                var timeSeriesGraphData = "{{ timeSeriesGraphData }}";
                var toolAction = document.getElementById('toolAction').value;
                var marker_img;
                var latlong, point_id, LongLat, Long, Lat;
                $('.pointCheck').each(function() {
                    point_id = parseInt($(this).val());
                    LongLat = String($('#p' + String(point_id)).val()).replace(' ','');
                    Long = parseFloat(LongLat.split(',')[0]);
                    Lat = parseFloat(LongLat.split(',')[1]);
                    latlong = new google.maps.LatLng(Lat,Long);
                    marker_img = document.getElementById('img' + String(point_id)).src;

                    var marker = new google.maps.Marker({
                        map: map,
                        position: latlong,
                        title:String(point_id),
                        draggable:true,
                        visible:false,
                        icon: marker_img
                    });
                         //Assign point_id to marker for tracking
                    marker.id = point_id;
                    google.maps.event.addListener(marker, 'click', function() {
                            //Uncheck checkbox
                            var m_id = marker.id;
                            $('#check' + String(m_id)).attr('checked',false);
                            //Hide marker
                            marker.setVisible(false);
                    });
                    google.maps.event.addListener(marker, 'dragend', function (event) {
                            var point_id = marker.id;
                            //Set new lat,lon
                            var new_lat = event.latLng.lat().toFixed(4);
                            var new_long = event.latLng.lng().toFixed(4);
                            //Update value in form
                            $('#p' + String(point_id)).val(new_long + ',' + new_lat);
			   //Update marker position
			    marker.position = new google.maps.LatLng(new_lat,new_long);
                    });
                    markers.push(marker);

            });
                window.markers = markers;
}

function initialize_ftDisplay(){
    if ($('#subDomainTypeTS').val() != 'points'){
	 //Disable drawing manager on map (will get added if there are any checked polygons)
        if (window.drawingManager){
            window.drawingManager.setOptions({
                drawingControl: false
            });
        };
        $('.ftCheck').each(function() {
            var ft_id = parseInt($(this).val());
            var display = $('#ft' + String(ft_id) + 'display').val();
            var checked = $('#ft' + String(ft_id) + 'check').val();
            var table_name = $('#SubChoice'+String(ft_id)).val();
            var table_id = $('#ft' + String(ft_id)).val();
            if (display != 'none' && checked !=''){
                if ($('#ftChoice'+String(ft_id)).val() == 'polygon'){
                    addPolygonToMap(ft_id);
		    //add drawing manager to map
		    if (window.drawingManager){
			    window.drawingManager.setOptions({
				drawingControl: true
			    });
		    }
                }
                else{
                    createAndPutFusionTableOnMap(ft_id,window.map,table_id,table_name);
                   
                }
            }
        });
    }
}


/*need to check for the choice=polygon AND that it was checked on form submit... */
                ftChoice1 = $('#ftChoice1').val();
                if(ftChoice1 == "polygon"){
                        $('#polygon-panel').css('display','block');
                }else{
                        $('#polygon-panel').css('display','none');
                }


function putMarkersOnMap(){
		$('.pointCheck[type=checkbox]').each(function() {
                     point_id = $(this).val();

		     markers[point_id-1].setVisible(false);
		    if (String(point_id) == '1'){
			markers[point_id-1].setVisible(true);
		    }else if( $('#point' + String(point_id)).css('display') == 'block' &&
			$('#p' + String(point_id) + 'check').val('checked')){
				markers[point_id-1].setVisible(true);
		    }
                });
}
function updatePointInfoOnForm(){
		 jQuery('.points').show();
		$('.pointCheck[type=checkbox]').each(function() {
                     	  point_id = $(this).val();
			  for (var m_idx=0;m_idx<window.markers.length;m_idx++){
			      jQuery('.point'+String(m_idx)).show();
			      pointString='#point'+String(m_idx);
			      if ($(pointString).is(':checked') && $(pointString).css('display') == 'block') {
				      window.markers[m_idx].setVisible(true);
			      }
			  }

                });
}
function removePointsFromMap(){
	for (var m_idx=0;m_idx<window.markers.length;m_idx++){
                        window.markers[m_idx].setVisible(false);
                }
	
};
function putShapesOnMap(){
	jQuery('.customShapes').show();
	$('.ftCheck').each(function() {
                ft_id = parseInt($(this).val());
                if ($(this).is(':checked') && $('#fusiontable' + String(ft_id)).css('display') == 'block') {
                    table_name= $('#ftSubChoice' + String(ft_id)).val();
                    table_id = $('#ft' + String(ft_id)).val();
                    if (table_id != '' && $('#ftChoice'+String(ft_id)).val() != 'polygon'){
                        createAndPutFusionTableOnMap (ft_id,window.map,table_id,table_name);
                    }
                    else{
                        showPolygonOnMap(ft_id);    
                    }
                }
            });

}
function removeShapesFromMap(){

 	   jQuery('.customShapes').hide();
           //Hide fusion tables from map and show markers
           for (var f_idx=0;f_idx<window.fusion_tables.length;f_idx++){
                        try{
                            removeFusionTableFromMap(f_idx + 1);
                            
                        }
                        catch(e){}
            }
            //Hide polygons from map
            if(window.polygons){
		    for (var f_idx=0;f_idx<window.polygons.length;f_idx++){
				try{
				    hidePolygonFromMap(f_idx + 1);
				}
				catch(e){}
		    } 
	};

}

   jQuery('#subDomainTypeTS').on('change', function(){
	    var subDomainTypeTS=jQuery(this).val();
	    if(subDomainTypeTS=='points'){
		    updatePointInfoOnForm();
		    putMarkersOnMap();	
		    removeShapesFromMap();

        }
        else if(subDomainTypeTS=='customShapes'){
		    $('.nav-tabs a[href="#taboutmap"]').tab('show');
		    jQuery('.points').hide();
		    removePointsFromMap();
            putShapesOnMap();
            if ($('#ftChoice').val()!= 'polygon'){
		        //reloadFusionTableFeatures(1);
		        removeFusionTableFromMap('1');
		        createAndPutFusionTableOnMap ('1',window.map,$('#ft1').val(),'');
            }

        }
        //Fewsnet
        else if(subDomainTypeTS=='None'){
            removeShapesFromMap();
            removePointsFromMap();
        }
});

