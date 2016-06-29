       /*--------------------------------------------*/
        /*         FUSION TABLE LISTENER IN DATA DOWNLOAD     */
        /*--------------------------------------------*/
        jQuery('#fusiontabledownload,#fusiontabledownloadname').on('change paste keyup autocompletefocus', function(){
               if($('input[id=showFusionTable]:checked').val()=="showFusionTable"){
                        document.getElementById('toolAction').value='downloadFusionTableSubset';
                        fusiontablenumber=$('#fusiontabledownload').val();
                        fusiontablename=$('#fusiontabledownloadname').val();
                }
        });
	/*--------------------------------------------*/
	/*       POINT MARKER FOR POINT VALUE LISTENER (GET VALUE ON MAP)    */
	/*--------------------------------------------*/
	jQuery('#pointLat,#pointLong').on('change paste keyup autocompletefocus', function(){
		  pointLat = $('#pointLat').val();
		  pointLong = $('#pointLong').val();
		  jQuery('#pointValue').val('');
		  if(window.infomarker){
			  window.infomarker.setPosition(new google.maps.LatLng(pointLat,pointLong));
			  update_infomarker_beforeValue(pointLat,pointLong);
		 }
	});
        /*--------------------------------------------*/
        /*         GET DATA AT POINT FOR SHOWING ON MAP*/
        /*--------------------------------------------*/
        jQuery('.getDataAtPoint').on('change','input[type=checkbox]', function(){
                if($('input[id=showValue]:checked').val()=="showValue"){
			$('.seePtValues').show();
                         pointValue = jQuery('#pointValue').val();
                         pointLat = jQuery('#pointLat').val();
                         pointLong = jQuery('#pointLong').val();
                         units = jQuery('#varUnits').val();
                         if(pointValue==''){
                                update_infomarker_beforeValue(pointLat,pointLong);
                         }else{
                                update_infomarker_afterValue(pointLat,pointLong,pointValue,units);
                         }
                }else{
			$('.seePtValues').hide();
                        if(window.infomarker){
                        window.infomarker.setMap(null); //removes the infomarker
                        }
                }
        });
	 /*--------------------------------------------*/
        /*         PUT NEW RECTANGLE ON MAP                */
        /*--------------------------------------------*/
	 function putNewRectangleOnMap(pointerRectangle,pointerMap) {
	   		//Set rectangle at the right size to fit inside google map window
                          mapzoom = jQuery('#mapzoom').val();

                         //rectangle half width..dependent on the zoom level
                         delta = 100.0/Math.pow(2,parseInt(mapzoom));

                         newCenter =pointerMap.getCenter();
                         centerLat = parseFloat(newCenter.lat().toFixed(4));
                         centerLong = parseFloat(newCenter.lng().toFixed(4));

                         sw_lat=centerLat-delta;
                         sw_long=centerLong-delta;
                         ne_lat=centerLat+delta;
                         ne_long=centerLong+delta;

                         jQuery('#NELat').val(ne_lat);
                         jQuery('#NELong').val(ne_long);
                         jQuery('#SWLat').val(sw_lat);
                         jQuery('#SWLong').val(sw_long);
		
	 		putRectangleOnMap(window.rectangle,window.map);
	}

	 function putRectangleOnMap(pointerRectangle,pointerMap) {
		var ne_lat =parseFloat(document.getElementById('NELat').value);
                 var ne_long=parseFloat(document.getElementById('NELong').value);
                 var sw_lat =parseFloat(document.getElementById('SWLat').value);
                 var sw_long=parseFloat(document.getElementById('SWLong').value);
                 bounds = new google.maps.LatLngBounds(
                              new google.maps.LatLng(sw_lat, sw_long),  //SW corner
                              new google.maps.LatLng(ne_lat, ne_long)    //NE corner
                          );
                //window.rectangle.setBounds(bounds);
		if(pointerRectangle){
			pointerRectangle.setBounds(bounds);
			window.rectangle.setMap(window.map);
		}else{
			pointerRectangle = new google.maps.Rectangle({
			   bounds: new google.maps.LatLngBounds(
				new google.maps.LatLng(sw_lat, sw_long),  //SW corner
				new google.maps.LatLng(ne_lat, ne_long)    //NE corner
			   ),
			    editable: true,
			    draggable: true,
			  });

			 //Add an event listener on the rectangle.
			  google.maps.event.addListener(window.rectangle, 'bounds_changed', showNewRect);
		}
	};

	 /*--------------------------------------------*/
        /*         POLYGON LISTENER                   */
        /*--------------------------------------------*/
         //jQuery('#NELat,#NELong,#SWLat,#SWLong').keyup( function(){
         jQuery('#NELat,#NELong,#SWLat,#SWLong').on('blur change paste', function(){
		putRectangleOnMap(window.rectangle,window.map);
        });

	/*--------------------------------------------*/
	/*       GETDATA DOWNLOAD LISTENER                    */
	/*--------------------------------------------*/
 	//jQuery('.getData').on('change','input[type=radio]', function(){
	 jQuery('#downloadregion').on('change', function(){
		region = $('#downloadregion').val();
                if(region=="noRegion"){
  			 document.getElementById('toolAction').value='getMap';
		        window.rectangle.setMap(null);
			if(window.fusionlayer){
		        	window.fusionlayer.setMap(null);
			}
			$('.rectangle').hide();
			$('.fusiontabledownload').hide();
			$('.datadownload').hide();
			$('.nodatadownload').show();
                }else if(region=="showRect"){
			if(window.fusionlayer){
		        	window.fusionlayer.setMap(null);
			}

  			 document.getElementById('toolAction').value='downloadRectangleSubset';
	 		 putNewRectangleOnMap(window.rectangle,window.map);
			$('.rectangle').show();
			$('.fusiontabledownload').hide();
			$('.datadownload').show();
			$('.nodatadownload').hide();

                }else if(region=="showFusionTable"){
		        window.rectangle.setMap(null);
  			 document.getElementById('toolAction').value='downloadFusionTableSubset';

			fusiontablenumber=$('#fusiontabledownload').val();
			fusiontablename=$('#fusiontabledownloadname').val();
			if(!window.fusionlayer){
			   window.fusionlayer = new google.maps.FusionTablesLayer();
			}
			$('.rectangle').hide();
			$('.fusiontabledownload').show();
			$('.datadownload').show();
			$('.nodatadownload').hide();
		}
	});
