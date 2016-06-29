        /*********************************
        *    FORM HANDLERS TO PREVENT RETURNS FROM SUBMITTING FORM*
        *********************************/

        /*********************************
        *   GET VALUE
        *********************************/
	//bind click event in infobox to the document(?)
	$(document).on("click","#form-button-submit-get-value", function(e) {
	        $('#toolAction').val('showSingleValueOnMap');
                e.preventDefault();
	        setTimeout(function(){},1000);
                var p_message = 'Processing Request';
                waitingDialog.show(p_message, {dialogSize: 'sm', progressType: 'warning'});
                var new_url = window.location.href.split('?')[0];  
	        //clears out the query string stuff in URL, but doesn't reload hte page
                if (history.pushState) {
                    window.history.pushState({path:new_url},'',new_url);
                }
       var jqXHR = $.ajax({
               url: new_url,
               method: "POST",
               data: $("#form_all").serialize(),
           })
           .done(function(response) {
               pointValue = response;
               pointLat = jQuery('#pointLat').val();
               pointLong = jQuery('#pointLong').val();
               units = jQuery('#varUnits').val();
               update_infomarker_afterValue(pointLat,pointLong,pointValue,units);
        	   waitingDialog.hide();

           }) // successfully got JSON response

           .fail(function(jqXHR) {
	           if (jqXHR.status == 500) {
		           $('#getValue500ErrorModal').modal('show');
               }else if(jqXHR.status == 429){
		            $('#getValue429ErrorModal').modal('show');
              }
            })

       $("#cancel_button").click(function() {
           jqxhr.abort()
           alert("Handler for .click() called. Ignoring AJAX call");
       }); // Cancel the request

	});


        /*********************************
        *   GET MAP
        *********************************/
        $('#form-button-submit-map,#form-button-update-map,#form-button-update-map2,#form-button-submit-map2').click(function(e){
		    //get which button clicked to decide if it's on the options window or in the display tab
	   	    var idclicked=$(this).attr("id");
            e.preventDefault();

            //Remove all old form errors
            $('.error:visible').each(function(){
               $(this).css('display','none');
            })
            //Check for new form_errors
            var form_error = checkMapFormFields(); //media/myjs/formChecks.js
            if (form_error.error){
                $('#form_error_' + form_error.fieldID).html(form_error.error);
                $('#form_error_' + form_error.fieldID).css('display','block');
                return
            }
            var new_url = window.location.href.split('?')[0];
		    //clears out the query string stuff in URL, but doesn't reload hte page	
		    if (history.pushState) {
		        window.history.pushState({path:new_url},'',new_url);
		    }
	        window.map.overlayMapTypes.clear();  //doesn't seem necessary right now

                setTimeout(function(){},1000);
                var p_message = 'Processing Request';
                waitingDialog.show(p_message, {dialogSize: 'sm', progressType: 'warning'});

                variable =$('#variable').val();
                if(variable == 'TrueColor' || variable == 'FalseColor'){
                        $('.colorbarSample').css('display','none');
                        $('.colorbarHTML').css('display','none');
                }else{
                        $('.colorbarSample').css('display','inline');
                        $('.colorbarHTML').css('display','inline');
                }
                map.setMapTypeId(getBaseMap());
        
            //Hide showFigureLink for fewsnet
            if ($('#applicationName').val() == 'fewsNet'|| $('#applicationName').val() == 'precisionGrazing'){
                $('#showFigureLink').css('display','none');
            }
            var jqXHR = $.ajax({
               url: new_url,
               method: "POST",
               data: $("#form_all").serialize(),
           })
           .done(function(response) {
                response = jQuery.parseJSON(response);
                var mapid=response['mapid'];
                var token=response['token'];
                var shareLink = response['shareLink'];
        	$('#shareLink').val(shareLink);
        	$('.nav-tabs a[href="#taboutmap"]').tab('show');

        	//Set map
            eeMapOptions = updateMapTileOptions(mapid,token);
            window.mapType = new google.maps.ImageMapType(eeMapOptions);
            //adjust transparency to that set (EE gives 100% back)
            window.mapType.setOpacity(parseFloat($('#opacity').val()));

            //put get_value button on map   (might need to check if this is empty or not)
            if(window.buttongetvalue==0){
               var getValueControl = document.getElementById('get-value-control');
                $('#get-value-control').css('display','inline');
                window.map.controls[google.maps.ControlPosition.TOP_CENTER].push(getValueControl);
                window.buttongetvalue=1;
            };

            //replace map layer of layer=0
	    //window.map.overlayMapTypes.clear();  //doesn't seem necessary right now
	    //window.map.overlayMapTypes.push(null); 
            window.map.overlayMapTypes.setAt(0,window.mapType);

            //Add opacity slider on map
            put_sliderOnMap();
            window.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(window.opacity_slider);

	   if(idclicked=='form-button-submit-map' || idclicked =='form-button-submit-map2'){
		    var dispEnv=findBootstrapEnvironment();
		    if(dispEnv=='sm'||dispEnv=='xs'){
			toggleToDisplay();
		    };
	    };

	   var dispEnv=findBootstrapEnvironment();
	   if(dispEnv=='sm'||dispEnv=='xs'){
	 		var mapCenterLongLat = $("#mapCenterLongLat").val();
                        var mapCenterLat = parseFloat(mapCenterLongLat.split(',')[1]).toFixed(4);
                        var mapCenterLong = parseFloat(mapCenterLongLat.split(',')[0]).toFixed(4);
                        var myCenter = new google.maps.LatLng(mapCenterLat, mapCenterLong);
                        google.maps.event.trigger(window.map, 'resize');
                        window.map.setCenter(myCenter);
	};

            //Set title and colorbar
            $('#titleRegion').show();
            set_titleRegion();
            $("#colorbarLabelOnMap").html($('#colorbarLabel').val());
            drawMapColorbar();
            $('#colorbarRegion').show();

            //Hide process bar
            google.maps.event.addListenerOnce(window.mapType, 'tilesloaded', function() {        	
                waitingDialog.hide();
            });

        }) // successfully got JSON response
       .fail(function(response, exception) {
            if (exception === 'timeout'){
                $('#timeoutErrorModal').modal('show');
            }else if (jqXHR.status == 404) {
                $('#getValue404ErrorModal').modal('show');
            }else if (jqXHR.status == 500) {
                $('#getValue500ErrorModal').modal('show');
            }else if(jqXHR.status == 429){
                $('#getValue429ErrorModal').modal('show');
            }else if (exception === 'parsererror') {
                $('#jsonParseErrorModal').modal('show');
            }else if (exception === 'abort') {
                $('#abortErrorModal').modal('show');
            }else if (jqXHR.status === 0) {
                $('#connectionErrorModal').modal('show');
            }else {
                $('#uncaughtErrorModal').modal('show');
            }
            return true;
       })

       $("#cancel_button").click(function() {
           alert("Handler for .click() called. Ignoring AJAX call");
           jqxhr.abort()
           alert("Handler for .click() called. Ignoring AJAX call");
       }); // Cancel the request
    });

        /*********************************
        *   GET TIMESERIES
        *********************************/
        $('#form-button-submit-timeseries, #form-button-submit-timeseries2').click(function(e){
	        $('#toolAction').val('getTimeSeriesOverDateRange');
		 //get which button clicked to decide if it's on the options window or in the display tab
            var idclicked=$(this).attr("id");
            e.preventDefault();
            
            //Remove all old form errors
            $('.error:visible').each(function(){
               $(this).css('display','none');
            })
            //Check for new form_errors
            var form_error = checkTSFormFields(); //media/myjs/formChecks.js
            if (form_error.error){
                $('#form_error_' + String(form_error.fieldID)).html(String(form_error.error));
                $('#form_error_' + String(form_error.fieldID)).css('display','block');
                return
            }
            //$('#form_all').submit();
            setTimeout(function(){},1000);
            var new_url = window.location.href.split('?')[0];
	        
            //clears out the query string stuff in URL, but doesn't reload hte page
            if (history.pushState) {
                window.history.pushState({path:new_url},'',new_url);
            }

            var dS = new Date($('#dateStart').val()).getTime();
            var dE = new Date($('#dateEnd').val()).getTime();
            var p_message = 'Processing Request';
            if ( $('#toolAction').val() == 'getTimeSeriesOverDateRange') {
                if (dE - dS >= 5 * 365 * 24 * 60 * 60 * 1000){
                    p_message = 'This computation requires a large amount of data. '
                    p_message = p_message + 'Please be patient while we process your request.'
                }
            } 
            waitingDialog.show(p_message, {dialogSize: 'sm', progressType: 'warning'});
            
            var jqXHR= $.ajax({
               url: new_url,
               method: "POST",
               timeout:60 * 2 * 1000,
               data: $("#form_all").serialize(),
           })
           .done(function(response) {
                response = JSON.parse(response);
                //Show figure tab
                if ($('#applicationName').val()!= 'fewsNet'){
                    $('a[href="#taboutfigure"]').css('display','block');
                    $('#taboutfigure').addClass('active');
                    $('.nav-tabs a[href="#taboutfigure"]').tab('show');
		}else if ($('#applicationName').val()!= 'precisionGrazing'){
                    $('a[href="#taboutfigure"]').css('display','block');
                    $('#taboutfigure').addClass('active');
                    $('.nav-tabs a[href="#taboutfigure"]').tab('show');
                }
                //Set global data variables
                window.timeSeriesTextData = response['timeSeriesTextData'];
                try{
                    window.timeSeriesGraphData = JSON.parse(response['timeSeriesGraphData']);
                }
                catch(e){
                    window.timeSeriesGraphData = [];
                }
                window.timeSeriesTextData2 = [];
                window.timeSeriesGraphData2 = [];
                window.percentileData = [];
                window.percentileData2 = [];
                window.climoData = [];
                window.climoData2 = [];
                if (response['timeSeriesTextData2'].length >0){
                    window.timeSeriesTextData2 = response['timeSeriesTextData2'];
                }
                if (response['timeSeriesGraphData2'].length >0){
                    window.timeSeriesGraphData2 = JSON.parse(response['timeSeriesGraphData2']);
                }
                if (response['climoData'].length >0){
                    window.climoData = JSON.parse(response['climoData']);
                }
                if (response['climoData2'].length >0){
                    window.climoData2 = JSON.parse(response['climoData2']);
                }
                if (response['percentileData'].length >0){
                    window.percentileData = JSON.parse(response['percentileData']);
                }
                if (response['percentileData2'].length >0){
                    window.percentileData2 = JSON.parse(response['percentileData2']);
                }
                //Set all sorts of things
                //ShareLink
                var shareLink = response['shareLink'];
                $('#shareLink').val(shareLink);

                //Set Chart related items
                setTimeSeriesTitle();
                //Generate Highcharts figure
                setHighchartParameters();
                setChartLayers();
                //update_infomarker_afterValue(pointLat,pointLong,pointValue,units);

                //Set Tab data
                setTabData(1);
                if (window.timeSeriesTextData2.length){
                    setTabData(2);
                }
		if(idclicked=='form-button-submit-timeseries' || idclicked =='form-button-submit-timeseries2'){
                    var dispEnv=findBootstrapEnvironment();
                    if(dispEnv=='sm'||dispEnv=='xs'){
                        toggleToDisplay();
                    };
            };

                //Show fewsnet modal window
                if ($('#applicationName').val() == 'fewsNet'){
                     $('#figureModal').modal('show');
                     $('#showFigureLink').css('display','inline'); 
                     /*userHasSeenTimeSeriesTab=true;*/
                     //The following timeout is a hack. It is here because the modal window with the figure is 
                     //not fully expanding to 100% and needs a resize. But we need a delay to get this to execute.
                     setTimeout(function(){ 
                        //$(window).resize();
                        myChart.reflow();
                     },500);
                }
                //Hide process bar
                waitingDialog.hide();
            }) // successfully got JSON response
            .fail(function(response, exception) {
                waitingDialog.hide();
                if (exception === 'timeout'){
                    $('#timeoutErrorModal').modal('show');
                }else if (jqXHR.status == 404) {
                    $('#getValue404ErrorModal').modal('show');
                }else if (jqXHR.status == 500) {
	                $('#getValue500ErrorModal').modal('show');
                }else if(jqXHR.status == 429){
                    $('#getValue429ErrorModal').modal('show');
                }else if (exception === 'parsererror') {
                    $('#jsonParseErrorModal').modal('show');
                }else if (exception === 'abort') {
                    $('#abortErrorModal').modal('show');
                }else if (jqXHR.status === 0) {
                    $('#connectionErrorModal').modal('show');
                }else {
                    $('#uncaughtErrorModal').modal('show');
                }
                return true;
            })
            $("#cancel_button").click(function() {
                jqxhr.abort()
            }); // Cancel the request
    });


        /*********************************
        *   GET MAP DOWNLOAD
        *********************************/
        $('#form-button-submit-download').click(function(e){
            e.preventDefault();
            setTimeout(function(){},1000);
            var p_message = 'Processing Request';
            waitingDialog.show(p_message, {dialogSize: 'sm', progressType: 'warning'});
           var new_url = window.location.href.split('?')[0];
	//clears out the query string stuff in URL, but doesn't reload hte page
	if (history.pushState) {
	    window.history.pushState({path:new_url},'',new_url);
	}
           var jqxhr = $.ajax({
               url: new_url,
               method: "POST",
               data: $("#form_all").serialize(),
           })

           .done(function(response) {
		 response = jQuery.parseJSON(response);
                 waitingDialog.hide();
		 var shareLink= response['shareLink'];
		$('#shareLink').val(shareLink);

		 var downloadURL= response['downloadURL'];
                $("#downloadURL").val(downloadURL);

               $("#downloadURLLink").attr("href", downloadURL);

               $("#downloadurlmodal").click();
           }) // successfully got JSON response

       .fail(function() {
               waitingDialog.hide();
		//$('#downloadErrorModal').modal('show');
                if (jqXHR.status === 0) {
                    $('#connectionErrorModal').modal('show');
                } else if (jqXHR.status == 500) {
	                $('#getValue500ErrorModal').modal('show');
                }else if(jqXHR.status == 429){
                     $('#getValue429ErrorModal').modal('show');
		};
       })
    });

      $("#cancel_button").click(function() {
        jqxhr.abort()

      }); // Cancel the request


