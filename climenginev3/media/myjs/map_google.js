    


/*******************
	MAP ZOOM and CENTER     
    ******************/
    var map=null;
        var myZoom = parseInt($('#mapzoom').val());
	var mapCenterLongLat = $("#mapCenterLongLat").val();
	var mapCenterLat = parseFloat(mapCenterLongLat.split(',')[1]).toFixed(4);
	var mapCenterLong = parseFloat(mapCenterLongLat.split(',')[0]).toFixed(4);
	var myCenter = new google.maps.LatLng(mapCenterLat, mapCenterLong);

    /******************  
	SET BASE MAP  
    ******************/
	var basemap = getBaseMap();

    /******************  
    MAP OPTION  
    ******************/

	var mapOptions = {
		  center: myCenter,
		  zoom: myZoom,
		  maxZoom: 20,
		  streetViewControl: false,
		  mapTypeControl: true,
		  mapTypeControl: true,
		  navigationControl: true,
		  mapTypeId: basemap,
		  mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			position: google.maps.ControlPosition.TOP_RIGHT,
			mapTypeIds:[
				google.maps.MapTypeId.HYBRID,
				google.maps.MapTypeId.ROADMAP,
				google.maps.MapTypeId.SATELLITE,
				google.maps.MapTypeId.TERRAIN,
				'lightPoliticalStyle',
				'darkPoliticalStyle',
				'lightLandmassStyle',
				'simpleAtlasStyle',
				'whiteWaterStyle',
		       ]
		    },
		  clickable:true,
		  backgroundColor: '#FFFFFF',
		  disableDefaultUI: false,
		  zoomControl: true,
			    zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.TOP_RIGHT
			    },
		 panControl: false,
			    panControlOptions: {
				position: google.maps.ControlPosition.TOP_RIGHT
			    },
	};

    /******************  
    CREATE THE MAP  
    ******************/
	map = new google.maps.Map(document.getElementById("map"),mapOptions);
	map.overlayMapTypes.push(null);

    /*********************************
    *     ZOOM/CENTER CHANGED        *
    *********************************/
    google.maps.event.addListener(map,'zoom_changed',function(){
              var sL = jQuery('#shareLink').val();
              update_share_link(sL);
              update_markers_on_map_change();
    });

    google.maps.event.addListener(map,'center_changed',function(){
                var sL = jQuery('#shareLink').val();
                update_share_link(sL);
                update_markers_on_map_change();
    });

    google.maps.event.addListener( map, 'maptypeid_changed', function() { 
	    $('#basemap').val( map.getMapTypeId());
     } );
