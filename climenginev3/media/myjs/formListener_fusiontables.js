	if (!window.fusion_tables){
       	    window.fusion_tables = [[],[],[],[],[]];
	}
	if (!window.ftSubChoices){
	    window.ftSubChoices=[[],[],[],[],[]];
	}
	/*--------------------------------------------*/
	/*					      */
	/*--------------------------------------------*/
	function loadFusionTableFeatures(ft_id,map){

		table_id = $('#ft-popover'+String(ft_id)).val();
		col_name= $('#ftcolumnName-popover'+String(ft_id)).val();
		$('#ft'+String(ft_id)).val(table_id);
		$('#ft'+String(ft_id)+'columnName').val(col_name);

		name = $('#ftSubChoice').val();
		
		//save these to the defaults
		ftChoice ='custom';
		window.ftDefaults[ftChoice][0]=table_id;
        window.ftDefaults[ftChoice][1]=col_name;
        
		setFusionTableSubChoices(window.fusion_tables[ft_id-1],window.map,table_id,col_name,ft_id,map);
		changeInFtChoice(ft_id);
        $('#ftSubChoice'+String(ft_id)).val(name);
        //window.ftDefaults[ftChoice][2]=name;  //here this is blank
	}
  	function reloadFusionTableFeatures(ft_id){
		changeInFtChoice(ft_id);
        }

	/*--------------------------------------------*/
    /*        POLYGON TOOLS                       */
    /*--------------------------------------------*/
	
    $('.delete-button').click(function(){
        ft_id = parseInt($(this).attr('id').split('delete-button')[1]);
	    //ft_id = parseInt($(this).attr('id').slice(-1));
        removePolygonFromMap(ft_id);
        //Enable the drawing manager
        window.drawingManager.setOptions({
            drawingControl: true
        });
    });

    $(document).on('change paste autocompletefocus','.polygon-popover', function () {
        var coord_str = $(this).val();
        $('#polygon'+String(ft_id)).val(coord_str);
        //Update poly on map
        updatePolygonOnMap(ft_id);
    });
    $(document).on('change paste autocompletefocus','.polygonName-popover', function () {
        ft_id = parseInt($(this).attr('id').split('polygonName-popover')[1]);
        var poly_name = $(this).val();
	    //polygon is like a fusion table here..
        $('#ft'+String(ft_id)+'altname').val(poly_name);
    });
	/*--------------------------------------------*/
	function changeToChoiceFT(ft_id,ftChoice){
		id=window.ftDefaults[ftChoice][0]
		columnName=window.ftDefaults[ftChoice][1]
		name=window.ftDefaults[ftChoice][2]
		altname=name;
		setFTform(id,name,altname,columnName,ft_id);

		$('#ft'+String(ft_id)).css('display','none');
		$('#ft'+String(ft_id)+'altname').css('display','none');
		$('#ft'+String(ft_id)+'columnName').css('display','none');

		$('#ftSubChoice'+String(ft_id)).css('display','inline');

		if(ftChoice=='custom'){
            $('.ftcustom'+String(ft_id)).css('display','inline');
			$('#customft'+String(ft_id)).click()
			jQuery('#ftSubChoice'+String(ft_id)+'> option').remove();
//			removeFusionTableFromMap(ft_id);  //need to disclude to get ft to show up on map after submit
		}else if(ftChoice=='polygon'){
            $('#ftSubChoice'+String(ft_id)).css('display','none');
            $('.ftcustom'+String(ft_id)).css('display','none');
            $('.polygon'+String(ft_id)).css('display','inline');
			$('#custompolygon'+String(ft_id)).click()
			removeFusionTableFromMap(ft_id);
		}else{
            $('.ftcustom'+String(ft_id)).css('display','none');
		}
		table_id = $('#ft'+String(ft_id)).val();
         }
   	/*--------------------------------------------*/
	/*  HANDLING CHANGES IN CHOICE/SUBCHOICE      */
   	/*--------------------------------------------*/
	 jQuery('.ftChoice').on('change', function(){
		ft_id = parseInt($(this).attr('id').slice(-1))
		changeInFtChoice(ft_id);
        if (ftChoice=='polygon'){
            $('#upload_polygon_button' + String(ft_id)).css('display','inline');
            $('#upload_ft_button' + String(ft_id)).css('display','none');
            
        }
        else if (ftChoice=='custom'){
            $('#upload_polygon_button' + String(ft_id)).css('display','none');
            $('#upload_ft_button' + String(ft_id)).css('display','inline');
        }
        else{
            $('#upload_polygon_button' + String(ft_id)).css('display','none');
            $('#upload_ft_button' + String(ft_id)).css('display','none');
        }
    });

	function changeInFtChoice(ft_id){
        ftChoice = $('#ftChoice'+String(ft_id)).val();
        changeToChoiceFT(ft_id,ftChoice)
        checked = $('#checkft' + String(ft_id)).is(':checked');
        if(checked && ftChoice != 'polygon'){
            //Show reload button
            $('#reload' + String(ft_id)).css('display','inline');
            $('.nav-tabs a[href="#taboutmap"]').tab('show');
            //Remove old fusion table from map, create new one
            removeFusionTableFromMap(ft_id);
            //Check if filter needs to be applied:
            var filter=$('#ftFilter1').val();
            if (filter){
                createAndPutFusionTableOnMap (ft_id,window.map,$('#ft'+String(ft_id)).val(),filter);
            }
            else{
		//console.log(calculation);
                createAndPutFusionTableOnMap (ft_id,window.map,$('#ft'+String(ft_id)).val(),'');
            }
            //Show appropriate info box
            $('.polygon' + String(ft_id)).css('display','none');
            $('.ftcustom' + String(ft_id)).css('display','inline');
            //remove polygon from map
            removePolygonFromMap(ft_id);
            //Disable drawing manager
            if (window.drawingManager){
                window.drawingManager.setOptions({
                    drawingControl: false
                });
                 window.drawingManager.setMap(null);
            }

        }
        if(checked && ftChoice == 'polygon'){
            $('.nav-tabs a[href="#taboutmap"]').tab('show');
            //Hide reload button
            $('#reload' + String(ft_id)).css('display','none');
            removeFusionTableFromMap(ft_id);
            //Show approprate info box
            $('.polygon' + String(ft_id)).css('display','inline');
            $('.ftcustom' + String(ft_id)).css('display','none');
            //Enable drawing manager
            if (window.drawingManager){
                window.drawingManager.setOptions({
                    drawingControl: true
                });
                window.drawingManager.setMap(window.map);
            }
            //function in polygons.js
            addPolygonToMap(ft_id)
        }
	};

    jQuery('.ftSubChoice').on('change', function(){
		ft_id = parseInt($(this).attr('id').split('ftSubChoice')[1]);
		ftSubChoice = $('#ftSubChoice'+String(ft_id)).val();
        //Strip off country abbr from livelihood zone
        if ($('#ftChoice' + String(ft_id)).val() == 'fewslivelihoodzoneoverlayer'){
            var ft_list = ftSubChoice.split(' ')
            if (ft_list[0].length == 2){
                var ft_list = ft_list.slice(1,ft_list.length);
                ftSubChoice = ft_list.join(' ');
            }
        }
		//set defaults
		ftChoice = $('#ftChoice'+String(ft_id)).val(); 
		window.ftDefaults[ftChoice][2]=ftSubChoice;

		$('#ft'+String(ft_id)+'altname').val(ftSubChoice);
		window.ftSubChoices[ft_id-1]=ftSubChoice;

		//place on map when select subchoice
		table_id = $('#ft'+String(ft_id)).val();
		//table_name = $('#ftSubChoice'+String(ft_id)).val();
		table_name = ftSubChoice;
                checked = $('#checkft' + String(ft_id)).is(':checked');
		if(checked){
			removeFusionTableFromMap(ft_id);
			createAndPutFusionTableOnMap (ft_id,window.map,table_id,table_name);
		}
        });
   	/*--------------------------------------------*/
        function setFTform(id,name,altname,columnName,ft_id){
                $('#ft'+String(ft_id)).val(id);
                $('#ft'+String(ft_id)+'columnName').val(columnName);
                $('#ft'+String(ft_id)+'altname').val(altname);
                $('#ftcolumnName-popover'+String(ft_id)).val(columnName);
		if(id!=''){
			setFusionTableSubChoices(window.fusion_tables[ft_id-1],window.map,id,name,ft_id);
			$('#ftSubChoice'+String(ft_id)).val(name);
		}
        };
	function setFusionTableSubChoices(pointerFT,pointerMap,fusiontablenumber,fusiontablename,ft_id,map) {
		//fusiontablename is the subRegion
        columnName = $('#ft'+String(ft_id)+'columnName').val();
		//=====
		//old way to get the subChoices... was limited by 500 records
		//=====
                //FTnamesQuery=getFusionTableNamesQuery(fusiontablenumber,fusiontablename,columnName);
                //var queryText = encodeURIComponent(FTnamesQuery);
                //var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);
                //the ajax call
                //doSubChoicesQuery(query,ft_id);

		//=====
		//new way is not limited 
		//=====
		FTnamesQuery = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20%27'+columnName+'%27%20FROM%20'+fusiontablenumber+'&key='+ window.ftAPIkey;
		$.ajax( {   url : FTnamesQuery,
                dataType: 'json',
                success : function(data){
			numRows=data['rows'].length;
			if(numRows>0){
				status=true;
			}else{
				status =false;
			}
			window.fusionTableNameList=[];
            var u = {};
			for (var i = 0; i < numRows; i++) {
                contry_abbr = null;
				result = data['rows'][i][0];
                //Only list unique entrances
                if (u.hasOwnProperty(result)) {
                    continue;
                }
                //Omit empty rows
                if (result == ""){continue;}
				
                window.fusionTableNameList.push(String(result));
                u[result] = 1;
			}
            if ($('#ftChoice' + String(ft_id)).val() != 'fewslivelihoodzoneoverlayer'){
                window.fusionTableNameList.sort();
            }
            else{
                //window.fusionTableNameList.sort();
		        window.fusionTableNameList.sort(function (a, b) {
			        var col = 0;
			        //this is for descending..Z first.. A last
			        return (b[col] || "!!!").toUpperCase().localeCompare((a[col] || "!!!").toUpperCase());
    		    });
                window.fusionTableNameList.reverse();
            }
            //After the ajax call
			$('#ftSubChoice'+String(ft_id)+'> option').remove();

	    //wondering if we should add an option under datastore for fusion table
	    //for the label here
            if ($('#ftChoice'+String(ft_id)).val() == 'states'){
                var myString = '<option value="">Choose a state!</option>';
            }
            else if ($('#ftChoice'+String(ft_id)).val() == 'zumwaltforage'){
                var myString = '<option value="">Choose a landowner + pasture</option>';
            }
            else if ($('#ftChoice'+String(ft_id)).val() == 'zumwalt'){
                var myString = '<option value="">Choose a pasture</option>';
            }
            else{
                var myString = '<option value="">Choose a region!</option>';
            }
            $('#ftSubChoice'+String(ft_id)).append(myString);
			for (var i = 0; i < window.fusionTableNameList.length; i++) {
			      var value = window.fusionTableNameList[i];
			      var myString = '<option value="' + value + '">' + value + '</option>';
			      $('#ftSubChoice'+String(ft_id)).append(myString);
			}

			ftSubChoice = $('#ftSubChoice'+String(ft_id)).val();
			$('#ft'+String(ft_id)+'altname').val(ftSubChoice);

			// set to cookie value if cookie exists
			if (getCookieValue(ft_id)){
				//alert(getCookieValue(ft_id));
				$('#ftSubChoice'+String(ft_id)).val(getCookieValue(ft_id));
				$('#ft'+String(ft_id)+'altname').val(getCookieValue(ft_id));
			}
            $('#buttonmessage'+String(ft_id)).html('<span style="color:green">Loaded Successfully</span>');
			if(map){
                 //Check if filter needs to be applied:
                var filter=$('#ftFilter1').val();
                if (filter){
                    removeFusionTableFromMap(ft_id);
                    createAndPutFusionTableOnMap (ft_id,window.map,fusiontablenumber,filter);
                }
                else{
		    	    removeFusionTableFromMap(ft_id);
				    createAndPutFusionTableOnMap (ft_id,window.map,fusiontablenumber,'');
                }
			}

           if($('#applicationName').val() == 'precisionGrazing'){
		 populateOwners();
	 };

        }, // anon function
		error:function(){
			status=false;
               	        $('#buttonmessage'+String(ft_id)).html('<span style="color:red">Loading Failed</span>');
		},
        }); // ajax
		return status;
      }

   	/*--------------------------------------------*/
      fusionTableNameList=[]; 
      function doSubChoicesQuery(query, ft_id){
            query.send( function(response){
                 if (!response) {
                 // alert('no response');
                  return;
                }
                if (response.isError()) {
                  //alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                  return;
                }
                FTresponse = response;
                response.getDataTable().getNumberOfRows()
                var numRows = response.getDataTable().getNumberOfRows();

                window.fusionTableNameList=[];
                for (var i = 0; i < numRows; i++) {
                        result = response.getDataTable().getValue(i, 0);
                        window.fusionTableNameList.push(result);
                }
                window.fusionTableNameList.sort();

                //After the ajax call
                jQuery('#ftSubChoice'+String(ft_id)+'> option').remove();
                for (var i = 0; i < window.fusionTableNameList.length; i++) {
                      var value = window.fusionTableNameList[i];
		      var myString = '<option value="' + value + '">' + value + '</option>';
                      jQuery('#ftSubChoice'+String(ft_id)).append(myString);
                }
                ftSubChoice = $('#ftSubChoice'+String(ft_id)).val();
                $('#ft'+String(ft_id)+'altname').val(ftSubChoice);
            });
        }
       /*--------------------------------------------*/
       /*   QUERIES				     */
       /*--------------------------------------------*/
        function getFusionTableRegionsQuery(pointerFT,pointerMap,fusiontablenumber,fusiontablename,columnName) {
		 return "SELECT 'geometry' FROM " + fusiontablenumber+" WHERE '"+columnName+"' CONTAINS '"+fusiontablename+"'";
        }
 	function getFusionTableNamesQuery(fusiontablenumber,fusiontablename,columnName) {
                 return "SELECT '"+columnName+"' FROM " + fusiontablenumber;  
        }
       /*--------------------------------------------*/
       /*         PUT FUSION TABLE ON MAP            */
       /*--------------------------------------------*/
	 function setFusionTableProperties(pointerFT,pointerMap,fusiontablenumber,fusiontablename,columnName,ft_id) {
		/*if(fusiontablenumber ==ftDefaults['fewscropzoneoverlayer'][0]){
			style=styles_FEWScrops;
		}*/
                if(fusiontablename){
                        pointerFT.setOptions({
                            query: {
                                select: 'geometry',
                                from: fusiontablenumber,
                                where: "'"+columnName+"' CONTAINS '"+fusiontablename+"'",
                            },
                            map:pointerMap,
                            //suppressInfoWindows:false,
                         });
                }else{
                        pointerFT.setOptions({
                            query: {
                                select: 'geometry',
                                from: fusiontablenumber,
                            },
                            map:pointerMap,
                            suppressInfoWindows:false,
                         });
                }
		
	


		        google.maps.event.addListener(pointerFT, 'click', function(e) {
			   //e.infoWindowHtml = e.infoWindowHtml + "<a href='javascript:void'>Test</a>";
			if (e.row[columnName].value) {
				var ftSubChoice = e.row[columnName].value;

				$('#ftSubChoice'+String(ft_id)).val(ftSubChoice);
				checked = $('#checkft' + String(ft_id)).is(':checked');
                		window.ftSubChoices[ft_id-1]=fusiontablename;
				
				//set defaults
				ftChoice = $('#ftChoice'+String(ft_id)).val(); 
				window.ftDefaults[ftChoice][2]=ftSubChoice;

                		$('#ft'+String(ft_id)+'altname').val(e.row[columnName].value);
				if(checked){
					removeFusionTableFromMap(ft_id);
					createAndPutFusionTableOnMap (ft_id,window.map,fusiontablenumber,ftSubChoice);
				}
			    } 
		});
/*/not working... thought needed enableMapTips w/ the apiConsole, but then get error: enableMapTypes is not a function??
			google.maps.event.addListener(pointerFT, 'mouseover', function(fEvent) {
			    var row = fEvent.row;
			   alert(row)
			});
*/

		return pointerFT;
        }

        function createAndPutFusionTableOnMap (ft_id,map,table_id,table_name) {
            var layer = $('#ftChoice'+String(ft_id)).val();
            //styles_ftLayers defined here:
            //templates/FEWSNET/scripts/dataStore_FEWSNET.js
            //and collections/dataStore.js
            var style = styles_ftLayers[layer];
            var columnName = $('#ft'+String(ft_id)+'columnName').val();
	        var checked = $('#checkft' + String(ft_id)).is(':checked');
	        if(window.fusion_tables[ft_id-1]){
			if (layer == 'custom' || layer == 'polygon'){
			    window.fusion_tables[ft_id - 1] = new google.maps.FusionTablesLayer();
			}
			else{
			    window.fusion_tables[ft_id - 1] = new google.maps.FusionTablesLayer({
				styles:[{
				    polygonOptions:style
				    }
				]
			    });
			}
	        }
            else if(!checked){
                window.fusion_tables[ft_id -1].setMap(null);
	        }
            else{
                window.fusion_tables[ft_id -1].setMap(window.map);
	        }
            window.fusion_tables[ft_id-1]=setFusionTableProperties(window.fusion_tables[ft_id-1],window.map,table_id,table_name,columnName,ft_id);
            //console.log(window.fusion_tables[ft_id-1]);
            if ($('#applicationName').val() == 'fewsNet'){          
                //zoomToFusionTable(window.fusion_tables[ft_id-1],window.map,table_id,table_name,columnName);
            }
        }

	    function createButDontPutFusionTableOnMap (ft_id,map,table_id,table_name) {
            var columnName = $('#ft'+String(ft_id)+'columnName').val();
                var checked = $('#checkft' + String(ft_id)).is(':checked');
                if(window.fusion_tables[ft_id-1]){
                window.fusion_tables[ft_id - 1] = new google.maps.FusionTablesLayer();
                }
            else{
                window.fusion_tables[ft_id -1].setMap(null);
                }
            window.fusion_tables[ft_id-1]=setFusionTableProperties(window.fusion_tables[ft_id-1],window.map,table_id,table_name,columnName,ft_id);
        }


	/*--------------------------------------------*/
	/*       zoomToFusionTable            */
	/*--------------------------------------------*/
    function zoomToFusionTable(pointerFT,pointerMap,fusiontablenumber,fusiontablename,columnName) {
        if(fusiontablename==""){
            //Reset map to orinal position and zoom
            var aN = $('#applicationName').val();
            //default_map_properties defined in dataStore
            var centerLongLat = default_map_properties[aN][0].split(',');
            var Long = parseFloat(centerLongLat[0]);
            var Lat = parseFloat(centerLongLat[1]);
            var defaultMapCenter = new google.maps.LatLng(Lat, Long);
            var defaultMapZoom = parseInt(default_map_properties[aN][1]);
            window.map.setZoom(defaultMapZoom);
            window.map.setCenter(defaultMapCenter);
	    }
        else{
            FTquery=getFusionTableRegionsQuery(pointerFT,pointerMap,fusiontablenumber,fusiontablename,columnName);
            var queryText = encodeURIComponent(FTquery);
            var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);

            //set the callback function
            query.send(zoomTo);
	    };
    }
	/*--------------------------------------------*/
	/*       removeFusionTableFromMap             */
	/*--------------------------------------------*/
	function removeFusionTableFromMap(ft_id) {
        try{
            window.fusion_tables[ft_id -1].setMap(null);
        }
         catch(e){}
    }
    /*	
    function zoom2fusiontable(query) {
	// zoom and center map on query results
	  //set the query using the parameter
	  var queryText = encodeURIComponent(query);
	  var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);

	  //set the callback function
	  query.send(zoomTo);
	}
    */

	function zoomTo(response) {
		if (!response) {
		  alert('no response');
		  return;
		}
		if (response.isError()) {
		  alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		  return;
		}
		 FTresponse = response;
		 //for more information on the response object, see the documentation
		 //http://code.google.com/apis/visualization/documentation/reference.html#QueryResponse


		 //numRows = response.getDataTable().getNumberOfRows();
		 numCols = response.getDataTable().getNumberOfColumns();

		 var kml =  FTresponse.getDataTable().getValue(0,0);
		 // create a geoXml3 parser for the click handlers
		 var geoXml = new geoXML3.parser({
		    map: map,
		    zoom: false 
		});

		geoXml.parseKmlString("<Placemark>"+kml+"</Placemark>");
		geoXml.docs[0].gpolygons[0].setMap(null);

		map.fitBounds(geoXml.docs[0].gpolygons[0].bounds);
	}

	function setBoxFromQuery(query) {
	  //set the query using the parameter
	  var queryText = encodeURIComponent(query);
	  var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);

	  //set the callback function
	  query.send(setBoundingBox);
	}

	function setBoundingBox(response) {
		if (!response) {
		  //alert('no response');
		  return;
		}
		if (response.isError()) {
		  //alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		  return;
		}

	 	FTresponse = response;
		//for more information on the response object, see the documentation
		//http://code.google.com/apis/visualization/documentation/reference.html#QueryResponse
		numRows = response.getDataTable().getNumberOfRows();
		numCols = response.getDataTable().getNumberOfColumns();

		var kml =  FTresponse.getDataTable().getValue(0,0);
		// create a geoXml3 parser for the click handlers
		var geoXml = new geoXML3.parser({
		    map: map,
		    zoom: false
		});

		geoXml.parseKmlString("<Placemark>"+kml+"</Placemark>");
		geoXml.docs[0].gpolygons[0].setMap(null);

		//console.log(geoXml.docs[0].gpolygons[0].bounds)
		//getBoundingBox
		try{
     			var NELatFT = geoXml.docs[0].gpolygons[0].bounds.Da.j;
		}
		catch(err){
     			var NELatFT = geoXml.docs[0].gpolygons[0].bounds.Ea.j;
		}	
		try{
			var SWLatFT = geoXml.docs[0].gpolygons[0].bounds.Da.k;
		}
		catch(err){
			var SWLatFT = geoXml.docs[0].gpolygons[0].bounds.Ea.A;
		}	
		try{
			var SWLonFT = geoXml.docs[0].gpolygons[0].bounds.va.j;
		}
		catch(err){
			var SWLonFT = geoXml.docs[0].gpolygons[0].bounds.wa.j;
		}	
		try{
			var NELonFT = geoXml.docs[0].gpolygons[0].bounds.va.k;
		}
		catch(err){
			var NELonFT = geoXml.docs[0].gpolygons[0].bounds.wa.A;
		}	

		//setBoundingBox
		$('#SWLat').val(SWLatFT);
		$('#SWLong').val(SWLonFT);
		$('#NELat').val(NELatFT);
		$('#NELong').val(NELonFT);
	}

     jQuery('.fusiontable').on('change', function(){
            var ft_id;
            $('.fusiontable').each(function() {
                if ($(this).css('display') == 'block' && $('#ft' + String(ft_id) + 'check').is(':checked')){
                    ft_id = parseInt($(this).attr('id').split('ft')[1]);
	            table_name = $('#ftSubChoice'+String(ft_id)).val();
                    table_id = $('#ft' + String(ft_id)).val();
                    //createAndPutFusionTableOnMap (ft_id,window.map,table_id,table_name);
                }
            });
        });
        /*--------------------------------------------*/
	/*  WHAT TO DO WHEN FT IS CHECKED/UNCHECKED   */
        /*--------------------------------------------*/
	$(".ftCheck").bind("keyup change", function(e) {
	    var table_id, table_name;
	    var ft_id=parseInt($(this).val());
	    if ($(this).is(':checked')) {
		    table_name = $('#ftSubChoice'+String(ft_id)).val();
		    table_id = $('#ft' + String(ft_id)).val();
		    if ($('#ftChoice' + String(ft_id)).val() == 'polygon'){
                showPolygonOnMap(ft_id);
            }
            else{
                createAndPutFusionTableOnMap (ft_id,window.map,table_id,table_name);
		    }
            $('#ft' + String(ft_id) + 'check').val('checked');
	    }
	    else {
            if ($('#ftChoice' + String(ft_id)).val() == 'polygon'){
                hidePolygonFromMap(ft_id);
            }
            else{
		        removeFusionTableFromMap(ft_id);
            }
		    $('#ft' + String(ft_id) + 'check').val('');
	    }
	});
        /*--------------------------------------------*/
	/*  PLUS/MINUS to ADD/SUBTRACT FUSION TABLES */
        /*--------------------------------------------*/
	jQuery('.fusiontable').on('click','.add', function(){

	    var next_ft_id = parseInt($(this).attr('id').split('pl_ft')[1]);
        window.fusion_tables[next_ft_id - 1] = new google.maps.FusionTablesLayer();

	    //Show next layer
        //Safety check, don't allow next popup if this polygon has not been drawn
        if ($('#ftChoice' + String(next_ft_id -1)).val() == 'polygon' && $('#polygon' + String(next_ft_id - 1)).val() == ''){
            alert('Please choose a polynomial befor adding another layer!');
            $('#fusiontable' + String(next_ft_id)).css('display','none');
        }
        else{
            //Update hidden display variable
            $('#ft' + String(next_ft_id) + 'display').val('block');
            //Hide plus icon of this layer
            $(this).css('display','none');
	        $('#fusiontable' + String(next_ft_id)).css('display','block');
	        //Show next layer on map if checkbox is checked
	        if ($('#checkft' + String(next_ft_id)).is(':checked')){
                if ($('#ftChoice' + String(next_ft_id)).val() == 'polygon'){
                    //Enable drawing manager
                    if (window.drawingManager){
                        window.drawingManager.setOptions({
                            drawingControl: true
                        });
                    } 
                    showPolygonOnMap(next_ft_id);

                }
                else{
		            if ($('#ft' + String(next_ft_id)).val()!= ''){
		                table_name= $('#ftSubChoice' + String(next_ft_id)).val();
		                table_id = $('#ft' + String(next_ft_id)).val();
		                //createAndPutFusionTableOnMap (next_ft_id,window.map,table_id,table_name);
                    }
                }
		    }
	        else{
		        $('#checkft'+String(next_ft_id)).prop('checked',true);
                if ($('#ftChoice' + String(next_ft_id)).val() == 'polygon'){
                    showPolygonOnMap(next_ft_id);
                }   
	        }
	        //Update check value
	        $('#ft' + String(next_ft_id) + 'check').val('checked');
        }
	});

	jQuery('.fusiontable').on('click','.minus', function(){
	    var ft_id = parseInt($(this).attr('id').split('mi_ft')[1]);
	    //Find last layer and show the plus sign on that layer
	    idx = ft_id -1;
	    if (String(ft_id) == 5){
		    while ($('#fusiontable' + idx).css('display') == 'none' ){
		        idx-=1;
		    }
	    }
	    //show plus sign on last fusion table
	    $('#pl_ft' + String(idx +1)).css('display','inline');
	    //Hide layer
        if ($('#ftChoice' + String(ft_id)).val() == 'polygon'){
            hidePolygonFromMap(ft_id);
        }
        else {
	        removeFusionTableFromMap(ft_id);
        }
	    $('#fusiontable' + String(ft_id)).css('display','none');
        //Update hidden variables
	    $('#ft' + String(ft_id) + 'check').val('');
        $('#ft' + String(ft_id) + 'display').val('none');
        //Disable drawing manager
        if (window.drawingManager){
            window.drawingManager.setOptions({
                drawingControl: false
            }); 
        } 
	});

    /*--------------------------------------------*/
