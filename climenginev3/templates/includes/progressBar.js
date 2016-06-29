//Progress Bars after Buttons are Pushed
	/*********************************
	*     DEFAULT MESSAGE            *
	*********************************/
	//default processing message
	var p_message = 'Processing Request';

	/*********************************
	*     DETERMINING IF DIFFERENT MESSAGE NEEDED            *
	*********************************/
	//Determining if request is a large amount of data
	var dS = new Date($('#dateStart').val()).getTime();
	var dE = new Date($('#dateEnd').val()).getTime();
	var largeData = dE - dS >= 1 * 365 * 24 * 60 * 60 * 1000;

	//Determining if request is a large climatology calculation 
	var dSClim = $('#yearStartClim').val();
	var dEClim = $('#yearEndClim').val();
	var largeClimCalc = dEClim - dSClim >= 10;

	/*********************************
	*     CALCULATION BASED MESSAGE    *
	*********************************/
	//Dependent on which Calculation was Behind a Button
	var calc = $('#calculation').val();
	if (calc == 'value'){
	   if (largeData){
	       p_message = 'This computation requires a large amount of daily data. ' +
	       'Please be patient while we process your request.';
	   }
	}else if(toolAction != 'getTimeSeriesOverDateRange'){
	   if (largeData && largeClimCalc ){
	       p_message = 'Your request requires a large amount of daily data'+
		' and a large climatology calculation. ' +
	       'Please be patient while we process your request.';
	   }else if(largeData){
	       p_message = 'Your request requires a large amount of daily data. ' +
	       'Please be patient while we process your request.';
	   }else if (largeClimCalc){
	       p_message = 'Your request requires a large climatology calculation. ' +
	       'Please be patient while we process your request.';
	   }
	}

	/*********************************
	*    TOOL- BASED MESSAGE    *
	*********************************/
	//Dependent on which toolAction was Behind a Button
	var toolAction = $('#toolAction').val();
	var timeSeriesCalc = $('#timeSeriesCalc').val();
	var toolAction = $('#toolAction').val();
	if (toolAction=='getMap' || toolAction=='downloadRectangleSubset'){
		// Show progress bar.
		waitingDialog.show(p_message, {dialogSize: 'sm', progressType: 'warning'});
		// Show the map layer.
		window.map.overlayMapTypes.push(mapType);
		// Once the tiles load, hide the progress bar.
		google.maps.event.addListenerOnce(mapType, 'tilesloaded', function() {
		   waitingDialog.hide();
		});
		// In case it takes more than 30 seconds for the tiles
		// to load, hide the dialog after 30 seconds anyway.
		setTimeout(function () {
		   waitingDialog.hide();
		}, 30000);
	}else if(toolAction =='showSingleValueOnMap'){ //no progress window
		window.map.overlayMapTypes.push(mapType);
	}else if(toolAction == 'getTimeSeriesOverDateRange'){
		if (timeSeriesCalc == 'interannual' ) {
		    p_message = 'This computation requires a large amount of data. ' +
			'Please be patient while we process your request.';
		}	
	};
