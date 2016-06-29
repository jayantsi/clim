var layersFT;
function putFewsRegionOnMap(fewsCountriesString){

        layers_ftid=ftDefaults['fewscountries'][0];
        window.layersFT.setOptions({
                    query: {
                        select: 'geometry',
                        from: layers_ftid,
                        //where: "'Name' IN ('Angola','Afghanistan','Zambia','Zimbabwe')",
                        where: "'Name' IN "+fewsCountriesString+'"',
                    },
                    map:window.map,
                    suppressInfoWindows:true,
                 });
};


function removeFewsCountries(){
        if(window.layersFT){
        }else{
                window.layersFT = new google.maps.FusionTablesLayer();
        };
        layersFT.setMap(null); //remove from map
        return true;
};

function processZoom2(region){

        removeFewsCountries();

        regionsList = Object.keys(fewsRegions);
        if(regionsList.indexOf(region)==-1){ //a country was chosen
                myCountries="('"+region+"')";
                putFewsRegionOnMap('"'+myCountries+'"');
        }else{  //success
                ftid=ftDefaults['fewscountries'][0];
                if(region=='All'){
                        myCountries = Object.keys(ft_fewsGAULS);
                }else if(region=='Eastern Africa'){
                        myCountries = Object.keys(fewsCountries_EastAfrica);
                }else if(region=='Western Africa'){
                        myCountries = Object.keys(fewsCountries_WestAfrica);
                }else if(region=='Southern Africa'){
                        myCountries = Object.keys(fewsCountries_SouthAfrica);
                }else if(region=='Central America'){
                        myCountries = Object.keys(fewsCountries_CentralAmerica);
                }else if(region=='Central Asia'){
                        myCountries = Object.keys(fewsCountries_CentralAsia);
                }
                myString =createStringOfCountries(myCountries);
                putFewsRegionOnMap('"'+myString+'"');
        };
};

function showFewsCountries(){
        region=$('#fewsZoom2').val();


        layers_ftid=ftDefaults['fewscountries'][0];
        if(window.layersFT){
                processZoom2(region);
        }else{
                window.layersFT = new google.maps.FusionTablesLayer();
        };
        google.maps.event.addListener(window.layersFT, 'click', function(e) {
                if (e.row['Name'].value) {
                        var value = e.row['Name'].value;
                        //$('#fewsCountry').val(value.trim());
                        processZoom2(value);
                    }
        });
        return true;
};

function createStringOfCountries(countryList){
   fewsCountriesString='(';
        for (var index = 0; index < countryList.length-1; index++){
                fewsCountriesString=fewsCountriesString+"'"+countryList[index]+"',"
        };
        fewsCountriesString=fewsCountriesString+"'"+countryList[index]+"')"
        return fewsCountriesString;
};

function putFewsSubRegionOnMap(pointerLayer,new_ftid,value,colname){
	if(!pointerLayer){
        	window.layersFT = new google.maps.FusionTablesLayer();
	}
        pointerLayer.setOptions({
        query: {
                select: 'geometry',
                from: new_ftid,
                //where: "'Name' IN ('"+value+')"',
            },
            map:map,
            suppressInfoWindows:false,
         });
        zoomToFusionTable(pointerLayer,window.map,new_ftid,value,colname)

}

