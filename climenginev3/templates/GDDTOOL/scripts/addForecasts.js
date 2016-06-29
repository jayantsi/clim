var haveForecasts = false; 

//function submitAjax(variable,pointLat,pointLon,modelName,freq){
function submitAjax(variable){
	console.log('submitting ajax');
	URLLink = 'http://climate-dev.nkn.uidaho.edu/Services/get-netcdf-data/?decimal-precision=2&lat=45.172&lon=-118.215&positive-east-longitude=False&data-path=/datastore/climate/projections/nmme/dailyForecasts/bcsd_nmme_metdata_CMC1_forecast_daily.nc&variable=tasmean&variable-name=tasmean_CMC1&data-path=/datastore/climate/projections/nmme/dailyForecasts/bcsd_nmme_metdata_CMC2_forecast_daily.nc&variable=tasmean&variable-name=tasmean_CMC2&data-path=/datastore/climate/projections/nmme/dailyForecasts/bcsd_nmme_metdata_CFSv2_forecast_daily.nc&variable=tasmean&variable-name=tasmean_CFSv2&data-path=/datastore/climate/projections/nmme/dailyForecasts/bcsd_nmme_metdata_GFDL_forecast_daily.nc&variable=tasmean&variable-name=tasmean_GFDL&data-path=/datastore/climate/projections/nmme/dailyForecasts/bcsd_nmme_metdata_GFDL-FLOR_forecast_daily.nc&variable=tasmean&variable-name=tasmean_GFDL-FLOR&data-path=/datastore/climate/projections/nmme/dailyForecasts/bcsd_nmme_metdata_NASA_forecast_daily.nc&variable=tasmean&variable-name=tasmean_NASA&data-path=/datastore/climate/projections/nmme/dailyForecasts/bcsd_nmme_metdata_NCAR_forecast_daily.nc&variable=tasmean&variable-name=tasmean_NCAR&data-path=/datastore/climate/projections/nmme/dailyForecasts/bcsd_nmme_metdata_ENSMEAN_forecast_daily.nc&variable=tasmean&variable-name=tasmean_ENSMEAN&request-JSON=True';
	
         // URLLink=get_URLLink(pointLat,pointLon,modelName);
          console.log(URLLink);
	 haveForecasts=true;
          var jqxhr = $.ajax({
                url: URLLink,
                method: "GET",
            })
            .done(function(response) {
                console.log(response);
                //if(variable=='pr'){
                //        var lookup_variable='pr';
		//};
                //}else if(variable=='gdd'){
                //        var lookup_variable='tasmean';
                 //       var minT =$('#gddMinT').val();
                //        var maxT =$('#gddMaxT').val();
                //}else{
                 //       var lookup_variable=variable;
                //}

		//var unitsInFile =  unitsInFilesList[lookup_variable];
                //var unitsForDisplay = unitsForDisplayList[variable];

                /*var dates = response.data[0]['yyyy-mm-dd'];
                var dates_arr = jQuery.makeArray(dates);
                var lat = response.data[0]['lat_lon'][0];
                var lon = response.data[0]['lat_lon'][1];
                //this is a fix of Donny's service returning either string or floats (?)
                if(typeof(lat)=="number"){
                        lat = lat.toFixed(3);
                        lon = lon.toFixed(3);
                };
		*/

 	}) // successfully got JSON response
            .fail(function() {
                 alert("Did not load resource");
                  waitingDialog.hide();
             })

};