function set_address_and_zoom(){
    var az={'region':'','address':'','zoom':''};
    var region=$('#fewsZoom2').val();
    var regionsList = Object.keys(fewsRegions);
    var address = region;
    if(regionsList.indexOf(region)==-1){ //a country was chosen
        zoom ='6';
        address =region;
        if (region in zoom6countries){
            zoom='6';
        }else if (region in zoom7countries){
            zoom='7';
        }else if(region in zoom8countries){
            zoom = '8';
        }else if(region in zoom9countries){
            zoom='9';
        }
    }else{  //a region was chosen

        if(region=='Central America'){
            zoom ='6';
            //address = 'Jamaica';
        }else if(region=='Central Asia'){
            address = 'Afghanistan';
            zoom ='6';
        }else if(region == 'All'){
            address = 'Senegal';
            zoom ='2';
        }else{
            zoom ='4';
        }
    }
    az['address'] = address;
    az['zoom'] = zoom;
    az['region'] = region;
    return az
}

	/*--------------------------------------------*/
	/*CHECKBOX LISTENER TO SHOW FEWS COUNTRIES    */
	/*--------------------------------------------*/
	jQuery('.showFEWSregions').on('change','input[type=checkbox]', function(){
                if($('input[id=showFEWSregions]:checked').val()=="1"){
			showFewsCountries();
                }else{
			removeFewsCountries();
                };
	});

	/*--------------------------------------------*/
	/*         ZOOM 2 LISTENER                    */
	/*--------------------------------------------*/
    jQuery('#fewsZoom2').on('change',function(){
                region = $('#fewsZoom2').val();
		if(region=='none'){
			//should remove all layers from the map	
			   removeFewsCountries();
		}else{
			var az = set_address_and_zoom();
			$('#address').val(az.address);
			codeAddress();
			$('#mapzoom').val(az.zoom);
			window.map.setZoom(parseInt(az.zoom));

			processZoom2(az.region);
			if($('input[id=showFEWSregions]:checked').val()=="1"){
				showFewsCountries();
			}else{
				removeFewsCountries();
			};
		};
    });
    //Show default fusion tables on map whenzoom_to_region button is clicked
    //temporarily get rid of this
    //jQuery('#zoom_to_region').on('click',function(){
    //    var az = set_address_and_zoom();
    //    $('#address').val(az.address);
    //    codeAddress();
    //    $('#mapzoom').val(az.zoom);
    //    window.map.setZoom(parseInt(az.zoom));

    //    processZoom2(az.region);
    //}); 
	/*--------------------------------------------*/
	/*         INITIALIZE  ZOOM2 DROPDOWN        */
	/*--------------------------------------------*/
function initialize_fewsZoom2(){
         var myString = '<option value="none">No Region Selected</option>';
         jQuery('#fewsZoom2').find('optGroup').last().append(myString);
         if($('#fewsZoom2').find('optgroup[label="FEWS Regions"]').html() == null){
                        optGroup = $('<optgroup>').attr('label', 'FEWS Regions');
                        $('#fewsZoom2').append(optGroup);
                        for (var key in fewsRegions) {
                              var value = fewsRegions[key];
                              var myString = '<option value="' + key + '">' + value + '</option>';
                                      jQuery('#fewsZoom2').find('optGroup').last().append(myString);
                        }
         };

          if($('#fewsZoom2').find('optgroup[label="Central America"]').html() == null){
                        optGroup = $('<optgroup>').attr('label', 'Central America FEWS Countries');
                        $('#fewsZoom2').append(optGroup);
                        for (var key in fewsCountries_CentralAmerica) {
                              var value = fewsCountries_CentralAmerica[key];
                              var myString = '<option value="' + key + '">' + value + '</option>';
                                      jQuery('#fewsZoom2').find('optGroup').last().append(myString);
                        }
                };
            if($('#fewsZoom2').find('optgroup[label="Central Asia"]').html() == null){
                        optGroup = $('<optgroup>').attr('label', 'Central Asia FEWS Countries');
                        $('#fewsZoom2').append(optGroup);
                        for (var key in fewsCountries_CentralAsia) {
                              var value = fewsCountries_CentralAsia[key];
                              var myString = '<option value="' + key + '">' + value + '</option>';
                                      jQuery('#fewsZoom2').find('optGroup').last().append(myString);
                        }
                };
             if($('#fewsZoom2').find('optgroup[label="West Africa"]').html() == null){
                        optGroup = $('<optgroup>').attr('label', 'West Africa FEWS Countries');
                        $('#fewsZoom2').append(optGroup);
                        for (var key in fewsCountries_WestAfrica) {
                              var value = fewsCountries_WestAfrica[key];
                              var myString = '<option value="' + key + '">' + value + '</option>';
                                      jQuery('#fewsZoom2').find('optGroup').last().append(myString);
                        }
                };
    		if($('#fewsZoom2').find('optgroup[label="East Africa"]').html() == null){
                        optGroup = $('<optgroup>').attr('label', 'East Africa FEWS Countries');
                        $('#fewsZoom2').append(optGroup);
                        for (var key in fewsCountries_EastAfrica) {
                              var value = fewsCountries_EastAfrica[key];
                              var myString = '<option value="' + key + '">' + value + '</option>';
                                      jQuery('#fewsZoom2').find('optGroup').last().append(myString);
                        }
                };
                if($('#fewsZoom2').find('optgroup[label="South Africa"]').html() == null){
                        optGroup = $('<optgroup>').attr('label', 'South Africa FEWS Countries');
                        $('#fewsZoom2').append(optGroup);
                        for (var key in fewsCountries_SouthAfrica) {
                              var value = fewsCountries_SouthAfrica[key];
                              var myString = '<option value="' + key + '">' + value + '</option>';
                                      jQuery('#fewsZoom2').find('optGroup').last().append(myString);
                        }
                };
};


